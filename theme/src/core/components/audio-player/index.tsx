/**
 * @name AudioPlayer
 * @file index.tsx
 * @description audio player component
 */

// Modules
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  RiRepeat2Fill,
  RiShuffleFill,
  RiSkipBackMiniFill,
  RiSkipForwardMiniFill,
} from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'
import { usePlayer } from '@core/contexts/Player'

// Components
import TrackDropdown from '../TrackDropdown'
import Playlist from './Playlist'
import Volume from './Volume'
import PlayButton from './Play'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const AudioPlayer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { replaceClassName, playerSkin, rtl } = useTheme()
  const { activeTrack, tracks } = usePlayer()
  const [isDisable, setIsDisable] = useState(false)

  const Component: any = activeTrack.href ? Link : 'span'
  const attr = activeTrack.href ? { to: activeTrack.href } : {}
  const SkipBackIcon = rtl ? RiSkipForwardMiniFill : RiSkipBackMiniFill
  const SkipForwardIcon = rtl ? RiSkipBackMiniFill : RiSkipForwardMiniFill

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDisable(tracks.length < 2)
    }
  }, [tracks])

  return (
    // Player [[ Find at scss/framework/player.scss ]]
    <div ref={ref} id='player' data-player={playerSkin} {...props}>
      <div className='container'>
        <div className='player-container'>
          {/* Progress bar */}
          {activeTrack.type === 'track' && (
            <div className='player-progress'>
              <progress className='amplitude-buffered-progress player-progress__bar' value='0' />
              <progress className='amplitude-song-played-progress player-progress__bar' />
              <input
                type='range'
                className='amplitude-song-slider player-progress__slider'
                aria-label='Progress slider'
              />
            </div>
          )}

          {/* Cover [[ Find at scss/components/cover.scss ]] */}
          <div className='cover d-flex align-items-center'>
            <div className='cover__image'>
              <div className='ratio ratio-1x1'>
                <img
                  data-amplitude-song-info='cover_art_url'
                  src='/images/cover/small/1.jpg'
                  alt=''
                />
              </div>
            </div>
            <div className={replaceClassName('cover__content ps-3 d-none d-sm-block')}>
              <Component
                className='cover__title text-truncate'
                data-amplitude-song-info='name'
                {...attr}
              >
                {activeTrack.title}
              </Component>
              {activeTrack.artists && (
                <p className='cover__subtitle text-truncate'>
                  {activeTrack.artists.map((artist, index) => (
                    <Link key={index} to={'/music/artist/' + artist.id}>
                      {artist.name}
                      {activeTrack.artists.length - 1 === index ? '' : ', '}
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </div>

          <div className='player-control'>
            <button
              type='button'
              className={replaceClassName(
                'amplitude-repeat btn btn-icon me-4 d-none d-md-inline-flex'
              )}
              aria-label='Repeat'
              disabled={isDisable}
            >
              <RiRepeat2Fill size={20} />
            </button>
            <button
              type='button'
              className='amplitude-prev btn btn-icon'
              aria-label='Backward'
              disabled={isDisable}
            >
              <SkipBackIcon />
            </button>
            <PlayButton playerButton />
            <button
              type='button'
              className='amplitude-next btn btn-icon'
              aria-label='Forward'
              disabled={isDisable}
            >
              <SkipForwardIcon />
            </button>
            <button
              type='button'
              className={replaceClassName(
                'amplitude-shuffle amplitude-shuffle-off btn btn-icon ms-4 d-none d-md-inline-flex'
              )}
              aria-label='Shuffle'
              disabled={isDisable}
            >
              <RiShuffleFill size={20} />
            </button>
          </div>

          <div className='player-info'>
            <div className={replaceClassName('player-duration me-4 d-none d-xl-block')}>
              {activeTrack.type === 'track' ? (
                <>
                  <span className='amplitude-current-minutes'></span>:
                  <span className='amplitude-current-seconds'></span> /
                  <span className='amplitude-duration-minutes'></span>:
                  <span className='amplitude-duration-seconds'></span>
                </>
              ) : (
                <span>Live</span>
              )}
            </div>

            <Volume key={activeTrack.id ? 'active' : ''} />

            <TrackDropdown
              iconVertical
              download
              favorite
              playlist
              data={activeTrack}
              href={activeTrack.href}
              btnClassName='btn btn-icon'
              className={replaceClassName('dropstart d-none d-md-block player-options')}
            />

            <Playlist />
          </div>
        </div>
      </div>
    </div>
  )
})

AudioPlayer.displayName = 'AudioPlayer'
export default AudioPlayer
