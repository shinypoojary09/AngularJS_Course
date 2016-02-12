describe('Home Page', function() {
  beforeEach(function() {
    browser.get('/')  
  })
  
  it('should display the home page with Allo Allo', function() {
    expect(element(by.css('h1')).getText()).toBe("'Allo, 'Allo!")
  }) 
})