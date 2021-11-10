import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useAppSelector } from './store';
// import Table from './Features/Table/Table';
import Select from './components/Select';
import MetricsData from './components/MetricsData';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '2em',
  },
  container: {
    width: '100%',
  },
});

const Main = () => {
  const { root, container } = useStyles();
  const metrics = useAppSelector(state => state.metrics.metrics) || [];
  const [cardMetrics, setCardMetrics] = useState<string[]>([]);
  return (
    <div className={root}>
      <Grid container className={container} spacing={0}>
        <Grid item xs={12}>
          <Select metrics={metrics} addedMetrics={setCardMetrics} />
        </Grid>
        <MetricsData cardMetrics={cardMetrics} />
      </Grid>
    </div>
  );
};

export default Main;
