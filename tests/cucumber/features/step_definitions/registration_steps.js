
(function () {

    'use strict';

    module.exports = function () {

        // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
        var url = require('url');

        this.Given(/^I am an unauthenticated User$/, function () {

            console.log('I am an unauthenticated User')

            // no callbacks! DDP has been promisified so you can just return it
            return this.server.call('reset'); // this.ddp is a connection to the mirror
        });

        this.When(/^I navigate to the "(.*)"$/, function (relativePath, callback) {

            // helper.world.browser.url(url.resolve(helper.world.mirrorUrl, relativePath)).call(callback);

            // console.log(">>>>> " + relativePath)

            //// WebdriverIO supports Promises/A+ out the box, so you can return that too
            this.client. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
                url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
                call(callback);
        });

        this.When(/^I click the "([^"]*)" link$/, function (linkClass, callback) {
            var cli = this.client;

            this.client.waitForVisible('body *').click(linkClass, callback);

            //this.client.waitForVisible('body *').isExisting('#login-dropdown-list', function(err, isExisting) {
            //    if(!isExisting) {
            //        console.log("login-link-text not existing")
            //        cli.click('.login-link-textASDFASDF', function() {})
            //        console.log("post click")
            //        cli.getHTML('.login-link-text').should.exist.and.notify(callback)
            //    }
            //})
        });

        this.Then(/^I should see the title "([^"]*)"$/, function (arg1, callback) {
            // Write code here that turns the phrase above into concrete actions
            this.client.call(callback);
        });

        this.Then(/^I should see the "([^"]*)" element$/, function (arg1, callback) {
            // Write code here that turns the phrase above into concrete actions
            this.client.call(callback);
        });

        this.Then(/^I should now see the ".login-dropdown-list" element$/, function (callback) {
            this.client.getHTML("#login-dropdown-list", false, callback);
        });

        this.Then(/^I should not be able to see content that requires Authentication$/, function (callback) {
            var cli = this.client;
            this.client.isExisting('#protected', function(err, isExisting) {
                isExisting.should.be.false
            }).call(callback);
        });
    };
})();