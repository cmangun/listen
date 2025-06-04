/**
 * @name Player
 * @file Player.tsx
 * @description use to handle player features
 */

// Modules
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { useSnackbar } from 'notistack'
import { useDebounceCallback, useEventListener, useLocalStorage, useScript } from 'usehooks-ts'

// Components
import AudioPlayer from '@component/audio-player'

// Utilities
import { addClass, delay, getPersonName, hasClass, removeClass } from '../utils'
import { COLLAPSE, SHOW, TRACK_KEY } from '../constants'
import { IdTypes, TrackTypes } from '../types'

interface PlayerContextProps {
  /**
   *
   * Queue the track to play
   * @param track
   */
  addQueue: (track: TrackTypes) => void

  /**
   *
   * Clear the playlist data upon clicking.
   */
  clearPlaylist: () => void

  /**
   *
   * Insert the upcoming track into the playlist.
   * Following the currently playing track.
   * @param track
   */
  nextPlay: (track: TrackTypes) => void

  /**
   *
   * Play all tracks and add them to the playlist
   * @param playlist
   */
  playAll: (playlist: TrackTypes[]) => void

  /**
   *
   * Toggle the play/pause functionality by clicking on the track.
   * @param track
   */
  playPause: (track: TrackTypes) => void

  /**
   *
   * Delete the track from both the playlist & the player.
   * @param id
   */
  removeTrack: (id: IdTypes) => void

  /**
   *
   * Toggle the player's status between playing & paused.
   */
  setPlayerStatus: () => void

  /**
   *
   * Change the volume of the player.
   * @param value
   */
  changeVolume: (value: number) => void

  /**
   *
   * Maintains data for the currently playing track.
   */
  activeTrack: TrackTypes

  /**
   *
   * The player is currently active.
   */
  isPlaying: boolean

  /**
   *
   * Holds tracks data
   */
  tracks: TrackTypes[]
}

const PlayerContext = createContext({} as PlayerContextProps)

interface PlayerProps {
  children: React.ReactNode
}

declare const Amplitude: any

let TRACKS: any[] = []
const ARTWORK_SIZES = ['96x96', '128x128', '192x192', '256x256', '384x384', '512x512']
const MEDIA_CONTROLS = {
  playPause: false,
  nextPrev: false,
}

