import { getJobsByCompany } from '../db/jobs.js';

export const Company = {
  jobs: (company) => {
    return getJobsByCompany(company.id);
  },
};