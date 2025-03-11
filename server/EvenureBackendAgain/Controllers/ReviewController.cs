using Amazon.S3;
using EvenureBackendAgain.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EvenureBackendAgain.Controllers
{
    [Route("api/review")]
    [ApiController]
    public class ReviewController: ControllerBase
    {
        private readonly EvenureDbContext _context;
        private readonly IAmazonS3 _s3Client;
        public ReviewController(EvenureDbContext context, IAmazonS3 s3Client)
        {
            _context = context;
            _s3Client = s3Client;
        }

        [HttpGet("venue-id/{venueId}")]
        public async Task<IActionResult> GetVenues([FromRoute] int venueId, int currentPage = 1, int itemsPerPage = 10)
        {
            // Get venues where ispreferred is true and join with site data
            var query = _context.review
                .Where(r => r.venueid == venueId)
                .Select(r => new
                {
                    r.reviewid,
                    r.venueid,
                    r.reviewcontent,
                    r.reviewername,
                    r.createddate,
                    r.updateddate
                });

            var totalItems = await query.CountAsync();

            var totalPages = (int)Math.Ceiling(totalItems / (double)itemsPerPage);

            var reviews = await query
                .Skip((currentPage - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();

            var response = new
            {
                currentPage,
                totalPages,
                totalItems,
                reviews
            };

            return Ok(response);
        }
    }
}
