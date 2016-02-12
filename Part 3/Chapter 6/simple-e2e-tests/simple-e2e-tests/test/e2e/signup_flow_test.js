// test/e2e/signup_flow_test.js
describe('signup flow tests', function() { 
  it('should link to /signup if not already there', function() {
    // direct browser to relative url, page will load synchronously
    browser.get('/');

    // locate and grab <a> from page
    var link = element(by.css('a'));

    // check that the correct <a> is selected by matching contained text
    expect(link.getText()).toEqual('Go to signup page');

    // direct browser to nonsense url
    browser.get('/#/hooplah');

    // simulated click
    link.click();

    // protractor waits for the page to render, then checks the url
    expect(browser.getCurrentUrl()).toMatch('/signup');
  });
});
describe('routing tests', function() {
  var handleInput,
      successMessage,
      failureMessage;

  function verifyInvalid() {
    expect(successMessage.isDisplayed()).toBe(false);
    expect(failureMessage.isDisplayed()).toBe(true);
  }

  function verifyValid() {
    expect(successMessage.isDisplayed()).toBe(true);
    expect(failureMessage.isDisplayed()).toBe(false);
  }

  beforeEach(function() {
    browser.get('/#/signup');

    var messages = element.all(by.css('h2'));

    expect(messages.count()).toEqual(2);

    successMessage = messages.get(0);
    failureMessage = messages.get(1);

    handleInput = element(by.model('handle'));
    
    expect(handleInput.getText()).toEqual('');
  })

  it('should display invalid handle on pageload', function() {
    verifyInvalid();
    expect(failureMessage.getText()).
      toEqual('Sorry, that handle cannot be used.');
  });

  it('should display invalid handle for insufficient characters', function() {
    // type to modify model and trigger $watch expression
    handleInput.sendKeys('jake');
    verifyInvalid();
  });

  it('should display invalid handle for a taken handle', function() {
    // type to modify model and trigger $watch expression
    handleInput.sendKeys('jakehsu');
    verifyInvalid();
  });

  it('should display valid handle for an untaken handle', function() {
    // type to modify model and trigger $watch expression
    handleInput.sendKeys('jakehsu123');
    verifyValid();
  });
})