(function ($) {
    $.inlinePopover = {};
    var defaultOptions = {
        target: '',
        title: '',
        trigger: 'hoverfocus',
        position: 'auto',
        class: '',
        size: 'small',
        close_on_outside_click: true,
        onBeforeShow: null,
        onAfterShow: null,
        onBeforeHide: null,
        onAfterHide: null,
        closeOnClickOutside: true,
    }
    $.fn.inlinePopover = function (options) {
        if (this.length > 1) {
            this.each(function () {
                $(this).inlinePopover(options);
            });
            return this;
        }
        if (typeof this === 'undefined' || this.length !== 1) {
            return false;
        }
        var $self = $(this);
        var self = this;
        //get list of options
        options = $.extend({}, defaultOptions, options, $self.data());

        $(this).click(function () {
            helper.show(self);
        });

        $(options.target + ' [data-dismiss="popover-x"]').click(function () {
            helper.hide();
        });

        $(".popover.popover-x").focusout(function () {
            //alert("sdfsdfsd");
        });

        let helper = {
            placement: 'auto',
            dialogCss: { top: 0, left: 0 },
            keyboard: true,
            autoPlaceSmallScreen: true,
            smallScreenWidth: 640,
            closeOpenPopovers: true,
            destroy: function () {
                $(".popover .popover-x").hide();
            },
            initialize: function () {
                //helper.show();
                $(document).on('touchstart mousedown', helper.onClickOutside);
                //$(document).mouseup(helper.onClickOutside);
            },
            onClickOutside: function (e) {
                if (options.close_on_outside_click) {
                    var $info = $(options.target);
                    if (!$info.is(e.target) && $info.has(e.target).length === 0) {
                        $info.hide();
                    }
                }
                //$(options.target).hide(200);
                //console.log(e);
                //if (options.closeOnClickOutside) {
                //    const target = $(e.target);
                //    if (!target.hasClass('popover')) {
                //        helper.hide();
                //    }
                //}
            },
            //toggle tooltip visibility (used for click event)
            toggleTooltipHandler: function (e) {
                e.preventDefault();
                helper.isVisible() && helper.hide() || helper.show();
                return false;
            },
            show: function (parentObj) {
                if ($.isFunction(options.onBeforeShow)) {
                    var onBeforeShow = options.onBeforeShow;
                    onBeforeShow.call(this, self);
                }

                var parentInfo = parentObj[0].getBoundingClientRect();
                var pos = this.setPosition(parentInfo);
                $(options.target).fadeIn(200);

                if ($.isFunction(options.onAfterShow)) {
                    var onAfterShow = options.onAfterShow;
                    onAfterShow.call(this, self);
                }
            },
            hide: function (parentObj) {
                if ($.isFunction(options.onBeforeHide)) {
                    var onBeforeHide = options.onBeforeHide;
                    onBeforeHide.call(this, self);
                }

                $(options.target).hide(200);

                if ($.isFunction(options.onAfterHide)) {
                    var onAfterHide = options.onAfterHide;
                    onAfterHide.call(this, self);
                }
            },
            setPosition: function (pos) {
                var position;
                var actualWidth = $(options.target).width();
                var actualHeight = $(options.target).height();
                switch (options.placement) {
                    case 'bottom':
                        position = { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 };
                        break;
                    case 'bottom bottom-left':
                        position = { top: pos.top, left: pos.left };
                        break;
                    case 'bottom bottom-right':
                        position = { top: pos.top + pos.height, left: pos.left - pos.width / 2 - actualWidth };
                        break;
                    case 'top':
                        position = { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 };
                        break;
                    case 'top top-left':
                        position = { top: pos.top - actualHeight, left: pos.left };
                        break;
                    case 'top top-right':
                        position = { top: pos.top - actualHeight, left: pos.left + pos.width - actualWidth };
                        break;
                    case 'left':
                        position = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth };
                        break;
                    case 'left left-top':
                        position = { top: pos.top, left: pos.left - actualWidth };
                        break;
                    case 'left left-bottom':
                        position = { top: pos.top + pos.height - actualHeight, left: pos.left - actualWidth };
                        break;
                    case 'right':
                        position = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
                        break;
                    case 'right right-top':
                        position = { top: pos.top, left: pos.left + pos.width };
                        break;
                    case 'right right-bottom':
                        position = { top: pos.top + pos.height - actualHeight, left: pos.left + pos.width };
                        break;
                    default:
                        position = null;
                        //$h.kvLog("Invalid popover placement '" + placement + "'.");
                }
                if (position === undefined || position === null) {
                    return;
                }
                $(options.target).removeClass('bottom top left right bottom-left top-left bottom-right top-right ' +
                    'left-bottom left-top right-bottom right-top').css(position); //.addClass(options.placement);
            },
        };
        helper.destroy();
        return helper.initialize();
    };
})(jQuery);