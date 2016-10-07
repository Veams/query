/**
 * Represents a very simple DOM API for Veams-JS (incl. ajax support)
 *
 * @module VeamsQuery
 * @version v1.0.0
 *
 * @author Andy Gutsche
 */


let classListSupport = 'classList' in document.documentElement;


/**
 * VeamsQuery selector function
 *
 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
 * @param {Object} [context] - context (VeamsQuery object, element)
 */
let VeamsQuery = function (selector, context) {
	return new VeamsQueryObject(selector, context);
};


// VeamsQuery version
VeamsQuery.version = 'v1.0.0';


/**
 * Return DOM element created from given HTML string
 *
 * @param {String} htmlString - html string to parse
 * @return {Object} - DOM node
 */
VeamsQuery.parseHTML = function (htmlString) {
	let parser = new DOMParser();
	let content = 'text/html';
	let DOM = parser.parseFromString(htmlString, content);

	// return element
	return DOM.body.childNodes[0];
};


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
VeamsQuery.ajax = function (opts) {
	let options = {
		type: opts.type || 'GET',
		url: opts.url,
		dataType: opts.dataType || 'text',
		success: opts.success || function () {
		},
		error: opts.error || function () {
		},
	};

	let request = new XMLHttpRequest();
	request.open(options.type, options.url, true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			let response;

			if (options.dataType === 'json') {
				response = JSON.parse(request.responseText);
			}
			else {
				response = request.responseText;
			}

			options.success(response);
		} else {
			options.error(request.status, request.statusText)
		}
	};

	request.onerror = function (e) {
		options.error(e.target.status);
	};

	request.send();
};


/**
 * VeamsQuery DOM wrapper object
 *
 * @param {String | Object} selector - selector (string, VeamsQuery object, element)
 * @param {Object} [context] - context (VeamsQuery object, element)
 */
let VeamsQueryObject = function (selector, context) {
	let scope;
	let i = 0;
	this.nodes = [];

	if (!selector) {
		return;
	}

	// plain dom node or window object
	if (selector.nodeType || selector === window) {
		this.nodes.push(selector);

		return;
	}

	// VeamsQuery object
	if (selector.nodes) {
		this.nodes = selector.nodes.slice();

		return;
	}

	if (context) {
		if (!context.nodes.length) {
			return;
		}

		scope = context.nodes;
	}
	else {
		scope = [document];
	}

	for (i; i < scope.length; i++) {

		try {
			if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
				switch (selector.charAt(0)) {
					case '#':
						this.nodes = this.nodes.concat([scope[i].getElementById(selector.substr(1))]);
						break;
					case '.':
						let classes = selector.substr(1).replace(/\./g, ' ');
						this.nodes = this.nodes.concat([].slice.call(scope[i].getElementsByClassName(classes)));
						break;
					default:
						this.nodes = this.nodes.concat([].slice.call(scope[i].getElementsByTagName(selector)));
				}
			}
			else {
				this.nodes = this.nodes.concat([].slice.call(scope[i].querySelectorAll(selector)));
			}
		} catch (e) {
			console.warn('VeamsQuery says: "', e, '"');
		}
	}

};


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
 * Check if element has given class
 *
 * @param {String} className - name of class to check
 * @return {Boolean} - element has class (true/false)
 */
VeamsQueryObject.prototype.hasClass = function (className) {
	if (classListSupport) {
		return this.nodes[0].classList.contains(className);
	} else {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)").test(this.nodes[0].className);
	}
};


/**
 * Check the current matched set of elements against a selector, element, or VeamsQuery object and return true if
 * at least one of these elements matches the given arguments
 *
 * @param {String} selector - a string containing a selector expression to match elements against
 * @return {Boolean} - at least one element matches selector (true/false)
 */
