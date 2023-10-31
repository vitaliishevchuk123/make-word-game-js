import GameTimer from './GameTimer.js';
import Modal from './Modal.js';

class Game {
    constructor(words, colors) {
        this.words = words;
        this.colors = colors;
        this.gameTimer = new GameTimer();
        this.modal = new Modal();
        this.lettersContainer = document.querySelector('.letters');
        this.audioClick = new Audio("audio/click.mp3");
        this.audioWin = new Audio("audio/win.mp3");
        this.originalWord = '';
    }

    start() {
        // Початок гри
        this.gameTimer.start();
        this.startGame();
    }

    startGame() {
        if (this.words !== null) {
            this.word = this.getRandomWord(this.words).toUpperCase();
            this.originalWord = this.word; // Зберігаємо початкове слово
            const letters = this.shuffleArray(this.word.split(''));
            this.drawLetters(letters, this.colors);
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
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    addListeners() {
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
                console.log(this.lettersContainer.textContent.trim(), this.originalWord)
                if (this.lettersContainer.textContent.trim() === this.originalWord) {
                    this.audioWin.play();
                    this.modal.showModal(`Вітаю! Ви відгадали слово: ${this.originalWord}`, true);
                    this.resetGame();
                }
            }
        });
    }

    resetGame() {
        this.lettersContainer.innerHTML = '';
        this.word = this.getRandomWord(this.words).toUpperCase();
        this.originalWord = this.word;
        const letters = this.shuffleArray(this.word.split(''));
        this.drawLetters(letters, this.colors);
    }
}

export default Game