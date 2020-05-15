"use strict";
// Very simple bar chart
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
require("../style.css");
var d3_1 = require("d3");
var Revenue = /** @class */ (function () {
    function Revenue(month, r, p) {
        this.month = month;
        this.revenue = +r;
        this.profit = +p;
    }
    return Revenue;
}());
d3_1.json('../data/revenues.json')
    .then(function (data) {
    var revenueData = data.map(function (d) {
        return new Revenue(d.month, d.revenue, d.profit);
    });
    var margin = { top: 10,
        right: 10, bottom: 150, left: 100 };
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
    var revenueDataMax = +d3_1.max(revenueData, function (revenue) { return revenue.revenue; });
    var x = d3_1.scaleBand()
        .domain(revenueData.map(function (r) { return r.month; }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.2);
    var y = d3_1.scaleLinear()
        .domain([0, revenueDataMax])
        .range([height, 0]);
    var g = d3_1.select('#chart-area')
        .append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // X Label
    g.append('text')
        .attr('x', width / 2)
        .attr('y', 300)
        .attr('font-size', 20)
        .attr('text-anchor', 'middle')
        .text('Month');
    // Y Label
    g.append('text')
        .attr('x', -(height / 2))
        .attr('y', -60)
        .attr('font-size', 20)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Revenue');
    var xAxisCall = d3_1.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisCall);
    var yAxisCall = d3_1.axisLeft(y)
        .ticks(11);
    g.append('g')
        .call(yAxisCall);
    var rects = g.selectAll('rect').data(revenueData);
    rects.enter()
        .append('rect')
        .attr('height', function (d) {
        return height - y(d.revenue);
    })
        .attr('y', function (d) {
        return y(d.revenue);
    })
        //.attr('y', 0)
        .attr('x', function (d, i) {
        return x(d.month);
    })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey');
    //rects.enter()
    //.append('rect')
    //.attr('y', (d: Building) => {
    //  return y(d.height);
    //})
    //.attr('x', (d: Building ) => {
    //  return <number>x(d.name)
    //})
    //.attr('height', (d: Building) => {
    //  return height - y(d.height);
    //})
    //.attr('width', x.bandwidth)
    //.attr('fill', 'grey')
});
