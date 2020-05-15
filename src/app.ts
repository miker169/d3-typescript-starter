// Very simple bar chart

import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import { json, select, scaleLinear, scaleBand,min, max, extent, axisBottom,axisLeft } from 'd3';

class Revenue {
  revenue: number;
  profit: number;
  
  constructor(public month: string, r: string, p: string) {
    this.revenue = +r;
    this.profit = +p;
  }
  
}


json('../data/revenues.json')
  .then(data => {
    const revenueData: Revenue[] =data.map(
      (d: {month: string, revenue: string, profit: string}) =>
        new Revenue(d.month, d.revenue, d.profit));
  
    const margin = {top: 10
      , right: 10, bottom: 150, left: 100}
  
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const revenueDataMax = +<number>max<Revenue, number>(revenueData, (revenue) => revenue.revenue);
    
    const x = scaleBand()
      .domain(revenueData.map((r:Revenue) => r.month))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.2);
    
    const y = scaleLinear()
      .domain([0, revenueDataMax])
      .range([height, 0])
  
    const g = select('#chart-area')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // X Label
    
    g.append('text')
      .attr('x', width /2)
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
    
    
    const xAxisCall = axisBottom(x)
    
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisCall);
    
    const yAxisCall = axisLeft(y)
      .ticks(11);
    
    g.append('g')
      .call(yAxisCall);
      
    
    const rects = g.selectAll('rect').data(revenueData);
    
    rects.enter()
      .append('rect')
        .attr('height', (d:Revenue) => {
          return height - y(d.revenue)
        })
        .attr('y', (d) => {
          return y(d.revenue);
        })
        //.attr('y', 0)
        .attr('x', (d,i) => {
          return <number>x(d.month)
        })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey')
  
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
    
  })
