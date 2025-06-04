// Modules
import { useTranslation } from 'react-i18next'
import { RiLoader3Fill } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@/view/layouts/SectionLayout'

// Components
import TrackList from '@component/TrackList'

// Utilities
import { ALBUMS, TRACKS } from '@core/constants/api-urls'
import { AlbumTypes, TrackTypes } from '@core/types'

function Tracks() {
  const { data: albums } = useFetch<AlbumTypes>({ url: ALBUMS, type: 'album' })
  const { data: tracks } = useFetch<TrackTypes>({ url: TRACKS, type: 'track' })
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()

  if (!albums || !tracks) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <span className={replaceClassName('d-block pe-3 fs-6 fw-semibold')}>
              5240 {t('tracks') + ' ' + t('in_the_list')}
            </span>
            <div>
              <select className='form-select' aria-label='Filter track'>
                <option value='Popular'>Popular</option>
                <option value='Most played'>Most played</option>
                <option value='A to Z'>A to Z</option>
                <option value='Z to A'>Z to A</option>
              </select>
            </div>
          </div>

          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list'>
            <div className='row'>
              {tracks.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  <TrackList data={item} duration dropdown playlist queue play link />
                </div>
              ))}
            </div>
          </div>

          <div className='mt-5 text-center'>
            <button type='button' className='btn btn-primary'>
              <div className='btn__wrap'>
                <RiLoader3Fill />
                <span>{t('load_more')}</span>
              </div>
            </button>
          </div>
        </div>

        <SectionLayout
          title={t('free_albums_title')}
          data={albums}
          card='album'
          slideView={5}
          navigation
          autoplay
        />
      </div>
    </>
  )
}

export default Tracks
