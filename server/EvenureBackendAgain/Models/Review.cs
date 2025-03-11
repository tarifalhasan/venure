namespace EvenureBackendAgain.Models
{
    public class Review
    {
        public int reviewid { get; set; }
        public int venueid { get; set; }  // Foreign key reference to Venue
        public string reviewcontent { get; set; }
        public string reviewername { get; set; }
        public DateTime createddate { get; set; } = DateTime.UtcNow;
        public DateTime updateddate { get; set; } = DateTime.UtcNow;

        // Navigation Property
        public venue venue { get; set; }
    }

}
