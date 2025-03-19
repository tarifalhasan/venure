namespace EvenureBackendAgain.Models
{
    public class VenueImages
    {
        public int venueimageid { get; set; }
        public int venueid { get; set; }
        public string venueimagepath { get; set; }
        public bool iscoverimage { get; set; }
        public DateTime createddate { get; set; }
        public DateTime updateddate { get; set; }

        public venue Venue { get; set; }
    }
}
