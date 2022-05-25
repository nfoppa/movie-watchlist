const myKey = "a525214f";
const moviesDiv = document.getElementById("movies");
let idArray = [];
const suggestionHTML = `
        <p class="placeholder-text">
        Your watchlist is looking a little empty...
        </p>

        <div class="suggestion-text-container">
        <a href="./index.html" class="add-movie-btn search-link">
        <img class="plus-icon" src="./assets/Icon3.svg" alt="plus-icon" />
        <p>Let's add some movies!</p>
        </a>
        </div>
`;

function render() {
  moviesDiv.innerHTML = "";
  // Render movies if there are any in local storage
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let id = localStorage.getItem(localStorage.key(i));
      getMovieHTML(id);
    }
  } else {
    moviesDiv.innerHTML = suggestionHTML;
  }
}

function getMovieHTML(id) {
  // Get API's movie content from movie id
  fetch(`http://www.omdbapi.com/?apikey=${myKey}&i=${id}`)
    .then((res) => res.json())
    .then((movie) => {
      moviesDiv.innerHTML += `
              <div class="movie-container">
                  <div class="movie-poster-container">
                      <img class="movie-poster" src=${movie.Poster}>
                  </div>
                  <div class="movie-info">
                      <div class="movie-header">
                          <h4 class="movie-title">${movie.Title}</h4>
                          <div class="movie-rate">
                              <img src="./assets/star.png" alt="star icon" /> ${movie.imdbRating}
                          </div>
                      </div>
                      <div class="movie-description">
                          <div class="duration">${movie.Runtime}</div>
                          <div class="genre">${movie.Genre}</div>
                          <button class="add-movie-btn" id="add-movie-btn" onclick="removeFromWatchlist('${movie.imdbID}')">
                          <img
                              class="plus-icon"
                              src="./assets/Icon2.svg"
                              alt="plus-icon"
                          />Watchlist
                          </button>
                      </div>
                      <div class="movie-plot">
                      ${movie.Plot}
                      </div>
                  </div>
              </div>
          `;
    });
}

function removeFromWatchlist(id) {
  localStorage.removeItem(id);
  render();
  console.log(localStorage);
}

render();

console.log(localStorage);
