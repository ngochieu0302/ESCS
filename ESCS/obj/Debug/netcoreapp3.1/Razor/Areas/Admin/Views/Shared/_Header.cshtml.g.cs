#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\Shared\_Header.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f8b2b7fb80a61729f87109f2b4153c070920f88b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_Shared__Header), @"mvc.1.0.view", @"/Areas/Admin/Views/Shared/_Header.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f8b2b7fb80a61729f87109f2b4153c070920f88b", @"/Areas/Admin/Views/Shared/_Header.cshtml")]
    public class Areas_Admin_Views_Shared__Header : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/admin/images/logo-light-icon.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("homepage"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("light-logo"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/admin/images/users/1.jpg"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("user"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("rounded"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("width", new global::Microsoft.AspNetCore.Html.HtmlString("80"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<header class=""topbar"">
    <nav class=""navbar top-navbar navbar-expand-md navbar-dark"">
        <div class=""navbar-header"">
            <a href=""javascript:void(0)"" class=""nav-toggler waves-light d-block d-md-none"">
                <i class=""ti-menu ti-close""></i>
            </a>
            <a class=""navbar-brand"" href=""index.html"">
                <!-- Logo icon -->
                <b class=""logo-icon"">
                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "f8b2b7fb80a61729f87109f2b4153c070920f88b5515", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                </b>
                <!-- Logo text -->
                <span class=""logo-text"">
                    ESCS
                </span>
            </a>
            <a class=""topbartoggler d-block d-md-none waves-light"" href=""javascript:void(0)""
               data-toggle=""collapse"" data-target=""#navbarSupportedContent""
               aria-controls=""navbarSupportedContent"" aria-expanded=""false"" aria-label=""Toggle navigation"">
                <i class=""ti-more""></i>
            </a>
        </div>
        <div class=""navbar-collapse collapse"" id=""navbarSupportedContent"">
            <ul class=""navbar-nav mr-auto float-left"">
                <li class=""nav-item"">
                    <a class=""nav-link sidebartoggler d-none d-md-block waves-dark"" href=""javascript:void(0)"">
                        <i class=""ti-menu""></i>
                    </a>
                </li>
                <!--<li class=""nav-item d-none d-md-block search-box"">
        <a class=""nav-link d-none d-md-block ");
            WriteLiteral(@"waves-dark"" href=""javascript:void(0)"">
            <i class=""ti-search""></i>
        </a>
        <form class=""app-search"" method=""post"">
            <input type=""text"" class=""form-control"" placeholder=""Tìm kiếm"">
            <a class=""srh-btn"">
                <i class=""ti-close""></i>
            </a>
        </form>
    </li>-->
            </ul>
            <ul class=""navbar-nav float-right"">
                <li class=""nav-item dropdown"">
                    <a class=""nav-link dropdown-toggle waves-dark""");
            BeginWriteAttribute("href", " href=\"", 2071, "\"", 2078, 0);
            EndWriteAttribute();
            WriteLiteral(@" data-toggle=""dropdown""
                       aria-haspopup=""true"" aria-expanded=""false"">
                        <i class=""mdi mdi-message""></i>
                        <div class=""notify"">
                            <span class=""point""></span>
                        </div>
                    </a>
                    <div class=""dropdown-menu dropdown-menu-right mailbox scale-up"">
                        <ul class=""list-style-none"">
                            <li>
                                <div class=""border-bottom rounded-top py-3 px-4"">
                                    <h5 class=""mb-0 font-weight-medium"">Notifications</h5>
                                </div>
                            </li>
                            <li>
                                <div class=""message-center notifications position-relative"" style=""height:250px;"">
                                    <!-- Message -->
                                    <a href=""javascript:void(0)"" class=""message-item ");
            WriteLiteral(@"d-flex align-items-center border-bottom px-3 py-2"">
                                        <span class=""btn btn-danger rounded-circle btn-circle""><i class=""fa fa-link""></i></span>
                                        <div class=""w-75 d-inline-block v-middle pl-2"">
                                            <h5 class=""message-title mb-0 mt-1"">Luanch Admin</h5> <span class=""font-12 text-nowrap d-block text-muted text-truncate"">Just see the my new admin!</span> <span class=""font-12 text-nowrap d-block text-muted"">9:30 AM</span>
                                        </div>
                                    </a>
                                    <!-- Message -->
                                    <a href=""javascript:void(0)"" class=""message-item d-flex align-items-center border-bottom px-3 py-2"">
                                        <span class=""btn btn-success rounded-circle btn-circle""><i class=""ti-calendar""></i></span>
                                        <div class=""w-75 d-inline-bloc");
            WriteLiteral(@"k v-middle pl-2"">
                                            <h5 class=""message-title mb-0 mt-1"">Event today</h5> <span class=""font-12 text-nowrap d-block text-muted text-truncate"">Just a reminder that you have event</span> <span class=""font-12 text-nowrap d-block text-muted"">9:10 AM</span>
                                        </div>
                                    </a>
                                    <!-- Message -->
                                    <a href=""javascript:void(0)"" class=""message-item d-flex align-items-center border-bottom px-3 py-2"">
                                        <span class=""btn btn-info rounded-circle btn-circle""><i class=""ti-settings""></i></span>
                                        <div class=""w-75 d-inline-block v-middle pl-2"">
                                            <h5 class=""message-title mb-0 mt-1"">Settings</h5> <span class=""font-12 text-nowrap d-block text-muted text-truncate"">You can customize this template as you want</span> <span class=""font");
            WriteLiteral(@"-12 text-nowrap d-block text-muted"">9:08 AM</span>
                                        </div>
                                    </a>
                                    <!-- Message -->
                                    <a href=""javascript:void(0)"" class=""message-item d-flex align-items-center border-bottom px-3 py-2"">
                                        <span class=""btn btn-primary rounded-circle btn-circle""><i class=""ti-user""></i></span>
                                        <div class=""w-75 d-inline-block v-middle pl-2"">
                                            <h5 class=""message-title mb-0 mt-1"">Pavan kumar</h5> <span class=""font-12 text-nowrap d-block text-muted text-truncate"">Just see the my admin!</span> <span class=""font-12 text-nowrap d-block text-muted"">9:02 AM</span>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li>
           ");
            WriteLiteral(@"                     <a class=""nav-link border-top text-center text-dark pt-3"" href=""javascript:void(0);""> <strong>Check all notifications</strong> <i class=""fa fa-angle-right""></i> </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class=""nav-item dropdown"">
                    <a class=""nav-link dropdown-toggle waves-dark""");
            BeginWriteAttribute("href", " href=\"", 6594, "\"", 6601, 0);
            EndWriteAttribute();
            WriteLiteral(@" data-toggle=""dropdown""
                       aria-haspopup=""true"" aria-expanded=""false"">
                        <i class=""fa fa-user fa-lg profile-pic rounded-circle""></i>
                    </a>
                    <div class=""dropdown-menu mailbox dropdown-menu-right scale-up"">
                        <ul class=""dropdown-user list-style-none"">
                            <li>
                                <div class=""dw-user-box p-3 d-flex"">
                                    <div class=""u-img"">");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "f8b2b7fb80a61729f87109f2b4153c070920f88b13905", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"</div>
                                    <div class=""u-text ml-2"">
                                        <h4 class=""mb-0"">Nguyễn Phan Tiến Trung</h4>
                                        <a href=""pages-profile.html"" class=""btn btn-rounded btn-danger btn-sm text-white d-inline-block"">Hồ sơ</a>
                                    </div>
                                </div>
                            </li>
                            <li role=""separator"" class=""dropdown-divider""></li>
                            <li class=""user-list""><a class=""px-3 py-2"" href=""#""><i class=""ti-user""></i> Hồ sơ</a></li>
                            <li class=""user-list""><a class=""px-3 py-2"" href=""#""><i class=""ti-email""></i> Hộp thư</a></li>
                            <li role=""separator"" class=""dropdown-divider""></li>
                            <li class=""user-list""><a class=""px-3 py-2"" href=""#""><i class=""ti-settings""></i> Cấu hình</a></li>
                            <li role=""separator"" class=""dropdown-div");
            WriteLiteral(@"ider""></li>
                            <li class=""user-list""><a class=""px-3 py-2"" href=""/home/login""><i class=""fa fa-power-off""></i> Thoát</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</header>");
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
