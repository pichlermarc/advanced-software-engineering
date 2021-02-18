using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RapidGuestRegistration.Ui.Areas.Identity
{
    public class StandardUserService : IHostedService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly string _defaultUsername;
        private readonly string _defaultPassword;
        public StandardUserService(IServiceScopeFactory scopeFactory, string defaultUsername, string defaultPassword)
        {
            _scopeFactory = scopeFactory;
            _defaultUsername = defaultUsername;
            _defaultPassword = defaultPassword;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {

            using (var scope = _scopeFactory.CreateScope())
            {

                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

                var user = new IdentityUser();
                user.Email = _defaultUsername;
                user.UserName = _defaultUsername;
                user.EmailConfirmed = true;
                await userManager.DeleteAsync(user);
                var result = await userManager.CreateAsync(user, _defaultPassword);
              
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
