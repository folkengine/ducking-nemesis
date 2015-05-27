Skills = new Mongo.Collection('skills');

SkillService = function SkillService() {};

SkillService.prototype.getSkills = function(email) {
  return Skills.find({email: email}).fetch();
};

SkillService.prototype.generateSortKey = function(displayKey) {
  return displayKey.toLowerCase();
};

SkillService.prototype.createSkillDoc = function(email, skill, isMentorable) {
  var sortKey = this.generateSortKey(skill);
  return {
    email: email,
    skill: skill,
    sortKey: sortKey,
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
    Skills.upsert({email: skillDoc.email, sortKey: skillDoc.sortKey}, skillDoc);
};

SkillService.prototype.hasSkill = function(email, skill) {
  var sortKey = this.generateSortKey(skill);
  var selector = {email: email, sortKey: sortKey};
  var skillsArray = Skills.find(selector).fetch();
  return skillsArray != 0;
};

