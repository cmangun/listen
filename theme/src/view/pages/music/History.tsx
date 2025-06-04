// Modules
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Components
import TrackList from '@component/TrackList'

// Utilities
import { TRACKS } from '@core/constants/api-urls'
import { TrackTypes } from '@core/types'

function History() {
  const { t } = useTranslation()
  const { data: tracks } = useFetch<TrackTypes>({ url: TRACKS, type: 'track' })

  if (!tracks) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <div className='flex-grow-1'>
              <span className='section__subtitle'>{t('history_subtitle')}</span>
              <h3 className='mb-0'>{t('sidebar.history')}</h3>
            </div>
            <a role='button' className='btn btn-link'>
              {t('clear_all')}
            </a>
          </div>

          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list'>
            <div className='row'>
              {tracks.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  <TrackList data={item} favorite duration dropdown playlist queue play link />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default History
