using Amazon;
using Amazon.S3;
using Amazon.Runtime;  // Needed for AWS credentials
using Amazon.Extensions.NETCore.Setup;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using EvenureBackendAgain.Service;
using EvenureBackendAgain.Dto.Settings;  // Add this for Swagger support

var builder = WebApplication.CreateBuilder(args);

// Load AWS settings from appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
// Register AWS services with explicit credentials and region
builder.Services.AddSingleton<IAmazonS3>(serviceProvider =>
{
    var config = serviceProvider.GetRequiredService<IConfiguration>();

    // Create credentials from appsettings.json
    var credentials = new BasicAWSCredentials(
        config["AWS:AccessKey"],
        config["AWS:SecretKey"]
    );

    // Get the region from appsettings.json
    var region = RegionEndpoint.GetBySystemName(config["AWS:Region"]);

    // Create and return the AmazonS3Client using the credentials and region
    return new AmazonS3Client(credentials, region);
});

// Register DbContext
builder.Services.AddDbContext<EvenureDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Controllers
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin() 
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Evenure API", Version = "v1" });
});

var app = builder.Build();
app.UseCors("AllowAll");
// Enable Swagger for Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Evenure API v1");
    });
}

// Middleware pipeline
app.UseRouting(); // Ensure routing comes before endpoints
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Ensure controllers are mapped
});

app.Run();
