/* globals Player: false, Song: false */

// Given a specific user show me all of their skills

// Boundary conditions
// - no skills 0_skill@example.com
// - 1 skill   1_skill@example.com
// - 2 skills  2_skill@example.com
// - Filter on wantMentoring mixed_skill@example.com

// Given a specific user I want to add a skill
//
// Boundary conditions
// - Has no skills
// - has skills
// - with mentoring
// - wihtout mentoring
describe('SkillService', function() {
  var skillService;

  beforeAll(function() {
    Skills.insert({email: '1_skill@example.com', skillName: 'thumb-twiddling', isMentorable: true})
  });

  beforeEach(function() {
    skillService = new SkillService();
  });

  describe('I should be able to read the skills for a specific user', function() {

    describe('for a user with no skills', function() {
      xit('should return nothing without error', function() {
        expect(skillService.getSkills('0_skill@example.com')).toEqual([]);
      });
    });

    describe('for a user with skills', function() {
      it('should return 1 skill for a user with one skill', function() {

        skills = skillService.getSkills('1_skill@example.com');

        console.log(">>>>>>>>>>>>" + skills);

        expect(skills.length).toEqual(1);
      })
    });

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
  })

  it("addSkill() should put another skill document in the skills collection", function () {
    var selector = {email: "user@ducking-nemesis.org", sortKey: "literate programming"};
    skillService.addSkill(selector.email, selector.sortKey, false);
    var docFromColl = Skills.findOne(selector);
    expect(docFromColl).not.toBeFalsy();
  });
});
