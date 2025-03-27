using System;

namespace EvenureBackendAgain.Models
{
    public class site
    {
        public int siteid { get; set; }
        public string sitename { get; set; }
        public string sitecity { get; set; }
        public string sitecountry { get; set; }
        public DateTime createddate { get; set; }
        public DateTime updateddate { get; set; }
        public ICollection<venue> Venues { get; set; } = new List<venue>();
        //public ICollection<vendor> vendors { get; set; } = new List<vendor>();
        public ICollection<VendorSiteMapping> VendorSiteMappings { get; set; } = new List<VendorSiteMapping>();

    }

}
