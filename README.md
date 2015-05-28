# ducking-nemesis

How well can you duck from your nemesis?

[ducking-nemesis.meteor.com](http://ducking-nemesis.meteor.com)

    $> meteor deploy ducking-nemesis.meteor.com

Links
=====

Pages

* [Meteor Documentation](http://docs.meteor.com/#/full/)
* [Your First Meteor Application](http://meteortips.com/first-meteor-tutorial/)
* [The Meteor Testing Manual](http://www.meteortesting.com/)
* [Unit testing with Meteor](http://xolv.io/blog/2013/04/unit-testing-with-meteor)
* [Chai Assertion Library](http://chaijs.com/)
* [Building a customized accounts ui for Meteor](http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor)
* [The right way to handle authentication and authorization in Cucumber for Meteor?](https://forums.meteor.com/t/the-right-way-to-handle-authentication-and-authorization-in-cucumber-for-meteor/2926)
* [DDP - Distributed Data Protocol](https://www.meteor.com/ddp)
* [Cucumber.io](https://cucumber.io/)
* [Webdriver.io](http://webdriver.io/)

Code

* [Meteor-Cucumber](https://github.com/xolvio/meteor-cucumber)
* [Velocity](https://github.com/meteor-velocity/velocity)

Installing NPM with Homebrew
============================

We use some Node packages as a part of our Cucumber tests. In order to load these you will need to have NPM on your 
system. If you are using Homebrew, do the following. 

    brew install node  

    
## Example
    
    this.client.getHTML("#login-dropdown-list", false, function(err, html) {
        if (err) {
            console.log("err> " + err);
        }
    }).should.exist.and.notify(callback)