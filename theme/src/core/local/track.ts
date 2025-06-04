// Utilities
import { getFloat, getInt, getPersonInfo, localDate } from '../utils'
import { TrackTypes } from '../types'

/**
 *
 * Convert tracks data for local use
 * @param data
 * @returns
 */
export default function trackToLocal(data: any): TrackTypes {
  const track = {} as TrackTypes

  track.id = data.id
  track.title = data.name
  track.type = data.type
  track.cover = data.trackCover
  track.date = localDate(data.release)
  track.src = data.trackUrl
  track.company = data.company
  track.thumb = data.trackThumb
  track.rating = getFloat(data.trackRatings)
  track.duration = data.trackDuration
  track.played = getInt(data.played)
  track.favorites = getInt(data.favorites)
  track.downloads = data.trackDownloads
  track.lyrics = data.trackLyrics
  track.href = '/music/track/' + track.id

  track.artists = getPersonInfo(data.artists)
  track.composers = getPersonInfo(data.composers)
  track.lyricists = getPersonInfo(data.lyricists)
  track.directors = getPersonInfo(data.directors)
  track.categories = getPersonInfo(data.categories)

  if (data.premium) {
    track.premium = data.premium
  }

  if (data.favorite) {
    track.favorite = data.favorite
  }

  if (data.album) {
    track.album = {
      id: getInt(data.album.id),
      name: data.album.name,
    }
  }

  return track
}
