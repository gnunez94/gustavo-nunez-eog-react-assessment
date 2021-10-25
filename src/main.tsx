import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useAppSelector } from './store';
import { getMetrics, latestMetrics } from './api';
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
  getMetrics();
  const { root, container } = useStyles();
  const [metrics] = useState(useAppSelector(state => state.metrics.metrics));
  const [cardMetrics, setCardMetrics] = useState<string[]>([]);
  latestMetrics();

  return (
    <div className={root}>
      <Grid container className={container} spacing={0} alignItems="center">
        <Grid item xs={8}>
          {
            cardMetrics.map(metric => <Metric metric={metric} />)
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
