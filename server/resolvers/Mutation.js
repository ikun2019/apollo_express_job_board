import { createJob, deleteJob, updateJob } from '../db/jobs.js';
import { unAuthorizeError } from './Error.js';

export const Mutation = {
  createJob: (parent, args, context) => {
    if (!context.user) {
      throw unAuthorizeError("Missing authentication");
    };
    return createJob({
      companyId: context.user.companyId,
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
