import {
  useQuery,
  useSubscription,
  gql,
} from '@apollo/client';
import { setMetrics, setMeasurements } from '../store/slices';
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
  const { loading, data = {} } = useQuery(getMetricsQuery);
  const dispatch = useAppDispatch();
  if (!loading) dispatch(setMetrics(data.getMetrics));
};

const latestMetrics = () => {
  const { loading, data = {} } = useSubscription(MEASUREMENT_SUBSCRIPTION);
  const dispatch = useAppDispatch();

  if (!loading) dispatch(setMeasurements(data.newMeasurement));
};

export { getMetrics, latestMetrics };
