/**
 * @name PlayButton
 * @file PlayButton.tsx
 * @description music play button component
 */

// Modules
import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { RiPauseFill, RiPlayFill } from '@remixicon/react'
import { useEventCallback } from 'usehooks-ts'

// Contexts
import { usePlayer } from '@core/contexts/Player'

// Utilities
import { addClass, removeClass } from '@core/utils'
import { TrackTypes } from '@core/types'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  track?: TrackTypes
  playlist?: TrackTypes[]
  iconSize?: number
  playerButton?: boolean
  primaryButton?: boolean
}

const PlayButton: React.FC<Props> = ({
  className,
  iconSize,
  playlist,
  playerButton,
  primaryButton,
  track,
  ...props
}) => {
  const { playAll, playPause, setPlayerStatus, activeTrack, isPlaying } = usePlayer()

  const isPlayerButton = playerButton && isPlaying
  const isTrackButton =
    activeTrack.id === track?.id && activeTrack.type === track?.type && !playerButton && isPlaying

  const Icon = isPlayerButton || isTrackButton ? RiPauseFill : RiPlayFill

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const btn = buttonRef.current
    if (!isPlaying && btn) {
      removeClass(btn, 'amplitude-playing')
      addClass(btn, 'amplitude-paused')
    }
  }, [isPlaying, buttonRef.current])

  /**
   *
   * Handle play button `onClick`
   */
  const handleClick = useEventCallback(() => {
    if (playlist) {
      playAll(playlist)
    } else if (playerButton) {
      setPlayerStatus()
    } else {
      playPause(track as TrackTypes)
    }
  })

  /**
   *
   * Add play button class
   * @returns
   */
  const btnClassName = () => {
    const classes = [className, 'btn btn-icon rounded-pill']

    primaryButton ? classes.push('btn-primary') : classes.push('btn-default')

    if (playerButton) classes.push('amplitude-play-pause')
    if (!primaryButton && !playerButton) classes.push('btn-play')
    if (isTrackButton) classes.push('active')

    return classes
  }

  return (
    <button
      ref={buttonRef}
      type='button'
      aria-label={isPlayerButton || isTrackButton ? 'Pause' : 'Play'}
      onClick={handleClick}
      className={classNames(btnClassName())}
      {...(playlist && { id: 'play_all' })}
      {...props}
    >
      <Icon size={iconSize} />
    </button>
  )
}

PlayButton.displayName = 'PlayButton'
export default PlayButton
