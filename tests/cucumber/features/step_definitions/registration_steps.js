(function () {

    //use for passing a callback into non-terminal steps of chained calls
    var errorCallback = function (err) {
        if (err) {
            callback(err)
        }
    };

    'use strict';

    module.exports = function () {

        // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
        var url = require('url');

        this.Given(/^I am an unauthenticated User$/, function () {
            // no callbacks! DDP has been promisified so you can just return it
            return this.server.call('reset'); // this.ddp is a connection to the mirror
        });

        this.When(/^I navigate to the "(.*)"$/, function (relativePath, callback) {
            //// WebdriverIO supports Promises/A+ out the box, so you can return that too
            this.client // this.browser is a pre-configured WebdriverIO + PhantomJS instance
                .url(url.resolve(process.env.ROOT_URL, relativePath)) // process.env.ROOT_URL points to the mirror
                .call(callback);
        });

        this.When(/^I click the "([^"]*)" link$/, function (linkClass, callback) {
            this.client.waitForVisible('body *').click(linkClass, callback);
        });

        this.Then(/^I should see the title "([^"]*)"$/, function (arg1, callback) {
            //TODO IMPLEMENT: currently does nothing
            this.client.call(callback);
        });

        this.Then(/^I should see the "([^"]*)" element$/, function (element, callback) {
            this.client.waitForVisible(element, 500, false, callback);
        });

        this.Then(/^I should not be able to see content that requires Authentication$/, function (callback) {
            this.client.isExisting('#protected', function(err, isExisting) {
                isExisting.should.be.false
            }).call(callback);
        });

        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        // Registration

        this.When(/^I register for the first time$/, function (callback) {
            this.client
                .setValue('#login-email', 'test123@foo.com', errorCallback)
                .setValue('#login-password', 'yadayadayaday', errorCallback)
                .click('#login-buttons-password', errorCallback)
                .call(callback)
        });

        this.Then(/^I should be able to see content that requires Authentication$/, function (callback) {
            this.client.getHTML("#protected", false, callback);
        });

    };
})();