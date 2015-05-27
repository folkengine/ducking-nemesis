(function () {

    'use strict';

    module.exports = function () {

        this.Given(/^I am an authenticated user$/, function (callback) {
            browser.executeAsync(function (obj, done) {
                Meteor.loginWithPassword("test@test.com", "TEST_123", done);
            }, {}, function (err) {
                callback(err);
            });
        });

        this.When(/^I have no skills in the database$/, function (callback) {
            //fixture sets up necessary data
            this.server.call('fixtures/skills', "test@test.com", callback);
        });

        this.Then(/^I should see a message saying that I have no skills in the database$/, function (callback) {
            this.client.waitForVisible("#no-skills", 500, false, callback);
        });

        this.When(/^I have one skill in the database$/, function (callback) {
            //fixture sets up necessary data
            this.server.call('fixtures/skills', "test@test.com", callback);
        });

        this.Then(/^I should see a list with my one skill$/, function (callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });

        this.When(/^I have multiple skills in the database$/, function (callback) {
            //fixture sets up necessary data
            this.server.call('fixtures/skills', "test@test.com", callback);
        });

        this.Then(/^I should see a list with all of my skills$/, function (callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });
    }

})();