// Modules
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@/view/layouts/SectionLayout'

// Components
import Comments from '@component/Comments'
import TrackList from '@component/TrackList'

// Utilities
import { PLAYLISTS } from '@core/constants/api-urls'
import { PlaylistTypes } from '@core/types'

function PlaylistDetails() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: playlists } = useFetch<PlaylistTypes>({ url: PLAYLISTS, type: 'playlist' })

  if (!playlists) return null
  const playlist = playlists.find((item) => item.id === id) as PlaylistTypes

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <div>
              <span className='section__subtitle'>{t('playlist')}</span>
              <h3 className='mb-0'>{playlist.title}</h3>
            </div>
          </div>

          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list'>
            <div className='row'>
              {playlist.tracks?.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  <TrackList data={item} duration dropdown queue play link />
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionLayout
          title={t('top_playlist_title')}
          data={playlists}
          card='playlist'
          slideView={4}
          navigation
          autoplay
        />

        <Comments />
      </div>
    </>
  )
}

export default PlaylistDetails
