import { getCompany } from '../db/companies.js';

export const Job = {
  date: (job) => {
    return toIsoDate(job.createdAt);
  },
  company: async (job) => {
    const company = await getCompany(job.companyId);
    return {
      ...company
    }
  }
};

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}