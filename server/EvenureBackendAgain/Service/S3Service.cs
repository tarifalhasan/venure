namespace EvenureBackendAgain.Service
{
    using Amazon.S3;
    using Amazon.S3.Model;
    using Amazon.S3.Util;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    public class S3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
        }

        /// <summary>
        /// Uploads a file to S3 and returns the file URL.
        /// </summary>
        public async Task<string> UploadFileAsync(IFormFile file, string venueId, string fileType)
        {
            if (file == null || file.Length == 0)
                throw new Exception("Invalid file.");

            string folder = fileType == "pdf" ? "package" : "images";
            string key = $"venues/{venueId}/{folder}/{Guid.NewGuid()}-{file.FileName}";

            using var stream = file.OpenReadStream();
            var request = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = key,
                InputStream = stream,
                ContentType = file.ContentType,
                CannedACL = S3CannedACL.PublicRead // Allow public access (optional)
            };

            await _s3Client.PutObjectAsync(request);
            return $"https://{_bucketName}.s3.amazonaws.com/{key}";
        }

        /// <summary>
        /// Retrieves a list of file URLs for a given venue.
        /// </summary>
        public async Task<List<string>> ListFilesAsync(string venueId, string fileType)
        {
            string prefix = $"venues/{venueId}/{fileType}/";
            var request = new ListObjectsV2Request
            {
                BucketName = _bucketName,
                Prefix = prefix
            };

            var result = await _s3Client.ListObjectsV2Async(request);
            var urls = new List<string>();

            foreach (var obj in result.S3Objects)
            {
                urls.Add($"https://{_bucketName}.s3.amazonaws.com/{obj.Key}");
            }

            return urls;
        }

        /// <summary>
        /// Deletes a file from S3.
        /// </summary>
        public async Task<bool> DeleteFileAsync(string fileKey)
        {
            var request = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = fileKey
            };

            await _s3Client.DeleteObjectAsync(request);
            return true;
        }
    }

}
