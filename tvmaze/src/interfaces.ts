interface IShowsReturns {
  id: number,
  name: string,
  summary: string,
  image: string
}
//TODO: rename interface, have this one be IShowsAPI, and the other IShows
interface IShows {
  show: {
    id: number,
    name: string,
    summary: string,
    image: { medium: string } | null;
  };
}

interface IEpisodes {
  id: number,
  name: string,
  season: number,
  number: number
}

export type { IShows, IShowsReturns, IEpisodes }