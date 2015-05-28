describe('SkillService', function() {
  var skillService;
  var email_skill_0 = 'skill_0@example.com';
  var email_skill_1 = 'skill_1@example.com';
  var email_skill_2 = 'skill_2@example.com';
  var email_skill_uy = 'skill_uy@example.com';


  beforeAll(function() {
    skillService = new SkillService();
    skillService.putSkill(email_skill_1, "UX", true);
    skillService.putSkill(email_skill_2, "UY", true);
    skillService.putSkill(email_skill_2, "UZ", true);
    skillService.putSkill(email_skill_uy, "UY", true);
  });

  beforeEach(function() {

  });

  describe('I should be able to search for Users with specific skills', function() {
    it('for a skill with no user', function() {
      users = skillService.getUsersBySkill('NO_SUCH_SKILLYADAYADYADYADYADYADYADYADYAD');
      expect(users.length).toBe(0);
    });

    it('for a skill with one user', function() {
      users = skillService.getUsersBySkill('UX');
      expect(users.indexOf(email_skill_1)).not.toEqual(-1);
    });

    it('for a skill with two users', function() {
      users = skillService.getUsersBySkill('UY');
      expect(users.indexOf(email_skill_2)).not.toEqual(-1);
      expect(users.indexOf(email_skill_uy)).not.toEqual(-1);
    });

    it('it does not return a user that I know does not have the skill', function() {
      users = skillService.getUsersBySkill('UX');
      expect(users.indexOf(email_skill_0)).toEqual(-1);
    });

  });

  describe('I should be able to read the skills for a specific user', function() {

    it('for a user with no skills getSkills() should return an empty array', function () {
      expect(skillService.getSkills(email_skill_0)).toEqual([]);
    });

    it('for a user with one skill getSkills() should return one skill', function () {
      skills = skillService.getSkills(email_skill_1);
      expect(skills.length).toEqual(1);
      expect(skills[0].skill).toEqual("UX");
    })
  });

  it("hasSkill() should return false if a matching skill is not present in the collection", function() {
    var booleanValue = skillService.hasSkill("someone@somesite.net", "Bikeshedding");
    expect(booleanValue).toBe(false);
  });

  it("hasSkill() should return true if a matching skill is present in the collection", function() {
    var skillDoc = skillService.createSkillDoc("dude@gap.co", "Gradle", true);
    var id = Skills.insert(skillDoc);
    expect(id).not.toBeFalsy();
    var has = skillService.hasSkill("dude@gap.co", "Gradle");
    expect(has).toBe(true);
  });

  it("putSkill() should put another skill document in the skills collection", function () {
    var selector = {email: "user@ducking-nemesis.org", key: "literate programming"};
    skillService.putSkill(selector.email, selector.key, false);
    var docFromColl = Skills.findOne(selector);
    expect(docFromColl).not.toBeFalsy();
  });

  it("putSkill should not put duplicate skills in the collection", function() {
    var skill = "DRY code";
    var selector = {email: "somebody@pillar.org", key: skillService.generateKey(skill)};
    skillService.putSkill(selector.email, skill, true);
    skillService.putSkill(selector.email, skill, true);
    var skillsArray =  Skills.find(selector).fetch();
    expect(skillsArray.length).toEqual(1);
  });

  it("putSkill should update display name and isMentorable", function() {
      var email = 'somebody@somesite.gov';
      Skills.remove({email: email});
      skillService.putSkill(email, 'statecraft', false);
      skillService.putSkill(email, 'StateCraft', true);
      var skillsArray = skillService.getSkills(email);
      var skillDoc = skillsArray[0];
      var skillDisplayName = skillDoc.skill;
      expect(skillDisplayName).toEqual('StateCraft');
      var skillIsMentorable = skillDoc.isMentorable;
      expect(skillIsMentorable).toBe(true);
  });

  it("getSkills should return a list sorted by downcased skill name", function () {
    var email = 'somebody@someothersite.io';
    Skills.remove({email: email});
    skillService.putSkill(email, 'erlang', false);
    skillService.putSkill(email, 'Clojure', false);
    skillService.putSkill(email, 'Aspect Oriented Programming', true);
    skillService.putSkill(email, 'Go', true);
    skillService.putSkill(email, 'Behavior Driven Development', false);
    skillService.putSkill(email, 'Haskell', true);
    skillService.putSkill(email, 'data science', true);
    skillService.putSkill(email, 'F#', false);

    var skillsArray = skillService.getSkills(email);

    function expectation(index, expectedSkill) {
      var skillDoc = skillsArray[index];
      var actual = skillDoc.skill;
      expect(actual).toEqual(expectedSkill);
    }

    expectation(0, 'Aspect Oriented Programming');
    expectation(1, 'Behavior Driven Development');
    expectation(2, 'Clojure');
    expectation(3, 'data science');
    expectation(4, 'erlang');
    expectation(5, 'F#');
    expectation(6, 'Go');
    expectation(7, 'Haskell');
  });

  it("removeSkill should remove a skill from the collection", function() {
    var email = 'brogrammer@somesite.org';
    Skills.remove({email: email});
    skillService.putSkill(email, 'Go', true);
    skillService.putSkill(email, 'Haskell', true);
    skillService.removeSkill(email, 'Go');
    var skillsArray = skillService.getSkills(email);
    expect(skillsArray.length).toEqual(1);
    expect(skillsArray[0].skill).toEqual('Haskell');
  })

});
