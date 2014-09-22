var Store = (function() {
	
	if(Store.prototype.instance) {
		return Store.prototype.instance;
	}
	
	Store.prototype.instance = this;

	/**
	 * Checks if localStorage is supported
	 * @return true if localStorage is supported
	 */
	Store.prototype.supportsLocalStorage = function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		}
		catch(e) {
			return false;
		}
	}

	/**
	 * Places a key-value pair in localStorage
	 * @param key Key paired to the value
	 * @param value Value to store
	 * @return true if the value was stored without any issues
	 */
	Store.prototype.setEntry = function(key, value) {
		if(!Store.supportsLocalStorage()) {
			return false;
		}

		localStorage[key] = value;
		return true;
	}

	/**
	 * Accesses a value in localStorage
	 * @param key Key for the value to retrieve
	 * @return value paired to the key if one exists
	 */
	Store.prototype.getEntry = function(key) {
		return localStorage[key];
	}

	/**
	 * Places a key-object pair in localStorage using JSON
	 * @param key Key paired to the value
	 * @param objValue Object to convert to JSON and store
	 * @return true if the value was stored without any issues
	 */
	Store.prototype.setJSONEntry(key, objValue) {
		return Store.setEntry(key, JSON.stringify(objValue));
	}

	/**
	 * Accesses a JSON object in localStorage
	 * @param key Key for the value to retrieve
	 * @return object parsed from the stored JSON for the key
	 */
	Store.prototype.getJSONEntry = function(key) {
		return JSON.parse(localStorage[key]);
	}
}