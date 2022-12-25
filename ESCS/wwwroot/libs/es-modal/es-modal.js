(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, (function () {
	'use strict';
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	var NAME = 'esmodal';
	var VERSION = '4.5.3';
	var DATA_KEY = 'bs.esmodal';
	var EVENT_KEY = "." + DATA_KEY;
	var DATA_API_KEY = '.data-api';
	var JQUERY_NO_CONFLICT = $.fn[NAME];
	var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

	var Default = {
		keyboard: true,
		focus: true,
		show: true
	};
	var DefaultType = {
		keyboard: 'boolean',
		focus: 'boolean',
		show: 'boolean'
	};
	var EVENT_HIDE = "hide" + EVENT_KEY;
	var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY;
	var EVENT_HIDDEN = "hidden" + EVENT_KEY;
	var EVENT_SHOW = "show" + EVENT_KEY;
	var EVENT_SHOWN = "shown" + EVENT_KEY;
	var EVENT_FOCUSIN = "focusin" + EVENT_KEY;
	var EVENT_RESIZE = "resize" + EVENT_KEY;
	var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY;
	var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY;
	var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY;
	var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY;
	var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
	var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
	var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
	var CLASS_NAME_OPEN = 'esmodal-open';
	var CLASS_NAME_FADE = 'fade';
	var CLASS_NAME_SHOW = 'show';
	var CLASS_NAME_STATIC = 'esmodal-static';
	var SELECTOR_DIALOG = '.esmodal-dialog';
	var SELECTOR_MODAL_BODY = '.esmodal-body';
	var SELECTOR_DATA_TOGGLE = '[data-toggle="esmodal"]';
	var SELECTOR_DATA_DISMISS = '[data-dismiss="esmodal"]';
	var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	var SELECTOR_STICKY_CONTENT = '.sticky-top';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */
	 


	var ESModal = /*#__PURE__*/ function () {
		function ESModal(element, config) {
			this._config = this._getConfig(config);
			this._element = element;
			this._dialog = element.querySelector(SELECTOR_DIALOG);
			this._isShown = false;
			this._isBodyOverflowing = false;
			this._isTransitioning = false;
			this._scrollbarWidth = 0;
			
		} // Getters

		// Public
		ESModal.prototype.toggle = function toggle(relatedTarget) {
			return this._isShown ? this.hide() : this.show(relatedTarget);
		};

		ESModal.prototype.show = function show(relatedTarget) {
			var _this = this;
			if (this._isShown || this._isTransitioning) {
				return;
			}

			if ($(this._element).hasClass(CLASS_NAME_FADE)) {
				this._isTransitioning = true;
			}

			var showEvent = $.Event(EVENT_SHOW, {
				relatedTarget: relatedTarget
			});
			$(this._element).trigger(showEvent);

			if (this._isShown || showEvent.isDefaultPrevented()) {
				return;
			}

			this._isShown = true;

			this._setEscapeEvent();

			$(this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
				return _this.hide(event);
			});

			this._showElement(relatedTarget);
		};

		ESModal.prototype.hide = function hide(event) {
			var _this2 = this;

			if (event) {
				event.preventDefault();
			}

			if (!this._isShown || this._isTransitioning) {
				return;
			}

			var hideEvent = $.Event(EVENT_HIDE);
			$(this._element).trigger(hideEvent);

			if (!this._isShown || hideEvent.isDefaultPrevented()) {
				return;
			}

			this._isShown = false;
			var transition = $(this._element).hasClass(CLASS_NAME_FADE);

			if (transition) {
				this._isTransitioning = true;
			}

			this._setEscapeEvent();

			$(document).off(EVENT_FOCUSIN);
			$(this._element).removeClass(CLASS_NAME_SHOW);
			$(this._element).off(EVENT_CLICK_DISMISS);
			$(this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

			this._hideESModal();
		};

		ESModal.prototype.dispose = function dispose() {
			[window, this._element, this._dialog].forEach(function (htmlElement) {
				return $(htmlElement).off(EVENT_KEY);
			});
			/**
			 * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
			 * Do not move `document` in `htmlElements` array
			 * It will remove `EVENT_CLICK_DATA_API` event that should remain
			 */

			$(document).off(EVENT_FOCUSIN);
			$.removeData(this._element, DATA_KEY);
			this._config = null;
			this._element = null;
			this._dialog = null;
			this._isShown = null;
			this._isBodyOverflowing = null;
			this._isTransitioning = null;
			this._scrollbarWidth = null;
		};

		ESModal.prototype.handleUpdate = function handleUpdate() {
			//this._adjustDialog();
		};

		// Private
		ESModal.prototype._getConfig = function _getConfig(config) {
			config = $.extend({}, Default, config);
			return config;
		};

		ESModal.prototype._triggerBackdropTransition = function _triggerBackdropTransition() {
			if (this._config.backdrop === 'static') {
				this._element.focus();
			} else {
				this.hide();
			}
		};

		ESModal.prototype._showElement = function _showElement(relatedTarget) {
			var _this4 = this;
			var transition = $(this._element).hasClass(CLASS_NAME_FADE);
			var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

			/*if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
				document.body.appendChild(this._element);
			}*/
			$(this._element).appendTo('.page-wrapper');

			this._element.style.display = 'block';

			this._element.removeAttribute('aria-hidden');

			this._element.setAttribute('aria-modal', true);

			this._element.setAttribute('role', 'dialog');

			if ($(this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
				modalBody.scrollTop = 0;
			} else {
				this._element.scrollTop = 0;
			}

			if (transition) {
				ESUtil.reflow(this._element);
			}

			$(this._element).addClass(CLASS_NAME_SHOW);

			if (this._config.focus) {
				//this._enforceFocus();
			}

			var shownEvent = $.Event(EVENT_SHOWN, {
				relatedTarget: relatedTarget
			});

			var transitionComplete = function transitionComplete() {
				if (_this4._config.focus) {
					_this4._element.focus();
				}

				_this4._isTransitioning = false;
				$(_this4._element).trigger(shownEvent);
			};

			transitionComplete();return;
		};

		ESModal.prototype._enforceFocus = function _enforceFocus() {
			var _this5 = this;

			$(document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
				.on(EVENT_FOCUSIN, function (event) {
					if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
						_this5._element.focus();
					}
				});
		};

		ESModal.prototype._setEscapeEvent = function _setEscapeEvent() {
			var _this6 = this;
			if (this._isShown) {
				$(this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
					if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE) {
						event.preventDefault();
						_this6.hide();
					} else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE) {
						_this6._triggerBackdropTransition();
					}
				});
			} else if (!this._isShown) {
				$(this._element).off(EVENT_KEYDOWN_DISMISS);
			}
		};

		ESModal.prototype._hideESModal = function _hideESModal() {
			var _this8 = this;

			this._element.style.display = 'none';

			this._element.setAttribute('aria-hidden', true);

			this._element.removeAttribute('aria-modal');

			this._element.removeAttribute('role');

			this._isTransitioning = false;

			$(_this8._element).trigger(EVENT_HIDDEN);
		};

		ESModal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
			return this.each(function () {
				var data = $(this).data(DATA_KEY);
				var _config = $.extend({}, Default, $(this).data(), typeof config === 'object' && config ? config : {});
				if (!data) {
					data = new ESModal(this, _config);
					$(this).data(DATA_KEY, data);
				}
				if (typeof config === 'string') {
					if (typeof data[config] === 'undefined') {
						throw new TypeError("No method named \"" + config + "\"");
					}
					data[config](relatedTarget);
				} else if (_config.show) {
					data.show(relatedTarget);
				}
			});
		};

		return ESModal;
	}();
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */

	$(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		var _this11 = this;

		var target;
		var selector = ESUtil.getSelectorFromElement(this);

		if (selector) {
			target = document.querySelector(selector);
		}

		var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

		if (this.tagName === 'A' || this.tagName === 'AREA') {
			event.preventDefault();
		}

		var $target = $(target).one(EVENT_SHOW, function (showEvent) {
			if (showEvent.isDefaultPrevented()) {
				return;
			}
			$target.one(EVENT_HIDDEN, function () {
				if ($(_this11).is(':visible')) {
					_this11.focus();
				}
			});
		});
		ESModal._jQueryInterface.call($(target), config, this);
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 */
	$.fn[NAME] = ESModal._jQueryInterface;
	$.fn[NAME].Constructor = ESModal;

	$.fn[NAME].noConflict = function () {
		$.fn[NAME] = JQUERY_NO_CONFLICT;
		return ESModal._jQueryInterface;
	};
	return ESModal;
})));

