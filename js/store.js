'use strict';

var Store = (function () {
 
	// Instance stores a reference to the Singleton
	var instance;

	function initialize() {

		// Singleton

		return {
		
			/**
			 * Checks if localStorage is supported
			 * @return true if localStorage is supported
			 */
			supportsLocalStorage: function () {
				try {
					return 'localStorage' in window && window['localStorage'] !== null;
				}
				catch(e) {
					return false;
				}
			},

			/**
			 * Places a key-value pair in localStorage
			 * @param key Key paired to the value
			 * @param value Value to store
			 * @return true if the value was stored without any issues
			 */
			setEntry: function (key, value) {
				if(!instance.supportsLocalStorage()) {
					return false;
				}

				localStorage.setItem(key, value);
				return true;
			},

			/**
			 * Accesses a value in localStorage
			 * @param key Key for the value to retrieve
			 * @return value paired to the key if one exists
			 */
			getEntry: function (key) {
				return localStorage.getItem(key);
			},

			/**
			 * Places a key-object pair in localStorage using JSON
			 * @param key Key paired to the value
			 * @param objValue Object to convert to JSON and store
			 * @return true if the value was stored without any issues
			 */
			setJSONEntry: function (key, objValue) {
				if(!instance.supportsLocalStorage()) {
					return false;
				}

				localStorage.setItem(key, JSON.stringify(objValue));
				return true;
			},

			/**
			 * Accesses a JSON object in localStorage
			 * @param key Key for the value to retrieve
			 * @return object parsed from the stored JSON for the key
			 */
			getJSONEntry: function (key) {
				try {
					return JSON.parse(localStorage.getItem(key));
				}
				catch(e) {
					return null;
				}
			},
			
			/**
			 * Gets all the entries in local storage
			 * @return array of entries containing all objects
			 */
			getAllEntries: function () {
				var entries = new Array();
				
				for(var i = 0; i < localStorage.length; i++) {
					entries[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
				}

				entries.sort(function(a, b) {
					var keyA = new Date(a.date);
					var keyB = new Date(b.date);
					return keyB - keyA
				});
				
				return entries;
			}
		};
	};
 
	return {
		getInstance: function () {
			if(!instance) {
				instance = initialize();
			}
			
			return instance;
		}
	};
 
})();