const Player: React.FC<PlayerProps> = ({ children }) => {
  const location = useLocation()
  const [tracks, setTracks] = useLocalStorage<any>(TRACK_KEY, [])
  const { enqueueSnackbar } = useSnackbar()
  const status = useScript('/js/amplitude.min.js', {
    removeOnUnmount: false,
    id: 'Amplitude',
  })

  const [activeTrack, setActiveTrack] = useState({} as TrackTypes)
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<HTMLDivElement | null>(null)

  // Setup audio player
  useEffect(() => {
    if (status === 'ready' && tracks.length) {
      TRACKS = tracks
      initPlayer()
      handleTrackChange()
    }
  }, [status])

  // Set media data on active track change
  useEffect(() => {
    if (status === 'ready' && tracks.length && activeTrack) {
      mediaSession()
    }
  }, [activeTrack])

  // Change player view on route
  useEffect(() => {
    if (status === 'ready') {
      toggleBodyClass()
      const playerTracks = Amplitude.getSongs()
      const player = playerRef.current as HTMLElement
      const pathname = location.pathname

      if (playerTracks.length) {
        if (pathname.startsWith('/auth') || pathname.startsWith('/404')) {
          removeClass(player, SHOW)
          pause()
          handleTrackChange()
        } else if (!pathname.startsWith('/music') && typeof window !== 'undefined') {
          addClass(player, SHOW)
          addClass(player, COLLAPSE)
        } else {
          addClass(player, SHOW)
          hasClass(player, COLLAPSE) && removeClass(player, COLLAPSE)
        }
      }
    }
  }, [location.pathname, status])

  const addQueue = (track: TrackTypes) => {
    if (!isAdded(track.id)) {
      TRACKS.push(getTrackObject(track))
      setTracks(TRACKS)

      if (TRACKS.length) {
        initPlayer()
      }
    }
  }

  const clearPlaylist = () => {
    if (TRACKS.length) {
      // Clear player tracks
      TRACKS.forEach((_: TrackTypes, index: number) => Amplitude.removeSong(index))
    }

    TRACKS = []
    setTracks(TRACKS)
    pause()
    mediaSession()
    handleTrackChange()
  }

  // Get active track data
  const getCurrentTrack = () => Amplitude.getActiveSongMetadata()

  // Retrieve the index of a track based on its ID
  const getTrackIndex = (id: IdTypes) => TRACKS.findIndex((track: TrackTypes) => track.id === id)

  // Retrieve track data compatible with the player.
  const getTrackObject = (track: TrackTypes) => {
    return {
      ...track,
      name: track.title,
      artist: getPersonName(track?.artists) || [],
      url: track.src,
      cover_art_url: track.cover,
    }
  }

  // Handle browser media click event
  const handleMediaClick = (isPlay?: boolean) => {
    if (isPlay) {
      play()
      navigator.mediaSession.playbackState = 'playing'
    } else {
      pause()
      navigator.mediaSession.playbackState = 'paused'
    }

    setPlayerStatus()
  }

  // Handle player track change event
  const handleTrackChange = () => {
    setActiveTrack(getCurrentTrack())
    setPlayerStatus()
  }

  // Initialize player
  const initPlayer = (isPlay?: boolean) => {
    addClass(playerRef.current as HTMLElement, SHOW)
    Amplitude.init({
      songs: TRACKS,
      volume: 50,
      callbacks: {
        song_change: () => handleTrackChange(),
      },
    })

    isPlay && play()
    handleTrackChange()
  }

  // Check track is added in playlist
  const isAdded = (id: IdTypes) => {
    const index = getTrackIndex(id)
    if (index > -1) {
      enqueueSnackbar('The track is already in the lineup.')
      return true
    }

    return false
  }

  // Initialize browser media features
  const mediaSession = () => {
    const nextTrack = () =>
      TRACKS.length >= 2
        ? Amplitude.next(Amplitude.getActivePlaylist() || '')
        : enqueueSnackbar('Track lineup is empty')

    const prevTrack = () =>
      TRACKS.length >= 2
        ? Amplitude.prev(Amplitude.getActivePlaylist() || '')
        : enqueueSnackbar('Track lineup is empty')

    if ('mediaSession' in navigator) {
      const MEDIA = navigator.mediaSession
      // Set track meta on notification
      MEDIA.metadata = new window.MediaMetadata({
        title: activeTrack.title,
        artist: activeTrack.artists
          ? activeTrack.artists?.map((artist) => artist.name).join(',')
          : '',
        album: activeTrack.album ? activeTrack.album?.name : '',
        artwork: ARTWORK_SIZES.map((size) => ({
          src: activeTrack.cover,
          sizes: size,
          type: 'image/png',
        })),
      })

      if (TRACKS.length >= 1 && !MEDIA_CONTROLS.playPause) {
        MEDIA_CONTROLS.playPause = true
        MEDIA.setActionHandler('play', () => handleMediaClick(true))
        MEDIA.setActionHandler('pause', () => handleMediaClick())
      }

      if (TRACKS.length >= 2 && !MEDIA_CONTROLS.nextPrev) {
        MEDIA_CONTROLS.nextPrev = true
        MEDIA.setActionHandler('previoustrack', prevTrack)
        MEDIA.setActionHandler('nexttrack', nextTrack)
      }
    }
  }

  const nextPlay = (track: TrackTypes) => {
    if (!isAdded(track.id)) {
      const index = getTrackIndex(track.id)
      if (tracks.length) {
        const activeIndex = Amplitude.getActiveIndex()
        if (index === -1) {
          TRACKS.splice(activeIndex + 1, 0, getTrackObject(track))
        }
      } else {
        // Initialize player
        TRACKS.push(getTrackObject(track))
        initPlayer()
      }

      setTracks(TRACKS)
    }
  }

  // Window scroll event
  const onScroll = () => {
    const scrollY = window.innerHeight + Math.round(window.scrollY)
    const externalPage =
      scrollY >= document.body.offsetHeight &&
      !location.pathname.startsWith('/music') &&
      !location.pathname.startsWith('/auth') &&
      TRACKS.length > 0

    if (window.innerWidth >= 576) {
      document.body.classList.toggle('player-added', externalPage)
    }
  }

  // Pause active track
  const pause = () => Amplitude.pause()

  // Play active track
  const play = () => Amplitude.play()

  const playAll = (playlist: TrackTypes[]) => {
    const trackList = playlist.map((track) => getTrackObject(track))

    if (TRACKS.length) {
      const index = TRACKS.length
      TRACKS.push(...trackList)
      Amplitude.playSongAtIndex(index)
    } else {
      TRACKS = trackList
      initPlayer(true)
    }

    setTracks(TRACKS)
    setPlayerStatus()
  }

  const playPause = (track: TrackTypes) => {
    const trackId = getCurrentTrack().id

    if (trackId !== track.id) {
      const index = getTrackIndex(track.id)
      setActiveTrack(track)

      // Add track if not exist
      if (index === -1) {
        TRACKS.push(getTrackObject(track))
        setTracks(TRACKS)

        if (TRACKS.length === 1) {
          isPlaying && pause()
          initPlayer(true)
        } else {
          Amplitude.playSongAtIndex(getTrackIndex(track.id))
        }

        // Play exist track
      } else {
        Amplitude.playSongAtIndex(index)
      }
    } else {
      trackId === track.id && !isPlaying ? play() : pause()
    }

    setPlayerStatus()
  }

  const removeTrack = (id: IdTypes) => {
    const index = getTrackIndex(id)
    if (index > -1) {
      TRACKS.splice(index, 0)
      Amplitude.removeSong(index)
      // Clear playlist
      TRACKS.length === 0 ? clearPlaylist() : setTracks(TRACKS)
    }
  }

  const setPlayerStatus = () => {
    delay(1).then(() => {
      setIsPlaying(Amplitude.getPlayerState() === 'playing')
    })
  }

  // Toggle `body` class to handle player overlapping issues
  const toggleBodyClass = () => {
    const externalPage =
      window.innerWidth < 576 && !location.pathname.startsWith('/music') && TRACKS.length > 0
    document.body.classList.toggle('player-added', externalPage)
  }

  const changeVolume = (value: number) => {
    if (status === 'ready' && Amplitude) {
      Amplitude.setVolume(value)
    }
  }

  // Window resize event
  const onResize = useDebounceCallback(toggleBodyClass, 150)

  // Window events
  useEventListener('scroll', onScroll)
  useEventListener('resize', onResize)

  // Context props
  const context = useMemo(
    () => ({
      addQueue,
      clearPlaylist,
      nextPlay,
      playAll,
      playPause,
      removeTrack,
      setPlayerStatus,
      changeVolume,
      activeTrack,
      isPlaying,
      tracks,
    }),
    [activeTrack, isPlaying, tracks]
  )

  return (
    <PlayerContext.Provider value={context}>
      {children}
      <AudioPlayer ref={playerRef} />
    </PlayerContext.Provider>
  )
}

Player.displayName = 'Player'
export default Player

/**
 *
 * Player context hook
 * @returns
 */
export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a Player')
  }

  return context
}
