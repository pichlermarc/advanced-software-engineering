using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Ui.Areas.Identity;
using RapidGuestRegistration.Ui.Data;
using Syncfusion.Blazor;

namespace RapidGuestRegistration.Ui
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(
                    Configuration.GetConnectionString("DefaultConnection")));
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddSyncfusionBlazor();
            services.AddScoped<AuthenticationStateProvider, RevalidatingIdentityAuthenticationStateProvider<IdentityUser>>();
            services.AddSingleton<IDefaultApi>(provider =>
            {
                var apiConfiguration = Configuration.GetSection("api");
                if(apiConfiguration.GetValue<string>("mode") == "production")
                    return new DefaultApi(apiConfiguration.GetValue<string>("baseUrl"));
                if (apiConfiguration.GetValue<string>("mode") == "mock")
                    return new MockApi();
                throw new InvalidOperationException(
                    "Cannot determine operation mode, use either \"production\" or \"mock\"");
            });

            var defaultUserSection = Configuration.GetSection("DefaultUser");
            var defaultMail = defaultUserSection.GetSection("Email").Value;
            var defaultPassword = defaultUserSection.GetSection("Password").Value;

            services.AddHostedService<StandardUserService>(serviceProvider =>
  new StandardUserService(
      serviceProvider.GetService<IServiceScopeFactory>(), defaultMail, defaultPassword));


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Mzk5ODgxQDMxMzgyZTM0MmUzMFcwSzJwbkV5Z1dGUmN0eXNKd201enZDcW5ibS83SjB4VVVTdDhHMmlwcXc9");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapBlazorHub();
                endpoints.MapFallbackToPage("/_Host");
            });
        }
    }
}
