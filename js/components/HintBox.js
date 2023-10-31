class HintBox {
    constructor(gameTimer) {
        this.gameTimer = gameTimer;
        this.hintBox = document.querySelector('.hint-box');
        this.hintTextElement = document.querySelector('.hint-box__text');
        this.hintTextDefault = 'Це підказка для кнопки.';
        this.addEventListeners();

    }

    toggleHint() {
        if (this.hintBox.classList.contains("hidden")) {
            this.hintBox.classList.remove("hidden");
        } else {
            this.hintBox.classList.add("hidden");
        }
    }

    addEventListeners() {
        window.addEventListener('click', (event) => {
            if (event.target === this.hintBox) {
                this.hideHint();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideHint();
            }
        });
    }

    showHint(message) {
        this.gameTimer.pause()
        this.hintTextElement.textContent = message ?? this.hintTextDefault;
        this.hintBox.classList.remove('hidden');
    }

    hideHint() {
        this.gameTimer.resume()
        this.hintBox.classList.add('hidden');
        this.hintTextElement.textContent = '';
    }
}

export default HintBox