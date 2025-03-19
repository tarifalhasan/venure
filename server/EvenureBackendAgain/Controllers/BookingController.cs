using Amazon.Runtime.Internal;
using EvenureBackendAgain.Dto;
using EvenureBackendAgain.Dto.Settings;
using EvenureBackendAgain.Models;
using EvenureBackendAgain.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace EvenureBackendAgain.Controllers
{
    [Route("api/booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly EvenureDbContext _context;
        private readonly EmailSettings _emailSettings;
        public BookingController(EvenureDbContext context, IOptions<EmailSettings> emailSettings)
        {
            _context = context;
            _emailSettings = emailSettings.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Booking([FromBody] BookingCommand command)
        {
            var booking = new Booking() 
            {
                venueid = command.VenueId,
                //SiteId = command.SiteId,
                bookingtype = command.BookingType,
                bookingtimestartat = command.BookingStartDate,
                bookingtimeendat = command.BookingEndDate,
                bookingvisitorname = command.VisitorName,
                bookingvisitoremail = command.VisitorEmail,
                bookingvisitorphonenumber = command.VisitorPhonenumber,
                bookingstatus = "Pending",
                //SpecialRequest = command.SpecialRequest
            };

            
            await _context.Booking.AddAsync(booking);
            //await _context.SaveChangesAsync();
                
            int otp = new Random().Next(1000, 9999);

            var otpObj = new Otp()
            {
                uniqueid = Guid.NewGuid().ToString(),
                email = command.VisitorEmail,
                otp = otp,
                expiresin = DateTime.UtcNow.AddMinutes(5)
            };
            await _context.Otps.AddAsync(otpObj);
            await _context.SaveChangesAsync();

            await SendEmailAsync(command.VisitorEmail, otp);
            return Ok(new
            {
                bookingId = booking.bookingid,
                trackingId = otpObj.uniqueid,
                expiresIn = otpObj.expiresin
            });
        }
        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmBooking([FromBody] BookingConfirmCommand command)
        {
            var booking = await _context.Booking.FirstOrDefaultAsync(x => x.bookingid == command.BookingId);
            if (booking == null)
            {
                return BadRequest("Invalid Booking Id");
            }
            var otp = await _context.Otps.FirstOrDefaultAsync(x =>
                x.uniqueid == command.TrackingId &&
                x.email == command.Email &&
                x.otp == command.Otp &&
                DateTime.UtcNow < x.expiresin
            );

            if (otp == null)
            {
                return BadRequest("Invalid Otp");
            }

            otp.expiresin = null;
            otp.updateddate = DateTime.UtcNow;

            booking.bookingstatus = "Confirmed";
            await _context.SaveChangesAsync();

            return Ok();
        }

        private async Task SendEmailAsync(string recipientEmail, int otp)
        {
            string subject = $"Booking OTP";
            string body = $"Your OTP is {otp}";

            MailMessage mail = new MailMessage
            {
                From = new MailAddress(_emailSettings.SenderEmail),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };
            mail.To.Add(recipientEmail);

            using (SmtpClient smtp = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.Port))
            {
                smtp.Credentials = new NetworkCredential(_emailSettings.SenderEmail, _emailSettings.SenderPassword);
                smtp.EnableSsl = _emailSettings.EnableSSL;

                try
                {
                    
                   await smtp.SendMailAsync(mail);
                   
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                }
            }
        }
    }
}

