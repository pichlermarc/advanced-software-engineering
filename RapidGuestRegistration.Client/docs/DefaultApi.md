# RapidGuestRegistration.Client.Api.DefaultApi

All URIs are relative to *http://localhost/api/v0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**LocationGet**](DefaultApi.md#locationget) | **GET** /location | Get your locations
[**LocationLocationIdDelete**](DefaultApi.md#locationlocationiddelete) | **DELETE** /location/{locationId} | Delete a specific location.
[**LocationLocationIdGet**](DefaultApi.md#locationlocationidget) | **GET** /location/{locationId} | Get a specific location.
[**LocationLocationIdPost**](DefaultApi.md#locationlocationidpost) | **POST** /location/{locationId} | Update an existing location
[**LocationLocationIdTableGet**](DefaultApi.md#locationlocationidtableget) | **GET** /location/{locationId}/table | Get your location&#39;s tables
[**LocationLocationIdTablePost**](DefaultApi.md#locationlocationidtablepost) | **POST** /location/{locationId}/table | Add a new table on this location
[**LocationLocationIdTableTableIdDelete**](DefaultApi.md#locationlocationidtabletableiddelete) | **DELETE** /location/{locationId}/table/{tableId} | Delete this table
[**LocationLocationIdTableTableIdGet**](DefaultApi.md#locationlocationidtabletableidget) | **GET** /location/{locationId}/table/{tableId} | Get your tables
[**LocationLocationIdTableTableIdPost**](DefaultApi.md#locationlocationidtabletableidpost) | **POST** /location/{locationId}/table/{tableId} | Update an existing table
[**LocationLocationIdTableTableIdRegisterPost**](DefaultApi.md#locationlocationidtabletableidregisterpost) | **POST** /location/{locationId}/table/{tableId}/register | Register on this table on this location.
[**LocationPost**](DefaultApi.md#locationpost) | **POST** /location | Add a new location
[**LocationPut**](DefaultApi.md#locationput) | **PUT** /location | Update an existing location


<a name="locationget"></a>
# **LocationGet**
> List&lt;Location&gt; LocationGet ()

Get your locations

Get locations associated with your user

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationGetExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);

            try
            {
                // Get your locations
                List<Location> result = apiInstance.LocationGet();
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationGet: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List&lt;Location&gt;**](Location.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Locations retrieved successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationiddelete"></a>
# **LocationLocationIdDelete**
> Location LocationLocationIdDelete (long locationId)

Delete a specific location.

Deletes the location with the location ID.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdDeleteExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.

            try
            {
                // Delete a specific location.
                Location result = apiInstance.LocationLocationIdDelete(locationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdDelete: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 

### Return type

[**Location**](Location.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Delete successful. |  -  |
| **400** | Invalid location ID |  -  |
| **404** | Location not found |  -  |
| **403** | You are not allowed to delete this location. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidget"></a>
# **LocationLocationIdGet**
> Location LocationLocationIdGet (long locationId)

Get a specific location.

Gets the location with the location ID.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdGetExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.

            try
            {
                // Get a specific location.
                Location result = apiInstance.LocationLocationIdGet(locationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdGet: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 

### Return type

[**Location**](Location.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid location ID |  -  |
| **404** | Location not found |  -  |
| **403** | You are not allowed to access this location. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidpost"></a>
# **LocationLocationIdPost**
> Location LocationLocationIdPost (long locationId, Location location = null)

Update an existing location

Update a location

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdPostExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var location = new Location(); // Location |  (optional) 

            try
            {
                // Update an existing location
                Location result = apiInstance.LocationLocationIdPost(locationId, location);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdPost: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 
 **location** | [**Location**](Location.md)|  | [optional] 

### Return type

[**Location**](Location.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid location ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidtableget"></a>
# **LocationLocationIdTableGet**
> List&lt;Table&gt; LocationLocationIdTableGet (long locationId)

Get your location's tables

Get tables associated with this location

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdTableGetExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.

            try
            {
                // Get your location's tables
                List<Table> result = apiInstance.LocationLocationIdTableGet(locationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdTableGet: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 

### Return type

[**List&lt;Table&gt;**](Table.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidtablepost"></a>
# **LocationLocationIdTablePost**
> Table LocationLocationIdTablePost (long locationId, Table table = null)

Add a new table on this location

Add a table

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdTablePostExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var table = new Table(); // Table |  (optional) 

            try
            {
                // Add a new table on this location
                Table result = apiInstance.LocationLocationIdTablePost(locationId, table);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdTablePost: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 
 **table** | [**Table**](Table.md)|  | [optional] 

### Return type

[**Table**](Table.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Insert successful. |  -  |
| **400** | Invalid location ID. |  -  |
| **403** | You are not allowed to modify this location |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidtabletableiddelete"></a>
# **LocationLocationIdTableTableIdDelete**
> List&lt;Table&gt; LocationLocationIdTableTableIdDelete (long locationId, long tableId)

Delete this table

Delete the table on this location.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdTableTableIdDeleteExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var tableId = 789;  // long | ID of the location to return.

            try
            {
                // Delete this table
                List<Table> result = apiInstance.LocationLocationIdTableTableIdDelete(locationId, tableId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdTableTableIdDelete: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 
 **tableId** | **long**| ID of the location to return. | 

### Return type

[**List&lt;Table&gt;**](Table.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Table deletion successful. |  -  |
| **403** | Table or location does not exist. |  -  |
| **404** | Table or location does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidtabletableidget"></a>
# **LocationLocationIdTableTableIdGet**
> List&lt;Table&gt; LocationLocationIdTableTableIdGet (long locationId, long tableId)

Get your tables

Get tables associated with this location

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdTableTableIdGetExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var tableId = 789;  // long | ID of the location to return.

            try
            {
                // Get your tables
                List<Table> result = apiInstance.LocationLocationIdTableTableIdGet(locationId, tableId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdTableTableIdGet: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 
 **tableId** | **long**| ID of the location to return. | 

### Return type

[**List&lt;Table&gt;**](Table.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Table retrieval successful. |  -  |
| **403** | Table or location does not exist. |  -  |
| **404** | Table or location does not exist. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidtabletableidpost"></a>
# **LocationLocationIdTableTableIdPost**
> Table LocationLocationIdTableTableIdPost (long locationId, long tableId, Table table = null)

Update an existing table

Update a table

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdTableTableIdPostExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var tableId = 789;  // long | ID of the location to return.
            var table = new Table(); // Table |  (optional) 

            try
            {
                // Update an existing table
                Table result = apiInstance.LocationLocationIdTableTableIdPost(locationId, tableId, table);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdTableTableIdPost: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to return. | 
 **tableId** | **long**| ID of the location to return. | 
 **table** | [**Table**](Table.md)|  | [optional] 

### Return type

[**Table**](Table.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid location or table ID |  -  |
| **403** | You are not allowed to edit this table. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationlocationidtabletableidregisterpost"></a>
# **LocationLocationIdTableTableIdRegisterPost**
> Guest LocationLocationIdTableTableIdRegisterPost (long locationId, long tableId, Guest guest = null)

Register on this table on this location.

Register on this table on this location.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationLocationIdTableTableIdRegisterPostExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to register on.
            var tableId = 789;  // long | ID of the table to register on.
            var guest = new Guest(); // Guest |  (optional) 

            try
            {
                // Register on this table on this location.
                Guest result = apiInstance.LocationLocationIdTableTableIdRegisterPost(locationId, tableId, guest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationLocationIdTableTableIdRegisterPost: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **locationId** | **long**| ID of the location to register on. | 
 **tableId** | **long**| ID of the table to register on. | 
 **guest** | [**Guest**](Guest.md)|  | [optional] 

### Return type

[**Guest**](Guest.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Registration successful. |  -  |
| **400** | Invalid location or table ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationpost"></a>
# **LocationPost**
> Location LocationPost (Location location = null)

Add a new location

Add a location

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationPostExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var location = new Location(); // Location |  (optional) 

            try
            {
                // Add a new location
                Location result = apiInstance.LocationPost(location);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationPost: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **location** | [**Location**](Location.md)|  | [optional] 

### Return type

[**Location**](Location.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Insert successful. |  -  |
| **400** | Invalid location ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="locationput"></a>
# **LocationPut**
> Location LocationPut (Location location = null)

Update an existing location

Update a location

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class LocationPutExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost/api/v0";
            // Configure API key authorization: api_key
            config.AddApiKey("api_key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("api_key", "Bearer");

            var apiInstance = new DefaultApi(config);
            var location = new Location(); // Location |  (optional) 

            try
            {
                // Update an existing location
                Location result = apiInstance.LocationPut(location);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.LocationPut: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **location** | [**Location**](Location.md)|  | [optional] 

### Return type

[**Location**](Location.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid location ID |  -  |
| **404** | Location not found |  -  |
| **403** | You are not allowed to change this location. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

