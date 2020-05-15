// Very simple bar chart

import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import { json, select, scaleLinear, scaleBand,min, max, extent, axisBottom,axisLeft } from 'd3';

class Building{
    height: number;
    constructor(public name: string, h: string) {
        this.height = +h;
    }
}

json('../data/buildings.json')
.then(data => {
    const buildingData: Building[] = data.map((x: { name: string; height: string; })  => new Building(x.name, x.height));

    const buildingDataMax = +<number>max<Building, number>(buildingData, (building) => building.height);
  
  
  
    const margin = {top: 10
      , right: 10, bottom: 150, left: 100}
  
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const x = scaleBand()
  .domain(buildingData.map((building:Building) => building.name))
  .range([0, width])
  .paddingInner(0.3)
  .paddingOuter(0.3);
  
    const y = scaleLinear()
        .domain([0, buildingDataMax ])
        .range([height, 0 ]);
  
    const g = select('#chart-area')
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
      .attr('x', -(height/2))
      .attr('y', -60)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text("Height (m)");
  
    
    const xAxisCall = axisBottom(x);
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxisCall)
      .selectAll('text')
        .attr('y', '10')
        .attr('x', -5)
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-40)')
  
  
    const yAxisCall = axisLeft(y)
      .ticks(3)
      .tickFormat((d) => d + 'm')
  
    
    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxisCall)

    const rects = g.selectAll('rect').data(buildingData);
    
        rects.enter()
        .append('rect')
        .attr('y', (d: Building) => {
          return y(d.height);
        })
        .attr('x', (d: Building ) => {
            return <number>x(d.name)
        })
        .attr('height', (d: Building) => {
            return height - y(d.height);
        })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey')
});
