"use client"

/**
 * @name TrackDropdown
 * @file TrackDropdown.tsx
 * @description dropdown options component
 */

// Modules
import type React from "react"
import classNames from "classnames"
import { Link } from "react-router-dom" // Changed import
import { RiMore2Fill, RiMoreFill } from "@remixicon/react"

// Contexts
import { usePlayer } from "@core/contexts/Player"

export interface TrackDropdownProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "download" | "id"> {
  data?: any
  btnClassName?: string
  download?: boolean
  favorite?: boolean
  iconVertical?: boolean
  play?: boolean
  playlist?: boolean
  queue?: boolean
}

const TrackDropdown: React.FC<TrackDropdownProps> = ({
  className,
  btnClassName,
  download,
  favorite,
  href,
  iconVertical,
  data,
  play,
  playlist,
  queue,
}) => {
  const { addQueue, nextPlay, playAll, playPause } = usePlayer()

  /**
   *
   * Handle link `onClick` event
   */
  const handleClick = () => (data.tracks ? playAll(data.tracks) : playPause(data))

  return (
    // Cover [[ Find at scss/components/cover.scss ]]
    <div className={className}>
      <a
        role="button"
        className={classNames(btnClassName, "dropdown-link")}
        data-bs-toggle="dropdown"
        aria-label="Options"
        aria-expanded="false"
      >
        {iconVertical ? <RiMore2Fill /> : <RiMoreFill />}
      </a>
      <div className="dropdown-menu dropdown-menu-sm">
        {favorite && (
          <a className="dropdown-item" role="button">
            Favorite
          </a>
        )}
        {playlist && (
          <a className="dropdown-item" role="button">
            Add to playlist
          </a>
        )}
        {queue && (
          <>
            <a className="dropdown-item" role="button" onClick={() => addQueue(data)}>
              Add to queue
            </a>
            <a className="dropdown-item" role="button" onClick={() => nextPlay(data)}>
              Next to play
            </a>
          </>
        )}
        {download && (
          <a className="dropdown-item" role="button">
            Download
          </a>
        )}
        <a className="dropdown-item" role="button">
          Share
        </a>
        <div className="dropdown-divider"></div>
        {play ? (
          <a className="dropdown-item" role="button" onClick={handleClick}>
            Play
          </a>
        ) : (
          href && (
            <Link to={href} className="dropdown-item">
              View details
            </Link>
          )
        )}
      </div>
    </div>
  )
}

TrackDropdown.displayName = "TrackDropdown"
export default TrackDropdown
