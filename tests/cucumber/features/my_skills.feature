@dev
Feature: Display and Entry of Skills
  # Enter feature description here

  Background:
    Given I am an authenticated user

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