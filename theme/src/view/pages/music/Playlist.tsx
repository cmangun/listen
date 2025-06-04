// Modules
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@layout/SectionLayout'

// Utilities
import { PLAYLISTS } from '@core/constants/api-urls'
import { PlaylistTypes } from '@core/types'

function Playlist() {
  const { t } = useTranslation()
  const { data: playlist } = useFetch<PlaylistTypes>({ url: PLAYLISTS, type: 'playlist' })

  if (!playlist) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <SectionLayout
          title={t('trending_playlist_title')}
          data={playlist}
          card='playlist'
          slideView={4}
          grid
        />
      </div>
    </>
  )
}

export default Playlist
