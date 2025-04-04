import { SetStateAction, useCallback, useMemo, useState } from 'react'
import { Space, Input, Grid } from 'antd'
import { useListJobs } from '../../hooks/useListJobs'
import JobCard from './JobCard'
import { DropdownFilter, FilterOption } from '../../common/Components/DropdownFilter'
import { Job } from '../../hooks/types'
import CustomSpinner from '../../common/Components/CustomSpinner/CustomSpinner'
import { FetchError } from '../../common/Components/FetchError/FetchError'
import { InfiniteScroll } from '../../common/Components/InfiniteScroll/InfiniteScroll'
import { useTranslation } from 'react-i18next';
import "./index.css";

const { Search } = Input;
const { useBreakpoint } = Grid;

const EXPERIENCE_LEVELS = [
  { label: 'Pasantía', value: 'Entry Level' },
  { label: 'Nivel medio', value: 'Mid Level' },
  { label: 'Nivel senior', value: 'Senior Level' },
];

const JobList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<FilterOption[]>([]);
  const screens = useBreakpoint();

  const handleLevelChange = useCallback((_values: string[], options: FilterOption[]) => {    
    setSelectedLevel(options);
  }, []);

  const filters = useMemo(() => ({
    level: selectedLevel.map(option => option.value)
  }), [selectedLevel]);
    
  const {
    data: jobs,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useListJobs(filters, true);

  const allJobs: Job[] = useMemo(() =>
    jobs?.pages.flatMap(page => page.results) || []
    , [jobs]);
  
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearchTerm =
        job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearchTerm;
    });
  }, [allJobs, searchTerm]);

  if (isLoading) return <CustomSpinner fullscreen/>
  if (error) return <FetchError title={t('Hemos tenido un error al cargar la página')} subTitle={t('Intente nuevamente en unos minutos')} />

  return (
    <Space direction="vertical" className="w-full job-list" size={screens.xs ? 12 : 16}>
      <Space
        direction={screens.sm ? "horizontal" : "vertical"}
        className="w-full mb-4"
        size={screens.sm ? 16 : 12}
      >
        <Search
          placeholder={t('Buscar empleos...')}
          allowClear
          className={screens.sm ? "w-[300px]" : "w-full"}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
        />
        <DropdownFilter
          options={EXPERIENCE_LEVELS}
          placeholder={t('Nivel de experiencia')}
          onChange={handleLevelChange}
          value={selectedLevel}
        />

      </Space>

      <InfiniteScroll
        onLoadMore={() => (hasNextPage && filteredJobs.length > 0) ? fetchNextPage() : undefined}
        hasMore={!!hasNextPage && filteredJobs.length > 0}
        isLoading={isFetchingNextPage}
      >
        <div className="grid gap-4 w-full">
          <div className={`
            grid 
            gap-4 
            ${screens.lg ? 'grid-cols-3' : screens.md ? 'grid-cols-2' : 'grid-cols-1'}
          `}>
            {filteredJobs?.map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
        {(isLoading || isFetchingNextPage) && (
          <div className="py-4">
            <CustomSpinner fullscreen={false} />
          </div>
        )}
      </InfiniteScroll>
    </Space>
  )
}

export default JobList