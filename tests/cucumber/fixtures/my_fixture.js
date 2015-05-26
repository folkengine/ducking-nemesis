(function () {

  'use strict';

  Meteor.methods({
    'reset' : function() {

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