import { useState, useEffect } from 'react'
import { fetchProjects } from '../api/projectDetails'

const useProject = (pageNum) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)
    const [nextOffset,setNextOffset] = useState('');

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller
        fetchProjects(nextOffset,{ signal })
            .then(data => {
                setData(prev => {
                       return [...prev, ...data.projectDetailList]
                }
                )
                setHasNextPage(data.hasMore)
                setIsLoading(false)
                setNextOffset(data.nextOffset)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()

    }, [pageNum])

    return { isLoading, isError, error, data, hasNextPage,nextOffset }
}

export default useProject