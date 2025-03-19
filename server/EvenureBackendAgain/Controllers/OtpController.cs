using EvenureBackendAgain.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EvenureBackendAgain.Controllers
{
    [Route("api/otp")]
    [ApiController]
    public class OtpController : ControllerBase
    {
        private readonly EvenureDbContext _context;

        public OtpController(EvenureDbContext context)
        {
            _context = context;
        }
    }
}
