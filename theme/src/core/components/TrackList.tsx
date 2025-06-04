/**
 * @name TrackList
 * @file TrackList.tsx
 * @description list component to display list items
 */

// Modules
import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import { RiCloseLine, RiHeartFill, RiHeartLine, RiVipCrownFill } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'
import { usePlayer } from '@core/contexts/Player'

// Components
import TrackDropdown, { TrackDropdownProps } from './TrackDropdown'
import PlayButton from './audio-player/Play'

// Utilities
import { InfoType } from '@core/types'

interface TrackListProps extends Omit<TrackDropdownProps, 'href'> {
  data: any
  dropdown?: boolean
  duration?: boolean
  link?: boolean
  remove?: boolean
}

const TrackList: React.FC<TrackListProps> = ({
  data,
  download,
  dropdown,
  duration,
  favorite,
  queue,
  playlist,
  play,
  link,
  remove,
}) => {
  const { replaceClassName } = useTheme()
  const { removeTrack } = usePlayer()

  const Component: any = link ? Link : 'div'
  const FavoriteIcon = data.favorite ? RiHeartFill : RiHeartLine
  const attr = link ? { to: data.href } : {}

  /**
   *
   * Get list options view
   * @returns
   */
  const listOptionView = () => {
    if (remove) {
      return (
        <li className='list__icon-hover'>
          <a role='button' className='d-inline-flex' onClick={() => removeTrack(data.id)}>
            <RiCloseLine size={16} />
          </a>
        </li>
      )
    } else if (data.premium) {
      return (
        <li>
          <span className='badge rounded-pill bg-info'>
            <RiVipCrownFill size={16} />
          </span>
        </li>
      )
    } else {
      return <></>
    }
  }

  return (
    <div className='list__item'>
      <div className='list__cover'>
        <Component className='ratio ratio-1x1' {...attr}>
          <img
            src={data.cover}
            width={320}
            height={320}
            alt={data.title ? data.title : data.name}
          />
        </Component>

        {play && <PlayButton className='p-2 border-0' iconSize={16} track={data} />}
      </div>

      <div className='list__content'>
        <Component className='list__title text-truncate' {...attr}>
          {data.title ? data.title : data.name}
        </Component>
        {data.artists && (
          <div className='list__subtitle text-truncate'>
            {data.artists.map((artist: InfoType, index: number) => (
              <Link key={index} to={'/music/artist/' + artist.id}>
                {artist.name}
                {data.artists.length - 1 === index ? '' : ', '}
              </Link>
            ))}
          </div>
        )}
      </div>

      <ul className='list__option'>
        {listOptionView()}
        <li>
          <a
            role='button'
            aria-label='Favorite'
            className={classNames('d-inline-flex', data.favorite && 'active')}
          >
            <FavoriteIcon className={classNames(data.favorite && 'text-danger')} />
          </a>
        </li>
        {duration && data.duration && <li>{data.duration}</li>}
        {dropdown && (
          <li>
            <TrackDropdown
              className={replaceClassName('dropstart d-inline-flex')}
              download={download}
              favorite={favorite}
              play={play}
              playlist={playlist}
              queue={queue}
              data={data}
              href={data.href}
            />
          </li>
        )}
      </ul>
    </div>
  )
}

TrackList.displayName = 'TrackList'
export default TrackList
