// Define the endpoint URL where movie data is hosted
const endpointsURl = "http://localhost:3000/films";

document.addEventListener("DOMContentLoaded", () => {
  const filmList = document.getElementById("films");
  filmList.firstChild.remove();
  // fetching films from the URL
  fetchFilms(endpointsURl);
});

function fetchFilms(endpointsURl) {
  fetch(endpointsURl)
    .then((response) => response.json())
    .then((movies) => {
      movies.forEach((movie) => {
        // showing the movie details individually
        showMovie(movie);
      });
      // adding click event to the movie list items
      addClickEvent();
    });
}

function showMovie(movie) {
  const filmList = document.getElementById("films");
  const li = document.createElement("li");
  li.style.cursor = "pointer";
  // showing movie title in uppercase
  li.textContent = movie.title.toUpperCase();
  filmList.appendChild(li);
}

function addClickEvent() {
  const listItems = document.querySelectorAll("#films li");

  listItems.forEach((listItem, index) => {
    listItem.addEventListener("click", () => {
        // fetching individual movie details on click
      fetchMovieData(index);
    });
  });
}

async function fetchMovieData(index) {
  try {
    // fetching movie data based on index
    const response = await fetch(`${endpointsURl}/${index}`);
    const movie = await response.json();
// set up movie details on UI
    setUpMovieDetails(movie);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

function setUpMovieDetails(movie) {
    // setting up poster image source
  const preview = document.getElementById("poster");
  preview.src = movie.poster;
// setting up movie title
  const movieTitle = document.getElementById("title");
  movieTitle.textContent = movie.title;
// setting up movie runtime
  const movieTime = document.getElementById("runtime");
  movieTime.textContent = `${movie.runtime} minutes`;
// setting up movie description
  const movieDescription = document.getElementById("film-info");
  movieDescription.textContent = movie.description;
// setting up movie showtime
  const showTime = document.getElementById("showtime");
  showTime.textContent = movie.showtime;
// calculating available tickets 
  const tickets = document.getElementById("ticket-num");
  tickets.textContent = movie.capacity - movie.tickets_sold;
}

const btn = document.getElementById("buy-ticket");

btn.addEventListener("click", function (e) {
  let remTickets = parseInt(
    document.getElementById("ticket-num").textContent,
    10
  );
  e.preventDefault();
  if (remTickets > 0) {
    // showing tickets decreasing on purchase
    document.getElementById("ticket-num").textContent = remTickets - 1;
  } else if (remTickets === 0) {
    // showing Sold out message when tickets are sold out
    btn.textContent = "Sold Out";
  }
});
