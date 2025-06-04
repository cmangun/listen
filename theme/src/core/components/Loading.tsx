/**
 * @name Loading
 * @file Loading.tsx
 * @description page loader component
 */

// Modules
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const Loading: React.FC = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const equalizer = Array.from({ length: 6 }, (_, index) => index + 1)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return loading ? (
    <div id='loader'>
      <div className='loader'>
        <div className='loader__eq mx-auto'>
          {equalizer.map((index) => (
            <span key={index}></span>
          ))}
        </div>
        <span className='loader__text mt-2'>Loading</span>
      </div>
    </div>
  ) : null
}

Loading.displayName = 'Loading'
export default Loading
