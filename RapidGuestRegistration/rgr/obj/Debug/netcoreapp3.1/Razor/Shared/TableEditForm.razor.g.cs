#pragma checksum "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "61490e304b6538cd4ee1db21accf078d92202662"
// <auto-generated/>
#pragma warning disable 1591
namespace RapidGuestRegistration.Ui.Shared
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
#nullable restore
#line 1 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
using RapidGuestRegistration.Client.Model;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
using RapidGuestRegistration.Client.Api;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
using RapidGuestRegistration.Client.Client;

#line default
#line hidden
#nullable disable
    public partial class TableEditForm : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
#nullable restore
#line 9 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
 if (_table != null)
{

#line default
#line hidden
#nullable disable
            __builder.AddContent(0, "    ");
            __builder.OpenComponent<Microsoft.AspNetCore.Components.Forms.EditForm>(1);
            __builder.AddAttribute(2, "Model", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Object>(
#nullable restore
#line 11 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
                      _table

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(3, "OnValidSubmit", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<Microsoft.AspNetCore.Components.EventCallback<Microsoft.AspNetCore.Components.Forms.EditContext>>(Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Forms.EditContext>(this, 
#nullable restore
#line 11 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
                                              HandleValidSubmit

#line default
#line hidden
#nullable disable
            )));
            __builder.AddAttribute(4, "ChildContent", (Microsoft.AspNetCore.Components.RenderFragment<Microsoft.AspNetCore.Components.Forms.EditContext>)((context) => (__builder2) => {
                __builder2.AddMarkupContent(5, "\n        ");
                __builder2.OpenComponent<Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator>(6);
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(7, "\n        ");
                __builder2.OpenComponent<Microsoft.AspNetCore.Components.Forms.ValidationSummary>(8);
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(9, "\n\n        ");
                __builder2.OpenComponent<Microsoft.AspNetCore.Components.Forms.InputText>(10);
                __builder2.AddAttribute(11, "id", "name");
                __builder2.AddAttribute(12, "Value", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.String>(
#nullable restore
#line 15 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
                                          _table.Name

#line default
#line hidden
#nullable disable
                ));
                __builder2.AddAttribute(13, "ValueChanged", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<Microsoft.AspNetCore.Components.EventCallback<System.String>>(Microsoft.AspNetCore.Components.EventCallback.Factory.Create<System.String>(this, Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.CreateInferredEventCallback(this, __value => _table.Name = __value, _table.Name))));
                __builder2.AddAttribute(14, "ValueExpression", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Linq.Expressions.Expression<System.Func<System.String>>>(() => _table.Name));
                __builder2.CloseComponent();
                __builder2.AddMarkupContent(15, "\n\n        ");
                __builder2.AddMarkupContent(16, "<button class=\"btn btn-primary\" type=\"submit\">Save</button>\n    ");
            }
            ));
            __builder.CloseComponent();
            __builder.AddMarkupContent(17, "\n");
#nullable restore
#line 19 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
}
else
{

#line default
#line hidden
#nullable disable
            __builder.AddContent(18, "    ");
            __builder.OpenElement(19, "div");
            __builder.AddAttribute(20, "class", "alert alert-danger");
            __builder.AddMarkupContent(21, "\n        ");
            __builder.AddMarkupContent(22, "<strong>Error:</strong> Could not find the table with the ID ");
            __builder.AddContent(23, 
#nullable restore
#line 23 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
                                                                      TableId

#line default
#line hidden
#nullable disable
            );
            __builder.AddMarkupContent(24, ", maybe it has been deleted?\n    ");
            __builder.CloseElement();
            __builder.AddMarkupContent(25, "\n");
#nullable restore
#line 25 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
}

#line default
#line hidden
#nullable disable
            __builder.AddMarkupContent(26, "\n");
#nullable restore
#line 27 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
 if (_showUpdateError)
{

#line default
#line hidden
#nullable disable
            __builder.AddContent(27, "    ");
            __builder.OpenElement(28, "div");
            __builder.AddAttribute(29, "class", "alert alert-warning alert-dismissible fade show");
            __builder.AddAttribute(30, "role", "alert");
            __builder.AddMarkupContent(31, "\n        ");
            __builder.AddMarkupContent(32, "<strong>Error:</strong> Something went wrong when updating this table. Does it still exist?\n        ");
            __builder.OpenElement(33, "button");
            __builder.AddAttribute(34, "type", "button");
            __builder.AddAttribute(35, "class", "close");
            __builder.AddAttribute(36, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 31 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
                                                      () => _showUpdateError = false

#line default
#line hidden
#nullable disable
            ));
            __builder.AddMarkupContent(37, "\n            ");
            __builder.AddMarkupContent(38, "<span aria-hidden=\"true\">&times;</span>\n        ");
            __builder.CloseElement();
            __builder.AddMarkupContent(39, "\n    ");
            __builder.CloseElement();
            __builder.AddMarkupContent(40, "\n");
#nullable restore
#line 35 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
}

#line default
#line hidden
#nullable disable
        }
        #pragma warning restore 1998
#nullable restore
#line 37 "/home/marc/advanced-software-engineering/RapidGuestRegistration/RapidGuestRegistration.Ui/Shared/TableEditForm.razor"
       
    [Parameter]
    public long LocationId { get; set; }
    [Parameter]
    public long TableId { get; set; }

    private Table _table;
    private bool _showUpdateError;

    protected override void OnInitialized()
    {
        try
        {
            _table = Api.LocationLocationIdTableTableIdGet(LocationId, TableId).FirstOrDefault();
        }
        catch (ApiException e)
        {
            Console.WriteLine(e);
            _table = null;
        }

        base.OnInitialized();
    }

    private void HandleValidSubmit()
    {
        try
        {
            Api.LocationLocationIdTableTableIdPost(LocationId, TableId, _table);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            _showUpdateError = true;
            return;
        }
        NavigationManager.NavigateTo($"/location/{LocationId}/edit");
    }

#line default
#line hidden
#nullable disable
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private NavigationManager NavigationManager { get; set; }
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private IDefaultApi Api { get; set; }
    }
}
#pragma warning restore 1591
