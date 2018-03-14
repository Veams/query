"use strict";
/**
 * Represents a very simple DOM API for Veams-JS (incl. ajax support)
 *
 * @module VeamsQuery
 * @version v2.2.7
 *
 * Polyfills: npm install promise-polyfill --save-exact
 *
 * @author Andy Gutsche
 */
Object.defineProperty(exports, "__esModule", { value: true });
if (!window['Promise']) {
    console.error('VeamsQuery :: You should add a lightweight promise library like promise-polyfill!');
}
var classListSupport = 'classList' in document.documentElement;
var veamsQueryEvents = window['veamsQueryEvents'] = window['veamsQueryEvents'] || [];
var VeamsQueryObject = /** @class */ (function () {
    /**
     * VeamsQuery DOM wrapper object
     *
     * @param {String | Object} selector - selector (string, VeamsQuery object, element)
     * @param {Object} [context] - context (VeamsQuery object, element)
     */
    function VeamsQueryObject(selector, context) {
        if (context === void 0) { context = null; }
        var classes;
        var scope;
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
            }
            else if (context[0] && context[0].nodeType) {
                scope = context;
            }
        }
        else {
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
                }
                else {
                    queryRes = queryRes.concat([].slice.call(scope[i].querySelectorAll(selector)));
                }
            }
            catch (e) {
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
    VeamsQueryObject.prototype.find = function (selector) {
        return new VeamsQueryObject(selector, this);
    };
    /**
     * For each element in the set, get the first element that matches the selector by testing
     * the element itself and traversing up through its ancestors in the DOM tree
     *
     * @param {String} selector - selector
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.closest = function (selector) {
        var i = 0;
        var j = 0;
        var k = 0;
        var returnObj = VeamsQuery();
        var matchesSelector;
        if (!selector) {
            return false;
        }
        for (i; i < this.length; i++) {
            matchesSelector = this[i].matches || this[i].webkitMatchesSelector || this[i].mozMatchesSelector ||
                this[i].msMatchesSelector;
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
    };
    /**
     * Check if element has given class
     *
     * @param {String} className - name of class to check
     * @return {Boolean} - element has class (true/false)
     */
    VeamsQueryObject.prototype.hasClass = function (className) {
        if (classListSupport) {
            return this[0].classList.contains(className);
        }
        return new RegExp('(^|\\s+)' + className + '(\\s+|$)').test(this[0].className);
    };
    /**
     * Check the current matched set of elements against a selector, element, or VeamsQuery object and return true if
     * at least one of these elements matches the given arguments
     *
     * @param {String} selector - a string containing a selector expression to match elements against
     * @return {Boolean} - at least one element matches selector (true/false)
     */
    VeamsQueryObject.prototype.is = function (selector) {
        var i = 0;
        if (!selector) {
            return false;
        }
        for (i; i < this.length; i++) {
            if ((this[i].matches || this[i].matchesSelector || this[i].msMatchesSelector ||
                this[i].mozMatchesSelector || this[i].webkitMatchesSelector ||
                this[i].oMatchesSelector).call(this[i], selector)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Add the specified class(es) to each element in the set of matched elements.
     *
     * @param {String} classNames - name(s) of class(es) to add
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.addClass = function (classNames) {
        var i = 0;
        var classes = classNames && classNames.split(' ');
        if (!classes) {
            return false;
        }
        for (i; i < this.length; i++) {
            for (var j = 0; j < classes.length; j++) {
                if (classListSupport) {
                    this[i].classList.add(classes[j]);
                }
                else {
                    if (this[i].className.split(' ').indexOf(classes[j]) === -1) {
                        this[i].className = this[i].className + ' ' + classes[j];
                    }
                }
            }
        }
        return this;
    };
    /**
     * Remove a single class, multiple classes, or all classes from each element in the set of matched elements
     *
     * @param {String} [classNames] - name(s) of class(es) to remove
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.removeClass = function (classNames) {
        var i = 0;
        var classes = classNames && classNames.split(' ');
        for (i; i < this.length; i++) {
            if (!classes) {
                this[i].removeAttribute('class');
            }
            else {
                for (var j = 0; j < classes.length; j++) {
                    if ('classList' in document.documentElement) {
                        this[i].classList.remove(classes[j]);
                    }
                    else {
                        this[i].className =
                            this[i].className.replace(new RegExp('(^|\\s+)' + classes[j] + '(\\s+|$)'), ' ');
                    }
                    if (!this[i].className.length) {
                        this[i].removeAttribute('class');
                    }
                }
            }
        }
        return this;
    };
    /**
     * Get the HTML contents of the first element in the set of matched elements
     * Set the HTML contents of each element in the set of matched elements
     *
     * @param {String} [htmlStr] - html string
     * @return {String|Object} - html contents | VeamsQuery object
     */
    VeamsQueryObject.prototype.html = function (htmlStr) {
        var i = 0;
        if (!htmlStr) {
            return this[0].innerHTML;
        }
        for (i; i < this.length; i++) {
            new VeamsQueryObject(this[i]).empty();
            this[i].innerHTML = htmlStr;
        }
        return this;
    };
    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.append = function (element) {
        var i = 0;
        for (i; i < this.length; i++) {
            if (typeof element === 'string') {
                this[i].insertAdjacentHTML('beforeend', element);
            }
            else {
                this[i].appendChild(element && element[0] || element);
            }
        }
        return this;
    };
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.prepend = function (element) {
        var i = 0;
        for (i; i < this.length; i++) {
            if (typeof element === 'string') {
                this[i].insertAdjacentHTML('afterbegin', element);
            }
            else {
                this[i].insertBefore(element && element[0] || element, this[i].firstChild);
            }
        }
        return this;
    };
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.before = function (element) {
        var i = 0;
        for (i; i < this.length; i++) {
            if (typeof element === 'string') {
                this[i].insertAdjacentHTML('beforebegin', element);
            }
            else {
                this[i].parentNode.insertBefore(element && element[0] || element, this[i]);
            }
        }
        return this;
    };
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.after = function (element) {
        var i = 0;
        for (i; i < this.length; i++) {
            if (typeof element === 'string') {
                this[i].insertAdjacentHTML('afterend', element);
            }
            else {
                this[i].parentNode.insertBefore(element && element[0] || element, this[i].nextElementSibling);
            }
        }
        return this;
    };
    /**
     * Remove the set of matched elements from the DOM
     *
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.remove = function () {
        var i = 0;
        for (i; i < this.length; i++) {
            var j = veamsQueryEvents.length - 1;
            for (j; j >= 0; --j) {
                if (veamsQueryEvents[j].node === this[i] ||
                    veamsQueryEvents[j].selector &&
                        new VeamsQueryObject(veamsQueryEvents[j].node).find(veamsQueryEvents[j].selector).length) {
                    this[i].removeEventListener(veamsQueryEvents[j].event, veamsQueryEvents[j].handler);
                    veamsQueryEvents.splice(j, 1);
                }
            }
            this[i].parentNode.removeChild(this[i]);
        }
        return this;
    };
    /**
     * Remove all child nodes of the set of matched elements from the DOM
     *
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.empty = function () {
        var i = 0;
        for (i; i < this.length; i++) {
            while (this[i].firstChild) {
                var j = veamsQueryEvents.length - 1;
                for (j; j >= 0; --j) {
                    if (veamsQueryEvents[j].node === this[i].firstChild ||
                        veamsQueryEvents[j].node === this[i] && veamsQueryEvents[j].selector) {
                        this[i].removeEventListener(veamsQueryEvents[j].event, veamsQueryEvents[j].handler);
                        veamsQueryEvents.splice(j, 1);
                    }
                }
                this[i].removeChild(this[i].firstChild);
            }
        }
        return this;
    };
    /**
     * Reduce the set of matched elements to the one at the specified index
     *
     * @param {Number} index - index of element in node list
     * @return {Object} - VeamsQuery object containing node at given index of original node list
     */
    VeamsQueryObject.prototype.eq = function (index) {
        return new VeamsQueryObject(this[index]);
    };
    /**
     * Get the value of an attribute for the first element in the set of matched elements
     * Set value of an attribute for the set of matched elements
     *
     * @param {String} attrName - attribute name
     * @param {String|Number|Boolean} [attrVal] - attribute value
     * @return {String|Number|Boolean|Object} - attribute value | VeamsQuery object
     */
    VeamsQueryObject.prototype.attr = function (attrName, attrVal) {
        var i = 0;
        if (typeof attrVal === 'undefined') {
            return this[0].getAttribute(attrName);
        }
        for (i; i < this.length; i++) {
            this[i].setAttribute(attrName, attrVal);
        }
        return this;
    };
    /**
     * Remove an attribute from each element in the set of matched elements
     *
     * @param {String} attrName - attribute name
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.removeAttr = function (attrName) {
        var i = 0;
        if (!attrName) {
            return false;
        }
        for (i; i < this.length; i++) {
            this[i].removeAttribute(attrName);
        }
        return this;
    };
    /**
     * Get the combined text contents of each element in the set of matched elements.
     * Set the content of each element in the set of matched elements to the specified text
     *
     * @param {String} [text] - text
     * @return {String|Object} - text | VeamsQuery object
     */
    VeamsQueryObject.prototype.text = function (text) {
        var i = 0;
        var combinedText = '';
        for (i; i < this.length; i++) {
            if (!text) {
                combinedText += this[i].innerText;
            }
            else {
                this[i].innerText = text;
            }
        }
        if (!text) {
            return combinedText;
        }
        return this;
    };
    /**
     * Get the computed style properties for the first element in the set of matched elements.
     * Set the content of each element in the set of matched elements to the specified text
     *
     * @param {String|Object} cssProp - css property
     * @param {String} [cssVal] - css value
     * @return {String|Object} - css value | VeamsQuery object
     */
    VeamsQueryObject.prototype.css = function (cssProp, cssVal) {
        var i = 0;
        if (typeof cssProp === 'string') {
            if (typeof cssVal === 'undefined') {
                return window.getComputedStyle(this[0])[cssProp];
            }
            for (i; i < this.length; i++) {
                this[i].style[cssProp] = cssVal;
            }
        }
        else if (typeof cssProp === 'object') {
            for (i; i < this.length; i++) {
                for (var prop in cssProp) {
                    if (cssProp.hasOwnProperty(prop)) {
                        this[i].style[prop] = cssProp[prop];
                    }
                }
            }
        }
        return this;
    };
    /**
     *  Get the current computed height for the first element in the set of matched elements, including padding,
     *  border and optionally margin
     *
     * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
     * @return {Number} - height
     */
    VeamsQueryObject.prototype.outerHeight = function (includeMargin) {
        var height = this[0].offsetHeight;
        var style;
        if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
            return height;
        }
        style = getComputedStyle(this[0]);
        height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
        return height;
    };
    /**
     * Get the current computed width for the first element in the set of matched elements, including padding,
     * border and optionally margin
     *
     * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
     * @return {Number} - width
     */
    VeamsQueryObject.prototype.outerWidth = function (includeMargin) {
        var width = this[0].offsetWidth;
        var style;
        if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
            return width;
        }
        style = getComputedStyle(this[0]);
        width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
        return width;
    };
    /**
     *  Get the current coordinates of the first element in the set of matched elements,
     *  relative to the document
     *
     * @return {Object} - offset (offset.top, offset.left)
     */
    VeamsQueryObject.prototype.offset = function () {
        var rect = this[0].getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    };
    /**
     * Create a deep copy of the first element in the set of matched elements (without data and events)
     *
     * @param {Boolean} [withChildren=false] - clone with children (true/false)
     * @return {Object} - clone of dom node
     */
    VeamsQueryObject.prototype.clone = function (withChildren) {
        return new VeamsQueryObject(this[0].cloneNode(withChildren));
    };
    /**
     * Return an integer indicating the position of the first element in the set of matched elements relative
     * to its sibling elements
     *
     * @return {Number} - index of element among its siblings
     */
    VeamsQueryObject.prototype.index = function () {
        return [].slice.call(this[0].parentNode.children).indexOf(this[0]);
    };
    /**
     * Get the value of a property for the first element in the set of matched elements
     * Set value of a property for the set of matched elements
     *
     * @param {String} propName - property name
     * @param {String|Number|Boolean} [propVal] - property value
     * @return {String|Number|Boolean|Object} - property value | VeamsQuery object
     */
    VeamsQueryObject.prototype.prop = function (propName, propVal) {
        var i = 0;
        if (typeof propVal === 'undefined') {
            return this[0][propName];
        }
        for (i; i < this.length; i++) {
            this[i][propName] = propVal;
        }
        return this;
    };
    /**
     * Get the current value of the first element in the set of matched elements.
     * Set the value of each element in the set of matched elements
     *
     * @param {String} [val] - value
     * @return {String|Number|Array|Object} - value | VeamsQuery object
     */
    VeamsQueryObject.prototype.val = function (val) {
        var i = 0;
        if (!val) {
            return this[0].value;
        }
        for (i; i < this.length; i++) {
            this[i].value = val;
        }
        return this;
    };
    /**
     * Encode a set of form elements as a string for submission.
     *
     * @return {String} - serialized form data
     */
    VeamsQueryObject.prototype.serialize = function () {
        var field = null;
        var l = null;
        var s = [];
        if (typeof this[0] === 'object' && this[0].nodeName === 'FORM') {
            var len = this[0].elements.length;
            for (var i = 0; i < len; i++) {
                field = this[0].elements[i];
                if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' &&
                    field.type !== 'submit' && field.type !== 'button') {
                    if (field.type === 'select-multiple') {
                        l = this[0].elements[i].options.length;
                        for (var j = 0; j < l; j++) {
                            if (field.options[j].selected) {
                                s[s.length] =
                                    encodeURIComponent(field.name) + '=' +
                                        encodeURIComponent(field.options[j].value.trim());
                            }
                        }
                    }
                    else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value.trim());
                    }
                }
            }
        }
        return s.join('&');
    };
    /**
     * Attach an event handler function for one or more events to the selected elements
     *
     * @param {String} eventNames - name(s) of event(s) to be registered for matched set of elements
     * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
     * @param {Function} handler - event handler function
     * @param {Boolean} [useCapture] - dispatch event to registered listeners before dispatching it to event target
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.on = function (eventNames, selector, handler, useCapture) {
        var i = 0;
        var events = typeof eventNames === 'string' && eventNames.split(' ');
        var targetSelector = typeof selector === 'string' ? selector : undefined;
        var evtHandler = typeof selector === 'function' ? selector :
            typeof handler === 'function' ? handler : undefined;
        var capture = typeof handler === 'boolean' ? handler : typeof useCapture === 'boolean' ? useCapture : false;
        var delegateTarget;
        if (!events) {
            console.error('VeamsQuery :: on() - Event name not specified');
            return this;
        }
        if (!evtHandler) {
            console.error('VeamsQuery :: on() - Event handler not specified');
            return this;
        }
        for (i; i < this.length; i++) {
            for (var j = 0; j < events.length; j++) {
                var _a = events[j].split('.'), event_1 = _a[0], namespace = _a[1];
                var internalHandler = function (e) {
                    if (targetSelector) {
                        delegateTarget = VeamsQuery(e.target).closest(targetSelector);
                        if (delegateTarget && delegateTarget.length) {
                            evtHandler(e, delegateTarget[0]);
                        }
                    }
                    else {
                        evtHandler(e, e.currentTarget);
                    }
                };
                this[i].addEventListener(event_1, internalHandler, capture);
                veamsQueryEvents.push({
                    node: this[i],
                    event: event_1,
                    selector: targetSelector,
                    namespace: namespace,
                    internalHandler: internalHandler,
                    externalHandler: evtHandler
                });
            }
        }
        return this;
    };
    /**
     * Detach an event handler for one or more events from the selected elements
     *
     * @param {String} eventNames - name(s) of event(s) to be unregistered for matched set of elements
     * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
     * @param {Function} [handler] - event handler
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.off = function (eventNames, selector, handler) {
        var i = 0;
        var events = eventNames.split(' ');
        var targetSelector = typeof selector === 'string' ? selector : undefined;
        var evtHandler = typeof selector === 'function' ? selector :
            typeof handler === 'function' ? handler : undefined;
        for (i; i < this.length; i++) {
            for (var j = 0; j < events.length; j++) {
                var _a = events[j].split('.'), event_2 = _a[0], namespace = _a[1];
                var k = veamsQueryEvents.length - 1;
                for (k; k >= 0; --k) {
                    var unbindEvt = false;
                    if (veamsQueryEvents[k].node === this[i] && veamsQueryEvents[k].event === event_2 &&
                        veamsQueryEvents[k].namespace === namespace &&
                        veamsQueryEvents[k].selector === targetSelector) {
                        if (evtHandler) {
                            if (veamsQueryEvents[k].externalHandler === evtHandler) {
                                unbindEvt = true;
                            }
                        }
                        else {
                            unbindEvt = true;
                        }
                        if (unbindEvt) {
                            this[i].removeEventListener(event_2, veamsQueryEvents[k].internalHandler);
                            veamsQueryEvents.splice(k, 1);
                        }
                    }
                }
            }
        }
        return this;
    };
    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type
     *
     * @param {String} eventNames - name(s) of event(s) which will be trigger on the set of matched elements
     * @param {Object} [customData] - custom data to pass with the event (accessible via event.detail)
     * @return {Object} - VeamsQuery object
     */
    VeamsQueryObject.prototype.trigger = function (eventNames, customData) {
        var i = 0;
        var events = eventNames.split(' ');
        for (i; i < this.length; i++) {
            for (var j = 0; j < events.length; j++) {
                if (typeof this[i][events[j]] === 'function') {
                    this[i][events[j]]();
                }
                else {
                    this[i].dispatchEvent(new CustomEvent(events[j], { detail: customData }));
                }
            }
        }
        return this;
    };
    return VeamsQueryObject;
}());
exports.VeamsQueryObject = VeamsQueryObject;
/**
 * VeamsQuery selector function
 *
 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
 * @param {Object} [context] - context (VeamsQuery object, element)
 */
