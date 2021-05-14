# RapidGuestRegistration.Client.Api.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddLocation**](DefaultApi.md#addlocation) | **POST** /location | Add a new location
[**AddTableAtLocation**](DefaultApi.md#addtableatlocation) | **POST** /location/{locationId}/table | Add a new table on this location
[**AddUser**](DefaultApi.md#adduser) | **POST** /user | Add a new User
[**DeleteLocation**](DefaultApi.md#deletelocation) | **DELETE** /location/{locationId} | Delete a specific location.
[**DeleteTableAtLocation**](DefaultApi.md#deletetableatlocation) | **DELETE** /location/{locationId}/table/{tableId} | Delete this table
[**DeleteUser**](DefaultApi.md#deleteuser) | **DELETE** /user/{userId} | Delete a specific user.
[**GetLocation**](DefaultApi.md#getlocation) | **GET** /location/{locationId} | Get a specific location.
[**GetLocations**](DefaultApi.md#getlocations) | **GET** /location | Get your locations
[**GetReportForTable**](DefaultApi.md#getreportfortable) | **GET** /location/{locationId}/table/{tableId}/report/{reportType} | Register on this table on this location.
[**GetTableActivity**](DefaultApi.md#gettableactivity) | **GET** /location/{locationId}/table/{tableId}/activity | Register on this table on this location.
[**GetTableAtLocation**](DefaultApi.md#gettableatlocation) | **GET** /location/{locationId}/table/{tableId} | Get your tables
[**GetTablesAtLocation**](DefaultApi.md#gettablesatlocation) | **GET** /location/{locationId}/table | Get your location&#39;s tables
[**GetUser**](DefaultApi.md#getuser) | **GET** /user/{userId} | Get a specific user.
[**GetUsers**](DefaultApi.md#getusers) | **GET** /user | Get Users
[**RegisterAtTable**](DefaultApi.md#registerattable) | **POST** /location/{locationId}/table/{tableId}/register | Register on this table on this location.
[**UpdateLocation**](DefaultApi.md#updatelocation) | **PUT** /location | Update an existing location
[**UpdateLocationWithId**](DefaultApi.md#updatelocationwithid) | **POST** /location/{locationId} | Update an existing location
[**UpdateTableAtLocation**](DefaultApi.md#updatetableatlocation) | **POST** /location/{locationId}/table/{tableId} | Update an existing table
[**UpdateUser**](DefaultApi.md#updateuser) | **PUT** /user | Update an existing User
[**UpdateUserWithId**](DefaultApi.md#updateuserwithid) | **POST** /user/{userId} | Update an existing user


<a name="addlocation"></a>
# **AddLocation**
> Location AddLocation (Location location = null)

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
    public class AddLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var location = new Location(); // Location |  (optional) 

            try
            {
                // Add a new location
                Location result = apiInstance.AddLocation(location);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.AddLocation: " + e.Message );
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

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Insert successful. |  -  |
| **400** | Invalid location ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="addtableatlocation"></a>
# **AddTableAtLocation**
> Table AddTableAtLocation (long locationId, Table table = null)

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
    public class AddTableAtLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var table = new Table(); // Table |  (optional) 

            try
            {
                // Add a new table on this location
                Table result = apiInstance.AddTableAtLocation(locationId, table);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.AddTableAtLocation: " + e.Message );
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

No authorization required

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

<a name="adduser"></a>
# **AddUser**
> User AddUser (User user = null)

Add a new User

Add a User

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class AddUserExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var user = new User(); // User |  (optional) 

            try
            {
                // Add a new User
                User result = apiInstance.AddUser(user);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.AddUser: " + e.Message );
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
 **user** | [**User**](User.md)|  | [optional] 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Insert successful. |  -  |
| **400** | Invalid User ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="deletelocation"></a>
# **DeleteLocation**
> Location DeleteLocation (long locationId)

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
    public class DeleteLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.

            try
            {
                // Delete a specific location.
                Location result = apiInstance.DeleteLocation(locationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.DeleteLocation: " + e.Message );
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

No authorization required

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

<a name="deletetableatlocation"></a>
# **DeleteTableAtLocation**
> Table DeleteTableAtLocation (long locationId, long tableId)

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
    public class DeleteTableAtLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var tableId = 789;  // long | ID of the location to return.

            try
            {
                // Delete this table
                Table result = apiInstance.DeleteTableAtLocation(locationId, tableId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.DeleteTableAtLocation: " + e.Message );
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

[**Table**](Table.md)

### Authorization

No authorization required

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

<a name="deleteuser"></a>
# **DeleteUser**
> User DeleteUser (long userId)

Delete a specific user.

Deletes the user with the user ID.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class DeleteUserExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var userId = 789;  // long | ID of the user to return.

            try
            {
                // Delete a specific user.
                User result = apiInstance.DeleteUser(userId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.DeleteUser: " + e.Message );
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
 **userId** | **long**| ID of the user to return. | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Delete successful. |  -  |
| **400** | Invalid user ID |  -  |
| **404** | User not found |  -  |
| **403** | You are not allowed to delete this user. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="getlocation"></a>
# **GetLocation**
> Location GetLocation (long locationId)

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
    public class GetLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.

            try
            {
                // Get a specific location.
                Location result = apiInstance.GetLocation(locationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetLocation: " + e.Message );
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

No authorization required

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

<a name="getlocations"></a>
# **GetLocations**
> List&lt;Location&gt; GetLocations ()

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
    public class GetLocationsExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);

            try
            {
                // Get your locations
                List<Location> result = apiInstance.GetLocations();
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetLocations: " + e.Message );
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

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Locations retrieved successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="getreportfortable"></a>
# **GetReportForTable**
> InlineResponse2001 GetReportForTable (long locationId, long tableId, long datetimeFrom, long datetimeTo, string reportType)

Register on this table on this location.

Get report of reporttype on this table on this location.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class GetReportForTableExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to register on.
            var tableId = 789;  // long | ID of the table to register on.
            var datetimeFrom = 789;  // long | Datetime from which to search for guests at tableid locationid.
            var datetimeTo = 789;  // long | Datetime to which to search for guests at tableid locationid.
            var reportType = pdf or xls;  // string | type of report to retrieve.

            try
            {
                // Register on this table on this location.
                InlineResponse2001 result = apiInstance.GetReportForTable(locationId, tableId, datetimeFrom, datetimeTo, reportType);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetReportForTable: " + e.Message );
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
 **datetimeFrom** | **long**| Datetime from which to search for guests at tableid locationid. | 
 **datetimeTo** | **long**| Datetime to which to search for guests at tableid locationid. | 
 **reportType** | **string**| type of report to retrieve. | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Registration successful. |  -  |
| **400** | Invalid location or table ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="gettableactivity"></a>
# **GetTableActivity**
> InlineResponse200 GetTableActivity (long locationId, long tableId, DateTime from, DateTime to)

Register on this table on this location.

Get the amount of people registered on this table in the given time-range.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class GetTableActivityExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to get activity from
            var tableId = 789;  // long | ID of the table to get activity from
            var from = 2013-10-20T19:20:30+01:00;  // DateTime | Activity from
            var to = 2013-10-20T19:20:30+01:00;  // DateTime | Activity to

            try
            {
                // Register on this table on this location.
                InlineResponse200 result = apiInstance.GetTableActivity(locationId, tableId, from, to);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetTableActivity: " + e.Message );
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
 **locationId** | **long**| ID of the location to get activity from | 
 **tableId** | **long**| ID of the table to get activity from | 
 **from** | **DateTime**| Activity from | 
 **to** | **DateTime**| Activity to | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Activity lookup successful. |  -  |
| **404** | Location Id or Table Id not found. |  -  |
| **400** | Invalid location or table ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="gettableatlocation"></a>
# **GetTableAtLocation**
> Table GetTableAtLocation (long locationId, long tableId)

Get your tables

Get table with the given ID associated with this location

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class GetTableAtLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var tableId = 789;  // long | ID of the location to return.

            try
            {
                // Get your tables
                Table result = apiInstance.GetTableAtLocation(locationId, tableId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetTableAtLocation: " + e.Message );
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

[**Table**](Table.md)

### Authorization

No authorization required

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

<a name="gettablesatlocation"></a>
# **GetTablesAtLocation**
> List&lt;Table&gt; GetTablesAtLocation (long locationId)

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
    public class GetTablesAtLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.

            try
            {
                // Get your location's tables
                List<Table> result = apiInstance.GetTablesAtLocation(locationId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetTablesAtLocation: " + e.Message );
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

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="getuser"></a>
# **GetUser**
> User GetUser (long userId)

Get a specific user.

Gets the user with the user ID.

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class GetUserExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var userId = 789;  // long | ID of the user to return.

            try
            {
                // Get a specific user.
                User result = apiInstance.GetUser(userId);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetUser: " + e.Message );
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
 **userId** | **long**| ID of the user to return. | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid user ID |  -  |
| **404** | User not found |  -  |
| **403** | You are not allowed to access this user. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="getusers"></a>
# **GetUsers**
> List&lt;User&gt; GetUsers ()

Get Users

Get Users

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class GetUsersExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);

            try
            {
                // Get Users
                List<User> result = apiInstance.GetUsers();
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.GetUsers: " + e.Message );
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

[**List&lt;User&gt;**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Locations retrieved successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="registerattable"></a>
# **RegisterAtTable**
> Guest RegisterAtTable (long locationId, long tableId, Guest guest = null)

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
    public class RegisterAtTableExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to register on.
            var tableId = 789;  // long | ID of the table to register on.
            var guest = new Guest(); // Guest |  (optional) 

            try
            {
                // Register on this table on this location.
                Guest result = apiInstance.RegisterAtTable(locationId, tableId, guest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.RegisterAtTable: " + e.Message );
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

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Registration successful. |  -  |
| **400** | Invalid location or table ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="updatelocation"></a>
# **UpdateLocation**
> Location UpdateLocation (Location location = null)

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
    public class UpdateLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var location = new Location(); // Location |  (optional) 

            try
            {
                // Update an existing location
                Location result = apiInstance.UpdateLocation(location);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.UpdateLocation: " + e.Message );
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

No authorization required

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

<a name="updatelocationwithid"></a>
# **UpdateLocationWithId**
> Location UpdateLocationWithId (long locationId, Location location = null)

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
    public class UpdateLocationWithIdExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var location = new Location(); // Location |  (optional) 

            try
            {
                // Update an existing location
                Location result = apiInstance.UpdateLocationWithId(locationId, location);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.UpdateLocationWithId: " + e.Message );
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

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid location ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="updatetableatlocation"></a>
# **UpdateTableAtLocation**
> Table UpdateTableAtLocation (long locationId, long tableId, Table table = null)

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
    public class UpdateTableAtLocationExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var locationId = 789;  // long | ID of the location to return.
            var tableId = 789;  // long | ID of the location to return.
            var table = new Table(); // Table |  (optional) 

            try
            {
                // Update an existing table
                Table result = apiInstance.UpdateTableAtLocation(locationId, tableId, table);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.UpdateTableAtLocation: " + e.Message );
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

No authorization required

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

<a name="updateuser"></a>
# **UpdateUser**
> User UpdateUser (User user = null)

Update an existing User

Update a User

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class UpdateUserExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var user = new User(); // User |  (optional) 

            try
            {
                // Update an existing User
                User result = apiInstance.UpdateUser(user);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.UpdateUser: " + e.Message );
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
 **user** | [**User**](User.md)|  | [optional] 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid User ID |  -  |
| **404** | User not found |  -  |
| **403** | You are not allowed to change this User. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="updateuserwithid"></a>
# **UpdateUserWithId**
> User UpdateUserWithId (long userId, User user = null)

Update an existing user

Update a user

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using RapidGuestRegistration.Client.Api;
using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Model;

namespace Example
{
    public class UpdateUserWithIdExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "http://localhost";
            var apiInstance = new DefaultApi(config);
            var userId = 789;  // long | ID of the user to return.
            var user = new User(); // User |  (optional) 

            try
            {
                // Update an existing user
                User result = apiInstance.UpdateUserWithId(userId, user);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DefaultApi.UpdateUserWithId: " + e.Message );
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
 **userId** | **long**| ID of the user to return. | 
 **user** | [**User**](User.md)|  | [optional] 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Update successful. |  -  |
| **400** | Invalid user ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

