using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RapidGuestRegistration.Ui.Data
{
	public class UserDbContext : DbContext
	{
        public DbSet<ClientUser> ClientUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
    => options.UseSqlite("Data Source=app.db");


    }
}
