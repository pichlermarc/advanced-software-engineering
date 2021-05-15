using Microsoft.EntityFrameworkCore;
using RapidGuestRegistration.Client.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RapidGuestRegistration.Ui.Data
{
	public class UserService
    {

        private UserDbContext dbContext;

        public UserService(UserDbContext dbContext)
        {
            this.dbContext = dbContext;

            //var user = new ClientUser();
            //user.Id = 2;
            //user.Email = "user2@email.com";
            //user.Name = "user2@email.com";
            //user.Password = "User2!";

            //user = AddUser(user);

        }
        public async Task<List<ClientUser>> GetUserAsync()
        {
            return await dbContext.ClientUser.ToListAsync();
        }

        public List<ClientUser> GetUser()
        {
            return dbContext.ClientUser.ToList();
        }
        public ClientUser GetUser(long userId)
        {
            return dbContext.ClientUser.First(user => user.Id == userId);
        }
        public async Task<ClientUser> AddUserAsync(ClientUser user)
        {
            try
            {
                dbContext.ClientUser.Add(user);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
            return user;
        }

        public ClientUser AddUser(ClientUser user)
        {
            try
            {
                dbContext.ClientUser.Add(user);
                dbContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return user;
        }
        public async Task<ClientUser> UpdateUserAsync(ClientUser user)
        {
            try
            {
                var userExist = dbContext.ClientUser.FirstOrDefault(u => u.Id == user.Id);
                if (userExist != null)
                {
                    dbContext.Update(user);
                    await dbContext.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
            return user;
        }
        public ClientUser UpdateUser(ClientUser user)
        {
            try
            {
                var userExist = dbContext.ClientUser.FirstOrDefault(u => u.Id == user.Id);
                if (userExist != null)
                {
                    dbContext.Update(user);
                    dbContext.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
            return user;
        }
        public async Task DeleteUserAsync(ClientUser user)
        {
            try
            {
                dbContext.ClientUser.Remove(user);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ClientUser DeleteUser(ClientUser user)
        {
            try
            {
                dbContext.ClientUser.Remove(user);
                dbContext.SaveChanges();

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

