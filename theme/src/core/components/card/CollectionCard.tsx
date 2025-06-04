/**
 * @name CollectionCard
 * @file CollectionCard.tsx
 * @description collection card component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'

// Utilities
import { PlaylistTypes } from '@core/types'

interface Props {
  data: PlaylistTypes
  info?: boolean
}

const CollectionCard: React.FC<Props> = ({ data, info }) => {
  return (
    // Cover [[ Find at scss/components/cover.scss ]]
    <div className='cover cover--round scale-animation'>
      <div className='cover__image'>
        <Link className='ratio ratio-16x9 d-block' to={data.href}>
          <img src={data.cover} width={540} height={320} alt={data.title} />
        </Link>
        <div className='cover__image__content'>
          <Link to={data.href} className='cover__title mb-1 fs-6 text-truncate'>
            {data.title}
          </Link>
          {info && (
            <span className='cover__subtitle'>
              {data.tracks.length} Tracks
              {data?.likes ? '| ' + data?.likes + ' Favorites' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

CollectionCard.displayName = 'CollectionCard'
export default CollectionCard
