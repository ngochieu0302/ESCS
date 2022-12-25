#pragma checksum "D:\ESCS\ESCS\Views\User\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "03d61920f26a17ad3bb7ada0473cdc4da71f9502"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_User_Index), @"mvc.1.0.view", @"/Views/User/Index.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"03d61920f26a17ad3bb7ada0473cdc4da71f9502", @"/Views/User/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_User_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "D:\ESCS\ESCS\Views\User\Index.cshtml"
  
    ViewData["Title"] = "Hồ sơ cá nhân";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n\r\n\r\n<div class=\"row page-titles\">\r\n    <div class=\"col-md-5 col-12 align-self-center\">\r\n        <h3 class=\"text-themecolor mb-0\">");
#nullable restore
#line 11 "D:\ESCS\ESCS\Views\User\Index.cshtml"
                                    Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"</h3>
    </div>
    <div class=""col-md-7 col-12 align-self-center justify-content-end d-none d-md-flex"">
        <ol class=""breadcrumb mb-0"">
            <li class=""breadcrumb-item"">
                <a href=""/"">Trang chủ</a>
            </li>
            <li class=""breadcrumb-item active"">");
#nullable restore
#line 18 "D:\ESCS\ESCS\Views\User\Index.cshtml"
                                          Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"</li>
        </ol>
    </div>
</div>
<div class=""container-fluid"" id=""userInfo"">
    <div class=""row"">
        <div class=""col-sm-12"">
            <div class=""card card-body"">
                <div class=""row"">
                    <div class=""col-sm-3"">
                        <label>Multiple Select</label>
                        <select id=""select-checkedbox-data"" multiple></select>
                    </div>
                    <div class=""col-sm-2"">
                        <div class=""form-group"">
                            <label for=""disabledTextInput"">Tên người dùng</label>
                            <p class=""form-control-static"" data-model=""ten""></p>
                            <p class=""form-control-static"" data-model=""ten""></p>
                        </div>
                    </div>
                    <div class=""col-sm-2"">
                        <div class=""form-group"">
                            <label for=""disabledTextInput"">Ngày sinh</label>
                       ");
            WriteLiteral(@"     <p class=""form-control-static"" data-model=""ngay_sinh_text""></p>
                        </div>
                    </div>
                    <div class=""col-sm-2"">
                        <div class=""form-group"">
                            <label for=""disabledTextInput"">Ngày sinh số</label>
                            <p class=""form-control-static"" data-model=""ngay_sinh"" data-format=""date""></p>
                        </div>
                    </div>
                    <div class=""col-sm-2"">
                        <div class=""form-group"">
                            <label for=""disabledTextInput"">Tiền tệ</label>
                            <p class=""form-control-static"" data-model=""ngay_sinh"" data-format=""${money} VNĐ""></p>
                        </div>
                    </div>
                    <div class=""col-sm-2"">
                        <div class=""form-group"">
                            <label for=""disabledTextInput"">Nội dung</label>
                            <p class");
            WriteLiteral(@"=""form-control-static"" data-model=""noi_dung"" data-format=""${value} ESCS""></p>
                        </div>
                    </div>
                </div>
                <div class=""row"">
                    <div class=""col-sm-3"">
                        <div class=""form-group"">
                            <label>Đối tác</label>
                            <input type=""text"" readonly=""readonly"" style=""cursor:pointer"" class=""form-control text-select"" value=""Click để chọn""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 3099, "\"", 3113, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""row"">
        <div class=""col-12"">
            <button type=""button"" class=""btn btn-primary"" onclick=""popupCenter({url: '/CarClaim/CarInvestigation/XemFilePDF', title: 'xtf', w: 900, h: 650});"">Xem File PDF</button>
            <button type=""button"" class=""btn btn-primary"" id=""btnXem"">Xem File Excel</button>
        </div>
    </div>
</div>
");
            DefineSection("scripts", async() => {
                WriteLiteral(@"
    <script>
        
        var option = {
            group_name: ""mien_ten"",
            dispay_name: ""ten"",
            value_name: ""ma"",
            z_index: 9999999,
            width_box: 250,
            height_box: 500,
            placeholder: ""Click để chọn"",
            title: ""Chọn hạng mục tổn thất"",
            onChecked: function (arr) {
                console.log(arr);
            }
        };
        var _selectCheckBoxService = new SelectCheckBoxService(""select-checkedbox-data"", option);
        $(document).ready(function () {
            _selectCheckBoxService.setDataSource([
                { ma: ""HN"", ten: ""Hà Nội"", mien: ""MB"", mien_ten: ""Miền Bắc"" },
                { ma: ""TP.HCM"", ten: ""TP. Hồ Chí Minh"", mien: ""MN"", mien_ten: ""Miền Nam"" },
                { ma: ""DN"", ten: ""Đà Nẵng"", mien: ""MT"", mien_ten: ""Miền Trung"" },
                { ma: ""HG"", ten: ""Hà Giang"", mien: ""MB"", mien_ten: ""Miền Bắc"" },
                { ma: ""HUE"", ten: ""Huế"", mien: ""MT"", mien_ten");
                WriteLiteral(": \"Miền Trung\" },\r\n                { ma: \"BD\", ten: \"Bình Dương\", mien: \"MN\", mien_ten: \"Miền Nam\" },\r\n                { ma: \"VP\", ten: \"Vĩnh Phúc\", mien: \"MB\", mien_ten: \"Miền Bắc\" },\r\n            ]);\r\n        });\r\n    </script>\r\n");
            }
            );
            WriteLiteral("\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591