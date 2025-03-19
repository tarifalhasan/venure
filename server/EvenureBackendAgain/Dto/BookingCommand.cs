namespace EvenureBackendAgain.Dto
{
    public class BookingCommand
    {
        public int VenueId { get; set; }
        public required List<int> VendorIds { get; set; }
        //public int SiteId { get; set; }
        public string BookingType { get; set; }  // E.g., Site Visit, Event
        public DateTime BookingStartDate { get; set; }
        public DateTime BookingEndDate { get; set; }
        public string VisitorName { get; set; }
        public string VisitorEmail { get; set; }
        public string VisitorPhonenumber { get; set; }
        public string SpecialRequest { get; set; }
    }
}
