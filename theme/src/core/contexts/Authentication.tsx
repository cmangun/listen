/**
 * @name Authentication
 * @file Authentication.tsx
 * @description use to authorize user & protect music routes
 */

// Modules
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

// Utilities
import { TRACK_KEY, USER_KEY } from '../constants'
import { CurrentUserTypes } from '../types'

interface AuthContextProps {
  /**
   *
   * User logout
   */
  logout: () => void

  /**
   *
   * Current user data
   */
  currentUser: CurrentUserTypes | null
}

const AuthContext = createContext({} as AuthContextProps)

interface AuthenticationProps {
  children: React.ReactNode
}

const Authentication: React.FC<AuthenticationProps> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState<CurrentUserTypes | null>(null)

  // Check user authentication on route change
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USER_KEY) as string)
    if (!data && location.pathname.startsWith('/music')) {
      navigate('/auth')
    }
    setUser(data)
  }, [location.pathname, navigate])

  const logout = () => {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TRACK_KEY)
    navigate('/')
  }

  const context = useMemo(
    () => ({
      logout,
      currentUser: user,
    }),
    [user]
  )

  return <AuthContext.Provider value={context} {...props} />
}

Authentication.displayName = 'Authentication'
export default Authentication

/**
 *
 * Authentication context hook
 * @returns
 */
export const useAuthentication = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthentication must be used within a Authentication')
  }

  return context
}
