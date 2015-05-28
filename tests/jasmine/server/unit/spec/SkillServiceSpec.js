/**
 * Created by aaron on 5/26/15.
 */

describe('SkillService', function () {
    var skillService;

    beforeEach(function () {
        skillService = new SkillService();
    });

    it("generateKey() should return the skill display name to lower case", function () {
        var key = skillService.generateKey("TDD");
        expect(key).toEqual("tdd")
    });

    it("createSkillDoc() should return a skill document with a key", function() {
        var doc = skillService.createSkillDoc("1@2.3", "COBOL", true);
        expect(doc.email).toEqual("1@2.3");
        expect(doc.skill).toEqual("COBOL");
        expect(doc.key).toEqual("cobol");
        expect(doc.isMentorable).toEqual(true);
    })

    it('strip() removes @ and . from String', function() {
        expect(SkillService.strip('asd@asd.asd')).toEqual('asdasdasd');
    })
});