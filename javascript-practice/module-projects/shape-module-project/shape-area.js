/* shape-area.js */
const PI = Math.PI;
// A=πrr
module.exports.circleArea = function(radiusLength) {
    return (radiusLength * radiusLength) * PI;
};
// A=a2
module.exports.squareArea = function(sideLength) {
    return Math.pow(sideLength, 2);
};