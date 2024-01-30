import { s } from "vitest/dist/reporters-1evA5lom.js";
import { IShows, IShowsReturns, IEpisodes } from "./interfaces";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<IShowsReturns[]> {
  const showSearchParams = new URLSearchParams({ q: term });
  const response = await fetch(`${TVMAZE_API_URL}search/shows?${showSearchParams}`);
  const apiShowData : IShows[] = await response.json();

  return apiShowData.map(s => {
    const result = s.show;
    return {
      id: result.id,
      name: result.name,
      summary: result.summary,
      image: result.image ? result.image.medium : MISSING_IMAGE_URL
      // image: result.image.medium || MISSING_IMAGE_URL
    };
  });
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): Promise<IEpisodes[]> {
  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  const episodeData = await response.json();
  //TODO: can apply type to episodeData
  //do some handle erroring for 404 errors

  return episodeData.map((e: IEpisodes) => ({
    id: e.id,
    name: e.name,
    season: e.season,
    number: e.number
  }));
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
