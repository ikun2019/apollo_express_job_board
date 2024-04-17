import { notFoundError } from './Error.js';
import { companyLoader, getCompany } from '../db/companies.js';

export const Job = {
  date: (job) => {
    return toIsoDate(job.createdAt);
  },
  company: async (job) => {
    return companyLoader.load(job.companyId);
    // const company = await getCompany(job.companyId);
    // if (!company) {
    //   throw notFoundError('Companyが見つかりません');
    // };
    // return {
    //   ...company
    // }
  }
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}