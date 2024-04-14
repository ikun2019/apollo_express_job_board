import { createJob, deleteJob } from '../db/jobs.js';

export const Mutation = {
  createJob: (parent, args, context) => {
    const companyId = "FjcJCHJALA4i";
    return createJob({
      companyId: companyId,
      title: args.input.title,
      description: args.input.description,
    });
  },
  deleteJob: (parent, args, context) => {
    const jobId = args.id;
    return deleteJob(jobId);
  },
};
