/* globals Player: true */

SkillService = function SkillService() {};

SkillService.prototype.getSkills = function(email) {

  var r = Skills.find({email: email});
  console.log(">>>>> " + r);
  return r.fetch();

};

SkillService.prototype.generateSortKey = function(displayKey) {
  return displayKey.toLowerCase();
}

SkillService.prototype.addSkill = function(email, skill, isMentorable) {

};

SkillService.prototype.hasSkill = function(email, skill) {
  var r = Skills.find({email: email, skill: skill}).limit(1)
}

SkillService.prototype.createSkillDoc = function(email, skill, isMentorable) {
  var sortKey = this.generateSortKey(skill)
  return {
    email: email,
    skill: skill,
    sortKey: sortKey,
    isMentorable: isMentorable
  }
};