const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";

interface IShowsReturns {
  id: number,
  name: string,
  summary: string,
  image: string
}

interface IShows {
  show: {
    id: number,
    name: string,
    summary: string,
    image: { medium: string; };
  };
}

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise <IShowsReturns[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const showSearchParams = new URLSearchParams({ q: term });
  const response = await fetch(`${TVMAZE_API_URL}search/shows${showSearchParams}`);
  const apiShowData = await response.json();

  return apiShowData.map((s: IShows) => {
    const result = s.show;
    return {
      id: result.id,
      name: result.name,
      summary: result.summary,
      image: result.image.medium as string || MISSING_IMAGE_URL;
    };
  });
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
