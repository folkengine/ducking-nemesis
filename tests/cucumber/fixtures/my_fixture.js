(function () {

  'use strict';

  //console.log("my_fixture.js function invoked")

  Meteor.methods({
    'reset' : function() {
      console.log('reset()');

      if(Meteor.userId()) {
        Meteor.logout();
      }

      Meteor.users.remove({});

      Accounts.createUser({
        username: "testUser",
        email: "test@test.com",
        password: "TEST_123",
        profile: {
          name: "Test User"
        }
      });
    }
  });

})();