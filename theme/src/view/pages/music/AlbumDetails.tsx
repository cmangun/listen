// Modules
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@/view/layouts/SectionLayout'

// Components
import Comments from '@component/Comments'
import CoverInfo from '@component/CoverInfo'
import TrackList from '@component/TrackList'

// Utilities
import { ALBUMS } from '@core/constants/api-urls'
import { AlbumTypes } from '@core/types'

function AlbumDetails() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: albums } = useFetch<AlbumTypes>({ url: ALBUMS, type: 'album' })

  if (!albums) return null
  const album = albums.find((item) => item.id === id) as AlbumTypes

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <CoverInfo data={album} />

        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list'>
            <div className='row'>
              {album.tracks?.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  <TrackList data={item} duration dropdown playlist queue play link />
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionLayout
          title={t('related_albums_title')}
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

export default AlbumDetails
