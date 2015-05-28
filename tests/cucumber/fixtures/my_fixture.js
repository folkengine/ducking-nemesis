(function () {

    'use strict';

    var email_skill_0 = 'no_skill@ducking-nemesis.net';
    var email_skill_1 = 'one_skill@ducking-nemesis.net';
    var email_skill_2 = 'multiple_skills@ducking-nemesis.net';
    var email_skill_a = 'also_has_skill@ducking-nemesis.net';

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

            Accounts.createUser({
                username: email_skill_0,
                email: email_skill_0,
                password: email_skill_0,
                profile: {
                    name: email_skill_0
                }
            });
            Accounts.createUser({
                username: email_skill_1,
                email: email_skill_1,
                password: email_skill_1,
                profile: {
                    name: email_skill_1
                }
            });
            Accounts.createUser({
                username: email_skill_2,
                email: email_skill_2,
                password: email_skill_2,
                profile: {
                    name: email_skill_2
                }
            });
            Accounts.createUser({
                username: email_skill_a,
                email: email_skill_a,
                password: email_skill_a,
                profile: {
                    name: email_skill_a
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
            createSkillsTestAccount(email_skill_0);
            createSkillsTestAccount(email_skill_1);
            createSkillsTestAccount(email_skill_2);

            var skillService = new SkillService();
            Skills.remove({});
            skillService.putSkill(email_skill_1, "php", true);
            skillService.putSkill(email_skill_2, "Python", true);
            skillService.putSkill(email_skill_2, "Perl", false);
            skillService.putSkill(email_skill_a, "Perl", false);
        }

    });

})();