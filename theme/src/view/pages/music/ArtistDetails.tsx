// Modules
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layout
import SectionLayout from '@/view/layouts/SectionLayout'

// Component
import Comments from '@component/Comments'
import CoverInfo from '@component/CoverInfo'
import TrackList from '@component/TrackList'

// Utilities
import { ALBUMS, ARTISTS } from '@core/constants/api-urls'
import { AlbumTypes, ArtistTypes } from '@core/types'

function ArtistDetails() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: artists } = useFetch<ArtistTypes>({ url: ARTISTS, type: 'artist' })
  const { data: albums } = useFetch<AlbumTypes>({ url: ALBUMS, type: 'album' })

  if (!artists || !albums) return null
  const artist = artists.find((item) => item.id === id) as ArtistTypes

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/artists.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <CoverInfo data={artist} />

        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <h3 className='mb-0' dangerouslySetInnerHTML={{ __html: t('top_tracks_title') }} />
          </div>

          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list'>
            <div className='row'>
              {artist.tracks.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  <TrackList data={item} duration dropdown playlist queue play link />
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionLayout
          title={t('top_albums_title')}
          data={albums}
          card='album'
          slideView={5}
          navigation
          autoplay
        />

        <Comments />
      </div>
    </>
  )
}

export default ArtistDetails
