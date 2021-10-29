import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const Table = ({ metrics, measurements }) => {
  const data = metrics.map(metric => {
    const range = measurements[metric].filter(e => e.toJSON().time > new Date() - 30 * 60 * 1000);

    const rangeJson = range.toJSON();

    const formattedData = rangeJson.points.map(measurement => ({
      time: measurement[0], value: measurement[1], unit: measurement[2],
    }));

    return { name: rangeJson.name, data: formattedData };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" type="category" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {data.map((s) => (<Line dataKey="value" data={s.data} name={s.name} key={s.name} />))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Table;