VeamsQueryObject.prototype.is = function (selector) {
	let i = 0;

	if (!selector) {
		return false;
	}

	for (i; i < this.nodes.length; i++) {
		if ((this.nodes[i].matches || this.nodes[i].matchesSelector || this.nodes[i].msMatchesSelector ||
				this.nodes[i].mozMatchesSelector || this.nodes[i].webkitMatchesSelector ||
				this.nodes[i].oMatchesSelector).call(this.nodes[i], selector)) {
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
	let i = 0;
	let classes = classNames && classNames.split(' ');

	if (!classes) {
		return false;
	}

	for (i; i < this.nodes.length; i++) {

		for (let j = 0; j < classes.length; j++) {

			if (classListSupport) {
				this.nodes[i].classList.add(classes[j]);
			} else {
				if (this.nodes[i].className.split(' ').indexOf(classes[j]) === -1) {
					this.nodes[i].className = this.nodes[i].className + ' ' + classes[j];
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
	let i = 0;
	let classes = classNames && classNames.split(' ');

	for (i; i < this.nodes.length; i++) {

		if (!classes) {
			this.nodes[i].removeAttribute('class');
		}
		else {

			for (let j = 0; j < classes.length; j++) {

				if ('classList' in document.documentElement) {
					this.nodes[i].classList.remove(classes[j]);
				}
				else {
					this.nodes[i].className =
							this.nodes[i].className.replace(new RegExp("(^|\\s+)" + classes[j] + "(\\s+|$)"), ' ');
				}

				if (!this.nodes[i].className.length) {
					this.nodes[i].removeAttribute('class');
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
	let i = 0;

	if (!htmlStr) {
		return this.nodes[0].innerHTML;
	}

	for (i; i < this.nodes.length; i++) {
		this.nodes[i].innerHTML = htmlStr;
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
	let i = 0;

	for (i; i < this.nodes.length; i++) {
		if (typeof element === 'string') {
			this.nodes[i].insertAdjacentHTML('beforeend', element);
		}
		else {
			this.nodes[i].appendChild(element.nodes && element.nodes[0] || element);
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
	let i = 0;

	for (i; i < this.nodes.length; i++) {
		if (typeof element === 'string') {
			this.nodes[i].insertAdjacentHTML('afterbegin', element);
		}
		else {
			this.nodes[i].insertBefore(element.nodes && element.nodes[0] || element, this.nodes[i].firstChild);
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
	let i = 0;

	for (i; i < this.nodes.length; i++) {
		if (typeof element === 'string') {
			this.nodes[i].insertAdjacentHTML('beforebegin', element);
		}
		else {
			this.nodes[i].parentNode.insertBefore(element.nodes && element.nodes[0] || element, this.nodes[i]);
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
	let i = 0;

	for (i; i < this.nodes.length; i++) {
		if (typeof element === 'string') {
			this.nodes[i].insertAdjacentHTML('afterend', element);
		}
		else {
			this.nodes[i].parentNode.insertBefore(element.nodes && element.nodes[0] || element,
					this.nodes[i].nextElementSibling);
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
	let i = 0;

	for (i; i < this.nodes.length; i++) {
		this.nodes[i].parentNode.removeChild(this.nodes[i]);
	}

	return this;
};


/**
 * Remove all child nodes of the set of matched elements from the DOM
 *
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.empty = function () {
	let i = 0;

	for (i; i < this.nodes.length; i++) {
		while (this.nodes[i].firstChild) {
			this.nodes[i].removeChild(this.nodes[i].firstChild);
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
	return new VeamsQueryObject(this.nodes[index]);
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
	let i = 0;

	if (!attrVal) {
		return this.nodes[0].getAttribute(attrName);
	}

	for (i; i < this.nodes.length; i++) {
		this.nodes[i].setAttribute(attrName, attrVal);
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
	let i = 0;

	if (!attrName) {
		return false;
	}

	for (i; i < this.nodes.length; i++) {
		this.nodes[i].removeAttribute(attrName);
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
	let i = 0;
	let combinedText = '';

	for (i; i < this.nodes.length; i++) {

		if (!text) {
			combinedText += this.nodes[i].innerText;
		}
		else {
			this.nodes[i].innerText = text;
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
	let i = 0;

	if (typeof cssProp === 'string') {

		if (!cssVal) {
			return this.nodes[0].style[cssProp];
		}
		else {

			for (i; i < this.nodes.length; i++) {
				this.nodes[i].style[cssProp] = cssVal;
			}
		}
	}
	else if (typeof cssProp === 'object') {

		for (i; i < this.nodes.length; i++) {
			for (let prop in cssProp) {
				if (cssProp.hasOwnProperty(prop)) {
					this.nodes[i].style[prop] = cssProp[prop];
				}
			}
		}
	}

	return this;
};


/**
 * Create a deep copy of the first element in the set of matched elements (without data and events)
 *
 * @param {Boolean} [withChildren=false] - clone with children (true/false)
 * @return {Object} - clone of dom node
 */
VeamsQueryObject.prototype.clone = function (withChildren) {
	return this.nodes[0].cloneNode(withChildren);
};


/**
 * Return an integer indicating the position of the first element in the set of matched elements relative
 * to its sibling elements
 *
 * @return {Number} - index of element among its siblings
 */
VeamsQueryObject.prototype.index = function () {
	return [].slice.call(this.nodes[0].parentNode.children).indexOf(this.nodes[0]);
};


/**
 * Attach an event handler function for one or more events to the selected elements
 *
 * @param {String} eventNames - name(s) of event(s) to be registered for matched set of elements
 * @param {Function} handler - event handler function
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.on = function (eventNames, handler) {
	let i = 0;
	let j = 0;
	let events = eventNames.split(' ');

	for (i; i < this.nodes.length; i++) {

		for (j; j < events.length; j++) {
			this.nodes[i].addEventListener(events[j], handler);
		}
	}

	return this;
};


/**
 * Detach an event handler for one or more events from the selected elements
 *
 * @param {String} eventNames - name(s) of event(s) to be unregistered for matched set of elements
 * @param {Function} handler - event handler function
 * @return {Object} - VeamsQuery object
 */
VeamsQueryObject.prototype.off = function (eventNames, handler) {
	let i = 0;
	let j = 0;
	let events = eventNames.split(' ');

	for (i; i < this.nodes.length; i++) {

		for (j; j < events.length; j++) {
			this.nodes[i].removeEventListener(events[j], handler);
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
	let i = 0;
	let j = 0;
	let events = eventNames.split(' ');

	for (i; i < this.nodes.length; i++) {

		for (j; j < events.length; j++) {

			if (typeof this.nodes[i][events[j]] === 'function') {
				this.nodes[i][events[j]]();
			}
			else {
				this.nodes[i].dispatchEvent(new CustomEvent(events[j], {detail: customData}));
			}
		}
	}

	return this;
};


export default VeamsQuery;