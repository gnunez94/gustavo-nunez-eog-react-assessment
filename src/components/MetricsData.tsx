import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { latestMetrics } from '../api';
import Table from '../Features/Table/Table';
import MetricCards from '../Features/metricCards';

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const MetricsData = ({ cardMetrics }:{ cardMetrics: string[] }) => {
  latestMetrics();
  const { cardContainer } = useStyles();

  return (
    <>
      <Grid item xs={8} className={cardContainer}>
        <MetricCards cardMetrics={cardMetrics} />
      </Grid>
      {
        cardMetrics.length > 0 && (
          <Grid item xs={12}>
            <Table metrics={cardMetrics} />
          </Grid>
        )
      }
    </>
  );
};

export default MetricsData;
