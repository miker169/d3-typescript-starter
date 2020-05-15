"use strict";
// Very simple bar chart
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
require("../style.css");
var d3_1 = require("d3");
var Building = /** @class */ (function () {
    function Building(name, h) {
        this.name = name;
        this.height = +h;
    }
    return Building;
}());
d3_1.json('../data/buildings.json')
    .then(function (data) {
    var buildingData = data.map(function (x) { return new Building(x.name, x.height); });
    var buildingDataMax = +d3_1.max(buildingData, function (building) { return building.height; });
    var margin = { top: 10,
        right: 10, bottom: 150, left: 100 };
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
    var x = d3_1.scaleBand()
        .domain(buildingData.map(function (building) { return building.name; }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    var y = d3_1.scaleLinear()
        .domain([0, buildingDataMax])
        .range([height, 0]);
    var g = d3_1.select('#chart-area')
        .append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // X Label
    g.append('text')
        //.attr('class', 'x axis-label')
        .attr('x', width / 2)
        .attr('y', height + 140)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .text("The world's tallest buildings");
    // Y Label
    g.append('text')
        .attr('class', 'y axis label')
        .attr('x', -(height / 2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text("Height (m)");
    var xAxisCall = d3_1.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxisCall)
        .selectAll('text')
        .attr('y', '10')
        .attr('x', -5)
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-40)');
    var yAxisCall = d3_1.axisLeft(y)
        .ticks(3)
        .tickFormat(function (d) { return d + 'm'; });
    g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall);
    var rects = g.selectAll('rect').data(buildingData);
    rects.enter()
        .append('rect')
        .attr('y', function (d) {
        return y(d.height);
    })
        .attr('x', function (d) {
        return x(d.name);
    })
        .attr('height', function (d) {
        return height - y(d.height);
    })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey');
});
