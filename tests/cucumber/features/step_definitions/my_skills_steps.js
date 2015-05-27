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

        this.When(/^I type in a skill name$/, function (callback) {
            this.client.setValue('#add-skill-input', 'Hello World', callback);
        });

        this.When(/^I click on submit button$/, function (callback) {
            this.client.click("#add-skill-button", callback);
        });

        this.Then(/^I should see my skill in the list$/, function (callback) {
            this.client
                .waitForVisible("#skills-list", 500, false)
                .getHTML("li", callback);
        });

        this.Then(/^The text of the skill input should be cleared$/, function (callback) {
            this.client
                .getValue('#add-skill-input').should.become('').and.notify(callback);
        });

        this.When(/^I click on the X to delete the skill$/, function (callback) {
            this.client.click('.remove-skill-link', callback);
        });
    }

})();