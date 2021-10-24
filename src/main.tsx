import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getMetrics } from './api';
import Select from './components/Select';

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
  const metrics = getMetrics();
  return (
    <div className={root}>
      <Grid container className={container} spacing={0} alignItems="center">
        <Grid item xs={8}>
          Info
        </Grid>
        <Grid item xs={4}>
          <Select metrics={metrics} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
