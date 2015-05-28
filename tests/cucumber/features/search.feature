@dev
Feature: Search for skills

  Background:
    Given There are Users with skills in the database

  Scenario: I search for a skill that has at least one user
    When I navigate to the "index"
    And I enter the skill "php"
    Then I should see the email address "one_skill@ducking-nemesis.net"

