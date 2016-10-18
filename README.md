# VeamsQuery

Represents a very simple DOM API for Veams-JS (incl. ajax support)

## Version

Latest version is ```v1.6.0```

## Getting started

### Installation

```
bower install veams-query --save
```

### Import

Use relative path to your bower components folder

_Example:_

``` js
import VeamsQuery from '../bower-components/veams-query/veams-query';
```

## Usage

Documentation of all functions (Selector, support and DOM)

### Selector function

#### VeamsQuery( selector:string|object, context:object )
``` js
/**
 * VeamsQuery selector function
 *
 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
 * @param {Object} [context] - context (VeamsQuery object, element)
 */
```

### Support functions

#### VeamsQuery.parseHTML( htmlString:string )
``` js
/**
 * Return DOM element created from given HTML string
 *
 * @param {String} htmlString - html string to parse
 * @return {Object} - DOM node
 */
```

#### VeamsQuery.ajax( opts:object )
``` js
/**
 * Send XMLHttpRequest
 *
 * @param {Object} opts - options
 * @param {String} [opts.type='GET'] - an alias for method
 * @param {String} opts.url - a string containing the URL to which the request is sent
 * @param {String} [opts.dataType='text'] - a string containing the URL to which the request is sent
 * @param {Function} [opts.success] - success callback
 * @param {Function} [opts.error] - error callback
 */
```

### DOM functions

#### .find( selector:string|object )
``` js
/**
 * Get the descendants of each element in the current set of matched elements, filtered by a selector,
 * VeamsQuery object, or element
 *
 * @param {String|Object} selector - selector (string, VeamsQuery object, element)
 * @return {Object} - VeamsQuery object
 */
```

#### .closest( selector:string )
``` js
/**
 * For each element in the set, get the first element that matches the selector by testing
 * the element itself and traversing up through its ancestors in the DOM tree
 *
 * @param {String} selector - selector
 * @return {Object} - VeamsQuery object
 */
```

#### .eq( index:number )
``` js
/**
 * Reduce the set of matched elements to the one at the specified index
 *
 * @param {Number} index - index of element in node list
 * @return {Object} - VeamsQuery object containing node at given index of original node list
 */
```

#### .hasClass( className:string )
``` js
/**
 * Check if element has given class
 *
 * @param {String} className - name of class to check
 * @return {Boolean} - element has class (true/false)
 */
```

#### .is( selector:string )
``` js
/**
 * Check the current matched set of elements against a selector, element, or VeamsQuery object
 * and return true if at least one of these elements matches the given arguments
 *
 * @param {String} selector - a string containing a selector expression to match elements against
 * @return {Boolean} - at least one element matches selector (true/false)
 */
```

#### .addClass( classNames:string )
``` js
/**
 * Add the specified class(es) to each element in the set of matched elements
 *
 * @param {String} classNames - name(s) of class(es) to add
 * @return {Object} - VeamsQuery object
 */
```

#### .removeClass( [classNames:string] )
``` js
/**
 * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
 *
 * @param {String} [classNames] - name(s) of class(es) to remove
 * @return {Object} - VeamsQuery object
 */
```

#### .attr( attrName:string )
``` js
/**
 * Get the value of an attribute for the first element in the set of matched elements
 *
 * @param {String} attrName - attribute name
 * @return {String|Number|Boolean} - attribute value
 */
```

#### .attr( attrName:string, attrVal:string|number|boolean )
``` js
/**
 * Set value of an attribute for the set of matched elements
 *
 * @param {String} attrName - attribute name
 * @param {String|Number|Boolean} attrVal - attribute value
 * @return {Object} - VeamsQuery object
 */
```

#### .removeAttr( attrName:string )
``` js
/**
 * Remove an attribute from each element in the set of matched elements
 *
 * @param {String} attrName - attribute name
 * @return {Object} - VeamsQuery object
 */
```

#### .css( cssProp:string )
``` js
/**
 * Get the computed style properties for the first element in the set of matched elements
 *
 * @param {String} cssProp - css property
 * @return {String} - css value
 */
```

#### .css( cssProp:string|object, cssVal:string)
``` js
/**
 * Set the content of each element in the set of matched elements to the specified text
 *
 * @param {String|Object} cssProp - css property
 * @param {String} cssVal - css value
 * @return {Object} - VeamsQuery object
 */
```

#### .outerHeight( includeMargin:boolean)
``` js
/**
 *  Get the current computed height for the first element in the set of matched elements,
 *  including padding, border and optionally margin
 *
 * @param {Boolean} [includeMargin=false] - include element's margin in calculation (true/false)
 * @return {Number} - height
 */
```

