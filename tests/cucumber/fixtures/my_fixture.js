(function () {

    'use strict';

    var noSkill = "no_skill@ducking-nemesis.net";
    var oneSkill = "one_skill@ducking-nemesis.net";
    var multipleSkills = "multiple_skills@ducking-nemesis.net";

    Meteor.methods({
        'reset': function () {

            if (Meteor.userId()) {
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

        'fixtures/user/create': function (user) {
            return Accounts.createUser(user);
        },

        'fixtures/skills': function () {

            function createSkillsTestAccount(email) {
                Accounts.createUser({
                    email: email,
                    password: 'password123'
                });
            }

            Meteor.users.remove({});
            createSkillsTestAccount(noSkill);
            createSkillsTestAccount(oneSkill);
            createSkillsTestAccount(multipleSkills);

            var skillService = new SkillService();
            Skills.remove({});
            skillService.addSkill(oneSkill, "PHP", true);
            skillService.addSkill(multipleSkills, "Python", true);
            skillService.addSkill(multipleSkills, "Perl", false);
        }

    });

})();