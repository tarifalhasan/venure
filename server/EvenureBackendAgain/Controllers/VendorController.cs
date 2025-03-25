using EvenureBackendAgain.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EvenureBackendAgain.Controllers
{
    [Route("api/vendor")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly EvenureDbContext _context;

        public VendorController(EvenureDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> getvendors(int currentPage = 1, int itemsPerPage = 10)
        {
            // Get venues where ispreferred is true and join with site data
            var query = _context.vendor
                .Select(x => new
                {
                    x.vendorid,
                    //x.siteid,
                    x.vendorname,
                    x.vendortype,
                    x.vendorphonenumber,
                    x.vendorcontactpersonname,
                    x.vendorscountry,
                    x.vendorscity,
                    x.vendorothercities,
                    x.vendorsothercountry,
                });

            var totalItems = await query.CountAsync();

            var totalPages = (int)Math.Ceiling(totalItems / (double)itemsPerPage);

            var vendors = await query
                .Skip((currentPage - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();

            var response = new
            {
                currentPage,
                totalPages,
                totalItems,
                vendors
            };

            return Ok(response);
        }
    }
}
