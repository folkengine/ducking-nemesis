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

        this.Then(/^I should see a message saying that I have no skills in the database$/, function (callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });

        this.Then(/^I should see a list with my one skill$/, function (callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });

        this.Then(/^I should see a list with all of my skills$/, function (callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });


    }

})();