import GameTimer from './GameTimer.js';
import HintBox from './HintBox.js';
import Modal from './Modal.js';
import GuessedWords from './GuessedWords.js';

class Game {
    constructor(words, colors) {
        this.words = words;
        this.colors = colors;
        this.gameTimer = new GameTimer();
        this.hintBox = new HintBox(this.gameTimer);
        this.modal = new Modal(this.gameTimer);
        this.guessedWords = new GuessedWords();
        this.lettersContainer = document.querySelector('.letters');
        this.resetGame = document.querySelector('#reset-game');
        this.audioClick = new Audio("audio/click.mp3");
        this.audioWin = new Audio("audio/win.mp3");
        this.selectedWord = '';
        this.selectedWordHint = '';
        this.hintButton = document.getElementById('show-hint');
    }

    start() {
        // Початок гри
        this.gameTimer.start();
        this.startGame();
    }

    startGame() {
        if (this.words !== null) {
            this.playNextWord()
            this.addListeners();
        }
    }

    getRandomWord(words) {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    drawLetters(letters, colors) {
        letters.forEach(letter => {
            const letterElement = document.createElement('div');
            letterElement.classList.add('letters__item');
            letterElement.textContent = letter;
            // Встановлюємо випадковий колір з масиву кольорів
            letterElement.style.color = colors[Math.floor(Math.random() * colors.length)];
            this.lettersContainer.appendChild(letterElement);
        });
    }

    shuffleArray(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex > 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    addListeners() {
        this.hintButton.addEventListener('click', (event) => {
            this.hintBox.showHint(this.selectedWordHint);
        });

        this.lettersContainer.addEventListener('click', (event) => {
            this.audioClick.play();
            const target = event.target;

            if (target.classList.contains('letters__item')) {
                const letters = this.lettersContainer.querySelectorAll('.letters__item');
                const index = Array.from(letters).indexOf(target);

                if (index > 0) {
                    const leftLetter = letters[index - 1];
                    const temp = leftLetter.textContent;
                    leftLetter.textContent = target.textContent;
                    target.textContent = temp;
                }

                if (this.lettersContainer.textContent.trim() === this.selectedWord) {
                    this.wordGuessed();
                    this.playNextWord();
                }

                this.resetGame.addEventListener('click', () => {
                    this.startOver();
                });
            }
        });
    }

    wordGuessed() {
        this.audioWin.play();
        this.modal.showModal(`Вітаю! Ви відгадали слово: ${this.selectedWord}`, true);
        this.guessedWords.increaseGuessedWordsCount();
    }

    playNextWord() {
        this.lettersContainer.innerHTML = '';
        let wordObj = this.getRandomWord(this.words);
        this.selectedWord = wordObj.word.toUpperCase();
        this.selectedWordHint = wordObj.hint;
        const letters = this.shuffleArray(this.selectedWord.split(''));
        this.drawLetters(letters, this.colors);
    }

    startOver() {
        this.lettersContainer.innerHTML = '';
        this.guessedWords.resetCounter();
        this.gameTimer.reset();
        this.playNextWord();
    }


}

export default Game