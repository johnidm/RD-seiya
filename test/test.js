let Seyia = require('../seyia.js');

let sinon = require('sinon');
let assert = require('assert');

describe('Seyia library', function () {
	
	var stubMethod;
	var stubConstructor;

	beforeEach(function () {

		function mockStorage() {
			let storage = {};
			return {
				setItem: function (key, value) {
					storage[key] = value || '';
				},
				getItem: function (key) {
					return storage[key];
				}
			};
		}
		global['sessionStorage'] = mockStorage();

		stubMethod = sinon.stub({ open: function () { }, setRequestHeader: function () { }, send: function () { } });
		stubConstructor = sinon.stub().returns(stubMethod);
		global['XMLHttpRequest'] = stubConstructor;

		function mockDocument() {
			return {
				get title() {
					return 'Home';
				}
			};
		}
		global['document'] = mockDocument();
			
	});

	describe('#guid', function () {
		it('should return a new GUID', function () {
			const getItem = sinon.stub(global.sessionStorage, 'getItem');
			getItem.returns(null);

			const setItem = sinon.spy(global.sessionStorage, 'setItem');            
        
			assert.ok(Seyia().guid);   

			assert.equal(1, getItem.callCount);
			assert.equal(1, setItem.callCount);

			assert.ok(getItem.calledWith('seyia-guid'));
			assert.ok(setItem.calledWith('seyia-guid'));
		});

		it('should return a stored GUID', function () {
			const fakeGUID = 'a69d67ad-40ce-4da7-b951-38f9a841e577';

			const getItem = sinon.stub(global.sessionStorage, 'getItem');
			getItem.returns(fakeGUID);

			const setItem = sinon.spy(global.sessionStorage, 'setItem');

			assert.equal(fakeGUID, Seyia().guid);

			assert.equal(1, getItem.callCount);
			assert.equal(0, setItem.callCount);

			assert.ok(getItem.calledWith('seyia-guid'));
		});
	});

	describe('#setEmail', function () {

		it('should set email on server', function () {
			
			const fakeGUID = 'a69d67ad-40ce-4da7-b951-38f9a841e577';

			const getItem = sinon.stub(global.sessionStorage, 'getItem');
			getItem.returns(fakeGUID);
			
			Seyia().setEmail('sheldon@cupper.com');

			assert.equal(1, stubConstructor.callCount);

			assert.ok(stubMethod.open.calledWith('POST', 'http://localhost:5000/track/email/a69d67ad-40ce-4da7-b951-38f9a841e577', true));
			assert.ok(stubMethod.setRequestHeader.calledWith('Content-Type', 'application/json'));			
			assert.ok(stubMethod.send.calledWith('{"email":"sheldon@cupper.com"}'));
		});

	});

	describe('#storeUrl', function () {

		it('should set email on server', function () {

			const fakeGUID = 'a69d67ad-40ce-4da7-b951-38f9a841e577';

			const getItem = sinon.stub(global.sessionStorage, 'getItem');
			getItem.returns(fakeGUID);

			Seyia().storeUrl('sheldon@cupper.com');

			assert.equal(1, stubConstructor.callCount);

			assert.ok(stubMethod.open.calledWith('POST', 'http://localhost:5000/track/url/a69d67ad-40ce-4da7-b951-38f9a841e577', true));
			assert.ok(stubMethod.setRequestHeader.calledWith('Content-Type', 'application/json'));
		});

	});


});