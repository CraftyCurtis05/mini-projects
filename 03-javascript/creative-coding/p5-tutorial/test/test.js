console.log = function() {};
const rewire = require('rewire');
const { assert, expect } = require('chai');
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('sketch.js', 'utf8');

describe('', function () {
  it('', function() {
    let appModule
    try {
      appModule = rewire('../sketch.js');
    } catch(e) {
      expect(true, 'Try checking your code again. You likely have a syntax error.').to.equal(false);
    }

    // Test that the variable was declared
    let drawFunction = 'draw()';
    let learnerDeclaredDraw;
    try {
        learnerDeclaredDraw = appModule.__get__('draw');
    } catch (e) {
        expect(true, 'Did you declare a `draw()` function?').to.equal(false);
    }

    // Make assertions about the variable value
    expect(learnerDeclaredDraw, `Did you create \`draw()\` as a function?`).to.be.a('function');
    
    let varCallbacks = {
      "$x, $y, $w, $h": function(x, y, w, h){
        //To see what variables return here use:
        
        if(x.value !== 30){
          return {failure: "Did you set the x-position of the `rect()` function as `30`?"};
        }
        
        if(y.value !== 20){
          return {failure: "Did you set the y-position of the `rect()` function as `20`?"};
        }
        
        if(w.value !== 100){
          return {failure: "Did you set the width of the `rect()` function as `100`?"};
        }
        
        if(h.value !== 200){
          return {failure: "Did you set the height of the `rect()` function as `200`?"};
        }
        
        return true;
      }
    }
    
    //ellipse(width / 2, mouseY, 100, 200);
    let structureOne = function() {
      rect($x, $y, $w, $h);
    };


    let isMatchOne = Structured.match(learnerDeclaredDraw.toString(), structureOne, {varCallbacks});

    assert.isOk(isMatchOne, varCallbacks.failure || `Did you use the \`rect()\` function in the \`draw()\` function?`)
  });
});