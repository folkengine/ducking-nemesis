/* globals Player: true */

SkillService = function SkillService() {};

SkillService.prototype.getSkills = function(email) {

  var r = Skills.find({email: email});
  console.log(">>>>> " + r);
  return r.fetch();

};



