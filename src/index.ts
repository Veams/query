/**
 * Represents a very simple DOM API for Veams-JS (incl. ajax support)
 *
 * @module VeamsQuery
 * @version v2.4.4
 *
 * Polyfills: npm install promise-polyfill --save-exact
 *
 * @author Andy Gutsche
 */

if (!window['Promise']) {
    console.error('VeamsQuery :: You should add a lightweight promise library like promise-polyfill!');
}

const classListSupport = 'classList' in document.documentElement;
const veamsQueryEvents = window['veamsQueryEvents'] = window['veamsQueryEvents'] || [];

export class VeamsQueryObject {
    length: number;
    type: string;

    /**
     * VeamsQuery DOM wrapper object
     *
     * @param {String | VeamsQueryObject | Node} selector - selector (string, VeamsQuery object, element)
     * @param {VeamsQueryObject | Node} [context = null] - context (VeamsQuery object, element)
     */
    constructor(selector: any, context: any = null) {
        let classes;
        let scope = [];
        let queryRes = [];
        let i = 0;
        let j = 0;

        this.type = 'VeamsQueryObject';

        if (!selector || typeof selector !== 'string' && selector !== window && !selector.nodeType && selector.type !== 'VeamsQueryObject') {
            this.length = 0;

            return;
        }

        // html string
        if (typeof selector === 'string' && selector.match(/<\/?[\w\s="/.':;#-\/]+>/gi)) {
            this[0] = VeamsQuery.parseHTML(selector);
            this.length = 1;

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

            for (let prop in selector) {
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
            } else if (context.length && context[0] && context[0].nodeType) { // context is VeamsQuery object
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
                            queryRes = [scope[i].querySelector(selector)];
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

        let length = 0;

        for (j; j < queryRes.length; j++) {

            if (queryRes[j]) {
                this[j] = queryRes[j];
                length++;
            }
        }

        this.length = length;
    }

    /**
     * Get the descendants of each element in the current set of matched elements, filtered by a selector,
     * VeamsQuery object, or element
     *
     * @param {string|VeamsQueryObject|Node} selector - Selector (string, VeamsQuery object, element)
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    find(selector: string | VeamsQueryObject | Node): VeamsQueryObject {
        return new VeamsQueryObject(selector, this);
    }

    /**
     * For each element in the set, get the first element that matches the selector by testing
     * the element itself and traversing up through its ancestors in the DOM tree
     *
     * @param {string} selector - Selector
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    closest(selector: string): VeamsQueryObject {
        let i = 0;
        let j = 0;
        let k = 0;
        let returnObj = VeamsQuery();
        let matchesSelector;

        if (!selector) {
            return returnObj;
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
    }

    /**
     * Check if element has given class
     *
     * @param {string} className - Name of class to check
     * @return {boolean} - Element has class (true/false)
     */
    hasClass(className: string): boolean {

        if (classListSupport) {
            return this[0].classList.contains(className);
        }

        return new RegExp('(^|\\s+)' + className + '(\\s+|$)').test(this[0].className);
    }

    /**
     * Check the current matched set of elements against a selector, element, or VeamsQuery object and return true if
     * at least one of these elements matches the given arguments
     *
     * @param {string} selector - A string containing a selector expression to match elements against
     * @return {boolean} - At least one element matches selector (true/false)
     */
    is(selector: string): boolean {
        let i = 0;

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
    }

    /**
     * Add the specified class(es) to each element in the set of matched elements.
     *
     * @param {string} classNames - Name(s) of class(es) to add
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    addClass(classNames: string): VeamsQueryObject {
        let i = 0;
        let classes = classNames && classNames.split(' ');

        if (classes && classes.length) {
            for (i; i < this.length; i++) {

                for (let j = 0; j < classes.length; j++) {

                    if (classListSupport) {
                        this[i].classList.add(classes[j]);
                    } else {
                        if (this[i].className.split(' ').indexOf(classes[j]) === -1) {
                            this[i].className = this[i].className + ' ' + classes[j];
                        }
                    }

                }

            }
        }

        return this;
    }

    /**
     * Remove a single class, multiple classes, or all classes from each element in the set of matched elements
     *
     * @param {string} classNames - Name(s) of class(es) to remove
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    removeClass(classNames: string): VeamsQueryObject {
        let i = 0;
        let classes = classNames && classNames.split(' ');

        for (i; i < this.length; i++) {

            if (!classes) {
                this[i].removeAttribute('class');
            } else {

                for (let j = 0; j < classes.length; j++) {

                    if ('classList' in document.documentElement) {
                        this[i].classList.remove(classes[j]);
                    } else {
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
    }

    /**
     * Get the HTML contents of the first element in the set of matched elements
     * Set the HTML contents of each element in the set of matched elements
     *
     * @param {string|VeamsQueryObject|Node} [element] - HTML string | VeamsQuery object | element
     * @return {string|VeamsQueryObject} - HTML contents | VeamsQuery object
     */
    html(element?: string | VeamsQueryObject | Node): string | VeamsQueryObject {
        let i = 0;

        if (!element) {
            return this[0].innerHTML;
        }

        for (i; i < this.length; i++) {
            new VeamsQueryObject(this[i]).empty();

            if (typeof element === 'string') {
                this[i].innerHTML = element;
            }
            else if (element instanceof VeamsQueryObject || !(element instanceof VeamsQueryObject) && element.nodeType) {
                this[i].appendChild(element[0] || element);
            }
            else {
                console.warn('VeamsQuery :: html() - Parameter has to be an HTML string, DOM node or VeamsQuery object');
            }
        }

        return this;
    }

    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements
     *
     * @param {string|VeamsQueryObject|Node} element - HTML string | VeamsQuery object | element
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    append(element: string | VeamsQueryObject | Node): VeamsQueryObject {
        let i = 0;

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
     * @param {string|VeamsQueryObject|Node} element - HTML string | VeamsQuery object | element
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    prepend(element: string | VeamsQueryObject | Node): VeamsQueryObject {
        let i = 0;

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
     * @param {string|VeamsQueryObject|Node} element - HTML string | VeamsQuery object | element
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    before(element: string | VeamsQueryObject | Node): VeamsQueryObject {
        let i = 0;

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
     * @param {string|VeamsQueryObject|Node} element - HTML string | VeamsQuery object | element
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    after(element: string | VeamsQueryObject | Node): VeamsQueryObject {
        let i = 0;

        for (i; i < this.length; i++) {
            if (typeof element === 'string') {
                this[i].insertAdjacentHTML('afterend', element);
            } else {
                this[i].parentNode.insertBefore(element && element[0] || element,
                    this[i].nextElementSibling);
            }
        }

        return this;
    }

    /**
     * Remove the set of matched elements from the DOM
     *
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    remove(): VeamsQueryObject {
        let i = 0;

        for (i; i < this.length; i++) {
            let j = veamsQueryEvents.length - 1;

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
    }

    /**
     * Remove all child nodes of the set of matched elements from the DOM
     *
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    empty(): VeamsQueryObject {
        let i = 0;

        for (i; i < this.length; i++) {

            while (this[i].firstChild) {
                let j = veamsQueryEvents.length - 1;

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
    }

    /**
     * Reduce the set of matched elements to the one at the specified index
     *
     * @param {number} index - Index of element in node list
     * @return {VeamsQueryObject} - VeamsQuery object containing node at given index of original node list
     */
    eq(index: number): VeamsQueryObject {
        return new VeamsQueryObject(this[index]);
    }

    /**
     * Get the value of an attribute for the first element in the set of matched elements
     * Set value of an attribute for the set of matched elements
     *
     * @param {string} attrName - Attribute name
     * @param {string|number|boolean} [attrVal] - Attribute value
     * @return {string|number|boolean|VeamsQueryObject} - Attribute value | VeamsQuery object
     */
    attr(attrName: string, attrVal?: string | number | boolean): string | number | boolean | VeamsQueryObject {
        let i = 0;

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
     * @param {string} attrName - attribute name
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    removeAttr(attrName: string): VeamsQueryObject {
        let i = 0;

        if (attrName) {
            for (i; i < this.length; i++) {
                this[i].removeAttribute(attrName);
            }
        }

        return this;
    }

    /**
     * Get the combined text contents of each element in the set of matched elements.
     * Set the content of each element in the set of matched elements to the specified text
     *
     * @param {string} [text] - text
     * @return {string|VeamsQueryObject} - Text | VeamsQuery object
     */
    text(text?: string): string | VeamsQueryObject {
        let i = 0;
        let combinedText = '';

        for (i; i < this.length; i++) {

            if (!text) {
                combinedText += this[i].innerText;
            } else {
                this[i].innerText = text;
            }
        }

        if (!text) {
            return combinedText;
        }

        return this;
    }

    /**
     * Get the computed style properties for the first element in the set of matched elements.
     * Set the content of each element in the set of matched elements to the specified text
     *
     * @param {string|Object} cssProp - CSS property or property/value object
     * @param {string} [cssVal] - CSS value
     * @return {string|Object} - CSS value | VeamsQuery object
     */
    css(cssProp: string | object, cssVal?: string): string | VeamsQueryObject {
        let i = 0;

        if (typeof cssProp === 'string') {

            if (typeof cssVal === 'undefined') {
                return window.getComputedStyle(this[0])[cssProp];
            }

            for (i; i < this.length; i++) {
                this[i].style[cssProp] = cssVal;
            }
        } else if (typeof cssProp === 'object') {

            for (i; i < this.length; i++) {
                for (let prop in cssProp) {
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
     * @param {boolean} [includeMargin=false] - Include the element's margin in the calculation (true/false)
     * @return {number} - Height
     */
    outerHeight(includeMargin?: boolean): number {
        let height = this[0].offsetHeight;
        let style;

        if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
            return height;
        }

        style = getComputedStyle(this[0]);
        height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);

        return height;
    }

    /**
     * Get the current computed width for the first element in the set of matched elements, including padding,
     * border and optionally margin
     *
     * @param {boolean} [includeMargin=false] - Include the element's margin in the calculation (true/false)
     * @return {number} - Width
     */
    outerWidth(includeMargin?: boolean): number {
        let width = this[0].offsetWidth;
        let style;

        if (!includeMargin || includeMargin && typeof includeMargin !== 'boolean') {
            return width;
        }

        style = getComputedStyle(this[0]);
        width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);

        return width;
    }

    /**
     *  Get the current coordinates of the first element in the set of matched elements,
     *  relative to the document
     *
     * @return {object} - offset (offset.top, offset.left)
     */
    offset(): object {
        let rect = this[0].getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }

    /**
     * Create a deep copy of the first element in the set of matched elements (without data and events)
     *
     * @param {Boolean} [withChildren=false] - Clone with children (true/false)
     * @return {VeamsQueryObject} - Clone of DOM node
     */
    clone(withChildren?: boolean): VeamsQueryObject {
        return new VeamsQueryObject(this[0].cloneNode(withChildren));
    }

    /**
     * Return an integer indicating the position of the first element in the set of matched elements relative
     * to its sibling elements
     *
     * @return {number} - Index of element among its siblings
     */
    index(): number {
        return [].slice.call(this[0].parentNode.children).indexOf(this[0]);
    }

    /**
     * Get the value of a property for the first element in the set of matched elements
     * Set value of a property for the set of matched elements
     *
     * @param {string} propName - Property name
     * @param {string|number|boolean} [propVal] - Property value
     * @return {string|number|boolean|VeamsQueryObject} - Property value | VeamsQuery object
     */
    prop(propName: string, propVal?: string | number | boolean): string | number | boolean | VeamsQueryObject {
        let i = 0;

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
     * @param {string | number} [val] - Value
     * @return {string|number|Array|VeamsQueryObject} - value | VeamsQuery object
     */
    val(val?: string | number): string | number | string [] | VeamsQueryObject {
        let i = 0;

        if (typeof val === 'undefined') {
            return this[0].value;
        }

        for (i; i < this.length; i++) {
            this[i].value = val;
        }

        return this;
    }

    /**
     * Encode a set of form elements as a string for submission.
     *
     * @return {string} - Serialized form data
     */
    serialize(): string {
        let field = null;
        let l = null;
        let s = [];

        if (typeof this[0] === 'object' && this[0].nodeName === 'FORM') {
            let len = this[0].elements.length;

            for (let i = 0; i < len; i++) {
                field = this[0].elements[i];

                if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' &&
                    field.type !== 'submit' && field.type !== 'button') {

                    if (field.type === 'select-multiple') {
                        l = this[0].elements[i].options.length;

                        for (let j = 0; j < l; j++) {
                            if (field.options[j].selected) {
                                s[s.length] =
                                    encodeURIComponent(field.name) + '=' +
                                    encodeURIComponent(field.options[j].value.trim());
                            }
                        }
                    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
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
     * @param {string} eventNames - Name(s) of event(s) to be registered for matched set of elements
     * @param {string} [selector] - Selector string to filter descendants of selected elements triggering the event
     * @param {Function} handler - Event handler function
     * @param {boolean} [useCapture] - Dispatch event to registered listeners before dispatching it to event target
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    on(eventNames: string, selector?: string, handler?: Function, useCapture?: boolean): VeamsQueryObject {
        let i = 0;
        let events = typeof eventNames === 'string' && eventNames.split(' ');
        let targetSelector = typeof selector === 'string' ? selector : undefined;
        let evtHandler = typeof selector === 'function' ? selector :
            typeof handler === 'function' ? handler : undefined;
        let capture = typeof handler === 'boolean' ? handler : typeof useCapture === 'boolean' ? useCapture : false;
        let delegateTarget;

        if (!events) {
            console.error('VeamsQuery :: on() - Event name not specified');

            return this;
        }

        if (!evtHandler) {
            console.error('VeamsQuery :: on() - Event handler not specified');

            return this;
        }

        for (i; i < this.length; i++) {

            for (let j = 0; j < events.length; j++) {
                let [event, namespace] = events[j].split('.');

                let internalHandler = (e) => {

                    if (targetSelector) {
                        delegateTarget = VeamsQuery(e.target).closest(targetSelector);

                        if (delegateTarget && delegateTarget.length) {
                            evtHandler(e, delegateTarget[0]);
                        }
                    } else {
                        evtHandler(e, e.currentTarget);
                    }
                };

                this[i].addEventListener(event, internalHandler, capture);

                veamsQueryEvents.push({
                    node: this[i],
                    event: event,
                    selector: targetSelector,
                    namespace: namespace,
                    internalHandler: internalHandler,
                    externalHandler: evtHandler
                });
            }
        }

        return this;
    }

    /**
     * Detach an event handler for one or more events from the selected elements
     *
     * @param {string} eventNames - Name(s) of event(s) to be unregistered for matched set of elements
     * @param {string} [selector] - Selector string to filter descendants of selected elements triggering the event
     * @param {Function} [handler] - Event handler
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    off(eventNames: string, selector?: string, handler?: Function): VeamsQueryObject {
        let i = 0;
        let events = eventNames.split(' ');

        let targetSelector = typeof selector === 'string' ? selector : undefined;
        let evtHandler = typeof selector === 'function' ? selector :
            typeof handler === 'function' ? handler : undefined;

        for (i; i < this.length; i++) {

            for (let j = 0; j < events.length; j++) {
                let [event, namespace] = events[j].split('.');
                let k = veamsQueryEvents.length - 1;

                for (k; k >= 0; --k) {
                    let unbindEvt = false;

                    if (veamsQueryEvents[k].node === this[i] && veamsQueryEvents[k].event === event &&
                        veamsQueryEvents[k].namespace === namespace &&
                        veamsQueryEvents[k].selector === targetSelector) {

                        if (evtHandler) {

                            if (veamsQueryEvents[k].externalHandler === evtHandler) {
                                unbindEvt = true;
                            }

                        } else {
                            unbindEvt = true;
                        }

                        if (unbindEvt) {
                            this[i].removeEventListener(event, veamsQueryEvents[k].internalHandler);
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
     * @param {string} eventNames - name(s) of event(s) which will be trigger on the set of matched elements
     * @param {object} [customData] - custom data to pass with the event (accessible via event.detail)
     * @return {VeamsQueryObject} - VeamsQuery object
     */
    trigger(eventNames: string, customData?: object): VeamsQueryObject {
        let i = 0;
        let events = eventNames.split(' ');

        for (i; i < this.length; i++) {

            for (let j = 0; j < events.length; j++) {

                if (typeof this[i][events[j]] === 'function') {
                    this[i][events[j]]();
                } else {
                    this[i].dispatchEvent(new CustomEvent(events[j], {detail: customData}));
                }
            }
        }

        return this;
    }
}

/**
 * VeamsQuery Interface
 */
export interface IVeamsQuery {
    (selector?: HTMLElement | string, context?: any): any;

    version: string,
    parseHTML: any,
    ajax: any
}

/**
 * VeamsQuery selector function
 *
 * @param {string | VeamsQueryObject | HTMLElement} selector - selector (string, VeamsQuery object, HTMLElement)
 * @param {VeamsQueryObject | HTMLElement} [context = null] - context (VeamsQuery object, HTMLElement)
 */
const VeamsQuery = <IVeamsQuery>function (selector: string | VeamsQueryObject | HTMLElement, context: VeamsQueryObject | HTMLElement = null) {
    return new VeamsQueryObject(selector, context);
};

VeamsQuery.version = 'v2.4.4';

/**
 * Return DOM element created from given HTML string
 *
 * @param {string} htmlString - HTML string to parse
 * @return {Node} - DOM node
 */
VeamsQuery.parseHTML = function (htmlString: string): Node {
    let parser = new DOMParser();
    let content = 'text/html';
    let DOM = parser.parseFromString(htmlString, content);

    // return element
    return DOM.body.childNodes[0];
};


/**
 * AjaxOpts Interface
 */
interface IAjaxOpts {
    contentType?: string;
    data?: object | string | string[];
    dataType?: string;
    type?: string;
    url: string;

}

/**
 * Send XMLHttpRequest
 *
 * @param {IAjaxOpts} opts - Ajax options
 * @param {string} [opts.type='GET'] - an alias for method
 * @param {string} opts.url - a string containing the URL to which the request is sent
 * @param {string} [opts.dataType='json'] - data type of response ('json' || 'html' || 'text')
 * @param {string} [opts.contentType='application/x-www-form-urlencoded'] - content type for post request
 * @param {Object|String|Array} [opts.data] - data to be sent to the server
 */
VeamsQuery.ajax = function (opts: IAjaxOpts) {
    return new Promise((resolve, reject) => {

        // set options
        let options = {
            type: opts.type && opts.type.toUpperCase() === 'POST' ? 'POST' : 'GET',
            url: opts.url,
            dataType: opts.dataType && opts.dataType.toLowerCase() || 'json',
            contentType: opts.contentType || 'application/x-www-form-urlencoded'
        };

        let data = opts.data || {};
        let requestData = null;
        let concatChar = options.url.indexOf('?') > -1 ? '&' : '?';
        let parts = [];
        let request;
        let response;
        let url;

        // check for url
        if (!options.url) {
            let error = new Error('Request url not set');

            error.name = 'ajaxError ';
            reject(error);

            return;
        }

        // convert request data into query string
        // @ts-ignore
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
            }
        }

        let params = parts.join('&');

        // decide how data will be sent (depends on type)
        if (options.type === 'GET') {
            url = options.url + concatChar + params;
        } else if (options.type === 'POST') {
            url = options.url;
            requestData = data;
        }

        request = new XMLHttpRequest();
        request.open(options.type, url, true);

        // set content type for post request
        if (options.type === 'POST') {
            request.setRequestHeader('Content-type', options.contentType);
        }

        // load handler
        request.onload = () => {
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
                let error = new Error(request.status + ' - ' + request.statusText);

                error.name = 'ajaxError ';
                reject(error);
            }
        };

        // error handler
        request.onerror = (e) => {
            let error = new Error(e.target.status + ' - ' + e.target.statusText);

            error.name = 'ajaxError ';
            reject(error);
        };

        request.send(requestData);
    });
};

export default VeamsQuery;