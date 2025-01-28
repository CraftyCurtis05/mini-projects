console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('public/main.js', 'utf8');

describe('', function () {
  it('', function() {

    let structureOne = function() {
      let context = {
        languages: [
          {
            name: _,
            modern: true
          },
          {
            name: _,
            modern: true
          },
          {
            name: _,
            modern: true
          }
        ]
      };
    };

    let isMatchOne = Structured.match(code, structureOne);

    assert.isOk(isMatchOne, 'Did you add a `modern` property to all of the objects in the array value of `languages`?');
  });
});