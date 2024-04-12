import { getJob, getJobs } from '../db/jobs.js';

export const Query = {
  jobs: async (parent, args, context) => {
    const jobs = await getJobs();
    return jobs;
  },
  job: async (parent, args, context) => {
    const job = await getJob(args.id);
    return job;
  },
};

