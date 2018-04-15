// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      .click('.item-list')
      let qtd = document.querySelectorAll('.item-list')
      qtd.forEach((index) => {
        .waitForElementVisible('.item-list', 1000)
      }
      .waitForElementVisible('.item-list', 1000)
      // .assert.containsText('h1', 'Welcome to Your Vue.js App')
      // .assert.elementCount('img', 1)
      .end();
  },
};
