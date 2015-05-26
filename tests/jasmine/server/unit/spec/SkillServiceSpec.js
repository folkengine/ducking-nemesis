/**
 * Created by aaron on 5/26/15.
 */

describe('SkillService', function () {
    var skillService;

    beforeEach(function () {
        skillService = new SkillService();
    });

    it("generateSortKey() should return the skill display name to lower case", function () {
        var sortKey = skillService.generateSortKey("TDD")
        expect(sortKey).toEqual("tdd")

    });

    it("createSkillDoc() should return a skill document with a sort key", function() {
        var doc = skillService.createSkillDoc("1@2.3", "COBOL", true)
        expect(doc.email).toEqual("1@2.3")
        expect(doc.skill).toEqual("COBOL")
        expect(doc.sortKey).toEqual("cobol")
        expect(doc.isMentorable).toEqual(true)
    })
});