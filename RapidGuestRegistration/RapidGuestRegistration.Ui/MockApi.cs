using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace RapidGuestRegistration.Ui
{
    public class MockApi : IDefaultApi
    {
        public MockApi()
        {
            _locations = new List<Location>
            {
                new Location {Id = 1, Name = "Location #1"}, 
                new Location {Id = 2, Name = "Location #2"},
                new Location {Id = 3, Name = "Location #3"}
            };

            _users = new List<User>
            {
                new User {Id = 1, Name = "User #1"},

            };


            _tables = new Dictionary<long, List<Table>>()
            {
                {1L, new List<Table>() {new Table(1L, "table1")}}
            };
        }

        public IReadableConfiguration Configuration { get; set; }

        public string GetBasePath()
        {
            throw new System.NotImplementedException();
        }

        public ExceptionFactory ExceptionFactory { get; set; }
        private List<Location> _locations;
        private List<User> _users;
        private Dictionary<long, List<Table>> _tables;

        public ApiResponse<Location> GetLocationWithHttpInfo(long locationId)
        {
            throw new NotImplementedException();
        }

        public List<Location> GetLocations()
        {
            return _locations;
        }

        public ApiResponse<List<Location>> GetLocationsWithHttpInfo()
        {
            throw new NotImplementedException();
        }

        public InlineResponse2001 GetReportForTable(long locationId, long tableId, long datetimeFrom, long datetimeTo,
            string reportType)
        {
            throw new NotImplementedException();
        }

        public ApiResponse<InlineResponse2001> GetReportForTableWithHttpInfo(long locationId, long tableId, long datetimeFrom, long datetimeTo,
            string reportType)
        {
            throw new NotImplementedException();
        }

        public InlineResponse200 GetTableActivity(long locationId, long tableId, DateTime @from, DateTime to)
        {
            var random = new Random(); 
            return new InlineResponse200(random.Next(1, 10));
        }

        public ApiResponse<InlineResponse200> GetTableActivityWithHttpInfo(long locationId, long tableId, DateTime @from, DateTime to)
        {
            throw new NotImplementedException();
        }

        public ApiResponse<List<Location>> LocationGetWithHttpInfo()
        {
            throw new System.NotImplementedException();
        }

       

        public ApiResponse<Location> LocationLocationIdDeleteWithHttpInfo(long locationId)
        {
            throw new System.NotImplementedException();
        }

     

        public ApiResponse<Location> LocationLocationIdGetWithHttpInfo(long locationId)
        {
            throw new System.NotImplementedException();
        }

        public Location LocationLocationIdPost(long locationId, Location location = default(Location))
        {
            throw new System.NotImplementedException();
        }

        public ApiResponse<Location> LocationLocationIdPostWithHttpInfo(long locationId,
            Location location = default(Location))
        {
            throw new System.NotImplementedException();
        }

        public ApiResponse<Table> GetTableAtLocationWithHttpInfo(long locationId, long tableId)
        {
            throw new NotImplementedException();
        }

        public List<Table> GetTablesAtLocation(long locationId)
        {
            try
            {
                return _tables[locationId].Select(table => new Table(table.Id, table.Name)).ToList();
            } catch(Exception emptyList)
            {
                return new List<Table>();
            }
        }

        public ApiResponse<List<Table>> GetTablesAtLocationWithHttpInfo(long locationId)
        {
            throw new NotImplementedException();
        }

        public ApiResponse<List<Table>> LocationLocationIdTableGetWithHttpInfo(long locationId)
        {
            throw new System.NotImplementedException();
        }

        public ApiResponse<Location> AddLocationWithHttpInfo(Location location = default(Location))
        {
            throw new NotImplementedException();
        }

        public Table AddTableAtLocation(long locationId, Table table = default(Table))
        {
            if (table == null)
                throw new ArgumentNullException(nameof(table));
            if (!_tables.ContainsKey(locationId)) 
            {
                _tables[locationId] = new List<Table>();
            }
            table.Id = _tables[locationId].Select(existingTable => existingTable.Id).DefaultIfEmpty(0).Max() + 1;
            _tables[locationId].Add(table);
            return table;
        }

        public ApiResponse<Table> AddTableAtLocationWithHttpInfo(long locationId, Table table = default(Table))
        {
            throw new NotImplementedException();
        }

        public Location DeleteLocation(long locationId)
        {
            var itemToDelete = _locations.Find(location => location.Id == locationId);
            _locations.Remove(itemToDelete);
            return itemToDelete;
        }

        public ApiResponse<Location> DeleteLocationWithHttpInfo(long locationId)
        {
            throw new NotImplementedException();
        }

        public ApiResponse<Table> LocationLocationIdTablePostWithHttpInfo(long locationId, Table table = default(Table))
        {
            throw new System.NotImplementedException();
        }
        
        public Table DeleteTableAtLocation(long locationId, long tableId)
        {
            _tables[locationId].RemoveAll(table => table.Id == tableId);
            return null;
        }

        public ApiResponse<Table> DeleteTableAtLocationWithHttpInfo(long locationId, long tableId)
        {
            throw new NotImplementedException();
        }

        public Location GetLocation(long locationId)
        {
            return _locations.Find(location => location.Id == locationId);
        }

        public ApiResponse<List<Table>> LocationLocationIdTableTableIdDeleteWithHttpInfo(long locationId, long tableId)
        {
            throw new System.NotImplementedException();
        }

        public Table GetTableAtLocation(long locationId, long tableId)
        {
            try
            {
                return _tables[locationId].First(table => table.Id == tableId);
            }catch(Exception e)
            {
                throw new ApiException();
            }
        }

        public ApiResponse<List<Table>> LocationLocationIdTableTableIdGetWithHttpInfo(long locationId, long tableId)
        {
            throw new System.NotImplementedException();
        }

        public ApiResponse<Location> UpdateLocationWithIdWithHttpInfo(long locationId, Location location = default(Location))
        {
            throw new NotImplementedException();
        }

        public Table UpdateTableAtLocation(long locationId, long tableId, Table table = default(Table))
        {
            try
            {
                var updatedTable = _tables[locationId].First(table => table.Id == tableId);
                updatedTable.Name = table.Name;
                return updatedTable;
            }catch(Exception e)
            {
                throw new ApiException();
            }
        }

        public ApiResponse<Table> UpdateTableAtLocationWithHttpInfo(long locationId, long tableId, Table table = default(Table))
        {
            throw new NotImplementedException();
        }

        public ApiResponse<Table> LocationLocationIdTableTableIdPostWithHttpInfo(long locationId, long tableId,
            Table table = default(Table))
        {
            throw new System.NotImplementedException();
        }

        public Guest RegisterAtTable(long locationId, long tableId, Guest guest = default(Guest))
        {
            throw new ApiException();
        }

        public ApiResponse<Guest> RegisterAtTableWithHttpInfo(long locationId, long tableId, Guest guest = default(Guest))
        {
            throw new NotImplementedException();
        }

        public ApiResponse<Guest> LocationLocationIdTableTableIdRegisterPostWithHttpInfo(long locationId, long tableId,
            Guest guest = default(Guest))
        {
            throw new System.NotImplementedException();
        }

        public Location AddLocation(Location location = default(Location))
        {
            if (location == null)
                throw new ArgumentNullException(nameof(location));

            location.Id  = _locations.Select(existingLocation => existingLocation.Id).DefaultIfEmpty(0).Max() + 1;
            
            
            // Copy location object since we want to simulate inserts without references.
            _locations.Add(new Location {Id = location.Id, Name = location.Name});
            return location;
        }

        public ApiResponse<Location> LocationPostWithHttpInfo(Location location = default(Location))
        {
            throw new System.NotImplementedException();
        }

        public Location UpdateLocation(Location location = default(Location))
        {
            if (location == null)
                throw new ArgumentNullException(nameof(location));
            
            var locationToUpdate = _locations.Find(listLocation => listLocation.Id == location.Id);
            if (locationToUpdate == null)
                throw new InvalidOperationException($"Could not find location with ID {location.Id} to update");
            locationToUpdate.Id = location.Id;
            locationToUpdate.Name = location.Name;

            return locationToUpdate;
        }

        public ApiResponse<Location> UpdateLocationWithHttpInfo(Location location = default(Location))
        {
            throw new NotImplementedException();
        }

        public Location UpdateLocationWithId(long locationId, Location location = default(Location))
        {
            throw new NotImplementedException();
        }

        public ApiResponse<Location> LocationPutWithHttpInfo(Location location = default(Location))
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Location>> LocationGetAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<List<Location>>> LocationGetWithHttpInfoAsync(
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Location> LocationLocationIdDeleteAsync(long locationId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Location>> LocationLocationIdDeleteWithHttpInfoAsync(long locationId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Location> LocationLocationIdGetAsync(long locationId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Location>> LocationLocationIdGetWithHttpInfoAsync(long locationId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Location> LocationLocationIdPostAsync(long locationId, Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Location>> LocationLocationIdPostWithHttpInfoAsync(long locationId,
            Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Table>> LocationLocationIdTableGetAsync(long locationId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<List<Table>>> LocationLocationIdTableGetWithHttpInfoAsync(long locationId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Table> LocationLocationIdTablePostAsync(long locationId, Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Table>> LocationLocationIdTablePostWithHttpInfoAsync(long locationId,
            Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Table>> LocationLocationIdTableTableIdDeleteAsync(long locationId, long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<List<Table>>> LocationLocationIdTableTableIdDeleteWithHttpInfoAsync(long locationId,
            long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Table>> LocationLocationIdTableTableIdGetAsync(long locationId, long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<List<Table>>> LocationLocationIdTableTableIdGetWithHttpInfoAsync(long locationId,
            long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Table> LocationLocationIdTableTableIdPostAsync(long locationId, long tableId,
            Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Table>> LocationLocationIdTableTableIdPostWithHttpInfoAsync(long locationId,
            long tableId, Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Guest> LocationLocationIdTableTableIdRegisterPostAsync(long locationId, long tableId,
            Guest guest = default(Guest),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Guest>> LocationLocationIdTableTableIdRegisterPostWithHttpInfoAsync(long locationId,
            long tableId,
            Guest guest = default(Guest), CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Location> LocationPostAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Location>> LocationPostWithHttpInfoAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Location> LocationPutAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<ApiResponse<Location>> LocationPutWithHttpInfoAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new System.NotImplementedException();
        }

        public Task<Location> AddLocationAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Location>> AddLocationWithHttpInfoAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Table> AddTableAtLocationAsync(long locationId, Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Table>> AddTableAtLocationWithHttpInfoAsync(long locationId, Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Location> DeleteLocationAsync(long locationId, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Location>> DeleteLocationWithHttpInfoAsync(long locationId, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Table> DeleteTableAtLocationAsync(long locationId, long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Table>> DeleteTableAtLocationWithHttpInfoAsync(long locationId, long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Location> GetLocationAsync(long locationId, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Location>> GetLocationWithHttpInfoAsync(long locationId, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<List<Location>> GetLocationsAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<List<Location>>> GetLocationsWithHttpInfoAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<InlineResponse2001> GetReportForTableAsync(long locationId, long tableId, long datetimeFrom, long datetimeTo, string reportType,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<InlineResponse2001>> GetReportForTableWithHttpInfoAsync(long locationId, long tableId, long datetimeFrom, long datetimeTo,
            string reportType, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<InlineResponse200> GetTableActivityAsync(long locationId, long tableId, DateTime @from, DateTime to,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<InlineResponse200>> GetTableActivityWithHttpInfoAsync(long locationId, long tableId, DateTime @from, DateTime to,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Table> GetTableAtLocationAsync(long locationId, long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Table>> GetTableAtLocationWithHttpInfoAsync(long locationId, long tableId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<List<Table>> GetTablesAtLocationAsync(long locationId, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<List<Table>>> GetTablesAtLocationWithHttpInfoAsync(long locationId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Guest> RegisterAtTableAsync(long locationId, long tableId, Guest guest = default(Guest),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Guest>> RegisterAtTableWithHttpInfoAsync(long locationId, long tableId, Guest guest = default(Guest),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Location> UpdateLocationAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Location>> UpdateLocationWithHttpInfoAsync(Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Location> UpdateLocationWithIdAsync(long locationId, Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Location>> UpdateLocationWithIdWithHttpInfoAsync(long locationId, Location location = default(Location),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<Table> UpdateTableAtLocationAsync(long locationId, long tableId, Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<Table>> UpdateTableAtLocationWithHttpInfoAsync(long locationId, long tableId, Table table = default(Table),
            CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

		public User AddUser(User user = null)
		{
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            user.Id = _users.Select(existingUser=> existingUser.Id).DefaultIfEmpty(0).Max() + 1;


            // Copy location object since we want to simulate inserts without references.
            _users.Add(new User { Id = user.Id, Name = user.Name });
            return user;
        }

		public ApiResponse<User> AddUserWithHttpInfo(User user = null)
		{
			throw new NotImplementedException();
		}

		public User DeleteUser(long userId)
		{
            var itemToDelete = _users.Find(user => user.Id == userId);
            _users.Remove(itemToDelete);
            return itemToDelete;
        }

		public ApiResponse<User> DeleteUserWithHttpInfo(long userId)
		{
			throw new NotImplementedException();
		}

		public User GetUser(long userId)
		{
            return _users.Find(user => user.Id == userId);
        }

		public ApiResponse<User> GetUserWithHttpInfo(long userId)
		{
			throw new NotImplementedException();
		}

		public List<User> GetUsers()
		{
            return _users;

        }

		public ApiResponse<List<User>> GetUsersWithHttpInfo()
		{
			throw new NotImplementedException();
		}

		public User UpdateUser(User user = null)
		{
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var userToUpdate = _users.Find(listLocation => listLocation.Id == user.Id);
            if (userToUpdate == null)
                throw new InvalidOperationException($"Could not find user with ID {user.Id} to update");
            userToUpdate.Id = user.Id;
            userToUpdate.Name = user.Name;

            return userToUpdate;
        }

		public ApiResponse<User> UpdateUserWithHttpInfo(User user = null)
		{
			throw new NotImplementedException();
		}

		public User UpdateUserWithId(long userId, User user = null)
		{
			throw new NotImplementedException();
		}

		public ApiResponse<User> UpdateUserWithIdWithHttpInfo(long userId, User user = null)
		{
			throw new NotImplementedException();
		}

		public Task<User> AddUserAsync(User user = null, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<ApiResponse<User>> AddUserWithHttpInfoAsync(User user = null, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<User> DeleteUserAsync(long userId, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<ApiResponse<User>> DeleteUserWithHttpInfoAsync(long userId, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<User> GetUserAsync(long userId, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<ApiResponse<User>> GetUserWithHttpInfoAsync(long userId, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<List<User>> GetUsersAsync(CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<ApiResponse<List<User>>> GetUsersWithHttpInfoAsync(CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<User> UpdateUserAsync(User user = null, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<ApiResponse<User>> UpdateUserWithHttpInfoAsync(User user = null, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<User> UpdateUserWithIdAsync(long userId, User user = null, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}

		public Task<ApiResponse<User>> UpdateUserWithIdWithHttpInfoAsync(long userId, User user = null, CancellationToken cancellationToken = default)
		{
			throw new NotImplementedException();
		}
	}
}