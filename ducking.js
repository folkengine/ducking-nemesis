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
            var currentUser = Meteor.user();
            var currentUserEmail = currentUser.emails[0].address;
            var skillService = new SkillService();
            var skillsArray = skillService.getSkills(currentUserEmail);
            return skillsArray.length > 0;
        },

        getSkills: function () {
            var currentUser = Meteor.user();
            var currentUserEmail = currentUser.emails[0].address;
            var skillService = new SkillService();
            var skillsArray = skillService.getSkills(currentUserEmail);
            return skillsArray;
        }
    })
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
