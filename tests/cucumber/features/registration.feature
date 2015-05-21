# Created by chris at 5/21/15
@dev
Feature: User Identification
  # Enter feature description here

  Background:
    Given I am an unauthenticated User

  Scenario: Authentication
    When I navigate to the "index"
    Then I should see the title "ducking"
    Then I should see a button that says ClickMe


