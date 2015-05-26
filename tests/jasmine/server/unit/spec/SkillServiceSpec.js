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

  beforeEach(function() {
    skillService = new SkillService();
  });

  describe('I should be able to read the skills for a specific user', function() {

    describe('for a user with no skills', function() {
      it('should return nothing without errors', function() {
        player.play(song);
        expect(player.currentlyPlayingSong).toEqual(song);


        expect(player).toBePlaying(song);
      });


    });


  });

  it('should be able to play a Song', function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe('when song has been paused', function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it('should indicate that the song is currently paused', function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it('should be possible to resume', function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it('tells the current song if the user has made it a favorite', function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });
});
