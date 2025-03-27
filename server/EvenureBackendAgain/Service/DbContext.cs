using EvenureBackendAgain.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace EvenureBackendAgain.Service
{
    public class EvenureDbContext : DbContext
    {
        public EvenureDbContext(DbContextOptions<EvenureDbContext> options) : base(options) { }

        public DbSet<site> site { get; set; }
        public DbSet<venue> venue { get; set; }
        public DbSet<Booking> Booking { get; set; }
        public DbSet<vendor> vendor { get; set; }
        public DbSet<Review> review { get; set; }
        public DbSet<venuefeature> venuefeature { get; set; }
        public DbSet<venuefeaturemapping> venuefeaturemapping { get; set; }
        public DbSet<VendorSiteMapping> vendorsitemapping { get; set; }
        public DbSet<VenueImages> venueImages { get; set; }
        public DbSet<Otp> Otps { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<venue>()
                .HasOne(v => v.site)
                .WithMany(s => s.Venues)
                .HasForeignKey(v => v.siteid);

            modelBuilder.Entity<venue>()
                .HasMany(v => v.Reviews)
                .WithOne(r => r.venue)
                .HasForeignKey(r => r.venueid)
                .OnDelete(DeleteBehavior.Cascade);



            modelBuilder.Entity<venuefeature>()
               .HasKey(vf => vf.featureid);

            modelBuilder.Entity<venuefeaturemapping>()
                .HasKey(vfm => vfm.venuefeaturemappingid);

            modelBuilder.Entity<venuefeaturemapping>()
            .HasOne(vs => vs.venue)
            .WithMany(v => v.VenueFeatureMappings)
            .HasForeignKey(vs => vs.venueid)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<venuefeaturemapping>()
                .HasOne(vs => vs.venuefeature)
                .WithMany(s => s.VenueFeatureMappings)
                .HasForeignKey(vs => vs.featureid)
                .OnDelete(DeleteBehavior.Cascade);




            modelBuilder.Entity<VendorSiteMapping>().ToTable("vendorsite_mapping");
            modelBuilder.Entity<VendorSiteMapping>()
                .HasKey(vfm => vfm.vendorsiteid);

            modelBuilder.Entity<VendorSiteMapping>()
            .HasOne(vs => vs.vendor)
            .WithMany(v => v.VendorSiteMappings)
            .HasForeignKey(vs => vs.vendorid)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VendorSiteMapping>()
                .HasOne(vs => vs.site)
                .WithMany(s => s.VendorSiteMappings)
                .HasForeignKey(vs => vs.siteid)
                .OnDelete(DeleteBehavior.Cascade);



            modelBuilder.Entity<Review>()
                .HasKey(rv => rv.reviewid);

            modelBuilder.Entity<Booking>().ToTable("booking");
            modelBuilder.Entity<Booking>()
                .HasKey(rv => rv.bookingid); 
            
            modelBuilder.Entity<VenueImages>().ToTable("venueimages");
            modelBuilder.Entity<VenueImages>()
                .HasKey(rv => rv.venueimageid);

            modelBuilder.Entity<Otp>().ToTable("otps");
            modelBuilder.Entity<Otp>()
                .HasKey(rv => rv.id);


        }


    }

    

}
