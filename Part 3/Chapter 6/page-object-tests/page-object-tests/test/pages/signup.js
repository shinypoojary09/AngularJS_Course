// test/pages/signup.js

var SignupPage = function () {
  // direct the browser when the page object is initialized
  browser.get('/#/signup');
};

SignupPage.prototype = Object.create({},
  {
    // getters for elements in the page
    messages: {
      get: function() {
        return element.all(by.css('h2'));
      }
    },
    successMessage: {
      get: function() {
        return this.messages.get(0);
      }
    },
    failureMessage: {
      get: function() {
        return this.messages.get(1);
      }

    },
    handleInput: {
      get: function() {
        return element(by.model('handle'));
      }
    },
    // getters for page validation
    successMessageVisibility: {
      get: function() {
        return this.successMessage.isDisplayed();
      }
    },
    failureMessageVisibility: {
      get: function() {
        return this.failureMessage.isDisplayed();
      }
    },
    // interface for page element
    typeHandle: {
      value: function(handle) {
        this.handleInput.sendKeys(handle);
      }
    }
  }
);

module.exports = SignupPage;