var VeamsQuery = function (selector, context) {
    if (selector === void 0) { selector = {}; }
    if (context === void 0) { context = null; }
    return new VeamsQueryObject(selector, context);
};
VeamsQuery.version = 'v2.2.8';
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
        var request;
        var response;
        var url;
        // check for url
        if (!options.url) {
            var error = new Error('Request url not set');
            error.name = 'ajaxError ';
            reject(error);
            return;
        }
        // convert request data into query string
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
            }
        }
        var params = parts.join('&');
        // decide how data will be sent (depends on type)
        if (options.type === 'GET') {
            url = options.url + concatChar + params;
        }
        else if (options.type === 'POST') {
            url = options.url;
            requestData = params;
        }
        request = new XMLHttpRequest();
        request.open(options.type, url, true);
        // set content type for post request
        if (options.type === 'POST') {
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        // load handler
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                if (options.dataType === 'html') {
                    response = VeamsQuery.parseHTML(request.responseText);
                }
                else if (options.dataType === 'text') {
                    response = request.responseText;
                }
                else {
                    response = JSON.parse(request.responseText);
                }
                resolve(response);
            }
            else {
                var error = new Error(request.status + ' - ' + request.statusText);
                error.name = 'ajaxError ';
                reject(error);
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
//# sourceMappingURL=index.js.map