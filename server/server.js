Meteor.methods({
    'PutSkill': function (email, skill) {
        var skillService = new SkillService();
        skillService.putSkill(email, skill, false);
    }
});