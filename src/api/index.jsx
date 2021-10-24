import {
  useQuery,
  gql,
} from '@apollo/client';

const getMetrics = (): string[] => {
  const query = gql`
    {
      getMetrics
    }
  `;

  const { data } = useQuery(query);
  return data.getMetrics;
};

export { getMetrics };
