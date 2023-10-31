class GuessedWords {
    constructor() {
        this.guessedWordsCount = 0; // Лічильник відгаданих слів
        this.guessedWordsCounterElement = document.getElementById('guessed-words-counter');
        this.updateGuessedWordsCounter();
    }

    increaseGuessedWordsCount() {
        this.guessedWordsCount++;
        this.updateGuessedWordsCounter();
    }

    resetCounter()
    {
        this.guessedWordsCount = 0;
        this.updateGuessedWordsCounter()
    }

    updateGuessedWordsCounter() {
        this.guessedWordsCounterElement.textContent = this.guessedWordsCount;
    }
}

export default GuessedWords
