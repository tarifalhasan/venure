using Amazon.S3;
using Amazon.S3.Model;
using EvenureBackendAgain.Dto;
using EvenureBackendAgain.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EvenureBackendAgain.Controllers
{
    [Route("api/venue")]
    [ApiController]
    public class VenuesController : ControllerBase
    {
        private readonly EvenureDbContext _context;
        private readonly IAmazonS3 _s3Client;
        public VenuesController(EvenureDbContext context, IAmazonS3 s3Client)
        {
            _context = context;
            _s3Client = s3Client;
        }

        [HttpGet("get-recommended-venues")]
        public async Task<IActionResult> GetRecommendedVenues(int currentPage = 1, int itemsPerPage = 10)
        {
            // Get venues where ispreferred is true and join with site data
            var query = _context.venue
                .Where(v => v.ispreferred)
                .Join(_context.site, v => v.siteid, s => s.siteid, (v, s) => new
                {
                    v.venueid,
                    v.venuename,
                    siteName = s.sitename,
                    siteCity = s.sitecity,
                    siteCountry = s.sitecountry,
                    venueCoverImage = v.venueimages3bucket // This will be replaced with the S3 URL
                });

            // Calculate total items
            var totalItems = await query.CountAsync();

            // Calculate total pages
            var totalPages = (int)Math.Ceiling(totalItems / (double)itemsPerPage);

            // Get paginated venues
            var venues = await query
                .Skip((currentPage - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();

            // Fetch cover images from S3 for each venue
            var venuesWithCoverImages = new List<object>();
            foreach (var venue in venues)
            {
                string coverImageUrl = await GetVenueCoverImageFromS3(venue.venueid);
                venuesWithCoverImages.Add(new
                {
                    venue.venueid,
                    venue.venuename,
                    venue.siteName,
                    venue.siteCity,
                    venue.siteCountry,
                    venueCoverImage = coverImageUrl // Replace with the S3 URL
                });
            }

            // Return formatted response
            var response = new
            {
                currentPage,
                totalPages,
                totalItems,
                venues = venuesWithCoverImages
            };

            return Ok(response);
        }


        [HttpPost("get-venue-filtered")]
        public async Task<IActionResult> GetVenuesByFilter([FromBody] VenueSearchRequest request)
        {
            var query = _context.venue.AsQueryable();

            if(request.VenuType != null)
            {
                query = query.Where(x => x.venuetype == request.VenuType);
            }
            if (request.Destination != null)
            {

            }
            if (request.MinAttendees != null)
            {
                query = query.Where(x => x.venueminattendees >= request.MinAttendees);

            }
            if (request.MaxAttendees != null)
            {
                query = query.Where(x => request.MaxAttendees <= x.venuemaxattendees);

            }
            if (request.MinSize != null)
            {
                query = query.Where(x => x.venueminsizeinsquaremeters >= request.MinSize);

            }
            if (request.MaxSize != null)
            {
                query = query.Where(x => request.MaxSize <= x.venuemaxsizeinsquaremeters);
            }
            if (request.MinPrice != null)
            {
                query = query.Where(x => x.venueprice >= request.MinPrice);

            }
            if (request.MaxPrice != null)
            {
                query = query.Where(x => x.venueprice <= request.MaxPrice);

            }
            if (request.MinRating != null)
            {
                query = query.Where(x => x.venuerating >= request.MinRating);
            }
            if (request.MaxRating != null)
            {
                query = query.Where(x => request.MaxRating <= x.venuerating);
            }
            if (request.AdjustableSpace != null)
            {

            }
            if (request.Features != null &&  request.Features.Count != 0)
            {
                query = query
                    .Include(x => x.VenueFeatureMappings)
                    .Where(v => request.Features
                        .Any(id => v.VenueFeatureMappings
                            .Any(vfm => vfm.featureid == id)));

            }

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)request.ItemsPerPage);

            var venues = await query
                    .Join(_context.site, v => v.siteid, s => s.siteid, (v, s) => new
                    {
                        v.venueid,
                        v.venuename,
                        v.siteid,
                        v.venueaddress,
                        v.venueaward,
                        v.venueprice,
                        v.venuediscount,
                        v.venueminsizeinsquaremeters,
                        v.venuemaxsizeinsquaremeters,
                        v.venuetype,
                        v.venueminattendees,
                        v.venuemaxattendees,
                        v.venueaccount,
                        v.venuerating,
                        v.venuedescription,
                        v.venueimages3bucket,
                        v.venuereview,
                        v.venuepackagepdfs3bucket,
                        v.venuefloorplans3bucket,
                        v.venueheight,
                        v.venuetotalarea,
                        siteName = s.sitename,
                        siteCity = s.sitecity,
                        siteCountry = s.sitecountry,
                        venueCoverImage = v.venueimages3bucket != null ? v.venueimages3bucket : null
                    })
                .Skip((request.CurrentPage - 1) * request.ItemsPerPage)
                .Take(request.ItemsPerPage)
                .ToListAsync();

            var response = new
            {
                request.CurrentPage,
                totalPages,
                totalItems,
                venues
            };

            return Ok(response);
        }

        [HttpGet("get-some-venues")]
        public async Task<IActionResult> GetVenues(int currentPage = 1, int itemsPerPage = 10)
        {
            // Get venues where ispreferred is true and join with site data
            var query = _context.venue
                .Join(_context.site, v => v.siteid, s => s.siteid, (v, s) => new
                {
                    v.venueid,
                    v.venuename,
                    siteName = s.sitename,
                    siteCity = s.sitecity,
                    siteCountry = s.sitecountry,
                    venueCoverImage = v.venueimages3bucket != null ? v.venueimages3bucket : null
                });

            // Calculate total items
            var totalItems = await query.CountAsync();

            // Calculate total pages
            var totalPages = (int)Math.Ceiling(totalItems / (double)itemsPerPage);

            // Get paginated venues
            var venues = await query
                .Skip((currentPage - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();

            // Return formatted response
            var response = new
            {
                currentPage,
                totalPages,
                totalItems,
                venues
            };

            return Ok(response);
        }

        [HttpGet("top-rated")]
        public async Task<IActionResult> GetTopRatedVenues(int currentPage = 1, int itemsPerPage = 10)
        {
            var query = _context.venue
            .GroupJoin(_context.review,
                       v => v.venueid,
                       r => r.venueid,
                       (v, reviews) => new
                       {
                           Venue = v,
                           ReviewCount = reviews.Count()
                       })
            .OrderByDescending(v => v.ReviewCount)
            .ThenBy(v => v.Venue.venueid);
            
            var totalItems = await query.CountAsync();

            var totalPages = (int)Math.Ceiling(totalItems / (double)itemsPerPage);

            var venues = await query
                .Skip((currentPage - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .Select(v => new { v.Venue, v.ReviewCount })
                .Join(_context.site, v => v.Venue.siteid, s => s.siteid, (v, s) => new
                {
                    v.Venue.venueid,
                    reviewCount = v.ReviewCount,
                    v.Venue.venuename,
                    siteName = s.sitename,
                    siteCity = s.sitecity,
                    siteCountry = s.sitecountry,
                    venueCoverImage = v.Venue.venueimages3bucket != null ? v.Venue.venueimages3bucket : null
                })
                .ToListAsync();

            var response = new
            {
                currentPage,
                totalPages,
                totalItems,
                venues
            };

            return Ok(response);
        }

        [HttpGet("get-venue-deals")]
        public async Task<IActionResult> GetVenueDeals(int currentPage = 1, int itemsPerPage = 10)
        {
            var query = _context.venue
                .Where(v => v.venuepackagepdfs3bucket != null)  // Filter where PDF URL is not null
                .Join(_context.site, v => v.siteid, s => s.siteid, (v, s) => new
                {
                    v.venueid,
                    v.venuename,
                    siteName = s.sitename,
                    siteCity = s.sitecity,
                    siteCountry = s.sitecountry,
                    venueCoverImage = v.venueimages3bucket ?? null,
                    venuePackagePDF = v.venuepackagepdfs3bucket  // Include package PDF URL
                });

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)itemsPerPage);
            var venues = await query.Skip((currentPage - 1) * itemsPerPage).Take(itemsPerPage).ToListAsync();

            return Ok(new { currentPage, totalPages, totalItems, venues });
        }


        [HttpGet("get-venue-details/{venueId}")]
        public async Task<IActionResult> GetVenueDetails(int venueId)
        {
            string s3BucketName = "venue-media-bucket";
            string s3FolderPath = $"venue-images/other-images/{venueId}/";
            var images = await GetVenueImagesFromS3(venueId);
            // Fetch venue details and generate the image URLs from S3
            var venueDetails = await _context.venue
                .Where(v => v.venueid == venueId)
                .Select(v => new
                {
                    v.venueid,
                    v.venuename,
                    v.venueaddress,
                    v.venueaward,
                    v.venuedescription,
                    v.venuefloorplans3bucket,
                    v.venueheight,
                    v.venuemaxattendees,
                    v.venuetotalarea,
                    v.venueprice,
                    v.venuediscount,
                    v.venueminsizeinsquaremeters,
                    v.venuemaxsizeinsquaremeters,
                    v.venuetype,
                    v.venuerating,
                    venueImages = images,
                    venueFeatures = _context.venuefeature
                        .Where(f => _context.venuefeaturemapping
                                    .Any(vf => vf.venueid == venueId && vf.featureid == f.featureid))
                        .Select(f => f.featurename)
                        .ToList(),
                    venueAmenities = new List<string> { "Wi-Fi", "Parking", "Catering" }, // Example amenities, customize as needed
                    siteVendors = _context.vendor
                        .Where(v => v.siteid == v.siteid) // You may need a correct relationship with vendors
                        .Select(v => new
                        {
                            v.vendortype,
                            v.vendorname
                        }).ToList()
                }).FirstOrDefaultAsync();

            if (venueDetails == null)
            {
                return NotFound(new { Message = "Venue not found" });
            }

            return Ok(venueDetails);
        }

        private async Task<List<string>> GetVenueImagesFromS3(int venueId)
        {
            List<string> imageUrls = new List<string>();
            string bucketName = "venue-media-bucket";
            string folderPath = $"venue-images/other-images/{venueId}/";

            try
            {
                var listRequest = new ListObjectsV2Request
                {
                    BucketName = bucketName,
                    Prefix = folderPath
                };

                var response = await _s3Client.ListObjectsV2Async(listRequest);

                foreach (var s3Object in response.S3Objects)
                {
                    // Generate the full URL
                    string imageUrl = $"https://{bucketName}.s3.amazonaws.com/{s3Object.Key}";
                    imageUrls.Add(imageUrl);
                }
            }
            catch (Exception ex)
            {
                // Handle error
                Console.WriteLine($"Error fetching images from S3: {ex.Message}");
            }

            return imageUrls;
        }

        private async Task<string> GetVenueCoverImageFromS3(int venueId)
        {
            string bucketName = "venue-media-bucket";
            string folderPath = $"venue-images/cover-images/{venueId}/";

            try
            {
                var listRequest = new ListObjectsV2Request
                {
                    BucketName = bucketName,
                    Prefix = folderPath
                };

                var response = await _s3Client.ListObjectsV2Async(listRequest);

                // Assuming there is only one image in the folder, take the first object
                var s3Object = response.S3Objects.FirstOrDefault();
                if (s3Object != null)
                {
                    // Generate the full URL
                    return $"https://{bucketName}.s3.amazonaws.com/{s3Object.Key}";
                }
            }
            catch (Exception ex)
            {
                // Handle error
                Console.WriteLine($"Error fetching cover image from S3: {ex.Message}");
            }

            // Return null or a default image URL if no image is found
            return null;
        }
    }


}


