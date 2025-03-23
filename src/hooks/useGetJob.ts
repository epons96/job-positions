import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Job } from "./types"

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export function useGetJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await axios.get<Job>(`${API_ENDPOINT}/${id}`)
      return data
    },
    enabled: !!id
  })
}