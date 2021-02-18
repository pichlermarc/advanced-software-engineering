/*
 * RapidGuestRegistration - OpenAPI 3.0
 *
 * This is the RapidGuestRegistration API, used for everything from creating tables to managing users, as well as registering for guests.
 *
 * The version of the OpenAPI document: 3.0.2
 * Contact: group-b@rapidguestregistration.com
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */

using System;
using System.IO;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using RestSharp;
using Xunit;

using RapidGuestRegistration.Client.Client;
using RapidGuestRegistration.Client.Api;
// uncomment below to import models
//using RapidGuestRegistration.Client.Model;

namespace RapidGuestRegistration.Client.Test.Api
{
    /// <summary>
    ///  Class for testing DefaultApi
    /// </summary>
    /// <remarks>
    /// This file is automatically generated by OpenAPI Generator (https://openapi-generator.tech).
    /// Please update the test case below to test the API endpoint.
    /// </remarks>
    public class DefaultApiTests : IDisposable
    {
        private DefaultApi instance;

        public DefaultApiTests()
        {
            instance = new DefaultApi();
        }

        public void Dispose()
        {
            // Cleanup when everything is done.
        }

        /// <summary>
        /// Test an instance of DefaultApi
        /// </summary>
        [Fact]
        public void InstanceTest()
        {
            // TODO uncomment below to test 'IsType' DefaultApi
            //Assert.IsType<DefaultApi>(instance);
        }

        /// <summary>
        /// Test AddLocation
        /// </summary>
        [Fact]
        public void AddLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //Location location = null;
            //var response = instance.AddLocation(location);
            //Assert.IsType<Location>(response);
        }

        /// <summary>
        /// Test AddTableAtLocation
        /// </summary>
        [Fact]
        public void AddTableAtLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //Table table = null;
            //var response = instance.AddTableAtLocation(locationId, table);
            //Assert.IsType<Table>(response);
        }

        /// <summary>
        /// Test DeleteLocation
        /// </summary>
        [Fact]
        public void DeleteLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //var response = instance.DeleteLocation(locationId);
            //Assert.IsType<Location>(response);
        }

        /// <summary>
        /// Test DeleteTableAtLocation
        /// </summary>
        [Fact]
        public void DeleteTableAtLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //long tableId = null;
            //var response = instance.DeleteTableAtLocation(locationId, tableId);
            //Assert.IsType<Table>(response);
        }

        /// <summary>
        /// Test GetLocation
        /// </summary>
        [Fact]
        public void GetLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //var response = instance.GetLocation(locationId);
            //Assert.IsType<Location>(response);
        }

        /// <summary>
        /// Test GetLocations
        /// </summary>
        [Fact]
        public void GetLocationsTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //var response = instance.GetLocations();
            //Assert.IsType<List<Location>>(response);
        }

        /// <summary>
        /// Test GetReportForTable
        /// </summary>
        [Fact]
        public void GetReportForTableTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //long tableId = null;
            //long datetimeFrom = null;
            //long datetimeTo = null;
            //string reportType = null;
            //var response = instance.GetReportForTable(locationId, tableId, datetimeFrom, datetimeTo, reportType);
            //Assert.IsType<InlineResponse2001>(response);
        }

        /// <summary>
        /// Test GetTableActivity
        /// </summary>
        [Fact]
        public void GetTableActivityTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //long tableId = null;
            //DateTime from = null;
            //DateTime to = null;
            //var response = instance.GetTableActivity(locationId, tableId, from, to);
            //Assert.IsType<InlineResponse200>(response);
        }

        /// <summary>
        /// Test GetTableAtLocation
        /// </summary>
        [Fact]
        public void GetTableAtLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //long tableId = null;
            //var response = instance.GetTableAtLocation(locationId, tableId);
            //Assert.IsType<Table>(response);
        }

        /// <summary>
        /// Test GetTablesAtLocation
        /// </summary>
        [Fact]
        public void GetTablesAtLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //var response = instance.GetTablesAtLocation(locationId);
            //Assert.IsType<List<Table>>(response);
        }

        /// <summary>
        /// Test RegisterAtTable
        /// </summary>
        [Fact]
        public void RegisterAtTableTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //long tableId = null;
            //Guest guest = null;
            //var response = instance.RegisterAtTable(locationId, tableId, guest);
            //Assert.IsType<Guest>(response);
        }

        /// <summary>
        /// Test UpdateLocation
        /// </summary>
        [Fact]
        public void UpdateLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //Location location = null;
            //var response = instance.UpdateLocation(location);
            //Assert.IsType<Location>(response);
        }

        /// <summary>
        /// Test UpdateLocationWithId
        /// </summary>
        [Fact]
        public void UpdateLocationWithIdTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //Location location = null;
            //var response = instance.UpdateLocationWithId(locationId, location);
            //Assert.IsType<Location>(response);
        }

        /// <summary>
        /// Test UpdateTableAtLocation
        /// </summary>
        [Fact]
        public void UpdateTableAtLocationTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //long locationId = null;
            //long tableId = null;
            //Table table = null;
            //var response = instance.UpdateTableAtLocation(locationId, tableId, table);
            //Assert.IsType<Table>(response);
        }
    }
}
