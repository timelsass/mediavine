( function() {
	var menu = document.querySelector( '.menu' ),
		toggle = document.querySelector( '.menu-toggle-wrapper' );

	function toggleToggle() {
		toggle.querySelector( '.menu-toggle' ).classList.toggle( 'menu-open' );
	};

	function toggleMenu() {
		menu.classList.toggle( 'active' );
	};
	
	if ( menu !== null ) {
		toggle.addEventListener( 'click', toggleToggle, false );
		toggle.addEventListener( 'click', toggleMenu, false );
	}

	var $el = document.querySelector( '.resizable' );
	var $main = document.getElementById( 'main' );
	
	if ( $el !== null ) {
		var elHeight = $el.offsetHeight;
		var elWidth = $el.offsetWidth;
	
		function adjustWindowSize() {
			scale = Math.min(
				parseFloat( getComputedStyle( $main, null ).width.replace( 'px', '' ) ) / elWidth,    
				parseFloat( getComputedStyle( $main, null ).height.replace( 'px', '' ) )  / elHeight
			);
	
			scale = scale > 1 ? 1 : scale;
	
			$el.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
		}
	
		adjustWindowSize();
		window.addEventListener( 'resize', adjustWindowSize );
	}
} )();
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
	  define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	  factory(exports, module);
	} else {
	  var mod = {
		exports: {}
	  };
	  factory(mod.exports, mod);
	  global.fetchJsonp = mod.exports;
	}
  })(this, function (exports, module) {
	'use strict';
  
	var defaultOptions = {
	  timeout: 5000,
	  jsonpCallback: 'callback',
	  jsonpCallbackFunction: null
	};
  
	function generateCallbackFunction() {
	  return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
	}
  
	function clearFunction(functionName) {
	  // IE8 throws an exception when you try to delete a property on window
	  // http://stackoverflow.com/a/1824228/751089
	  try {
		delete window[functionName];
	  } catch (e) {
		window[functionName] = undefined;
	  }
	}
  
	function removeScript(scriptId) {
	  var script = document.getElementById(scriptId);
	  if (script) {
		document.getElementsByTagName('head')[0].removeChild(script);
	  }
	}
  
	function fetchJsonp(_url) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
	  // to avoid param reassign
	  var url = _url;
	  var timeout = options.timeout || defaultOptions.timeout;
	  var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;
  
	  var timeoutId = undefined;
  
	  return new Promise(function (resolve, reject) {
		var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
		var scriptId = jsonpCallback + '_' + callbackFunction;
  
		window[callbackFunction] = function (response) {
		  resolve({
			ok: true,
			// keep consistent with fetch API
			json: function json() {
			  return Promise.resolve(response);
			}
		  });
  
		  if (timeoutId) clearTimeout(timeoutId);
  
		  removeScript(scriptId);
  
		  clearFunction(callbackFunction);
		};
  
		// Check if the user set their own params, and if not add a ? to start a list of params
		url += url.indexOf('?') === -1 ? '?' : '&';
  
		var jsonpScript = document.createElement('script');
		jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
		if (options.charset) {
		  jsonpScript.setAttribute('charset', options.charset);
		}
		jsonpScript.id = scriptId;
		document.getElementsByTagName('head')[0].appendChild(jsonpScript);
  
		timeoutId = setTimeout(function () {
		  reject(new Error('JSONP request to ' + _url + ' timed out'));
  
		  clearFunction(callbackFunction);
		  removeScript(scriptId);
		  window[callbackFunction] = function () {
			clearFunction(callbackFunction);
		  };
		}, timeout);
  
		// Caught if got 404/500
		jsonpScript.onerror = function () {
		  reject(new Error('JSONP request to ' + _url + ' failed'));
  
		  clearFunction(callbackFunction);
		  removeScript(scriptId);
		  if (timeoutId) clearTimeout(timeoutId);
		};
	  });
	}
  

	let local;
	if (typeof global !== 'undefined') {
	  local = global;
	} else if (typeof self !== 'undefined') {
	  local = self;
	} else {
	  try {
		local = Function('return this')();
	  } catch (e) {
		throw new Error('polyfill failed because global object is unavailable in this environment');
	  }
	}
	local.fetchJsonp = fetchJsonp;

  
	module.exports = fetchJsonp;
  });
