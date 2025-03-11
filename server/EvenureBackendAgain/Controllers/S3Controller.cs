using EvenureBackendAgain.Service;
using Microsoft.AspNetCore.Mvc;

namespace EvenureBackendAgain.Controllers
{
    [Route("api/s3")]
    [ApiController]
    public class S3Controller : ControllerBase
    {
        private readonly S3Service _s3Service;

        public S3Controller(S3Service s3Service)
        {
            _s3Service = s3Service;
        }

        /// <summary>
        /// Uploads a file to S3.
        /// </summary>
        [HttpPost("upload/{venueId}")]
        public async Task<IActionResult> UploadFile(Guid venueId, IFormFile file, [FromQuery] string fileType)
        {
            try
            {
                if (file == null || file.Length == 0) return BadRequest("Invalid file.");

                string fileUrl = await _s3Service.UploadFileAsync(file, venueId.ToString(), fileType);
                return Ok(new { fileUrl });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieves a list of all files for a venue.
        /// </summary>
        [HttpGet("files/{venueId}")]
        public async Task<IActionResult> GetFiles(Guid venueId, [FromQuery] string fileType)
        {
            try
            {
                var fileUrls = await _s3Service.ListFilesAsync(venueId.ToString(), fileType);
                return Ok(fileUrls);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Deletes a file from S3.
        /// </summary>
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteFile([FromQuery] string fileKey)
        {
            try
            {
                bool result = await _s3Service.DeleteFileAsync(fileKey);
                return result ? Ok("File deleted.") : BadRequest("Failed to delete file.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

}
