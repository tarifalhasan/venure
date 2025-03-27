namespace EvenureBackendAgain.Models
{
    public class VendorSiteMapping
    {
        public int vendorsiteid { get; set; }
        public int vendorid { get; set; }
        public int siteid { get; set; }
        public DateTime createddate { get; set; }
        public DateTime updateddate { get; set; }

        public vendor vendor { get; set; }
        public site site { get; set; }
    }
}
