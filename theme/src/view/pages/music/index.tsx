// Modules
import classNames from 'classnames'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Components
import SectionLayout from '@layout/SectionLayout'
import Tab from '@component/Tab'
import TrackList from '@component/TrackList'

// Utilities
import {
  AlbumTypes,
  ArtistTypes,
  EventTypes,
  PlaylistTypes,
  RadioTypes,
  TrackTypes,
} from '@core/types'
import { ALBUMS, ARTISTS, EVENTS, PLAYLISTS, RADIO, TRACKS } from '@core/constants/api-urls'

function Music() {
  const { t } = useTranslation()

  const { data: albums } = useFetch<AlbumTypes>({ url: ALBUMS, type: 'album' })
  const { data: artists } = useFetch<ArtistTypes>({ url: ARTISTS, type: 'artist' })
  const { data: events } = useFetch<EventTypes>({ url: EVENTS, type: 'event' })
  const { data: playlist } = useFetch<PlaylistTypes>({ url: PLAYLISTS, type: 'playlist' })
  const { data: radio } = useFetch<RadioTypes>({ url: RADIO, type: 'radio' })
  const { data: tracks } = useFetch<TrackTypes>({ url: TRACKS, type: 'track' })

  if (!albums || !artists || !events || !playlist || !radio || !tracks) return null

  //
  // Data for tab list view
  const tabs = [
    {
      id: 'trending',
      name: t('trending'),
      list: [...tracks].slice(0, 5),
    },
    {
      id: 'international',
      name: t('international'),
      list: [...tracks].slice(5),
    },
    {
      id: 'recent',
      name: t('recent'),
      list: [...tracks].slice(0, 5),
    },
  ]

  //
  // Divide albums data into two part to set a design.
  const divide = Math.ceil(albums.length / 2)
  const albumList = []
  albumList.push([...albums].slice(0, divide))
  albumList.push([...albums].slice(-divide))

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/home.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <SectionLayout
          title={t('chart_title')}
          subtitle={t('chart_subtitle')}
          href='/music/tracks'
          data={tracks}
          card='track'
          slideView={5}
          navigation
          autoplay
        />

        <div className='row'>
          <div className='col-xl-6'>
            <SectionLayout
              title={t('upcoming_event_title')}
              href='/music/events'
              data={events}
              card='event'
              slideView={2}
              pagination
              autoplay
            />
          </div>
          <div className='col-xl-1'></div>
          <div className='section col-xl-5'>
            <Tab id='tracks_list'>
              {tabs.map((tab, index) => (
                <li key={tab.id} className='nav-item' role='presentation'>
                  <button
                    className={classNames('nav-link', index === 0 && 'active')}
                    id={tab.id}
                    data-bs-toggle='tab'
                    data-bs-target={'#' + tab.id + '_pane'}
                    type='button'
                    role='tab'
                    aria-controls={tab.id + '_pane'}
                    aria-selected={index === 0 ? true : false}
                  >
                    {tab.name}
                  </button>
                </li>
              ))}
            </Tab>

            <div className='tab-content mt-4' id='tracks_list_content'>
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  id={tab.id + '_pane'}
                  role='tabpanel'
                  aria-labelledby={tab.id}
                  tabIndex={0}
                  className={classNames('tab-pane fade', index === 0 && 'show active')}
                >
                  {/* List [[ Find at scss/components/list.scss ]] */}
                  <div className='list'>
                    {tab.list.map((item: any, listIndex: number) => (
                      <TrackList
                        key={listIndex}
                        data={item}
                        play
                        duration
                        dropdown
                        favorite
                        playlist
                        queue
                        link
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionLayout
          title={t('new_release_title')}
          subtitle={t('new_release_subtitle')}
          href='/music/tracks'
          data={tracks}
          card='track'
          slideView={5}
          navigation
          autoplay
        />

        <SectionLayout
          title={t('feature_artists_title')}
          subtitle={t('feature_artists_subtitle')}
          href='/music/artists'
          data={artists}
          card='avatar'
          slideView={6}
          pagination
          autoplay
        />

        <section className='section'>
          <div className='section__head'>
            <div className='flex-grow-1'>
              <span className='section__subtitle'>{t('top_albums_subtitle')}</span>
              <h3 className='mb-0' dangerouslySetInnerHTML={{ __html: t('top_albums_title') }} />
            </div>
            <Link to='/music/albums' className='btn btn-link'>
              {t('view_all')}
            </Link>
          </div>
          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list list--lg list--order'>
            <div className='row'>
              {albumList.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  {item.map((album: AlbumTypes) => (
                    <TrackList key={album.id} data={album} download dropdown favorite link />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionLayout
          title={t('playlist_title')}
          subtitle={t('playlist_subtitle')}
          href='/music/playlists'
          data={playlist}
          card='playlist'
          slideView={4}
          navigation
          autoplay
        />

        <SectionLayout
          title={t('live_radio_title')}
          subtitle={t('live_radio_subtitle')}
          href='/music/stations'
          data={radio}
          card='radio'
          slideView={5}
          pagination
          autoplay
        />
      </div>
    </>
  )
}

export default Music
