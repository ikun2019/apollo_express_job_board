import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { getJobQuery } from '../lib/graphql/queries';

function JobPage() {
  const { jobId } = useParams();
  const { data, loading, error } = useQuery(getJobQuery, {
    variables: { jobId }
  });

  // const [job, setJob] = useState();

  // useEffect(() => {
  //   getJob(jobId).then((result) => {
  //     setJob(result);
  //   });
  // }, [jobId]);

  if (loading) {
    return <div>Loading...</div>
  };
  if (error) {
    return <div className='has-text-danger'>Data unavailable</div>
  };

  return (
    <div>
      <h1 className="title is-2">
        {data.job.title}
      </h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${data.job.company.id}`}>
          {data.job.company.name}
        </Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: {formatDate(data.job.date, 'long')}
        </div>
        <p className="block">
          {data.job.description}
        </p>
      </div>
    </div>
  );
}

export default JobPage;
