import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import JobCard from '../JobCard'
import { renderWithProviders } from '../../../test/util'
import { Job } from '../../../hooks/types'

const mockJob: Job = {
  id: 1,
  name: 'Frontend Developer',
  company: {
    id: 1,
    name: 'Test Company',
    short_name: 'test'
  },
  type: 'Full-time',
  locations: [{ name: 'Remote' }],
  contents: '<p>Job description</p>',
  publication_date: '2024-03-15',
  short_name: 'frontend-dev',
  model_type: 'job',
  levels: [],
  refs: {
    landing_page: ''
  },
  categories: []
}

describe('JobCard', () => {

  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(min-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('renders job information correctly', () => {
    renderWithProviders(<JobCard job={mockJob} />)
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('Full-time')).toBeInTheDocument()
    expect(screen.getByText('Remote')).toBeInTheDocument()
  })

  it('contains a link to job detail', () => {
    renderWithProviders(<JobCard job={mockJob} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/jobs/1')
  })
})