const container = document.querySelector('.main-div');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();







// $('#movie li:last').keypress(function (e) {
//   var key = e.which;
//   if(key == 13)  // the enter key code
//    {
//     //  $('input[name = butAssignProd]').click();
//      console.log('hi')
//      return false;  
//    }
//  });   







$('li:not(:last-child)').click(function(e) {
  e.preventDefault();
  var $target = $(e.target)
  var movie = $target.attr("id");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var frontDiv = $('<div class="flip-card-front">');
      var backDiv = $('<div class="flip-card-back">');
      var rating = response.Rated;
      var pOne = $("<p>").text("Rating: " + rating);
      backDiv.append(pOne);
      var released = response.Released;
      var pTwo = $("<p>").text("Released: " + released);
      backDiv.append(pTwo);
      var plot = response.Plot;
      var pThree = $("<p>").text("Plot: " + plot);
      backDiv.append(pThree);
      var imgURL = response.Poster;
      var image = $('<img>').attr("src", imgURL);
      frontDiv.html(image);
      // Putting the entire movie above the previous movies
      $('.flip-card').removeClass('hide');
      $('.flip-card-inner').append(frontDiv);
      $(frontDiv).append(backDiv);
    });
  

});


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}



// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}





