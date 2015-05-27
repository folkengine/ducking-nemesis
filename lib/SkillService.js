Skills = new Mongo.Collection('skills');

SkillService = function SkillService() {};

SkillService.prototype.getSkills = function(email) {
  return Skills.find({email: email}, {sort: {key: 1}})
      .fetch();
};

SkillService.prototype.generateKey = function(displayKey) {
  return displayKey.toLowerCase();
};

SkillService.prototype.createSkillDoc = function(email, skill, isMentorable) {
  var key = this.generateKey(skill);
  return {
    email: email,
    skill: skill,
    key: key,
    isMentorable: isMentorable
  }
};

/**
 * Inserts a new skill or updates an existing skill.
 * @param email
 * @param skill the display name of the skill
 * @param isMentorable
 */
SkillService.prototype.putSkill = function (email, skill, isMentorable) {
    var skillDoc = this.createSkillDoc(email, skill, isMentorable);
    Skills.upsert({email: skillDoc.email, key: skillDoc.key}, skillDoc);
};

SkillService.prototype.hasSkill = function(email, skill) {
  var key = this.generateKey(skill);
  var selector = {email: email, key: key};
  var skillsArray = Skills.find(selector).fetch();
  return skillsArray != 0;
};

SkillService.prototype.removeSkill = function(email, skill) {
    var key = this.generateKey(skill);
    var selector = {email: email, key: key};
    Skills.remove(selector);
};