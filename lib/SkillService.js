Skills = new Mongo.Collection('skills');

SkillService = function SkillService() {
};

SkillService.prototype.getSkills = function (email) {
    return Skills.find({email: email}, {sort: {key: 1}})
        .fetch();
};

SkillService.prototype.generateKey = function (displayKey) {
    return displayKey.toLowerCase().trim();
};

SkillService.prototype.createSkillDoc = function (email, skill, isMentorable) {
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

SkillService.prototype.hasSkill = function (email, skill) {
    var key = this.generateKey(skill);
    var selector = {email: email, key: key};
    var skillsArray = Skills.find(selector).fetch();
    return skillsArray != 0;
};

SkillService.prototype.removeSkill = function (email, skill) {
    var key = this.generateKey(skill);
    var selector = {email: email, key: key};
    Skills.remove(selector);
};

SkillService.prototype.getUsersBySkill = function (skill) {
  key = this.generateKey(skill);
  //myRegex = new RegExp(key);
  var r = Skills.find({key: key}, {fields: {email: 1/*, _id: 0*/}}).fetch();

  var array = r.map(function(value) {
    return value.email;
  });

  return array;
};

SkillService.prototype.getSkillUserMap = function (skill) {
  var myRegex = new RegExp(this.generateKey(skill));

  var r = Skills.find({key: {$regex: myRegex}}).fetch();
  var map = {};
  if (r) {
    for (var i = 0; i < r.length; i++) {
      var myKey = r[i]['key'];
      var myEmail = r[i]['email'];
      if (!map.hasOwnProperty(myKey)) {
        map[myKey] = [];
      }
      map[myKey].push(myEmail);
    }
  }
  console.log("****************************");
  console.log(map);
  return map;
}

SkillService.prototype.isMapEmpty = function (map) {
  var isEmpty = true;
  for(var prop in map) {
    if(map.hasOwnProperty(prop))
      isEmpty = false;
  }
  return isEmpty;
}

SkillService.strip = function (str) {
  return str.replace(/[@\.]/ig, '');
}