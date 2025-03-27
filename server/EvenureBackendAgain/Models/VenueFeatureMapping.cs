using System;

namespace EvenureBackendAgain.Models
{
    public class venuefeaturemapping
    {
        public int venuefeaturemappingid { get; set; }  // Primary Key
        public int venueid { get; set; }
        public int featureid { get; set; }

        public DateTime createddate { get; set; }
        public DateTime? updateddate { get; set; }

        public venue venue { get; set; }
        public venuefeature venuefeature { get; set; }
    }

}
