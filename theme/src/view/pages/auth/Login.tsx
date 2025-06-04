// Modules
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiHome4Line } from '@remixicon/react'

// Components
import LoginForm from '@/view/forms/LoginForm'

// Utilities
import { translationsObjectTypes } from '@core/types'
import { BRAND } from '@core/constants'

function Login() {
  const { t } = useTranslation()
  const auth: translationsObjectTypes = t('auth', { returnObjects: true })

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-2'>
        <h4 className='mb-0'>
          {auth.login_title + ' '} <span className='text-primary'>{BRAND.name}</span>
        </h4>
        <Link to='/' className='back-home'>
          <RiHome4Line />
        </Link>
      </div>
      <p className='fs-6'>{auth.login_description}</p>
      <LoginForm />
    </>
  )
}

export default Login
