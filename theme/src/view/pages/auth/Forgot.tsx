// Modules
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiHome4Line } from '@remixicon/react'

// Components
import PasswordForm from '@/view/forms/PasswordForm'

// Utilities
import { translationsObjectTypes } from '@core/types'

function Forgot() {
  const { t } = useTranslation()
  const auth: translationsObjectTypes = t('auth', { returnObjects: true })

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-2'>
        <h4 className='mb-0' dangerouslySetInnerHTML={{ __html: auth.forgot_password_title }} />
        <Link to='/' className='back-home'>
          <RiHome4Line />
        </Link>
      </div>
      <p className='fs-6'>{auth.forgot_password_description}</p>
      <PasswordForm />
    </>
  )
}

export default Forgot
