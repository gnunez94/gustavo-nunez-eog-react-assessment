import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '../../store';

const useStyles = makeStyles({
  containerStyle: {
    width: 1000,
    height: 500,
  },
});

const UnitDictionary = {
  oilTemp: { unit: 'Fº', color: '#8884d8' },
  waterTemp: { unit: 'Fº', color: '#82ca9d' },
  injValveOpen: { unit: '%', color: '#cac482' },
  flareTemp: { unit: 'Fº', color: '#e55b31' },
  tubingPressure: { unit: 'PSI', color: '#36327a' },
  casingPressure: { unit: 'PSI', color: '#9a9aa7' },
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const Table = ({ metrics }) => {
  const { containerStyle } = useStyles();

  const measurements = useAppSelector(state => state.metrics.measurements);
  const selectedMetrics = metrics.map(metric => {
    const range = measurements[metric].filter(e => e.toJSON().time > new Date() - 30 * 60 * 1000);

    const rangeJson = range.toJSON();

    const formattedData = rangeJson.points.map(measurement => ({
      time: new Date(measurement[0]).toTimeString().split(' ')[0],
      value: measurement[1],
      unit: measurement[2],
    }));

    return { name: rangeJson.name, data: formattedData };
  });

  const yLines = metrics.map(metric => UnitDictionary[metric].unit).filter(onlyUnique);

  return selectedMetrics && (
    <div className={containerStyle}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" type="category" allowDuplicatedCategory={false} />
          {
            yLines.map((unit, id) => (
              <YAxis key={unit} dataKey="value" padding={{ left: 20 }} yAxisId={id} unit={unit} />
            ))
          }
          <Tooltip />
          <Legend />
          {selectedMetrics.map((s) => (<Line type='linear' dataKey="value" data={s.data} name={s.name} key={s.name} stroke={UnitDictionary[s.name].color} />))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Table;
