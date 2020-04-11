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





$('li:not(:last-child)').hover(function(e) {
  e.preventDefault();
  var $target = $(e.target);
  var movie = $target.attr("id");
  console.log(movie)
  console.log(movie === undefined)

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var imgURL = response.Poster;


      $('.flip-card').removeClass('hide')
      var image = $('<img>').attr("src", imgURL)
      image.addClass('close-front')
      $('.flip-card-front').html(image);
      var exit = $('<button onclick="hide()">').text('x');
      exit.addClass('close');
      var rating = response.Rated;
      $('.flip-card-back').empty()
      var pOne = $("<p>").text("Rating: " + rating);
      $('.flip-card-back').append(pOne);
      var released = response.Released;
      var pTwo = $("<p>").text("Released: " + released);
      $('.flip-card-back').append(pTwo);
      var plot = response.Plot;
      var pThree = $("<p>").text("Plot: " + plot);
      $('.flip-card-back').append(pThree);
      $('.flip-card-back').prepend(exit)



});
})

function hide(){
  $('.flip-card').addClass('hide')
  $('.flip-card').addClass('hide')
}



$('.dropbtn').on('click', function(){
  console.log('true')
  $('#movie').removeClass('hide')
})

$('li').on('click', function(){
  console.log('true')
  $('#movie').addClass('hide')
})


// $('document:not(.dropdown, .flip-card)').hover(function(){

//   $('.flip-card').addClass('hide')

// }
// )


$(document).on('keypress',function(e) {
  if(e.which == 13) {
    var movieVal = $('.search-bar').val()
    console.log(movieVal);
    $('.search-bar').val(" ")
    var queryURL = "https://www.omdbapi.com/?t=" + movieVal + "&apikey=trilogy";
  
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var newLi = $('<li>')
      newLi.addClass('default')
      newLi.text(movieVal)
      $(newLi).insertBefore('.search-bar')
      var imgURL = response.Poster;
      var image = $('<img>').attr("src", imgURL);
      $('.flip-card-front').html(image)
      var rating = response.Rated;
      $('.flip-card-back').empty()
      var pOne = $("<p>").text("Rating: " + rating);
      $('.flip-card-back').append(pOne);
      var released = response.Released;
      var pTwo = $("<p>").text("Released: " + released);
      $('.flip-card-back').append(pTwo);
      var plot = response.Plot;
      var pThree = $("<p>").text("Plot: " + plot);
      $('.flip-card-back').append(pThree);
})
}});



const $menu = $('#myDropdown')

$(document).click(e => {
  console.log(e.target)
  if (!$('.dropbtn').is(e.target) && $menu.has(e.target).length === 0 ) {
    $menu.removeClass('show');
    // $('.flip-card').addClass('hide')}
  }
  $('.dropbtn').on('click', () => {
    $menu.addClass('show')
    // $('.flip-card').removeClass('hide')
  })
})

