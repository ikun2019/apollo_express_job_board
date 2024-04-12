import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { getJobs } from '../lib/graphql/queries';
// import { jobs } from '../lib/fake-data';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs()
      .then((result) => {
        setJobs(result);
      });
  }, []);

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
