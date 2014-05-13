/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/**
 * T("timbre.js") - A JavaScript library for objective sound programming
 */

(function(undefined) {
    "use strict";

    if (typeof Float32Array === "undefined") {
        /*jshint latedef:true */
        setupTypedArray();
        /*jshint latedef:false */
    }

    var timbre = function() {
        return T.apply(null, arguments);
    };

    var slice = Array.prototype.slice;

    var FINISHED_STATE    = 0;
    var PLAYING_STATE     = 1;
    var UNSCHEDULED_STATE = 2; // (not use)
    var SCHEDULED_STATE   = 3; // (not use)

    var ACCEPT_SAMPLERATES = [8000,11025,12000,16000,22050,24000,32000,44100,48000];
    var ACCEPT_CELLSIZES = [32,64,128,256];

    var _ver = "13.08.03";
    var _sys = null;
    var _constructors = {};
    var _factories    = {};
    var _envtype = (typeof module !== "undefined" && module.exports) ? "node" :
        (typeof window !== "undefined") ? "browser" : "unknown";
    var _envmobile = _envtype === "browser" && /(iPhone|iPad|iPod|Android)/i.test(navigator.userAgent);
    var _f64mode = false;
    var _bpm = 120;

    var T = function() {
        var args = slice.call(arguments), key = args[0], t, m;

        switch (typeof key) {
        case "string":
            if (_constructors[key]) {
                t = new _constructors[key](args.slice(1));
            } else if (_factories[key]) {
                t = _factories[key](args.slice(1));
            } else {
                m = /^(.+?)(?:\.(ar|kr))?$/.exec(key);
                if (m) {
                    key = m[1];
                    if (_constructors[key]) {
                        t = new _constructors[key](args.slice(1));
                    } else if (_factories[key]) {
                        t = _factories[key](args.slice(1));
                    }
                    if (t && m[2]) {
                        t[m[2]]();
                    }
                }
            }
            break;
        case "number":
            t = new NumberWrapper(args);
            break;
        case "boolean":
            t = new BooleanWrapper(args);
            break;
        case "function":
            t = new FunctionWrapper(args);
            break;
        case "object":
            if (key !== null) {
                if (key instanceof TimbreObject) {
                    return key;
                } else if (key.context instanceof TimbreObject) {
                    return key.context;
                } else if (isDictionary(key)) {
                    t = new ObjectWrapper(args);
                } else if (isArray(key)) {
                    t = new ArrayWrapper(args);
                }
            }
            break;
        }

        if (t === undefined) {
            t = new AddNode(args.slice(1));
            console.warn("T(\"" + key + "\") is not defined.");
        }

        var _ = t._;
        _.originkey = key;
        _.meta = __buildMetaData(t);
        _.emit("init");

        return t;
    };

    var __buildMetaData = function(instance) {
        var meta = instance._.meta;
        var names, desc;
        var p = instance;
        while (p !== null && p.constructor !== Object) {
            names = Object.getOwnPropertyNames(p);
            for (var i = 0, imax = names.length; i < imax; ++i) {
                if (meta[names[i]]) {
                    continue;
                }
                if (/^(constructor$|process$|_)/.test(names[i])) {
                    meta[names[i]] = "ignore";
                } else {
                    desc = Object.getOwnPropertyDescriptor(p, names[i]);
                    if (typeof desc.value === "function") {
                        meta[names[i]] = "function";
                    } else if (desc.get || desc.set) {
                        meta[names[i]] = "property";
                    }
                }
            }
            p = Object.getPrototypeOf(p);
        }
        return meta;
    };

    // properties
    Object.defineProperties(timbre, {
        version  : { value: _ver },
        envtype  : { value: _envtype },
        envmobile: { value: _envmobile },
        env: {
            get: function() {
                return _sys.impl.env;
            }
        },
        samplerate: {
            get: function() {
                return _sys.samplerate;
            }
        },
        channels: {
            get: function() {
                return _sys.channels;
            }
        },
        cellsize: {
            get: function() {
                return _sys.cellsize;
            }
        },
        currentTime: {
            get: function() {
                return _sys.currentTime;
            }
        },
        isPlaying: {
            get: function() {
                return _sys.status === PLAYING_STATE;
            }
        },
        isRecording: {
            get: function() {
                return _sys.status === SCHEDULED_STATE;
            }
        },
        amp: {
            set: function(value) {
                if (typeof value === "number") {
                    _sys.amp = value;
                }
            },
            get: function() {
                return _sys.amp;
            }
        },
        bpm: {
            set: function(value) {
                if (typeof value === "number") {
                    if (5 <= value && value <= 300) {
                        _bpm = value;
                    }
                }
            },
            get: function() {
                return _bpm;
            }
        }
    });

    timbre.bind = function(Klass, opts) {
        _sys.bind(Klass, opts);
        return timbre;
    };
    timbre.setup = function(opts) {
        _sys.setup(opts);
        return timbre;
    };
    timbre.play = function() {
        _sys.play();
        return timbre;
    };
    timbre.pause = function() {
        _sys.pause();
        return timbre;
    };
    timbre.reset = function() {
        _sys.reset();
        _sys.events.emit("reset");
        return timbre;
    };
    timbre.on = timbre.addListener = function(type, listener) {
        _sys.on(type, listener);
        return timbre;
    };
    timbre.once = function(type, listener) {
        _sys.once(type, listener);
        return timbre;
    };
    timbre.off = timbre.removeListener = function(type, listener) {
        _sys.off(type, listener);
        return timbre;
    };
    timbre.removeAllListeners = function(type) {
        _sys.removeAllListeners(type);
        return timbre;
    };
    timbre.listeners = function(type) {
        return _sys.listeners(type);
    };
    timbre.rec = function() {
        return _sys.rec.apply(_sys, arguments);
    };
    timbre.timevalue = (function() {
        var getbpm = function(str) {
            var m, bpm = _bpm;
            if ((m = /^bpm(\d+(?:\.\d+)?)/i.exec(str))) {
                bpm = Math.max(5, Math.min(300, +(m[1]||0)));
            }
            return bpm;
        };
        return function(str) {
            var m, ms, x;
            if ((m = /^(\d+(?:\.\d+)?)Hz$/i.exec(str))) {
                return +m[1] === 0 ? 0 : 1000 / +m[1];
            }
            if ((m = /L(\d+)?(\.*)$/i.exec(str))) {
                ms = 60 / getbpm(str) * (4 / (m[1]||4)) * 1000;
                ms *= [1, 1.5, 1.75, 1.875][(m[2]||"").length] || 1;
                return ms;
            }
            if ((m = /^(\d+(?:\.\d+)?|\.(?:\d+))(min|sec|m)s?$/i.exec(str))) {
                switch (m[2]) {
                case "min": return +(m[1]||0) * 60 * 1000;
                case "sec": return +(m[1]||0) * 1000;
                case "m"  : return +(m[1]||0);
                }
            }
            if ((m = /^(?:([0-5]?[0-9]):)?(?:([0-5]?[0-9]):)(?:([0-5]?[0-9]))(?:\.([0-9]{1,3}))?$/.exec(str))) {
                x = (m[1]||0) * 3600 + (m[2]||0) * 60 + (m[3]||0);
                x = x * 1000 + ((((m[4]||"")+"00").substr(0, 3))|0);
                return x;
            }
            if ((m = /(\d+)\.(\d+)\.(\d+)$/i.exec(str))) {
                x = (m[1] * 4 + (+m[2])) * 480 + (+m[3]);
                return 60 / getbpm(str) * (x / 480) * 1000;
            }
            if ((m = /(\d+)ticks$/i.exec(str))) {
                return 60 / getbpm(str) * (m[1] / 480) * 1000;
            }
            if ((m = /^(\d+)samples(?:\/(\d+)Hz)?$/i.exec(str))) {
                return m[1] * 1000 / (m[2] || timbre.samplerate);
            }
            return 0;
        };
    })();

    var fn = timbre.fn = {
        SignalArray: Float32Array,
        currentTimeIncr: 0,
        emptycell: null,
        FINISHED_STATE: FINISHED_STATE,
        PLAYING_STATE: PLAYING_STATE,
        UNSCHEDULED_STATE: UNSCHEDULED_STATE,
        SCHEDULED_STATE: SCHEDULED_STATE
    };

    var isArray = fn.isArray = Array.isArray;
    var isDictionary = fn.isDictionary = function(object) {
        return typeof object === "object" && object.constructor === Object;
    };

    fn.nop = function() {
        return this;
    };

    fn.isSignalArray = function(obj) {
        if (obj instanceof fn.SignalArray) {
            return true;
        }
        if (Array.isArray(obj) && obj.__klass && obj.__klass.type === 2) {
            return true;
        }
        return false;
    };

    // borrowed from coffee-script
    fn.extend = function(child, parent) {
        parent = parent || TimbreObject;

        for (var key in parent) {
            if (parent.hasOwnProperty(key)) {
                child[key] = parent[key];
            }
        }
        /*jshint validthis:true */
        function ctor() {
            this.constructor = child;
        }
        /*jshint validthis:false */
        ctor.prototype  = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

    fn.constructorof = function(ctor, Klass) {
        var f = ctor && ctor.prototype;
        while (f) {
            if (f === Klass.prototype) {
                return true;
            }
            f = Object.getPrototypeOf(f);
        }
        return false;
    };

    fn.register = function(key, ctor) {
        if (fn.constructorof(ctor, TimbreObject)) {
            _constructors[key] = ctor;
        } else {
            _factories[key] = ctor;
        }
    };

    fn.alias = function(key, alias) {
        if (_constructors[alias]) {
            _constructors[key] = _constructors[alias];
        } else if (_factories[alias]) {
            _factories[key] = _factories[alias];
        }

    };

    fn.getClass = function(key) {
        return _constructors[key];
    };

    fn.pointer = function(src, offset, length) {
        offset = src.byteOffset + offset * src.constructor.BYTES_PER_ELEMENT;
        if (typeof length === "number") {
            return new src.constructor(src.buffer, offset, length);
        } else {
            return new src.constructor(src.buffer, offset);
        }
    };

    fn.nextTick = function(func) {
        _sys.nextTick(func);
        return timbre;
    };

    fn.fixAR = function(self) {
        self._.ar = true;
        self._.aronly = true;
    };

    fn.fixKR = function(self) {
        self._.ar = false;
        self._.kronly = true;
    };

    fn.changeWithValue = function() {
        var _ = this._;
        var x = _.value * _.mul + _.add;
        if (isNaN(x)) {
            x = 0;
        }
        var cell = this.cells[0];
        for (var i = 0, imax = cell.length; i < imax; ++i) {
            cell[i] = x;
        }
    };
    fn.changeWithValue.unremovable = true;

    fn.clone = function(src) {
        var new_instance = new src.constructor([]);
        new_instance._.ar  = src._.ar;
        new_instance._.mul = src._.mul;
        new_instance._.add = src._.add;
        new_instance._.bypassed = src._.bypassed;
        return new_instance;
    };

    fn.timer = (function() {
        var make_onstart = function(self) {
            return function() {
                if (_sys.timers.indexOf(self) === -1) {
                    _sys.timers.push(self);
                    _sys.events.emit("addObject");
                    self._.emit("start");
                    fn.buddies_start(self);
                }
            };
        };
        var make_onstop = function(self) {
            return function() {
                var i = _sys.timers.indexOf(self);
                if (i !== -1) {
                    _sys.timers.splice(i, 1);
                    self._.emit("stop");
                    _sys.events.emit("removeObject");
                    fn.buddies_stop(self);
                }
            };
        };
        return function(self) {
            var onstart = make_onstart(self);
            var onstop  = make_onstop(self);
            self.nodeType = TimbreObject.TIMER;
            self.start = function() {
                _sys.nextTick(onstart);
                return self;
            };
            self.stop = function() {
                _sys.nextTick(onstop);
                return self;
            };
            return self;
        };
    })();

    fn.listener = (function() {
        var make_onlisten = function(self) {
            return function() {
                if (_sys.listeners.indexOf(self) === -1) {
                    _sys.listeners.push(self);
                    _sys.events.emit("addObject");
                    self._.emit("listen");
                    fn.buddies_start(self);
                }
            };
        };
        var make_onunlisten = function(self) {
            return function() {
                var i = _sys.listeners.indexOf(self);
                if (i !== -1) {
                    _sys.listeners.splice(i, 1);
                    self._.emit("unlisten");
                    _sys.events.emit("removeObject");
                    fn.buddies_stop(self);
                }
            };
        };
        return function(self) {
            var onlisten = make_onlisten(self);
            var onunlisten = make_onunlisten(self);
            self.nodeType = TimbreObject.LISTENER;
            self.listen = function(buddies) {
                if (arguments.length) {
                    self.append.apply(self, arguments);
                }
                if (self.nodes.length) {
                    _sys.nextTick(onlisten);
                }
                return self;
            };
            self.unlisten = function() {
                if (arguments.length) {
                    self.remove.apply(self, arguments);
                }
                if (!self.nodes.length) {
                    _sys.nextTick(onunlisten);
                }
                return self;
            };
            return self;
        };
    })();

    fn.make_onended = function(self, lastValue) {
        return function() {
            self.playbackState = FINISHED_STATE;
            if (typeof lastValue === "number") {
                var cell  = self.cells[0];
                var cellL = self.cells[1];
                var cellR = self.cells[2];
                for (var i = 0, imax = cellL.length; i < imax; ++i) {
                    cell[0] = cellL[i] = cellR[i] = lastValue;
                }
            }
            self._.emit("ended");
        };
    };

    fn.inputSignalAR = function(self) {
        var cell  = self.cells[0];
        var cellL = self.cells[1];
        var cellR = self.cells[2];
        var nodes = self.nodes;
        var i, imax = nodes.length;
        var j, jmax = cell.length;
        var tickID  = self.tickID;
        var not_clear, tmp, tmpL, tmpR;

        if (self.numChannels === 2) {
            not_clear = true;
            if (imax !== 0) {
                for (i = 0; i < imax; ++i) {
                    if (nodes[i].playbackState === PLAYING_STATE) {
                        nodes[i].process(tickID);
                        cellL.set(nodes[i].cells[1]);
                        cellR.set(nodes[i].cells[2]);
                        not_clear = false;
                        ++i;
                        break;
                    }
                }
                for (; i < imax; ++i) {
                    if (nodes[i].playbackState === PLAYING_STATE) {
                        nodes[i].process(tickID);
                        tmpL = nodes[i].cells[1];
                        tmpR = nodes[i].cells[2];
                        for (j = jmax; j; ) {
                            j -= 8;
                            cellL[j  ] += tmpL[j  ]; cellR[j  ] += tmpR[j  ];
                            cellL[j+1] += tmpL[j+1]; cellR[j+1] += tmpR[j+1];
                            cellL[j+2] += tmpL[j+2]; cellR[j+2] += tmpR[j+2];
                            cellL[j+3] += tmpL[j+3]; cellR[j+3] += tmpR[j+3];
                            cellL[j+4] += tmpL[j+4]; cellR[j+4] += tmpR[j+4];
                            cellL[j+5] += tmpL[j+5]; cellR[j+5] += tmpR[j+5];
                            cellL[j+6] += tmpL[j+6]; cellR[j+6] += tmpR[j+6];
                            cellL[j+7] += tmpL[j+7]; cellR[j+7] += tmpR[j+7];
                        }
                    }
                }
            }
            if (not_clear) {
                cellL.set(fn.emptycell);
                cellR.set(fn.emptycell);
            }
        } else {
            not_clear = true;
            if (imax !== 0) {
                for (i = 0; i < imax; ++i) {
                    if (nodes[i].playbackState === PLAYING_STATE) {
                        nodes[i].process(tickID);
                        cell.set(nodes[i].cells[0]);
                        not_clear = false;
                        ++i;
                        break;
                    }
                }
                for (; i < imax; ++i) {
                    if (nodes[i].playbackState === PLAYING_STATE) {
                        tmp = nodes[i].process(tickID).cells[0];
                        for (j = jmax; j; ) {
                            j -= 8;
                            cell[j  ] += tmp[j  ];
                            cell[j+1] += tmp[j+1];
                            cell[j+2] += tmp[j+2];
                            cell[j+3] += tmp[j+3];
                            cell[j+4] += tmp[j+4];
                            cell[j+5] += tmp[j+5];
                            cell[j+6] += tmp[j+6];
                            cell[j+7] += tmp[j+7];
                        }
                    }
                }
            }
            if (not_clear) {
                cell.set(fn.emptycell);
            }
        }
    };

    fn.inputSignalKR = function(self) {
        var nodes = self.nodes;
        var i, imax = nodes.length;
        var tickID = self.tickID;
        var tmp = 0;
        for (i = 0; i < imax; ++i) {
            if (nodes[i].playbackState === PLAYING_STATE) {
                tmp += nodes[i].process(tickID).cells[0][0];
            }
        }
        return tmp;
    };

    fn.outputSignalAR = function(self) {
        var cell  = self.cells[0];
        var cellL = self.cells[1];
        var cellR = self.cells[2];
        var mul = self._.mul, add = self._.add;
        var i;

        if (self.numChannels === 2) {
            for (i = cell.length; i; ) {
                i -= 8;
                cellL[i  ] = cellL[i  ] * mul + add; cellR[i  ] = cellR[i  ] * mul + add;
                cellL[i+1] = cellL[i+1] * mul + add; cellR[i+1] = cellR[i+1] * mul + add;
                cellL[i+2] = cellL[i+2] * mul + add; cellR[i+2] = cellR[i+2] * mul + add;
                cellL[i+3] = cellL[i+3] * mul + add; cellR[i+3] = cellR[i+3] * mul + add;
                cellL[i+4] = cellL[i+4] * mul + add; cellR[i+4] = cellR[i+4] * mul + add;
                cellL[i+5] = cellL[i+5] * mul + add; cellR[i+5] = cellR[i+5] * mul + add;
                cellL[i+6] = cellL[i+6] * mul + add; cellR[i+6] = cellR[i+6] * mul + add;
                cellL[i+7] = cellL[i+7] * mul + add; cellR[i+7] = cellR[i+7] * mul + add;
                cell[i  ] = (cellL[i  ] + cellR[i  ]) * 0.5;
                cell[i+1] = (cellL[i+1] + cellR[i+1]) * 0.5;
                cell[i+2] = (cellL[i+2] + cellR[i+2]) * 0.5;
                cell[i+3] = (cellL[i+3] + cellR[i+3]) * 0.5;
                cell[i+4] = (cellL[i+4] + cellR[i+4]) * 0.5;
                cell[i+5] = (cellL[i+5] + cellR[i+5]) * 0.5;
                cell[i+6] = (cellL[i+6] + cellR[i+6]) * 0.5;
                cell[i+7] = (cellL[i+7] + cellR[i+7]) * 0.5;
            }
        } else {
            if (mul !== 1 || add !== 0) {
                for (i = cell.length; i; ) {
                    i -= 8;
                    cell[i  ] = cell[i  ] * mul + add;
                    cell[i+1] = cell[i+1] * mul + add;
                    cell[i+2] = cell[i+2] * mul + add;
                    cell[i+3] = cell[i+3] * mul + add;
                    cell[i+4] = cell[i+4] * mul + add;
                    cell[i+5] = cell[i+5] * mul + add;
                    cell[i+6] = cell[i+6] * mul + add;
                    cell[i+7] = cell[i+7] * mul + add;
                }
            }
        }
    };

    fn.outputSignalKR = function(self) {
        var cell  = self.cells[0];
        var cellL = self.cells[1];
        var cellR = self.cells[2];
        var mul = self._.mul, add = self._.add;
        var value = cell[0] * mul + add;
        var i;

        if (self.numChannels === 2) {
            for (i = cell.length; i; ) {
                i -= 8;
                cell[i] = cell[i+1] = cell[i+2] = cell[i+3] = cell[i+4] = cell[i+5] = cell[i+6] = cell[i+7] = cellL[i] = cellL[i+1] = cellL[i+2] = cellL[i+3] = cellL[i+4] = cellL[i+5] = cellL[i+6] = cellL[i+7] = cellR[i] = cellR[i+1] = cellR[i+2] = cellR[i+3] = cellR[i+4] = cellR[i+5] = cellR[i+6] = cellR[i+7] = value;
            }
        } else {
            for (i = cell.length; i; ) {
                i -= 8;
                cell[i] = cell[i+1] = cell[i+2] = cell[i+3] = cell[i+4] = cell[i+5] = cell[i+6] = cell[i+7] = value;
            }
        }
    };

    fn.buddies_start = function(self) {
        var buddies = self._.buddies;
        var node, i, imax;
        for (i = 0, imax = buddies.length; i < imax; ++i) {
            node = buddies[i];
            switch (node.nodeType) {
            case TimbreObject.DSP:
                node.play();
                break;
            case TimbreObject.TIMER:
                node.start();
                break;
            case TimbreObject.LISTENER:
                node.listen();
                break;
            }
        }
    };

    fn.buddies_stop = function(self) {
        var buddies = self._.buddies;
        var node, i, imax;
        for (i = 0, imax = buddies.length; i < imax; ++i) {
            node = buddies[i];
            switch (node.nodeType) {
            case TimbreObject.DSP:
                node.pause();
                break;
            case TimbreObject.TIMER:
                node.stop();
                break;
            case TimbreObject.LISTENER:
                node.unlisten();
                break;
            }
        }
    };

    fn.fix_iOS6_1_problem = function(flag) {
        _sys.fix_iOS6_1_problem(flag);
    };

    var modules = timbre.modules = {};

    // EventEmitter
    var EventEmitter = modules.EventEmitter = (function() {
        function EventEmitter(context) {
            this.context = context;
            this.events = {};
        }

        var $ = EventEmitter.prototype;

        $.emit = function(type) {
            var handler = this.events[type];
            if (!handler) {
                return false;
            }

            var args;
            if (typeof handler === "function") {
                switch (arguments.length) {
                case 1:
                    handler.call(this.context);
                    break;
                case 2:
                    handler.call(this.context, arguments[1]);
                    break;
                case 3:
                    handler.call(this.context, arguments[1], arguments[2]);
                    break;
                default:
                    args = slice.call(arguments, 1);
                    handler.apply(this.context, args);
                }
                return true;
            } else if (isArray(handler)) {
                args = slice.call(arguments, 1);
                var listeners = handler.slice();
                for (var i = 0, imax = listeners.length; i < imax; ++i) {
                    if (listeners[i] instanceof TimbreObject) {
                        listeners[i].bang.apply(listeners[i], args);
                    } else {
                        listeners[i].apply(this.context, args);
                    }
                }
                return true;
            } else if (handler instanceof TimbreObject) {
                args = slice.call(arguments, 1);
                handler.bang.apply(handler, args);
            } else {
                return false;
            }
        };

        $.on = function(type, listener) {
            if (typeof listener !== "function" && !(listener instanceof TimbreObject)) {
                throw new Error("addListener takes instances of Function or timbre.Object");
            }
            var e = this.events;

            if (!e[type]) {
                e[type] = listener;
            } else if (isArray(e[type])) {
                e[type].push(listener);
            } else {
                e[type] = [e[type], listener];
            }
            return this;
        };

        $.once = function(type, listener) {
            var self = this;
            var g;
            if (typeof listener === "function") {
                g = function () {
                    self.off(type, g);
                    listener.apply(self.context, arguments);
                };
            } else if (listener instanceof TimbreObject) {
                g = function () {
                    self.off(type, g);
                    listener.bang.apply(listener, arguments);
                };
            } else {
                throw new Error("once takes instances of Function or timbre.Object");
            }
            g.listener = listener;

            self.on(type, g);

            return this;
        };

        $.off = function(type, listener) {
            if (typeof listener !== "function" && !(listener instanceof TimbreObject)) {
                throw new Error("removeListener takes instances of Function or timbre.Object");
            }
            var e = this.events;

            if (!e[type]) {
                return this;
            }

            var list = e[type];

            if (isArray(list)) {
                var position = -1;
                for (var i = 0, imax = list.length; i < imax; ++i) {
                    if (list[i] === listener ||
                        // once listener
                        (list[i].listener && list[i].listener === listener)) {
                        position = i;
                        break;
                    }
                }

                if (position < 0) {
                    return this;
                }
                list.splice(position, 1);
                if (list.length === 0) {
                    e[type] = null;
                }
            } else if (list === listener ||
                       // once listener
                       (list.listener && list.listener === listener)) {
                e[type] = null;
            }

            return this;
        };

        $.removeAllListeners = function(type) {
            var e = this.events;

            var remain = false;
            var listeners = e[type];
            if (isArray(listeners)) {
                for (var i = listeners.length; i--; ) {
                    var listener = listeners[i];
                    if (listener.unremovable) {
                        remain = true;
                        continue;
                    }
                    this.off(type, listener);
                }
            } else if (listeners) {
                if (!listeners.unremovable) {
                    this.off(type, listeners);
                } else {
                    remain = true;
                }
            }
            if (!remain) {
                e[type] = null;
            }

            return this;
        };

        $.listeners = function(type) {
            var a, e = this.events;
            if (!e[type]) {
                return [];
            }
            e = e[type];
            if (!isArray(e)) {
                return e.unremovable ? [] : [e];
            }
            e = e.slice();
            a = [];
            for (var i = 0, imax = e.length; i < imax; ++i) {
                if (!e[i].unremovable) {
                    a.push(e[i]);
                }
            }
            return a;
        };

        return EventEmitter;
    })();

    var Deferred = modules.Deferred = (function() {
        function Deferred(context) {
            this.context = context || this;
            this._state = "pending";
            this._doneList = [];
            this._failList = [];

            this._promise = new Promise(this);
        }

        var $ = Deferred.prototype;

        var exec = function(statue, list, context, args) {
            if (this._state === "pending") {
                this._state = statue;
                for (var i = 0, imax = list.length; i < imax; ++i) {
                    list[i].apply(context, args);
                }
                this._doneList = this._failList = null;
            }
        };

        var isDeferred = function(x) {
            return x && typeof x.promise === "function";
        };

        $.resolve = function() {
            var args = slice.call(arguments, 0);
            exec.call(this, "resolved", this._doneList, this.context || this, args);
            return this;
        };
        $.resolveWith = function(context) {
            var args = slice.call(arguments, 1);
            exec.call(this, "resolved", this._doneList, context, args);
            return this;
        };
        $.reject = function() {
            var args = slice.call(arguments, 0);
            exec.call(this, "rejected", this._failList, this.context || this, args);
            return this;
        };
        $.rejectWith = function(context) {
            var args = slice.call(arguments, 1);
            exec.call(this, "rejected", this._failList, context, args);
            return this;
        };

        $.promise = function() {
            return this._promise;
        };
        $.done = function() {
            var args = slice.call(arguments);
            var isResolved = (this._state === "resolved");
            var isPending  = (this._state === "pending");
            var list = this._doneList;
            for (var i = 0, imax = args.length; i < imax; ++i) {
                if (typeof args[i] === "function") {
                    if (isResolved) {
                        args[i]();
                    } else if (isPending) {
                        list.push(args[i]);
                    }
                }
            }
            return this;
        };
        $.fail = function() {
            var args = slice.call(arguments);
            var isRejected = (this._state === "rejected");
            var isPending  = (this._state === "pending");
            var list = this._failList;
            for (var i = 0, imax = args.length; i < imax; ++i) {
                if (typeof args[i] === "function") {
                    if (isRejected) {
                        args[i]();
                    } else if (isPending) {
                        list.push(args[i]);
                    }
                }
            }
            return this;
        };
        $.always = function() {
            this.done.apply(this, arguments);
            this.fail.apply(this, arguments);
            return this;
        };
        $.then = function then(done, fail) {
            return this.done(done).fail(fail);
        };
        $.pipe = function(done, fail) {
            var self = this;
            var dfd = new Deferred(this.context);

            this.done(function() {
                var res = done.apply(self.context, arguments);
                if (isDeferred(res)) {
                    res.then(function() {
                        var args = slice.call(arguments);
                        dfd.resolveWith.apply(dfd, [res].concat(args));
                    });
                } else {
                    dfd.resolveWith(self, res);
                }
            });
            this.fail(function() {
                if (typeof fail === "function") {
                    var res = fail.apply(self.context, arguments);
                    if (isDeferred(res)) {
                        res.fail(function() {
                            var args = slice.call(arguments);
                            dfd.rejectWith.apply(dfd, [res].concat(args));
                        });
                    }
                } else {
                    dfd.reject.apply(dfd, arguments);
                }
            });

            return dfd.promise();
        };
        // $.then = $.pipe;

        $.isResolved = function() {
            return this._state === "resolved";
        };
        $.isRejected = function() {
            return this._state === "rejected";
        };
        $.state = function() {
            return this._state;
        };

        // TODO: test
        Deferred.when = function(subordinate) {
            var i = 0;
            var resolveValues = slice.call(arguments);
            var length    = resolveValues.length;
            var remaining = length;

            if (length === 1 && !isDeferred(subordinate)) {
                remaining = 0;
            }
            var deferred = (remaining === 1) ? subordinate : new Deferred();

            var updateFunc = function(i, results) {
                return function(value) {
                    results[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (!(--remaining)) {
                        deferred.resolve.apply(deferred, results);
                    }
                };
            };

            if (length > 1) {
                var resolveResults = new Array(length);
                var onfailed = function() {
                    deferred.reject();
                };
                for (; i < length; ++i) {
                    if (resolveValues[i] && isDeferred(resolveValues[i])) {
                        resolveValues[i].promise().done(
                            updateFunc(i, resolveResults)
                        ).fail(onfailed);
                    } else {
                        resolveResults[i] = resolveValues[i];
                        --remaining;
                    }
                }
            }

            if (!remaining) {
                deferred.resolve.apply(deferred, resolveValues);
            }

            return deferred.promise();
        };

        function Promise(object) {
            this.context = object.context;
            this.then = object.then;
            this.done = function() {
                object.done.apply(object, arguments);
                return this;
            };
            this.fail = function() {
                object.fail.apply(object, arguments);
                return this;
            };
            this.pipe = function() {
                return object.pipe.apply(object, arguments);
            };
            this.always = function() {
                object.always.apply(object, arguments);
                return this;
            };
            this.promise = function() {
                return this;
            };
            this.isResolved = function() {
                return object.isResolved();
            };
            this.isRejected = function() {
                return object.isRejected();
            };
        }

        return Deferred;
    })();

    // root object
    var TimbreObject = timbre.Object = (function() {
        function TimbreObject(numChannels, _args) {
            this._ = {}; // private members
            var e = this._.events = new EventEmitter(this);
            this._.emit = function() {
                return e.emit.apply(e, arguments);
            };
            if (isDictionary(_args[0])) {
                var params = _args.shift();
                var _in = params["in"];
                this.once("init", function() {
                    this.set(params);
                    if (_in) {
                        if (isArray(_in)) {
                            this.append.apply(this, _in);
                        } else if (_in instanceof TimbreObject) {
                            this.append(_in);
                        }
                    }
                });
            }

            this.tickID = -1;
            this.nodes  = _args.map(timbre);
            this.cells  = [];
            this.numChannels = numChannels;
            switch (numChannels) {
            case 0:
                this.L = this.R = new ChannelObject(null);
                this.cells[0] = this.cells[1] = this.cells[2] = this.L.cell;
                break;
            case 1:
                this.L = this.R = new ChannelObject(this);
                this.cells[0] = this.cells[1] = this.cells[2] = this.L.cell;
                break;
            case 2:
                this.L = new ChannelObject(this);
                this.R = new ChannelObject(this);
                this.cells[0] = new fn.SignalArray(_sys.cellsize);
                this.cells[1] = this.L.cell;
                this.cells[2] = this.R.cell;
                break;
            }
            this.playbackState = PLAYING_STATE;
            this.nodeType = TimbreObject.DSP;

            this._.ar  = true;
            this._.mul = 1;
            this._.add = 0;
            this._.dac = null;
            this._.bypassed = false;
            this._.meta = {};
            this._.samplerate = _sys.samplerate;
            this._.cellsize   = _sys.cellsize;
            this._.buddies    = [];
        }
        TimbreObject.DSP      = 1;
        TimbreObject.TIMER    = 2;
        TimbreObject.LISTENER = 3;

        var $ = TimbreObject.prototype;

        Object.defineProperties($, {
            isAr: {
                get: function() {
                    return this._.ar;
                }
            },
            isKr: {
                get: function() {
                    return !this._.ar;
                }
            },
            isBypassed: {
                get: function() {
                    return this._.bypassed;
                }
            },
            isEnded: {
                get: function() {
                    return !(this.playbackState & 1);
                }
            },
            mul: {
                set: function(value) {
                    if (typeof value === "number") {
                        this._.mul = value;
                        this._.emit("setMul", value);
                    }
                },
                get: function() {
                    return this._.mul;
                }
            },
            add: {
                set: function(value) {
                    if (typeof value === "number") {
                        this._.add = value;
                        this._.emit("setAdd", value);
                    }
                },
                get: function() {
                    return this._.add;
                }
            },
            buddies: {
                set: function(value) {
                    if (!isArray(value)) {
                        value = [value];
                    }
                    this._.buddies = value.filter(function(node) {
                        return node instanceof TimbreObject;
                    });
                },
                get: function() {
                    return this._.buddies;
                }
            }
        });

        $.toString = function() {
            return this.constructor.name;
        };

        $.valueOf = function() {
            if (_sys.tickID !== this.tickID) {
                this.process(_sys.tickID);
            }
            return this.cells[0][0];
        };

        $.append = function() {
            if (arguments.length > 0) {
                var list = slice.call(arguments).map(timbre);
                this.nodes = this.nodes.concat(list);
                this._.emit("append", list);
            }
            return this;
        };

        $.appendTo = function(object) {
            object.append(this);
            return this;
        };

        $.remove = function() {
            if (arguments.length > 0) {
                var j, nodes = this.nodes, list = [];
                for (var i = 0, imax = arguments.length; i < imax; ++i) {
                    if ((j = nodes.indexOf(arguments[i])) !== -1) {
                        list.push(nodes[j]);
                        nodes.splice(j, 1);
                    }
                }
                if (list.length > 0) {
                    this._.emit("remove", list);
                }
            }
            return this;
        };

        $.removeFrom = function(object) {
            object.remove(this);
            return this;
        };

        $.removeAll = function() {
            var list = this.nodes.slice();
            this.nodes = [];
            if (list.length > 0) {
                this._.emit("remove", list);
            }
            return this;
        };

        $.removeAtIndex = function(index) {
            var item = this.nodes[index];
            if (item) {
                this.nodes.splice(index, 1);
                this._.emit("remove", [item]);
            }
            return this;
        };

        $.postMessage = function(message) {
            this._.emit("message", message);
            return this;
        };

        $.to = function(object) {
            if (object instanceof TimbreObject) {
                object.append(this);
            } else {
                var args = slice.call(arguments);
                if (isDictionary(args[1])) {
                    args.splice(2, 0, this);
                } else {
                    args.splice(1, 0, this);
                }
                object = T.apply(null, args);
            }
            return object;
        };

        $.splice = function(ins, obj, rem) {
            var i;
            if (!obj) {
                if (this._.dac) {
                    if (ins instanceof TimbreObject) {
                        if (rem instanceof TimbreObject) {
                            if (rem._.dac) {
                                rem._.dac._.node = ins;
                                ins._.dac = rem._.dac;
                                rem._.dac = null;
                                ins.nodes.push(this);
                            }
                        } else {
                            if (this._.dac) {
                                this._.dac._.node = ins;
                                ins._.dac = this._.dac;
                                this._.dac = null;
                                ins.nodes.push(this);
                            }
                        }
                    } else if (rem instanceof TimbreObject) {
                        if (rem._.dac) {
                            rem._.dac._.node = this;
                            this._.dac = rem._.dac;
                            rem._.dac = null;
                        }
                    }
                }
            } else {
                if (obj instanceof TimbreObject) {
                    i = obj.nodes.indexOf(rem);
                    if (i !== -1) {
                        obj.nodes.splice(i, 1);
                    }
                    if (ins instanceof TimbreObject) {
                        ins.nodes.push(this);
                        obj.nodes.push(ins);
                    } else {
                        obj.nodes.push(this);
                    }
                }
            }
            return this;
        };

        // EventEmitter
        $.on = $.addListener = function(type, listener) {
            this._.events.on(type, listener);
            return this;
        };

        $.once = function(type, listener) {
            this._.events.once(type, listener);
            return this;
        };

        $.off = $.removeListener = function(type, listener) {
            this._.events.off(type, listener);
            return this;
        };

        $.removeAllListeners = function(type) {
            this._.events.removeAllListeners(type);
            return this;
        };

        $.listeners = function(type) {
            return this._.events.listeners(type);
        };

        $.set = function(key, value) {
            var x, desc, meta = this._.meta;
            switch (typeof key) {
            case "string":
                switch (meta[key]) {
                case "property":
                    this[key] = value;
                    break;
                case "function":
                    this[key](value);
                    break;
                default:
                    x = this;
                    while (x !== null) {
                        desc = Object.getOwnPropertyDescriptor(x, key);
                        if (desc) {
                            if (typeof desc.value === "function") {
                                meta[key] = "function";
                                this[key](value);
                            } else if (desc.get || desc.set) {
                                meta[key] = "property";
                                this[key] = value;
                            }
                        }
                        x = Object.getPrototypeOf(x);
                    }
                }
                break;
            case "object":
                for (x in key) {
                    this.set(x, key[x]);
                }
                break;
            }
            return this;
        };

        $.get = function(key) {
            if (this._.meta[key] === "property") {
                return this[key];
            }
        };

        $.bang = function() {
            this._.emit.apply(this, ["bang"].concat(slice.call(arguments)));
            return this;
        };

        $.process = fn.nop;

        $.bypass = function() {
            this._.bypassed = (arguments.length === 0) ? true : !!arguments[0];
            return this;
        };

        $.play = function() {
            var dac = this._.dac;
            if (dac === null) {
                dac = this._.dac = new SystemInlet(this);
            }
            if (dac.play()) {
                this._.emit.apply(this, ["play"].concat(slice.call(arguments)));
            }
            fn.buddies_start(this);
            return this;
        };

        $.pause = function() {
            var dac = this._.dac;
            if (dac && dac.playbackState === PLAYING_STATE) {
                dac.pause();
                this._.dac = null;
                this._.emit("pause");
            }
            fn.buddies_stop(this);
            return this;
        };

        $.start = $.stop = $.listen = $.unlisten = function() {
            return this;
        };

        $.ar = function() {
            if ((arguments.length === 0) ? true : !!arguments[0]) {
                if (!this._.kronly) {
                    this._.ar = true;
                    this._.emit("ar", true);
                }
            } else {
                this.kr(true);
            }
            return this;
        };

        $.kr = function() {
            if ((arguments.length === 0) ? true : !!arguments[0]) {
                if (!this._.aronly) {
                    this._.ar = false;
                    this._.emit("ar", false);
                }
            } else {
                this.ar(true);
            }
            return this;
        };

        if (_envtype === "browser") {
            $.plot = function(opts) {
                var _ = this._;
                var canvas = opts.target;

                if (!canvas) {
                    return this;
                }

                var width    = opts.width  || canvas.width  || 320;
                var height   = opts.height || canvas.height || 240;
                var offset_x = (opts.x || 0) + 0.5;
                var offset_y = (opts.y || 0);

                var context = canvas.getContext("2d");

                var foreground;
                if (opts.foreground !== undefined) {
                    foreground = opts.foreground;
                } else{
                    foreground = _.plotForeground || "rgb(  0, 128, 255)";
                }
                var background;
                if (opts.background !== undefined) {
                    background = opts.background;
                } else {
                    background = _.plotBackground || "rgb(255, 255, 255)";
                }
                var lineWidth  = opts.lineWidth  || _.plotLineWidth || 1;
                var cyclic     = !!_.plotCyclic;

                var data  = _.plotData || this.cells[0];
                var range = opts.range || _.plotRange || [-1.2, +1.2];
                var rangeMin   = range[0];
                var rangeDelta = height / (range[1] - rangeMin);

                var x, dx = (width / data.length);
                var y, dy, y0;
                var i, imax = data.length;

                context.save();

                context.rect(offset_x, offset_y, width, height);
                // context.clip();

                if (background !== null) {
                    context.fillStyle = background;
                    context.fillRect(offset_x, offset_y, width, height);
                }
                if (_.plotBefore) {
                    _.plotBefore.call(
                        this, context, offset_x, offset_y, width, height
                    );
                }

                if (_.plotBarStyle) {
                    context.fillStyle = foreground;
                    x = 0;
                    for (i = 0; i < imax; ++i) {
                        dy = (data[i] - rangeMin) * rangeDelta;
                        y  = height - dy;
                        context.fillRect(x + offset_x, y + offset_y, dx, dy);
                        x += dx;
                    }
                } else {
                    context.strokeStyle = foreground;
                    context.lineWidth   = lineWidth;

                    context.beginPath();

                    x  = 0;
                    y0 = height - (data[0] - rangeMin) * rangeDelta;
                    context.moveTo(x + offset_x, y0 + offset_y);
                    for (i = 1; i < imax; ++i) {
                        x += dx;
                        y = height - (data[i] - rangeMin) * rangeDelta;
                        context.lineTo(x + offset_x, y + offset_y);
                    }
                    if (cyclic) {
                        context.lineTo(x + dx + offset_x, y0 + offset_y);
                    } else {
                        context.lineTo(x + dx + offset_x, y  + offset_y);
                    }
                    context.stroke();
                }

                if (_.plotAfter) {
                    _.plotAfter.call(
                        this, context, offset_x, offset_y, width, height
                    );
                }
                var border = opts.border || _.plotBorder;
                if (border) {
                    context.strokeStyle =
                        (typeof border === "string") ? border : "#000";
                    context.lineWidth = 1;
                    context.strokeRect(offset_x, offset_y, width, height);
                }

                context.restore();

                return this;
            };
        } else {
            $.plot = fn.nop;
        }

        return TimbreObject;
    })();

    var ChannelObject = timbre.ChannelObject = (function() {
        function ChannelObject(parent) {
            timbre.Object.call(this, -1, []);
            fn.fixAR(this);

            this._.parent = parent;
            this.cell = new fn.SignalArray(_sys.cellsize);

            this.L = this.R = this;
            this.cells[0] = this.cells[1] = this.cells[2] = this.cell;

            this.numChannels = 1;
        }
        fn.extend(ChannelObject);

        ChannelObject.prototype.process = function(tickID) {
            if (this.tickID !== tickID) {
                this.tickID = tickID;
                if (this._.parent) {
                    this._.parent.process(tickID);
                }
            }
            return this;
        };

        return ChannelObject;
    })();

    var AddNode = (function() {
        function AddNode(_args) {
            TimbreObject.call(this, 2, _args);
        }
        fn.extend(AddNode);

        AddNode.prototype.process = function(tickID) {
            var _ = this._;
            if (this.tickID !== tickID) {
                this.tickID = tickID;
                if (_.ar) {
                    fn.inputSignalAR(this);
                    fn.outputSignalAR(this);
                } else {
                    this.cells[0][0] = fn.inputSignalKR(this);
                    fn.outputSignalKR(this);
                }
            }
            return this;
        };
        fn.register("+", AddNode);

        return AddNode;
    })();

    var NumberWrapper = (function() {
        function NumberWrapper(_args) {
            TimbreObject.call(this, 1, []);
            fn.fixKR(this);

            this.value = _args[0];

            if (isDictionary(_args[1])) {
                var params = _args[1];
                this.once("init", function() {
                    this.set(params);
                });
            }
            this.on("setAdd", fn.changeWithValue);
            this.on("setMul", fn.changeWithValue);
        }
        fn.extend(NumberWrapper);

        var $ = NumberWrapper.prototype;

        Object.defineProperties($, {
            value: {
                set: function(value) {
                    if (typeof value === "number") {
                        this._.value = isNaN(value) ? 0 : value;
                        fn.changeWithValue.call(this);
                    }
                },
                get: function() {
                    return this._.value;
                }
            }
        });

        return NumberWrapper;
    })();

    var BooleanWrapper = (function() {
        function BooleanWrapper(_args) {
            TimbreObject.call(this, 1, []);
            fn.fixKR(this);

            this.value = _args[0];

            if (isDictionary(_args[1])) {
                var params = _args[1];
                this.once("init", function() {
                    this.set(params);
                });
            }
            this.on("setAdd", fn.changeWithValue);
            this.on("setMul", fn.changeWithValue);
        }
        fn.extend(BooleanWrapper);

        var $ = BooleanWrapper.prototype;

        Object.defineProperties($, {
            value: {
                set: function(value) {
                    this._.value = value ? 1 : 0;
                    fn.changeWithValue.call(this);
                },
                get: function() {
                    return !!this._.value;
                }
            }
        });

        return BooleanWrapper;
    })();

    var FunctionWrapper = (function() {
        function FunctionWrapper(_args) {
            TimbreObject.call(this, 1, []);
            fn.fixKR(this);

            this.func    = _args[0];
            this._.value = 0;

            if (isDictionary(_args[1])) {
                var params = _args[1];
                this.once("init", function() {
                    this.set(params);
                });
            }
            this.on("setAdd", fn.changeWithValue);
            this.on("setMul", fn.changeWithValue);
        }
        fn.extend(FunctionWrapper);

        var $ = FunctionWrapper.prototype;

        Object.defineProperties($, {
            func: {
                set: function(value) {
                    if (typeof value === "function") {
                        this._.func = value;
                    }
                },
                get: function() {
                    return this._.func;
                }
            },
            args: {
                set: function(value) {
                    if (isArray(value)) {
                        this._.args = value;
                    } else {
                        this._.args = [value];
                    }
                },
                get: function() {
                    return this._.args;
                }
            }
        });

        $.bang = function() {
            var _ = this._;
            var args = slice.call(arguments).concat(_.args);
            var x = _.func.apply(this, args);
            if (typeof x === "number") {
                _.value = x;
                fn.changeWithValue.call(this);
            }
            this._.emit("bang");
            return this;
        };

        return FunctionWrapper;
    })();

    var ArrayWrapper = (function() {
        function ArrayWrapper(_args) {
            TimbreObject.call(this, 1, []);

            var i, imax;
            for (i = 0, imax = _args[0].length; i < imax; ++i) {
              this.append(_args[0][i]);
            }

            if (isDictionary(_args[1])) {
                var params = _args[1];
                this.once("init", function() {
                    this.set(params);
                });
            }
        }
        fn.extend(ArrayWrapper);

        var $ = ArrayWrapper.prototype;

        Object.defineProperties($, {

        });

        $.bang = function() {
            var args = ["bang"].concat(slice.call(arguments));
            var nodes = this.nodes;
            var i, imax;
            for (i = 0, imax = nodes.length; i < imax; ++i) {
                nodes[i].bang.apply(nodes[i], args);
            }
            return this;
        };

        $.postMessage = function(message) {
            var nodes = this.nodes;
            var i, imax;
            for (i = 0, imax = nodes.length; i < imax; ++i) {
                nodes[i].postMessage(message);
            }
            return this;
        };

        $.process = function(tickID) {
            var _ = this._;
            if (this.tickID !== tickID) {
                this.tickID = tickID;
                if (_.ar) {
                    fn.inputSignalAR(this);
                    fn.outputSignalAR(this);
                } else {
                    this.cells[0][0] = fn.inputSignalKR(this);
                    fn.outputSignalKR(this);
                }
            }
            return this;
        };

        return ArrayWrapper;
    })();

    var ObjectWrapper = (function() {
        function ObjectWrapper(_args) {
            TimbreObject.call(this, 1, []);
            fn.fixKR(this);

            if (isDictionary(_args[1])) {
                var params = _args[1];
                this.once("init", function() {
                    this.set(params);
                });
            }
        }
        fn.extend(ObjectWrapper);

        var $ = ObjectWrapper.prototype;

        Object.defineProperties($, {

        });

        return ObjectWrapper;
    })();

    var SystemInlet = (function() {
        function SystemInlet(object) {
            TimbreObject.call(this, 2, []);

            this.playbackState = FINISHED_STATE;
            var _ = this._;
            _.node = object;
            _.onplay  = make_onplay(this);
            _.onpause = make_onpause(this);
        }
        fn.extend(SystemInlet);

        var make_onplay = function(self) {
            return function() {
                if (_sys.inlets.indexOf(self) === -1) {
                    _sys.inlets.push(self);
                    _sys.events.emit("addObject");
                    self.playbackState = PLAYING_STATE;
                    self._.emit("play");
                }
            };
        };

        var make_onpause = function(self) {
            return function() {
                var i = _sys.inlets.indexOf(self);
                if (i !== -1) {
                    _sys.inlets.splice(i, 1);
                    self.playbackState = FINISHED_STATE;
                    self._.emit("pause");
                    _sys.events.emit("removeObject");
                }
            };
        };

        var $ = SystemInlet.prototype;

        $.play = function() {
            _sys.nextTick(this._.onplay);
            return (_sys.inlets.indexOf(this) === -1);
        };

        $.pause = function() {
            _sys.nextTick(this._.onpause);
        };

        $.process = function(tickID) {
            var node = this._.node;
            if (node.playbackState & 1) {
                node.process(tickID);
                this.cells[1].set(node.cells[1]);
                this.cells[2].set(node.cells[2]);
            } else {
                this.cells[1].set(fn.emptycell);
                this.cells[2].set(fn.emptycell);
            }
        };

        return SystemInlet;
    })();

    var SoundSystem = (function() {
        function SoundSystem() {
            this.context = this;
            this.tickID = 0;
            this.impl = null;
            this.amp  = 0.8;
            this.status = FINISHED_STATE;
            this.samplerate = 44100;
            this.channels   = 2;
            this.cellsize   = 64;
            this.streammsec = 20;
            this.streamsize = 0;
            this.currentTime = 0;
            this.nextTicks = [];
            this.inlets    = [];
            this.timers    = [];
            this.listeners = [];

            this.deferred = null;
            this.recStart   = 0;
            this.recBuffers = null;
            this.delayProcess = make_delayProcess(this);

            this.events = null;

            fn.currentTimeIncr = this.cellsize * 1000 / this.samplerate;
            fn.emptycell = new fn.SignalArray(this.cellsize);

            this.reset(true);
        }

        var make_delayProcess = function(self) {
            return function() {
                self.recStart = Date.now();
                self.process();
            };
        };

        var $ = SoundSystem.prototype;

        $.bind = function(Klass, opts) {
            if (typeof Klass === "function") {
                var player = new Klass(this, opts);
                this.impl = player;
                if (this.impl.defaultSamplerate) {
                    this.samplerate = this.impl.defaultSamplerate;
                }
            }
            return this;
        };

        $.setup = function(params) {
            if (typeof params === "object") {
                if (ACCEPT_SAMPLERATES.indexOf(params.samplerate) !== -1) {
                    if (params.samplerate <= this.impl.maxSamplerate) {
                        this.samplerate = params.samplerate;
                    } else {
                        this.samplerate = this.impl.maxSamplerate;
                    }
                }
                if (ACCEPT_CELLSIZES.indexOf(params.cellsize) !== -1) {
                    this.cellsize = params.cellsize;
                }
                if (typeof Float64Array !== "undefined" && typeof params.f64 !== "undefined") {
                    _f64mode = !!params.f64;
                    if (_f64mode) {
                        fn.SignalArray = Float64Array;
                    } else {
                        fn.SignalArray = Float32Array;
                    }
                }
            }
            fn.currentTimeIncr = this.cellsize * 1000 / this.samplerate;
            fn.emptycell = new fn.SignalArray(this.cellsize);
            return this;
        };

        $.getAdjustSamples = function(samplerate) {
            var samples, bits;
            samplerate = samplerate || this.samplerate;
            samples = this.streammsec / 1000 * samplerate;
            bits = Math.ceil(Math.log(samples) * Math.LOG2E);
            bits = (bits < 8) ? 8 : (bits > 14) ? 14 : bits;
            return 1 << bits;
        };

        $.play = function() {
            if (this.status === FINISHED_STATE) {
                this.status = PLAYING_STATE;

                this.streamsize = this.getAdjustSamples();
                this.strmL = new fn.SignalArray(this.streamsize);
                this.strmR = new fn.SignalArray(this.streamsize);

                this.impl.play();
                this.events.emit("play");
            }
            return this;
        };

        $.pause = function() {
            if (this.status === PLAYING_STATE) {
                this.status = FINISHED_STATE;
                this.impl.pause();
                this.events.emit("pause");
            }
            return this;
        };

        $.reset = function(deep) {
            if (deep) {
                this.events = new EventEmitter(this).on("addObject", function() {
                    if (this.status === FINISHED_STATE) {
                        this.play();
                    }
                }).on("removeObject", function() {
                    if (this.status === PLAYING_STATE) {
                        if (this.inlets.length + this.timers.length + this.listeners.length === 0) {
                            this.pause();
                        }
                    }
                });
            }
            this.currentTime = 0;
            this.nextTicks = [];
            this.inlets    = [];
            this.timers    = [];
            this.listeners = [];
            return this;
        };

        $.process = function() {
            var tickID = this.tickID;
            var strmL = this.strmL, strmR = this.strmR;
            var amp = this.amp;
            var x, tmpL, tmpR;
            var i, imax = this.streamsize, saved_i = 0;
            var j, jmax;
            var k, kmax = this.cellsize;
            var n = this.streamsize / this.cellsize;
            var nextTicks;
            var timers    = this.timers;
            var inlets    = this.inlets;
            var listeners = this.listeners;
            var currentTimeIncr = fn.currentTimeIncr;

            for (i = 0; i < imax; ++i) {
                strmL[i] = strmR[i] = 0;
            }

            while (n--) {
                ++tickID;

                for (j = 0, jmax = timers.length; j < jmax; ++j) {
                    if (timers[j].playbackState & 1) {
                        timers[j].process(tickID);
                    }
                }

                for (j = 0, jmax = inlets.length; j < jmax; ++j) {
                    x = inlets[j];
                    x.process(tickID);
                    if (x.playbackState & 1) {
                        tmpL = x.cells[1];
                        tmpR = x.cells[2];
                        for (k = 0, i = saved_i; k < kmax; ++k, ++i) {
                            strmL[i] += tmpL[k];
                            strmR[i] += tmpR[k];
                        }
                    }
                }
                saved_i += kmax;

                for (j = 0, jmax = listeners.length; j < jmax; ++j) {
                    if (listeners[j].playbackState & 1) {
                        listeners[j].process(tickID);
                    }
                }

                this.currentTime += currentTimeIncr;

                nextTicks = this.nextTicks.splice(0);
                for (j = 0, jmax = nextTicks.length; j < jmax; ++j) {
                    nextTicks[j]();
                }
            }

            for (i = 0; i < imax; ++i) {
                x = strmL[i] * amp;
                if (x < -1) {
                    x = -1;
                } else if (x > 1) {
                    x = 1;
                }
                strmL[i] = x;
                x = strmR[i] * amp;
                if (x < -1) {
                    x = -1;
                } else if (x > 1) {
                    x = 1;
                }
                strmR[i] = x;
            }

            this.tickID = tickID;

            var currentTime = this.currentTime;

            if (this.status === SCHEDULED_STATE) {
                if (this.recCh === 2) {
                    this.recBuffers.push(new fn.SignalArray(strmL));
                    this.recBuffers.push(new fn.SignalArray(strmR));
                } else {
                    var strm = new fn.SignalArray(strmL.length);
                    for (i = 0, imax = strm.length; i < imax; ++i) {
                        strm[i] = (strmL[i] + strmR[i]) * 0.5;
                    }
                    this.recBuffers.push(strm);
                }

                if (currentTime >= this.maxDuration) {
                    this.deferred.sub.reject();
                } else if (currentTime >= this.recDuration) {
                    this.deferred.sub.resolve();
                } else {
                    var now = Date.now();
                    if ((now - this.recStart) > 20) {
                        setTimeout(this.delayProcess, 10);
                    } else {
                        this.process();
                    }
                }
            }
        };

        $.nextTick = function(func) {
            if (this.status === FINISHED_STATE) {
                func();
            } else {
                this.nextTicks.push(func);
            }
        };

        $.rec = function() {
            fn.fix_iOS6_1_problem(true);

            var dfd = new Deferred(this);

            if (this.deferred) {
                console.warn("rec deferred is exists??");
                return dfd.reject().promise();
            }

            if (this.status !== FINISHED_STATE) {
                console.log("status is not none", this.status);
                return dfd.reject().promise();
            }

            var i = 0, args = arguments;
            var opts = isDictionary(args[i]) ? args[i++] : {};
            var func = args[i];

            if (typeof func !== "function") {
                // throw error??
                console.warn("no function");
                return dfd.reject().promise();
            }

            this.deferred = dfd;
            this.status = SCHEDULED_STATE;
            this.reset();

            var rec_inlet = new T("+");
            var inlet_dfd = new Deferred(this);

            var outlet = {
                done: function() {
                    inlet_dfd.resolve.apply(inlet_dfd, slice.call(arguments));
                },
                send: function() {
                    rec_inlet.append.apply(rec_inlet, arguments);
                }
            };

            var self = this;
            inlet_dfd.then(recdone, function() {
                fn.fix_iOS6_1_problem(false);
                recdone.call(self, true);
            });

            this.deferred.sub = inlet_dfd;

            this.savedSamplerate = this.samplerate;
            this.samplerate  = opts.samplerate  || this.samplerate;
            this.recDuration = opts.recDuration || Infinity;
            this.maxDuration = opts.maxDuration || 10 * 60 * 1000;
            this.recCh = opts.ch || 1;
            if (this.recCh !== 2) {
                this.recCh = 1;
            }
            this.recBuffers = [];

            this.streamsize = this.getAdjustSamples();
            this.strmL = new fn.SignalArray(this.streamsize);
            this.strmR = new fn.SignalArray(this.streamsize);

            this.inlets.push(rec_inlet);

            func(outlet);

            setTimeout(this.delayProcess, 10);

            return dfd.promise();
        };

        var recdone = function() {
            this.status = FINISHED_STATE;
            this.reset();

            var recBuffers = this.recBuffers;
            var samplerate = this.samplerate;
            var streamsize = this.streamsize;
            var bufferLength;

            this.samplerate = this.savedSamplerate;

            if (this.recDuration !== Infinity) {
                bufferLength = (this.recDuration * samplerate * 0.001)|0;
            } else {
                bufferLength = (recBuffers.length >> (this.recCh-1)) * streamsize;
            }

            var result;
            var i, imax = (bufferLength / streamsize)|0;
            var j = 0, k = 0;
            var remaining = bufferLength;

            if (this.recCh === 2) {
                var L = new fn.SignalArray(bufferLength);
                var R = new fn.SignalArray(bufferLength);
                var mixed = new fn.SignalArray(bufferLength);

                for (i = 0; i < imax; ++i) {
                    L.set(recBuffers[j++], k);
                    R.set(recBuffers[j++], k);
                    k += streamsize;
                    remaining -= streamsize;
                    if (remaining > 0 && remaining < streamsize) {
                        L.set(recBuffers[j++].subarray(0, remaining), k);
                        R.set(recBuffers[j++].subarray(0, remaining), k);
                        break;
                    }
                }
                for (i = 0, imax = bufferLength; i < imax; ++i) {
                    mixed[i] = (L[i] + R[i]) * 0.5;
                }

                result = {
                    samplerate: samplerate,
                    channels  : 2,
                    buffer: [mixed, L, R]
                };

            } else {
                var buffer = new fn.SignalArray(bufferLength);
                for (i = 0; i < imax; ++i) {
                    buffer.set(recBuffers[j++], k);
                    k += streamsize;
                    remaining -= streamsize;
                    if (remaining > 0 && remaining < streamsize) {
                        buffer.set(recBuffers[j++].subarray(0, remaining), k);
                        break;
                    }
                }
                result = {
                    samplerate: samplerate,
                    channels  : 1,
                    buffer: [buffer]
                };
            }

            var args = [].concat.apply([result], arguments);
            this.deferred.resolve.apply(this.deferred, args);
            this.deferred = null;
        };

        // EventEmitter
        $.on = function(type, listeners) {
            this.events.on(type, listeners);
        };
        $.once = function(type, listeners) {
            this.events.once(type, listeners);
        };
        $.off = function(type, listener) {
            this.events.off(type, listener);
        };
        $.removeAllListeners = function(type) {
            this.events.removeListeners(type);
        };
        $.listeners = function(type) {
            return this.events.listeners(type);
        };

        $.fix_iOS6_1_problem = function(flag) {
            if (this.impl.fix_iOS6_1_problem) {
                this.impl.fix_iOS6_1_problem(flag);
            }
        };

        return SoundSystem;
    })();

    // player
    var ImplClass = null;
    /*global webkitAudioContext:true */
    if (typeof webkitAudioContext !== "undefined") {
        ImplClass = function(sys) {
            var context = new webkitAudioContext();
            var bufSrc, jsNode;

            fn._audioContext = context;

            this.maxSamplerate     = context.sampleRate;
            this.defaultSamplerate = context.sampleRate;
            this.env = "webkit";

            var ua = navigator.userAgent;
            if (ua.match(/linux/i)) {
                sys.streammsec *= 8;
            } else if (ua.match(/win(dows)?\s*(nt 5\.1|xp)/i)) {
                sys.streammsec *= 4;
            }

            this.play = function() {
                var onaudioprocess;
                var jsn_streamsize = sys.getAdjustSamples(context.sampleRate);
                var sys_streamsize = sys.streamsize;
                var x, dx;

                if (sys.samplerate === context.sampleRate) {
                    onaudioprocess = function(e) {
                        var outs = e.outputBuffer;
                        sys.process();
                        outs.getChannelData(0).set(sys.strmL);
                        outs.getChannelData(1).set(sys.strmR);
                    };
                } else if (sys.samplerate * 2 === context.sampleRate) {
                    onaudioprocess = function(e) {
                        var inL = sys.strmL;
                        var inR = sys.strmR;
                        var outs = e.outputBuffer;
                        var outL = outs.getChannelData(0);
                        var outR = outs.getChannelData(1);
                        var i, imax = outs.length;
                        var j;

                        sys.process();
                        for (i = j = 0; i < imax; i += 2, ++j) {
                            outL[i] = outL[i+1] = inL[j];
                            outR[i] = outR[i+1] = inR[j];
                        }
                    };
                } else {
                    x  = sys_streamsize;
                    dx = sys.samplerate / context.sampleRate;
                    onaudioprocess = function(e) {
                        var inL = sys.strmL;
                        var inR = sys.strmR;
                        var outs = e.outputBuffer;
                        var outL = outs.getChannelData(0);
                        var outR = outs.getChannelData(1);
                        var i, imax = outs.length;

                        for (i = 0; i < imax; ++i) {
                            if (x >= sys_streamsize) {
                                sys.process();
                                x -= sys_streamsize;
                            }
                            outL[i] = inL[x|0];
                            outR[i] = inR[x|0];
                            x += dx;
                        }
                    };
                }

                bufSrc = context.createBufferSource();
                jsNode = context.createJavaScriptNode(jsn_streamsize, 2, sys.channels);
                jsNode.onaudioprocess = onaudioprocess;
                bufSrc.noteOn(0);
                bufSrc.connect(jsNode);
                jsNode.connect(context.destination);
            };

            this.pause = function() {
                bufSrc.disconnect();
                jsNode.disconnect();
            };

            if (_envmobile) {
                var n   = 0;
                var buf = context.createBufferSource();
                this.fix_iOS6_1_problem = function(flag) {
                    n += flag ? 1 : -1;
                    if (n === 1) {
                        buf.noteOn(0);
                        buf.connect(context.destination);
                    } else if (n === 0) {
                        buf.disconnect();
                    }
                };
            }
        };
    } else if (typeof Audio === "function" &&
               typeof (new Audio()).mozSetup === "function") {
        ImplClass = function(sys) {
            /*global URL:true */
            var timer = (function() {
                var source = "var t=0;onmessage=function(e){if(t)t=clearInterval(t),0;if(typeof e.data=='number'&&e.data>0)t=setInterval(function(){postMessage(0);},e.data);};";
                var blob = new Blob([source], {type:"text/javascript"});
                var path = URL.createObjectURL(blob);
                return new Worker(path);
            })();
            /*global URL:false */

            this.maxSamplerate     = 48000;
            this.defaultSamplerate = 44100;
            this.env = "moz";

            this.play = function() {
                var audio = new Audio();
                var interleaved = new Float32Array(sys.streamsize * sys.channels);
                var streammsec  = sys.streammsec;
                var written     = 0;
                var writtenIncr = sys.streamsize / sys.samplerate * 1000;
                var start = Date.now();

                var onaudioprocess = function() {
                    if (written > Date.now() - start) {
                        return;
                    }
                    var inL = sys.strmL;
                    var inR = sys.strmR;
                    var i = interleaved.length;
                    var j = inL.length;
                    sys.process();
                    while (j--) {
                        interleaved[--i] = inR[j];
                        interleaved[--i] = inL[j];
                    }
                    audio.mozWriteAudio(interleaved);
                    written += writtenIncr;
                };

                audio.mozSetup(sys.channels, sys.samplerate);
                timer.onmessage = onaudioprocess;
                timer.postMessage(streammsec);
            };

            this.pause = function() {
                timer.postMessage(0);
            };
        };
    } else {
        ImplClass = function(sys) {
            this.maxSamplerate     = 48000;
            this.defaultSamplerate = 44100;
            this.env = "nop";
            this.play  = function() {};
            this.pause = function() {};
        };
    }
    /*global webkitAudioContext:false */

    _sys = new SoundSystem().bind(ImplClass);

    var exports = timbre;

    if (_envtype === "node") {
        module.exports = global.timbre = exports;
    } else if (_envtype === "browser") {
        exports.noConflict = (function() {
           var _t = window.timbre, _T = window.T;
            return function(deep) {
                if (window.T === exports) {
                    window.T = _T;
                }
                if (deep && window.timbre === exports) {
                    window.timbre = _t;
                }
                return exports;
            };
        })();

        window.timbre = window.T = exports;
    }

    // Flash fallback
    (function() {
        if (_sys.impl.env !== "nop" || _envtype !== "browser" || _envmobile) {
            return;
        }
        var nav = navigator;

        /*jshint latedef:true */
        if (getFlashPlayerVersion(0) < 10) {
            return;
        }
        /*jshint latedef:false */

        var swf, PlayerDivID = "TimbreFlashPlayerDiv";
        var src = (function() {
            var scripts = document.getElementsByTagName("script");
            if (scripts && scripts.length) {
                for (var m, i = 0, imax = scripts.length; i < imax; ++i) {
                    if ((m = /^(.*\/)timbre(?:\.dev)?\.js$/i.exec(scripts[i].src))) {
                        return m[1] + "timbre.swf";
                    }
                }
            }
        })();

        window.timbrejs_flashfallback_init = function() {
            function TimbreFlashPlayer(sys) {
                var timerId = 0;

                this.maxSamplerate     = 44100;
                this.defaultSamplerate = 44100;
                this.env = "flash";

                this.play = function() {
                    var onaudioprocess;
                    var interleaved = new Array(sys.streamsize * sys.channels);
                    var streammsec  = sys.streammsec;
                    var written = 0;
                    var writtenIncr = sys.streamsize / sys.samplerate * 1000;
                    var start = Date.now();

                    onaudioprocess = function() {
                        if (written > Date.now() - start) {
                            return;
                        }
                        var inL = sys.strmL;
                        var inR = sys.strmR;
                        var i = interleaved.length;
                        var j = inL.length;
                        sys.process();
                        while (j--) {
                            interleaved[--i] = (inR[j] * 32768)|0;
                            interleaved[--i] = (inL[j] * 32768)|0;
                        }
                        swf.writeAudio(interleaved.join(" "));
                        written += writtenIncr;
                    };

                    if (swf.setup) {
                        swf.setup(sys.channels, sys.samplerate);
                        timerId = setInterval(onaudioprocess, streammsec);
                    } else {
                        console.warn("Cannot find " + src);
                    }
                };

                this.pause = function() {
                    if (timerId !== 0) {
                        swf.cancel();
                        clearInterval(timerId);
                        timerId = 0;
                    }
                };
            }
            _sys.bind(TimbreFlashPlayer);
            delete window.timbrejs_flashfallback_init;
        };

        var o, p;
        var swfSrc  = src;
        var swfName = swfSrc + "?" + (+new Date());
        var swfId   = "TimbreFlashPlayer";
        var div = document.createElement("div");
        div.id = PlayerDivID;
        div.style.display = "inline";
        div.width = div.height = 1;

        if (nav.plugins && nav.mimeTypes && nav.mimeTypes.length) {
            // ns
            o = document.createElement("object");
            o.id = swfId;
            o.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
            o.width = o.height = 1;
            o.setAttribute("data", swfName);
            o.setAttribute("type", "application/x-shockwave-flash");
            p = document.createElement("param");
            p.setAttribute("name", "allowScriptAccess");
            p.setAttribute("value", "always");
            o.appendChild(p);
            div.appendChild(o);
        } else {
            // ie
            /*jshint quotmark:single */
            div.innerHTML = '<object id="' + swfId + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1"><param name="movie" value="' + swfName + '" /><param name="bgcolor" value="#FFFFFF" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" /></object>';
            /*jshint quotmark:double */
        }
        window.addEventListener("load", function() {
            document.body.appendChild(div);
            swf = document[swfId];
        });

        function getFlashPlayerVersion(subs) {
            /*global ActiveXObject:true */
            try {
                if (nav.plugins && nav.mimeTypes && nav.mimeTypes.length) {
                    return nav.plugins["Shockwave Flash"].description.match(/([0-9]+)/)[subs];
                }
                return (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").match(/([0-9]+)/)[subs];
            } catch (e) {
                return -1;
            }
            /*global ActiveXObject:false */
        }
    })();

    function setupTypedArray() {
        var unsigned = 0, signed = 1, floating  = 2;

        function ArrayBuffer(_) {
            var a = new Array(_.byteLength);
            var bytes = _.BYTES_PER_ELEMENT, shift;
            for (var i = 0, imax = a.length; i < imax; ++i) {
                shift = (i % bytes) * 8;
                a[i] = (_[(i / bytes)|0] & (0x0FF << shift)) >>> shift;
            }
            a.__view = _;
            return a;
        }

        function TypedArray(klass, arg, offset, length) {
            var a, b, bytes, i, imax;
            if (Array.isArray(arg)) {
                if (arg.__view) {
                    if (typeof offset === "undefined") {
                        offset = 0;
                    }
                    if (typeof length === "undefined") {
                        length = arg.length - offset;
                    }
                    bytes = klass.bytes;
                    if (klass.type === floating) {
                        a = arg.__view.slice((offset/bytes)|0, ((offset+length)/bytes)|0);
                    } else {
                        b = arg.slice(offset, offset + length);
                        a = new Array((b.length / bytes)|0);
                        for (i = 0, imax = a.length; i < imax; ++i) {
                            a[i] = 0;
                        }
                        for (i = 0, imax = b.length; i < imax; ++i) {
                            a[(i/bytes)|0] += (b[i] & 0xFF) << ((i % bytes) * 8);
                        }
                    }
                } else {
                    a = arg.slice();
                }
            } else if (typeof arg === "number" && arg > 0) {
                a = new Array(arg|0);
            } else {
                a = [];
            }
            if (klass.type !== floating) {
                for (i = 0, imax = a.length; i < imax; ++i) {
                    a[i] = (+a[i] || 0) & ((1 << (2 * 8)) - 1);
                }
            } else {
                for (i = 0, imax = a.length; i < imax; ++i) {
                    a[i] = a[i] || 0;
                }
            }
            if (klass.type === signed) {
                for (i = 0, imax = a.length; i < imax; ++i) {
                    if (a[i] & (1 << ((bytes * 8) - 1))) {
                        a[i] -= 1 << (bytes * 8);
                    }
                }
            }

            a.__klass  = klass;
            a.constructor = window[klass.name];
            a.set      = set;
            a.subarray = subarray;
            a.BYTES_PER_ELEMENT = klass.bytes;
            a.byteLength = klass.bytes * a.length;
            a.byteOffset = offset || 0;
            Object.defineProperty(a, "buffer", {
                get: function() {
                    return new ArrayBuffer(this);
                }
            });
            return a;
        }
        var set = function(array, offset) {
            if (typeof offset === "undefined") {
                offset = 0;
            }
            var i, imax = Math.min(this.length - offset, array.length);
            for (i = 0; i < imax; ++i) {
                this[offset + i] = array[i];
            }
        };
        var subarray = function(begin, end) {
            if (typeof end === "undefined") {
                end = this.length;
            }
            return new this.constructor(this.slice(begin, end));
        };
        [["Int8Array" , 1, signed], ["Uint8Array" , 1, unsigned],
         ["Int16Array", 2, signed], ["Uint16Array", 2, unsigned],
         ["Int32Array", 4, signed], ["Uint32Array", 4, unsigned],
         ["Float32Array", 4, floating], ["Float64Array", 8, floating]
        ].forEach(function(_params) {
            var name = _params[0];
            var params = { bytes:_params[1], type:_params[2], name:name };
            window[name] = function(arg, offset, length) {
                return TypedArray.call(this, params, arg, offset, length);
            };
        });
    }
})();
(function(T) {
    "use strict";

    function Biquad(samplerate) {
        this.samplerate = samplerate;
        this.frequency = 340;
        this.Q         = 1;
        this.gain      = 0;

        this.x1L = this.x2L = this.y1L = this.y2L = 0;
        this.x1R = this.x2R = this.y1R = this.y2R = 0;
        this.b0 = this.b1 = this.b2 = this.a1 = this.a2 = 0;

        this.setType("lpf");
    }

    var $ = Biquad.prototype;

    $.process = function(cellL, cellR) {
        var xL, xR, yL, yR;
        var x1L = this.x1L, x2L = this.x2L, y1L = this.y1L, y2L = this.y2L;
        var x1R = this.x1R, x2R = this.x2R, y1R = this.y1R, y2R = this.y2R;
        var b0 = this.b0, b1 = this.b1, b2 = this.b2, a1 = this.a1, a2 = this.a2;
        var i, imax;

        for (i = 0, imax = cellL.length; i < imax; ++i) {
            xL = cellL[i];
            yL = b0 * xL + b1 * x1L + b2 * x2L - a1 * y1L - a2 * y2L;
            x2L = x1L; x1L = xL; y2L = y1L; y1L = yL;

            xR = cellR[i];
            yR = b0 * xR + b1 * x1R + b2 * x2R - a1 * y1R - a2 * y2R;
            x2R = x1R; x1R = xR; y2R = y1R; y1R = yR;

            cellL[i] = yL;
            cellR[i] = yR;
        }
        this.x1L = x1L; this.x2L = x2L; this.y1L = y1L; this.y2L = y2L;
        this.x1R = x1R; this.x2R = x2R; this.y1R = y1R; this.y2R = y2R;
    };

    $.setType = function(type) {
        var f;
        if ((f = setParams[type])) {
            this.type = type;
            f.call(this, this.frequency, this.Q, this.gain);
        }
    };

    $.setParams = function(frequency, Q, dbGain) {
        this.frequency = frequency;
        this.Q = Q;
        this.gain = dbGain;

        var f = setParams[this.type];
        if (f) {
            f.call(this, frequency, Q, dbGain);
        }

        return this;
    };


    var setParams = {
        lowpass: function(cutoff, resonance) {
            cutoff /= (this.samplerate * 0.5);

            if (cutoff >= 1) {
                this.b0 = 1;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else if (cutoff <= 0) {
                this.b0 = this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else {
                resonance = (resonance < 0) ? 0 : resonance;
                var g = Math.pow(10.0, 0.05 * resonance);
                var d = Math.sqrt((4 - Math.sqrt(16 - 16 / (g * g))) * 0.5);

                var theta = Math.PI * cutoff;
                var sn = 0.5 * d * Math.sin(theta);
                var beta = 0.5 * (1 - sn) / (1 + sn);
                var gamma = (0.5 + beta) * Math.cos(theta);
                var alpha = 0.25 * (0.5 + beta - gamma);

                this.b0 = 2 * alpha;
                this.b1 = 4 * alpha;
                this.b2 = this.b0; // 2 * alpha;
                this.a1 = 2 * -gamma;
                this.a2 = 2 * beta;
            }
        },
        highpass: function(cutoff, resonance) {
            cutoff /= (this.samplerate * 0.5);
            if (cutoff >= 1) {
                this.b0 = this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else if (cutoff <= 0) {
                this.b0 = 1;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else {
                resonance = (resonance < 0) ? 0 : resonance;

                var g = Math.pow(10.0, 0.05 * resonance);
                var d = Math.sqrt((4 - Math.sqrt(16 - 16 / (g * g))) / 2);

                var theta = Math.PI * cutoff;
                var sn = 0.5 * d * Math.sin(theta);
                var beta = 0.5 * (1 - sn) / (1 + sn);
                var gamma = (0.5 + beta) * Math.cos(theta);
                var alpha = 0.25 * (0.5 + beta + gamma);

                this.b0 = 2 * alpha;
                this.b1 = -4 * alpha;
                this.b2 = this.b0; // 2 * alpha;
                this.a1 = 2 * -gamma;
                this.a2 = 2 * beta;
            }
        },
        bandpass: function(frequency, Q) {
            frequency /= (this.samplerate * 0.5);
            if (frequency > 0 && frequency < 1) {
                if (Q > 0) {
                    var w0 = Math.PI * frequency;

                    var alpha = Math.sin(w0) / (2 * Q);
                    var k = Math.cos(w0);

                    var ia0 = 1 / (1 + alpha);

                    this.b0 = alpha * ia0;
                    this.b1 = 0;
                    this.b2 = -alpha * ia0;
                    this.a1 = -2 * k * ia0;
                    this.a2 = (1 - alpha) * ia0;
                } else {
                    this.b0 = this.b1 = this.b2 = this.a1 = this.a2 = 0;
                }
            } else {
                this.b0 = this.b1 = this.b2 = this.a1 = this.a2 = 0;
            }
        },
        lowshelf: function(frequency, _dummy_, dbGain) {
            frequency /= (this.samplerate * 0.5);

            var A = Math.pow(10.0, dbGain / 40);

            if (frequency >= 1) {
                this.b0 = A* A;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else if (frequency <= 0) {
                this.b0 = 1;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else {
                var w0 = Math.PI * frequency;
                var S = 1; // filter slope (1 is max value)
                var alpha = 0.5 * Math.sin(w0) * Math.sqrt((A + 1 / A) * (1 / S - 1) + 2);
                var k = Math.cos(w0);
                var k2 = 2 * Math.sqrt(A) * alpha;
                var aPlusOne = A + 1;
                var aMinusOne = A - 1;

                var ia0 = 1 / (aPlusOne + aMinusOne * k + k2);

                this.b0 = (A * (aPlusOne - aMinusOne * k + k2)) * ia0;
                this.b1 = (2 * A * (aMinusOne - aPlusOne * k)) * ia0;
                this.b2 = (A * (aPlusOne - aMinusOne * k - k2)) * ia0;
                this.a1 = (-2 * (aMinusOne + aPlusOne * k)) * ia0;
                this.a2 = (aPlusOne + aMinusOne * k - k2) * ia0;
            }
        },
        highshelf: function(frequency, _dummy_, dbGain) {
            frequency /= (this.samplerate * 0.5);

            var A = Math.pow(10.0, dbGain / 40);

            if (frequency >= 1) {
                this.b0 = 1;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else if (frequency <= 0) {
                this.b0 = A * A;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            } else {
                var w0 = Math.PI * frequency;
                var S = 1; // filter slope (1 is max value)
                var alpha = 0.5 * Math.sin(w0) * Math.sqrt((A + 1 / A) * (1 / S - 1) + 2);
                var k = Math.cos(w0);
                var k2 = 2 * Math.sqrt(A) * alpha;
                var aPlusOne = A + 1;
                var aMinusOne = A - 1;

                var ia0 = 1 / (aPlusOne - aMinusOne * k + k2);

                this.b0 = (A * (aPlusOne + aMinusOne * k + k2)) * ia0;
                this.b1 = (-2 * A * (aMinusOne + aPlusOne * k)) * ia0;
                this.b2 = (A * (aPlusOne + aMinusOne * k - k2)) * ia0;
                this.a1 = (2 * (aMinusOne - aPlusOne * k)) * ia0;
                this.a2 = (aPlusOne - aMinusOne * k - k2) * ia0;
            }
        },
        peaking: function(frequency, Q, dbGain) {
            frequency /= (this.samplerate * 0.5);

            if (frequency > 0 && frequency < 1) {
                var A = Math.pow(10.0, dbGain / 40);
                if (Q > 0) {
                    var w0 = Math.PI * frequency;
                    var alpha = Math.sin(w0) / (2 * Q);
                    var k = Math.cos(w0);
                    var ia0 = 1 / (1 + alpha / A);

                    this.b0 = (1 + alpha * A) * ia0;
                    this.b1 = (-2 * k) * ia0;
                    this.b2 = (1 - alpha * A) * ia0;
                    this.a1 = this.b1; // (-2 * k) * ia0;
                    this.a2 = (1 - alpha / A) * ia0;
                } else {
                    this.b0 = A * A;
                    this.b1 = this.b2 = this.a1 = this.a2 = 0;
                }
            } else {
                this.b0 = 1;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            }
        },
        notch: function(frequency, Q) {
            frequency /= (this.samplerate * 0.5);

            if (frequency > 0 && frequency < 1) {
                if (Q > 0) {
                    var w0 = Math.PI * frequency;
                    var alpha = Math.sin(w0) / (2 * Q);
                    var k = Math.cos(w0);
                    var ia0 = 1 / (1 + alpha);

                    this.b0 = ia0;
                    this.b1 = (-2 * k) * ia0;
                    this.b2 = ia0;
                    this.a1 = this.b1; // (-2 * k) * ia0;
                    this.a2 = (1 - alpha) * ia0;
                } else {
                    this.b0 = this.b1 = this.b2 = this.a1 = this.a2 = 0;
                }
            } else {
                this.b0 = 1;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            }
        },
        allpass: function(frequency, Q) {
            frequency /= (this.samplerate * 0.5);

            if (frequency > 0 && frequency < 1) {
                if (Q > 0) {
                    var w0 = Math.PI * frequency;
                    var alpha = Math.sin(w0) / (2 * Q);
                    var k = Math.cos(w0);
                    var ia0 = 1 / (1 + alpha);

                    this.b0 = (1 - alpha) * ia0;
                    this.b1 = (-2 * k) * ia0;
                    this.b2 = (1 + alpha) * ia0;
                    this.a1 = this.b1; // (-2 * k) * ia0;
                    this.a2 = this.b0; // (1 - alpha) * ia0;
                } else {
                    this.b0 = -1;
                    this.b1 = this.b2 = this.a1 = this.a2 = 0;
                }
            } else {
                this.b0 = 1;
                this.b1 = this.b2 = this.a1 = this.a2 = 0;
            }
        }
    };

    setParams.lpf = setParams.lowpass;
    setParams.hpf = setParams.highpass;
    setParams.bpf = setParams.bandpass;
    setParams.bef = setParams.notch;
    setParams.brf = setParams.notch;
    setParams.apf = setParams.allpass;

    T.modules.Biquad = Biquad;

})(timbre);
(function(T) {
    "use strict";

    function Chorus(samplerate) {
        this.samplerate = samplerate;

        var bits = Math.round(Math.log(samplerate * 0.1) * Math.LOG2E);
        this.buffersize = 1 << bits;
        this.bufferL = new T.fn.SignalArray(this.buffersize + 1);
        this.bufferR = new T.fn.SignalArray(this.buffersize + 1);

        this.wave       = null;
        this._wave      = null;
        this.writeIndex = this.buffersize >> 1;
        this.readIndex  = 0;
        this.delayTime  = 20;
        this.rate       = 4;
        this.depth      = 20;
        this.feedback   = 0.2;
        this.wet        = 0.5;
        this.phase      = 0;
        this.phaseIncr  = 0;
        this.phaseStep  = 4;

        this.setWaveType("sin");
        this.setDelayTime(this.delayTime);
        this.setRate(this.rate);
    }

    var $ = Chorus.prototype;

    var waves = [];
    waves[0] = (function() {
        var wave = new Float32Array(512);
        for (var i = 0; i < 512; ++i) {
            wave[i] = Math.sin(2 * Math.PI * (i/512));
        }
        return wave;
    })();
    waves[1] = (function() {
        var wave = new Float32Array(512);
        for (var x, i = 0; i < 512; ++i) {
            x = (i / 512) - 0.25;
            wave[i] = 1.0 - 4.0 * Math.abs(Math.round(x) - x);
        }
        return wave;
    })();

    $.setWaveType = function(waveType) {
        if (waveType === "sin") {
            this.wave = waveType;
            this._wave = waves[0];
        } else if (waveType === "tri") {
            this.wave = waveType;
            this._wave = waves[1];
        }
    };

    $.setDelayTime = function(delayTime) {
        this.delayTime = delayTime;
        var readIndex = this.writeIndex - ((delayTime * this.samplerate * 0.001)|0);
        while (readIndex < 0) {
            readIndex += this.buffersize;
        }
        this.readIndex = readIndex;
    };

    $.setRate = function(rate) {
        this.rate      = rate;
        this.phaseIncr = (512 * this.rate / this.samplerate) * this.phaseStep;
    };

    $.process = function(cellL, cellR) {
        var bufferL = this.bufferL;
        var bufferR = this.bufferR;
        var size = this.buffersize;
        var mask = size - 1;
        var wave       = this._wave;
        var phase      = this.phase;
        var phaseIncr  = this.phaseIncr;
        var writeIndex = this.writeIndex;
        var readIndex  = this.readIndex;
        var depth      = this.depth;
        var feedback   = this.feedback;
        var x, index, mod;
        var wet = this.wet, dry = 1 - wet;
        var i, imax = cellL.length;
        var j, jmax = this.phaseStep;

        for (i = 0; i < imax; ) {
            mod = wave[phase|0] * depth;
            phase += phaseIncr;
            while (phase > 512) {
                phase -= 512;
            }
            for (j = 0; j < jmax; ++j, ++i) {
                index = (readIndex + size + mod) & mask;

                x = (bufferL[index] + bufferL[index + 1]) * 0.5;
                bufferL[writeIndex] = cellL[i] - x * feedback;
                cellL[i] = (cellL[i] * dry) + (x * wet);

                x = (bufferR[index] + bufferR[index + 1]) * 0.5;
                bufferR[writeIndex] = cellR[i] - x * feedback;
                cellR[i] = (cellR[i] * dry) + (x * wet);

                writeIndex = (writeIndex + 1) & mask;
                readIndex  = (readIndex  + 1) & mask;
            }
        }

        this.phase = phase;
        this.writeIndex = writeIndex;
        this.readIndex  = readIndex;
    };

    T.modules.Chorus = Chorus;

})(timbre);
(function(T) {
    "use strict";

    var MaxPreDelayFrames     = 1024;
    var MaxPreDelayFramesMask = MaxPreDelayFrames - 1;
    var DefaultPreDelayFrames = 256;
    var kSpacingDb = 5;

    function Compressor(samplerate, channels) {
        this.samplerate = samplerate;
        this.channels = channels;

        this.lastPreDelayFrames = 0;
        this.preDelayReadIndex  = 0;
        this.preDelayWriteIndex = DefaultPreDelayFrames;
        this.ratio       = -1;
        this.slope       = -1;
        this.linearThreshold = -1;
        this.dbThreshold = -1;
        this.dbKnee      = -1;
        this.kneeThreshold    = -1;
        this.kneeThresholdDb  = -1;
        this.ykneeThresholdDb = -1;
        this.K = -1;

        this.attackTime  = 0.003;
        this.releaseTime = 0.25;

        this.preDelayTime = 0.006;
        this.dbPostGain   = 0;
        this.effectBlend  = 1;
        this.releaseZone1 = 0.09;
        this.releaseZone2 = 0.16;
        this.releaseZone3 = 0.42;
        this.releaseZone4 = 0.98;

        this.detectorAverage = 0;
        this.compressorGain  = 1;
        this.meteringGain    = 1;

        this.delayBufferL = new T.fn.SignalArray(MaxPreDelayFrames);
        if (channels === 2) {
            this.delayBufferR = new T.fn.SignalArray(MaxPreDelayFrames);
        } else {
            this.delayBufferR = this.delayBufferL;
        }
        this.preDelayTime = 6;
        this.preDelayReadIndex = 0;
        this.preDelayWriteIndex = DefaultPreDelayFrames;
        this.maxAttackCompressionDiffDb = -1;
        this.meteringReleaseK = 1 - Math.exp(-1 / (this.samplerate * 0.325));

        this.setAttackTime(this.attackTime);
        this.setReleaseTime(this.releaseTime);
        this.setPreDelayTime(this.preDelayTime);
        this.setParams(-24, 30, 12);
    }

    var $ = Compressor.prototype;

    $.clone = function() {
        var new_instance = new Compressor(this.samplerate, this.channels);
        new_instance.setAttackTime(this.attackTime);
        new_instance.setReleaseTime(this.releaseTime);
        new_instance.setPreDelayTime(this.preDelayTime);
        new_instance.setParams(this.dbThreshold, this.dbKnee, this.ratio);
        return new_instance;
    };

    $.setAttackTime = function(value) {
        this.attackTime = Math.max(0.001, value);
        this._attackFrames = this.attackTime * this.samplerate;
    };

    $.setReleaseTime = function(value) {
        this.releaseTime = Math.max(0.001, value);
        var releaseFrames = this.releaseTime * this.samplerate;

        var satReleaseTime = 0.0025;
        this._satReleaseFrames = satReleaseTime * this.samplerate;

        var y1 = releaseFrames * this.releaseZone1;
        var y2 = releaseFrames * this.releaseZone2;
        var y3 = releaseFrames * this.releaseZone3;
        var y4 = releaseFrames * this.releaseZone4;

        this._kA = 0.9999999999999998*y1 + 1.8432219684323923e-16*y2 - 1.9373394351676423e-16*y3 + 8.824516011816245e-18*y4;
        this._kB = -1.5788320352845888*y1 + 2.3305837032074286*y2 - 0.9141194204840429*y3 + 0.1623677525612032*y4;
        this._kC = 0.5334142869106424*y1 - 1.272736789213631*y2 + 0.9258856042207512*y3 - 0.18656310191776226*y4;
        this._kD = 0.08783463138207234*y1 - 0.1694162967925622*y2 + 0.08588057951595272*y3 - 0.00429891410546283*y4;
        this._kE = -0.042416883008123074*y1 + 0.1115693827987602*y2 - 0.09764676325265872*y3 + 0.028494263462021576*y4;
    };

    $.setPreDelayTime = function(preDelayTime) {
        this.preDelayTime = preDelayTime;
        var preDelayFrames = preDelayTime * this.samplerate;
        if (preDelayFrames > MaxPreDelayFrames - 1) {
            preDelayFrames = MaxPreDelayFrames - 1;
        }
        if (this.lastPreDelayFrames !== preDelayFrames) {
            this.lastPreDelayFrames = preDelayFrames;
            for (var i = 0, imax = this.delayBufferL.length; i < imax; ++i) {
                this.delayBufferL[i] = this.delayBufferR[i] = 0;
            }
            this.preDelayReadIndex = 0;
            this.preDelayWriteIndex = preDelayFrames;
        }
    };

    $.setParams = function(dbThreshold, dbKnee, ratio) {
        this._k = this.updateStaticCurveParameters(dbThreshold, dbKnee, ratio);

        var fullRangeGain = this.saturate(1, this._k);
        var fullRangeMakeupGain = 1 / fullRangeGain;

        fullRangeMakeupGain = Math.pow(fullRangeMakeupGain, 0.6);

        this._masterLinearGain = Math.pow(10, 0.05 * this.dbPostGain) * fullRangeMakeupGain;
    };

    $.kneeCurve = function(x, k) {
        if (x < this.linearThreshold) {
            return x;
        }
        return this.linearThreshold + (1 - Math.exp(-k * (x - this.linearThreshold))) / k;
    };

    $.saturate = function(x, k) {
        var y;
        if (x < this.kneeThreshold) {
            y = this.kneeCurve(x, k);
        } else {
            var xDb = (x) ? 20 * Math.log(x) * Math.LOG10E : -1000;
            var yDb = this.ykneeThresholdDb + this.slope * (xDb - this.kneeThresholdDb);
            y = Math.pow(10, 0.05 * yDb);
        }
        return y;
    };

    $.slopeAt = function(x, k) {
        if (x < this.linearThreshold) {
            return 1;
        }

        var x2   = x * 1.001;
        var xDb  = (x ) ? 20 * Math.log(x ) * Math.LOG10E : -1000;
        var x2Db = (x2) ? 20 * Math.log(x2) * Math.LOG10E : -1000;
        var y  = this.kneeCurve(x , k);
        var y2 = this.kneeCurve(x2, k);
        var yDb  = (y ) ? 20 * Math.log(y ) * Math.LOG10E : -1000;
        var y2Db = (y2) ? 20 * Math.log(y2) * Math.LOG10E : -1000;

        return (y2Db - yDb) / (x2Db - xDb);
    };

    $.kAtSlope = function(desiredSlope) {
        var xDb = this.dbThreshold + this.dbKnee;
        var x   = Math.pow(10, 0.05 * xDb);

        var minK = 0.1;
        var maxK = 10000;
        var k = 5;

        for (var i = 0; i < 15; ++i) {
            var slope = this.slopeAt(x, k);
            if (slope < desiredSlope) {
                maxK = k;
            } else {
                minK = k;
            }
            k = Math.sqrt(minK * maxK);
        }
        return k;
    };

    $.updateStaticCurveParameters = function(dbThreshold, dbKnee, ratio) {
        this.dbThreshold     = dbThreshold;
        this.linearThreshold = Math.pow(10, 0.05 * dbThreshold);
        this.dbKnee          = dbKnee;

        this.ratio = ratio;
        this.slope = 1 / this.ratio;

        this.kneeThresholdDb = dbThreshold + dbKnee;
        this.kneeThreshold   = Math.pow(10, 0.05 * this.kneeThresholdDb);

        var k = this.kAtSlope(1 / this.ratio);
        var y = this.kneeCurve(this.kneeThreshold, k);
        this.ykneeThresholdDb = (y) ? 20 * Math.log(y) * Math.LOG10E : -1000;

        this._k = k;

        return this._k;
    };

    $.process = function(cellL, cellR) {
        var dryMix = 1 - this.effectBlend;
        var wetMix = this.effectBlend;
        var k = this._k;
        var masterLinearGain = this._masterLinearGain;
        var satReleaseFrames = this._satReleaseFrames;
        var kA = this._kA;
        var kB = this._kB;
        var kC = this._kC;
        var kD = this._kD;
        var kE = this._kE;
        var nDivisionFrames = 64;
        var nDivisions = cellL.length / nDivisionFrames;
        var frameIndex = 0;
        var desiredGain = this.detectorAverage;
        var compressorGain = this.compressorGain;
        var maxAttackCompressionDiffDb = this.maxAttackCompressionDiffDb;
        var i_attackFrames = 1 / this._attackFrames;
        var preDelayReadIndex = this.preDelayReadIndex;
        var preDelayWriteIndex = this.preDelayWriteIndex;
        var detectorAverage = this.detectorAverage;
        var delayBufferL = this.delayBufferL;
        var delayBufferR = this.delayBufferR;
        var meteringGain = this.meteringGain;
        var meteringReleaseK = this.meteringReleaseK;

        for (var i = 0; i < nDivisions; ++i) {
            var scaledDesiredGain = Math.asin(desiredGain) / (0.5 * Math.PI);
            var envelopeRate;
            var isReleasing = scaledDesiredGain > compressorGain;
            var x = compressorGain / scaledDesiredGain;

            var compressionDiffDb = (x) ? 20 * Math.log(x) * Math.LOG10E : -1000;
            if (compressionDiffDb === Infinity || isNaN(compressionDiffDb)) {
                compressionDiffDb = -1;
            }

            if (isReleasing) {
                maxAttackCompressionDiffDb = -1;

                x = compressionDiffDb;
                if (x < -12) {
                    x = 0;
                } else if (x > 0) {
                    x = 3;
                } else {
                    x = 0.25 * (x + 12);
                }

                var x2 = x * x;
                var x3 = x2 * x;
                var x4 = x2 * x2;
                var _releaseFrames = kA + kB * x + kC * x2 + kD * x3 + kE * x4;

                var _dbPerFrame = kSpacingDb / _releaseFrames;

                envelopeRate = Math.pow(10, 0.05 * _dbPerFrame);
            } else {
                if (maxAttackCompressionDiffDb === -1 || maxAttackCompressionDiffDb < compressionDiffDb) {
                    maxAttackCompressionDiffDb = compressionDiffDb;
                }

                var effAttenDiffDb = Math.max(0.5, maxAttackCompressionDiffDb);

                x = 0.25 / effAttenDiffDb;
                envelopeRate = 1 - Math.pow(x, i_attackFrames);
            }

            var loopFrames = nDivisionFrames;
            while (loopFrames--) {
                var compressorInput = 0;

                var absUndelayedSource = (cellL[frameIndex] + cellR[frameIndex]) * 0.5;
                delayBufferL[preDelayWriteIndex] = cellL[frameIndex];
                delayBufferR[preDelayWriteIndex] = cellR[frameIndex];

                if (absUndelayedSource < 0) {
                    absUndelayedSource *= -1;
                }
                if (compressorInput < absUndelayedSource) {
                    compressorInput = absUndelayedSource;
                }

                var absInput = compressorInput;
                if (absInput < 0) {
                    absInput *= -1;
                }

                var shapedInput = this.saturate(absInput, k);
                var attenuation = absInput <= 0.0001 ? 1 : shapedInput / absInput;
                var attenuationDb = (attenuation) ? -20 * Math.log(attenuation) * Math.LOG10E : 1000;
                if (attenuationDb < 2) {
                    attenuationDb = 2;
                }

                var dbPerFrame = attenuationDb / satReleaseFrames;
                var satReleaseRate = Math.pow(10, 0.05 * dbPerFrame) - 1;
                var isRelease = (attenuation > detectorAverage);
                var rate = isRelease ? satReleaseRate : 1;

                detectorAverage += (attenuation - detectorAverage) * rate;
                if (detectorAverage > 1) {
                    detectorAverage = 1;
                }

                if (envelopeRate < 1) {
                    compressorGain += (scaledDesiredGain - compressorGain) * envelopeRate;
                } else {
                    compressorGain *= envelopeRate;
                    if (compressorGain > 1) {
                        compressorGain = 1;
                    }
                }

                var postWarpCompressorGain = Math.sin(0.5 * Math.PI * compressorGain);
                var totalGain = dryMix + wetMix * masterLinearGain * postWarpCompressorGain;

                var dbRealGain = 20 * Math.log(postWarpCompressorGain) * Math.LOG10E;
                if (dbRealGain < meteringGain)  {
                    meteringGain = dbRealGain;
                } else {
                    meteringGain += (dbRealGain - meteringGain) * meteringReleaseK;
                }
                cellL[frameIndex] = delayBufferL[preDelayReadIndex] * totalGain;
                cellR[frameIndex] = delayBufferR[preDelayReadIndex] * totalGain;

                frameIndex++;
                preDelayReadIndex  = (preDelayReadIndex  + 1) & MaxPreDelayFramesMask;
                preDelayWriteIndex = (preDelayWriteIndex + 1) & MaxPreDelayFramesMask;
            }

            if (detectorAverage < 1e-6) {
                detectorAverage = 1e-6;
            }
            if (compressorGain < 1e-6) {
                compressorGain = 1e-6;
            }
        }
        this.preDelayReadIndex  = preDelayReadIndex;
        this.preDelayWriteIndex = preDelayWriteIndex;
        this.detectorAverage    = detectorAverage;
        this.compressorGain = compressorGain;
        this.maxAttackCompressionDiffDb = maxAttackCompressionDiffDb;
        this.meteringGain = meteringGain;
    };

    $.reset = function() {
        this.detectorAverage = 0;
        this.compressorGain = 1;
        this.meteringGain = 1;

        for (var i = 0, imax = this.delayBufferL.length; i < imax; ++i) {
            this.delayBufferL[i] = this.delayBufferR[i] = 0;
        }

        this.preDelayReadIndex = 0;
        this.preDelayWriteIndex = DefaultPreDelayFrames;

        this.maxAttackCompressionDiffDb = -1;
    };

    T.modules.Compressor = Compressor;

})(timbre);
(function(T) {
    "use strict";

    function Decoder() {}

    Decoder.prototype.decode = function(src, onloadedmetadata, onloadeddata) {
        if (typeof src === "string") {
            if (/\.wav$/.test(src)) {
                return Decoder.wav_decode(src, onloadedmetadata, onloadeddata);
            } else if (Decoder.ogg_decode && /\.ogg$/.test(src)) {
                return Decoder.ogg_decode(src, onloadedmetadata, onloadeddata);
            } else if (Decoder.mp3_decode && /\.mp3$/.test(src)) {
                return Decoder.mp3_decode(src, onloadedmetadata, onloadeddata);
            }
        } else if (typeof src === "object") {
            if (src.type === "wav") {
                return Decoder.wav_decode(src.data, onloadedmetadata, onloadeddata);
            } else if (Decoder.ogg_decode && src.type === "ogg") {
                return Decoder.ogg_decode(src.data, onloadedmetadata, onloadeddata);
            } else if (Decoder.mp3_decode && src.type === "mp3") {
                return Decoder.mp3_decode(src.data, onloadedmetadata, onloadeddata);
            }
        }
        if (Decoder.webkit_decode) {
            if (typeof src === "object") {
                return Decoder.webkit_decode(src.data||src, onloadedmetadata, onloadeddata);
            } else {
                return Decoder.webkit_decode(src, onloadedmetadata, onloadeddata);
            }
        } else if (Decoder.moz_decode) {
            return Decoder.moz_decode(src, onloadedmetadata, onloadeddata);
        }
        onloadedmetadata(false);
    };
    T.modules.Decoder = Decoder;

    if (T.envtype === "browser") {
        Decoder.getBinaryWithPath = function(path, callback) {
            T.fn.fix_iOS6_1_problem(true);

            var xhr = new XMLHttpRequest();
            xhr.open("GET", path);
            xhr.responseType = "arraybuffer";
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.response) {
                        callback(new Uint8Array(xhr.response));
                    } else if (xhr.responseBody !== undefined) {
                        /*global VBArray:true */
                        callback(new Uint8Array(VBArray(xhr.responseBody).toArray()));
                        /*global VBArray:false */
                    }
                    T.fn.fix_iOS6_1_problem(false);
                }
            };
            xhr.send();
        };
    } else {
        Decoder.getBinaryWithPath = function(path, callback) {
            callback("no support");
        };
    }

    var _24bit_to_32bit = function(uint8) {
        var b0, b1, b2, bb, x;
        var int32 = new Int32Array(uint8.length / 3);
        for (var i = 0, imax = uint8.length, j = 0; i < imax; ) {
            b0 = uint8[i++] ,b1 = uint8[i++], b2 = uint8[i++];
            bb = b0 + (b1 << 8) + (b2 << 16);
            x = (bb & 0x800000) ? bb - 16777216 : bb;
            int32[j++] = x;
        }
        return int32;
    };

    Decoder.wav_decode = (function() {
        var _decode = function(data, onloadedmetadata, onloadeddata) {
            if (String.fromCharCode(data[0], data[1], data[2], data[3]) !== "RIFF") {
                return onloadedmetadata(false);
            }

            var l1 = data[4] + (data[5]<<8) + (data[6]<<16) + (data[7]<<24);
            if (l1 + 8 !== data.length) {
                return onloadedmetadata(false);
            }

            if (String.fromCharCode(data[8], data[9], data[10], data[11]) !== "WAVE") {
                return onloadedmetadata(false);
            }

            if (String.fromCharCode(data[12], data[13], data[14], data[15]) !== "fmt ") {
                return onloadedmetadata(false);
            }

            var channels   = data[22] + (data[23]<<8);
            var samplerate = data[24] + (data[25]<<8) + (data[26]<<16) + (data[27]<<24);
            var bitSize    = data[34] + (data[35]<<8);

            var i = 36;
            while (i < data.length) {
                if (String.fromCharCode(data[i], data[i+1], data[i+2], data[i+3]) === "data") {
                    break;
                }
                i += 1;
            }
            if (i >= data.length) {
                return onloadedmetadata(false);
            }
            i += 4;

            var l2 = data[i] + (data[i+1]<<8) + (data[i+2]<<16) + (data[i+3]<<24);
            var duration = ((l2 / channels) >> 1) / samplerate;
            i += 4;

            if (l2 > data.length - i) {
                return onloadedmetadata(false);
            }

            var mixdown, bufferL, bufferR;
            mixdown = new Float32Array((duration * samplerate)|0);
            if (channels === 2) {
                bufferL = new Float32Array(mixdown.length);
                bufferR = new Float32Array(mixdown.length);
            }

            onloadedmetadata({
                samplerate: samplerate,
                channels  : channels,
                buffer    : [mixdown, bufferL, bufferR],
                duration  : duration
            });

            if (bitSize === 8) {
                data = new Int8Array(data.buffer, i);
            } else if (bitSize === 16) {
                data = new Int16Array(data.buffer, i);
            } else if (bitSize === 32) {
                data = new Int32Array(data.buffer, i);
            } else if (bitSize === 24) {
                data = _24bit_to_32bit(new Uint8Array(data.buffer, i));
            }

            var imax, j, k = 1 / ((1 << (bitSize-1)) - 1), x;
            if (channels === 2) {
                for (i = j = 0, imax = mixdown.length; i < imax; ++i) {
                    x =  bufferL[i] = data[j++] * k;
                    x += bufferR[i] = data[j++] * k;
                    mixdown[i] = x * 0.5;
                }
            } else {
                for (i = 0, imax = mixdown.length; i < imax; ++i) {
                    mixdown[i] = data[i] * k;
                }
            }

            onloadeddata();
        };

        return function(src, onloadedmetadata, onloadeddata) {
            if (typeof src === "string") {
                Decoder.getBinaryWithPath(src, function(data) {
                    _decode(data, onloadedmetadata, onloadeddata);
                });
            } else {
                _decode(src, onloadedmetadata, onloadeddata);
            }
        };
    })();

    Decoder.webkit_decode = (function() {
        if (typeof webkitAudioContext !== "undefined") {
            var ctx = T.fn._audioContext;
            var _decode = function(data, onloadedmetadata, onloadeddata) {
                var samplerate, channels, bufferL, bufferR, duration;

                if (typeof data === "string") {
                    return onloadeddata(false);
                }

                var buffer;
                try {
                    buffer = ctx.createBuffer(data.buffer, false);
                } catch (e) {
                    return onloadedmetadata(false);
                }

                samplerate = ctx.sampleRate;
                channels   = buffer.numberOfChannels;
                if (channels === 2) {
                    bufferL = buffer.getChannelData(0);
                    bufferR = buffer.getChannelData(1);
                } else {
                    bufferL = bufferR = buffer.getChannelData(0);
                }
                duration = bufferL.length / samplerate;

                var mixdown = new Float32Array(bufferL);
                for (var i = 0, imax = mixdown.length; i < imax; ++i) {
                    mixdown[i] = (mixdown[i] + bufferR[i]) * 0.5;
                }

                onloadedmetadata({
                    samplerate: samplerate,
                    channels  : channels,
                    buffer    : [mixdown, bufferL, bufferR],
                    duration  : duration
                });

                onloadeddata();
            };

            return function(src, onloadedmetadata, onloadeddata) {
                /*global File:true */
                if (src instanceof File) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        _decode(new Uint8Array(e.target.result),
                                onloadedmetadata, onloadeddata);
                    };
                    reader.readAsArrayBuffer(src);
                } else if (typeof src === "string") {
                    Decoder.getBinaryWithPath(src, function(data) {
                        _decode(data, onloadedmetadata, onloadeddata);
                    });
                } else {
                    _decode(src, onloadedmetadata, onloadeddata);
                }
                /*global File:false */
            };
        }
    })();

    Decoder.moz_decode = (function() {
        if (typeof Audio === "function" && typeof new Audio().mozSetup === "function") {
            return function(src, onloadedmetadata, onloadeddata) {
                var samplerate, channels, mixdown, bufferL, bufferR, duration;
                var writeIndex = 0;

                var audio = new Audio(src);
                audio.volume = 0.0;
                audio.addEventListener("loadedmetadata", function() {
                    samplerate = audio.mozSampleRate;
                    channels   = audio.mozChannels;
                    duration   = audio.duration;
                    mixdown = new Float32Array((audio.duration * samplerate)|0);
                    if (channels === 2) {
                        bufferL = new Float32Array((audio.duration * samplerate)|0);
                        bufferR = new Float32Array((audio.duration * samplerate)|0);
                    }
                    if (channels === 2) {
                        audio.addEventListener("MozAudioAvailable", function(e) {
                            var x, samples = e.frameBuffer;
                            for (var i = 0, imax = samples.length; i < imax; i += 2) {
                                x =  bufferL[writeIndex] = samples[i  ];
                                x += bufferR[writeIndex] = samples[i+1];
                                mixdown[writeIndex] = x * 0.5;
                                writeIndex += 1;
                            }
                        }, false);
                    } else {
                        audio.addEventListener("MozAudioAvailable", function(e) {
                            var samples = e.frameBuffer;
                            for (var i = 0, imax = samples.length; i < imax; ++i) {
                                mixdown[i] = samples[i];
                                writeIndex += 1;
                            }
                        }, false);
                    }
                    audio.play();
                    setTimeout(function() {
                        onloadedmetadata({
                            samplerate: samplerate,
                            channels  : channels,
                            buffer    : [mixdown, bufferL, bufferR],
                            duration  : duration
                        });
                    }, 1000);
                }, false);
                audio.addEventListener("ended", function() {
                    onloadeddata();
                }, false);
                audio.load();
            };
        }
    })();
})(timbre);
(function(T) {
    "use strict";

    function Envelope(samplerate) {
        this.samplerate = samplerate || 44100;
        this.value  = ZERO;
        this.status = StatusWait;
        this.curve  = "linear";
        this.step   = 1;
        this.releaseNode = null;
        this.loopNode    = null;
        this.emit = null;

        this._envValue = new EnvelopeValue(samplerate);

        this._table  = [];
        this._initValue  = ZERO;
        this._curveValue = 0;
        this._defaultCurveType = CurveTypeLin;
        this._index   = 0;
        this._counter = 0;
    }

    var ZERO           = Envelope.ZERO = 1e-6;
    var CurveTypeSet   = Envelope.CurveTypeSet   = 0;
    var CurveTypeLin   = Envelope.CurveTypeLin   = 1;
    var CurveTypeExp   = Envelope.CurveTypeExp   = 2;
    var CurveTypeSin   = Envelope.CurveTypeSin   = 3;
    var CurveTypeWel   = Envelope.CurveTypeWel   = 4;
    var CurveTypeCurve = Envelope.CurveTypeCurve = 5;
    var CurveTypeSqr   = Envelope.CurveTypeSqr   = 6;
    var CurveTypeCub   = Envelope.CurveTypeCub   = 7;

    var StatusWait    = Envelope.StatusWait    = 0;
    var StatusGate    = Envelope.StatusGate    = 1;
    var StatusSustain = Envelope.StatusSustain = 2;
    var StatusRelease = Envelope.StatusRelease = 3;
    var StatusEnd     = Envelope.StatusEnd     = 4;

    var CurveTypeDict = {
        set:CurveTypeSet,
        lin:CurveTypeLin, linear     :CurveTypeLin,
        exp:CurveTypeExp, exponential:CurveTypeExp,
        sin:CurveTypeSin, sine       :CurveTypeSin,
        wel:CurveTypeWel, welch      :CurveTypeWel,
        sqr:CurveTypeSqr, squared    :CurveTypeSqr,
        cub:CurveTypeCub, cubed      :CurveTypeCub
    };
    Envelope.CurveTypeDict = CurveTypeDict;

    var $ = Envelope.prototype;

    $.clone = function() {
        var new_instance = new Envelope(this.samplerate);
        new_instance._table = this._table;
        new_instance._initValue = this._initValue;
        new_instance.setCurve(this.curve);
        if (this.releaseNode !== null) {
            new_instance.setReleaseNode(this.releaseNode + 1);
        }
        if (this.loopNode !== null) {
            new_instance.setLoopNode(this.loopNode + 1);
        }
        new_instance.setStep(this.step);
        new_instance.reset();
        return new_instance;
    };
    $.setTable = function(value) {
        this._initValue = value[0];
        this._table = value.slice(1);
        this.value = this._envValue.value = this._initValue;
        this._index   = 0;
        this._counter = 0;
        this.status = StatusWait;
    };
    $.setCurve = function(value) {
        if (typeof value === "number")  {
            this._defaultCurveType = CurveTypeCurve;
            this._curveValue = value;
            this.curve = value;
        } else {
            this._defaultCurveType = CurveTypeDict[value] || null;
            this.curve = value;
        }
    };
    $.setReleaseNode = function(value) {
        if (typeof value === "number" && value > 0) {
            this.releaseNode = value - 1;
        }
    };
    $.setLoopNode = function(value) {
        if (typeof value === "number" && value > 0) {
            this.loopNode = value - 1;
        }
    };
    $.setStep = function(step) {
        this.step = this._envValue.step = step;
    };
    $.reset = function() {
        this.value = this._envValue.value = this._initValue;
        this._index   = 0;
        this._counter = 0;
        this.status = StatusWait;
    };
    $.release = function() {
        if (this.releaseNode !== null) {
            this._counter = 0;
            this.status = StatusRelease;
        }
    };
    $.getInfo = function(sustainTime) {
        var table = this._table;
        var i, imax;
        var totalDuration    = 0;
        var loopBeginTime    = Infinity;
        var releaseBeginTime = Infinity;
        var isEndlessLoop    = false;
        for (i = 0, imax = table.length; i < imax; ++i) {
            if (this.loopNode === i) {
                loopBeginTime = totalDuration;
            }
            if (this.releaseNode === i) {
                if (totalDuration < sustainTime) {
                    totalDuration += sustainTime;
                } else {
                    totalDuration  = sustainTime;
                }
                releaseBeginTime = totalDuration;
            }

            var items = table[i];
            if (Array.isArray(items)) {
                totalDuration += items[1];
            }
        }
        if (loopBeginTime !== Infinity && releaseBeginTime === Infinity) {
            totalDuration += sustainTime;
            isEndlessLoop = true;
        }

        return {
            totalDuration   : totalDuration,
            loopBeginTime   : loopBeginTime,
            releaseBeginTime: releaseBeginTime,
            isEndlessLoop   : isEndlessLoop
        };
    };

    $.calcStatus = function() {
        var status  = this.status;
        var table   = this._table;
        var index   = this._index;
        var counter = this._counter;

        var curveValue = this._curveValue;
        var defaultCurveType = this._defaultCurveType;
        var loopNode    = this.loopNode;
        var releaseNode = this.releaseNode;
        var envValue = this._envValue;
        var items, endValue, time, curveType, emit = null;

        switch (status) {
        case StatusWait:
        case StatusEnd:
            break;
        case StatusGate:
        case StatusRelease:
            while (counter <= 0) {
                if (index >= table.length) {
                    if (status === StatusGate && loopNode !== null) {
                        index = loopNode;
                        continue;
                    }
                    status    = StatusEnd;
                    counter   = Infinity;
                    curveType = CurveTypeSet;
                    emit      = "ended";
                    continue;
                } else if (status === StatusGate && index === releaseNode) {
                    if (loopNode !== null && loopNode < releaseNode) {
                        index = loopNode;
                        continue;
                    }
                    status    = StatusSustain;
                    counter   = Infinity;
                    curveType = CurveTypeSet;
                    emit      = "sustained";
                    continue;
                }
                items = table[index++];

                endValue = items[0];
                if (items[2] === null) {
                    curveType = defaultCurveType;
                } else {
                    curveType = items[2];
                }
                if (curveType === CurveTypeCurve) {
                    curveValue = items[3];
                    if (Math.abs(curveValue) < 0.001) {
                        curveType = CurveTypeLin;
                    }
                }
                time = items[1];

                counter = envValue.setNext(endValue, time, curveType, curveValue);
            }
            break;
        }

        this.status = status;
        this.emit   = emit;
        this._index = index;
        this._counter = counter;

        return status;
    };

    $.next = function() {
        if (this.calcStatus() & 1) {
            this.value  = this._envValue.next() || ZERO;
        }
        this._counter -= 1;
        return this.value;
    };

    $.process = function(cell) {
        var envValue = this._envValue;
        var i, imax = cell.length;

        if (this.calcStatus() & 1) {
            for (i = 0; i < imax; ++i) {
                cell[i] = envValue.next() || ZERO;
            }
        } else {
            var value = this.value || ZERO;
            for (i = 0; i < imax; ++i) {
                cell[i] = value;
            }
        }
        this.value = cell[imax-1];

        this._counter -= cell.length;
    };


    function EnvelopeValue(samplerate) {
        this.samplerate = samplerate;
        this.value = ZERO;
        this.step  = 1;

        this._curveType  = CurveTypeLin;
        this._curveValue = 0;

        this._grow = 0;

        this._a2 = 0;
        this._b1 = 0;
        this._y1 = 0;
        this._y2 = 0;
    }
    EnvelopeValue.prototype.setNext = function(endValue, time, curveType, curveValue) {
        var n = this.step;
        var value = this.value;
        var grow, w, a1, a2, b1, y1, y2;

        var counter = ((time * 0.001 * this.samplerate) / n)|0;
        if (counter < 1) {
            counter   = 1;
            curveType = CurveTypeSet;
        }

        switch (curveType) {
        case CurveTypeSet:
            this.value = endValue;
            break;
        case CurveTypeLin:
            grow = (endValue - value) / counter;
            break;
        case CurveTypeExp:
            if (value !== 0) {
                grow = Math.pow(
                    endValue / value, 1 / counter
                );
            } else {
                grow = 0;
            }
            break;
        case CurveTypeSin:
            w = Math.PI / counter;
            a2 = (endValue + value) * 0.5;
            b1 = 2 * Math.cos(w);
            y1 = (endValue - value) * 0.5;
            y2 = y1 * Math.sin(Math.PI * 0.5 - w);
            value = a2 - y1;
            break;
        case CurveTypeWel:
            w = (Math.PI * 0.5) / counter;
            b1 = 2 * Math.cos(w);
            if (endValue >= value) {
                a2 = value;
                y1 = 0;
                y2 = -Math.sin(w) * (endValue - value);
            } else {
                a2 = endValue;
                y1 = value - endValue;
                y2 = Math.cos(w) * (value - endValue);
            }
            value = a2 + y1;
            break;
        case CurveTypeCurve:
            a1 = (endValue - value) / (1.0 - Math.exp(curveValue));
            a2 = value + a1;
            b1 = a1;
            grow = Math.exp(curveValue / counter);
            break;
        case CurveTypeSqr:
            y1 = Math.sqrt(value);
            y2 = Math.sqrt(endValue);
            grow = (y2 - y1) / counter;
            break;
        case CurveTypeCub:
            y1 = Math.pow(value   , 0.33333333);
            y2 = Math.pow(endValue, 0.33333333);
            grow = (y2 - y1) / counter;
            break;
        }

        this.next = NextFunctions[curveType];
        this._grow = grow;
        this._a2 = a2;
        this._b1 = b1;
        this._y1 = y1;
        this._y2 = y2;

        return counter;
    };

    var NextFunctions = [];
    NextFunctions[CurveTypeSet] = function() {
        return this.value;
    };
    NextFunctions[CurveTypeLin] = function() {
        this.value += this._grow;
        return this.value;
    };
    NextFunctions[CurveTypeExp] = function() {
        this.value *= this._grow;
        return this.value;
    };
    NextFunctions[CurveTypeSin] = function() {
        var y0 = this._b1 * this._y1 - this._y2;
        this.value = this._a2 - y0;
        this._y2 = this._y1;
        this._y1 = y0;
        return this.value;
    };
    NextFunctions[CurveTypeWel] = function() {
        var y0 = this._b1 * this._y1 - this._y2;
        this.value = this._a2 + y0;
        this._y2 = this._y1;
        this._y1 = y0;
        return this.value;
    };
    NextFunctions[CurveTypeCurve] = function() {
        this._b1 *= this._grow;
        this.value = this._a2 - this._b1;
        return this.value;
    };
    NextFunctions[CurveTypeSqr] = function() {
        this._y1 += this._grow;
        this.value = this._y1 * this._y1;
        return this.value;
    };
    NextFunctions[CurveTypeCub] = function() {
        this._y1 += this._grow;
        this.value = this._y1 * this._y1 * this._y1;
        return this.value;
    };

    EnvelopeValue.prototype.next = NextFunctions[CurveTypeSet];

    T.modules.Envelope      = Envelope;
    T.modules.EnvelopeValue = EnvelopeValue;

})(timbre);
(function(T) {
    "use strict";

    function FFT(n) {
        n = (typeof n === "number") ? n : 512;
        n = 1 << Math.ceil(Math.log(n) * Math.LOG2E);

        this.length  = n;
        this.buffer  = new T.fn.SignalArray(n);
        this.real    = new T.fn.SignalArray(n);
        this.imag    = new T.fn.SignalArray(n);
        this._real   = new T.fn.SignalArray(n);
        this._imag   = new T.fn.SignalArray(n);
        this.mag     = new T.fn.SignalArray(n>>1);

        this.minDecibels =  -30;
        this.maxDecibels = -100;

        var params = FFTParams.get(n);
        this._bitrev   = params.bitrev;
        this._sintable = params.sintable;
        this._costable = params.costable;
    }

    var $ = FFT.prototype;

    $.setWindow = function(key) {
        if (typeof key === "string") {
            var m = /([A-Za-z]+)(?:\(([01]\.?\d*)\))?/.exec(key);
            if (m !== null) {
                var name = m[1].toLowerCase(), a = m[2] !== undefined ? +m[2] : 0.25;
                var f = WindowFunctions[name];
                if (f) {
                    if (!this._window) {
                        this._window = new T.fn.SignalArray(this.length);
                    }
                    var w = this._window, n = 0, N = this.length;
                    a = (a < 0) ? 0 : (a > 1) ? 1 : a;
                    for (; n < N; ++n) {
                        w[n] = f(n, N, a);
                    }
                    this.windowName = key;
                }
            }
        }
    };

    $.forward = function(_buffer) {
        var buffer   = this.buffer;
        var real   = this.real;
        var imag   = this.imag;
        var window = this._window;
        var bitrev = this._bitrev;
        var sintable = this._sintable;
        var costable = this._costable;
        var n = buffer.length;
        var i, j, k, k2, h, d, c, s, ik, dx, dy;

        if (window) {
            for (i = 0; i < n; ++i) {
                buffer[i] = _buffer[i] * window[i];
            }
        } else {
            buffer.set(_buffer);
        }

        for (i = 0; i < n; ++i) {
            real[i] = buffer[bitrev[i]];
            imag[i] = 0.0;
        }

        for (k = 1; k < n; k = k2) {
            h = 0; k2 = k + k; d = n / k2;
            for (j = 0; j < k; j++) {
                c = costable[h];
                s = sintable[h];
                for (i = j; i < n; i += k2) {
                    ik = i + k;
                    dx = s * imag[ik] + c * real[ik];
                    dy = c * imag[ik] - s * real[ik];
                    real[ik] = real[i] - dx; real[i] += dx;
                    imag[ik] = imag[i] - dy; imag[i] += dy;
                }
                h += d;
            }
        }

        var mag = this.mag;
        var rval, ival;
        for (i = 0; i < n; ++i) {
            rval = real[i];
            ival = imag[i];
            mag[i] = Math.sqrt(rval * rval + ival * ival);
        }

        return {real:real, imag:imag};
    };

    $.inverse = function(_real, _imag) {
        var buffer = this.buffer;
        var real   = this._real;
        var imag   = this._imag;
        var bitrev = this._bitrev;
        var sintable = this._sintable;
        var costable = this._costable;
        var n = buffer.length;
        var i, j, k, k2, h, d, c, s, ik, dx, dy;

        for (i = 0; i < n; ++i) {
            j = bitrev[i];
            real[i] = +_real[j];
            imag[i] = -_imag[j];
        }

        for (k = 1; k < n; k = k2) {
            h = 0; k2 = k + k; d = n / k2;
            for (j = 0; j < k; j++) {
                c = costable[h];
                s = sintable[h];
                for (i = j; i < n; i += k2) {
                    ik = i + k;
                    dx = s * imag[ik] + c * real[ik];
                    dy = c * imag[ik] - s * real[ik];
                    real[ik] = real[i] - dx; real[i] += dx;
                    imag[ik] = imag[i] - dy; imag[i] += dy;
                }
                h += d;
            }
        }

        for (i = 0; i < n; ++i) {
            buffer[i] = real[i] / n;
        }
        return buffer;
    };

    $.getFrequencyData = function(array) {
        var minDecibels  = this.minDecibels;
        var i, imax = Math.min(this.mag.length, array.length);
        if (imax) {
            var x, mag = this.mag;
            var peak = 0;
            for (i = 0; i < imax; ++i) {
                x  = mag[i];
                array[i] = !x ? minDecibels : 20 * Math.log(x) * Math.LOG10E;
                if (peak < array[i]) {
                    peak = array[i];
                }
            }
        }
        return array;
    };

    var FFTParams = {
        get: function(n) {
            return FFTParams[n] || (function() {
                var bitrev = (function() {
                    var x, i, j, k, n2;
                    x = new Int16Array(n);
                    n2 = n >> 1;
                    i = j = 0;
                    for (;;) {
                        x[i] = j;
                        if (++i >= n) {
                            break;
                        }
                        k = n2;
                        while (k <= j) {
                            j -= k;
                            k >>= 1;
                        }
                        j += k;
                    }
                    return x;
                }());
                var i, imax, k = Math.floor(Math.log(n) / Math.LN2);
                var sintable = new T.fn.SignalArray((1<<k)-1);
                var costable = new T.fn.SignalArray((1<<k)-1);
                var PI2 = Math.PI * 2;

                for (i = 0, imax = sintable.length; i < imax; ++i) {
                    sintable[i] = Math.sin(PI2 * (i / n));
                    costable[i] = Math.cos(PI2 * (i / n));
                }
                FFTParams[n] = {
                    bitrev: bitrev, sintable:sintable, costable:costable
                };
                return FFTParams[n];
            }());
        }
    };

    var WindowFunctions = (function() {
        var PI   = Math.PI;
        var PI2  = Math.PI * 2;
        var abs  = Math.abs;
        var pow  = Math.pow;
        var cos  = Math.cos;
        var sin  = Math.sin;
        var sinc = function(x) { return sin(PI*x) / (PI*x); };
        var E    = Math.E;

        return {
            rectangular: function() {
                return 1;
            },
            hann: function(n, N) {
                return 0.5 * (1 - cos((PI2*n) / (N-1)));
            },
            hamming: function(n, N) {
                return 0.54 - 0.46 * cos((PI2*n) / (N-1));
            },
            tukery: function(n, N, a) {
                if ( n < (a * (N-1))/2 ) {
                    return 0.5 * ( 1 + cos(PI * (((2*n)/(a*(N-1))) - 1)) );
                } else if ( (N-1)*(1-(a/2)) < n ) {
                    return 0.5 * ( 1 + cos(PI * (((2*n)/(a*(N-1))) - (2/a) + 1)) );
                } else {
                    return 1;
                }
            },
            cosine: function(n, N) {
                return sin((PI*n) / (N-1));
            },
            lanczos: function(n, N) {
                return sinc(((2*n) / (N-1)) - 1);
            },
            triangular: function(n, N) {
                return (2/(N+1)) * (((N+1)/2) - abs(n - ((N-1)/2)));
            },
            bartlett: function(n, N) {
                return (2/(N-1)) * (((N-1)/2) - abs(n - ((N-1)/2)));
            },
            gaussian: function(n, N, a) {
                return pow(E, -0.5 * pow((n - (N-1) / 2) / (a * (N-1) / 2), 2));
            },
            bartlettHann: function(n, N) {
                return 0.62 - 0.48 * abs((n / (N-1)) - 0.5) - 0.38 * cos((PI2*n) / (N-1));
            },
            blackman: function(n, N, a) {
                var a0 = (1 - a) / 2, a1 = 0.5, a2 = a / 2;
                return a0 - a1 * cos((PI2*n) / (N-1)) + a2 * cos((4*PI*n) / (N-1));
            }
        };
    }());

    T.modules.FFT = FFT;

})(timbre);
(function(T) {
    "use strict";

    function Oscillator(samplerate) {
        this.samplerate = samplerate || 44100;

        this.wave = null;
        this.step = 1;
        this.frequency = 0;
        this.value = 0;
        this.phase = 0;
        this.feedback = false;

        this._x = 0;
        this._lastouts = 0;
        this._coeff = TABLE_SIZE / this.samplerate;
        this._radtoinc = TABLE_SIZE / (Math.PI * 2);
    }

    var TABLE_SIZE = 1024;
    var TABLE_MASK = TABLE_SIZE - 1;

    var $ = Oscillator.prototype;

    $.setWave = function(value) {
        var i, dx, wave = this.wave;
        if (!this.wave) {
            this.wave = new Float32Array(TABLE_SIZE + 1);
        }
        if (typeof value === "function") {
            for (i = 0; i < TABLE_SIZE; ++i) {
                wave[i] = value(i / TABLE_SIZE);
            }
        } else if (T.fn.isSignalArray(value)) {
            if (value.length === wave.length) {
                wave.set(value);
            } else {
                dx = value.length / TABLE_SIZE;
                for (i = 0; i < TABLE_SIZE; ++i) {
                    wave[i] = value[(i * dx)|0];
                }
            }
        } else if (typeof value === "string") {
            if ((dx = getWavetable(value)) !== undefined) {
                this.wave.set(dx);
            }
        }
        this.wave[TABLE_SIZE] = this.wave[0];
    };

    $.clone = function() {
        var new_instance = new Oscillator(this.samplerate);
        new_instance.wave      = this.wave;
        new_instance.step      = this.step;
        new_instance.frequency = this.frequency;
        new_instance.value     = this.value;
        new_instance.phase     = this.phase;
        new_instance.feedback  = this.feedback;
        return new_instance;
    };

    $.reset = function() {
        this._x = 0;
    };

    $.next = function() {
        var x = this._x;
        var index = (x + this.phase * this._radtoinc)|0;
        this.value = this.wave[index & TABLE_MASK];
        x += this.frequency * this._coeff * this.step;
        if (x > TABLE_SIZE) {
            x -= TABLE_SIZE;
        }
        this._x = x;
        return this.value;
    };

    $.process = function(cell) {
        var wave = this.wave;
        var radtoinc = this._radtoinc;
        var phase, x = this._x;
        var index, frac, x0, x1, dx = this.frequency * this._coeff;
        var i, imax = this.step;

        if (this.feedback) {
            var lastouts = this._lastouts;
            radtoinc *= this.phase;
            for (i = 0; i < imax; ++i) {
                phase = x + lastouts * radtoinc;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = lastouts = x0 + frac * (x1 - x0);
                x += dx;
            }
            this._lastouts = lastouts;
        } else {
            var phaseoffset = this.phase * radtoinc;
            for (i = 0; i < imax; ++i) {
                phase = x + phaseoffset;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = x0 + frac * (x1 - x0);
                x += dx;
            }
        }
        if (x > TABLE_SIZE) {
            x -= TABLE_SIZE;
        }
        this._x = x;
        this.value = cell[cell.length - 1];
    };

    $.processWithFreqArray = function(cell, freqs) {
        var wave = this.wave;
        var radtoinc = this._radtoinc;
        var phase, x = this._x;
        var index, frac, x0, x1, dx = this._coeff;
        var i, imax = this.step;

        if (this.feedback) {
            var lastouts = this._lastouts;
            radtoinc *= this.phase;
            for (i = 0; i < imax; ++i) {
                phase = x + lastouts * radtoinc;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = lastouts = x0 + frac * (x1 - x0);
                x += freqs[i] * dx;
            }
            this._lastouts = lastouts;
        } else {
            var phaseoffset = this.phase * this._radtoinc;
            for (i = 0; i < imax; ++i) {
                phase = x + phaseoffset;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = x0 + frac * (x1 - x0);
                x += freqs[i] * dx;
            }
        }
        if (x > TABLE_SIZE) {
            x -= TABLE_SIZE;
        }
        this._x = x;
        this.value = cell[cell.length - 1];
    };

    $.processWithPhaseArray = function(cell, phases) {
        var wave = this.wave;
        var radtoinc = this._radtoinc;
        var phase, x = this._x;
        var index, frac, x0, x1, dx = this.frequency * this._coeff;
        var i, imax = this.step;

        if (this.feedback) {
            var lastouts = this._lastouts;
            radtoinc *= this.phase;
            for (i = 0; i < imax; ++i) {
                phase = x + lastouts * radtoinc;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = lastouts = x0 + frac * (x1 - x0);
                x += dx;
            }
            this._lastouts = lastouts;
        } else {
            for (i = 0; i < imax; ++i) {
                phase = x + phases[i] * radtoinc;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = x0 + frac * (x1 - x0);
                x += dx;
            }
        }
        if (x > TABLE_SIZE) {
            x -= TABLE_SIZE;
        }
        this._x = x;
        this.value = cell[cell.length - 1];
    };

    $.processWithFreqAndPhaseArray = function(cell, freqs, phases) {
        var wave = this.wave;
        var radtoinc = this._radtoinc;
        var phase, x = this._x;
        var index, frac, x0, x1, dx = this._coeff;
        var i, imax = this.step;

        if (this.feedback) {
            var lastouts = this._lastouts;
            radtoinc *= this.phase;
            for (i = 0; i < imax; ++i) {
                phase = x + lastouts * radtoinc;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = lastouts = x0 + frac * (x1 - x0);
                x += freqs[i] * dx;
            }
            this._lastouts = lastouts;
        } else {
            for (i = 0; i < imax; ++i) {
                phase = x + phases[i] * TABLE_SIZE;
                index = phase|0;
                frac  = phase - index;
                index = index & TABLE_MASK;
                x0 = wave[index  ];
                x1 = wave[index+1];
                cell[i] = x0 + frac * (x1 - x0);
                x += freqs[i] * dx;
            }
        }
        if (x > TABLE_SIZE) {
            x -= TABLE_SIZE;
        }
        this._x = x;
        this.value = cell[cell.length - 1];
    };


    function waveshape(sign, name, shape, width) {
        var wave = Wavetables[name];
        var _wave;
        var i, imax, j, jmax;

        if (wave === undefined) {
            return;
        }

        if (typeof wave === "function") {
            wave = wave();
        }

        switch (shape) {
        case "@1":
            for (i = 512; i < 1024; ++i) {
                wave[i] = 0;
            }
            break;
        case "@2":
            for (i = 512; i < 1024; ++i) {
                wave[i] = Math.abs(wave[i]);
            }
            break;
        case "@3":
            for (i = 256; i <  512; ++i) {
                wave[i] = 0;
            }
            for (i = 512; i <  768; ++i) {
                wave[i] = Math.abs(wave[i]);
            }
            for (i = 768; i < 1024; ++i) {
                wave[i] = 0;
            }
            break;
        case "@4":
            _wave = new Float32Array(1024);
            for (i = 0; i < 512; ++i) {
                _wave[i] = wave[i<<1];
            }
            wave = _wave;
            break;
        case "@5":
            _wave = new Float32Array(1024);
            for (i = 0; i < 512; ++i) {
                _wave[i] = Math.abs(wave[i<<1]);
            }
            wave = _wave;
            break;
        }

        // duty-cycle
        if (width !== undefined && width !== 50) {
            width *= 0.01;
            width = (width < 0) ? 0 : (width > 1) ? 1 : width;

            _wave = new Float32Array(1024);
            imax = (1024 * width)|0;
            for (i = 0; i < imax; ++i) {
                _wave[i] = wave[(i / imax * 512)|0];
            }
            jmax = (1024 - imax);
            for (j = 0; i < 1024; ++i, ++j) {
                _wave[i] = wave[(j / jmax * 512 + 512)|0];
            }
            wave = _wave;
        }

        if (sign === "+") {
            for (i = 0; i < 1024; ++i) {
                wave[i] = wave[i] * 0.5 + 0.5;
            }
        } else if (sign === "-") {
            for (i = 0; i < 1024; ++i) {
                wave[i] *= -1;
            }
        }
        return wave;
    }

    function wavb(src) {
        var wave = new Float32Array(1024);
        var n = src.length >> 1;
        if ([2,4,8,16,32,64,128,256,512,1024].indexOf(n) !== -1) {

            for (var i = 0, k = 0; i < n; ++i) {
                var x = parseInt(src.substr(i * 2, 2), 16);

                x = (x & 0x80) ? (x-256) / 128.0 : x / 127.0;
                for (var j = 0, jmax = 1024 / n; j < jmax; ++j) {
                    wave[k++] = x;
                }
            }
        }
        return wave;
    }

    function wavc(src) {
        var wave = new Float32Array(1024);
        if (src.length === 8) {
            var color = parseInt(src, 16);
            var bar   = new Float32Array(8);
            var i, j;

            bar[0] = 1;
            for (i = 0; i < 7; ++i) {
                bar[i+1] = (color & 0x0f) * 0.0625; // 0.0625 = 1/16
                color >>= 4;
            }

            for (i = 0; i < 8; ++i) {
                var x = 0, dx = (i + 1) / 1024;
                for (j = 0; j < 1024; ++j) {
                    wave[j] += Math.sin(2 * Math.PI * x) * bar[i];
                    x += dx;
                }
            }

            var maxx = 0, absx;
            for (i = 0; i < 1024; ++i) {
                if (maxx < (absx = Math.abs(wave[i]))) {
                    maxx = absx;
                }
            }
            if (maxx > 0) {
                for (i = 0; i < 1024; ++i) {
                    wave[i] /= maxx;
                }
            }
        }
        return wave;
    }

    var getWavetable = function(key) {
        var wave = Wavetables[key];
        if (wave !== undefined) {
            if (typeof wave === "function") {
                wave = wave();
            }
            return wave;
        }

        var m;
        // wave shaping
        m = /^([\-+]?)(\w+)(?:\((@[0-7])?:?(\d+)?\))?$/.exec(key);
        if (m !== null) {
            var sign = m[1], name = m[2], shape = m[3], width = m[4];
            wave = waveshape(sign, name, shape, width);
            if (wave !== undefined) {
                Wavetables[key] = wave;
                return wave;
            }
        }

        // wave bytes
        m = /^wavb\(((?:[0-9a-fA-F][0-9a-fA-F])+)\)$/.exec(key);
        if (m !== null) {
            return wavb(m[1]);
        }

        // wave color
        m = /^wavc\(([0-9a-fA-F]{8})\)$/.exec(key);
        if (m !== null) {
            return wavc(m[1]);
        }

        // warn message
    };
    Oscillator.getWavetable = getWavetable;

    var setWavetable = function(name, value) {
        var dx, wave = new Float32Array(1024);
        var i;
        if (typeof value === "function") {
            for (i = 0; i < 1024; ++i) {
                wave[i] = value(i / 1024);
            }
        } else if (T.fn.isSignalArray(value)) {
            if (value.length === wave.length) {
                wave.set(value);
            } else {
                dx = value.length / 1024;
                for (i = 0; i < 1024; ++i) {
                    wave[i] = value[(i * dx)|0];
                }
            }
        }
        Wavetables[name] = wave;
    };
    Oscillator.setWavetable = setWavetable;

    var Wavetables = {
        sin: function() {
            var wave = new Float32Array(1024);
            for (var i = 0; i < 1024; ++i) {
                wave[i] = Math.sin(2 * Math.PI * (i/1024));
            }
            return wave;
        },
        cos: function() {
            var wave = new Float32Array(1024);
            for (var i = 0; i < 1024; ++i) {
                wave[i] = Math.cos(2 * Math.PI * (i/1024));
            }
            return wave;
        },
        pulse: function() {
            var wave = new Float32Array(1024);
            for (var i = 0; i < 1024; ++i) {
                wave[i] = (i < 512) ? +1 : -1;
            }
            return wave;
        },
        tri: function() {
            var wave = new Float32Array(1024);
            for (var x, i = 0; i < 1024; ++i) {
                x = (i / 1024) - 0.25;
                wave[i] = 1.0 - 4.0 * Math.abs(Math.round(x) - x);
            }
            return wave;
        },
        saw: function() {
            var wave = new Float32Array(1024);
            for (var x, i = 0; i < 1024; ++i) {
                x = (i / 1024);
                wave[i] = +2.0 * (x - Math.round(x));
            }
            return wave;
        },
        fami: function() {
            var d = [ +0.000, +0.125, +0.250, +0.375, +0.500, +0.625, +0.750, +0.875,
                      +0.875, +0.750, +0.625, +0.500, +0.375, +0.250, +0.125, +0.000,
                      -0.125, -0.250, -0.375, -0.500, -0.625, -0.750, -0.875, -1.000,
                      -1.000, -0.875, -0.750, -0.625, -0.500, -0.375, -0.250, -0.125 ];
            var wave = new Float32Array(1024);
            for (var i = 0; i < 1024; ++i) {
                wave[i] = d[(i / 1024 * d.length)|0];
            }
            return wave;
        },
        konami: function() {
            var d = [-0.625, -0.875, -0.125, +0.750, + 0.500, +0.125, +0.500, +0.750,
                     +0.250, -0.125, +0.500, +0.875, + 0.625, +0.000, +0.250, +0.375,
                     -0.125, -0.750, +0.000, +0.625, + 0.125, -0.500, -0.375, -0.125,
                     -0.750, -1.000, -0.625, +0.000, - 0.375, -0.875, -0.625, -0.250 ];
            var wave = new Float32Array(1024);
            for (var i = 0; i < 1024; ++i) {
                wave[i] = d[(i / 1024 * d.length)|0];
            }
            return wave;
        }
    };

    T.modules.Oscillator = Oscillator;

})(timbre);
/**
 * Port of the Freeverb Schrodoer/Moorer reverb model.
 * https://ccrma.stanford.edu/~jos/pasp/Freeverb.html
*/
(function(T) {
    "use strict";

    var CombParams    = [1116,1188,1277,1356,1422,1491,1557,1617];
    var AllpassParams = [225,556,441,341];

    function Reverb(samplerate, buffersize) {
        this.samplerate = samplerate;

        var i, imax;
        var k = samplerate / 44100;

        imax = CombParams.length * 2;
        this.comb = new Array(imax);
        this.combout = new Array(imax);
        for (i = 0; i < imax; ++i) {
            this.comb[i]    = new CombFilter(CombParams[i % CombParams.length] * k);
            this.combout[i] = new T.fn.SignalArray(buffersize);
        }

        imax = AllpassParams.length * 2;
        this.allpass = new Array(imax);
        for (i = 0; i < imax; ++i) {
            this.allpass[i] = new AllpassFilter(AllpassParams[i % AllpassParams.length] * k);
        }
        this.outputs = [ new T.fn.SignalArray(buffersize),
                         new T.fn.SignalArray(buffersize) ];
        this.damp = 0;
        this.wet  = 0.33;

        this.setRoomSize(0.5);
        this.setDamp(0.5);
    }

    var $ = Reverb.prototype;

    $.setRoomSize = function(roomsize) {
        var comb = this.comb;
        var value = (roomsize * 0.28) + 0.7;
        this.roomsize = roomsize;
        comb[0].feedback = comb[1].feedback = comb[2].feedback = comb[3].feedback = comb[4].feedback = comb[5].feedback = comb[6].feedback = comb[7].feedback = comb[8].feedback = comb[9].feedback = comb[10].feedback = comb[11].feedback = comb[12].feedback = comb[13].feedback = comb[14].feedback = comb[15].feedback = value;
    };
    $.setDamp = function(damp) {
        var comb = this.comb;
        var value = damp * 0.4;
        this.damp = damp;
        comb[0].damp = comb[1].damp = comb[2].damp = comb[3].damp = comb[4].damp = comb[5].damp = comb[6].damp = comb[7].damp = comb[8].damp = comb[9].damp = comb[10].damp = comb[11].damp = comb[12].damp = comb[13].damp = comb[14].damp = comb[15].damp = value;

    };
    $.process = function(cellL, cellR) {
        var comb = this.comb;
        var combout = this.combout;
        var allpass = this.allpass;
        var output0 = this.outputs[0];
        var output1 = this.outputs[1];
        var wet = this.wet, dry = 1 - wet;
        var i, imax = cellL.length;

        comb[0].process(cellL, combout[0]);
        comb[1].process(cellL, combout[1]);
        comb[2].process(cellL, combout[2]);
        comb[3].process(cellL, combout[3]);
        comb[4].process(cellL, combout[4]);
        comb[5].process(cellL, combout[5]);
        comb[6].process(cellL, combout[6]);
        comb[7].process(cellL, combout[7]);

        comb[ 8].process(cellR, combout[ 8]);
        comb[ 9].process(cellR, combout[ 9]);
        comb[10].process(cellR, combout[10]);
        comb[11].process(cellR, combout[11]);
        comb[12].process(cellR, combout[12]);
        comb[13].process(cellR, combout[13]);
        comb[14].process(cellR, combout[14]);
        comb[15].process(cellR, combout[15]);

        for (i = 0; i < imax; ++i) {
            output0[i] = combout[0][i] + combout[1][i] + combout[2][i] + combout[3][i] + combout[4][i] + combout[5][i] + combout[6][i] + combout[7][i];
            output1[i] = combout[8][i] + combout[9][i] + combout[10][i] + combout[11][i] + combout[12][i] + combout[13][i] + combout[14][i] + combout[15][i];
        }
        allpass[0].process(output0, output0);
        allpass[1].process(output0, output0);
        allpass[2].process(output0, output0);
        allpass[3].process(output0, output0);

        allpass[4].process(output1, output1);
        allpass[5].process(output1, output1);
        allpass[6].process(output1, output1);
        allpass[7].process(output1, output1);

        for (i = 0; i < imax; ++i) {
            cellL[i] = output0[i] * wet + cellL[i] * dry;
            cellR[i] = output1[i] * wet + cellR[i] * dry;
        }
    };

    function CombFilter(buffersize) {
        this.buffer = new T.fn.SignalArray(buffersize|0);
        this.buffersize = this.buffer.length;
        this.bufidx = 0;
        this.feedback =  0;
        this.filterstore = 0;
        this.damp = 0;
    }

    CombFilter.prototype.process = function(input, output) {
        var ins, outs;
        var buffer = this.buffer;
        var buffersize = this.buffersize;
        var bufidx = this.bufidx;
        var filterstore = this.filterstore;
        var feedback = this.feedback;
        var damp1 = this.damp, damp2 = 1 - damp1;
        var i, imax = input.length;

        for (i = 0; i < imax; ++i) {
            ins = input[i] * 0.015;
            outs = buffer[bufidx];

            filterstore = (outs * damp2) + (filterstore * damp1);

            buffer[bufidx] = ins + (filterstore * feedback);

            if (++bufidx >= buffersize) {
                bufidx = 0;
            }

            output[i] = outs;
        }

        this.bufidx = bufidx;
        this.filterstore = filterstore;
    };

    function AllpassFilter(buffersize) {
        this.buffer = new T.fn.SignalArray(buffersize|0);
        this.buffersize = this.buffer.length;
        this.bufidx = 0;
    }

    AllpassFilter.prototype.process = function(input, output) {
        var ins, outs, bufout;
        var buffer = this.buffer;
        var buffersize = this.buffersize;
        var bufidx = this.bufidx;
        var i, imax = input.length;

        for (i = 0; i < imax; ++i) {
            ins = input[i];

            bufout = buffer[bufidx];

            outs = -ins + bufout;
            buffer[bufidx] = ins + (bufout * 0.5);

            if (++bufidx >= buffersize) {
                bufidx = 0;
            }

            output[i] = outs;
        }

        this.bufidx = bufidx;
    };

    T.modules.Reverb = Reverb;

})(timbre);
(function(T) {
    "use strict";

    var DummyBuffer = new Float32Array(60);

    function Scissor(soundbuffer) {
        return new Tape(soundbuffer);
    }

    var silencebuffer = {
        buffer:DummyBuffer, samplerate:1
    };

    Scissor.silence = function(duration) {
        return new Scissor(silencebuffer).slice(0, 1).fill(duration);
    };

    Scissor.join = function(tapes) {
        var new_instance = new Tape();

        for (var i = 0; i < tapes.length; i++) {
            if (tapes[i] instanceof Tape) {
                new_instance.add_fragments(tapes[i].fragments);
            }
        }

        return new_instance;
    };

    function Tape(soundbuffer) {
        this.fragments = [];
        if (soundbuffer) {
            var samplerate = soundbuffer.samplerate || 44100;
            var duration   = soundbuffer.buffer[0].length / samplerate;
            this.fragments.push(
                new Fragment(soundbuffer, 0, duration)
            );
        }
    }
    Scissor.Tape = Tape;

    Tape.prototype.add_fragment = function(fragment) {
        this.fragments.push(fragment);
        return this;
    };

    Tape.prototype.add_fragments = function(fragments) {
        for (var i = 0; i < fragments.length; i++) {
            this.fragments.push(fragments[i]);
        }
        return this;
    };

    Tape.prototype.duration = function() {
        var result = 0;
        for (var i = 0; i < this.fragments.length; i++) {
            result += this.fragments[i].duration();
        }
        return result;
    };

    Tape.prototype.slice = function(start, length) {
        var duration = this.duration();
        if (start + length > duration) {
            length = duration - start;
        }

        var new_instance  = new Tape();
        var remainingstart  = start;
        var remaininglength = length;

        for (var i = 0; i < this.fragments.length; i++) {
            var fragment = this.fragments[i];
            var items = fragment.create(remainingstart, remaininglength);
            var new_fragment = items[0];
            remainingstart  = items[1];
            remaininglength = items[2];
            if (new_fragment) {
                new_instance.add_fragment(new_fragment);
            }
            if (remaininglength === 0) {
                break;
            }
        }

        return new_instance;
    };
    Tape.prototype.cut = Tape.prototype.slice;

    Tape.prototype.concat = function(other) {
        var new_instance = new Tape();
        new_instance.add_fragments(this.fragments);
        new_instance.add_fragments(other.fragments);
        return new_instance;
    };

    Tape.prototype.loop = function(count) {
        var i;
        var orig_fragments = [];
        for (i = 0; i < this.fragments.length; i++) {
            orig_fragments.push(this.fragments[i].clone());
        }
        var new_instance = new Tape();
        for (i = 0; i < count; i++ ) {
            new_instance.add_fragments(orig_fragments);
        }
        return new_instance;
    };

    Tape.prototype.times = Tape.prototype.loop;

    Tape.prototype.split = function(count) {
        var splitted_duration = this.duration() / count;
        var results = [];
        for (var i = 0; i < count; i++) {
            results.push(this.slice(i * splitted_duration, splitted_duration));
        }
        return results;
    };

    Tape.prototype.fill = function(filled_duration) {
        var duration = this.duration();
        if (duration === 0) {
            throw "EmptyFragment";
        }
        var loop_count = (filled_duration / duration)|0;
        var remain = filled_duration % duration;

        return this.loop(loop_count).plus(this.slice(0, remain));
    };

    Tape.prototype.replace = function(start, length, replaced) {
        var new_instance = new Tape();
        var offset = start + length;

        new_instance = new_instance.plus(this.slice(0, start));

        var new_instance_duration = new_instance.duration();
        if (new_instance_duration < start) {
            new_instance = new_instance.plus(Scissor.silence(start-new_instance_duration));
        }

        new_instance = new_instance.plus(replaced);

        var duration = this.duration();
        if (duration > offset) {
            new_instance = new_instance.plus(this.slice(offset, duration - offset));
        }

        return new_instance;
    };

    Tape.prototype.reverse = function() {
        var new_instance = new Tape();

        for (var i = this.fragments.length; i--; ) {
            var fragment = this.fragments[i].clone();
            fragment.reverse = !fragment.isReversed();
            new_instance.add_fragment(fragment);
        }

        return new_instance;
    };

    Tape.prototype.pitch = function(pitch, stretch) {
        var new_instance = new Tape();

        stretch = stretch || false;
        for (var i = 0; i < this.fragments.length; i++) {
            var fragment = this.fragments[i].clone();
            fragment.pitch  *= pitch * 0.01;
            fragment.stretch = stretch;
            new_instance.add_fragment(fragment);
        }

        return new_instance;
    };

    Tape.prototype.stretch = function(factor) {
        var factor_for_pitch = 1 / (factor * 0.01) * 100;
        return this.pitch(factor_for_pitch, true);
    };

    Tape.prototype.pan = function(right_percent) {
        var new_instance = new Tape();
        if (right_percent > 100) {
            right_percent = 100;
        } else if (right_percent < 0) {
            right_percent = 0;
        }
        for (var i = 0; i < this.fragments.length; i++) {
            var fragment = this.fragments[i].clone();
            fragment.pan = right_percent;
            new_instance.add_fragment(fragment);
        }

        return new_instance;
    };

    Tape.prototype.silence = function() {
        return Scissor.silence(this.duration());
    };

    Tape.prototype.join = function(tapes) {
        var new_instance = new Tape();

        for (var i = 0; i < tapes.length; i++) {
            if (tapes[i] instanceof Tape) {
                new_instance.add_fragments(tapes[i].fragments);
            }
        }

        return new_instance;
    };

    Tape.prototype.getBuffer = function() {
        var samplerate = 44100;
        if (this.fragments.length > 0) {
            samplerate = this.fragments[0].samplerate;
        }
        var stream = new TapeStream(this, samplerate);
        var total_samples = (this.duration() * samplerate)|0;
        return {
            samplerate: samplerate,
            buffer    : stream.fetch(total_samples)
        };
    };

    function Fragment(soundbuffer, start, duration, reverse, pitch, stretch, pan) {
        if (!soundbuffer) {
            soundbuffer = silencebuffer;
        }
        this.buffer     = soundbuffer.buffer[0];
        this.samplerate = soundbuffer.samplerate || 44100;
        this.start     = start;
        this._duration = duration;
        this.reverse = reverse || false;
        this.pitch   = pitch   || 100;
        this.stretch = stretch || false;
        this.pan     = pan     || 50;
    }

    Fragment.prototype.duration = function() {
        return this._duration * (100 / this.pitch);
    };
    Fragment.prototype.original_duration = function() {
        return this._duration;
    };
    Fragment.prototype.isReversed = function() {
        return this.reverse;
    };
    Fragment.prototype.isStretched = function() {
        return this.stretched;
    };
    Fragment.prototype.create = function(remaining_start, remaining_length) {
        var duration = this.duration();
        if (remaining_start >= duration) {
            return [null, remaining_start - duration, remaining_length];
        }

        var have_remain_to_retuen = (remaining_start + remaining_length) >= duration;

        var new_length;
        if (have_remain_to_retuen) {
            new_length = duration - remaining_start;
            remaining_length -= new_length;
        } else {
            new_length = remaining_length;
            remaining_length = 0;
        }

        var new_fragment = this.clone();
        new_fragment.start     = this.start + remaining_start * this.pitch * 0.01;
        new_fragment._duration = new_length * this.pitch * 0.01;
        new_fragment.reverse   = false;
        return [new_fragment, 0, remaining_length];
    };

    Fragment.prototype.clone = function() {
        var new_instance = new Fragment();
        new_instance.buffer     = this.buffer;
        new_instance.samplerate = this.samplerate;
        new_instance.start     = this.start;
        new_instance._duration = this._duration;
        new_instance.reverse   = this.reverse;
        new_instance.pitch     = this.pitch;
        new_instance.stretch   = this.stretch;
        new_instance.pan       = this.pan;
        return new_instance;
    };
    Scissor.Fragment = Fragment;


    function TapeStream(tape, samplerate) {
        this.tape = tape;
        this.fragments  = tape.fragments;
        this.samplerate = samplerate || 44100;

        this.isEnded = false;
        this.buffer  = null;
        this.bufferIndex = 0;
        this.bufferIndexIncr  = 0;
        this.bufferBeginIndex = 0;
        this.bufferEndIndex   = 0;
        this.fragment      = null;
        this.fragmentIndex = 0;
        this.panL = 0.5;
        this.panR = 0.5;
    }
    Scissor.TapeStream = TapeStream;

    TapeStream.prototype.reset = function() {
        this.isEnded = false;
        this.buffer  = null;
        this.bufferIndex = 0;
        this.bufferIndexIncr  = 0;
        this.bufferBeginIndex = 0;
        this.bufferEndIndex   = 0;
        this.fragment      = null;
        this.fragmentIndex = 0;
        this.panL = 0.5;
        this.panR = 0.5;
        this.isLooped = false;
        return this;
    };

    TapeStream.prototype.fetch = function(n) {
        var cellL = new T.fn.SignalArray(n);
        var cellR = new T.fn.SignalArray(n);
        var fragments     = this.fragments;

        if (fragments.length === 0) {
            return [cellL, cellR];
        }

        var samplerate  = this.samplerate * 100;
        var buffer      = this.buffer;
        var bufferIndex = this.bufferIndex;
        var bufferIndexIncr = this.bufferIndexIncr;
        var bufferBeginIndex = this.bufferBeginIndex;
        var bufferEndIndex   = this.bufferEndIndex;
        var fragment      = this.fragment;
        var fragmentIndex = this.fragmentIndex;
        var pan;
        var panL = this.panL;
        var panR = this.panR;

        for (var i = 0; i < n; i++) {
            while (!buffer ||
                   bufferIndex < bufferBeginIndex || bufferIndex >= bufferEndIndex) {
                if (!fragment || fragmentIndex < fragments.length) {
                    fragment = fragments[fragmentIndex++];
                    buffer   = fragment.buffer;
                    bufferIndexIncr = fragment.samplerate / samplerate * fragment.pitch;
                    bufferBeginIndex = fragment.start * fragment.samplerate;
                    bufferEndIndex   = bufferBeginIndex + fragment.original_duration() * fragment.samplerate;

                    pan = (fragment.pan * 0.01);
                    panL = 1 - pan;
                    panR = pan;

                    if (fragment.reverse) {
                        bufferIndexIncr *= -1;
                        bufferIndex = bufferEndIndex + bufferIndexIncr;
                    } else {
                        bufferIndex = bufferBeginIndex;
                    }
                } else {
                    if (this.isLooped) {
                        buffer  = null;
                        bufferIndex = 0;
                        bufferIndexIncr  = 0;
                        bufferBeginIndex = 0;
                        bufferEndIndex   = 0;
                        fragment      = null;
                        fragmentIndex = 0;
                    } else {
                        this.isEnded = true;
                        buffer   = DummyBuffer;
                        bufferIndexIncr = 0;
                        bufferIndex = 0;
                        break;
                    }
                }
            }
            cellL[i] = buffer[bufferIndex|0] * panL;
            cellR[i] = buffer[bufferIndex|0] * panR;
            bufferIndex += bufferIndexIncr;
        }
        this.buffer      = buffer;
        this.bufferIndex = bufferIndex;
        this.bufferIndexIncr  = bufferIndexIncr;
        this.bufferBeginIndex = bufferBeginIndex;
        this.bufferEndIndex   = bufferEndIndex;
        this.fragment      = fragment;
        this.fragmentIndex = fragmentIndex;
        this.panL = panL;
        this.panR = panR;

        return [cellL, cellR];
    };

    T.modules.Scissor = Scissor;

})(timbre);
(function(T) {
    "use strict";

    function StereoDelay(samplerate) {
        this.samplerate = samplerate;

        var bits = Math.ceil(Math.log(samplerate * 1.5) * Math.LOG2E);

        this.buffersize = 1 << bits;
        this.buffermask = this.buffersize - 1;
        this.writeBufferL = new T.fn.SignalArray(this.buffersize);
        this.writeBufferR = new T.fn.SignalArray(this.buffersize);
        this.readBufferL = this.writeBufferL;
        this.readBufferR = this.writeBufferR;
        this.delaytime = null;
        this.feedback  = null;
        this.cross = null;
        this.mix   = null;
        this.prevL = 0;
        this.prevR = 0;

        this.readIndex  = 0;
        this.writeIndex = 0;

        this.setParams(125, 0.25, false, 0.45);
    }

    var $ = StereoDelay.prototype;

    $.setParams = function(delaytime, feedback, cross ,mix) {
        if (this.delaytime !== delaytime) {
            this.delaytime = delaytime;
            var offset = (delaytime * 0.001 * this.samplerate)|0;
            if (offset > this.buffermask) {
                offset = this.buffermask;
            }
            this.writeIndex = (this.readIndex + offset) & this.buffermask;
        }
        if (this.feedback !== feedback) {
            this.feedback = feedback;
        }
        if (this.cross !== cross) {
            this.cross = cross;
            if (cross) {
                this.readBufferL = this.writeBufferR;
                this.readBufferR = this.writeBufferL;
            } else {
                this.readBufferL = this.writeBufferL;
                this.readBufferR = this.writeBufferR;
            }
        }
        if (this.mix !== mix) {
            this.mix = mix;
        }
    };

    $.process = function(cellL, cellR) {
        var readBufferL = this.readBufferL;
        var readBufferR = this.readBufferR;
        var writeBufferL = this.writeBufferL;
        var writeBufferR = this.writeBufferR;
        var readIndex  = this.readIndex;
        var writeIndex = this.writeIndex;
        var mask = this.buffermask;
        var fb = this.feedback;
        var wet = this.mix, dry = 1 - wet;
        var prevL = this.prevL;
        var prevR = this.prevR;

        var x;
        var i, imax = cellL.length;

        for (i = 0; i < imax; ++i) {
            x = readBufferL[readIndex];
            writeBufferL[writeIndex] = cellL[i] - x * fb;
            cellL[i] = prevL = ((cellL[i] * dry) + (x * wet) + prevL) * 0.5;

            x = readBufferR[readIndex];
            writeBufferR[writeIndex] = cellR[i] - x * fb;
            cellR[i] = prevR = ((cellR[i] * dry) + (x * wet) + prevR) * 0.5;

            readIndex  += 1;
            writeIndex = (writeIndex + 1) & mask;
        }

        this.readIndex  = readIndex  & this.buffermask;
        this.writeIndex = writeIndex;
        this.prevL = prevL;
        this.prevR = prevR;
    };

    T.modules.StereoDelay = StereoDelay;

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var modules = T.modules;

    fn.register("audio", function(_args) {
        var BufferNode = fn.getClass("buffer");
        var instance = new BufferNode(_args);

        instance.playbackState = fn.FINISHED_STATE;
        instance._.isLoaded = false;

        Object.defineProperties(instance, {
            isLoaded: {
                get: function() {
                    return this._.isLoaded;
                }
            }
        });

        instance.load     = load;
        instance.loadthis = loadthis;

        return instance;
    });

    var load = function(src) {
        var self = this, _ = this._;
        var dfd = new modules.Deferred(this);

        var args = arguments, i = 1;

        dfd.done(function() {
            self._.emit("done");
        });

        if (typeof args[i] === "function") {
            dfd.done(args[i++]);
            if (typeof args[i] === "function") {
                dfd.fail(args[i++]);
            }
        }

        _.loadedTime = 0;

        var onloadedmetadata = function(result, msg) {
            var _ = self._;
            if (result) {
                self.playbackState = fn.PLAYING_STATE;
                _.samplerate = result.samplerate;
                _.channels   = result.channels;
                _.bufferMix  = null;
                _.buffer     = result.buffer;
                _.phase      = 0;
                _.phaseIncr  = result.samplerate / T.samplerate;
                _.duration   = result.duration * 1000;
                _.currentTime = 0;
                if (_.isReversed) {
                    _.phaseIncr *= -1;
                    _.phase = result.buffer[0].length + _.phaseIncr;
                }
                self._.emit("loadedmetadata");
            } else {
                dfd.reject(msg);
            }
        };

        var onloadeddata = function() {
            self._.isLoaded  = true;
            self._.plotFlush = true;
            self._.emit("loadeddata");
            dfd.resolveWith(self);
        };

        new modules.Decoder().decode(src, onloadedmetadata, onloadeddata);

        return dfd.promise();
    };

    var loadthis = function() {
        load.apply(this, arguments);
        return this;
    };

})(timbre);
(function(T) {
    "use strict";

    var fn  = T.fn;
    var FFT = T.modules.FFT;
    var Biquad = T.modules.Biquad;
    var PLOT_LOW_FREQ = 20;

    function BiquadNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.biquad = new Biquad(_.samplerate);
        _.freq = T(340);
        _.band = T(1);
        _.gain = T(0);

        _.plotBefore = plotBefore;
        _.plotRange  = [-18, 18];
        _.plotFlush  = true;
    }
    fn.extend(BiquadNode);

    var plotBefore = function(context, x, y, width, height) {
        context.lineWidth = 1;
        context.strokeStyle = "rgb(192, 192, 192)";
        var nyquist = this._.samplerate * 0.5;
        for (var i = 1; i <= 10; ++i) {
            for (var j = 1; j <= 4; j++) {
                var f = i * Math.pow(10, j);
                if (f <= PLOT_LOW_FREQ || nyquist <= f) {
                    continue;
                }
                context.beginPath();
                var _x = (Math.log(f/PLOT_LOW_FREQ)) / (Math.log(nyquist/PLOT_LOW_FREQ));
                _x = ((_x * width + x)|0) + 0.5;
                context.moveTo(_x, y);
                context.lineTo(_x, y + height);
                context.stroke();
            }
        }

        var h = height / 6;
        for (i = 1; i < 6; i++) {
            context.beginPath();
            var _y = ((y + (i * h))|0) + 0.5;
            context.moveTo(x, _y);
            context.lineTo(x + width, _y);
            context.stroke();
        }
    };

    var $ = BiquadNode.prototype;

    Object.defineProperties($, {
        type: {
            set: function(value) {
                var _ = this._;
                if (value !== _.biquad.type) {
                    _.biquad.setType(value);
                    _.plotFlush = true;
                }
            },
            get: function() {
                return this._.biquad.type;
            }
        },
        freq: {
            set: function(value) {
                this._.freq = T(value);
            },
            get: function() {
                return this._.freq;
            }
        },
        cutoff: {
            set: function(value) {
                this._.freq = T(value);
            },
            get: function() {
                return this._.freq;
            }
        },
        res: {
            set: function(value) {
                this._.band = T(value);
            },
            get: function() {
                return this._.band;
            }
        },
        Q: {
            set: function(value) {
                this._.band = T(value);
            },
            get: function() {
                return this._.band;
            }
        },
        band: {
            set: function(value) {
                this._.band = T(value);
            },
            get: function() {
                return this._.band;
            }
        },
        gain: {
            set: function(value) {
                this._.gain = T(value);
            },
            get: function() {
                return this._.gain;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            var freq = _.freq.process(tickID).cells[0][0];
            var band = _.band.process(tickID).cells[0][0];
            var gain = _.gain.process(tickID).cells[0][0];
            if (_.prevFreq !== freq || _.prevband !== band || _.prevGain !== gain) {
                _.prevFreq = freq;
                _.prevband = band;
                _.prevGain = gain;
                _.biquad.setParams(freq, band, gain);
                _.plotFlush = true;
            }

            if (!_.bypassed) {
                _.biquad.process(this.cells[1], this.cells[2]);
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    var fft = new FFT(2048);
    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        if (this._.plotFlush) {
            var biquad = new Biquad(this._.samplerate);
            biquad.setType(this.type);
            biquad.setParams(this.freq.valueOf(), this.band.valueOf(), this.gain.valueOf());

            var impluse = new Float32Array(fft.length);
            impluse[0] = 1;

            biquad.process(impluse, impluse);
            fft.forward(impluse);

            var size = 512;
            var data = new Float32Array(size);
            var nyquist  = this._.samplerate * 0.5;
            var spectrum = new Float32Array(size);
            var i, j, f, index, delta, x0, x1, xx;

            fft.getFrequencyData(spectrum);
            for (i = 0; i < size; ++i) {
                f = Math.pow(nyquist / PLOT_LOW_FREQ, i / size) * PLOT_LOW_FREQ;
                j = f / (nyquist / spectrum.length);
                index = j|0;
                delta = j - index;
                if (index === 0) {
                    x1 = x0 = xx = spectrum[index];
                } else {
                    x0 = spectrum[index - 1];
                    x1 = spectrum[index];
                    xx = ((1.0 - delta) * x0 + delta * x1);
                }
                data[i] = xx;
            }
            this._.plotData  = data;
            this._.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };

    fn.register("biquad", BiquadNode);
    fn.register("lowpass", function(_args) {
        return new BiquadNode(_args).set("type", "lowpass");
    });
    fn.register("highpass", function(_args) {
        return new BiquadNode(_args).set("type", "highpass");
    });
    fn.register("bandpass", function(_args) {
        return new BiquadNode(_args).set("type", "bandpass");
    });
    fn.register("lowshelf", function(_args) {
        return new BiquadNode(_args).set("type", "lowshelf");
    });
    fn.register("highshelf", function(_args) {
        return new BiquadNode(_args).set("type", "highshelf");
    });
    fn.register("peaking", function(_args) {
        return new BiquadNode(_args).set("type", "peaking");
    });
    fn.register("notch", function(_args) {
        return new BiquadNode(_args).set("type", "notch");
    });
    fn.register("allpass", function(_args) {
        return new BiquadNode(_args).set("type", "allpass");
    });

    fn.alias("lpf", "lowpass");
    fn.alias("hpf", "highpass");
    fn.alias("bpf", "bandpass");
    fn.alias("bef", "notch");
    fn.alias("brf", "notch");
    fn.alias("apf", "allpass");

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var Tape = T.modules.Scissor.Tape;
    var isSignalArray = function(obj) {
        return fn.isSignalArray(obj) || obj instanceof Float32Array;
    };

    function BufferNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.pitch      = T(1);
        _.samplerate = 44100;
        _.channels   = 0;
        _.bufferMix  = null;
        _.buffer     = [];
        _.isLooped   = false;
        _.isReversed = false;
        _.duration    = 0;
        _.currentTime = 0;
        _.currentTimeObj = null;
        _.phase = 0;
        _.phaseIncr = 0;
        _.onended  = fn.make_onended(this, 0);
        _.onlooped = make_onlooped(this);
    }
    fn.extend(BufferNode);

    var make_onlooped = function(self) {
        return function() {
            var _ = self._;
            if (_.phase >= _.buffer[0].length) {
                _.phase = 0;
            } else if (_.phase < 0) {
                _.phase = _.buffer[0].length + _.phaseIncr;
            }
            self._.emit("looped");
        };
    };

    var $ = BufferNode.prototype;

    var setBuffer = function(value) {
        var _ = this._;
        if (typeof value === "object") {
            var buffer = [], samplerate, channels;

            if (isSignalArray(value)) {
                buffer[0] = value;
                channels = 1;
            } else if (typeof value === "object") {
                if (value instanceof T.Object) {
                    value = value.buffer;
                } else if (value instanceof Tape) {
                    value = value.getBuffer();
                }
                if (Array.isArray(value.buffer)) {
                    if (isSignalArray(value.buffer[0])) {
                        if (isSignalArray(value.buffer[1]) &&
                            isSignalArray(value.buffer[2])) {
                            channels = 2;
                            buffer = value.buffer;
                        } else {
                            channels = 1;
                            buffer = [value.buffer[0]];
                        }
                    }
                } else if (isSignalArray(value.buffer)) {
                    channels = 1;
                    buffer = [value.buffer];
                }
                if (typeof value.samplerate === "number") {
                    samplerate = value.samplerate;
                }
            }
            if (buffer.length) {
                if (samplerate > 0) {
                    _.samplerate = value.samplerate;
                }
                _.bufferMix = null;
                _.buffer  = buffer;
                _.phase     = 0;
                _.phaseIncr = _.samplerate / T.samplerate;
                _.duration  = _.buffer[0].length * 1000 / _.samplerate;
                _.currentTime = 0;
                _.plotFlush = true;
                this.reverse(_.isReversed);
            }
        }
    };

    Object.defineProperties($, {
        buffer: {
            set: setBuffer,
            get: function() {
                var _ = this._;
                return {
                    samplerate: _.samplerate,
                    channels  : _.channels,
                    buffer    : _.buffer
                };
            }
        },
        pitch: {
            set: function(value) {
                this._.pitch = T(value);
            },
            get: function() {
                return this._.pitch;
            }
        },
        isLooped: {
            get: function() {
                return this._.isLooped;
            }
        },
        isReversed: {
            get: function() {
                return this._.isReversed;
            }
        },
        samplerate: {
            get: function() {
                return this._.samplerate;
            }
        },
        duration: {
            get: function() {
                return this._.duration;
            }
        },
        currentTime: {
            set: function(value) {
                if (typeof value === "number") {
                    var _ = this._;
                    if (0 <= value && value <= _.duration) {
                        _.phase = (value / 1000) * _.samplerate;
                        _.currentTime = value;
                    }
                } else if (value instanceof T.Object) {
                    this._.currentTimeObj = value;
                } else if (value === null) {
                    this._.currentTimeObj = null;
                }
            },
            get: function() {
                if (this._.currentTimeObj) {
                    return this._.currentTimeObj;
                } else {
                    return this._.currentTime;
                }
            }
        }
    });

    $.clone = function() {
        var _ = this._;
        var instance = fn.clone(this);

        if (_.buffer.length) {
            setBuffer.call(instance, {
                buffer    : _.buffer,
                samplerate: _.samplerate,
                channels  : _.channels
            });
        }
        instance.loop(_.isLooped);
        instance.reverse(_.isReversed);

        return instance;
    };

    $.slice = function(begin, end) {
        var _ = this._;
        var instance = T(_.originkey);
        var isReversed = _.isReversed;

        if (_.buffer.length) {
            if (typeof begin === "number" ){
                begin = (begin * 0.001 * _.samplerate)|0;
            } else {
                begin = 0;
            }
            if (typeof end === "number") {
                end   = (end   * 0.001 * _.samplerate)|0;
            } else {
                end = _.buffer[0].length;
            }
            if (begin > end) {
                var tmp = begin;
                begin = end;
                end   = tmp;
                isReversed = !isReversed;
            }

            if (_.channels === 2) {
                setBuffer.call(instance, {
                    buffer   : [ fn.pointer(_.buffer[0], begin, end-begin),
                                 fn.pointer(_.buffer[1], begin, end-begin),
                                 fn.pointer(_.buffer[2], begin, end-begin) ],
                    samplerate: _.samplerate
                });
            } else {
                setBuffer.call(instance, {
                    buffer: fn.pointer(_.buffer[0], begin, end-begin),
                    samplerate: _.samplerate
                });
            }
            instance.playbackState = fn.PLAYING_STATE;
        }
        instance.loop(_.isLooped);
        instance.reverse(_.isReversed);

        return instance;
    };

    $.reverse = function(value) {
        var _ = this._;

        _.isReversed = !!value;
        if (_.isReversed) {
            if (_.phaseIncr > 0) {
                _.phaseIncr *= -1;
            }
            if (_.phase === 0 && _.buffer.length) {
                _.phase = _.buffer[0].length + _.phaseIncr;
            }
        } else {
            if (_.phaseIncr < 0) {
                _.phaseIncr *= -1;
            }
        }

        return this;
    };

    $.loop = function(value) {
        this._.isLooped = !!value;
        return this;
    };

    $.bang = function(value) {
        this.playbackState = (value === false ? fn.FINISHED_STATE : fn.PLAYING_STATE);
        this._.phase = 0;
        this._.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (!_.buffer.length) {
            return this;
        }

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var phase  = _.phase;
            var i, imax = _.cellsize;

            var bufferL, bufferR;
            if (_.channels === 2) {
                bufferL = _.buffer[1];
                bufferR = _.buffer[2];
            } else {
                bufferL = bufferR = _.buffer[0];
            }

            if (_.currentTimeObj) {
                var pos = _.currentTimeObj.process(tickID).cells[0];
                var t, sr = _.samplerate * 0.001;
                for (i = 0; i < imax; ++i) {
                    t = pos[i];
                    phase = t * sr;
                    cellL[i] = (bufferL[phase|0] || 0);
                    cellR[i] = (bufferR[phase|0] || 0);
                }
                _.phase = phase;
                _.currentTime = t;
            } else {
                var pitch  = _.pitch.process(tickID).cells[0][0];
                var phaseIncr = _.phaseIncr * pitch;

                for (i = 0; i < imax; ++i) {
                    cellL[i] = (bufferL[phase|0] || 0);
                    cellR[i] = (bufferR[phase|0] || 0);
                    phase += phaseIncr;
                }

                if (phase >= bufferL.length) {
                    if (_.isLooped) {
                        fn.nextTick(_.onlooped);
                    } else {
                        fn.nextTick(_.onended);
                    }
                } else if (phase < 0) {
                    if (_.isLooped) {
                        fn.nextTick(_.onlooped);
                    } else {
                        fn.nextTick(_.onended);
                    }
                }
                _.phase = phase;
                _.currentTime += fn.currentTimeIncr;
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        var _ = this._;
        var bufferL, bufferR;
        if (_.plotFlush) {
            if (_.channels === 2) {
                bufferL = _.buffer[1];
                bufferR = _.buffer[2];
            } else {
                bufferL = bufferR = _.buffer[0];
            }
            var data = new Float32Array(2048);
            var x = 0, xIncr = bufferL.length / 2048;
            for (var i = 0; i < 2048; i++) {
                data[i] = (bufferL[x|0] + bufferR[x|0]) * 0.5;
                x += xIncr;
            }
            _.plotData  = data;
            _.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };

    fn.register("buffer", BufferNode);

})(timbre);
(function(T) {
    "use strict";

    var fn  = T.fn;
    var Chorus = T.modules.Chorus;

    function ChorusNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var chorus = new Chorus(this._.samplerate);
        chorus.setDelayTime(20);
        chorus.setRate(4);
        chorus.depth = 20;
        chorus.feedback = 0.2;
        chorus.mix = 0.33;
        this._.chorus = chorus;
    }
    fn.extend(ChorusNode);

    var $ = ChorusNode.prototype;

    Object.defineProperties($, {
        type: {
            set: function(value) {
                this._.chorus.setDelayTime(value);
            },
            get: function() {
                return this._.chorus.wave;
            }
        },
        delay: {
            set: function(value) {
                if (0.5 <= value && value <= 80) {
                    this._.chorus.setDelayTime(value);
                }
            },
            get: function() {
                return this._.chorus.delayTime;
            }
        },
        rate: {
            set: function(value) {
                if (typeof value === "number" && value > 0) {
                    this._.chorus.setRate(value);
                }
            },
            get: function() {
                return this._.chorus.rate;
            }
        },
        depth: {
            set: function(value) {
                if (typeof value === "number") {
                    if (0 <= value && value <= 100) {
                        value *= this._.samplerate / 44100;
                        this._.chorus.depth = value;
                    }
                }
            },
            get: function() {
                return this._.chorus.depth;
            }
        },
        fb: {
            set: function(value) {
                if (typeof value === "number") {
                    if (-1 <= value && value <= 1) {
                        this._.chorus.feedback = value * 0.99996;
                    }
                }
            },
            get: function() {
                return this._.chorus.feedback;
            }
        },
        mix: {
            set: function(value) {
                this._.mix = T(value);
            },
            get: function() {
                return this._.mix;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            if (!_.bypassed) {
                _.chorus.process(this.cells[1], this.cells[2]);
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("chorus", ChorusNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function ClipNode(_args) {
        T.Object.call(this, 2, _args);

        var _ = this._;
        _.min = -0.8;
        _.max = +0.8;
    }
    fn.extend(ClipNode);

    var $ = ClipNode.prototype;

    Object.defineProperties($, {
        minmax: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "number") {
                    _.min = -Math.abs(value);
                    _.max = -_.min;
                }
            },
            get: function() {
                return this._.max;
            }
        },
        min: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "number") {
                    if (_.max < value) {
                        _.max = value;
                    } else {
                        _.min = value;
                    }
                }
            },
            get: function() {
                return this._.min;
            }
        },
        max: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "number") {
                    if (value < _.min) {
                        _.min = value;
                    } else {
                        _.max = value;
                    }
                }
            },
            get: function() {
                return this._.max;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = cellL.length;
            var min = _.min, max = _.max;
            var value;

            if (_.ar) {
                fn.inputSignalAR(this);
                for (i = 0; i < imax; ++i) {
                    value = cellL[i];
                    if (value < min) {
                        value = min;
                    } else if (value > max) {
                        value = max;
                    }
                    cellL[i] = value;
                    value = cellR[i];
                    if (value < min) {
                        value = min;
                    } else if (value > max) {
                        value = max;
                    }
                    cellR[i] = value;
                }
                fn.outputSignalAR(this);
            } else {
                value = fn.inputSignalKR(this);
                if (value < min) {
                    value = min;
                } else if (value > max) {
                    value = max;
                }
                this.cells[0][0] = value;
                fn.outputSignalKR(this);
            }
        }
        return this;
    };

    fn.register("clip", ClipNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;
    var Compressor = T.modules.Compressor;

    function CompressorNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.prevThresh = -24;
        _.prevKnee   =  30;
        _.prevRatio  =  12;
        _.thresh = T(_.prevThresh);
        _.knee   = T(_.prevKnee);
        _.ratio  = T(_.prevRatio);
        _.postGain  = 6;
        _.reduction = 0;
        _.attack = 3;
        _.release = 25;

        _.comp = new Compressor(_.samplerate);
        _.comp.dbPostGain = _.postGain;
        _.comp.setAttackTime(_.attack * 0.001);
        _.comp.setReleaseTime(_.release * 0.001);
        _.comp.setPreDelayTime(6);
        _.comp.setParams(_.prevThresh, _.prevKnee, _.prevRatio);
    }
    fn.extend(CompressorNode);

    var $ = CompressorNode.prototype;

    Object.defineProperties($, {
        thresh: {
            set: function(value) {
                this._.thresh = T(value);
            },
            get: function() {
                return this._.thresh;
            }
        },
        thre: {
            set: function(value) {
                this._.thresh = T(value);
            },
            get: function() {
                return this._.thre;
            }
        },
        knee: {
            set: function(value) {
                this._.kne = T(value);
            },
            get: function() {
                return this._.knee;
            }
        },
        ratio: {
            set: function(value) {
                this._.ratio = T(value);
            },
            get: function() {
                return this._.ratio;
            }
        },
        gain: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.comp.dbPostGain = value;
                }
            },
            get: function() {
                return this._.comp.dbPostGain;
            }
        },
        attack: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number") {
                    value = (value < 0) ? 0 : (1000 < value) ? 1000 : value;
                    this._.attack = value;
                    this._.comp.setAttackTime(value * 0.001);
                }
            },
            get: function() {
                return this._.attack;
            }
        },
        release: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number") {
                    value = (value < 0) ? 0 : (1000 < value) ? 1000 : value;
                    this._.release = value;
                    this._.comp.setReleaseTime(value * 0.001);
                }
            },
            get: function() {
                return this._.release;
            }
        },
        reduction: {
            get: function() {
                return this._.reduction;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            var thresh = _.thresh.process(tickID).cells[0][0];
            var knee   = _.knee.process(tickID).cells[0][0];
            var ratio  = _.ratio.process(tickID).cells[0][0];
            if (_.prevThresh !== thresh || _.prevKnee !== knee || _.prevRatio !== ratio) {
                _.prevThresh = thresh;
                _.prevKnee   = knee;
                _.prevRatio  = ratio;
                _.comp.setParams(thresh, knee, ratio);
            }

            if (!_.bypassed) {
                _.comp.process(this.cells[1], this.cells[2]);
                _.reduction = _.comp.meteringGain;
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("comp", CompressorNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;
    var StereoDelay = T.modules.StereoDelay;

    function DelayNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.time  = T(100);
        _.fb    = T(0.2);
        _.cross = T(false);
        _.mix   = 0.33;

        _.delay = new StereoDelay(_.samplerate);
    }
    fn.extend(DelayNode);

    var $ = DelayNode.prototype;

    Object.defineProperties($, {
        time: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                this._.time = T(value);
            },
            get: function() {
                return this._.time;
            }
        },
        fb: {
            set: function(value) {
                this._.fb = T(value);
            },
            get: function() {
                return this._.fb;
            }
        },
        cross: {
            set: function(value) {
                this._.cross = T(value);
            },
            get: function() {
                return this._.cross;
            }
        },
        mix: {
            set: function(value) {
                if (typeof value === "number") {
                    value = (value > 1) ? 1 : (value < 0) ? 0 : value;
                    this._.mix = value;
                }
            },
            get: function() {
                return this._.mix;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var time  = _.time.process(tickID).cells[0][0];
            var fb    = _.fb.process(tickID).cells[0][0];
            var cross = _.cross.process(tickID).cells[0][0] !== 0;
            var mix   = _.mix;

            if (_.prevTime !== time || _.prevFb !== fb || _.prevCross !== cross || _.prevMix !== mix) {
                _.prevTime  = time;
                _.prevFb    = fb;
                _.prevCross = cross;
                _.prevMix   = mix;
                _.delay.setParams(time, fb, cross, mix);
            }

            fn.inputSignalAR(this);

            if (!_.bypassed) {
                _.delay.process(this.cells[1], this.cells[2]);
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("delay", DelayNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function DistNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.pre  = T( 60);
        _.post = T(-18);
        _.x1L = _.x2L = _.y1L = _.y2L = 0;
        _.x1R = _.x2R = _.y1R = _.y2R = 0;
        _.b0 = _.b1 = _.b2 = _.a1 = _.a2 = 0;
        _.cutoff = 0;
        _.Q = 1;
        _.preScale = 0;
        _.postScale = 0;
    }
    fn.extend(DistNode);

    var $ = DistNode.prototype;

    Object.defineProperties($, {
        cutoff: {
            set: function(value) {
                if (typeof value === "number" && value > 0) {
                    this._.cutoff = value;
                }
            },
            get: function() {
                return this._.cutoff;
            }
        },
        pre: {
            set: function(value) {
                this._.pre = T(value);
            },
            get: function() {
                return this._.pre;
            }
        },
        post: {
            set: function(value) {
                this._.post = T(value);
            },
            get: function() {
                return this._.post;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            var preGain  = -_.pre.process(tickID).cells[0][0];
            var postGain = -_.post.process(tickID).cells[0][0];

            if (_.prevPreGain !== preGain || _.prevPostGain !== postGain) {
                _.prevPreGain  = preGain;
                _.prevPostGain = postGain;
                _.preScale  = Math.pow(10, -preGain  * 0.05);
                _.postScale = Math.pow(10, -postGain * 0.05);
            }

            if (!_.bypassed) {
                var cellL = this.cells[1];
                var cellR = this.cells[2];
                var preScale  = _.preScale;
                var postScale = _.postScale;
                var i, imax, value, x0, y0;

                if (_.cutoff) {
                    if (_.prevCutoff !== _.cutoff) {
                        _.prevCutoff = _.cutoff;
                        lowpass_params(_);
                    }

                    var x1L = _.x1L, x2L = _.x2L, y1L = _.y1L, y2L = _.y2L;
                    var x1R = _.x1R, x2R = _.x2R, y1R = _.y1R, y2R = _.y2R;
                    var b0 = _.b0, b1 = _.b1, b2 = _.b2, a1 = _.a1, a2 = _.a2;

                    for (i = 0, imax = cellL.length; i < imax; ++i) {
                        x0 = cellL[i] * preScale;
                        y0 = b0 * x0 + b1 * x1L + b2 * x2L - a1 * y1L - a2 * y2L;
                        value = y0 * postScale;
                        if (value < -1) {
                            value = -1;
                        } else if (value > 1) {
                            value = 1;
                        }
                        cellL[i] = value;
                        x2L = x1L; x1L = x0; y2L = y1L; y1L = y0;

                        x0 = cellR[i] * preScale;
                        y0 = b0 * x0 + b1 * x1R + b2 * x2R - a1 * y1R - a2 * y2R;
                        value = y0 * postScale;
                        if (value < -1) {
                            value = -1;
                        } else if (value > 1) {
                            value = 1;
                        }
                        cellR[i] = value;
                        x2R = x1R; x1R = x0; y2R = y1R; y1R = y0;
                    }

                    _.x1L = x1L; _.x2L = x2L; _.y1L = y1L; _.y2L = y2L;
                    _.x1R = x1R; _.x2R = x2R; _.y1R = y1R; _.y2R = y2R;
                } else {
                    for (i = 0, imax = cellL.length; i < imax; ++i) {
                        value = cellL[i] * preScale * postScale;
                        if (value < -1) {
                            value = -1;
                        } else if (value > 1) {
                            value = 1;
                        }
                        cellL[i] = value;

                        value = cellR[i] * preScale * postScale;
                        if (value < -1) {
                            value = -1;
                        } else if (value > 1) {
                            value = 1;
                        }
                        cellR[i] = value;
                    }
                }
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    var lowpass_params = function(_) {
        var w0 = 2 * Math.PI * _.cutoff / _.samplerate;
        var cos = Math.cos(w0);
        var sin = Math.sin(w0);
        var alpha = sin / (2 * _.Q);

        var ia0 = 1 / (1 + alpha);
        _.b0 =  (1 - cos) * 0.5 * ia0;
        _.b1 =   1 - cos * ia0;
        _.b2 =  (1 - cos) * 0.5 * ia0;
        _.a1 =  -2 * cos * ia0;
        _.a2 =   1 - alpha * ia0;
    };

    fn.register("dist", DistNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function DivNode(_args) {
        T.Object.call(this, 2, _args);
        this._.ar = false;
    }
    fn.extend(DivNode);

    var $ = DivNode.prototype;

    $.process = function(tickID) {
            var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var nodes = this.nodes;
            var cell  = this.cells[0];
            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = nodes.length;
            var j, jmax = cell.length;
            var tmp, tmpL, tmpR, div;

            if (_.ar) {
                if (nodes.length > 0) {
                    nodes[0].process(tickID);
                    tmpL = nodes[0].cells[1];
                    tmpR = nodes[0].cells[2];
                    cellL.set(tmpL);
                    cellR.set(tmpR);
                    for (i = 1; i < imax; ++i) {
                        nodes[i].process(tickID);
                        tmpL = nodes[i].cells[1];
                        tmpR = nodes[i].cells[2];
                        for (j = 0; j < jmax; ++j) {
                            div = tmpL[j];
                            cellL[j] = (div === 0) ? 0 : cellL[j] / div;
                            div = tmpR[j];
                            cellR[j] = (div === 0) ? 0 : cellR[j] / div;
                        }
                    }
                } else {
                    for (j = 0; j < jmax; ++j) {
                        cellL[j] = cellR[i] = 0;
                    }
                }
                fn.outputSignalAR(this);
            } else {
                if (nodes.length > 0) {
                    tmp = nodes[0].process(tickID).cells[0][0];
                    for (i = 1; i < imax; ++i) {
                        div = nodes[i].process(tickID).cells[0][0];
                        tmp = (div === 0) ? 0 : tmp / div;
                    }
                } else {
                    tmp = 0;
                }
                cell[0] = tmp;
                fn.outputSignalKR(this);
            }
        }

        return this;
    };

    fn.register("/", DivNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;
    var Envelope  = T.modules.Envelope;
    var isDictionary = fn.isDictionary;

    function EnvNode(_args) {
        T.Object.call(this, 2, _args);
        var _ = this._;
        _.env = new Envelope(_.samplerate);
        _.env.setStep(_.cellsize);
        _.tmp = new fn.SignalArray(_.cellsize);
        _.ar = false;
        _.plotFlush = true;
        _.onended = make_onended(this);
        this.on("ar", onar);
    }
    fn.extend(EnvNode);

    var onar = function(value) {
        this._.env.setStep((value) ? 1 : this._.cellsize);
    };

    var make_onended = function(self) {
        return function() {
            self._.emit("ended");
        };
    };

    var $ = EnvNode.prototype;

    Object.defineProperties($, {
        table: {
            set: function(value) {
                if (Array.isArray(value)) {
                    setTable.call(this, value);
                    this._.plotFlush = true;
                }
            },
            get: function() {
                return this._.env.table;
            }
        },
        curve: {
            set: function(value) {
                this._.env.setCurve(value);
            },
            get: function() {
                return this._.env.curve;
            }
        },
        releaseNode: {
            set: function(value) {
                this._.env.setReleaseNode(value);
                this._.plotFlush = true;
            },
            get: function() {
                return this._.env.releaseNode + 1;
            }
        },
        loopNode: {
            set: function(value) {
                this._.env.setLoopNode(value);
                this._.plotFlush = true;
            },
            get: function() {
                return this._.env.loopNode + 1;
            }
        }
    });

    $.clone = function() {
        var instance = fn.clone(this);
        instance._.env = this._.env.clone();
        return instance;
    };

    $.reset = function() {
        this._.env.reset();
        return this;
    };

    $.release = function() {
        var _ = this._;
        _.env.release();
        _.emit("released");
        return this;
    };

    $.bang = function() {
        var _ = this._;
        _.env.reset();
        _.env.status = Envelope.StatusGate;
        _.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = _.cellsize;

            if (this.nodes.length) {
                fn.inputSignalAR(this);
            } else {
                for (i = 0; i < imax; ++i) {
                    cellL[i] = cellR[i] = 1;
                }
            }

            var value, emit = null;
            if (_.ar) {
                var tmp = _.tmp;
                _.env.process(tmp);
                for (i = 0; i < imax; ++i) {
                    cellL[i] *= tmp[i];
                    cellR[i] *= tmp[i];
                }
                emit = _.env.emit;
            } else {
                value = _.env.next();
                for (i = 0; i < imax; ++i) {
                    cellL[i] *= value;
                    cellR[i] *= value;
                }
                emit = _.env.emit;
            }

            fn.outputSignalAR(this);

            if (emit) {
                if (emit === "ended") {
                    fn.nextTick(_.onended);
                } else {
                    this._.emit(emit, _.value);
                }
            }
        }

        return this;
    };

    var setTable = function(list) {
        var env = this._.env;

        var table = [list[0] || ZERO];

        var value, time, curveType, curveValue;
        for (var i = 1, imax = list.length; i < imax; ++i) {
            value = list[i][0] || ZERO;
            time  = list[i][1];
            curveType = list[i][2];

            if (typeof time !== "number") {
                if (typeof time === "string") {
                    time = timevalue(time);
                } else {
                    time = 10;
                }
            }
            if (time < 10) {
                time = 10;
            }

            if (typeof curveType === "number") {
                curveValue = curveType;
                curveType  = Envelope.CurveTypeCurve;
            } else {
                curveType  = Envelope.CurveTypeDict[curveType] || null;
                curveValue = 0;
            }
            table.push([value, time, curveType, curveValue]);
        }

        env.setTable(table);
    };

    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        if (this._.plotFlush) {
            var env = this._.env.clone();
            var info = env.getInfo(1000);

            var totalDuration    = info.totalDuration;
            var loopBeginTime    = info.loopBeginTime;
            var releaseBeginTime = info.releaseBeginTime;
            var data = new Float32Array(256);
            var duration = 0;
            var durationIncr = totalDuration / data.length;
            var isReleased   = false;
            var samples = (totalDuration * 0.001 * this._.samplerate)|0;
            var i, imax;

            samples /= data.length;
            env.setStep(samples);
            env.status = Envelope.StatusGate;
            for (i = 0, imax = data.length; i < imax; ++i) {
                data[i] = env.next();
                duration += durationIncr;
                if (!isReleased && duration >= releaseBeginTime) {
                    env.release();
                    isReleased = true;
                }
            }
            this._.plotData = data;

            this._.plotBefore = function(context, x, y, width, height) {
                var x1, w;
                if (loopBeginTime !== Infinity && releaseBeginTime !== Infinity) {
                    x1 = x + (width * (loopBeginTime    / totalDuration));
                    w  = x + (width * (releaseBeginTime / totalDuration));
                    w  = w - x1;
                    context.fillStyle = "rgba(224, 224, 224, 0.8)";
                    context.fillRect(x1, 0, w, height);
                }
                if (releaseBeginTime !== Infinity) {
                    x1 = x + (width * (releaseBeginTime / totalDuration));
                    w  = width - x1;
                    context.fillStyle = "rgba(212, 212, 212, 0.8)";
                    context.fillRect(x1, 0, w, height);
                }
            };

            // y-range
            var minValue = Infinity, maxValue = -Infinity;
            for (i = 0; i < imax; ++i) {
                if (data[i] < minValue) {
                    minValue = data[i];
                } else if (data[i] > maxValue) {
                    maxValue = data[i];
                }
            }
            if (maxValue < 1) {
                maxValue = 1;
            }
            this._.plotRange = [minValue, maxValue];

            this._.plotData  = data;
            this._.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };
    fn.register("env", EnvNode);


    function envValue(opts, min, def, name1, name2, func) {
        var x = def;
        if (typeof opts[name1] === "number") {
            x = opts[name1];
        } else if (typeof opts[name2] === "number") {
            x = opts[name2];
        } else if (func) {
            if (typeof opts[name1] === "string") {
                x = func(opts[name1]);
            } else if (typeof opts[name2] === "string") {
                x = func(opts[name2]);
            }
        }
        if (x < min) {
            x = min;
        }
        return x;
    }

    var ZERO = Envelope.ZERO;

    fn.register("perc", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var a  = envValue(opts,   10,   10, "a" , "attackTime" , timevalue);
        var r  = envValue(opts,   10, 1000, "r" , "releaseTime", timevalue);
        var lv = envValue(opts, ZERO,    1, "lv", "level"     );

        opts.table = [ZERO, [lv, a], [ZERO, r]];

        return new EnvNode(_args);
    });

    fn.register("adsr", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var a  = envValue(opts,   10,   10, "a" , "attackTime"  , timevalue);
        var d  = envValue(opts,   10,  300, "d" , "decayTime"   , timevalue);
        var s  = envValue(opts, ZERO,  0.5, "s" , "sustainLevel");
        var r  = envValue(opts,   10, 1000, "r" , "decayTime"   , timevalue);
        var lv = envValue(opts, ZERO,    1, "lv", "level"       );

        opts.table = [ZERO, [lv, a], [s, d], [ZERO, r]];
        opts.releaseNode = 3;

        return new EnvNode(_args);
    });

    fn.register("adshr", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var a  = envValue(opts,   10,   10, "a" , "attackTime"  , timevalue);
        var d  = envValue(opts,   10,  300, "d" , "decayTime"   , timevalue);
        var s  = envValue(opts, ZERO,  0.5, "s" , "sustainLevel");
        var h  = envValue(opts,   10,  500, "h" , "holdTime"    , timevalue);
        var r  = envValue(opts,   10, 1000, "r" , "decayTime"   , timevalue);
        var lv = envValue(opts, ZERO,    1, "lv", "level"       );

        opts.table = [ZERO, [lv, a], [s, d], [s, h], [ZERO, r]];

        return new EnvNode(_args);
    });

    fn.register("asr", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var a  = envValue(opts,   10,   10, "a" , "attackTime"  , timevalue);
        var s  = envValue(opts, ZERO,  0.5, "s" , "sustainLevel");
        var r  = envValue(opts,   10, 1000, "r" , "releaseTime" , timevalue);

        opts.table = [ZERO, [s, a], [ZERO, r]];
        opts.releaseNode = 2;

        return new EnvNode(_args);
    });

    fn.register("dadsr", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var dl = envValue(opts,   10,  100, "dl", "delayTime"   , timevalue);
        var a  = envValue(opts,   10,   10, "a" , "attackTime"  , timevalue);
        var d  = envValue(opts,   10,  300, "d" , "decayTime"   , timevalue);
        var s  = envValue(opts, ZERO,  0.5, "s" , "sustainLevel");
        var r  = envValue(opts,   10, 1000, "r" , "relaseTime"  , timevalue);
        var lv = envValue(opts, ZERO,    1, "lv", "level"       );

        opts.table = [ZERO, [ZERO, dl], [lv, a], [s, d], [ZERO, r]];
        opts.releaseNode = 4;

        return new EnvNode(_args);
    });

    fn.register("ahdsfr", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var a  = envValue(opts,   10,   10, "a" , "attackTime"  , timevalue);
        var h  = envValue(opts,   10,   10, "h" , "holdTime"    , timevalue);
        var d  = envValue(opts,   10,  300, "d" , "decayTime"   , timevalue);
        var s  = envValue(opts, ZERO,  0.5, "s" , "sustainLevel");
        var f  = envValue(opts,   10, 5000, "f" , "fadeTime"    , timevalue);
        var r  = envValue(opts,   10, 1000, "r" , "relaseTime"  , timevalue);
        var lv = envValue(opts, ZERO,    1, "lv", "level"       );

        opts.table = [ZERO, [lv, a], [lv, h], [s, d], [ZERO, f], [ZERO, r]];
        opts.releaseNode = 5;

        return new EnvNode(_args);
    });

    fn.register("linen", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var a  = envValue(opts,   10,   10, "a" , "attackTime" , timevalue);
        var s  = envValue(opts,   10, 1000, "s" , "sustainTime", timevalue);
        var r  = envValue(opts,   10, 1000, "r" , "releaseTime", timevalue);
        var lv = envValue(opts, ZERO,    1, "lv", "level"      );

        opts.table = [ZERO, [lv, a], [lv, s], [ZERO, r]];

        return new EnvNode(_args);
    });

    fn.register("env.tri", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var dur = envValue(opts,   20, 1000, "dur", "duration", timevalue);
        var lv  = envValue(opts, ZERO,    1, "lv" , "level"   );

        dur *= 0.5;
        opts.table = [ZERO, [lv, dur], [ZERO, dur]];

        return new EnvNode(_args);
    });

    fn.register("env.cutoff", function(_args) {
        if (!isDictionary(_args[0])) {
            _args.unshift({});
        }

        var opts = _args[0];
        var r  = envValue(opts,   10, 100, "r" , "relaseTime", timevalue);
        var lv = envValue(opts, ZERO,   1, "lv", "level"    );

        opts.table = [lv, [ZERO, r]];

        return new EnvNode(_args);
    });

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var FFT = T.modules.FFT;
    var Biquad = T.modules.Biquad;
    var PLOT_LOW_FREQ = 20;
    var PARAM_NAMES = {
        hpf:0, lf:1, lmf:2, mf:3, hmf:4, hf:5, lpf:6
    };

    function EQNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.biquads = new Array(7);

        _.plotBefore = plotBefore;
        _.plotRange  = [-18, 18];
        _.plotFlush  = true;
    }
    fn.extend(EQNode);

    var plotBefore = function(context, x, y, width, height) {
        context.lineWidth = 1;
        context.strokeStyle = "rgb(192, 192, 192)";
        var nyquist = this._.samplerate * 0.5;
        for (var i = 1; i <= 10; ++i) {
            for (var j = 1; j <= 4; j++) {
                var f = i * Math.pow(10, j);
                if (f <= PLOT_LOW_FREQ || nyquist <= f) {
                    continue;
                }
                context.beginPath();
                var _x = (Math.log(f/PLOT_LOW_FREQ)) / (Math.log(nyquist/PLOT_LOW_FREQ));
                _x = ((_x * width + x)|0) + 0.5;
                context.moveTo(_x, y);
                context.lineTo(_x, y + height);
                context.stroke();
            }
        }

        var h = height / 6;
        for (i = 1; i < 6; i++) {
            context.beginPath();
            var _y = ((y + (i * h))|0) + 0.5;
            context.moveTo(x, _y);
            context.lineTo(x + width, _y);
            context.stroke();
        }
    };

    var $ = EQNode.prototype;

    Object.defineProperties($, {
        params: {
            set: function(value) {
                if (typeof value === "object") {
                    var keys = Object.keys(value);
                    for (var i = 0, imax = keys.length; i < imax; ++i) {
                        var items = value[keys[i]];
                        if (Array.isArray(items)) {
                            this.setParams(keys[i], items[0], items[1], items[2]);
                        } else {
                            this.setParams(keys[i]);
                        }
                    }
                }
            }
        }
    });

    $.setParams = function(index, freq, Q, gain) {
        var _ = this._;
        if (typeof index === "string") {
            index = PARAM_NAMES[index];
        }
        if (0 <= index && index < _.biquads.length) {
            index |= 0;
            if (typeof freq === "number" && typeof Q === "number") {
                if (typeof gain !== "number") {
                    gain = 0;
                }
                var biquad = _.biquads[index];
                if (!biquad) {
                    biquad = _.biquads[index] = new Biquad(_.samplerate);
                    switch (index) {
                    case 0:
                        biquad.setType("highpass");
                        break;
                    case _.biquads.length - 1:
                        biquad.setType("lowpass");
                        break;
                    default:
                        biquad.setType("peaking");
                        break;
                    }
                }
                biquad.setParams(freq, Q, gain);
            } else {
                _.biquads[index] = undefined;
            }
            _.plotFlush = true;
        }
        return this;
    };

    $.getParams = function(index) {
        var _ = this._;
        var biquad = _.biquads[index|0];
        if (biquad) {
            return {freq:biquad.frequency, Q:biquad.Q, gain:biquad.gain};
        }
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            if (!_.bypassed) {
                var cellL = this.cells[1];
                var cellR = this.cells[2];
                var biquads = _.biquads;
                for (var i = 0, imax = biquads.length; i < imax; ++i) {
                    if (biquads[i]) {
                        biquads[i].process(cellL, cellR);
                    }
                }
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    var fft = new FFT(2048);
    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        if (this._.plotFlush) {
            var _ = this._;
            var impluse = new Float32Array(fft.length);
            impluse[0] = 1;
            for (var i = 0, imax = _.biquads.length; i < imax; ++i) {
                var params = this.getParams(i);
                if (params) {
                    var biquad = new Biquad(_.samplerate);
                    if (i === 0) {
                        biquad.setType("highpass");
                    } else if (i === imax - 1) {
                        biquad.setType("lowpass");
                    } else {
                        biquad.setType("peaking");
                    }
                    biquad.setParams(params.freq, params.Q, params.gain);
                    biquad.process(impluse, impluse);
                }
            }

            fft.forward(impluse);

            var size = 512;
            var data = new Float32Array(size);
            var nyquist  = _.samplerate * 0.5;
            var spectrum = new Float32Array(size);
            var j, f, index, delta, x0, x1, xx;

            fft.getFrequencyData(spectrum);
            for (i = 0; i < size; ++i) {
                f = Math.pow(nyquist / PLOT_LOW_FREQ, i / size) * PLOT_LOW_FREQ;
                j = f / (nyquist / spectrum.length);
                index = j|0;
                delta = j - index;
                if (index === 0) {
                    x1 = x0 = xx = spectrum[index];
                } else {
                    x0 = spectrum[index - 1];
                    x1 = spectrum[index];
                    xx = ((1.0 - delta) * x0 + delta * x1);
                }
                data[i] = xx;
            }
            this._.plotData  = data;
            this._.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };

    fn.register("eq", EQNode);

})(timbre);
(function(T) {
    "use strict";

    var fn  = T.fn;
    var FFT = T.modules.FFT;

    function FFTNode(_args) {
        T.Object.call(this, 2, _args);
        fn.listener(this);
        fn.fixAR(this);

        this.real = new T.ChannelObject(this);
        this.imag = new T.ChannelObject(this);
        this.cells[3] = this.real.cell;
        this.cells[4] = this.imag.cell;

        var _ = this._;
        _.fft = new FFT(_.cellsize * 2);
        _.fftCell  = new fn.SignalArray(_.fft.length);
        _.prevCell = new fn.SignalArray(_.cellsize);
        _.freqs    = new fn.SignalArray(_.fft.length>>1);

        _.plotFlush = true;
        _.plotRange = [0, 32];
        _.plotBarStyle = true;
    }
    fn.extend(FFTNode);

    var $ = FFTNode.prototype;

    Object.defineProperties($, {
        window: {
            set: function(value) {
                this._.fft.setWindow(value);
            },
            get: function() {
                return this._.fft.windowName;
            }
        },
        spectrum: {
            get: function() {
                return this._.fft.getFrequencyData(this._.freqs);
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);
            fn.outputSignalAR(this);

            var cell = this.cells[0];
            var cellsize = _.cellsize;

            _.fftCell.set(_.prevCell);
            _.fftCell.set(cell, cellsize);
            _.fft.forward(_.fftCell);
            _.prevCell.set(cell);
            _.plotFlush = true;

            this.cells[3].set(_.fft.real.subarray(0, cellsize));
            this.cells[4].set(_.fft.imag.subarray(0, cellsize));
        }

        return this;
    };

    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        if (this._.plotFlush) {
            this._.plotData  = this.spectrum;
            this._.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };

    fn.register("fft", FFTNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function FNoiseNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.freq = T(440);
        _.reg = 0x8000;
        _.shortFlag = false;
        _.phase     = 0;
        _.lastValue = 0;
    }
    fn.extend(FNoiseNode);

    var $ = FNoiseNode.prototype;

    Object.defineProperties($, {
        shortFlag: {
            set: function(value) {
                this._.shortFlag = !!value;
            },
            get: function() {
                return this._.shortFlag;
            }
        },
        freq: {
            set: function(value) {
                this._.freq = T(value);
            },
            get: function() {
                return this._.freq;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;
        var cell = this.cells[0];

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var lastValue = _.lastValue;
            var phase     = _.phase;
            var phaseStep = _.freq.process(tickID).cells[0][0] / _.samplerate;
            var reg = _.reg;
            var mul = _.mul, add = _.add;
            var i, imax;

            if (_.shortFlag) {
                for (i = 0, imax = cell.length; i < imax; ++i) {
                    if (phase >= 1) {
                        reg >>= 1;
                        reg |= ((reg ^ (reg >> 6)) & 1) << 15;
                        lastValue = ((reg & 1) - 0.5);
                        phase -= 1;
                    }
                    cell[i] = lastValue * mul + add;
                    phase += phaseStep;
                }
            } else {
                for (i = 0, imax = cell.length; i < imax; ++i) {
                    if (phase >= 1) {
                        reg >>= 1;
                        reg |= ((reg ^ (reg >> 1)) & 1) << 15;
                        lastValue = ((reg & 1) - 0.5);
                        phase -= 1;
                    }
                    cell[i] = lastValue * mul + add;
                    phase += phaseStep;
                }
            }
            _.reg       = reg;
            _.phase     = phase;
            _.lastValue = lastValue;
        }

        return this;
    };

    fn.register("fnoise", FNoiseNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    var GateChannelNode = (function() {
        function GateChannelNode(parent) {
            T.Object.call(this, 2, []);
            fn.fixAR(this);
            this._.parent = parent;
        }
        fn.extend(GateChannelNode);

        GateChannelNode.prototype.process = function(tickID) {
            if (this.tickID !== tickID) {
                this.tickID = tickID;
                this._.parent.process(tickID);
            }
            return this;
        };

        return GateChannelNode;
    })();

    function GateNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        this._.selected = 0;
        this._.outputs  = [];
    }
    fn.extend(GateNode);

    var $ = GateNode.prototype;

    Object.defineProperties($, {
        selected: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "number") {
                    _.selected = value;
                    var outputs = _.outputs;
                    for (var i = 0, imax = outputs.length; i < imax; ++i) {
                        if (outputs[i]) {
                            outputs[i].cells[0].set(fn.emptycell);
                            outputs[i].cells[1].set(fn.emptycell);
                            outputs[i].cells[2].set(fn.emptycell);
                        }
                    }
                }
            },
            get: function() {
                return this._.selected;
            }
        }
    });

    $.at = function(index) {
        var _ = this._;
        var output = _.outputs[index];
        if (!output) {
            _.outputs[index] = output = new GateChannelNode(this);
        }
        return output;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);
            fn.outputSignalAR(this);

            var output = _.outputs[_.selected];
            if (output) {
                output.cells[0].set(this.cells[0]);
                output.cells[1].set(this.cells[1]);
                output.cells[2].set(this.cells[2]);
            }
        }

        return this;
    };

    fn.register("gate", GateNode);

})(timbre);
(function(T) {
    "use strict";

    var fn  = T.fn;
    var FFT = T.modules.FFT;

    function IFFTNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.fft = new FFT(_.cellsize * 2);
        _.fftCell    = new fn.SignalArray(this._.fft.length);
        _.realBuffer = new fn.SignalArray(this._.fft.length);
        _.imagBuffer = new fn.SignalArray(this._.fft.length);
    }
    fn.extend(IFFTNode);

    var $ = IFFTNode.prototype;

    Object.defineProperties($, {
        real: {
            set: function(value) {
                this._.real = T(value);
            },
            get: function() {
                return this._.real;
            }
        },
        imag: {
            set: function(value) {
                this._.imag = T(value);
            },
            get: function() {
                return this._.imag;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            if (_.real && _.imag) {
                var cell = this.cells[0];
                var real = _.realBuffer;
                var imag = _.imagBuffer;
                var _real = _.real.process(tickID).cells[0];
                var _imag = _.imag.process(tickID).cells[0];

                real.set(_real);
                imag.set(_imag);

                cell.set(_.fft.inverse(real, imag).subarray(0, _.cellsize));

                fn.outputSignalAR(this);
            }
        }

        return this;
    };

    fn.register("ifft", IFFTNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;

    function IntervalNode(_args) {
        T.Object.call(this, 1, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        _.interval = T(1000);
        _.count = 0;
        _.delay   = 0;
        _.timeout = Infinity;
        _.currentTime = 0;
        _.delaySamples = 0;
        _.countSamples = 0;
        _.onended = fn.make_onended(this);

        this.on("start", onstart);
    }
    fn.extend(IntervalNode);

    var onstart = function() {
        var _ = this._;
        this.playbackState = fn.PLAYING_STATE;
        _.delaySamples = (_.samplerate * (_.delay * 0.001))|0;
        _.countSamples = _.count = _.currentTime = 0;
    };
    Object.defineProperty(onstart, "unremovable", {
        value:true, writable:false
    });

    var $ = IntervalNode.prototype;

    Object.defineProperties($, {
        interval: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                    if (value <= 0) {
                        value = 0;
                    }
                }
                this._.interval = T(value);
            },
            get: function() {
                return this._.interval;
            }
        },
        delay: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number" && value >= 0) {
                    this._.delay = value;
                    this._.delaySamples = (this._.samplerate * (value * 0.001))|0;
                }
            },
            get: function() {
                return this._.delay;
            }
        },
        count: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.count = value;
                }
            },
            get: function() {
                return this._.count;
            }
        },
        timeout: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number" && value >= 0) {
                    this._.timeout = value;
                }
            },
            get: function() {
                return this._.timeout;
            }
        },
        currentTime: {
            get: function() {
                return this._.currentTime;
            }
        }
    });

    $.bang = function() {
        var _ = this._;
        this.playbackState = fn.PLAYING_STATE;
        _.delaySamples = (_.samplerate * (_.delay * 0.001))|0;
        _.countSamples = _.count = _.currentTime = 0;
        _.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var cell = this.cells[0];

        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            if (_.delaySamples > 0) {
                _.delaySamples -= cell.length;
            }

            var interval = _.interval.process(tickID).cells[0][0];

            if (_.delaySamples <= 0) {
                _.countSamples -= cell.length;
                if (_.countSamples <= 0) {
                    _.countSamples += (_.samplerate * interval * 0.001)|0;
                    var nodes = this.nodes;
                    var count  = _.count;
                    var x = count * _.mul + _.add;
                    for (var j = 0, jmax = cell.length; j < jmax; ++j) {
                        cell[j] = x;
                    }
                    for (var i = 0, imax = nodes.length; i < imax; ++i) {
                        nodes[i].bang(count);
                    }
                    _.count += 1;
                }
            }
            _.currentTime += fn.currentTimeIncr;

            if (_.currentTime >= _.timeout) {
                fn.nextTick(_.onended);
            }
        }
        return this;
    };

    fn.register("interval", IntervalNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;

    function LagNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        var bits = Math.ceil(Math.log(_.samplerate) * Math.LOG2E);
        _.buffersize = 1 << bits;
        _.buffermask = _.buffersize - 1;
        _.buffer = new fn.SignalArray(_.buffersize);
        _.time = 0;
        _.readIndex  = 0;
        _.writeIndex = 0;
    }
    fn.extend(LagNode);

    var $ = LagNode.prototype;

    Object.defineProperties($, {
        time: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number" && value > 0) {
                    var _ = this._;
                    _.time = value;
                    var offset = (value * 0.001 * _.samplerate)|0;
                    if (offset > _.buffermask) {
                        offset = _.buffermask;
                    }
                    _.writeIndex = (_.readIndex + offset) & _.buffermask;
                }
            },
            get: function() {
                return this._.time;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            var cell = this.cells[0];
            var buffer = _.buffer;
            var mask   = _.buffermask;
            var readIndex  = _.readIndex;
            var writeIndex = _.writeIndex;
            var i, imax = cell.length;

            for (i = 0; i < imax; ++i) {
                buffer[writeIndex] = cell[i];
                cell[i] = buffer[readIndex];

                readIndex  += 1;
                writeIndex = (writeIndex + 1) & mask;
            }

            _.readIndex  = readIndex & mask;
            _.writeIndex = writeIndex;

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("lag", LagNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function MapNode(_args) {
        T.Object.call(this, 1, _args);
        var _ = this._;
        _.input  = 0;
        _.value = 0;
        _.prev   = null;
        _.ar     = false;
        _.map    = defaultFunction;
    }
    fn.extend(MapNode);

    var defaultFunction = function(x) {
        return x;
    };

    var $ = MapNode.prototype;

    Object.defineProperties($, {
        input: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.input = value;
                }
            },
            get: function() {
                return this._.input;
            }
        },
        map: {
            set: function(value) {
                if (typeof value === "function") {
                    this._.map = value;
                }
            },
            get: function() {
                return this._.map;
            }
        }
    });

    $.bang = function() {
        this._.prev = null;
        this._.emit("bang");
        return this;
    };

    $.at = function(input) {
        return (this._.map) ? this._.map(input) : 0;
    };

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var len = this.nodes.length;
            var i, imax = cell.length;

            if (_.ar && len) {
                fn.inputSignalAR(this);
                var map = _.map;
                if (map) {
                    for (i = 0; i < imax; ++i) {
                        cell[i] = map(cell[i]);
                    }
                }
                _.value = cell[imax-1];
                fn.outputSignalAR(this);
            } else {
                var input = len ? fn.inputSignalKR(this) : _.input;
                if (_.map && _.prev !== input) {
                    _.prev = input;
                    _.value = _.map(input);
                }
                var value = _.value * _.mul + _.add;
                for (i = 0; i < imax; ++i) {
                    cell[i] = value;
                }
            }
        }

        return this;
    };

    fn.register("map", MapNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function MaxNode(_args) {
        T.Object.call(this, 1, _args);
    }
    fn.extend(MaxNode);

    var $ = MaxNode.prototype;

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var nodes = this.nodes;
            var i, imax = nodes.length;
            var j, jmax = cell.length;
            var tmp, val;

            if (_.ar) {
                if (nodes.length > 0) {
                    tmp = nodes[0].process(tickID).cells[0];
                    cell.set(tmp);
                    for (i = 1; i < imax; ++i) {
                        tmp = nodes[i].process(tickID).cells[0];
                        for (j = 0; j < jmax; ++j) {
                            val = tmp[j];
                            if (cell[j] < val) {
                                cell[j] = val;
                            }
                        }
                    }
                } else {
                    for (j = 0; j < jmax; ++j) {
                        cell[j] = 0;
                    }
                }
                fn.outputSignalAR(this);
            } else {
                if (nodes.length > 0) {
                    tmp = nodes[0].process(tickID).cells[0][0];
                    for (i = 1; i < imax; ++i) {
                        val = nodes[i].process(tickID).cells[0][0];
                        if (tmp < val) {
                            tmp = val;
                        }
                    }
                } else {
                    tmp = 0;
                }
                cell[0] = tmp;
                fn.outputSignalKR(this);
            }
        }

        return this;
    };

    fn.register("max", MaxNode);

})(timbre);
(function(T) {
    "use strict";

    if (T.envtype !== "browser") {
        return;
    }

    var fn = T.fn;
    var BUFFER_SIZE = 4096;
    var BUFFER_MASK = BUFFER_SIZE - 1;

    function MediaStreamNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.src = _.func = null;
        _.bufferL = new fn.SignalArray(BUFFER_SIZE);
        _.bufferR = new fn.SignalArray(BUFFER_SIZE);
        _.readIndex  = 0;
        _.writeIndex = 0;
        _.totalRead  = 0;
        _.totalWrite = 0;
    }
    fn.extend(MediaStreamNode);

    var $ = MediaStreamNode.prototype;

    $.listen = function(audio) {
        var _impl = impl[T.env];
        if (_impl) {
            _impl.set.call(this, audio);
            _impl.listen.call(this);
        }
    };

    $.unlisten = function() {
        var _impl = impl[T.env];
        if (_impl) {
            _impl.unlisten.call(this);
        }

        this.cells[0].set(fn.emptycell);
        this.cells[1].set(fn.emptycell);
        this.cells[2].set(fn.emptycell);

        var _ = this._;
        var bufferL = _.bufferL, bufferR = _.bufferR;
        for (var i = 0, imax = bufferL.length; i < imax; ++i) {
            bufferL[i] = bufferR[i] = 0;
        }
    };

    $.process = function(tickID) {
        var _ = this._;

        if (_.src === null) {
            return this;
        }

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cellsize = _.cellsize;
            if (_.totalWrite > _.totalRead + cellsize) {
                var begin = _.readIndex;
                var end   = begin + cellsize;
                this.cells[1].set(_.bufferL.subarray(begin, end));
                this.cells[2].set(_.bufferR.subarray(begin, end));
                _.readIndex = end & BUFFER_MASK;
                _.totalRead += cellsize;
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    var impl = {};
    impl.webkit = {
        set: function(src) {
            var _ = this._;
            /*global HTMLMediaElement:true */
            if (src instanceof HTMLMediaElement) {
                var context = fn._audioContext;
                _.src = context.createMediaElementSource(src);
            }
            /*global HTMLMediaElement:false */
        },
        listen: function() {
            var _ = this._;
            var context = fn._audioContext;
            _.gain = context.createGainNode();
            _.gain.gain.value = 0;
            _.node = context.createJavaScriptNode(1024, 2, 2);
            _.node.onaudioprocess = onaudioprocess(this);
            _.src.connect(_.node);
            _.node.connect(_.gain);
            _.gain.connect(context.destination);
        },
        unlisten: function() {
            var _ = this._;
            if (_.src) {
                _.src.disconnect();
            }
            if (_.gain) {
                _.gain.disconnect();
            }
            if (_.node) {
                _.node.disconnect();
            }
        }
    };
    var onaudioprocess = function(self) {
        return function(e) {
            var _ = self._;
            var ins = e.inputBuffer;
            var length = ins.length;
            var writeIndex = _.writeIndex;

            _.bufferL.set(ins.getChannelData(0), writeIndex);
            _.bufferR.set(ins.getChannelData(1), writeIndex);
            _.writeIndex = (writeIndex + length) & BUFFER_MASK;
            _.totalWrite += length;
        };
    };

    impl.moz = {
        set: function(src) {
            var _ = this._;
            /*global HTMLAudioElement:true */
            if (src instanceof HTMLAudioElement) {
                _.src = src;
                _.istep = _.samplerate / src.mozSampleRate;
            }
            /*global HTMLAudioElement:false */
        },
        listen: function() {
            var _ = this._;
            var o0 = _.bufferL;
            var o1 = _.bufferR;
            var prev0 = 0, prev1 = 0;
            if (_.src.mozChannels === 2) {
                _.x = 0;
                _.func = function(e) {
                    var writeIndex = _.writeIndex;
                    var totalWrite = _.totalWrite;
                    var samples = e.frameBuffer;
                    var x, istep = _.istep;
                    var i, imax = samples.length;
                    x = _.x;
                    for (i = 0; i < imax; i+= 2) {
                        x += istep;
                        while (x > 0) {
                            o0[writeIndex] = (samples[i  ] + prev0) * 0.5;
                            o1[writeIndex] = (samples[i+1] + prev1) * 0.5;
                            writeIndex = (writeIndex + 1) & BUFFER_MASK;
                            ++totalWrite;
                            x -= 1;
                        }
                        prev0 = samples[i  ];
                        prev1 = samples[i+1];
                    }
                    _.x = x;
                    _.writeIndex = writeIndex;
                    _.totalWrite = totalWrite;
                };
            } else {
                _.x = 0;
                _.func = function(e) {
                    var writeIndex = _.writeIndex;
                    var totalWrite = _.totalWrite;
                    var samples = e.frameBuffer;
                    var x, istep = _.istep;
                    var i, imax = samples.length;
                    x = _.x;
                    for (i = 0; i < imax; ++i) {
                        x += istep;
                        while (x >= 0) {
                            o0[writeIndex] = o1[writeIndex] = (samples[i] + prev0) * 0.5;
                            writeIndex = (writeIndex + 1) & BUFFER_MASK;
                            ++totalWrite;
                            x -= 1;
                        }
                        prev0 = samples[i];
                    }
                    _.x = x;
                    _.writeIndex = writeIndex;
                    _.totalWrite = totalWrite;
                };
            }
            _.src.addEventListener("MozAudioAvailable", _.func);
        },
        unlisten: function() {
            var _ = this._;
            if (_.func) {
                _.src.removeEventListener("MozAudioAvailable", _.func);
                _.func = null;
            }
        }
    };

    fn.register("mediastream", MediaStreamNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function MidiCpsNode(_args) {
        T.Object.call(this, 1, _args);
        var _ = this._;
        _.midi = 0;
        _.value = 0;
        _.prev  = null;
        _.a4    = 440;
        _.ar    = false;
    }
    fn.extend(MidiCpsNode);

    var $ = MidiCpsNode.prototype;

    Object.defineProperties($, {
        midi: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.midi = value;
                }
            },
            get: function() {
                return this._.midi;
            }
        },
        a4: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.a4   = value;
                    this._.prev = null;
                }
            },
            get: function() {
                return this._.a4;
            }
        }
    });

    $.bang = function() {
        this._.prev = null;
        this._.emit("bang");
        return this;
    };

    $.at = function(midi) {
        var _ = this._;
        return _.a4 * Math.pow(2, (midi - 69) / 12);
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cell = this.cells[0];
            var len  = this.nodes.length;
            var i, imax = cell.length;

            if (_.ar && len) {
                fn.inputSignalAR(this);
                var a4 = _.a4;
                for (i = 0; i < imax; ++i) {
                    cell[i] = a4 * Math.pow(2, (cell[i] - 69) / 12);
                }
                _.value = cell[imax-1];
                fn.outputSignalAR(this);
            } else {
                var input = (len) ? fn.inputSignalKR(this) : _.midi;
                if (_.prev !== input) {
                    _.prev = input;
                    _.value = _.a4 * Math.pow(2, (input - 69) / 12);
                }
                cell[0] = _.value;
                fn.outputSignalKR(this);
            }
        }

        return this;
    };

    fn.register("midicps", MidiCpsNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function MidiRatioNode(_args) {
        T.Object.call(this, 1, _args);
        var _ = this._;
        _.midi = 0;
        _.value = 0;
        _.prev  = null;
        _.range = 12;
        _.ar    = false;
    }
    fn.extend(MidiRatioNode);

    var $ = MidiRatioNode.prototype;

    Object.defineProperties($, {
        midi: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.midi = value;
                }
            },
            get: function() {
                return this._.midi;
            }
        },
        range: {
            set: function(value) {
                if (typeof value === "number" && value > 0) {
                    this._.range = value;
                }
            },
            get: function() {
                return this._.range;
            }
        }
    });

    $.bang = function() {
        this._.prev = null;
        this._.emit("bang");
        return this;
    };

    $.at = function(midi) {
        var _ = this._;
        return Math.pow(2, midi / _.range);
    };

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var len = this.nodes.length;
            var i, imax = cell.length;

            if (_.ar && len) {
                fn.inputSignalAR(this);
                var range = _.range;
                for (i = 0; i < imax; ++i) {
                    cell[i] = Math.pow(2, cell[i] / range);
                }
                _.value = cell[imax-1];
                fn.outputSignalAR(this);
            } else {
                var input = (this.nodes.length) ? fn.inputSignalKR(this) : _.midi;
                if (_.prev !== input) {
                    _.prev = input;
                    _.value = Math.pow(2, input / _.range);
                }
                var value = _.value * _.mul + _.add;
                for (i = 0; i < imax; ++i) {
                    cell[i] = value;
                }
            }
        }

        return this;
    };

    fn.register("midiratio", MidiRatioNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function MinNode(_args) {
        T.Object.call(this, 1, _args);
    }
    fn.extend(MinNode);

    var $ = MinNode.prototype;

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var nodes = this.nodes;
            var i, imax = nodes.length;
            var j, jmax = cell.length;
            var tmp, val;

            if (_.ar) {
                if (nodes.length > 0) {
                    tmp = nodes[0].process(tickID).cells[0];
                    cell.set(tmp);
                    for (i = 1; i < imax; ++i) {
                        tmp = nodes[i].process(tickID).cells[0];
                        for (j = 0; j < jmax; ++j) {
                            val = tmp[j];
                            if (cell[j] > val) {
                                cell[j] = val;
                            }
                        }
                    }
                } else {
                    for (j = 0; j < jmax; ++j) {
                        cell[j] = 0;
                    }
                }
                fn.outputSignalAR(this);
            } else {
                if (nodes.length > 0) {
                    tmp = nodes[0].process(tickID).cells[0][0];
                    for (i = 1; i < imax; ++i) {
                        val = nodes[i].process(tickID).cells[0][0];
                        if (tmp > val) {
                            tmp = val;
                        }
                    }
                } else {
                    tmp = 0;
                }
                cell[0] = tmp;
                fn.outputSignalKR(this);
            }
        }

        return this;
    };

    fn.register("min", MinNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function MML(_args) {
        T.Object.call(this, 0, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        _.tracks  = [];
        _.onended = fn.make_onended(this);
        _.currentTime = 0;

        this.on("start", onstart);
    }
    fn.extend(MML);

    var onstart = function() {
        var self = this, _ = this._;
        var mml  = _.mml;
        if (typeof mml === "string") {
            mml = [mml];
        }
        _.tracks = mml.map(function(mml, i) {
            return new MMLTrack(self, i, mml);
        });
        _.currentTime = 0;
        this.playbackState = fn.PLAYING_STATE;
    };
    Object.defineProperty(onstart, "unremoved", {
        value:true, writable:false
    });

    var $ = MML.prototype;

    Object.defineProperties($, {
        mml: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "string" || Array.isArray(value)) {
                    _.mml = value;
                }
            },
            get: function() {
                return this._.mml;
            }
        },
        currentTime: {
            get: function() {
                return this._.currentTime;
            }
        }
    });

    $.on = $.addListener = function(type, listener) {
        if (type === "mml") {
            type = "data";
            console.warn("A 'mml' event listener was deprecated in ~v13.03.01. use 'data' event listener.");
        }
        this._.events.on(type, listener);
        return this;
    };

    $.once = function(type, listener) {
        if (type === "mml") {
            type = "data";
            console.warn("A 'mml' event listener was deprecated in ~v13.03.01. use 'data' event listener.");
        }
        this._.events.once(type, listener);
        return this;
    };

    $.off = $.removeListener = function(type, listener) {
        if (type === "mml") {
            type = "data";
            console.warn("A 'mml' event listener was deprecated in ~v13.03.01. use 'data' event listener.");
        }
        this._.events.off(type, listener);
        return this;
    };

    $.removeAllListeners = function(type) {
        if (type === "mml") {
            console.warn("A 'mml' event listener was deprecated in ~v13.03.01. use 'data' event listener.");
            type = "data";
        }
        this._.events.removeAllListeners(type);
        return this;
    };

    $.listeners = function(type) {
        if (type === "mml") {
            console.warn("A 'mml' event listener was deprecated in ~v13.03.01. use 'data' event listener.");
            type = "data";
        }
        return this._.events.listeners(type);
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var i, imax;
            var tracks = _.tracks;

            for (i = 0, imax = tracks.length; i < imax; ++i) {
                tracks[i].process();
            }
            while (i--) {
                if (tracks[i].ended) {
                    tracks.splice(i, 1);
                }
            }
            if (tracks.length === 0) {
                fn.nextTick(_.onended);
            }
            _.currentTime += fn.currentTimeIncr;
        }

        return this;
    };

    fn.register("mml", MML);

    var MMLTrack = (function() {
        function MMLTrack(sequencer, trackNum, mml) {
            var _ = this._ = {};
            _.sequencer = sequencer;
            _.trackNum  = trackNum;
            _.commands  = compile(mml);
            _.status = {t:120, l:4, o:4, v:12, q:6, dot:0, tie:false};
            _.index    = 0;
            _.queue    = [];
            _.currentTime = 0;
            _.queueTime   = 0;
            _.segnoIndex  = -1;
            _.loopStack   = [];
            _.prevNote = 0;
            _.remain   = Infinity;
            this.ended = false;
            sched(this);
        }

        var EOF     = 0;
        var NOTEON  = 1;
        var NOTEOFF = 2;
        var COMMAND = 3;

        MMLTrack.prototype.process = function() {
            var _ = this._;
            var sequencer = _.sequencer;
            var trackNum  = _.trackNum;
            var queue  = _.queue;
            var eof = false;

            if (queue.length) {
                while (queue[0][0] <= _.currentTime) {
                    var nextItem = _.queue.shift();
                    switch (nextItem[1]) {
                    case NOTEON:
                        noteOn(sequencer, trackNum, nextItem[2], nextItem[3]);
                        _.remain = nextItem[4];
                        sched(this);
                        break;
                    case NOTEOFF:
                        noteOff(sequencer, trackNum, nextItem[2], nextItem[3]);
                        break;
                    case COMMAND:
                        command(sequencer, nextItem[2]);
                        break;
                    case EOF:
                        eof = true;
                        break;
                    }
                    if (queue.length === 0) {
                        break;
                    }
                }
            }
            _.remain -= fn.currentTimeIncr;
            if (eof) {
                this.ended = true;
            }
            _.currentTime += fn.currentTimeIncr;
        };

        var noteOn = function(sequencer, trackNum, noteNum, velocity) {
            var gen, i, imax;
            var nodes = sequencer.nodes;
            for (i = 0, imax = nodes.length; i < imax; ++i) {
                gen = nodes[i];
                if (gen.noteOn) {
                    gen.noteOn(noteNum, velocity);
                } else {
                    gen.bang();
                }
            }
            sequencer._.emit("data", "noteOn", {
                trackNum:trackNum, noteNum:noteNum, velocity:velocity
            });
        };

        var noteOff = function(sequencer, trackNum, noteNum, velocity) {
            var gen, i, imax;
            var nodes = sequencer.nodes;
            for (i = 0, imax = nodes.length; i < imax; ++i) {
                gen = nodes[i];
                if (gen.noteOff) {
                    gen.noteOff(noteNum, velocity);
                } else if (gen.release) {
                    gen.release();
                }
            }
            sequencer._.emit("data", "noteOff", {
                trackNum:trackNum, noteNum:noteNum, velocity:velocity
            });
        };

        var command = function(sequencer, cmd) {
            sequencer._.emit("data", "command", {
                command: cmd
            });
        };

        var sched = function(self) {
            var _ = self._;

            var sequencer = _.sequencer;
            var cmd, commands = _.commands;
            var queue  = _.queue;
            var index  = _.index;
            var status = _.status;
            var queueTime = _.queueTime;
            var loopStack = _.loopStack;
            var tempo, val, len, dot, vel;
            var duration, quantize, pending, _queueTime;
            var peek;
            var i, imax;

            pending = [];

            outer:
            while (true) {
                if (commands.length <= index) {
                    if (_.segnoIndex >= 0) {
                        index = _.segnoIndex;
                    } else {
                        break;
                    }
                }
                cmd = commands[index++];

                switch (cmd.name) {
                case "@":
                    queue.push([queueTime, COMMAND, cmd.val]);
                    break;
                case "n":
                    tempo = status.t || 120;
                    if (cmd.len !== null) {
                        len = cmd.len;
                        dot = cmd.dot || 0;
                    } else {
                        len = status.l;
                        dot = cmd.dot || status.dot;
                    }
                    duration = (60 / tempo) * (4 / len) * 1000;
                    duration *= [1, 1.5, 1.75, 1.875][dot] || 1;

                    vel = status.v << 3;
                    if (status.tie) {
                        for (i = queue.length; i--; ) {
                            if (queue[i][2]) {
                                queue.splice(i, 1);
                                break;
                            }
                        }
                        val = _.prevNote;
                    } else {
                        val = _.prevNote = (cmd.val) + (status.o + 1) * 12;
                        queue.push([queueTime, NOTEON, val, vel, duration]);
                    }

                    if (len > 0) {
                        quantize = status.q / 8;
                        // noteOff
                        if (quantize < 1) {
                            _queueTime = queueTime + (duration * quantize);
                            queue.push([_queueTime, NOTEOFF, val, vel]);
                            for (i = 0, imax = pending.length; i < imax; ++i) {
                                queue.push([_queueTime, NOTEOFF, pending[i], vel]);
                            }
                        }
                        pending = [];
                        queueTime += duration;
                        if (!status.tie) {
                            break outer;
                        }
                    } else {
                        pending.push(val);
                    }
                    status.tie = false;
                    break;
                case "r":
                    tempo = status.t || 120;
                    if (cmd.len !== null) {
                        len = cmd.len;
                        dot = cmd.dot || 0;
                    } else {
                        len = status.l;
                        dot = cmd.dot || status.dot;
                    }
                    if (len > 0) {
                        duration = (60 / tempo) * (4 / len) * 1000;
                        duration *= [1, 1.5, 1.75, 1.875][dot] || 1;
                        queueTime += duration;
                    }
                    break;
                case "l":
                    status.l   = cmd.val;
                    status.dot = cmd.dot;
                    break;
                case "o":
                    status.o = cmd.val;
                    break;
                case "<":
                    if (status.o < 9) {
                        status.o += 1;
                    }
                    break;
                case ">":
                    if (status.o > 0) {
                        status.o -= 1;
                    }
                    break;
                case "v":
                    status.v = cmd.val;
                    break;
                case "(":
                    if (status.v < 15) {
                        status.v += 1;
                    }
                    break;
                case ")":
                    if (status.v > 0) {
                        status.v -= 1;
                    }
                    break;
                case "q":
                    status.q = cmd.val;
                    break;
                case "&":
                    status.tie = true;
                    break;
                case "$":
                    _.segnoIndex = index;
                    break;
                case "[":
                    loopStack.push([index, null, null]);
                    break;
                case "|":
                    peek = loopStack[loopStack.length - 1];
                    if (peek) {
                        if (peek[1] === 1) {
                            loopStack.pop();
                            index = peek[2];
                        }
                    }
                    break;
                case "]":
                    peek = loopStack[loopStack.length - 1];
                    if (peek) {
                        if (peek[1] === null) {
                            peek[1] = cmd.count;
                            peek[2] = index;
                        }
                        peek[1] -= 1;
                        if (peek[1] === 0) {
                            loopStack.pop();
                        } else {
                            index = peek[0];
                        }
                    }
                    break;
                case "t":
                    status.t = (cmd.val === null) ? 120 : cmd.val;
                    break;
                case "EOF":
                    queue.push([queueTime, EOF]);
                    break;
                }
            }
            _.index = index;
            _.queueTime = queueTime;
        };

        var compile = function(mml) {
            var def, re, m, cmd;
            var i, imax, j, jmax;
            var checked = new Array(mml.length);
            var commands = [];

            for (i = 0, imax = MMLCommands.length; i < imax; ++i) {
                def = MMLCommands[i];
                re  = def.re;
                while ((m = re.exec(mml))) {
                    if (!checked[m.index]) {
                        for (j = 0, jmax = m[0].length; j < jmax; ++j) {
                            checked[m.index + j] = true;
                        }
                        if (def.func) {
                            cmd = def.func(m);
                        } else {
                            cmd = {name:m[0]};
                        }
                        if (cmd) {
                            cmd.index = m.index;
                            cmd.origin = m[0];
                            commands.push(cmd);
                        }
                    }
                    while (re.lastIndex < mml.length) {
                        if (!checked[re.lastIndex]) {
                            break;
                        }
                        ++re.lastIndex;
                    }
                }
            }
            commands.sort(function(a, b) {
                return a.index - b.index;
            });
            commands.push({name:"EOF"});
            return commands;
        };

        var MMLCommands = [
            { re:/@(\d*)/g, func: function(m) {
                return {
                    name: "@",
                    val: m[1] || null
                };
            }},
            { re:/([cdefgab])([\-+]?)(\d*)(\.*)/g, func: function(m) {
                return {
                    name: "n",
                    val : {c:0,d:2,e:4,f:5,g:7,a:9,b:11}[m[1]] + ({"-":-1,"+":+1}[m[2]]||0),
                    len : (m[3] === "") ? null : Math.min(m[3]|0, 64),
                    dot : m[4].length
                };
            }},
            { re:/r(\d*)(\.*)/g, func: function(m) {
                return {
                    name: "r",
                    len : (m[1] === "") ? null : Math.max(1, Math.min(m[1]|0, 64)),
                    dot : m[2].length
                };
            }},
            { re:/&/g },
            { re:/l(\d*)(\.*)/g, func: function(m) {
                return {
                    name: "l",
                    val : (m[1] === "") ? 4 : Math.min(m[1]|0, 64),
                    dot : m[2].length
                };
            }},
            { re:/o([0-9])/g, func: function(m) {
                return {
                    name: "o",
                    val : (m[1] === "") ? 4 : m[1]|0
                };
            }},
            { re:/[<>]/g },
            { re:/v(\d*)/g, func: function(m) {
                return {
                    name: "v",
                    val : (m[1] === "") ? 12 : Math.min(m[1]|0, 15)
                };
            }},
            { re:/[()]/g },
            { re:/q([0-8])/g, func: function(m) {
                return {
                    name: "q",
                    val : (m[1] === "") ? 6 : Math.min(m[1]|0, 8)
                };
            }},
            { re:/\[/g },
            { re:/\|/g },
            { re:/\](\d*)/g, func: function(m) {
                return {
                    name: "]",
                    count: (m[1]|0)||2
                };
            }},
            { re:/t(\d*)/g, func: function(m) {
                return {
                    name: "t",
                    val : (m[1] === "") ? null : Math.max(5, Math.min(m[1]|0, 300))
                };
            }},
            { re:/\$/g }
        ];

        return MMLTrack;
    })();

})(timbre);
(function(T) {
    "use strict";

    var fn  = T.fn;

    function MonoNode(_args) {
        T.Object.call(this, 1, _args);
    }
    fn.extend(MonoNode);

    MonoNode.prototype.process = function(tickID) {
        var _ = this._;
        if (this.tickID !== tickID) {
            this.tickID = tickID;
            if (_.ar) {
                fn.inputSignalAR(this);
                fn.outputSignalAR(this);
            } else {
                this.cells[0][0] = fn.inputSignalKR(this);
                fn.outputSignalKR(this);
            }
        }
        return this;
    };
    fn.register("mono", MonoNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function MulNode(_args) {
        T.Object.call(this, 2, _args);
    }
    fn.extend(MulNode);

    var $ = MulNode.prototype;

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var nodes = this.nodes;
            var cell  = this.cells[0];
            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = nodes.length;
            var j, jmax = cell.length;
            var tmp, tmpL, tmpR;

            if (_.ar) {
                if (nodes.length > 0) {
                    nodes[0].process(tickID);
                    tmpL = nodes[0].cells[1];
                    tmpR = nodes[0].cells[2];
                    cellL.set(tmpL);
                    cellR.set(tmpR);
                    for (i = 1; i < imax; ++i) {
                        nodes[i].process(tickID);
                        tmpL = nodes[i].cells[1];
                        tmpR = nodes[i].cells[2];
                        for (j = 0; j < jmax; ++j) {
                            cellL[j] *= tmpL[j];
                            cellR[j] *= tmpR[j];
                        }
                    }
                } else {
                    for (j = 0; j < jmax; ++j) {
                        cellL[j] = cellR[j] = 0;
                    }
                }
                fn.outputSignalAR(this);
            } else {
                if (nodes.length > 0) {
                    tmp = nodes[0].process(tickID).cells[0][0];
                    for (i = 1; i < imax; ++i) {
                        tmp *= nodes[i].process(tickID).cells[0][0];
                    }
                } else {
                    tmp = 0;
                }
                cell[0] = tmp;
                fn.outputSignalKR(this);
            }
        }

        return this;
    };

    fn.register("*", MulNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function NDictNode(_args) {
        T.Object.call(this, 1, _args);

        var _ = this._;
        _.defaultValue = 0;
        _.index = 0;
        _.dict  = {};
        _.ar    = false;
    }
    fn.extend(NDictNode);

    var $ = NDictNode.prototype;

    Object.defineProperties($, {
        dict: {
            set: function(value) {
                if (typeof value === "object") {
                    this._.dict = value;
                } else if (typeof value === "function") {
                    var dict = {};
                    for (var i = 0; i < 128; ++i) {
                        dict[i] = value(i);
                    }
                    this._.dict = dict;
                }
            },
            get: function() {
                return this._.dict;
            }
        },
        defaultValue: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.defaultValue = value;
                }
            },
            get: function() {
                return this._.defaultValue;
            }
        },
        index: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.index = value;
                }
            },
            get: function() {
                return this._.index;
            }
        }
    });

    $.at = function(index) {
        var _ = this._;
        return (_.dict[index|0] || _.defaultValue) * _.mul + _.add;
    };

    $.clear = function() {
        this._.dict = {};
        return this;
    };

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var len = this.nodes.length;
            var index, value;
            var dict = _.dict, defaultValue = _.defaultValue;
            var mul = _.mul, add = _.add;
            var i, imax = cell.length;

            if (_.ar && len) {

                fn.inputSignalAR(this);
                for (i = 0; i < imax; ++i) {
                    index = cell[i];
                    if (index < 0) {
                        index = (index - 0.5)|0;
                    } else {
                        index = (index + 0.5)|0;
                    }
                    cell[i] = (dict[index] || defaultValue) * mul + add;
                }
                fn.outputSignalAR(this);
            } else {
                index = (this.nodes.length) ? fn.inputSignalKR(this) : _.index;
                if (index < 0) {
                    index = (index - 0.5)|0;
                } else {
                    index = (index + 0.5)|0;
                }
                value = (dict[index] || defaultValue) * mul + add;
                for (i = 0; i < imax; ++i) {
                    cell[i] = value;
                }
            }
        }

        return this;
    };

    fn.register("ndict", NDictNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function NoiseNode(_args) {
        T.Object.call(this, 1, _args);
    }
    fn.extend(NoiseNode);

    var $ = NoiseNode.prototype;

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var mul = _.mul, add = _.add;
            var i, imax, x;

            if (_.ar) { // audio-rate
                for (i = 0, imax = cell.length; i < imax; ++i) {
                    cell[i] = (Math.random() * 2 - 1) * mul + add;
                }
            } else {    // control-rate
                x = (Math.random() * 2 + 1) * mul + add;
                for (i = 0, imax = cell.length; i < imax; ++i) {
                    cell[i] = x;
                }
            }
        }
        return this;
    };

    fn.register("noise", NoiseNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue  = T.timevalue;
    var Oscillator = T.modules.Oscillator;

    function OscNode(_args) {
        T.Object.call(this, 2, _args);

        var _ = this._;
        _.freq  = T(440);
        _.phase = T(0);
        _.osc = new Oscillator(_.samplerate);
        _.tmp = new fn.SignalArray(_.cellsize);
        _.osc.step = _.cellsize;

        this.once("init", oninit);
    }
    fn.extend(OscNode);

    var oninit = function() {
        var _ = this._;
        if (!this.wave) {
            this.wave = "sin";
        }
        _.plotData = _.osc.wave;
        _.plotLineWidth = 2;
        _.plotCyclic = true;
        _.plotBefore = plotBefore;
    };

    var $ = OscNode.prototype;

    Object.defineProperties($, {
        wave: {
            set: function(value) {
                this._.osc.setWave(value);
            },
            get: function() {
                return this._.osc.wave;
            }
        },
        freq: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                    if (value <= 0) {
                        value = 0;
                    } else {
                        value = 1000 / value;
                    }
                }
                this._.freq = T(value);
            },
            get: function() {
                return this._.freq;
            }
        },
        phase: {
            set: function(value) {
                this._.phase = T(value);
                this._.osc.feedback = false;
            },
            get: function() {
                return this._.phase;
            }
        },
        fb: {
            set: function(value) {
                this._.phase = T(value);
                this._.osc.feedback = true;
            },
            get: function() {
                return this._.phase;
            }
        }
    });

    $.clone = function() {
        var instance = fn.clone(this);
        instance._.osc = this._.osc.clone();
        instance._.freq  = this._.freq;
        instance._.phase = this._.phase;
        return instance;
    };

    $.bang = function() {
        this._.osc.reset();
        this._.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = _.cellsize;

            if (this.nodes.length) {
                fn.inputSignalAR(this);
            } else {
                for (i = 0; i < imax; ++i) {
                    cellL[i] = cellR[i] = 1;
                }
            }

            var osc = _.osc;
            var freq  = _.freq.process(tickID).cells[0];
            var phase = _.phase.process(tickID).cells[0];

            osc.frequency = freq[0];
            osc.phase     = phase[0];

            if (_.ar) {
                var tmp  = _.tmp;
                if (_.freq.isAr) {
                    if (_.phase.isAr) {
                        osc.processWithFreqAndPhaseArray(tmp, freq, phase);
                    } else {
                        osc.processWithFreqArray(tmp, freq);
                    }
                } else {
                    if (_.phase.isAr) {
                        osc.processWithPhaseArray(tmp, phase);
                    } else {
                        osc.process(tmp);
                    }
                }
                for (i = 0; i < imax; ++i) {
                    cellL[i] *= tmp[i];
                    cellR[i] *= tmp[i];
                }
            } else {
                var value = osc.next();
                for (i = 0; i < imax; ++i) {
                    cellL[i] *= value;
                    cellR[i] *= value;
                }
            }
            fn.outputSignalAR(this);
        }

        return this;
    };

    var plotBefore;
    if (T.envtype === "browser") {
        plotBefore = function(context, offset_x, offset_y, width, height) {
            var y = (height >> 1) + 0.5;
            context.strokeStyle = "#ccc";
            context.lineWidth   = 1;
            context.beginPath();
            context.moveTo(offset_x, y + offset_y);
            context.lineTo(offset_x + width, y + offset_y);
            context.stroke();
        };
    }

    fn.register("osc", OscNode);

    fn.register("sin", function(_args) {
        return new OscNode(_args).set("wave", "sin");
    });
    fn.register("cos", function(_args) {
        return new OscNode(_args).set("wave", "cos");
    });
    fn.register("pulse", function(_args) {
        return new OscNode(_args).set("wave", "pulse");
    });
    fn.register("tri", function(_args) {
        return new OscNode(_args).set("wave", "tri");
    });
    fn.register("saw", function(_args) {
        return new OscNode(_args).set("wave", "saw");
    });
    fn.register("fami", function(_args) {
        return new OscNode(_args).set("wave", "fami");
    });
    fn.register("konami", function(_args) {
        return new OscNode(_args).set("wave", "konami");
    });
    fn.register("+sin", function(_args) {
        return new OscNode(_args).set("wave", "+sin").kr();
    });
    fn.register("+pulse", function(_args) {
        return new OscNode(_args).set("wave", "+pulse").kr();
    });
    fn.register("+tri", function(_args) {
        return new OscNode(_args).set("wave", "+tri").kr();
    });
    fn.register("+saw", function(_args) {
        return new OscNode(_args).set("wave", "+saw").kr();
    });

    fn.alias("square", "pulse");

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function PanNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.pos  = T(0);
        _.panL = 0.5;
        _.panR = 0.5;
    }
    fn.extend(PanNode);

    var $ = PanNode.prototype;

    Object.defineProperties($, {
        pos: {
            set: function(value) {
                this._.pos = T(value);
            },
            get: function() {
                return this._.pos;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var pos = _.pos.process(tickID).cells[0][0];
            if (_.prevPos !== pos) {
                var index = pos * 0.5 + 0.5;
                _.panL = 1 - pos;
                _.panR = _.prevPos = pos;
            }

            var nodes = this.nodes;
            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = nodes.length;
            var j, jmax = cellL.length;
            var tmp;

            if (imax) {
                tmp = nodes[0].process(tickID).cells[0];
                for (j = 0; j < jmax; ++j) {
                    cellL[j] = cellR[j] = tmp[j];
                }
                for (i = 1; i < imax; ++i) {
                    tmp = nodes[i].process(tickID).cells[0];
                    for (j = 0; j < jmax; ++j) {
                        cellL[j] = (cellR[j] += tmp[j]);
                    }
                }

                var panL = _.panL;
                var panR = _.panR;
                for (j = 0; j < jmax; ++j) {
                    cellL[j] = cellL[j] * panL;
                    cellR[j] = cellR[j] * panR;
                }

            } else {
                cellL.set(fn.emptycell);
                cellR.set(fn.emptycell);
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("pan", PanNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;
    var Envelope      = T.modules.Envelope;
    var EnvelopeValue = T.modules.EnvelopeValue;

    function ParamNode(_args) {
        T.Object.call(this, 2, _args);

        var _ = this._;
        _.value = 0;
        _.env = new EnvelopeValue(_.samplerate);
        _.env.step = _.cellsize;
        _.curve   = "lin";
        _.counter = 0;
        _.ar = false;
        _.onended = make_onended(this);

        this.on("ar", onar);
    }
    fn.extend(ParamNode);

    var make_onended = function(self, lastValue) {
        return function() {
            if (typeof lastValue === "number") {
                var cell  = self.cells[0];
                var cellL = self.cells[1];
                var cellR = self.cells[2];
                var value = self._.env.value;
                for (var i = 0, imax = cellL.length; i < imax; ++i) {
                    cell[0] = cellL[i] = cellR[i] = value;
                }
            }
            self._.emit("ended");
        };
    };

    var onar = function(value) {
        this._.env.step = (value) ? 1 : this._.cellsize;
    };

    var $ = ParamNode.prototype;

    Object.defineProperties($, {
        value: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.env.value = value;
                }
            },
            get: function() {
                return this._.env.value;
            }
        }
    });

    $.to = function(nextValue, time, curve) {
        var _ = this._;
        var env = _.env;
        if (typeof time === "string") {
            time = timevalue(time);
        } else if (typeof time === "undefined") {
            time = 0;
        }
        if (typeof curve === "undefined") {
            _.counter = env.setNext(nextValue, time, Envelope.CurveTypeLin);
            _.curve = "lin";
        } else {
            var _curve = Envelope.CurveTypeDict[curve];
            if (typeof _curve === "undefined") {
                _.counter = env.setNext(nextValue, time, Envelope.CurveTypeCurve, curve);
            } else {
                _.counter = env.setNext(nextValue, time, _curve);
            }
            _.curve = curve;
        }
        _.plotFlush = true;
        return this;
    };

    $.setAt = function(nextValue, time) {
        var _ = this._;
        this.to(_.env.value, time, "set");
        _.atValue = nextValue;
        return this;
    };

    $.linTo = function(nextValue, time) {
        return this.to(nextValue, time, "lin");
    };

    $.expTo = function(nextValue, time) {
        return this.to(nextValue, time, "exp");
    };

    $.sinTo = function(nextValue, time) {
        return this.to(nextValue, time, "sin");
    };

    $.welTo = function(nextValue, time) {
        return this.to(nextValue, time, "wel");
    };

    $.sqrTo = function(nextValue, time) {
        return this.to(nextValue, time, "sqr");
    };

    $.cubTo = function(nextValue, time) {
        return this.to(nextValue, time, "cub");
    };

    $.cancel = function() {
        var _ = this._;
        _.counter = _.env.setNext(_.env.value, 0, Envelope.CurveTypeSet);
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = _.cellsize;
            var env = _.env;
            var counter = _.counter;
            var value;

            if (this.nodes.length) {
                fn.inputSignalAR(this);
            } else {
                for (i = 0; i < imax; ++i) {
                    cellL[i] = cellR[i] = 1;
                }
            }

            if (counter <= 0) {
                if (_.curve === "set") {
                    env.setNext(_.atValue, 0, Envelope.CurveTypeSet);
                } else {
                    env.setNext(env.value, 0, Envelope.CurveTypeSet);
                }
                fn.nextTick(_.onended);
                _.counter = Infinity;
            }

            if (_.ar) {
                for (i = 0; i < imax; ++i) {
                    value = env.next();
                    cellL[i] *= value;
                    cellR[i] *= value;
                }
                _.counter -= _.cellsize;
            } else {
                value = env.next();
                for (i = 0; i < imax; ++i) {
                    cellL[i] *= value;
                    cellR[i] *= value;
                }
                _.counter -= 1;
            }

            fn.outputSignalAR(this);

            _.value = value;
        }

        return this;
    };

    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        var _ = this._;
        if (_.plotFlush) {
            var env  = new EnvelopeValue(128);
            var data = new Float32Array(128);
            var curve, i, imax;
            if (_.curve === "set") {
                for (i = 100, imax = data.length; i < imax; ++i) {
                    data[i] = 1;
                }
            } else {
                curve = Envelope.CurveTypeDict[_.curve];
                if (typeof curve === "undefined") {
                    env.setNext(1, 1000, Envelope.CurveTypeCurve, _.curve);
                } else {
                    env.setNext(1, 1000, curve);
                }

                for (i = 0, imax = data.length; i < imax; ++i) {
                    data[i] = env.next();
                }
            }
            _.plotData  = data;
            _.plotRange = [0, 1];
            _.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };

    fn.register("param", ParamNode);

})(timbre);
(function(T) {
    "use strict";

    var fn  = T.fn;
    var Biquad = T.modules.Biquad;

    function PhaserNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.freq = T("sin", {freq:1, add:1000, mul:250}).kr();
        _.Q    = T(1);
        _.allpass  = [];

        this.steps = 2;
    }
    fn.extend(PhaserNode);

    var $ = PhaserNode.prototype;

    Object.defineProperties($, {
        freq: {
            set: function(value) {
                this._.freq = value;
            },
            get: function() {
                return this._.freq;
            }
        },
        Q: {
            set: function(value) {
                this._.Q = T(value);
            },
            get: function() {
                return this._.Q;
            }
        },
        steps: {
            set: function(value) {
                if (typeof value === "number") {
                    value |= 0;
                    if (value === 2 || value === 4 || value === 8 || value === 12) {
                        var allpass = this._.allpass;
                        if (allpass.length < value) {
                            for (var i = allpass.length; i < value; ++i) {
                                allpass[i] = new Biquad(this._.samplerate);
                                allpass[i].setType("allpass");
                            }
                        }
                    }
                    this._.steps = value;
                }
            },
            get: function() {
                return this._.steps;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            if (!_.bypassed) {
                var cellL = this.cells[1];
                var cellR = this.cells[2];
                var freq  = _.freq.process(tickID).cells[0][0];
                var Q     = _.Q.process(tickID).cells[0][0];
                var steps = _.steps;
                var i;

                for (i = 0; i < steps; i += 2) {
                    _.allpass[i  ].setParams(freq, Q, 0);
                    _.allpass[i  ].process(cellL, cellR);
                    _.allpass[i+1].setParams(freq, Q, 0);
                    _.allpass[i+1].process(cellL, cellR);
                }
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("phaser", PhaserNode);

})(timbre);
(function(T) {
    "use strict";

    // Voss algorithm
    // http://www.firstpr.com.au/dsp/pink-noise/

    var MAX_KEY = 31;
    var fn = T.fn;

    function PinkNoiseNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var whites = new Uint8Array(5);
        for (var i = 0; i < 5; ++i) {
            whites[i] = ((Math.random() * (1<<30))|0) % 25;
        }
        this._.whites = whites;
        this._.key = 0;
    }
    fn.extend(PinkNoiseNode);

    var $ = PinkNoiseNode.prototype;

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var i, imax, j;
            var key = _.key, whites = _.whites;
            var mul = _.mul, add = _.add;
            var last_key, sum, diff;

            for (i = 0, imax = cell.length; i < imax; ++i) {
                last_key = key++;
                if (key > MAX_KEY) {
                    key = 0;
                }
                diff = last_key ^ key;
                for (j = sum = 0; j < 5; ++j) {
                    if (diff & (1 << j)) {
                        whites[j] = ((Math.random() * (1<<30))|0) % 25;
                    }
                    sum += whites[j];
                }
                cell[i] = ((sum * 0.01666666) - 1) * mul + add;
            }
            _.key = key;
        }
        return this;
    };

    fn.register("pink", PinkNoiseNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function PluckNode(_args) {
        T.Object.call(this, 1, _args);

        this._.freq   = 440;
        this._.buffer = null;
        this._.index  = 0;
    }
    fn.extend(PluckNode);

    var $ = PluckNode.prototype;

    Object.defineProperties($, {
        freq: {
            set: function(value) {
                if (typeof value === "number") {
                    if (value < 0) {
                        value = 0;
                    }
                    this._.freq = value;
                }
            },
            get: function() {
                return this._.freq;
            }
        }
    });

    $.bang = function() {
        var _ = this._;
        var freq   = _.freq;
        var size   = (_.samplerate / freq + 0.5)|0;
        var buffer = _.buffer = new fn.SignalArray(size);
        for (var i = 0; i < size; ++i) {
            buffer[i] = Math.random() * 2 - 1;
        }
        _.index = 0;
        _.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var buffer = _.buffer;
            if (buffer) {
                var bufferLength = buffer.length;
                var index = _.index, write;
                var mul = _.mul, add = _.add;
                var x, i, imax = cell.length;

                for (i = 0; i < imax; ++i) {
                    write = index;
                    x = buffer[index++];
                    if (index >= bufferLength) {
                        index = 0;
                    }
                    x = (x + buffer[index]) * 0.5;
                    buffer[write] = x;
                    cell[i] = x * mul + add;
                }
                _.index = index;
            }
        }

        return this;
    };

    fn.register("pluck", PluckNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;

    var STATUS_WAIT = 0;
    var STATUS_REC  = 1;

    function RecNode(_args) {
        T.Object.call(this, 1, _args);
        fn.listener(this);
        fn.fixAR(this);

        var _ = this._;
        _.timeout    = 5000;
        _.status     = STATUS_WAIT;
        _.writeIndex = 0;
        _.writeIndexIncr  = 1;
        _.currentTime     = 0;
        _.currentTimeIncr = 1000 / _.samplerate;
        _.onended = make_onended(this);
    }
    fn.extend(RecNode);

    var make_onended = function(self) {
        return function() {
            var _ = self._;

            var buffer = new fn.SignalArray(_.buffer.subarray(0, _.writeIndex|0));

            _.status      = STATUS_WAIT;
            _.writeIndex  = 0;
            _.currentTime = 0;

            _.emit("ended", {
                buffer:buffer, samplerate:_.samplerate
            });
        };
    };

    var $ = RecNode.prototype;

    Object.defineProperties($, {
        timeout: {
            set: function(value) {
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number" && value > 0) {
                    this._.timeout = value;
                }
            },
            get: function() {
                return this._.timeout;
            }
        },
        samplerate: {
            set: function(value) {
                if (typeof value === "number") {
                    if (0 < value && value <= this._.samplerate) {
                        this._.samplerate = value;
                    }
                }
            },
            get: function() {
                return this._.samplerate;
            }
        },
        currentTime: {
            get: function() {
                return this._.currentTime;
            }
        }
    });

    $.start = function() {
        var _ = this._, len;
        if (_.status === STATUS_WAIT) {
            len = (_.timeout * 0.01 * _.samplerate)|0;
            if (!_.buffer || _.buffer.length < len) {
                _.buffer = new fn.SignalArray(len);
            }
            _.writeIndex = 0;
            _.writeIndexIncr = _.samplerate / T.samplerate;
            _.currentTime = 0;
            _.status = STATUS_REC;
            _.emit("start");
            this.listen();
        }
        return this;
    };

    $.stop = function() {
        var _ = this._;
        if (_.status === STATUS_REC) {
            _.status = STATUS_WAIT;
            _.emit("stop");
            fn.nextTick(_.onended);
            this.unlisten();
        }
        return this;
    };

    $.bang = function() {
        if (this._.status === STATUS_WAIT) {
            this.srart();
        } else if (this._.status === STATUS_REC) {
            this.stop();
        }
        this._.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;
        var cell = this.cells[0];

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            if (_.status === STATUS_REC) {
                var i, imax = cell.length;
                var buffer  = _.buffer;
                var timeout = _.timeout;
                var writeIndex      = _.writeIndex;
                var writeIndexIncr  = _.writeIndexIncr;
                var currentTime     = _.currentTime;
                var currentTimeIncr = _.currentTimeIncr;

                for (i = 0; i < imax; ++i) {
                    buffer[writeIndex|0] = cell[i];
                    writeIndex += writeIndexIncr;

                    currentTime += currentTimeIncr;
                    if (timeout <= currentTime) {
                        fn.nextTick(_.onended);
                    }
                }
                _.writeIndex  = writeIndex;
                _.currentTime = currentTime;
            }

            fn.outputSignalAR(this);
        }
        return this;
    };

    fn.register("record", RecNode);
    fn.alias("rec", "record");

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var Reverb = T.modules.Reverb;

    function ReverbNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        this._.reverb = new Reverb(this._.samplerate, this._.cellsize);
    }
    fn.extend(ReverbNode);

    var $ = ReverbNode.prototype;

    Object.defineProperties($, {
        room: {
            set: function(value) {
                if (typeof value === "number") {
                    value = (value > 1) ? 1 : (value < 0) ? 0 : value;
                    this._.reverb.setRoomSize(value);
                }
            },
            get: function() {
                return this._.reverb.roomsize;
            }
        },
        damp: {
            set: function(value) {
                if (typeof value === "number") {
                    value = (value > 1) ? 1 : (value < 0) ? 0 : value;
                    this._.reverb.setDamp(value);
                }
            },
            get: function() {
                return this._.reverb.damp;
            }
        },
        mix: {
            set: function(value) {
                if (typeof value === "number") {
                    value = (value > 1) ? 1 : (value < 0) ? 0 : value;
                    this._.reverb.wet = value;
                }
            },
            get: function() {
                return this._.reverb.wet;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            if (!_.bypassed) {
                _.reverb.process(this.cells[1], this.cells[2]);
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("reverb", ReverbNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;

    function ScheduleNode(_args) {
        T.Object.call(this, 0, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        _.queue = [];
        _.currentTime = 0;
        _.maxRemain   = 1000;
    }
    fn.extend(ScheduleNode);

    var $ = ScheduleNode.prototype;

    Object.defineProperties($, {
        queue: {
            get: function() {
                return this._.queue;
            }
        },
        remain: {
            get: function() {
                return this._.queue.length;
            }
        },
        maxRemain: {
            set: function(value) {
                if (typeof value === "number" && value > 0) {
                    this._.maxRemain = value;
                }
            },
            get: function() {
                return this._.maxRemain;
            }
        },
        isEmpty: {
            get: function() {
                return this._.queue.length === 0;
            }
        },
        currentTime: {
            get: function() {
                return this._.currentTime;
            }
        }
    });

    $.sched = function(delta, item, args) {
        if (typeof delta === "string") {
            delta = timevalue(delta);
        }
        if (typeof delta === "number") {
            this.schedAbs(this._.currentTime + delta, item, args);
        }
        return this;
    };

    $.schedAbs = function(time, item, args) {
        if (typeof time === "string") {
            time = timevalue(time);
        }
        if (typeof time === "number") {
            var _ = this._;
            var queue = _.queue;
            if (queue.length >= _.maxRemain) {
                return this;
            }
            for (var i = queue.length; i--; ) {
                if (queue[i][0] < time) {
                    break;
                }
            }
            queue.splice(i + 1, 0, [time, T(item), args]);
        }
        return this;
    };

    $.advance = function(delta) {
        if (typeof delta === "string") {
            delta = timevalue(delta);
        }
        if (typeof delta === "number") {
            this._.currentTime += delta;
        }
        return this;
    };

    $.clear = function() {
        this._.queue.splice(0);
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var emit = null;
            var queue = _.queue;

            if (queue.length) {
                while (queue[0][0] < _.currentTime) {
                    var nextItem = _.queue.shift();
                    nextItem[1].bang(nextItem[2]);
                    emit = "sched";
                    if (queue.length === 0) {
                        emit = "empty";
                        break;
                    }
                }
            }
            _.currentTime += fn.currentTimeIncr;
            if (emit) {
                _.emit(emit);
            }
        }
        return this;
    };

    fn.register("schedule", ScheduleNode);
    fn.alias("sched", "schedule");

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;

    function ScopeNode(_args) {
        T.Object.call(this, 2, _args);
        fn.listener(this);
        fn.fixAR(this);

        var _ = this._;
        _.samples    = 0;
        _.writeIndex = 0;
        _.plotFlush = true;

        this.once("init", oninit);
    }
    fn.extend(ScopeNode);

    var oninit = function() {
        if (!this._.buffer) {
            this.size = 1024;
        }
        if (!this._.interval) {
            this.interval = 1000;
        }
    };

    var $ = ScopeNode.prototype;

    Object.defineProperties($, {
        size: {
            set: function(value) {
                var _ = this._;
                if (!_.buffer) {
                    if (typeof value === "number") {
                        var n = (value < 64) ? 64 : (value > 2048) ? 2048 : value;
                        _.buffer = new fn.SignalArray(n);
                        if (_.reservedinterval) {
                            this.interval = _.reservedinterval;
                            _.reservedinterval = null;
                        }
                    }
                }
            },
            get: function() {
                return this._.buffer.length;
            }
        },
        interval: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number" && value > 0) {
                    if (!_.buffer) {
                        _.reservedinterval = value;
                    } else {
                        _.interval    = value;
                        _.samplesIncr = value * 0.001 * _.samplerate / _.buffer.length;
                        if (_.samplesIncr < 1) {
                            _.samplesIncr = 1;
                        }
                    }
                }
            },
            get: function() {
                return this._.interval;
            }
        }
    });

    $.bang = function() {
        var _ = this._;
        var buffer = _.buffer;

        for (var i = 0, imax = buffer.length; i < imax; ++i) {
            buffer[i] = 0;
        }
        _.samples    = 0;
        _.writeIndex = 0;
        this._.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);
            fn.outputSignalAR(this);

            var cell = this.cells[0];
            var i, imax = _.cellsize;
            var samples     = _.samples;
            var samplesIncr = _.samplesIncr;
            var buffer      = _.buffer;
            var writeIndex  = _.writeIndex;
            var emit = false;
            var bufferlength = buffer.length;

            for (i = 0; i < imax; ++i) {
                if (samples <= 0) {
                    buffer[writeIndex++] = cell[i];
                    if (writeIndex >= bufferlength) {
                        writeIndex = 0;
                    }
                    emit = _.plotFlush = true;
                    samples += samplesIncr;
                }
                --samples;
            }
            _.samples    = samples;
            _.writeIndex = writeIndex;

            if (emit) {
                this._.emit("data");
            }
        }

        return this;
    };

    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        var _ = this._;
        if (_.plotFlush) {
            var buffer = _.buffer;
            var mask   = buffer.length - 1;
            var data   = new Float32Array(buffer.length);
            var j = _.writeIndex;
            for (var i = 0, imax = buffer.length; i < imax; i++) {
                data[i] = buffer[++j & mask];
            }
            _.plotData  = data;
            _.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };

    fn.register("scope", ScopeNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function ScriptProcessorNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.numberOfInputs = 0;
        _.numberOfOutputs = 0;
        _.bufferSize = 0;
        _.bufferMask = 0;
        _.duration   = 0;
        _.inputBufferL = null;
        _.inputBufferR = null;
        _.outputBufferL = null;
        _.outputBufferR = null;
        _.onaudioprocess = null;
        _.index = 0;
        this.once("init", oninit);
    }
    fn.extend(ScriptProcessorNode);

    var oninit = function() {
        var _ = this._;
        if (_.numberOfInputs === 0) {
            this.numberOfInputs = 1;
        }
        if (_.numberOfOutputs === 0) {
            this.numberOfOutputs = 1;
        }
        if (_.bufferSize === 0) {
            this.bufferSize = 1024;
        }
    };

    var $ = ScriptProcessorNode.prototype;

    Object.defineProperties($, {
        numberOfInputs: {
            set: function(value) {
                var _ = this._;
                if (_.numberOfInputs === 0) {
                    _.numberOfInputs = (value === 2) ? 2 : 1;
                }
            },
            get: function() {
                return this._.numberOfInputs;
            }
        },
        numberOfOutputs: {
            set: function(value) {
                var _ = this._;
                if (_.numberOfOutputs === 0) {
                    _.numberOfOutputs = (value === 2) ? 2 : 1;
                }
            },
            get: function() {
                return this._.numberOfOutputs;
            }
        },
        bufferSize: {
            set: function(value) {
                var _ = this._;
                if (_.bufferSize === 0) {
                    if ([256, 512, 1024, 2048, 4096, 8192, 16384].indexOf(value) !== -1) {
                        _.bufferSize = value;
                        _.bufferMask = value - 1;
                        _.duration = value / _.samplerate;
                        _.inputBufferL  = new fn.SignalArray(value);
                        _.inputBufferR  = new fn.SignalArray(value);
                        _.outputBufferL = new fn.SignalArray(value);
                        _.outputBufferR = new fn.SignalArray(value);
                    }
                }
            },
            get: function() {
                return this._.bufferSize;
            }
        },
        onaudioprocess: {
            set: function(value) {
                if (typeof value === "function") {
                    this._.onaudioprocess = value;
                }
            },
            get: function() {
                return this._.onaudioprocess;
            }
        }
    });

    function AudioBuffer(self, buffers) {
        this.samplerate = self._.samplerate;
        this.length     = self._.bufferSize;
        this.duration   = self._.duration;
        this.numberOfChannels = buffers.length;
        this.getChannelData = function(n) {
            return buffers[n];
        };
    }

    function AudioProcessingEvent(self) {
        var _ = self._;
        this.node = self;
        this.playbackTime = T.currentTime;
        if (_.numberOfInputs === 2) {
            this.inputBuffer  = new AudioBuffer(self, [_.inputBufferL, _.inputBufferR]);
        } else {
            this.inputBuffer  = new AudioBuffer(self, [_.inputBufferL]);
        }
        if (_.numberOfOutputs === 2) {
            this.outputBuffer = new AudioBuffer(self, [_.outputBufferL, _.outputBufferR]);
        } else {
            this.outputBuffer = new AudioBuffer(self, [_.outputBufferL]);
        }
    }

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var cellsize   = _.cellsize;
            var bufferMask = _.bufferMask;
            var begin = _.index;
            var end   = begin + cellsize;
            var buffer;
            var cellL  = this.cells[1];
            var cellR  = this.cells[2];

            fn.inputSignalAR(this);

            if (_.numberOfInputs === 2) {
                _.inputBufferL.set(cellL, begin);
                _.inputBufferR.set(cellR, begin);
            } else {
                buffer = _.inputBufferL;
                for (var i = 0; i < cellsize; i++) {
                    buffer[begin + i] = (cellL[i] + cellR[i]) * 0.5;
                }
            }

            cellL.set(_.outputBufferL.subarray(begin, end));
            cellR.set(_.outputBufferR.subarray(begin, end));

            _.index = end & bufferMask;

            if (_.index === 0 && _.onaudioprocess) {
                _.onaudioprocess(new AudioProcessingEvent(this));
                if (_.numberOfOutputs === 1) {
                    _.outputBufferR.set(_.outputBufferL);
                }
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("script", ScriptProcessorNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function SelectorNode(_args) {
        T.Object.call(this, 2, _args);

        this._.selected   = 0;
        this._.background = false;
    }
    fn.extend(SelectorNode);

    var $ = SelectorNode.prototype;

    Object.defineProperties($, {
        selected: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.selected = value;
                    this.cells[1].set(fn.emptycell);
                    this.cells[2].set(fn.emptycell);
                }
            },
            get: function() {
                return this._.selected;
            }
        },
        background: {
            set: function(value) {
                this._.background = !!value;
            },
            get: function() {
                return this._.background;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var nodes = this.nodes;
            var i, imax = nodes.length;

            if (_.background) {
                for (i = 0; i < imax; ++i) {
                    nodes[i].process(tickID);
                }
            }

            var tmp = nodes[_.selected];
            if (tmp) {
                if (!_.background) {
                    tmp.process(tickID);
                }
                this.cells[1].set(tmp.cells[1]);
                this.cells[2].set(tmp.cells[2]);
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("selector", SelectorNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;
    var FFT = T.modules.FFT;

    var WAIT_STATE = 0;
    var EXEC_STATE = 1;

    function SpectrumNode(_args) {
        T.Object.call(this, 2, _args);
        fn.listener(this);
        fn.fixAR(this);

        var _ = this._;
        _.status  = WAIT_STATE;
        _.samples = 0;
        _.samplesIncr = 0;
        _.writeIndex  = 0;

        _.plotFlush = true;
        _.plotRange = [0, 32];
        _.plotBarStyle = true;

        this.once("init", oninit);
    }
    fn.extend(SpectrumNode);

    var oninit = function() {
        var _ = this._;
        if (!_.fft) {
            this.size = 512;
        }
        if (!_.interval) {
            this.interval = 500;
        }
    };

    var $ = SpectrumNode.prototype;

    Object.defineProperties($, {
        size: {
            set: function(value) {
                var _ = this._;
                if (!_.fft) {
                    if (typeof value === "number") {
                        var n = (value < 256) ? 256 : (value > 2048) ? 2048 : value;
                        _.fft    = new FFT(n);
                        _.buffer = new fn.SignalArray(_.fft.length);
                        _.freqs  = new fn.SignalArray(_.fft.length>>1);
                        if (_.reservedwindow) {
                            _.fft.setWindow(_.reservedwindow);
                            _.reservedwindow = null;
                        }
                        if (_.reservedinterval) {
                            this.interval = _.reservedinterval;
                            _.reservedinterval = null;
                        }
                    }
                }
            },
            get: function() {
                return this._.buffer.length;
            }
        },
        window: {
            set: function(value) {
                this._.fft.setWindow(value);
            },
            get: function() {
                return this._.fft.windowName;
            }
        },
        interval: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number" && value > 0) {
                    if (!_.buffer) {
                        _.reservedinterval = value;
                    } else {
                        _.interval = value;
                        _.samplesIncr = (value * 0.001 * _.samplerate);
                        if (_.samplesIncr < _.buffer.length) {
                            _.samplesIncr = _.buffer.length;
                            _.interval = _.samplesIncr * 1000 / _.samplerate;
                        }
                    }
                }
            },
            get: function() {
                return this._.interval;
            }
        },
        spectrum: {
            get: function() {
                return this._.fft.getFrequencyData(this._.freqs);
            }
        },
        real: {
            get: function() {
                return this._.fft.real;
            }
        },
        imag: {
            get: function() {
                return this._.fft.imag;
            }
        }
    });

    $.bang = function() {
        this._.samples    = 0;
        this._.writeIndex = 0;
        this._.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);
            fn.outputSignalAR(this);

            var cell = this.cells[0];
            var i, imax = cell.length;
            var status  = _.status;
            var samples = _.samples;
            var samplesIncr = _.samplesIncr;
            var writeIndex  = _.writeIndex;
            var buffer = _.buffer;
            var bufferLength = buffer.length;
            var emit;

            for (i = 0; i < imax; ++i) {
                if (samples <= 0) {
                    if (status === WAIT_STATE) {
                        status = EXEC_STATE;
                        writeIndex = 0;
                        samples += samplesIncr;
                    }
                }
                if (status === EXEC_STATE) {
                    buffer[writeIndex++] = cell[i];
                    if (bufferLength <= writeIndex) {
                        _.fft.forward(buffer);
                        emit = _.plotFlush = true;
                        status = WAIT_STATE;
                    }
                }
                --samples;
            }

            _.samples = samples;
            _.status  = status;
            _.writeIndex = writeIndex;

            if (emit) {
                this._.emit("data");
            }
        }
        return this;
    };

    var super_plot = T.Object.prototype.plot;

    $.plot = function(opts) {
        if (this._.plotFlush) {
            this._.plotData  = this.spectrum;
            this._.plotFlush = null;
        }
        return super_plot.call(this, opts);
    };

    fn.register("spectrum", SpectrumNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function SubtractNode(_args) {
        T.Object.call(this, 2, _args);
        this._.ar = false;
    }
    fn.extend(SubtractNode);

    var $ = SubtractNode.prototype;

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var nodes = this.nodes;
            var cell  = this.cells[0];
            var cellL = this.cells[1];
            var cellR = this.cells[2];
            var i, imax = nodes.length;
            var j, jmax = cell.length;
            var tmp, tmpL, tmpR;

            if (_.ar) {
                if (nodes.length > 0) {
                    nodes[0].process(tickID);
                    tmpL = nodes[0].cells[1];
                    tmpR = nodes[0].cells[2];
                    cellL.set(tmpL);
                    cellR.set(tmpR);
                    for (i = 1; i < imax; ++i) {
                        nodes[i].process(tickID);
                        tmpL = nodes[i].cells[1];
                        tmpR = nodes[i].cells[2];
                        for (j = 0; j < jmax; ++j) {
                            cellL[j] -= tmpL[j];
                            cellR[j] -= tmpR[j];
                        }
                    }
                } else {
                    for (j = 0; j < jmax; ++j) {
                        cellL[j] = cellR[i] = 0;
                    }
                }
                fn.outputSignalAR(this);
            } else {
                if (nodes.length > 0) {
                    tmp = nodes[0].process(tickID).cells[0][0];
                    for (i = 1; i < imax; ++i) {
                        tmp -= nodes[i].process(tickID).cells[0][0];
                    }
                } else {
                    tmp = 0;
                }
                cell[0] = tmp;
                fn.outputSignalKR(this);
            }
        }

        return this;
    };

    fn.register("-", SubtractNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function SynthDefNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        this.playbackState = fn.FINISHED_STATE;
        _.poly     = 4;
        _.genList  = [];
        _.genDict  = {};
        _.synthdef = null;
        _.remGen = make_remGen(this);
        _.onended = fn.make_onended(this);
    }
    fn.extend(SynthDefNode);

    var $ = SynthDefNode.prototype;

    Object.defineProperties($, {
        def: {
            set: function(value) {
                if (typeof value === "function") {
                    this._.synthdef = value;
                }
            },
            get: function() {
                return this._.synthdef;
            }
        },
        poly: {
            set: function(value) {
                if (typeof value === "number") {
                    if (0 < value && value <= 64) {
                        this._.poly = value;
                    }
                }
            },
            get: function() {
                return this._.poly;
            }
        }
    });

    var make_doneAction = function(self, opts) {
        return function() {
            self._.remGen(opts.gen);
        };
    };

    var make_remGen = function(self) {
        return function(gen) {
            var _ = self._;
            var i = _.genList.indexOf(gen);
            if (i !== -1) {
                _.genList.splice(i, 1);
            }
            if (typeof gen.noteNum !== "undefined") {
                _.genDict[gen.noteNum] = null;
            }
        };
    };

    var noteOn = function(noteNum, freq, velocity, _opts) {
        velocity |= 0;
        if (velocity <= 0) {
            this.noteOff(this, noteNum);
        } else if (velocity > 127) {
            velocity = 127;
        }
        var _ = this._;
        var list = _.genList, dict = _.genDict;
        var gen = dict[noteNum];
        if (gen) {
            _.remGen(gen);
        }

        var opts = {
            freq    : freq,
            noteNum : noteNum,
            velocity: velocity,
            mul     : velocity * 0.0078125
        };
        if (_opts) {
            for (var key in _opts) {
                opts[key] = _opts[key];
            }
        }
        opts.doneAction = make_doneAction(this, opts);

        gen = _.synthdef.call(this, opts);

        if (gen instanceof T.Object) {
            gen.noteNum = noteNum;
            list.push(gen);
            dict[noteNum] = opts.gen = gen;

            this.playbackState = fn.PLAYING_STATE;

            if (list.length > _.poly) {
                _.remGen(list[0]);
            }
        }
    };

    var midicps = (function() {
        var table = new Float32Array(128);
        for (var i = 0; i < 128; ++i) {
            table[i] = 440 * Math.pow(2, (i - 69) * 1 / 12);
        }
        return table;
    })();

    var cpsmidi = function(cps) {
        if (cps > 0) {
            return Math.log(cps * 1 / 440) * Math.LOG2E * 12 + 69;
        } else {
            return 0;
        }
    };

    $.noteOn = function(noteNum, velocity, _opts) {
        var freq = midicps[noteNum] || (440 * Math.pow(2, (noteNum - 69) / 12));
        noteOn.call(this, (noteNum + 0.5)|0, freq, velocity, _opts);
        return this;
    };

    $.noteOff = function(noteNum) {
        var gen = this._.genDict[noteNum];
        if (gen && gen.release) {
            gen.release();
        }
        return this;
    };

    $.noteOnWithFreq = function(freq, velocity, _opts) {
        var noteNum = cpsmidi(freq);
        noteOn.call(this, (noteNum + 0.5)|0, freq, velocity, _opts);
        return this;
    };

    $.noteOffWithFreq = function(freq) {
        var noteNum = cpsmidi(freq);
        return this.noteOff((noteNum + 0.5)|0);
    };

    $.allNoteOff = function() {
        var list = this._.genList;
        for (var i = 0, imax = list.length; i < imax; ++i) {
            if (list[i].release) {
                list[i].release();
            }
        }
    };

    $.allSoundOff = function() {
        var _ = this._;
        var list = _.genList;
        var dict = _.genDict;
        while (list.length) {
            delete dict[list.shift().noteNum];
        }
    };

    $.synth = function(_opts) {
        var _ = this._;
        var list = _.genList;
        var gen, opts = {};

        if (_opts) {
            for (var key in _opts) {
                opts[key] = _opts[key];
            }
        }
        opts.doneAction = make_doneAction(this, opts);

        gen = _.synthdef.call(this, opts);

        if (gen instanceof T.Object) {
            list.push(gen);
            opts.gen = gen;
            this.playbackState = fn.PLAYING_STATE;

            if (list.length > _.poly) {
                _.remGen(list[0]);
            }
        }

        return this;
    };

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            if (this.playbackState === fn.PLAYING_STATE) {
                var list = _.genList;
                var gen;
                var cellL = this.cells[1];
                var cellR = this.cells[2];
                var i, imax;
                var j, jmax = cell.length;
                var tmpL, tmpR;

                if (list.length) {
                    gen = list[0];
                    gen.process(tickID);
                    cellL.set(gen.cells[1]);
                    cellR.set(gen.cells[2]);
                    for (i = 1, imax = list.length; i < imax; ++i) {
                        gen = list[i];
                        gen.process(tickID);
                        tmpL = gen.cells[1];
                        tmpR = gen.cells[2];
                        for (j = 0; j < jmax; ++j) {
                            cellL[j] += tmpL[j];
                            cellR[j] += tmpR[j];
                        }
                    }
                } else {
                    fn.nextTick(_.onended);
                }
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("SynthDef", SynthDefNode);


    var env_desc = {
        set: function(value) {
            if (fn.isDictionary(value)) {
                if (typeof value.type === "string") {
                    this._.env = value;
                }
            } else if (value instanceof T.Object) {
                this._.env = value;
            }
        },
        get: function() {
            return this._.env;
        }
    };

    fn.register("OscGen", (function() {

        var osc_desc = {
            set: function(value) {
                if (value instanceof T.Object) {
                    this._.osc = value;
                }
            },
            get: function() {
                return this._.osc;
            }
        };

        var wave_desc = {
            set: function(value) {
                if (typeof value === "string") {
                    this._.wave = value;
                }
            },
            get: function() {
                return this._.wave;
            }
        };

        var synthdef = function(opts) {
            var _ = this._;
            var synth, osc, env, envtype;

            osc = _.osc || null;
            env = _.env || {};
            envtype = env.type || "perc";

            if (osc instanceof T.Object) {
                if (typeof osc.clone === "function") {
                    osc = osc.clone();
                }
            }
            if (!osc) {
                osc = T("osc", {wave:_.wave});
            }
            osc.freq = opts.freq;
            osc.mul  = osc.mul * opts.velocity/128;

            synth = osc;
            if (env instanceof T.Object) {
                if (typeof env.clone === "function") {
                    synth = env.clone().append(synth);
                }
            } else {
                synth = T(envtype, env, synth);
            }
            synth.on("ended", opts.doneAction).bang();

            return synth;
        };

        return function(_args) {
            var instance = new SynthDefNode(_args);

            instance._.wave = "sin";

            Object.defineProperties(instance, {
                env: env_desc, osc: osc_desc, wave: wave_desc
            });

            instance.def = synthdef;

            return instance;
        };
    })());

    fn.register("PluckGen", (function() {

        var synthdef = function(opts) {
            var _ = this._;
            var synth, env, envtype;

            env = _.env || {};
            envtype = env.type || "perc";

            synth = T("pluck", {freq:opts.freq, mul:opts.velocity/128}).bang();
            if (env instanceof T.Object) {
                if (typeof env.clone === "function") {
                    synth = env.clone().append(synth);
                }
            } else {
                synth = T(envtype, env, synth);
            }
            synth.on("ended", opts.doneAction).bang();

            return synth;
        };

        return function(_args) {
            var instance = new SynthDefNode(_args);

            Object.defineProperties(instance, {
                env: env_desc
            });

            instance.def = synthdef;

            return instance;
        };
    })());

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var Scissor    = T.modules.Scissor;
    var Tape       = Scissor.Tape;
    var TapeStream = Scissor.TapeStream;
    var isSignalArray = fn.isSignalArray;

    function ScissorNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.isLooped = false;
        _.onended  = fn.make_onended(this, 0);
    }
    fn.extend(ScissorNode);

    var $ = ScissorNode.prototype;

    Object.defineProperties($, {
        tape: {
            set: function(tape) {
                if (tape instanceof Tape) {
                    this.playbackState = fn.PLAYING_STATE;
                    this._.tape = tape;
                    this._.tapeStream = new TapeStream(tape, this._.samplerate);
                    this._.tapeStream.isLooped = this._.isLooped;
                } else {
                    if (tape instanceof T.Object) {
                        if (tape.buffer) {
                            tape = tape.buffer;
                        }
                    }
                    if (typeof tape === "object") {
                        if (Array.isArray(tape.buffer) && isSignalArray(tape.buffer[0])) {
                            this.playbackState = fn.PLAYING_STATE;
                            this._.tape = new Scissor(tape);
                            this._.tapeStream = new TapeStream(this._.tape, this._.samplerate);
                            this._.tapeStream.isLooped = this._.isLooped;
                        }
                    }
                }
            },
            get: function() {
                return this._.tape;
            }
        },
        isLooped: {
            get: function() {
                return this._.isLooped;
            }
        },
        buffer: {
            get: function() {
                if (this._.tape) {
                    return this._.tape.getBuffer();
                }
            }
        }
    });

    $.loop = function(value) {
        this._.isLooped = !!value;
        if (this._.tapeStream) {
            this._.tapeStream.isLooped = this._.isLooped;
        }
        return this;
    };

    $.bang = function() {
        this.playbackState = fn.PLAYING_STATE;
        if (this._.tapeStream) {
            this._.tapeStream.reset();
        }
        this._.emit("bang");
        return this;
    };

    $.getBuffer = function() {
        if (this._.tape) {
            return this._.tape.getBuffer();
        }
    };

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var tapeStream = _.tapeStream;

            if (tapeStream) {
                var cellL = this.cells[1];
                var cellR = this.cells[2];
                var tmp  = tapeStream.fetch(cellL.length);
                cellL.set(tmp[0]);
                cellR.set(tmp[1]);
                if (this.playbackState === fn.PLAYING_STATE && tapeStream.isEnded) {
                    fn.nextTick(_.onended);
                }
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("tape", ScissorNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;
    var FunctionWrapper = T(function(){}).constructor;

    function TaskNode(_args) {
        T.Object.call(this, 1, _args);
        fn.timer(this);

        var _ = this._;
        this.playbackState = fn.FINISHED_STATE;
        _.task = [];
        _.i     = 0;
        _.j     = 0;
        _.imax  = 0;
        _.jmax  = 0;
        _.wait  = 0;
        _.count = 0;
        _.args  = {};
        _.doNum = 1;
        _.initFunc = fn.nop;
        _.onended = make_onended(this);

        this.on("start", onstart);
    }
    fn.extend(TaskNode);

    var onstart = function() {
        var _ = this._, args;
        this.playbackState = fn.PLAYING_STATE;
        _.task = this.nodes.map(function(x) {
            return x instanceof FunctionWrapper ? x.func : false;
        }).filter(function(x) {
            return !!x;
        });
        _.i = _.j = 0;
        _.imax = _.doNum;
        _.jmax = _.task.length;
        args = _.initFunc();
        if (!fn.isDictionary(args)) {
            args = {param:args};
        }
        _.args = args;
    };

    var make_onended = function(self) {
        return function() {
            self.playbackState = fn.FINISHED_STATE;
            var _ = self._;
            var cell  = self.cells[0];
            var cellL = self.cells[1];
            var cellR = self.cells[2];
            var lastValue = _.args;
            if (typeof lastValue === "number") {
                for (var i = 0, imax = cellL.length; i < imax; ++i) {
                    cell[0] = cellL[i] = cellR[i] = lastValue;
                }
            }
            _.emit("ended", _.args);
        };
    };

    var $ = TaskNode.prototype;

    Object.defineProperties($, {
        "do": {
            set: function(value) {
                if (typeof value === "number" && value > 0) {
                    this._.doNum = value === Infinity ? Infinity : value|0;
                }
            },
            get: function() {
                return this._.doNum;
            }
        },
        init: {
            set: function(value) {
                if (typeof value === "function") {
                    this._.initFunc = value;
                }
            },
            get: function() {
                return this._.initFunc;
            }
        }
    });

    $.bang = function() {
        var _ = this._;
        _.count  = 0;
        _.emit("bang");
        return this;
    };

    $.wait = function(time) {
        if (typeof time === "string") {
            time = timevalue(time);
        }
        if (typeof time === "number" && time > 0) {
            this._.count += (this._.samplerate * time * 0.001)|0;
        }
        return this;
    };

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;
        var args, func;

        if (this.tickID !== tickID) {
            this.tickID = tickID;
            if (_.i < _.imax) {
                while (_.count <= 0) {
                    if (_.j >= _.jmax) {
                        ++_.i;
                        if (_.i >= _.imax) {
                            fn.nextTick(_.onended);
                            break;
                        }
                        _.j = 0;
                    }
                    func = _.task[_.j++];
                    if (func) {
                        func.call(this, _.i, _.args);
                    }
                }
                _.count -= cell.length;
            }
        }

        return this;
    };

    fn.register("task", TaskNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;
    var timevalue = T.timevalue;

    function TimeoutNode(_args) {
        T.Object.call(this, 0, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        this.playbackState = fn.FINISHED_STATE;
        _.currentTime = 0;
        _.samplesMax = 0;
        _.samples    = 0;
        _.onended = fn.make_onended(this);

        this.once("init", oninit);
        this.on("start", onstart);
    }

    fn.extend(TimeoutNode);

    var oninit = function() {
        if (!this._.timeout) {
            this.timeout = 1000;
        }
    };

    var onstart = function() {
        this.playbackState = fn.PLAYING_STATE;
    };
    Object.defineProperty(onstart, "unremovable", {
        value:true, writable:false
    });

    var $ = TimeoutNode.prototype;

    Object.defineProperties($, {
        timeout: {
            set: function(value) {
                var _ = this._;
                if (typeof value === "string") {
                    value = timevalue(value);
                }
                if (typeof value === "number" && value >= 0) {
                    this.playbackState = fn.PLAYING_STATE;
                    _.timeout = value;
                    _.samplesMax = (_.samplerate * (value * 0.001))|0;
                    _.samples = _.samplesMax;
                }
            },
            get: function() {
                return this._.timeout;
            }
        },
        currentTime: {
            get: function() {
                return this._.currentTime;
            }
        }
    });

    $.bang = function() {
        var _ = this._;
        this.playbackState = fn.PLAYING_STATE;
        _.samples = _.samplesMax;
        _.currentTime = 0;
        _.emit("bang");
        return this;
    };

    $.process = function(tickID) {
        var cell = this.cells[0];
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            if (_.samples > 0) {
                _.samples -= cell.length;
            }

            if (_.samples <= 0) {
                var nodes = this.nodes;
                for (var i = 0, imax = nodes.length; i < imax; ++i) {
                    nodes[i].bang();
                }
                fn.nextTick(_.onended);
            }
            _.currentTime += fn.currentTimeIncr;
        }
        return this;
    };

    fn.register("timeout", TimeoutNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function WaveShaperNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        this._.curve = null;
    }
    fn.extend(WaveShaperNode);

    var $ = WaveShaperNode.prototype;

    Object.defineProperties($, {
        curve: {
            set: function(value) {
                if (fn.isSignalArray(value)) {
                    this._.curve = value;
                }
            },
            get: function() {
                return this._.curve;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            fn.inputSignalAR(this);

            if (_.curve) {
                var cell = this.cells[0];
                var curve = _.curve;
                var len    = curve.length;
                var x, i, imax = _.cellsize;
                for (i = 0; i < imax; ++i) {
                    x = (((cell[i] + 1) * 0.5) * len + 0.5)|0;
                    if (x < 0) {
                        x = 0;
                    } else if (x >= len - 1) {
                        x = len - 1;
                    }
                    cell[i] = curve[x];
                }
            }

            fn.outputSignalAR(this);
        }

        return this;
    };

    fn.register("waveshaper", WaveShaperNode);

})(timbre);
(function(T) {
    "use strict";

    var fn = T.fn;

    function ZMapNode(_args) {
        T.Object.call(this, 1, _args);

        var _ = this._;
        _.inMin  = 0;
        _.inMax  = 1;
        _.outMin = 0;
        _.outMax = 1;
        _.ar     = false;

        this.once("init", oninit);
    }
    fn.extend(ZMapNode);

    var oninit = function() {
        if (!this._.warp) {
            this.warp = "linlin";
        }
    };

    var $ = ZMapNode.prototype;

    Object.defineProperties($, {
        inMin: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.inMin = value;
                }
            },
            get: function() {
                return this._.inMin;
            }
        },
        inMax: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.inMax = value;
                }
            },
            get: function() {
                return this._.inMax;
            }
        },
        outMin: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.outMin = value;
                }
            },
            get: function() {
                return this._.outMin;
            }
        },
        outMax: {
            set: function(value) {
                if (typeof value === "number") {
                    this._.outMax = value;
                }
            },
            get: function() {
                return this._.outMax;
            }
        },
        warp: {
            set: function(value) {
                if (typeof value === "string") {
                    var f = WarpFunctions[value];
                    if (f) {
                        this._.warp = f;
                        this._.warpName = value;
                    }
                }
            },
            get: function() {
                return this._.warpName;
            }
        }
    });

    $.process = function(tickID) {
        var _ = this._;
        var cell = this.cells[0];

        if (this.tickID !== tickID) {
            this.tickID = tickID;

            var inMin  = _.inMin, inMax   = _.inMax;
            var outMin = _.outMin, outMax = _.outMax;
            var warp   = _.warp;

            var len = this.nodes.length;
            var mul = _.mul, add = _.add;
            var i, imax = cell.length;

            if (_.ar && len) {
                fn.inputSignalAR(this);
                for (i = 0; i < imax; ++i) {
                    cell[i] = warp(cell[i], inMin, inMax, outMin, outMax) * mul + add;
                }
                fn.outputSignalAR(this);
            } else {
                var input = (this.nodes.length) ? fn.inputSignalKR(this) : 0;
                var value = warp(input, inMin, inMax, outMin, outMax) * mul + add;
                for (i = 0; i < imax; ++i) {
                    cell[i] = value;
                }
            }
        }

        return this;
    };

    var WarpFunctions = {
        linlin: function(x, inMin, inMax, outMin, outMax) {
            if (x < inMin) {
                return outMin;
            } else if (x > inMax) {
                return outMax;
            }
            if (inMax === inMin) {
                return outMin;
            }
            return (x-inMin) / (inMax-inMin) * (outMax-outMin) + outMin;
        },
        linexp: function(x, inMin, inMax, outMin, outMax) {
            if (x < inMin) {
                return outMin;
            } else if (x > inMax) {
                return outMax;
            }
            if (outMin === 0) {
                return 0;
            }
            if (inMax === inMin) {
                return outMax;
            }
            return Math.pow(outMax/outMin, (x-inMin)/(inMax-inMin)) * outMin;
        },
        explin: function(x, inMin, inMax, outMin, outMax) {
            if (x < inMin) {
                return outMin;
            } else if (x > inMax) {
                return outMax;
            }
            if (inMin === 0) {
                return outMax;
            }
            return Math.log(x/inMin) / Math.log(inMax/inMin) * (outMax-outMin) + outMin;
        },
        expexp: function(x, inMin, inMax, outMin, outMax) {
            if (x < inMin) {
                return outMin;
            } else if (x > inMax) {
                return outMax;
            }
            if (inMin === 0 || outMin === 0) {
                return 0;
            }
            return Math.pow(outMax/outMin, Math.log(x/inMin) / Math.log(inMax/inMin)) * outMin;
        }
    };

    fn.register("zmap", ZMapNode);

})(timbre);
(function(T) {
    "use strict";

    if (T.env !== "webkit") {
        return;
    }

    var fn = T.fn;
    var context = fn._audioContext;
    var BUFFERSIZE = 1024;

    function WebAudioAPINode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.mode = "";
        _.bufferL = new fn.SignalArray(BUFFERSIZE << 2);
        _.bufferR = new fn.SignalArray(BUFFERSIZE << 2);
        _.buffermask = _.bufferL.length - 1;
        _.node   = null;
        _.script = context.createJavaScriptNode(BUFFERSIZE, 2, 2);
        _.writeIndex = 0;
        _.readIndex  = 0;
        _.totalRead  = 0;
        _.totalWrite = 0;
    }
    fn.extend(WebAudioAPINode);

    var $ = WebAudioAPINode.prototype;

    Object.defineProperties($, {
        context: {
            get: function() {
                return context;
            }
        },
        mode: {
            get: function() {
                return this._.mode;
            }
        }
    });

    $.cancel = function() {
        var _ = this._;
        var cell = this.cells[0];
        for (var i = 0, imax = cell.length; i < imax; ++i) {
            cell[i] = 0;
        }
        _.node = null;
    };

    (function() {
        function WebAudioAPIRecvNode(_args) {
            WebAudioAPINode.call(this, _args);

            var _ = this._;
            _.mode = "recv";
            _.script.onaudioprocess = make_recv_process(this);
            _.gain = context.createGainNode();
            _.gain.gain.value = 0;
            _.script.connect(_.gain);
        }
        fn.extend(WebAudioAPIRecvNode, WebAudioAPINode);

        var make_recv_process = function(self) {
            return function(e) {
                var _ = self._;
                var ins = e.inputBuffer;
                var inputL = ins.getChannelData(0);
                var inputR = ins.getChannelData(1);
                var length = ins.length;
                var writeIndex = _.writeIndex;
                _.bufferL.set(inputL, writeIndex);
                _.bufferR.set(inputR, writeIndex);
                _.writeIndex = (writeIndex + length) & _.buffermask;
                _.totalWrite += length;
            };
        };

        var $ = WebAudioAPIRecvNode.prototype;

        $.cancel = function() {
            WebAudioAPINode.prototype.cancel.call(this);
            this._.gain.disconnect();
            if(this._.node) {
                this._.node.disconnect();
            }
        };

        $.recv = function(node) {
            var _ = this._;
            try {
                _.node = node;
                _.node.connect(_.script);
                _.gain.connect(context.destination);
            } catch(e) {
                _.node = null;
            }
            _.writeIndex = 0;
            _.readIndex  = 0;
            _.totalWrite = 0;
            _.totalRead  = 0;
            return this;
        };

        $.process = function(tickID) {
            var _ = this._;

            if (_.node === null) {
                return this;
            }

            if (this.tickID !== tickID) {
                this.tickID = tickID;

                var cellsize = _.cellsize;
                var bufferL = _.bufferL;
                var bufferR = _.bufferR;

                if (_.totalWrite > _.totalRead + cellsize) {
                    var begin = _.readIndex;
                    var end = begin + cellsize;
                    this.cells[1].set(bufferL.subarray(begin, end));
                    this.cells[2].set(bufferR.subarray(begin, end));
                    _.readIndex = end & _.buffermask;
                    _.totalRead += cellsize;
                }
                fn.outputSignalAR(this);
            }
            return this;
        };

        fn.register("WebAudioAPI:recv", WebAudioAPIRecvNode);
    })();

    (function() {
        function WebAudioAPISendNode(_args) {
            WebAudioAPINode.call(this, _args);
            fn.listener(this);

            var _ = this._;
            _.mode = "send";
            _.script.onaudioprocess = make_send_process(this);
            _.connectIndex = null;
        }
        fn.extend(WebAudioAPISendNode, WebAudioAPINode);

        var make_send_process = function(self) {
            return function(e) {
                var _ = self._;
                var outs = e.outputBuffer;
                var length  = outs.length;

                if (_.totalWrite > _.totalRead + length) {
                    var begin = _.readIndex;
                    var end = begin + length;
                    outs.getChannelData(0).set(_.bufferL.subarray(begin, end));
                    outs.getChannelData(1).set(_.bufferR.subarray(begin, end));
                    _.readIndex = end & _.buffermask;
                    _.totalRead += length;
                }
            };
        };

        var $ = WebAudioAPISendNode.prototype;

        $.cancel = function() {
            WebAudioAPINode.prototype.cancel.call(this);
            var _ = this._;
            if (_.connectIndex !== null) {
                _.script.disconnect(_.connectIndex);
            } else {
                _.script.disconnect();
            }
            this.unlisten();
        };

        $.send = function(node, index) {
            var _ = this._;
            try {
                _.node = node;
                if (typeof index === "number") {
                    _.script.connect(_.node, index);
                    _.connectIndex = index;
                } else {
                    _.script.connect(_.node);
                    _.connectIndex = null;
                }
                this.listen();
            } catch(e) {
                _.node = null;
            }
            _.writeIndex = 0;
            _.readIndex  = 0;
            _.totalWrite = 0;
            _.totalRead  = 0;
            return this;
        };

        $.process = function(tickID) {
            var _ = this._;

            if (_.script === null) {
                return this;
            }

            if (this.tickID !== tickID) {
                this.tickID = tickID;

                var cellL = this.cells[1];
                var cellR = this.cells[2];
                var cellsize = _.cellsize;
                var writeIndex = _.writeIndex;

                fn.inputSignalAR(this);

                _.bufferL.set(cellL, writeIndex);
                _.bufferR.set(cellR, writeIndex);
                _.writeIndex = (writeIndex + cellsize) & _.buffermask;
                _.totalWrite += cellsize;

                fn.outputSignalAR(this);
            }
            return this;
        };

        fn.register("WebAudioAPI:send", WebAudioAPISendNode);
    })();

})(timbre);
var context = new webkitAudioContext();
var oscillator, gain;
var now = context.currentTime;
var oscillatorCounter = 0;

