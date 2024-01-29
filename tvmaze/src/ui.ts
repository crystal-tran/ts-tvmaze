import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
import { IShows, IShowsReturns, IEpisodes } from "./interfaces.ts";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $episodeList = $("#episodeList");


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: IShowsReturns[]): void {
  $showsList.empty();
  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              alt="${show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await searchShowsByTerm(term as string);

  // $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a list of episodes, create markup for each and add to DOM */

function populateEpisodes(episodes: IEpisodes[]): void {
  console.log("populateEpisodes=", episodes)
  $episodeList.empty();
  for (let episode of episodes) {
    // console.log("episode", episode)
    const $episode = $(
      `<li>${episode.name} (season ${episode.season}, number ${episode.number})
       </li>`
    );
    console.log($episode)
    $episodeList.append($episode);
  }
  $episodesArea.show();
}

// $episodesArea.on("click", getAndDisplayEpisodes);

async function getAndDisplayEpisodes(showId : number): Promise<void> {
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
}

/**Retrieves and displays list of episodes for a show, accepts a showId which is
 * a number.
 */

$showsList.on(
  "click",
  ".Show-getEpisodes",
  async function handleEpisodeClick(evt: JQuery.ClickEvent) : Promise<void> {
    const showId = Number(
      $(evt.target).closest(".Show").data("show-id")
    );
    await getAndDisplayEpisodes(showId);
  });