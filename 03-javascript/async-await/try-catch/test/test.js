onsole.log = function () { }
const { expect } = require('chai')
const rewire = require('rewire');
let logs = [];

describe('', function () {
    it('', async function () {

        let appModule;
        try {
            appModule = rewire("../app.js")
        } catch (e) {
            expect(true, 'Try checking your code again. You likely have a syntax error.').to.equal(false);
        }
        let announceDinner
        try {
            announceDinner = appModule.__get__("hostDinnerParty");
        } catch (e) {
            expect(true, 'Is your `hostDinnerParty()` function declared properly?').to.equal(false);
        }
        console.log = param => logs.push(param)
        appModule.__set__('cookBeanSouffle', () => Promise.reject('cat'))

        await announceDinner();
        expect((logs.includes(`cat`) && logs.includes(`Ordering a pizza!`) ), "Inside your `catch` block, your `async` function needs first log the error to the console and then log the string: `'Ordering a pizza!'` Double check spelling and syntax.").to.equal(true)
    });
});