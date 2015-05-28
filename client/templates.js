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

Template.searchResults.helpers({
    hasResults: function (skill) {
        var skillService = new SkillService();
        var users = skillService.getUsersBySkill(skill);
        return users.length > 0;
    },

    getResults: function(skill) {
        var skillService = new SkillService();
        return skillService.getUsersBySkill(skill);
    }
})

UI.body.events({
    'click .remove-skill-link': function (event, ui) {
        event.preventDefault();
        var skillId = event.currentTarget.dataset.id;
        Skills.remove({_id: skillId})
    }
});

Template.skillEntry.events({
    'click button#add-skill-button': function (evt) {
        evt.preventDefault();
        var template = Template.instance();
        var skill = template.$('#add-skill-input').val().trim();
        if (skill) {
            Meteor.call('PutSkill', skill, function (err) {
                if (err) {
                    alert('Error: ' + err);
                } else {
                    template.$('#add-skill-input').val('');
                }
            });
        }
    }
});

Template.search.events({
    'click button#search-skill-button': function(evt) {
        evt.preventDefault();
    }
})

