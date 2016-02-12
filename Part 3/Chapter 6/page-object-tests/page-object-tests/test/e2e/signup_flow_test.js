// test/e2e/signup_flow_test.js
var SignupPage = require('../pages/signup.js')
  , MainPage = require('../pages/main.js');

describe('signup flow tests', function() {
  var page;

  beforeEach(function() {
    // initialize the page object
    page = new MainPage();
  });

  it('should link to /signup if not already there', function() {
    // check that the correct <a> is selected by matching contained text
    // expect(link.getText()).toEqual('Go to signup page');
    expect(page.signupLink.getText()).toEqual('Go to signup page');
    // direct browser to nonsense url
    browser.get('/#/hooplah');
    // simulated click
    page.signupLink.click();
    // protractor waits for the page to render, then checks the url
    expect(browser.getCurrentUrl()).toMatch('/signup');
  });
});

describe('routing tests', function() {
  var page;

  function verifyInvalid() {
    expect(page.successMessageVisibility).toBe(false);
    expect(page.failureMessageVisibility).toBe(true);
  }

  function verifyValid() {
    expect(page.successMessageVisibility).toBe(true);
    expect(page.failureMessageVisibility).toBe(false);
  }

  beforeEach(function() {
    // initialize the page object
    page = new SignupPage();

    // check that there are two messages on the page
    expect(page.messages.count()).toEqual(2);
    // check that the handle input text is empty
    expect(page.handleInput.getText()).toEqual('');
  });

  it('should display invalid handle on pageload', function() {
    // check that initial page state is invalid
    verifyInvalid();
    expect(page.failureMessage.getText()).
      toEqual('Sorry, that handle cannot be used.');
  });

  it('should display invalid handle for insufficient characters', function() {
    // type to modify model and trigger $watch expression
    page.typeHandle('jake');
    verifyInvalid();
  })

  it('should display invalid handle for a taken handle', function() {
    // type to modify model and trigger $watch expression
    page.typeHandle('jakehsu');
    verifyInvalid();
  })

  it('should display valid handle for an untaken handle', function() {
    // type to modify model and trigger $watch expression
    page.typeHandle('jakehsu123');
    verifyValid();
  })
})