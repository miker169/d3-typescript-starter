/// Simple Circles Demo

import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import { select, csv, selectAll } from 'd3';

class Person{
    age: number;

    constructor(a: string, public name: string) {
        this.age = +a;
    }
}

 csv<Person>('../data/ages.csv', (rawRow, index ,columns) => {
    if(rawRow.age && rawRow.name){
        return new Person(rawRow.age, rawRow.name)
    }
})
.then((data) => {

    const svg = select('#chart-area').append('svg')
        .attr('width', 400)
        .attr('height', 400);
//
    const circles = svg.selectAll('circle')
        .data(data);
//
    circles.enter()
        .append('circle')
        .attr('cx', (d: Person, i: number) => {
            return (i * 50) + 25
        })
        .attr('cy', 25)
        .attr('r', (d: Person) => {
            return 2 * d.age;
        })
        .attr('fill', (d: Person) => {
            if(d.name === 'Tony'){
                return  'blue'
            }
            return 'red';
        });
}).catch((error) => {
    console.log(error);
 });