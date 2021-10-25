import {
  useQuery,
  useSubscription,
  gql,
} from '@apollo/client';
import { setMetrics } from '../store/slices';
import { useAppDispatch } from '../store';

const getMetricsQuery = gql`
  {
    getMetrics
  }
`;

const MEASUREMENT_SUBSCRIPTION = gql`
  subscription newMeasurement {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

const getMetrics = () => {
  const { data = {} } = useQuery(getMetricsQuery);
  const dispatch = useAppDispatch();
  dispatch(setMetrics(data.getMetrics));
};

const latestMetrics = () => {
  const { data } = useSubscription(MEASUREMENT_SUBSCRIPTION);
  console.log('measurement', data?.newMeasurement);
};

export { getMetrics, latestMetrics };
