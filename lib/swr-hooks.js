import useSWR from "swr"

function fetcher(url) {
  return window.fetch(url).then((res) => {
    return res.json()
  })
}

export function useEntries() {
  const { data, error } = useSWR(`/api/getEmployees`, fetcher)

  return {
    employees: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEntry(id) {
  return useSWR(`/api/getEmployee?id=${id}`, fetcher)
}

export function useEmployeeStat(id) {
  return useSWR(`/api/absenteeism/getEmployeeStatus?id=${id}`, fetcher)
}
