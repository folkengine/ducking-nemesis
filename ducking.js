if (Meteor.isClient) {

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
            var skill = Template.instance().$('#add-skill-input').val();
            var skillService = new SkillService();
            skillService.addSkill(getCurrentUserEmail(), skill, false);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
