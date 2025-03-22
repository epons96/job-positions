import { SetStateAction, useCallback, useMemo, useState } from 'react'
import { Space, Input } from 'antd'
import { useGetJobs } from '../../hooks/useGetJobs'
import JobCard from './JobCard'
import { DropdownFilter, FilterOption } from '../../common/Components/DropdownFilter'
import { Job } from '../../hooks/types'
import CustomSpinner from '../../common/Components/CustomSpinner/CustomSpinner'

const { Search } = Input

const EXPERIENCE_LEVELS = [
  { label: 'Pasantía', value: 'Entry Level' },
  { label: 'Nivel medio', value: 'Mid Level' },
  { label: 'Nivel senior', value: 'Senior Level' },
];

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<FilterOption[]>([]);

  const handleLevelChange = useCallback((_values: string[], options: FilterOption[]) => {    
    setSelectedLevel(options);
  }, []);

  const filters = useMemo(() => ({
    level: selectedLevel.map(option => option.value)
  }), [selectedLevel]);
    
  const { data: jobs, isLoading, error } = useGetJobs(filters, true);

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
  if (error) return <div>Error al cargar los empleos</div>

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Buscar empleos..."
          allowClear
          style={{ width: 300 }}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
        />
        <DropdownFilter
          options={EXPERIENCE_LEVELS}
          placeholder="Nivel de experiencia"
          onChange={handleLevelChange}
          value={selectedLevel}
        />

      </Space>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {filteredJobs?.map((job: Job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Space>
    </Space>
  )
}

export default JobList