#pragma checksum "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Pages/RegistrationForm.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8e599c2a0e0937950e5ed8c81acad74522e7aab7"
// <auto-generated/>
#pragma warning disable 1591
namespace RapidGuestRegistration.Ui.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using Microsoft.AspNetCore.Authorization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using Microsoft.AspNetCore.Components.Authorization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using RapidGuestRegistration.Ui;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/_Imports.razor"
using RapidGuestRegistration.Ui.Shared;

#line default
#line hidden
#nullable disable
    [Microsoft.AspNetCore.Components.RouteAttribute("/locations/{LocationId}/table/{TableId}/register")]
    public partial class RegistrationForm : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.AddMarkupContent(0, "<h3>RegistrationForm</h3>");
        }
        #pragma warning restore 1998
#nullable restore
#line 4 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Pages/RegistrationForm.razor"
       
    [Parameter]
    public string LocationId { get; set; }
    
    [Parameter]
    public string TableId { get; set; }

#line default
#line hidden
#nullable disable
    }
}
#pragma warning restore 1591
