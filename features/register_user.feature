Feature: API Register new User
  In order to stored new user data on the API
  As a nonregistered user
  I want to be able to insert my data from the API endpoint
  
  Scenario: Successfully delete my data
    When send POST request to "http://127.0.0.1:4000/auth/register", the JSON data is 
     """
     {
        "name":"T.Ifanto",
        "email":"mail@tifanto.com"
        "password":"password1"
     }
     """
    Then send POST request to "http://127.0.0.1:4000/auth/login", the JSON data is
     """
     {
        "email":"mail@tifanto.com"
        "password":"password1"
     }
     """
    And there shouldn't be any token for the user