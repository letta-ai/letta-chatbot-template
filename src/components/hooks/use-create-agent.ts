import { useMutation } from '@tanstack/react-query'

export function useCreateAgent() {
  return useMutation({
    mutationFn: () => {
      return fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
    }
  })
}
