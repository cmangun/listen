// Modules
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

// Utilities
import { translationsObjectTypes } from '@core/types'

function NotFound() {
  const { t } = useTranslation()
  const errorPage: translationsObjectTypes = t('error_page', { returnObjects: true })

  return (
    <div className='d-flex align-items-center justify-content-center min-vh-100'>
      <div className='container text-center fs-5'>
        <div className='row'>
          <div className='col-xl-7 col-lg-9 col-lg-10 mx-auto'>
            <h1
              className='display-1 fw-bold'
              dangerouslySetInnerHTML={{ __html: errorPage.title }}
            />
            <p>{errorPage.description}</p>
            <Link
              to='/'
              className='btn btn-lg btn-primary rounded-pill mt-5'
              style={{ minWidth: 200 }}
            >
              {errorPage.link}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
