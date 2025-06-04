// Modules
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiHome4Line } from '@remixicon/react'

// Components
import RegisterForm from '@/view/forms/RegisterForm'

// Utilities
import { translationsObjectTypes } from '@core/types'
import { BRAND } from '@core/constants'

function Register() {
  const { t } = useTranslation()
  const auth: translationsObjectTypes = t('auth', { returnObjects: true })

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-2'>
        <h4 className='mb-0'>
          {auth.register_title + ' '} <span className='text-primary'>{BRAND.name}</span>
        </h4>
        <Link to='/' className='back-home'>
          <RiHome4Line />
        </Link>
      </div>
      <p
        className='fs-6'
        dangerouslySetInnerHTML={{
          __html:
            auth.register_1_description + ' ' + BRAND.name + ' ' + auth.register_2_description,
        }}
      />
      <RegisterForm />
    </>
  )
}

export default Register
