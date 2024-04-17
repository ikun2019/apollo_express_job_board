import { useQuery } from '@apollo/client';
import JobList from '../components/JobList';
import { getJobsQuery } from '../lib/graphql/queries';
import { useState } from 'react';
// import { jobs } from '../lib/fake-data';

function HomePage() {
  // const [jobs, setJobs] = useState([]);
  // useEffect(() => {
  //   getJobs()
  //     .then((result) => {
  //       setJobs(result);
  //     });
  // }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 5;
  const limit = JOBS_PER_PAGE;
  const offset = (currentPage - 1) * JOBS_PER_PAGE;

  const { data, loading, error } = useQuery(getJobsQuery, {
    variables: { limit, offset }
  });
  if (loading) {
    return <div>Loading...</div>
  };
  if (error) {
    return <div className='has-text-danger'>Data unavailable</div>
  };

  const totalPages = Math.ceil(data.jobs.totalCount / JOBS_PER_PAGE);

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
      <span>{`${currentPage} of ${totalPages}`}</span>
      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      <JobList jobs={data.jobs.items} />
    </div>
  );
}

export default HomePage;
