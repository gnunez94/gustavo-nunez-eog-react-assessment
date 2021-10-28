import React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';

// const thirtyMinuteSliding = window(duration('30m'));
// const thirtyMinutes = duration({ minutes: 30 });

const Table = ({ metrics, measurements }) => {
  metrics.forEach(metric => {
    // const timeRange = measurements[metric].timerange([
    //   new Date() - 30 * 60 * 1000, new Date().getTime(),
    // ]).toJSON().timerange;

    console.log('range', measurements[metric].filter(e => e.toJSON().time > new Date() - 30 * 60 * 1000).toJSON());

    const measurementRange = measurements[metric].slice(new Date() - 30 * 60 * 1000);

    console.log(metric, measurementRange.count());
  });

  // metrics.map((metric) => data.push(measurements[metric].fixedWindowRollup({
  //   window: thirtyMinuteSliding,
  // })));

  // console.log(data);
  return (
    // <ResponsiveContainer width="100%" height="100%">
    //   <LineChart
    //     width={500}
    //     height={300}
    //     data={data}
    //     margin={{
    //       top: 5,
    //       right: 30,
    //       left: 20,
    //       bottom: 5,
    //     }}
    //   >
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey="name" />
    //     <YAxis yAxisId="left" />
    //     <YAxis yAxisId="right" orientation="right" />
    //     <Tooltip />
    //     <Legend />
    //     <Line yAxisId="left" type="monotone" dataKey="value" stroke="#8884d8" />
    //     {/* <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    //   </LineChart>
    // </ResponsiveContainer>
    <></>
  );
};

export default Table;
