# Created by chris at 5/21/15
@dev
Feature: User Identification
  # Enter feature description here

  Background:
    Given I am an unauthenticated User

  Scenario: Authentication
    When I navigate to the "index"
    And I click the "login-link-text" link
    Then I should see the title "ducking"
    And I should see the "login-buttons" element
    And I should see the "login-link-text" element
