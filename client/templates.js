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
    hasResults: function () {
        var skill = Session.get('search-skill');
        if (skill) {
            var skillService = new SkillService();
            var users = skillService.getUsersBySkill(skill);
            return users.length > 0;
        } else {
            return false;
        }
    },

    getResults: function () {
        var skill = Session.get('search-skill');
        if (skill) {
            var skillService = new SkillService();
            return skillService.getUsersBySkill(skill);
        } else {
            return [];
        }
    },

    strip: function(email) {
        return email.replace(/[@\.]/ig, '');
    },

    searchSkillInSession: function() {
        return Session.get('search-skill');
    }
});

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
        var template = Template.instance();
        var skill = template.$('#search-skill-input').val().trim();
        Session.set('search-skill', skill);
    }
});

