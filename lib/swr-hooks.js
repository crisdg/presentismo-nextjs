import useSWR from "swr"

function fetcher(url) {
  return window.fetch(url).then((res) => res.json())
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
  console.log(id)
  return useSWR(`/api/getEmployee?id=${id}`, fetcher)
}
