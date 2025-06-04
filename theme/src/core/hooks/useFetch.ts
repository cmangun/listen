/**
 * @name useFetch
 * @file useFetch.ts
 * @description useful to get data from API.
 */

// Modules
import { useState, useEffect, useCallback } from 'react'

// Utilities
import { apiDataTypes } from '../types'
import albumToLocal from '../local/album'
import artistToLocal from '../local/artist'
import eventToLocal from '../local/event'
import genreToLocal from '../local/genre'
import planToLocal from '../local/plan'
import playlistToLocal from '../local/playlist'
import radioToLocal from '../local/radio'
import trackToLocal from '../local/track'

interface FetchData {
  [key: string]: any
}

interface UseFetchProps {
  /**
   * API url to fetch data
   */
  url: string

  /**
   * Type of data to fetch
   */
  type: apiDataTypes

  /**
   * Number of items per page
   */
  limit?: number

  /**
   * Query parameters to send with the API request
   */
  query?: Record<string, string>

  /**
   * Reference to the scrollable element to detect when to fetch more data
   */
  scrollElement?: HTMLElement
}

const useFetch = <T = FetchData>({ url, type, limit, query, scrollElement }: UseFetchProps) => {
  const [data, setData] = useState<T[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(limit || 0)
  const [hasMore, setHasMore] = useState(true)
  const [firstFetch, setFirstFetch] = useState(true)

  /**
   * Function to transform API data based on type
   */
  const transformData = (apiData: any[]) => {
    switch (type) {
      case 'album':
        return apiData.map((item) => albumToLocal(item))
      case 'artist':
        return apiData.map((item) => artistToLocal(item))
      case 'event':
        return apiData.map((item) => eventToLocal(item))
      case 'genre':
        return apiData.map((item) => genreToLocal(item))
      case 'plan':
        return apiData.map((item) => planToLocal(item))
      case 'playlist':
        return apiData.map((item) => playlistToLocal(item))
      case 'radio':
        return apiData.map((item) => radioToLocal(item))
      case 'track':
        return apiData.map((item) => trackToLocal(item))
      default:
        return apiData
    }
  }

  /**
   * Build query string with query params, start, and end
   */
  const getQueryString = useCallback(() => {
    if (limit || query) {
      const queryParams = new URLSearchParams(query)
      queryParams.append('start', start.toString())
      queryParams.append('end', end.toString())
      return queryParams.toString()
    }
  }, [query, start, end])

  /**
   * Fetch API data
   */
  const fetchData = async () => {
    try {
      setLoading(true)
      const queryString = getQueryString()
      const fullUrl = `${url}?${queryString ? '?' + queryString : ''}`
      const response = await fetch(fullUrl)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result: T[] = await response.json()
      const transformedData = transformData(result)
      // No more data to fetch
      if (transformedData.length < end) {
        setHasMore(false)
      }

      // Only append data if it's not the first fetch
      setData((prevData) => {
        if (firstFetch) {
          setFirstFetch(false)
          return transformedData // Do not append for the first fetch
        }
        return prevData ? [...prevData, ...transformedData] : transformedData
      })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * Scroll event handler
   */
  const handleScroll = useCallback(() => {
    if (!scrollElement) return

    const bottom =
      scrollElement.scrollHeight === scrollElement.scrollTop + scrollElement.clientHeight

    if (bottom && hasMore && !loading && limit) {
      // Increment start and end for pagination
      setStart((prevStart) => prevStart + limit)
      setEnd((prevEnd) => prevEnd + limit)
    }
  }, [hasMore, loading, limit, scrollElement])

  /**
   * Get more data
   */
  const onRefetch = useCallback(() => {
    if (hasMore && !loading && limit) {
      setStart((prevStart) => prevStart + limit)
      setEnd((prevEnd) => prevEnd + limit)
      setHasMore(true)
      fetchData()
    }
  }, [hasMore, loading, limit])

  // Effect to fetch data initially or when start/end/query change
  useEffect(() => {
    fetchData()
  }, [start, end, query])

  // Attach scroll event listener to the scrollable element
  useEffect(() => {
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, scrollElement])

  return { data, loading, error, hasMore, onRefetch }
}

export default useFetch
