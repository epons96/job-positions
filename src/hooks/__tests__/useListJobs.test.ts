import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useListJobs } from '../useListJobs'
import axios from 'axios'
import { wrapper } from '../../test/util'

vi.mock('axios')

describe('useListJobs', () => {
  it('fetches jobs successfully', async () => {
    const mockResponse = {
      data: {
        page: 1,
        page_count: 2,
        items_per_page: 20,
        total: 30,
        took: 0,
        timed_out: false,
        results: [
          {
            id: 1,
            name: 'Test Job',
            company: {
              id: 1,
              name: 'Test Company',
              short_name: 'test'
            },
            type: 'Full-time',
            locations: [{ name: 'Remote' }],
            contents: '<p>Test description</p>',
            publication_date: '2024-03-15',
            short_name: 'test-job',
            model_type: 'job',
            levels: [],
            refs: {
              landing_page: ''
            },
            categories: []
          }
        ],
        aggregations: {}
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        url: 'https://api.test/jobs'
      }
    }

    vi.mocked(axios.get).mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useListJobs(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data?.pages[0].results).toHaveLength(1)
    expect(result.current.data?.pages[0].results[0].name).toBe('Test Job')
  })

  it('handles errors', async () => {
    const errorMessage = 'API Error'
    vi.mocked(axios.get).mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useListJobs(), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(new Error('Error al obtener los empleos'))
    })
  })
})