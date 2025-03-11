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
            
            modelBuilder.Entity<Review>()
                .HasKey(rv => rv.reviewid);

            modelBuilder.Entity<Booking>().ToTable("booking");
            modelBuilder.Entity<Booking>()
                .HasKey(rv => rv.bookingid);
        }


    }

    

}
