/**
 * @name AuthLayout
 * @file AuthLayout.tsx
 * @description Auth pages layout
 */

// Modules
import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout: React.FC = () => {
  return (
    // Auth [[ Find at scss/framework/auth.scss ]]
    <div className='auth py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-5 col-lg-7 col-md-9 col-sm-11 mx-auto'>
            <div className='card'>
              <div className='card-body p-sm-5'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AuthLayout.displayName = 'AuthLayout'
export default AuthLayout
