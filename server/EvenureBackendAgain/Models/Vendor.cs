namespace EvenureBackendAgain.Models
{
    public class vendor
    {
        public int vendorid { get; set; }
        public int siteid { get; set; }  // Foreign key reference to Site
        public string vendorname { get; set; }
        public string vendortype { get; set; }  // E.g., Catering, Photography, Decor
        public string vendorphonenumber { get; set; }
        public string vendorcontactpersonname { get; set; }
        public string vendorscountry { get; set; }
        public string vendorscity { get; set; }
        public bool vendorothercities { get; set; }  // Boolean if the vendor serves other cities
        public bool vendorsothercountry { get; set; }  // Boolean if the vendor serves other countries
        public string vendorssocialmediaurl { get; set; }
        public DateTime createddate { get; set; } = DateTime.UtcNow;
        public DateTime updateddate { get; set; } = DateTime.UtcNow;

        // Navigation Property
        public site site { get; set; }
    }

    }
