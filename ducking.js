if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  // Fixture package - see here http://goo.gl/1CvTTa
  Meteor.methods({
    // resetTestingEnvironment: resetTestingEnvironment,
    'fixtures/user/create': function(user) {

      console.log('fixtures/user/create')

      return Accounts.createUser(user).on('unhandledRejection', function (err) {
        //  throw err;
      });
    }
  });
}
