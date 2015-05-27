(function () {

  'use strict';

  var oneSkill = "1_skill@ducking-nemesis.org";
  var multipleSkills = "multiple_skills@ducking-nemesis.org";

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
    },

    'fixtures/user/create': function(user) {
      return Accounts.createUser(user);
    },

    'fixtures/skills': function() {
      var skillService = new SkillService();
      Skills.remove({});
      skillService.addSkill(oneSkill, "PHP", true);
      skillService.addSkill(multipleSkills, "Python", true);
      skillService.addSkill(multipleSkills, "Perl", false);
    }
      
  });

})();