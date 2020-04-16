const container = document.querySelector('.main-div');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.querySelector('#movie');
populateUI();
let ticketPrice = +movieSelect.value;
var taxAmt = 0;
var tickettotal = 0
var subtotal = 0;
var totalPrice = 0;
var selectedSeats = 0;
var selectedSeatsCount = 0;
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}
function calculateSubtotal (tickettotal){
  if (isNaN(tickettotal)){
    tickettotal = 0;
  }
  subtotal = (tickettotal + popcorntotal + sodatotal + hotdogtotal);
  console.log(tickettotal);
  $("#subtotal").text("Subtotal: $" +subtotal);
  var taxAmt = (subtotal * .1);
  $("#taxvalue").text("Tax: $" + taxAmt);
  var totalPrice = subtotal + taxAmt;
  $("#totalp").text("Total: $" + totalPrice);
}
// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  var tickettotal = selectedSeatsCount * ticketPrice;
  total.innerText = tickettotal;
 
  if (isNaN(ticketPrice)){
    $("#tickets").text("🎟️ Tickets: "+ selectedSeatsCount + " x $0");
  }
  else {
  $("#tickets").text("🎟️ Tickets: "+ selectedSeatsCount + " x $" + ticketPrice);     
}
  if (isNaN(ticketPrice)){
    total.innerText = 0
    tickettotal = 0
    taxAmt = 0 
    totalPrice = 0
  }
  console.log(tickettotal);
calculateSubtotal(tickettotal);
  
}
minusBtn = '<i class="fas fa-minus"></i>'
var popcornCount = 0
var popcornCost = 5.50
var popcorntotal = 0
$('#popcorn').on('click', function(){
  popcornCount ++
  $('#popcorn').html('🍿 Popcorn:  ' + popcornCount  + '  *  $'  +  popcornCost +'0')
  popcorntotal = (popcornCost * popcornCount)
  calculateSubtotal();
})
var sodaCount = 0
var sodaCost = 3.75
var sodatotal = 0
$('#soda').on('click', function(){
  sodaCount ++
  $('#soda').html('🥤 Soda:  ' + sodaCount + '  *  $'  +  sodaCost)
  sodatotal = (sodaCost * sodaCount)
  calculateSubtotal();
})
var hotdogCount = 0
var hotdogCost = 4.95  
var hotdogtotal = 0
$('#hotdog').on('click', function(){
  hotdogCount ++
  $('#hotdog').html('🌭 Hotdog:  ' + hotdogCount + '  *  $'  +  hotdogCost)
  hotdogtotal = (hotdogCost * hotdogCount)
  calculateSubtotal();
})
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
movieSelect.addEventListener('mouseover', function(e){
  ticketPrice = e.target.value;
  // console.log(e.target.value)
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
// 
$(document).on('click', (function(e) {
  $('li:not(:last-child)').on('click', (function(e) {
    // console.log($(this).siblings().attr('id'))
    console.log(e.target.id)
    e.preventDefault();
    var $target = $(e.target);
    var movieVal = $target.attr("id");
    console.log(movieVal)
    var queryURL = "https://www.omdbapi.com/?t=" + movieVal + "&apikey=trilogy";
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var imgURL = response.Poster;
        var image = $('<img>').attr("src", imgURL)
        $('.flip-card').removeClass('invisible')
        image.addClass('close1-front')
        $('.flip-card-front').html(image);
        var exit = $('<button onclick="hide()">').text('x');
        exit.addClass('close1');
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
        fetch("http://api.giphy.com/v1/gifs/search?q=" + movieVal + "&api_key=dc6zaTOxFJmzC&limit=10")
          .then(res => res.json())
          .then(data => {
            let results = data;
            console.log(results)
            document.querySelector('.screen').style.backgroundColor = 'transparent'
                
            var i = 0;
            if (i < results.data.length){
              setInterval(function(){
                document.querySelector('.screen').setAttribute('src', results.data[i].images.fixed_width_small.url);
                i++;
              }, 
                1500)
            } else {
              i = 0 
            }  
            })
            console.log(movieVal)
            $('#movie-name').text("Movie selected:  " + movieVal)
          }))
  
}))
// //Search bar
$(document).on('click keypress',function(e) {
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
    $('#movie-name').html("Movie selected:  " + '<p>' + input + '</p>')
  }});
const $menu = $('#myDropdown')
$(document).click(e => {
  console.log(e.target)
  if (!$('.dropbtn').is(e.target) && $menu.has(e.target).length === 0 ) {
    $menu.removeClass('show1');
  }
  $('.dropbtn').on('click', () => {
    $menu.addClass('show1')
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

$('.close').on('click', function(){
  $('.bg-modal').addClass('hide')
})
$('#submit-payment').on('click', function(){
  $('.bg-modal').removeClass('hide')
})