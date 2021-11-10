import React from 'react';
import Metric from '../components/Metric';
import { useAppSelector } from '../store';

type AppProps = {
  cardMetrics: string[],
};

export default ({ cardMetrics }:AppProps) => {
  const measurements = useAppSelector((state): any => state.metrics.measurements);

  return (
    <>
      {
        cardMetrics.map((metric) => {
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
    </>
  );
};
