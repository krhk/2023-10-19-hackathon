using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public DbSet<Connection> Connections { get; set; }
    public DbSet<TimeTable> TimeTables { get; set; }
    public DbSet<Stop> Stops { get; set; }

    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }
}