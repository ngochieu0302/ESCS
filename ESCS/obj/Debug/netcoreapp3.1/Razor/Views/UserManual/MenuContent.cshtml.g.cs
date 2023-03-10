#pragma checksum "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fb3f2b4b8eb246006551d8cd40afc78be478400f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_UserManual_MenuContent), @"mvc.1.0.view", @"/Views/UserManual/MenuContent.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 1 "D:\ESCS\ESCS\Views\UserManual\_ViewImports.cshtml"
using ESCS.Models.UserManual;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\Views\UserManual\_ViewImports.cshtml"
using ESCS.Models.UserManual.services;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fb3f2b4b8eb246006551d8cd40afc78be478400f", @"/Views/UserManual/MenuContent.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9f4b69b3dd657e1745bbf1f14e8c48541a954877", @"/Views/UserManual/_ViewImports.cshtml")]
    public class Views_UserManual_MenuContent : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<BaiVietHuongDan>>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<ul class=\"list-group bg-white rounded\" id=\"manual-content-menu\">\r\n");
#nullable restore
#line 3 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
     foreach (DanhMucHuongDan danhmuc in Data.DanhMucHuongDan)
    {
        IEnumerable<BaiVietHuongDan> temp = Model.Where(bv => bv.ma_danh_muc==danhmuc.ma_danh_muc);
        

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
         if (temp.Count()>0)
        {

#line default
#line hidden
#nullable disable
            WriteLiteral("            <li class=\"m-1 p-1 rounded border bg-light\">\r\n                <a class=\"nav-link font-weight-bold d-flex flex-row-reverse flex-nowrap\" data-toggle=\"collapse\" data-target=\"#collapse_");
#nullable restore
#line 9 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
                                                                                                                                  Write(danhmuc.ma_danh_muc);

#line default
#line hidden
#nullable disable
            WriteLiteral("\" href=\"javascript:void(0);\">\r\n                    <span class=\"text-muted\">&nbsp;(");
#nullable restore
#line 10 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
                                               Write(temp.Count());

#line default
#line hidden
#nullable disable
            WriteLiteral(")</span>\r\n                    <span class=\"mr-auto\">");
#nullable restore
#line 11 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
                                     Write(danhmuc.ten_danh_muc);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n                </a>\r\n                <div class=\"collapse\"");
            BeginWriteAttribute("id", " id=\"", 767, "\"", 801, 2);
            WriteAttributeValue("", 772, "collapse_", 772, 9, true);
#nullable restore
#line 13 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
WriteAttributeValue("", 781, danhmuc.ma_danh_muc, 781, 20, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" data-parent=\"#manual-content-menu\">\r\n                    <div class=\"p-1 rounded border bg-white\">\r\n                \r\n");
#nullable restore
#line 16 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
                         foreach(BaiVietHuongDan baiviet in temp)
                        {

#line default
#line hidden
#nullable disable
            WriteLiteral("                            <a class=\"manual-link nav-link rounded font-weight-bold\" data-id-bv=\"");
#nullable restore
#line 18 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
                                                                                            Write(baiviet.ma_bai_viet);

#line default
#line hidden
#nullable disable
            WriteLiteral("\" href=\"javascript:void(0);\">");
#nullable restore
#line 18 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
                                                                                                                                             Write(baiviet.ten_bai_viet);

#line default
#line hidden
#nullable disable
            WriteLiteral("</a>\r\n");
#nullable restore
#line 19 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
                        }

#line default
#line hidden
#nullable disable
            WriteLiteral("                    </div>\r\n                </div>\r\n               \r\n            </li>\r\n");
#nullable restore
#line 24 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
        }

#line default
#line hidden
#nullable disable
#nullable restore
#line 24 "D:\ESCS\ESCS\Views\UserManual\MenuContent.cshtml"
         
    }

#line default
#line hidden
#nullable disable
            WriteLiteral("</ul>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<BaiVietHuongDan>> Html { get; private set; }
    }
}
#pragma warning restore 1591
