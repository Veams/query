(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("veams-query", [], factory);
	else if(typeof exports === 'object')
		exports["veams-query"] = factory();
	else
		root["veams-query"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Represents a very simple DOM API for Veams-JS (incl. ajax support)
	 *
	 * @module VeamsQuery
	 * @version v2.2.5
	 *
	 * Polyfills: npm install promise-polyfill --save-exact
	 *
	 * @author Andy Gutsche
	 */
	
	if (!window.Promise) {
		console.error('VeamsQuery :: You should add a lightweight promise library like promise-polyfill!');
	}
	
	var classListSupport = 'classList' in document.documentElement;
	
	window.veamsQueryEvents = window.veamsQueryEvents || [];
	
	var VeamsQueryObject = function () {
	
		/**
	  * VeamsQuery DOM wrapper object
	  *
	  * @param {String | Object} selector - selector (string, VeamsQuery object, element)
	  * @param {Object} [context] - context (VeamsQuery object, element)
	  */
		function VeamsQueryObject(selector, context) {
			_classCallCheck(this, VeamsQueryObject);
	
			var classes = void 0;
			var scope = void 0;
			var queryRes = [];
			var i = 0;
			var j = 0;
	
			if (!selector) {
				this.length = 0;
	
				return;
			}
	
			// element or window object
			if (selector.nodeType || selector === window) {
				this[0] = selector;
				this.length = 1;
	
				return;
			}
	
			// VeamsQuery object
			if (selector[0] && selector[0].nodeType) {
	
				for (var prop in selector) {
					if (selector.hasOwnProperty(prop)) {
						this[prop] = selector[prop];
					}
				}
	
				return;
			}
	
			if (context) {
	
				// context is element
				if (context.nodeType) {
					scope = [context];
				} else if (context[0] && context[0].nodeType) {
					// context is VeamsQuery object
					scope = context;
				}
			} else {
				scope = [document];
			}
	
			for (i; i < scope.length; i++) {
	
				try {
					if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
						switch (selector.charAt(0)) {
							case '#':
								queryRes = [document.getElementById(selector.substr(1))];
								break;
							case '.':
								classes = selector.substr(1).replace(/\./g, ' ');
								queryRes = queryRes.concat([].slice.call(scope[i].getElementsByClassName(classes)));
								break;
							default:
								queryRes = queryRes.concat([].slice.call(scope[i].getElementsByTagName(selector)));
						}
					} else {
						queryRes = queryRes.concat([].slice.call(scope[i].querySelectorAll(selector)));
					}
				} catch (e) {
					console.warn('VeamsQuery :: "', e, '"');
				}
			}
	
			for (j; j < queryRes.length; j++) {
				this[j] = queryRes[j];
			}
	
			this.length = queryRes.length;
		}
	
		/**
	  * Get the descendants of each element in the current set of matched elements, filtered by a selector,
	  * VeamsQuery object, or element
	  *
	  * @param {String|Object} selector - selector (string, VeamsQuery object, element)
	  * @return {Object} - VeamsQuery object
	  */
	
	
		_createClass(VeamsQueryObject, [{
			key: 'find',
			value: function find(selector) {
				return new VeamsQueryObject(selector, this);
			}
	
			/**
	   * For each element in the set, get the first element that matches the selector by testing
	   * the element itself and traversing up through its ancestors in the DOM tree
	   *
	   * @param {String} selector - selector
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'closest',
			value: function closest(selector) {
				var i = 0;
				var j = 0;
				var k = 0;
				var returnObj = VeamsQuery();
				var matchesSelector = void 0;
	
				if (!selector) {
					return false;
				}
	
				for (i; i < this.length; i++) {
					matchesSelector = this[i].matches || this[i].webkitMatchesSelector || this[i].mozMatchesSelector || this[i].msMatchesSelector;
	
					while (this[i]) {
						if (matchesSelector.call(this[i], selector)) {
							break;
						}
						this[i] = this[i].parentElement;
					}
				}
	
				for (j; j < this.length; j++) {
					if (this[j]) {
						returnObj[k] = this[j];
						k++;
					}
				}
	
				returnObj.length = k;
	
				return returnObj;
			}
	
			/**
	   * Check if element has given class
	   *
	   * @param {String} className - name of class to check
	   * @return {Boolean} - element has class (true/false)
	   */
	
		}, {
			key: 'hasClass',
			value: function hasClass(className) {
				if (classListSupport) {
					return this[0].classList.contains(className);
				} else {
					return new RegExp("(^|\\s+)" + className + "(\\s+|$)").test(this[0].className);
				}
			}
	
			/**
	   * Check the current matched set of elements against a selector, element, or VeamsQuery object and return true if
	   * at least one of these elements matches the given arguments
	   *
	   * @param {String} selector - a string containing a selector expression to match elements against
	   * @return {Boolean} - at least one element matches selector (true/false)
	   */
	
		}, {
			key: 'is',
			value: function is(selector) {
				var i = 0;
	
				if (!selector) {
					return false;
				}
	
				for (i; i < this.length; i++) {
					if ((this[i].matches || this[i].matchesSelector || this[i].msMatchesSelector || this[i].mozMatchesSelector || this[i].webkitMatchesSelector || this[i].oMatchesSelector).call(this[i], selector)) {
						return true;
					}
				}
	
				return false;
			}
	
			/**
	   * Add the specified class(es) to each element in the set of matched elements.
	   *
	   * @param {String} classNames - name(s) of class(es) to add
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'addClass',
			value: function addClass(classNames) {
				var i = 0;
				var classes = classNames && classNames.split(' ');
	
				if (!classes) {
					return false;
				}
	
				for (i; i < this.length; i++) {
	
					for (var _j = 0; _j < classes.length; _j++) {
	
						if (classListSupport) {
							this[i].classList.add(classes[_j]);
						} else {
							if (this[i].className.split(' ').indexOf(classes[_j]) === -1) {
								this[i].className = this[i].className + ' ' + classes[_j];
							}
						}
					}
				}
	
				return this;
			}
	
			/**
	   * Remove a single class, multiple classes, or all classes from each element in the set of matched elements
	   *
	   * @param {String} [classNames] - name(s) of class(es) to remove
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'removeClass',
			value: function removeClass(classNames) {
				var i = 0;
				var classes = classNames && classNames.split(' ');
	
				for (i; i < this.length; i++) {
	
					if (!classes) {
						this[i].removeAttribute('class');
					} else {
	
						for (var _j2 = 0; _j2 < classes.length; _j2++) {
	
							if ('classList' in document.documentElement) {
								this[i].classList.remove(classes[_j2]);
							} else {
								this[i].className = this[i].className.replace(new RegExp("(^|\\s+)" + classes[_j2] + "(\\s+|$)"), ' ');
							}
	
							if (!this[i].className.length) {
								this[i].removeAttribute('class');
							}
						}
					}
				}
	
				return this;
			}
	
			/**
	   * Get the HTML contents of the first element in the set of matched elements
	   * Set the HTML contents of each element in the set of matched elements
	   *
	   * @param {String} [htmlStr] - html string
	   * @return {String|Object} - html contents | VeamsQuery object
	   */
	
		}, {
			key: 'html',
			value: function html(htmlStr) {
				var i = 0;
	
				if (!htmlStr) {
					return this[0].innerHTML;
				}
	
				for (i; i < this.length; i++) {
					new VeamsQueryObject(this[i]).empty();
					this[i].innerHTML = htmlStr;
				}
	
				return this;
			}
	
			/**
	   * Insert content, specified by the parameter, to the end of each element in the set of matched elements
	   *
	   * @param {String|Object} element - html string | VeamsQuery object | element
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'append',
			value: function append(element) {
				var i = 0;
	
				for (i; i < this.length; i++) {
					if (typeof element === 'string') {
						this[i].insertAdjacentHTML('beforeend', element);
					} else {
						this[i].appendChild(element && element[0] || element);
					}
				}
	
				return this;
			}
	
			/**
	   * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements
	   *
	   * @param {String|Object} element - html string | VeamsQuery object | element
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'prepend',
			value: function prepend(element) {
				var i = 0;
	
				for (i; i < this.length; i++) {
					if (typeof element === 'string') {
						this[i].insertAdjacentHTML('afterbegin', element);
					} else {
						this[i].insertBefore(element && element[0] || element, this[i].firstChild);
					}
				}
	
				return this;
			}
	
			/**
	   * Insert content, specified by the parameter, before each element in the set of matched elements
	   *
	   * @param {String|Object} element - html string | VeamsQuery object | element
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'before',
			value: function before(element) {
				var i = 0;
	
				for (i; i < this.length; i++) {
					if (typeof element === 'string') {
						this[i].insertAdjacentHTML('beforebegin', element);
					} else {
						this[i].parentNode.insertBefore(element && element[0] || element, this[i]);
					}
				}
	
				return this;
			}
	
			/**
	   * Insert content, specified by the parameter, after each element in the set of matched elements
	   *
	   * @param {String|Object} element - html string | VeamsQuery object | element
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'after',
			value: function after(element) {
				var i = 0;
	
				for (i; i < this.length; i++) {
					if (typeof element === 'string') {
						this[i].insertAdjacentHTML('afterend', element);
					} else {
						this[i].parentNode.insertBefore(element && element[0] || element, this[i].nextElementSibling);
					}
				}
	
				return this;
			}
	
			/**
	   * Remove the set of matched elements from the DOM
	   *
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'remove',
			value: function remove() {
				var i = 0;
	
				for (i; i < this.length; i++) {
					var _j3 = veamsQueryEvents.length - 1;
	
					for (_j3; _j3 >= 0; --_j3) {
	
						if (veamsQueryEvents[_j3].node === this[i] || veamsQueryEvents[_j3].selector && new VeamsQueryObject(veamsQueryEvents[_j3].node).find(veamsQueryEvents[_j3].selector).length) {
							this[i].removeEventListener(veamsQueryEvents[_j3].event, veamsQueryEvents[_j3].handler);
							veamsQueryEvents.splice(_j3, 1);
						}
					}
	
					this[i].parentNode.removeChild(this[i]);
				}
	
				return this;
			}
	
			/**
	   * Remove all child nodes of the set of matched elements from the DOM
	   *
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'empty',
			value: function empty() {
				var i = 0;
	
				for (i; i < this.length; i++) {
	
					while (this[i].firstChild) {
						var _j4 = veamsQueryEvents.length - 1;
	
						for (_j4; _j4 >= 0; --_j4) {
	
							if (veamsQueryEvents[_j4].node === this[i].firstChild || veamsQueryEvents[_j4].node === this[i] && veamsQueryEvents[_j4].selector) {
								this[i].removeEventListener(veamsQueryEvents[_j4].event, veamsQueryEvents[_j4].handler);
								veamsQueryEvents.splice(_j4, 1);
							}
						}
	
						this[i].removeChild(this[i].firstChild);
					}
				}
	
				return this;
			}
	
			/**
	   * Reduce the set of matched elements to the one at the specified index
	   *
	   * @param {Number} index - index of element in node list
	   * @return {Object} - VeamsQuery object containing node at given index of original node list
	   */
	
		}, {
			key: 'eq',
			value: function eq(index) {
				return new VeamsQueryObject(this[index]);
			}
	
			/**
	   * Get the value of an attribute for the first element in the set of matched elements
	   * Set value of an attribute for the set of matched elements
	   *
	   * @param {String} attrName - attribute name
	   * @param {String|Number|Boolean} [attrVal] - attribute value
	   * @return {String|Number|Boolean|Object} - attribute value | VeamsQuery object
	   */
	
		}, {
			key: 'attr',
			value: function attr(attrName, attrVal) {
				var i = 0;
	
				if (typeof attrVal === 'undefined') {
					return this[0].getAttribute(attrName);
				}
	
				for (i; i < this.length; i++) {
					this[i].setAttribute(attrName, attrVal);
				}
	
				return this;
			}
	
			/**
	   * Remove an attribute from each element in the set of matched elements
	   *
	   * @param {String} attrName - attribute name
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'removeAttr',
			value: function removeAttr(attrName) {
				var i = 0;
	
				if (!attrName) {
					return false;
				}
	
				for (i; i < this.length; i++) {
					this[i].removeAttribute(attrName);
				}
	
				return this;
			}
	
			/**
	   * Get the combined text contents of each element in the set of matched elements.
	   * Set the content of each element in the set of matched elements to the specified text
	   *
	   * @param {String} [text] - text
	   * @return {String|Object} - text | VeamsQuery object
	   */
	
		}, {
			key: 'text',
			value: function text(_text) {
				var i = 0;
				var combinedText = '';
	
				for (i; i < this.length; i++) {
	
					if (!_text) {
						combinedText += this[i].innerText;
					} else {
						this[i].innerText = _text;
					}
				}
	
				if (!_text) {
					return combinedText;
				}
	
				return this;
			}
	
			/**
	   * Get the computed style properties for the first element in the set of matched elements.
	   * Set the content of each element in the set of matched elements to the specified text
	   *
	   * @param {String|Object} cssProp - css property
	   * @param {String} [cssVal] - css value
	   * @return {String|Object} - css value | VeamsQuery object
	   */
	
		}, {
			key: 'css',
			value: function css(cssProp, cssVal) {
				var i = 0;
	
				if (typeof cssProp === 'string') {
	
					if (typeof cssVal === 'undefined') {
						return window.getComputedStyle(this[0])[cssProp];
					} else {
	
						for (i; i < this.length; i++) {
							this[i].style[cssProp] = cssVal;
						}
					}
				} else if ((typeof cssProp === 'undefined' ? 'undefined' : _typeof(cssProp)) === 'object') {
	
					for (i; i < this.length; i++) {
						for (var prop in cssProp) {
							if (cssProp.hasOwnProperty(prop)) {
								this[i].style[prop] = cssProp[prop];
							}
						}
					}
				}
	
				return this;
			}
	
			/**
	   *  Get the current computed height for the first element in the set of matched elements, including padding,
	   *  border and optionally margin
	   *
	   * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
	   * @return {Number} - height
	   */
	
		}, {
			key: 'outerHeight',
			value: function outerHeight(includeMargin) {
				var height = this[0].offsetHeight;
				var style = void 0;
	
				if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
					return height;
				}
	
				style = getComputedStyle(this[0]);
				height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	
				return height;
			}
	
			/**
	   * Get the current computed width for the first element in the set of matched elements, including padding,
	   * border and optionally margin
	   *
	   * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
	   * @return {Number} - width
	   */
	
		}, {
			key: 'outerWidth',
			value: function outerWidth(includeMargin) {
				var width = this[0].offsetWidth;
				var style = void 0;
	
				if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
					return width;
				}
	
				style = getComputedStyle(this[0]);
				width += parseInt(style.marginLeft) + parseInt(style.marginRight);
	
				return width;
			}
	
			/**
	   *  Get the current coordinates of the first element in the set of matched elements,
	   *  relative to the document
	   *
	   * @return {Object} - offset (offset.top, offset.left)
	   */
	
		}, {
			key: 'offset',
			value: function offset() {
				var rect = this[0].getBoundingClientRect();
	
				return {
					top: rect.top + document.body.scrollTop,
					left: rect.left + document.body.scrollLeft
				};
			}
	
			/**
	   * Create a deep copy of the first element in the set of matched elements (without data and events)
	   *
	   * @param {Boolean} [withChildren=false] - clone with children (true/false)
	   * @return {Object} - clone of dom node
	   */
	
		}, {
			key: 'clone',
			value: function clone(withChildren) {
				return new VeamsQueryObject(this[0].cloneNode(withChildren));
			}
	
			/**
	   * Return an integer indicating the position of the first element in the set of matched elements relative
	   * to its sibling elements
	   *
	   * @return {Number} - index of element among its siblings
	   */
	
		}, {
			key: 'index',
			value: function index() {
				return [].slice.call(this[0].parentNode.children).indexOf(this[0]);
			}
	
			/**
	   * Get the value of a property for the first element in the set of matched elements
	   * Set value of a property for the set of matched elements
	   *
	   * @param {String} propName - property name
	   * @param {String|Number|Boolean} [propVal] - property value
	   * @return {String|Number|Boolean|Object} - property value | VeamsQuery object
	   */
	
		}, {
			key: 'prop',
			value: function prop(propName, propVal) {
				var i = 0;
	
				if (typeof propVal === 'undefined') {
					return this[0][propName];
				}
	
				for (i; i < this.length; i++) {
					this[i][propName] = propVal;
				}
	
				return this;
			}
	
			/**
	   * Get the current value of the first element in the set of matched elements.
	   * Set the value of each element in the set of matched elements
	   *
	   * @param {String} [val] - value
	   * @return {String|Number|Array|Object} - value | VeamsQuery object
	   */
	
		}, {
			key: 'val',
			value: function val(_val) {
				var i = 0;
	
				if (!_val) {
					return this[0].value;
				}
	
				for (i; i < this.length; i++) {
					this[i].value = _val;
				}
	
				return this;
			}
	
			/**
	   * Encode a set of form elements as a string for submission.
	   *
	   * @return {String} - serialized form data
	   */
	
		}, {
			key: 'serialize',
			value: function serialize() {
				var field = [];
				var l = [];
				var s = [];
	
				if (_typeof(this[0]) === 'object' && this[0].nodeName === 'FORM') {
					var len = this[0].elements.length;
	
					for (var _i = 0; _i < len; _i++) {
						field = this[0].elements[_i];
	
						if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {
	
							if (field.type === 'select-multiple') {
								l = this[0].elements[_i].options.length;
	
								for (var _j5 = 0; _j5 < l; _j5++) {
									if (field.options[_j5].selected) {
										s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[_j5].value.trim());
									}
								}
							} else if (field.type !== 'checkbox' && field.type !== 'radio' || field.checked) {
								s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value.trim());
							}
						}
					}
				}
	
				return s.join('&');
			}
	
			/**
	   * Attach an event handler function for one or more events to the selected elements
	   *
	   * @param {String} eventNames - name(s) of event(s) to be registered for matched set of elements
	   * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
	   * @param {Function} handler - event handler function
	   * @param {Boolean} [useCapture] - dispatch event to registered listeners before dispatching it to event target
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'on',
			value: function on(eventNames, selector, handler, useCapture) {
				var i = 0;
				var events = typeof eventNames === 'string' && eventNames.split(' ');
				var targetSelector = typeof selector === 'string' ? selector : undefined;
				var evtHandler = typeof selector === 'function' ? selector : typeof handler === 'function' ? handler : undefined;
				var capture = typeof handler === 'boolean' ? handler : typeof useCapture === 'boolean' ? useCapture : false;
				var delegateTarget = void 0;
	
				if (!events) {
					console.error('VeamsQuery :: on() - Event name not specified');
	
					return this;
				}
	
				if (!evtHandler) {
					console.error('VeamsQuery :: on() - Event handler not specified');
	
					return this;
				}
	
				for (i; i < this.length; i++) {
	
					for (var _j6 = 0; _j6 < events.length; _j6++) {
						var _events$_j6$split = events[_j6].split('.'),
						    _events$_j6$split2 = _slicedToArray(_events$_j6$split, 2),
						    event = _events$_j6$split2[0],
						    namespace = _events$_j6$split2[1];
	
						var _handler = function _handler(e) {
	
							if (targetSelector) {
								delegateTarget = VeamsQuery(e.target).closest(targetSelector);
	
								if (delegateTarget && delegateTarget.length) {
									evtHandler(e, delegateTarget[0]);
								}
							} else {
								evtHandler(e, e.currentTarget);
							}
						};
	
						this[i].addEventListener(event, _handler, capture);
	
						veamsQueryEvents.push({
							node: this[i],
							event: event,
							namespace: namespace,
							handler: _handler,
							selector: targetSelector
						});
					}
				}
	
				return this;
			}
	
			/**
	   * Detach an event handler for one or more events from the selected elements
	   *
	   * @param {String} eventNames - name(s) of event(s) to be unregistered for matched set of elements
	   * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
	   * @param {Function} [handler] - event handler
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'off',
			value: function off(eventNames, selector, handler) {
				var i = 0;
				var events = eventNames.split(' ');
	
				var targetSelector = typeof selector === 'string' ? selector : undefined;
				var evtHandler = typeof selector === 'function' ? selector : typeof handler === 'function' ? handler : undefined;
	
				for (i; i < this.length; i++) {
	
					for (var _j7 = 0; _j7 < events.length; _j7++) {
						var _events$_j7$split = events[_j7].split('.'),
						    _events$_j7$split2 = _slicedToArray(_events$_j7$split, 2),
						    event = _events$_j7$split2[0],
						    namespace = _events$_j7$split2[1];
	
						var k = veamsQueryEvents.length - 1;
	
						for (k; k >= 0; --k) {
							var unbindEvt = false;
	
							if (veamsQueryEvents[k].node === this[i] && veamsQueryEvents[k].event === event && veamsQueryEvents[k].namespace === namespace && veamsQueryEvents[k].selector === targetSelector) {
	
								if (evtHandler) {
	
									if (veamsQueryEvents[k].handler === evtHandler) {
										unbindEvt = true;
									}
								} else {
									unbindEvt = true;
								}
	
								if (unbindEvt) {
									this[i].removeEventListener(event, veamsQueryEvents[k].handler);
									veamsQueryEvents.splice(k, 1);
								}
							}
						}
					}
				}
	
				return this;
			}
	
			/**
	   * Execute all handlers and behaviors attached to the matched elements for the given event type
	   *
	   * @param {String} eventNames - name(s) of event(s) which will be trigger on the set of matched elements
	   * @param {Object} [customData] - custom data to pass with the event (accessible via event.detail)
	   * @return {Object} - VeamsQuery object
	   */
	
		}, {
			key: 'trigger',
			value: function trigger(eventNames, customData) {
				var i = 0;
				var events = eventNames.split(' ');
	
				for (i; i < this.length; i++) {
	
					for (var _j8 = 0; _j8 < events.length; _j8++) {
	
						if (typeof this[i][events[_j8]] === 'function') {
							this[i][events[_j8]]();
						} else {
							this[i].dispatchEvent(new CustomEvent(events[_j8], { detail: customData }));
						}
					}
				}
	
				return this;
			}
		}]);
	
		return VeamsQueryObject;
	}();
	
	/**
	 * VeamsQuery selector function
	 *
	 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
	 * @param {Object} [context] - context (VeamsQuery object, element)
	 */
	
	
	function VeamsQuery(selector, context) {
		return new VeamsQueryObject(selector, context);
	}
	
	// VeamsQuery version
	VeamsQuery.version = 'v2.2.4';
	
	/**
	 * Return DOM element created from given HTML string
	 *
	 * @param {String} htmlString - html string to parse
	 * @return {Object} - DOM node
	 */
	VeamsQuery.parseHTML = function (htmlString) {
		var parser = new DOMParser();
		var content = 'text/html';
		var DOM = parser.parseFromString(htmlString, content);
	
		// return element
		return DOM.body.childNodes[0];
	};
	
	/**
	 * Send XMLHttpRequest
	 *
	 * @param {Object} opts - options
	 * @param {String} [opts.type='GET'] - an alias for method
	 * @param {String} opts.url - a string containing the URL to which the request is sent
	 * @param {String} [opts.dataType='json'] - data type of response ('json' || 'html' || 'text')
	 * @param {Object|String|Array} [opts.data] - data to be sent to the server
	 */
	VeamsQuery.ajax = function (opts) {
		return new Promise(function (resolve, reject) {
	
			// set options
			var options = {
				type: opts.type && opts.type.toUpperCase() === 'POST' ? 'POST' : 'GET',
				url: opts.url,
				dataType: opts.dataType && opts.dataType.toLowerCase() || 'json'
			};
	
			var data = opts.data || {};
			var requestData = null;
			var concatChar = options.url.indexOf('?') > -1 ? '&' : '?';
			var parts = [];
			var request = void 0;
			var response = void 0;
			var url = void 0;
	
			// check for url
			if (!options.url) {
				var error = new Error('Request url not set');
	
				error.name = 'ajaxError ';
				reject(error);
	
				return;
			}
	
			// convert request data into query string
			for (var _i2 in data) {
				if (data.hasOwnProperty(_i2)) {
					parts.push(encodeURIComponent(_i2) + "=" + encodeURIComponent(data[_i2]));
				}
			}
	
			var params = parts.join('&');
	
			// decide how data will be sent (depends on type)
			if (options.type === 'GET') {
				url = options.url + concatChar + params;
			} else if (options.type === 'POST') {
				url = options.url;
				requestData = params;
			}
	
			request = new XMLHttpRequest();
			request.open(options.type, url, true);
	
			// set content type for post request
			if (options.type === 'POST') {
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}
	
			// load handler
			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
	
					if (options.dataType === 'html') {
						response = VeamsQuery.parseHTML(request.responseText);
					} else if (options.dataType === 'text') {
						response = request.responseText;
					} else {
						response = JSON.parse(request.responseText);
					}
	
					resolve(response);
				} else {
					var _error = new Error(request.status + ' - ' + request.statusText);
	
					_error.name = 'ajaxError ';
					reject(_error);
				}
			};
	
			// error handler
			request.onerror = function (e) {
				var error = new Error(e.target.status + ' - ' + e.target.statusText);
	
				error.name = 'ajaxError ';
				reject(error);
			};
	
			request.send(requestData);
		});
	};
	
	exports.default = VeamsQuery;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=veams-query.js.map