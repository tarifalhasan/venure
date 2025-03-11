namespace EvenureBackendAgain.Dto
{
    public class VenueSearchRequest
    {
        public string? VenuType { get; set; } // Indoor, Outdoor, Hybrid
        public string? Destination { get; set; } // City, Country, Site, or Venue name
        public int? MinAttendees { get; set; }
        public int? MaxAttendees { get; set; }
        public int? MinSize { get; set; }
        public int? MaxSize { get; set; }
        public int? MinPrice { get; set; }
        public int? MaxPrice { get; set; }
        public float? MinRating { get; set; }
        public float? MaxRating { get; set; }
        public bool? AdjustableSpace { get; set; }
        public List<int>? Features { get; set; }
        public int CurrentPage { get; set; } = 1;
        public int ItemsPerPage { get; set; } = 10;
    }

}
