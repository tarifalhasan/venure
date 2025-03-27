using Amazon.S3;
using Amazon.S3.Model;
using EvenureBackendAgain.Dto;
using EvenureBackendAgain.Models;
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
                .Include(v=> v.site)
                .Include(v=> v.VenueImages)
                .Where(v => v.ispreferred)
                .Select(x => new
                {
                    x.venueid,
                    x.venuename,
                    siteName = x.site.sitename,
                    siteCity = x.site.sitecity,
                    siteCountry = x.site.sitecountry,
                    venueCoverImage = x.VenueImages.FirstOrDefault(x=> x.iscoverimage).venueimagepath // This will be replaced with the S3 URL
                });

            var totalItems = await query.CountAsync();

            var totalPages = (int)Math.Ceiling(totalItems / (double)itemsPerPage);

            var venues = await query
                .Skip((currentPage - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();

           
            var response = new
            {
                currentPage,
                totalPages,
                totalItems,
                venues = venues
            };

            return Ok(response);
        }


        [HttpPost("get-venue-filtered")]
        public async Task<IActionResult> GetVenuesByFilter([FromBody] VenueSearchRequest request)
        {
            var query = _context.venue.AsQueryable();

            if(request.SearchText != null)
            {
                query = query.Where(x => 
                    x.venueaddress.Contains(request.SearchText)
                    || x.venuename.Contains(request.SearchText)
                );
            }
            if(request.venueType != null)
            {
                query = query.Where(x => x.venuetype == request.venueType);
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
                    .Include(x=> x.site)
                    .Include(x=> x.VenueImages)
                    .Where(v => request.Features
                        .Any(id => v.VenueFeatureMappings
                            .Any(vfm => vfm.featureid == id)));

            }

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)request.ItemsPerPage);

            if(totalItems == 0)
            {
                query = _context.venue.Where(x => x.ispreferred);
            }

            var venues = await query
                    .Include(x => x.Reviews)
                    .Select(v => new
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
                        v.venuepackagepdfs3bucket,
                        v.venuefloorplans3bucket,
                        v.venueheight,
                        v.venuetotalarea,
                        v.ispreferred,
                        venuereviews = v.Reviews.Count(),
                        siteName = v.site.sitename,
                        siteCity = v.site.sitecity,
                        siteCountry = v.site.sitecountry,
                        venueCoverImages = v.VenueImages.Select(x=> new { 
                            imageId = x.venueimageid,
                            isCoverImage = x.iscoverimage,
                            imagePath = x.venueimagepath
                        })
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
                .Include(x => x.site)
                .Include(x => x.VenueImages)
                .Select(v => new
                {
                    v.venueid,
                    v.venuename,
                    siteName = v.site.sitename,
                    siteCity = v.site.sitecity,
                    siteCountry = v.site.sitecountry,
                    venueCoverImage = v.VenueImages.FirstOrDefault(x => x.iscoverimage).venueimagepath
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
            .Include(x => x.site)
            .Include(x => x.VenueImages)
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
                .Select(v => new
                {
                    v.Venue.venueid,
                    reviewCount = v.ReviewCount,
                    v.Venue.venuename,
                    siteName = v.Venue.site.sitename,
                    siteCity = v.Venue.site.sitecity,
                    siteCountry = v.Venue.site.sitecountry,
                    venueCoverImage = v.Venue.VenueImages.FirstOrDefault(x => x.iscoverimage).venueimagepath
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
                .Include(x => x.site)
                .Include(x => x.VenueImages)
                .Where(v => v.venuepackagepdfs3bucket != null)  // Filter where PDF URL is not null
                .Select(v => new
                {
                    v.venueid,
                    v.venuename,
                    siteName = v.site.sitename,
                    siteCity = v.site.sitecity,
                    siteCountry = v.site.sitecountry,
                    venueCoverImage = v.VenueImages.FirstOrDefault(x=> x.iscoverimage).venueimagepath,
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
            try
            {
                var venueDetails = await _context.venue
                .Include(x => x.site)
                    .ThenInclude(x=> x.VendorSiteMappings)
                        .ThenInclude(x=> x.vendor)
                .Include(x => x.VenueImages)
                .Include(x => x.VenueFeatureMappings)
                    .ThenInclude(x => x.venuefeature)
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
                    venueCoverImage = v.VenueImages.FirstOrDefault(x => x.iscoverimage).venueimagepath,
                    venueImages = v.VenueImages.Where(x => !x.iscoverimage),
                    venueFeatures = _context.venuefeature
                        .Where(f => _context.venuefeaturemapping
                                    .Any(vf => vf.venueid == venueId && vf.featureid == f.featureid))
                        .Select(f => f.featurename)
                        .ToList(),
                    venueAmenities = new List<string> { "Wi-Fi", "Parking", "Catering" },
                    siteVendors = v.site
                    .VendorSiteMappings.Select(x => new
                    {
                        x.vendor.vendorid,
                        x.vendor.vendortype,
                        x.vendor.vendorname,
                    })
                }).FirstOrDefaultAsync();

                if (venueDetails == null)
                {
                    return NotFound(new { Message = "Venue not found" });
                }

                return Ok(venueDetails);
            }
            catch (Exception ex)
            {

                throw;
            }
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