function startOsc(frequency){ // Frequency is passed to this function from input button

    // Create OscillatorNode
    oscillator = context.createOscillator(); // Create sound source
    oscillator.type = 0; // Sine wave
    oscillator.frequency.value = frequency; // Frequency in hertz (passed from input button)
    oscillator.noteOn(now); // Play oscillator instantly

    // Create GainNode
    gain = context.createGainNode(); // Create gain node
    gain.gain.value = .5; // Set gain to full volume

    // Connect the Nodes
    oscillator.connect(gain); // Connect oscillator to gain
    gain.connect(context.destination); // Connect gain to output
    oscillatorCounter++;
};


function off() {
    setTimeout(function(){
    	oscillator.noteOff(now);
		oscillator.disconnect();
    }, 200);
};

var api = T("WebAudioAPI:recv");
var context = api.context;
var synth = T("+sin", {freq:2, mul:0.5}, api);

var send = T("WebAudioAPI:send", synth).send(context.destination);

timbre.once("reset", function() {
  send.cancel();
});

var A = T("sin", {freq:220, mul:.5});
var B = T("sin", {freq:246.942, mul:.5});
var cSharp = T("sin", {freq:277.183, mul:.5});
var D = T("sin", {freq:293.665, mul:.5});
var E = T("sin", {freq:329.628, mul:.5});
var fSharp = T("sin", {freq:369.994, mul:.5});
var gSharp = T("sin", {freq:415.305, mul:.5});
var highA = T("sin", {freq:440, mul:.5});

$(document).ready(function(){
	$("#1").on('mousedown', function(event){
		startOsc(220);
	});
	$("#1").on('mouseup', function(event){
		off();
	});
	$("#2").on('click', function(){
		T("perc", {r:1000}, B).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#3").on('click', function(){
		T("perc", {r:1000}, cSharp).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#4").on('click', function(){
		T("perc", {r:1000}, D).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#5").on('click', function(){
		T("perc", {r:1000}, E).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#6").on('click', function(){
		T("perc", {r:1000}, fSharp).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#7").on('click', function(){
		T("perc", {r:1000}, gSharp).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#8").on('click', function(){
		T("perc", {r:1000}, highA).on("ended", function(){
			this.pause();
		}).bang().play();
	});
});


$(document).ready(function(){

  // $("#bpm-submit").on("click", function(){
  //   bpm = $("#bpm").val();
  // })

  function metronomeTick() {
   $("#m1").animate( {borderWidth: "5px"}, 1000*60/120, function()
    $("#m1").animate( {borderWidth: "1px"} );
    // T("perc", {r:1000}, A).on("ended", function() {
    //   this.pause();
    // }).bang().play();
    metronomeTick();
   });
  }

  metronomeTick();

});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//





;
