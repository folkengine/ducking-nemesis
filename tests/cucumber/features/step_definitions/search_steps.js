(function () {

  'use strict';

  module.exports = function () {

    this.Given(/^There are Users with skills in the database$/, function (callback) {
      this.server.call('fixtures/skills', callback);
    });

    this.When(/^I enter the skill "([^"]*)"$/, function (arg1, callback) {
      this.client.setValue('#search-skill-input', arg1).click("#search-skill-button", callback);
    });

    this.Then(/^I should see the email address "([^"]*)"$/, function (arg1, callback) {
      this.client.waitForVisible('#' + arg1.replace(/[@\.]/ig, ''), 500, false, callback);
    });
  }

})();