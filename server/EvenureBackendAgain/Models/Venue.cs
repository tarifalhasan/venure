namespace EvenureBackendAgain.Models
{
    public class venue
    {
        public int venueid { get; set; }
        public int siteid { get; set; }
        public string venuename { get; set; }
        public string venueaddress { get; set; }
        public string? venueaward { get; set; }
        public bool ispreferred { get; set; }
        public decimal venueprice { get; set; }
        public decimal venuediscount { get; set; }
        public int venueminsizeinsquaremeters { get; set; }
        public int venuemaxsizeinsquaremeters { get; set; }
        public string venuetype { get; set; }
        public int venueminattendees { get; set; }
        public int venuemaxattendees { get; set; }
        public string? venueaccount { get; set; }
        public float venuerating { get; set; }
        public string? venuedescription { get; set; }
        public DateTime createddate { get; set; }
        public DateTime updateddate { get; set; }
        public string? venuereview { get; set; }
        public string? venuepackagepdfs3bucket {  get; set; }
        public string? venuefloorplans3bucket { get; set; }
        public string? venueheight { get; set; }
        public string? venuetotalarea { get; set; }


        public site site { get; set; }

        public ICollection<venuefeaturemapping> VenueFeatureMappings { get; set; } = new List<venuefeaturemapping>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<VenueImages> VenueImages { get; set; } = new List<VenueImages>();
    }
}

