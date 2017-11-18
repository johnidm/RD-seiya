(function (global) {

	/*
    *  Seyia v0.0.9
    *  Library to track user events in Saas applications
    *  Supported events and methods:
    *     - Define an user email by session
    *     - Stores URL changes by session
    */

	const Seyia = (function () {

		const serverUrl = 'http://localhost:5000/track/';

		let getOrCreateGUID = function () {
            
			// Get or create a new GUID.
			// If GUID is not stored in browser session a new GUID is created to identify unique users
			const keyStorage = 'seyia-guid';

			function getNewGUID() {
				// Create a new GUID - https://www.guidgenerator.com/
				// http://guid.us/GUID/JavaScript
				function S4() {
					return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
				}
				return guid = (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
			}

			let guid = sessionStorage.getItem(keyStorage);

			if (guid === null || guid === undefined) {
				guid = getNewGUID();
				sessionStorage.setItem(keyStorage, guid);
			}
			return guid;
		};

		let httpPost = function (trackPath, data) {
			// Invokes server methods to store trace data
			// Params:
			//  - trackPath: Server path to store the event
			//  - data: JSON data structure to store
			const guid = getOrCreateGUID();
			const url = serverUrl + trackPath + '/' + guid;

			const xhttp = new XMLHttpRequest();

			xhttp.open('POST', url, true);
			xhttp.setRequestHeader('Content-Type', 'application/json');
			xhttp.send(JSON.stringify(data));

			xhttp.onreadystatechange = function () {				
				if (xhttp.status !== 204) {
					/* eslint-disable no-console */
					console.error(xhttp);
				}
			};
		};

		return {

			storeUrl(url) {
				/*
                * Store each URL change to track the user's journey
                *
                */
				const title = document.title;

				const data = {
					title: title,
					url: url,
					date: new Date()
				};

				httpPost('url', data);
			},

			setEmail(email) {

				/*
                * Sets an email to the current session
                * 
                * This method must be called to identify unique visitors by sessions
                */

				const data = {
					email: email
				};

				httpPost('email', data);
			},

			get guid() {
				/*
                * Return the current GUID
                * 
                * Each section on the browser generates a new GUID
                */
				return getOrCreateGUID();                
			}

		};
	});
    
	// Export global object to use in Node JS or Browser
	if (typeof module != 'undefined') {
		module.exports = Seyia;
	} else {
		global.Seyia = Seyia;
	}
    
})(this);