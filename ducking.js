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

  Template.skills.helpers({
    hasSkills: function () {
      var skillsCollection  = Skills.find({}).fetch(); //TODO REMOVE
      console.log("> > > > > > > > > > > > > > > > > > > > > > > > skills collection: %o", skillsCollection); //TODO remove
      var currentUser = Meteor.user();
      console.log("> > > > > > > > > > > > > > > > > > > > > > > > current user: %o", currentUser); //todo remove
      var currentUserEmail = Meteor.user().emails[0].address;
      console.log("> > > > > > > > > > > > > > > > > > > > > > > > current user email: %o", currentUserEmail); //todo remove
      var skillService = new SkillService();
      var skillsArray = skillService.getSkills(currentUserEmail);
      console.log("> > > > > > > > > > > > > > > > > > > > > > > > skills array from service: %o", skillsArray); //todo remove
      return skillsArray.length > 0;
    },

    getSkills: function() {
      console.log("> > > > > > > > > > > > > > > > > > > > > > > > skills getSkills invoked.") //todo remove
      var currentUser = Meteor.user();
      var currentUserEmail = Meteor.user().emails[0].address;
      var skillService = new SkillService();
      var skillsArray = skillService.getSkills(currentUserEmail);
      console.log("> > > > > > > > > > > > > > > > > > > > > > > > skills array in getSkills: %o", skillsArray); //todo remove
      return skillsArray;
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
