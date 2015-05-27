Meteor.methods({
    'PutSkill': function (skill) {
        var skillService = new SkillService();
        var email = Meteor.user().emails[0].address;
        skillService.putSkill(email, skill, false);
    }
});