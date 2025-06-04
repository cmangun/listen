/**
 * @name AvatarCard
 * @file AvatarCard.tsx
 * @description artist avatar card component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'

// Utilities
import { PersonTypes } from '@core/types'

interface Props {
  data: PersonTypes
}

const AvatarCard: React.FC<Props> = ({ data }) => {
  return (
    // Avatar [[ Find at scss/components/avatar.scss ]]
    <div className='avatar avatar--xxl scale-animation d-block text-center'>
      <div className='avatar__image mx-auto'>
        <Link to={'/music/artist/' + data.id}>
          <img src={data.cover} width={128} height={128} alt={data.name} />
        </Link>
      </div>
      <Link to={'/music/artist/' + data.id} className='avatar__title mt-3'>
        {data.name}
      </Link>
    </div>
  )
}

AvatarCard.displayName = 'AvatarCard'
export default AvatarCard
