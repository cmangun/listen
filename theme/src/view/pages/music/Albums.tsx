// Modules
import { useTranslation } from 'react-i18next'

// Context
import { useTheme } from '@core/contexts/Theme'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import Section from '@layout/SectionLayout'

// Components
import TrackList from '@component/TrackList'

// Utilities
import { ALBUMS } from '@core/constants/api-urls'
import { AlbumTypes } from '@core/types'

function Albums() {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()
  const { data: albums } = useFetch<AlbumTypes>({ url: ALBUMS, type: 'album' })

  if (!albums) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <Section
          title={t('free_albums_title')}
          data={albums}
          card='album'
          slideView={5}
          navigation
          autoplay
        />

        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <span className={replaceClassName('d-block pe-3 fs-6 fw-semibold')}>
              10245 {t('sidebar.albums') + ' ' + t('in_the_list')}
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
          <div className='list list--lg'>
            <div className='row'>
              {albums.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  <TrackList data={item} dropdown favorite link playlist queue />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Albums
