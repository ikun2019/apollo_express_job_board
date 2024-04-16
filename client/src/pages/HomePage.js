import { useQuery } from '@apollo/client';
import JobList from '../components/JobList';
import { getJobsQuery } from '../lib/graphql/queries';
// import { jobs } from '../lib/fake-data';

function HomePage() {
  // const [jobs, setJobs] = useState([]);
  // useEffect(() => {
  //   getJobs()
  //     .then((result) => {
  //       setJobs(result);
  //     });
  // }, []);
  const { data, loading, error } = useQuery(getJobsQuery);
  if (loading) {
    return <div>Loading...</div>
  };
  if (error) {
    return <div className='has-text-danger'>Data unavailable</div>
  };
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={data.jobs} />
    </div>
  );
}

export default HomePage;
