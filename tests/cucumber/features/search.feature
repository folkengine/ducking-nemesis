@dev
Feature: Search for skills

  Background:
    Given There are Users with skills in the database

  Scenario: I search for a skill that has at least one user
    When I navigate to the "index"
    And I enter the skill "php"
    Then I should see the email address "one_skill@ducking-nemesis.net"

  Scenario: I search for a skill that has two users
    When I navigate to the "index"
    And I enter the skill "Perl"
    Then I should see the email address "multiple_skills@ducking-nemesis.net"
    And I should see the email address "also_has_skill@ducking-nemesis.net"

  Scenario: I search for a skill that has no users
    When I navigate to the "index"
    And I enter the skill "No one would ever list this skill!"
    And I should see the "#no-results" element

