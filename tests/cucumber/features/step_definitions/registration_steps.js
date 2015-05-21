
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
        // Then I should see a button that says "Click Me"

        this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
            // you can use chai-as-promised in step definitions also
            this.client.
                waitForVisible('body *'). // WebdriverIO chain-able promise magic
                getTitle().should.become(expectedTitle).and.notify(callback);

        });


        this.Then(/^I should see the "(.*)" element/, function (elementId, callback) {
            // you can use chai-as-promised in step definitions also

            console.log("My button: " + this.client.getText('button'))

            this.client.
                waitForVisible('button'). // WebdriverIO chain-able promise magic
                getText('button').should.become(buttonTxt).and.notify(callback);
        });
    };
})();