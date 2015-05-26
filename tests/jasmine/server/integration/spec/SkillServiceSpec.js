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




});
