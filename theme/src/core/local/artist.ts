// Utilities
import trackToLocal from './track'
import { getFloat, getInt, localDate } from '../utils'
import { ArtistTypes } from '../types'

/**
 *
 * Convert tracks data for local use
 * @param data
 * @returns
 */
export default function artistToLocal(data: any): ArtistTypes {
  const artist = {} as ArtistTypes

  artist.id = data.id
  artist.name = data.name
  artist.type = data.type
  artist.totalAlbums = getInt(data.totalAlbums)
  artist.totalTracks = getInt(data.totalTracks)
  artist.favorites = getInt(data.favorites)
  artist.cover = data.artistCover
  artist.description = data.description
  artist.href = '/music/artist/' + artist.id

  artist.tracks = data.trackList.map((item: any) => trackToLocal(item))

  if (data.dob) {
    artist.dob = localDate(data.dob)
  }

  if (data.artistRatings) {
    artist.rating = getFloat(data.artistRatings)
  }

  return artist
}
