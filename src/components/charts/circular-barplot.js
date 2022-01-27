import React from 'react';
import * as d3 from 'd3';
import { PropTypes } from 'prop-types';

const hotToColdPallete = [
  '#67001f',
  '#780224',
  '#9f0732',
  '#b2182b',
  '#bb3727',
  '#bb4537',
  '#cc5a4b',
  '#d6604d',
  '#da7160',
  '#dc7c6d',
  '#fa9d90',
  '#f4a582',
  '#f5b9a0',
  '#fddbc7',
  '#f7f7f7',
  '#d1e5f0',
  '#b7daec',
  '#92c5de',
  '#73bbde',
  '#5ab0da',
  '#4393c3',
  '#257fb6',
  '#2166ac',
  '#115193',
  '#053061',
];

const useD3 = (renderChartFn, dependencies) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
};

export default function CircularBarplot({ data = [], height = 500, width = 600 }) {
  const newData = data.map(d => ({ ...d })).filter(({ Proximity }) => Proximity !== 0);

  const yMax = Math.max(...newData.map(({ EngineersCount }) => EngineersCount));
  const ref = useD3(
    svg => {
      const innerRadius = 20;
      const outerRadius = Math.min(width, height) / 2;

      const x = d3
        .scaleBand()
        .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0) // This does nothing
        .domain(newData.map(d => d.Name)); // The domain of the X axis is the list of states.
      const y = d3
        .scaleRadial()
        .range([innerRadius, outerRadius]) // Domain will be define later.
        .domain([0, yMax * 3]); // Domain of Y is from 0 to the max seen in the data

      svg
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .attr('class', 'main');

      svg
        .select('.main')
        .append('g')
        .selectAll('path')
        .data(newData)
        .enter()
        .append('path')
        .attr('fill', d3.scaleOrdinal(hotToColdPallete))
        .attr(
          'd',
          d3
            .arc() // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(d => y(d.EngineersCount))
            .startAngle(d => x(d.Name))
            .endAngle(d => x(d.Name) + x.bandwidth())
            .padAngle(0.05)
            .padRadius(innerRadius)
        );

      // Add the labels
      svg
        .select('.main')
        .append('g')
        .selectAll('g')
        .data(newData)
        .enter()
        .append('g')
        .attr('text-anchor', d =>
          (x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'end' : 'start'
        )
        .attr(
          'transform',
          d =>
            `rotate(${((x(d.Name) + x.bandwidth() / 2) * 180) / Math.PI - 90}) translate(${
              y(d.EngineersCount) + 7
            }, 0)`
        )
        .append('text')
        .text(d => d.Name)
        .attr('transform', d =>
          (x(d.Name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI
            ? 'rotate(180)'
            : 'rotate(0)'
        )
        .style('font-size', '11px')
        .attr('alignment-baseline', 'middle');

      svg
        .append('g')
        .attr('x', width - 200)
        .attr('y', 10)
        .attr('class', 'legend');
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height,
        width,
        overflow: 'auto',
      }}
      data-cy="neighbors-graph"
    />
  );
}

CircularBarplot.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number,
  width: PropTypes.number,
};
