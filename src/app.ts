import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import { select, csv, selectAll } from 'd3';

const data = csv('../data/ages.csv')
.then((data) => {
  
  data.forEach(function(d) {
    d.age = +d.age;
  });
  console.log(personData);


const svg = select('#chart-area').append('svg')
      .attr('width', 400)
      .attr('height', 400);

const circles = selectAll('circle')
  .data(personData);

circles.enter()
    .append('circle')
      .attr('cx', (d: Person, i: number) => {
        return (d.age * 50) + 25
      })
      .attr('cy', 25)
      .attr('r', (d: number ) => {
        return d;
      })
      .attr('fill', 'red');

//circles.enter()
//    .append('circle')
//      .attr('cx', (d: number, i: number) => {
//        return 25;
//      })
//      .attr('cy', 25)
//      .attr('r', (d: number) => {
//        return d;
//      })
//      .attr('fill', 'red');
//
});


//console.log(data);
//const svg = select('#chart-area')
//  .append('svg')
//  .attr('width', 400)
//  .attr('height', 400);


//const circles = svg.selectAll('circle')
//      .data(data);
//
//