#### .outerWidth( includeMargin:boolean)
``` js
/**
 * Get the current computed width for the first element in the set of matched elements,
 * including padding,border and optionally margin
 *
 * @param {Boolean} [includeMargin=false] - include element's margin in calculation (true/false)
 * @return {Number} - width
 */
```

#### .offset()
``` js
/**
 *  Get the current coordinates of the first element in the set of matched elements,
 *  relative to the document
 *
 * @return {Object} - offset (offset.top, offset.left)
 */
```

#### .html()
``` js
/**
 * Get the HTML contents of the first element in the set of matched elements
 *
 * @return {String} - html contents
 */
```

#### .html( htmlStr:string )
``` js
/**
 * Set the HTML contents of each element in the set of matched elements
 *
 * @param {String} htmlStr - html string
 * @return {Object} - VeamsQuery object
 */
```

#### .text()
``` js
/**
 * Get the combined text contents of each element in the set of matched elements
 *
 * @return {String} - text
 */
```

#### .text( text:string )
``` js
/**
 * Set the content of each element in the set of matched elements to the specified text
 *
 * @param {String} text - text
 * @return {Object} - VeamsQuery object
 */
```

#### .prepend( element:string|object )
``` js
/**
 * Insert content, specified by the parameter, to the beginning of each element in the set
 * of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
```

#### .append( element:string|object )
``` js
/**
 * Insert content, specified by the parameter, to the end of each element in the set of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
```

#### .before( element:string|object )
``` js
/**
 * Insert content, specified by the parameter, before each element in the set of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
```

#### .after( element:string|object )
``` js
/**
 * Insert content, specified by the parameter, after each element in the set of matched elements
 *
 * @param {String|Object} element - html string | VeamsQuery object | element
 * @return {Object} - VeamsQuery object
 */
```

#### .remove()
``` js
/**
 * Remove the set of matched elements from the DOM
 *
 * @return {Object} - VeamsQuery object
 */
```

#### .empty()
``` js
/**
 * Remove all child nodes of the set of matched elements from the DOM
 *
 * @return {Object} - VeamsQuery object
 */
```

#### .clone( [withChildren:boolean] )
``` js
/**
 * Create a deep copy of the first element in the set of matched elements (without data and events)
 *
 * @param {Boolean} [withChildren=false] - clone with children (true/false)
 * @return {Object} - clone of dom node
 */
```

#### .index()
``` js
/**
 * Return an integer indicating the position of the first element in the set of matched elements relative
 * to its sibling elements
 *
 * @return {Number} - index of element among its siblings
 */
```

#### .prop( propName:string )
``` js
/**
 * Get the value of a property for the first element in the set of matched elements
 *
 * @param {String} propName - property name
 * @return {String|Number|Boolean|Object} - property value
 */
```

#### .prop( propName:string, propVal:string|number|boolean|object )
``` js
/**
 * Set value of a property for the set of matched elements
 *
 * @param {String} propName - property name
 * @param {String|Number|Boolean|Object} propVal - property value
 * @return {Object} - VeamsQuery object
 */
```

#### .val()
``` js
/**
 * Get the current value of the first element in the set of matched elements.
 *
 * @return {String|Number|Array} - value
 */
```

#### .val( val:string )
``` js
/**
 * Set the value of each element in the set of matched elements
 *
 * @param {String} val - value
 * @return {Object} - VeamsQuery object
 */
```

#### .serialize()
``` js
/**
 * Encode a set of form elements as a string for submission.
 *
 * @return {String} - serialized form data
 */
```

#### .on( eventNames:string[, selector:string] ,handler:function)
``` js
/**
 * Attach an event handler function for one or more events to the selected elements
 *
 * @param {String} eventNames - name(s) of event(s) to be registered for matched set of elements
 * @param {String} [selector] - selector string to filter descendants of selected elements triggering the event
 * @param {Function} handler - event handler function
 * @return {Object} - VeamsQuery object
 */
```

#### .off( eventNames:string, handler:function)
``` js
/**
 * Detach an event handler for one or more events from the selected elements
 *
 * @param {String} eventNames - name(s) of event(s) to be unregistered for matched set of elements
 * @param {Function} handler - event handler function
 * @return {Object} - VeamsQuery object
 */
```

#### .trigger( eventNames:string [, customData:object])
``` js
/**
 * Execute all handlers and behaviors attached to the matched elements for the given event type
 *
 * @param {String} eventNames - name(s) of event(s) which will be trigger on the set of matched elements
 * @param {Object} [customData] - custom data to pass with the event (accessible via event.detail)
 * @return {Object} - VeamsQuery object
 */
```