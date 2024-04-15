import { createJob, deleteJob, updateJob } from '../db/jobs.js';
import { notFoundError, unAuthorizeError } from './Error.js';

export const Mutation = {
  createJob: (parent, args, context) => {
    if (!context.user) {
      throw unAuthorizeError("認証されていません");
    };
    return createJob({
      companyId: context.user.companyId,
      title: args.input.title,
      description: args.input.description,
    });
  },
  deleteJob: async (parent, args, context) => {
    const jobId = args.id;
    if (!context.user) {
      throw unAuthorizeError('認証されていません');
    };
    const job = await deleteJob(jobId, context.user.companyId);
    if (!job) {
      throw new notFoundError('jobが見つかりません');
    };
    return job;
  },
  updateJob: (parent, args, context) => {
    if (!context.user) {
      throw unAuthorizeError('認証されていません');
    }
    const job = updateJob({
      id: args.input.id,
      companyId: context.user.companyId,
      title: args.input.title,
      description: args.input.description,
    });
    if (!job) {
      throw notFoundError('jobが見つかりません');
    };
    return job;
  },
};
