export interface Job {
  contents: string;
  name: string;
  type: string;
  publication_date: string; // ISO string
  short_name: string;
  model_type: string;
  id: number;
  locations: Location[];
  categories: string[];
  levels: Level[];
  tags?: string[];
  refs: {
    landing_page: string;
  };
  company: Company;
}

export interface JobsResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  took: number;
  timed_out: boolean;
  total: number;
  results: Job[];
  aggregations: Record<string, unknown>;
}

export interface JobFilters {
  title?: string;
  location?: string;
  type?: string;
  level?: string[];
}

export interface Location {
  name: string;
}

export interface Level {
  name: string;
  short_name: string;
}

export interface Company {
  id: number;
  short_name: string;
  name: string;
}