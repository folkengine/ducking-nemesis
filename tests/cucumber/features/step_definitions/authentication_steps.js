(function () {

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

        this.When(/^I register for the first time$/, function (callback) {

            // 1. create a user
            var userData = {email: 'test12s3@foo.com', password: 'abc123456'};
            _createUser(userData, function(createdUser) {

                // 2. Login with that user
                browser.executeAsync(function (user, done) {
                    // this code is run in the browser
                    Meteor.loginWithPassword(user.email, user.password, done); // done is what tells the async function to finish
                }, createdUser)
                    . // createdUser is passed in as a param to executeAsync
                    // 3. Wait for the UI to react
                    waitForExist('.logged-in-indicator', true).
                    call(callback);

            });

            function _createUser(user, callback) {
                global.ddp.call('fixtures/user/create', user, function () {
                    callback(user);
                });
            }
        });

        this.When(/^I login with my username and password$/, function (callback) {
            browser.executeAsync(function(obj, done){
                Meteor.loginWithPassword("test@test.com", "TEST_123", done);

            }, {}, callback);
        });

        this.Then(/^I should be able to see content that requires Authentication$/, function (callback) {
            this.client.waitForExist('#protected').getHTML("#protected", false, callback);
        });
    };
})();

