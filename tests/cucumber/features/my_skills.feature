@dev
Feature: Display and Entry of Skills

  Background:
    Given I have skills in the database

  Scenario: I have no skills in the database
    When I navigate to the "index"
    And I have no skills in the database
    Then I should see a message saying that I have zero skills in the database

  Scenario: I have one skill in the database
    When I navigate to the "index"
    And I have one skill in the database
    Then I should see a list with my one skill

  Scenario: I have multiple skills in the database
    When I navigate to the "index"
    And I have multiple skills in the database
    Then I should see a list with all of my skills

  Scenario: Adding a skill to the database
    When I navigate to the "index"
    And I have no skills in the database
    And I type in a skill name
    And I click on submit button
    Then I should see my skill in the list
    And The text of the skill input should be cleared

  Scenario: Removing a skill
    When I navigate to the "index"
    And I have one skill in the database
    And I click on the X to delete the skill
    Then I should see a message saying that I have zero skills in the database