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
        private Dictionary<long, List<Table>> _tables;

        public List<Location> LocationGet()
        {
            return _locations;
        }

        public ApiResponse<List<Location>> LocationGetWithHttpInfo()
        {
            throw new System.NotImplementedException();
        }

        public Location LocationLocationIdDelete(long locationId)
        {
            var itemToDelete = _locations.Find(location => location.Id == locationId);
            _locations.Remove(itemToDelete);
            return itemToDelete;
        }

        public ApiResponse<Location> LocationLocationIdDeleteWithHttpInfo(long locationId)
        {
            throw new System.NotImplementedException();
        }

        public Location LocationLocationIdGet(long locationId)
        {
            return _locations.Find(location => location.Id == locationId);
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

        public List<Table> LocationLocationIdTableGet(long locationId)
        {
            try
            {
                return _tables[locationId].Select(table => new Table(table.Id, table.Name)).ToList();
            } catch(Exception emptyList)
            {
                return new List<Table>();
            }
            
        }

        public ApiResponse<List<Table>> LocationLocationIdTableGetWithHttpInfo(long locationId)
        {
            throw new System.NotImplementedException();
        }

        public Table LocationLocationIdTablePost(long locationId, Table table = default(Table))
        {
            if (!_tables.ContainsKey(locationId)) 
            {
                _tables[locationId] = new List<Table>();
            }
            table.Id = _tables[locationId].Select(existingTable => existingTable.Id).DefaultIfEmpty(0).Max() + 1;
            _tables[locationId].Add(table);
            return table;
        }

        public ApiResponse<Table> LocationLocationIdTablePostWithHttpInfo(long locationId, Table table = default(Table))
        {
            throw new System.NotImplementedException();
        }

        public List<Table> LocationLocationIdTableTableIdDelete(long locationId, long tableId)
        {

            throw new System.NotImplementedException();
        }

        public ApiResponse<List<Table>> LocationLocationIdTableTableIdDeleteWithHttpInfo(long locationId, long tableId)
        {
            throw new System.NotImplementedException();
        }

        public List<Table> LocationLocationIdTableTableIdGet(long locationId, long tableId)
        {
            throw new System.NotImplementedException();
        }

        public ApiResponse<List<Table>> LocationLocationIdTableTableIdGetWithHttpInfo(long locationId, long tableId)
        {
            throw new System.NotImplementedException();
        }

        public Table LocationLocationIdTableTableIdPost(long locationId, long tableId, Table table = default(Table))
        {
            throw new System.NotImplementedException();
        }

        public ApiResponse<Table> LocationLocationIdTableTableIdPostWithHttpInfo(long locationId, long tableId,
            Table table = default(Table))
        {
            throw new System.NotImplementedException();
        }

        public Guest LocationLocationIdTableTableIdRegisterPost(long locationId, long tableId,
            Guest guest = default(Guest))
        {
            throw new System.NotImplementedException();
        }

        public ApiResponse<Guest> LocationLocationIdTableTableIdRegisterPostWithHttpInfo(long locationId, long tableId,
            Guest guest = default(Guest))
        {
            throw new System.NotImplementedException();
        }

        public Location LocationPost(Location location = default(Location))
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

        public Location LocationPut(Location location = default(Location))
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
    }
}