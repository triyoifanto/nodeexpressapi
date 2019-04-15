const { Given, When, Then } = require('cucumber');
const got = require('got');
const assert = require('assert');

//// Your Step Definitions /////
// When('send POST request to {string}, the JSON data is', function (string, docString) {
//     var data = {
//         headers: { 'Content-Type': 'application/json' },
//         json: true,
//         body: JSON.parse(docString)
//     };
//     return 'pending';
//   });

Then('send POST request to {string}, the JSON data is', function (string, docString) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

Then('there shouldn\'t be any token for the user', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

// When(/^send PUT request to "([^"]*)", the data is$/, async function (url, docString) {
//     var data = {
//         headers: { 'Content-Type': 'application/json' },
//         json: true,
//         body: JSON.parse(docString)
//     };
//     await got.put(url, data);
// });

// Then(/^send GET request to "([^"]*)", user name should be "([^"]*)"$/, async function (url, name) {
//     let res = await got.get(url);
//     let json = JSON.parse(res.body);
//     return assert.equal(json.name, name);
// });

