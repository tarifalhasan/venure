namespace EvenureBackendAgain.Models
{
    public class Otp
    {
        public int id { get; set; }
        public string uniqueid { get; set; }
        public string email { get; set; }
        public int otp { get; set; }
        public DateTime? expiresin { get; set; } = DateTime.UtcNow;
        public DateTime createddate { get; set; } = DateTime.UtcNow;
        public DateTime updateddate { get; set; }
    }
}
