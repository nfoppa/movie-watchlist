const myKey = "a525214f";
const moviesDiv = document.getElementById("movies");
const form = document.getElementById("form");

function getMovieHTML(id) {
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
                        <button class="add-movie-btn" id="add-movie-btn" onclick="addToWatchlist('${movie.imdbID}')">
                        <img
                            class="plus-icon"
                            src="./assets/Icon3.svg"
                            alt="plus-icon"
                        />Watchlist
                        </button>
                        <p class="added" id='${movie.imdbID}'> Added!</p>
                            
                    </div>
                    <div class="movie-plot">
                    ${movie.Plot}
                    </div>
                </div>
            </div>
        `;
    });
}

function render(title) {
  moviesDiv.innerHTML = "";
  // Get array of imdbIDs from movie title
  fetch(`http://www.omdbapi.com/?apikey=${myKey}&s=${title}`)
    .then((res) => res.json())
    .then((data) => {
      let idArray = data.Search.map((movie) => movie.imdbID);
      // Get movie details from imdbIDs
      idArray.forEach((id) => {
        getMovieHTML(id);
      });
    });
}

function addToWatchlist(id) {
  localStorage.setItem(id, id);
  document.getElementById(id).style.display = "block";
  setTimeout(() => {
    document.getElementById(id).style.display = "none";
  }, 2000);
  console.log(localStorage);
}

function removeFromWatchlist(id) {
    localStorage.removeItem(id);
    render();
    console.log(localStorage);
  }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQuery = e.target[0].value;
  render(searchQuery);
});
