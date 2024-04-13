import { notFoundError } from './Error.js';
import { getCompany } from '../db/companies.js';
import { getJob, getJobs } from '../db/jobs.js';

export const Query = {
  jobs: async (parent, args, context) => {
    const jobs = await getJobs();
    return jobs;
  },
  job: async (parent, args, context) => {
    const job = await getJob(args.id);
    if (!job) {
      throw notFoundError('jobが見つかりません');
    }
    return job;
  },
  company: async (parent, args, context) => {
    const company = await getCompany(args.id);
    return company;
  }
};