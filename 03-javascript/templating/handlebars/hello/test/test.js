console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('public/main.js', 'utf8');

describe('', function () {
  it('', function() {

    let structureOne = function() {
      fill.innerHTML = compiledHtml
    };

    let isMatchOne = Structured.match(code, structureOne);
    assert.isOk(isMatchOne, 'Did you assign the `innerHTML` property of `fill` to `compiledHtml`?');
  });
});