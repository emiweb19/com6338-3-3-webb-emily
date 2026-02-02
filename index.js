var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

var wordToGuessEl = document.getElementById('word-to-guess')
var previousWordEl = document.getElementById('previous-word')
var incorrectLettersEl = document.getElementById('incorrect-letters')
var remainingGuessesEl = document.getElementById('remaining-guesses')
var scoreWinsEl = document.getElementById('wins')
var scoreLossesEl = document.getElementById('losses')
var currentWord = ''
var displayLetters = []

function chooseWord() {
  if (!currentWord) {
    currentWord = words[0]
  } else {
    currentWord = words[Math.floor(Math.random() * words.length)]
  }
  displayLetters = []
  for (var i = 0; i < currentWord.length; i++) {
    displayLetters.push('_')
  }
  wordToGuessEl.textContent = displayLetters.join('')
}

function revealLetter(letter) {
  for (var i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      displayLetters[i] = letter
    }
  }
  wordToGuessEl.textContent = displayLetters.join('')
}

function incorrectLetter(letter) {
  var incorrectLetters = incorrectLettersEl.textContent
  if (!incorrectLetters.includes(letter)) {
    incorrectLetters += letter + ' '
    incorrectLettersEl.textContent = incorrectLetters
    var remainingGuesses = parseInt(remainingGuessesEl.textContent)
    remainingGuesses -= 1
    remainingGuessesEl.textContent = remainingGuesses
  }
}

function winGame() {
  var scoreWins = parseInt(scoreWinsEl.textContent)
  scoreWins += 1
  scoreWinsEl.textContent = scoreWins
  previousWordEl.textContent = currentWord
  resetGame()
}

function loseGame() {
  var scoreLosses = parseInt(scoreLossesEl.textContent)
  scoreLosses += 1
  scoreLossesEl.textContent = scoreLosses
  previousWordEl.textContent = currentWord
  resetGame()
}

function resetGame() {
  remainingGuessesEl.textContent = 10
  incorrectLettersEl.textContent = ''
  chooseWord()
}

window.onload = function() {
  remainingGuessesEl.textContent = 10
  scoreWinsEl.textContent = 0
  scoreLossesEl.textContent = 0
  previousWordEl.textContent = ''
  incorrectLettersEl.textContent = ''
  chooseWord()
}

document.onkeyup = function(guessLetter) {
  var letter = guessLetter.key.toLowerCase()
  if (!/^[a-z]$/.test(letter)) {
    return
  }

  if (currentWord.includes(letter)) {
    revealLetter(letter)
  } else {
    incorrectLetter(letter)
  } 
  if (!displayLetters.includes('_')) {
    winGame()
    return
  }
  if (parseInt(remainingGuessesEl.textContent) === 0) {
    loseGame()
    return
  }
}