namespace EvenureBackendAgain.Models
{
    public class Booking
    {
        public int bookingid { get; set; }
        public int venueid { get; set; }  // Foreign key reference to Venue
        public string bookingtype { get; set; }  // E.g., Site Visit, Event
        public string bookingvisitorname { get; set; }
        public string bookingvisitorphonenumber { get; set; }
        public string bookingvisitoremail { get; set; }
        public string bookingstatus { get; set; }  // E.g., Pending, Confirmed, Canceled
        public DateTime bookingtimestartat { get; set; }
        public DateTime bookingtimeendat { get; set; }
        public DateTime? bookingvisitdate { get; set; }  // Nullable
        public DateTime? bookingeventdate { get; set; }  // Nullable
        public DateTime createddate { get; set; } = DateTime.UtcNow;
        public DateTime updateddate { get; set; } = DateTime.UtcNow;
        //public string SpecialRequest { get; set; }

        // Navigation Property
        public venue Venue { get; set; }
    }

}
