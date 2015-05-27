describe('SkillService', function() {
  var skillService;

  beforeEach(function() {
    skillService = new SkillService();
  });

  describe('I should be able to read the skills for a specific user', function() {

    it('for a user with no skills getSkills() should return an empty array', function () {
      expect(skillService.getSkills('0_skill@example.com')).toEqual([]);
    });

    it('for a user with one skill getSkills() should return one skill', function () {
      var email = '1_skill@example.com';
      skillService.putSkill(email, "UX", true);
      skills = skillService.getSkills('1_skill@example.com');
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
    var selector = {email: "user@ducking-nemesis.org", sortKey: "literate programming"};
    skillService.putSkill(selector.email, selector.sortKey, false);
    var docFromColl = Skills.findOne(selector);
    expect(docFromColl).not.toBeFalsy();
  });

  it("putSkill should not put duplicate skills in the collection", function() {
    var skill = "DRY code";
    var selector = {email: "somebody@pillar.org", sortKey: skillService.generateSortKey(skill)};
    skillService.putSkill(selector.email, skill, true);
    skillService.putSkill(selector.email, skill, true);
    var skillsArray =  Skills.find(selector).fetch();
    expect(skillsArray.length).toEqual(1);
  });

  it("putSkill should update display name and isMentorable", function() {
      var email = 'somebody@somesite.gov';
      skillService.putSkill(email, 'statecraft', false);
      skillService.putSkill(email, 'StateCraft', true);
      var skillsArray = skillService.getSkills(email);
      var skillDoc = skillsArray[0];
      var skillDisplayName = skillDoc.skill;
      expect(skillDisplayName).toEqual('StateCraft');
      var skillIsMentorable = skillDoc.isMentorable;
      expect(skillIsMentorable).toBe(true);
  })
});
