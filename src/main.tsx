import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useAppSelector } from './store';

import Select from './components/Select';
import Metric from './components/Metric';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
  },
});

const Main = () => {
  const { root, container } = useStyles();
  const metrics = useAppSelector(state => state.metrics.metrics) || [];
  const measurements = useAppSelector(state => state.metrics.measurements);
  const [cardMetrics, setCardMetrics] = useState<string[]>([]);

  return (
    <div className={root}>
      <Grid container className={container} spacing={0} alignItems="center">
        <Grid item xs={8}>
          {
            cardMetrics.map(metric => {
              const metricId: keyof typeof measurements = metric as keyof typeof measurements;
              const metricValue = measurements[metricId][measurements[metricId].length - 1].value;
              return (
                <Metric
                  key={metric}
                  metric={metric}
                  value={metricValue as Number}
                />
              );
            })
          }
        </Grid>
        <Grid item xs={4}>
          <Select metrics={metrics} addedMetrics={setCardMetrics} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
