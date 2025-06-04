/**
 * @name AvatarGroup
 * @file AvatarGroup.tsx
 * @description avatar group component
 */

// Modules
import React from 'react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Utilities
import { EventTypes } from '@core/types'

interface Props {
  data: EventTypes
}

const AvatarGroup: React.FC<Props> = ({ data }) => {
  const { replaceClassName } = useTheme()

  return (
    data.attendees && (
      <div className='d-flex align-items-center'>
        {/* Avatar group [[ Find at scss/components/avatar.scss ]] */}
        <div className='avatar-group'>
          {data.attendees.map((attendee) => (
            <div key={attendee.id} className='avatar'>
              <div className='avatar__image'>
                <img src={attendee.cover} width={128} height={128} alt={attendee.name} />
              </div>
            </div>
          ))}
        </div>
        {data.totalAttendee && (
          <div className={replaceClassName('ps-1')}>{data.totalAttendee - 3 + '+'}</div>
        )}
      </div>
    )
  )
}

AvatarGroup.displayName = 'AvatarGroup'
export default AvatarGroup
