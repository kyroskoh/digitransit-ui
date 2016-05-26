const suite = require('./api/suite.js').suite;

suite('Search', () => {
  describe('When Origin is manually set to "Kamppi"', () => {
    before((browser, done) => {
      browser.setCurrentPosition(60.2, 24.95, 0, done);
    });

    function setOrigin(browser, src) {
      browser.fakeSearch.openSearch();
      browser.origin.selectOrigin();
      browser.origin.enterText(src);
    }

    function setDestination(browser, src) {
      browser.fakeSearch.openSearch();
      browser.destination.selectDestination();
      browser.destination.enterText(src);
    }

    it('Source should be set to kamppi when kamppi is entered to source', (browser) => {
      setOrigin(browser, 'kamppi');
      browser.fakeSearch.openSearch();
      browser.origin.selectOrigin();
      browser.expect.element('#search-origin').to.be.visible
        .before(browser.ELEMENT_VISIBLE_TIMEOUT);
      browser.expect.element('#search-origin').value.to
        .contain('Kamppi, long distance traffic, Helsinki');
    });

    it('Destination should be set to kamppi when kamppi is entered to destination,' +
         ' also a route search should be performed',
       (browser) => {
         browser.url('/');
         setDestination(browser, 'kamppi');
         // TODO: create destination tests when summary page is ready
       }
    );

    it('Route search should be run when both source and destination are set',
       (browser) => {
         browser.url('/');
         setOrigin(browser, 'kamppi');
         setDestination(browser, 'sampsantie 40');
         browser.expect.element('.itinerary-summary-row').to.be.visible
           .before(browser.ELEMENT_VISIBLE_TIMEOUT);
       }
    );
  });
});