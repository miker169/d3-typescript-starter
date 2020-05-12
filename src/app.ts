// Very simple bar chart

import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import { json, select, scaleLinear, scaleBand } from 'd3';

class Building{
    height: number;
    constructor(public name: string, h: string) {
        this.height = +h;
    }
}

json('../data/buildings.json')
.then(data => {
    const buildingData: Building[] = data.map((x: { name: string; height: string; })  => new Building(x.name, x.height));

    const x = scaleBand()
        .domain(["Burj Khalifa", "Shanghai Tower","Abraj Al-Bait Clock Tower",
            "Ping An Finance Centre", "Lotte World Tower",
            "One World Trade Center", "Guangzhou CTF Finance Center"
        ])
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    console.log(x('Burj Khalifa'))

    const y = scaleLinear()
        .domain([0,  828])
        .range([0, 400]);

    const svg = select('#chart-area').append('svg')
        .attr('height', 400)
        .attr('width', 400);

    const rects = svg.selectAll('rect').data(buildingData)
        .enter()
        .append('rect')
        .attr('y', 20)
        .attr('x', (d: Building ) => {
            return <number>x(d.name)
        })
        .attr('height', (d: Building) => {
            return y(d.height);
        })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey')
});