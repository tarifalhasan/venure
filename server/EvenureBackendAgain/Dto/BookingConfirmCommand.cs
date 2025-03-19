namespace EvenureBackendAgain.Dto
{
    public class BookingConfirmCommand
    {
        public int BookingId { get; set; }
        public string TrackingId { get; set; }
        public string Email { get; set; }
        public int Otp { get; set; }
    }
}
