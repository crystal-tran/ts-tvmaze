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