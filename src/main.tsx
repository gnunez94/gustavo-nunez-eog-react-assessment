import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useAppSelector } from './store';
import Table from './Features/Table/Table';
import Select from './components/Select';
import Metric from './components/Metric';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '2em',
  },
  container: {
    width: '100%',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const Main = () => {
  const { root, container, cardContainer } = useStyles();
  const metrics = useAppSelector(state => state.metrics.metrics) || [];
  const measurements = useAppSelector(state => state.metrics.measurements);
  const [cardMetrics, setCardMetrics] = useState<string[]>([]);

  return (
    <div className={root}>
      <Grid container className={container} spacing={0}>
        <Grid item xs={8} className={cardContainer}>
          {
            cardMetrics.map(metric => {
              const metricId: keyof typeof measurements = metric as keyof typeof measurements;
              const metricValue = `${measurements[metricId].atLast().get()} ${measurements[metricId].atLast().get('unit')}`;
              return (
                <Metric
                  key={metric}
                  metric={metric}
                  value={metricValue as string}
                />
              );
            })
          }
        </Grid>
        <Grid item xs={4}>
          <Select metrics={metrics} addedMetrics={setCardMetrics} />
        </Grid>
        <Grid item xs={12}>
          <Table metrics={cardMetrics} measurements={measurements} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
