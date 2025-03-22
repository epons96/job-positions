import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { JobFilters, JobsResponse } from './types';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const PAGE_SIZE = 20;

async function fetchJobs({ pageParam = 1, filters = {} }: { pageParam?: number; filters?: JobFilters }): Promise<JobsResponse> {
  try {

    const queryString = new URLSearchParams();

    queryString.append('page', pageParam.toString());
    queryString.append('page_size', PAGE_SIZE.toString());
    
    if (filters.level?.length) {
      filters.level.forEach(level => queryString.append('level', level));
    }
    
    const url = `${API_ENDPOINT}?${queryString.toString()}`;
    console.log(url);
    
    const { data } = await axios.get<JobsResponse>(url);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los empleos');
  }
}

export function useGetJobs(filters: JobFilters = {}, enabled: boolean = true) {
  const jobsQueryKey = ['jobs', filters];

  async function getJobs({ pageParam = 1 }) {
    const response = await fetchJobs({ pageParam, filters });
    return response;
  }

  const jobsQuery = useInfiniteQuery({
    queryKey: jobsQueryKey,
    queryFn: getJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage: JobsResponse) => {
      if (lastPage.page < lastPage.page_count) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

  return jobsQuery;
}