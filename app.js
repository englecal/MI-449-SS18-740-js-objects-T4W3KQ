// ----
// DATA
// ----
// A couple jokes to start with

var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

var stringifiedJokes = window.localStorage.getItem('stringifiedJokes', jokes)
if (stringifiedJokes != null) {
  jokes = JSON.parse(stringifiedJokes)
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'
// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes objects
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('stringifiedJokes', stringifiedJokes)
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

var jokeAbout = document.getElementById('joke-About')
var jokeSetup = document.getElementById('joke-Setup')
var jokePunchline = document.getElementById('joke-Punchline')
var rememberButton = document.getElementById('remember-Button')
rememberButton.addEventListener('click', function () {
  var about = jokeAbout.value
  var setup = jokeSetup.value
  var punchline = jokePunchline.value
  jokes[about] = {
    setup: setup,
    punchline: punchline
  } // turn jokes into string then save to local storage
  updatePage()
})

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var joke = jokes[requestedJokeKey]
  if (joke) {
    jokeBox.innerHTML = '<p>' + joke.setup + '</p>' + '<p>' + joke.punchline + '</p>'
  } else {
    jokeBox.textContent = noJokesMessage
  }
}
// Forget bad jokes
var forgetJokeInput = document.getElementById('forget-Joke')
var forgetButton = document.getElementById('forget-Button')
forgetButton.addEventListener('click', function () {
  var forgetJokeKey = forgetJokeInput.value
  delete jokes[forgetJokeKey]
  updatePage()
})

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
