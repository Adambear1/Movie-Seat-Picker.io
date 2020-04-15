const container = document.querySelector('.main-div');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.querySelector('#movie');
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


$('li:not(:last-child)').on('click', (function(e) {
  e.preventDefault();
  var $target = $(e.target);
  var movieVal = $target.attr("id");
  var queryURL = "https://www.omdbapi.com/?t=" + movieVal + "&apikey=trilogy";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var imgURL = response.Poster;
<<<<<<< HEAD


      $('.flip-card').removeClass('invisible')
=======
>>>>>>> 396a4f125b7143999af2c5566178efc906903fbe
      var image = $('<img>').attr("src", imgURL)
      $('.flip-card').removeClass('invisible')
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
<<<<<<< HEAD
})

function hide(){
  $('.flip-card').addClass('invisible')
  // $('.flip-card').addClass('hide')
}



$('.dropbtn').on('click', function(){
  console.log('true')
  $('#myDropdown').removeClass('invisible')
})

$('li:not(:last-child)').on('click', function(){
  console.log('true')
  $('#myDropdown').addClass('invisible')
})


// $('document:not(.dropdown, .flip-card)').hover(function(){

//   $('.flip-card').addClass('hide')

// }
// )


$(document).on('keypress',function(e) {
=======
      fetch("http://api.giphy.com/v1/gifs/search?q=" + movieVal + "&api_key=dc6zaTOxFJmzC&limit=10")
        .then(res => res.json())
        .then(data => {
          let results = data;
          console.log(results)
          document.querySelector('.screen').style.backgroundColor = 'transparent'
              
          var i = 0;
          if (i < results.data.length){
            setInterval(function(){
              document.querySelector('.screen').setAttribute('src', results.data[i].images.fixed_width_small.url)
              i++
            }, 
              1500)
          } else {
            i = 0 
          }


         
          })
        }))


$(document).on('click keypress',function(e) {
>>>>>>> 396a4f125b7143999af2c5566178efc906903fbe
  if(e.which == 13) {
    var input = $('.search-bar').val()
    var movieVal = input.replace(/\s+/g, '-')
    var random = Math.floor(Math.random() * 7) + 8
    console.log(movieVal);
    $('.search-bar').val(" ")
    var queryURL = "https://www.omdbapi.com/?t=" + movieVal + "&apikey=trilogy";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var newLi = $('<li id=' + movieVal + '  value=' + random + '></li>')
      newLi.attr('id', movieVal)
      newLi.addClass('default')
      newLi.text(input + "  ($" + random + ")")
      $(newLi).insertAfter('#The-Lion-King')
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

    fetch("http://api.giphy.com/v1/gifs/search?q=" + movieVal + "&api_key=dc6zaTOxFJmzC&limit=10")
      .then(res => res.json())
      .then(data => {
      const results = data
        console.log(results)
        console.log(results.data[0].images.fixed_width_small)

        document.querySelector('.screen').style.backgroundColor = 'transparent'
        document.querySelector('.screen').setAttribute('src', results.data[0].images.fixed_width_small.url)
})
  }});








const $menu = $('#myDropdown')

$(document).click(e => {
  console.log(e.target)
  if (!$('.dropbtn').is(e.target) && $menu.has(e.target).length === 0 ) {
    $menu.removeClass('show');
  }
  $('.dropbtn').on('click', () => {
    $menu.addClass('show')
  })
})

$('.dropbtn').on('click', function(){
  console.log('true')
  $('#myDropdown').removeClass('invisible')
})

$('li:not(:last-child)').on('click', function(){
  console.log('true')
  $('#myDropdown').addClass('invisible')
})

function hide(){
  $('.flip-card').addClass('invisible')
}






