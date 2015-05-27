(function () {

    'use strict';

    module.exports = function () {

        this.Given(/^I have skills in the database$/, function (callback) {
            //fixture sets up necessary data
            this.server.call('fixtures/skills', callback);
        });

        this.When(/^I have no skills in the database$/, function (callback) {
            browser.executeAsync(function (obj, done) {
                Meteor.loginWithPassword("no_skill@ducking-nemesis.net", 'password123', done);
            }, {}, callback);
        });

        this.Then(/^I should see a message saying that I have zero skills in the database$/, function (callback) {
            this.client.waitForVisible("#no-skills", 500, false, callback);
        });

        this.When(/^I have one skill in the database$/, function (callback) {
            browser.executeAsync(function (obj, done) {
                Meteor.loginWithPassword("one_skill@ducking-nemesis.net", 'password123', done);
            }, {}, callback);
        });

        this.Then(/^I should see a list with my one skill$/, function (callback) {
            this.client.waitForVisible("#skills-list", 500, false, callback);
        });

        this.When(/^I have multiple skills in the database$/, function (callback) {
            browser.executeAsync(function (obj, done) {
                Meteor.loginWithPassword("multiple_skills@ducking-nemesis.net", 'password123', done);
            }, {}, callback);
        });

        this.Then(/^I should see a list with all of my skills$/, function (callback) {
            this.client.waitForVisible("#skills-list", 500, false, callback);
        });
    }

})();