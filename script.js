
const rootElem = document.getElementById("root");
let selectShow = document.querySelector("#shows")
let select = document.querySelector("#select")
let searchField = document.querySelector("#search");
let numOfEpisodes = document.querySelector(".display-number-of-episodes")
let allShows = getAllShows();

let searchValue = "";
let currentEpisodes;



function setup() {
  fetch(`https://api.tvmaze.com/shows/82/episodes`)
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.log(error))
  .then(data => {
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes)
  })

  searchField.addEventListener("keydown", keyDownOnSearch)
  select.addEventListener("change", changeOnSelect)
  selectShow.addEventListener("change", changeOnSelectShow)
}


function makePageForEpisodes(episodeList) {

  episodeList.forEach(episode => {

    // div container for h1, h2, img, p, p
    let divEpisode = document.createElement("div");
    divEpisode.setAttribute("id","episodes")
    rootElem.appendChild(divEpisode);

    // h1 for the title
    let titleEpisode = document.createElement("H1");
    titleEpisode.classList.add("title")
    divEpisode.appendChild(titleEpisode);
    let episodeName = episode.name;

    //h2 for season number & episode number 
    let seasonEpisode = document.createElement("H2");
    seasonEpisode.classList.add("season-episode");
    divEpisode.appendChild(seasonEpisode);
    let seasonNumber = episode.season;
    let episodeNumber = episode.number;

    //img
    let imageEpisode = document.createElement("img");
    divEpisode.append(imageEpisode);
    imageEpisode.classList.add("img")

    // p for description 
    let descriptionP = document.createElement("p")
    divEpisode.appendChild(descriptionP);
    descriptionP.classList.add("description")

    // <p> for data origin 
    let dataOrigin = document.createElement("p")
    divEpisode.appendChild(dataOrigin);
    dataOrigin.classList.add("data-origin")

    //adding  the content 
    titleEpisode.innerHTML = episodeName;
    seasonEpisode.innerHTML = `S${formatNumber(seasonNumber)}E${formatNumber(episodeNumber)}`
    imageEpisode.src = episode.image.medium;
    descriptionP.innerHTML = episode.summary;
    dataOrigin.innerHTML = `The origin of the data is: &nbsp &nbsp <a href="${episode.url}">TVMaze.com</a>`;

  })
  //Create Options for episodes
  episodeList.forEach(episode => {
    let option = document.createElement("option");
    select.appendChild(option)
    option.text = `S${formatNumber(episode.season)}E${formatNumber(episode.number)}~ ${episode.name}`
    option.value = episode.id;
  })
}


//Create Options for Shows 
function fillSelectForShows(){
let sortedShows = allShows.sort((a, b) => a.name.localeCompare(b.name))
   sortedShows.forEach(show => {
    let option = document.createElement("option")
    selectShow.appendChild(option);
    option.text = show.name; 
  })
}
fillSelectForShows()

function formatNumber(number){
  return number >= 10 ? number : `0${number}`;
}

//Select Show & Event Change, Fech API
function changeOnSelectShow() {
  let selectedShow = allShows.filter(show => show.name === event.target.value)
  let showId = selectedShow[0].id;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => console.log(error))
    .then(data => {
      currentEpisodes = data;
      rootElem.innerHTML = ""
      document.getElementById("select").innerHTML = "";
      makePageForEpisodes(currentEpisodes)
      numOfEpisodes.innerHTML = `Displaying ${currentEpisodes.length} / ${currentEpisodes.length}episodes`;
    })
    
}


//Select Episode & Event Change
function changeOnSelect() {
  let selectedEpisode = currentEpisodes.filter(episode => episode.id.toString() === event.target.value);
  rootElem.innerHTML = "";
  makePageForEpisodes(selectedEpisode);
  numOfEpisodes.innerHTML = `Displaying ${selectedEpisode.length} / ${currentEpisodes.length}episodes`;
}


//Search & Event Keydown
function keyDownOnSearch() {
  searchValue = event.target.value.toLowerCase();
  let searchedEpisodes = currentEpisodes
    .filter((episode) =>
      episode.name.toLowerCase().includes(searchValue) ||
      episode.summary.toLowerCase().includes(searchValue))
  rootElem.innerHTML = "";
  //recalling the function to recreate the page just for episode.includes(searchValue)
  makePageForEpisodes(searchedEpisodes);

  //displaying the number of  episodes which includes the search value
  numOfEpisodes.innerHTML = `Displaying ${searchedEpisodes.length}/ ${currentEpisodes.length}episodes`
}





window.onload = setup;