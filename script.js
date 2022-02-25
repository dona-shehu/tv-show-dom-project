//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");


function setup() {
  makePageForEpisodes(allEpisodes);
}


function makePageForEpisodes(episodeList) {
  
  episodeList.forEach(episode => {

  // div container for h1, h2, img, p, p
  let divEpisode = document.createElement("div");
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
  titleEpisode.innerHTML = episodeName
  seasonEpisode.innerHTML = `S0${seasonNumber}E0${episodeNumber}`
  imageEpisode.src = episode.image.medium;
  descriptionP.innerHTML = episode.summary;
  dataOrigin.innerHTML = `The origin of the data is: &nbsp &nbsp <a href="${episode.url}">TVMaze.com</a>`;

  })
}
//Search and event keyup
let searchField = document.querySelector("#search");
let searchValue = "";

searchField.addEventListener("keydown", (event) => {

  searchValue = event.target.value.toLowerCase();
    let searchedEpisodes = allEpisodes.filter((episode) => 
    episode.name.toLowerCase().includes(searchValue) ||
    episode.summary.toLowerCase().includes(searchValue))
  rootElem.innerHTML = "";
  //recalling the function to recreate the page just for episode.includes(searchValue)
  makePageForEpisodes(searchedEpisodes);

  //displaying the number of searched episodes which includes the search value
  let displayNubOfSearched = document.querySelector(".display-number-of-episodes")
  displayNubOfSearched.innerHTML = `Displaying ${searchedEpisodes.length}/ ${allEpisodes.length}episodes`
  
}); 

//Select
let select = document.querySelector("#select")

allEpisodes.forEach(episode => {
  let option = document.createElement("option");
  select.appendChild(option)
  option.text = `S0${episode.season}E0${episode.number}~${episode.name} hello`
  option.value = episode.id;
  console.log(option.value)
})
select.addEventListener("change", (event) => {
    
  let selectedEpisode = allEpisodes.filter(episode => episode.id.toString() === event.target.value);
  rootElem.innerHTML = "";
  makePageForEpisodes(selectedEpisode); 
  let displayNubOfSearched = document.querySelector(".display-number-of-episodes")
  displayNubOfSearched.innerHTML = `Displaying ${selectedEpisode.length} / ${allEpisodes.length}episodes`;
})


window.onload = setup;