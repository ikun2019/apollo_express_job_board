import { createJob, deleteJob, updateJob } from '../db/jobs.js';

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
  updateJob: (parent, args, context) => {
    return updateJob({
      id: args.input.id,
      title: args.input.title,
      description: args.input.description,
    });
  },
};
