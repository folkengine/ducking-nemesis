# Created by chris at 5/21/15
@dev
Feature: User Identification
  # Enter feature description here

  Background:
    Given I am an unauthenticated User

  Scenario: Not Authenticated
    When I navigate to the "index"
    And I click the ".login-link-text" link
    Then I should see the title "ducking"
    And I should see the "#login-buttons" element
    And I should see the ".login-link-text" element
    And I should see the "#login-dropdown-list" element
    And I should not be able to see content that requires Authentication

  Scenario: Authenticating New User
    When I navigate to the "index"
    And I click the ".login-link-text" link
    And I click the "#signup-link" link
    And I register for the first time
    Then I should be able to see content that requires Authentication

  Scenario: Authenticating Existing USer
    When I navigate to the "index"
    And I login with my username and password
    Then I should be able to see content that requires Authentication