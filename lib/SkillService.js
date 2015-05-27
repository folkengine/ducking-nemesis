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

SkillService.prototype.addSkill = function (email, skill, isMentorable) {
  if (!this.hasSkill(email, skill)) {
    var skillDoc = this.createSkillDoc(email, skill, isMentorable);
    Skills.insert(skillDoc)
  }
};

SkillService.prototype.hasSkill = function(email, skill) {
  var sortKey = this.generateSortKey(skill);
  var selector = {email: email, sortKey: sortKey};
  var skillsArray = Skills.find(selector).fetch();
  return skillsArray != 0;
};

