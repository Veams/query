export declare class VeamsQueryObject {
    length: number;
    /**
     * VeamsQuery DOM wrapper object
     *
     * @param {String | Object} selector - selector (string, VeamsQuery object, element)
     * @param {Object} [context] - context (VeamsQuery object, element)
     */
    constructor(selector: any, context?: any);
    /**
     * Get the descendants of each element in the current set of matched elements, filtered by a selector,
     * VeamsQuery object, or element
     *
     * @param {String|Object} selector - selector (string, VeamsQuery object, element)
     * @return {Object} - VeamsQuery object
     */
    find(selector: any): VeamsQueryObject;
    /**
     * For each element in the set, get the first element that matches the selector by testing
     * the element itself and traversing up through its ancestors in the DOM tree
     *
     * @param {String} selector - selector
     * @return {Object} - VeamsQuery object
     */
    closest(selector: any): any;
    /**
     * Check if element has given class
     *
     * @param {String} className - name of class to check
     * @return {Boolean} - element has class (true/false)
     */
    hasClass(className: any): any;
    /**
     * Check the current matched set of elements against a selector, element, or VeamsQuery object and return true if
     * at least one of these elements matches the given arguments
     *
     * @param {String} selector - a string containing a selector expression to match elements against
     * @return {Boolean} - at least one element matches selector (true/false)
     */
    is(selector: any): boolean;
    /**
     * Add the specified class(es) to each element in the set of matched elements.
     *
     * @param {String} classNames - name(s) of class(es) to add
     * @return {Object} - VeamsQuery object
     */
    addClass(classNames: any): false | this;
    /**
     * Remove a single class, multiple classes, or all classes from each element in the set of matched elements
     *
     * @param {String} [classNames] - name(s) of class(es) to remove
     * @return {Object} - VeamsQuery object
     */
    removeClass(classNames: any): this;
    /**
     * Get the HTML contents of the first element in the set of matched elements
     * Set the HTML contents of each element in the set of matched elements
     *
     * @param {String} [htmlStr] - html string
     * @return {String|Object} - html contents | VeamsQuery object
     */
    html(htmlStr: any): any;
    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    append(element: any): this;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    prepend(element: any): this;
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    before(element: any): this;
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements
     *
     * @param {String|Object} element - html string | VeamsQuery object | element
     * @return {Object} - VeamsQuery object
     */
    after(element: any): this;
    /**
     * Remove the set of matched elements from the DOM
     *
     * @return {Object} - VeamsQuery object
     */
    remove(): this;
    /**
     * Remove all child nodes of the set of matched elements from the DOM
     *
     * @return {Object} - VeamsQuery object
     */
    empty(): this;
    /**
     * Reduce the set of matched elements to the one at the specified index
     *
     * @param {Number} index - index of element in node list
     * @return {Object} - VeamsQuery object containing node at given index of original node list
     */
    eq(index: any): VeamsQueryObject;
    /**
     * Get the value of an attribute for the first element in the set of matched elements
     * Set value of an attribute for the set of matched elements
     *
     * @param {String} attrName - attribute name
     * @param {String|Number|Boolean} [attrVal] - attribute value
     * @return {String|Number|Boolean|Object} - attribute value | VeamsQuery object
     */
    attr(attrName: any, attrVal: any): any;
    /**
     * Remove an attribute from each element in the set of matched elements
     *
     * @param {String} attrName - attribute name
     * @return {Object} - VeamsQuery object
     */
    removeAttr(attrName: any): false | this;
    /**
     * Get the combined text contents of each element in the set of matched elements.
     * Set the content of each element in the set of matched elements to the specified text
     *
     * @param {String} [text] - text
     * @return {String|Object} - text | VeamsQuery object
     */
    text(text: any): string | this;
    /**
     * Get the computed style properties for the first element in the set of matched elements.
     * Set the content of each element in the set of matched elements to the specified text
     *
     * @param {String|Object} cssProp - css property
     * @param {String} [cssVal] - css value
     * @return {String|Object} - css value | VeamsQuery object
     */
    css(cssProp: any, cssVal: any): any;
    /**
     *  Get the current computed height for the first element in the set of matched elements, including padding,
     *  border and optionally margin
     *
     * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
     * @return {Number} - height
     */
    outerHeight(includeMargin: any): any;
    /**
     * Get the current computed width for the first element in the set of matched elements, including padding,
     * border and optionally margin
     *
     * @param {Boolean} [includeMargin=false] - include the element's margin in the calculation (true/false)
     * @return {Number} - width
     */
    outerWidth(includeMargin: any): any;
    /**
     *  Get the current coordinates of the first element in the set of matched elements,
     *  relative to the document
     *
     * @return {Object} - offset (offset.top, offset.left)
     */
    offset(): {
        top: any;
        left: any;
    };
    /**
     * Create a deep copy of the first element in the set of matched elements (without data and events)
     *
     * @param {Boolean} [withChildren=false] - clone with children (true/false)
     * @return {Object} - clone of dom node
     */
    clone(withChildren: any): VeamsQueryObject;
    /**
     * Return an integer indicating the position of the first element in the set of matched elements relative
     * to its sibling elements
     *
     * @return {Number} - index of element among its siblings
     */
    index(): any;
    /**
     * Get the value of a property for the first element in the set of matched elements
     * Set value of a property for the set of matched elements
     *
     * @param {String} propName - property name
     * @param {String|Number|Boolean} [propVal] - property value
     * @return {String|Number|Boolean|Object} - property value | VeamsQuery object
     */
    prop(propName: any, propVal: any): any;
    /**
     * Get the current value of the first element in the set of matched elements.
     * Set the value of each element in the set of matched elements
     *
     * @param {String} [val] - value
     * @return {String|Number|Array|Object} - value | VeamsQuery object
     */
    val(val: any): any;
    /**
     * Encode a set of form elements as a string for submission.
     *
     * @return {String} - serialized form data
     */
    serialize(): string;
    /**
     * Attach an event handler function for one or more events to the selected elements
     *
     * @param {String} eventNames - name(s) of event(s) to be registered for matched set of elements
     * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
     * @param {Function} handler - event handler function
     * @param {Boolean} [useCapture] - dispatch event to registered listeners before dispatching it to event target
     * @return {Object} - VeamsQuery object
     */
    on(eventNames: any, selector: any, handler: any, useCapture: any): this;
    /**
     * Detach an event handler for one or more events from the selected elements
     *
     * @param {String} eventNames - name(s) of event(s) to be unregistered for matched set of elements
     * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
     * @param {Function} [handler] - event handler
     * @return {Object} - VeamsQuery object
     */
    off(eventNames: any, selector: any, handler: any): this;
    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type
     *
     * @param {String} eventNames - name(s) of event(s) which will be trigger on the set of matched elements
     * @param {Object} [customData] - custom data to pass with the event (accessible via event.detail)
     * @return {Object} - VeamsQuery object
     */
    trigger(eventNames: any, customData: any): this;
}
/**
 * VeamsQuery Interface
 */
export interface IVeamsQuery {
    (selector?: object, context?: any): any;
    version: string;
    parseHTML: any;
    ajax: any;
}
/**
 * VeamsQuery selector function
 *
 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
 * @param {Object} [context] - context (VeamsQuery object, element)
 */
declare const VeamsQuery: IVeamsQuery;
export default VeamsQuery;
