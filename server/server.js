function getCurrentUserEmail() {
    var currentUser = Meteor.user();
    var emailsArray = currentUser.emails;
    var firstEmail = emailsArray[0];
    return firstEmail.address;
}


Meteor.methods({
    'PutSkill': function (skill) {
        var skillService = new SkillService();
        skillService.putSkill(getCurrentUserEmail(), skill, false);
    }
});