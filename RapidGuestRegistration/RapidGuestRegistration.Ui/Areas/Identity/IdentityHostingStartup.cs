using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RapidGuestRegistration.Ui.Data;

[assembly: HostingStartup(typeof(RapidGuestRegistration.Ui.Areas.Identity.IdentityHostingStartup))]
namespace RapidGuestRegistration.Ui.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {

        public IdentityHostingStartup()
        {
        }
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices(async (context, services) =>  {

               
            });

        }
    }
}

