"use strict";
/// Simple Circles Demo
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
require("../style.css");
var d3_1 = require("d3");
var Person = /** @class */ (function () {
    function Person(a, name) {
        this.name = name;
        this.age = +a;
    }
    return Person;
}());
d3_1.csv('../data/ages.csv', function (rawRow, index, columns) {
    if (rawRow.age && rawRow.name) {
        return new Person(rawRow.age, rawRow.name);
    }
})
    .then(function (data) {
    var svg = d3_1.select('#chart-area').append('svg')
        .attr('width', 400)
        .attr('height', 400);
    //
    var circles = svg.selectAll('circle')
        .data(data);
    //
    circles.enter()
        .append('circle')
        .attr('cx', function (d, i) {
        return (i * 50) + 25;
    })
        .attr('cy', 25)
        .attr('r', function (d) {
        return 2 * d.age;
    })
        .attr('fill', function (d) {
        if (d.name === 'Tony') {
            return 'blue';
        }
        return 'red';
    });
}).catch(function (error) {
    console.log(error);
});
