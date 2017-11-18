let Seyia = require("../seyia.js");

let sinon = require('sinon');
var assert = require('assert');

describe('Seyia library', function () {

    beforeEach(function () {

        function mockStorage() {
            var storage = {};
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

    });

    describe('#guid', function () {
        it('should return a new GUID', function () {
            const getItem = sinon.stub(global.sessionStorage, "getItem");
            getItem.returns(null);

            const setItem = sinon.spy(global.sessionStorage, "setItem");            
        
            assert.ok(Seyia().guid);   

            assert.equal(1, getItem.callCount);
            assert.equal(1, setItem.callCount);

            assert.ok(getItem.calledWith('seyia-guid'));
            assert.ok(setItem.calledWith('seyia-guid'));
        });

        it('should return a stored GUID', function () {
            const fakeGUID = 'a69d67ad-40ce-4da7-b951-38f9a841e577';

            const getItem = sinon.stub(global.sessionStorage, "getItem");
            getItem.returns(fakeGUID);

            const setItem = sinon.spy(global.sessionStorage, "setItem");

            assert.equal(fakeGUID, Seyia().guid);

            assert.equal(1, getItem.callCount);
            assert.equal(0, setItem.callCount);

            assert.ok(getItem.calledWith('seyia-guid'));
        });
    });
});