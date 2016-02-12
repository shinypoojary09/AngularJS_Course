// test/pages/main.js

var MainPage = function () {
  // direct the browser when the page object is initialized
  browser.get('/');
};

MainPage.prototype = Object.create({},
  {
    // getter for element in page
    signupLink: {
      get: function() {
        return element(by.css('a'));
      }
    }
  }
);

module.exports = MainPage;