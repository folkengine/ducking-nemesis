function getCurrentUserEmail() {
    var currentUser = Meteor.user();
    var emailsArray = currentUser.emails;
    var firstEmail = emailsArray[0];
    return firstEmail.address;
}

Template.skills.helpers({
    hasSkills: function () {
        var skillService = new SkillService();
        var skillsArray = skillService.getSkills(getCurrentUserEmail());
        return skillsArray.length > 0;
    },

    getSkills: function () {
        var skillService = new SkillService();
        return skillService.getSkills(getCurrentUserEmail());
    }
});

Template.skillEntry.events({
    'click button#add-skill-button': function (evt) {
        evt.preventDefault();
        var template = Template.instance();
        var skill = template.$('#add-skill-input').val();
        Meteor.call('PutSkill', getCurrentUserEmail(), skill, function (err) {
            if (err) {
                alert('Error: ' + err);
            } else {
                template.$('#add-skill-input').val('');
            }
        });
    }
});