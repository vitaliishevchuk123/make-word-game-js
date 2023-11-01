class Modal {
    constructor(gameTimer) {
        this.type = 'guessedModal';
        this.gameTimer = gameTimer;
        this.modal = document.querySelector('.modal');
        this.closeModalButton = document.querySelector('#closeModal');
        this.modalText = document.querySelector('#modalText');
        this.modalTextDefault = 'Вітаю! Ти відгадав слово';
        this.audioGuessed = new Audio("audio/win.mp3");
        this.audioWin = new Audio("audio/success-fanfare.mp3");
        this.addEventListeners()
    }

    addEventListeners() {
        this.closeModalButton.addEventListener('click', () => {
            this.hideModal();
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.hideModal();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    showModal(message, type = 'guessedModal') {
        this.type = type;
        startConfetti();
        if (this.type === 'guessedModal') {
            this.audioGuessed.play();
        } else {
            this.audioWin.play();
        }
        this.gameTimer.pause()
        this.modalText.textContent = message ?? this.modalTextDefault;
        this.modal.classList.remove('hidden');
    }

    hideModal() {
        stopConfetti();
        this.gameTimer.resume()
        this.modal.classList.add('hidden');
        this.modalText.textContent = '';
        this.sendModalClosedEvent();
    }

    sendModalClosedEvent() {
        const modalClosedEvent = new Event(`${this.type}Closed`);
        window.dispatchEvent(modalClosedEvent);
    }
}

// Експортуємо клас Modal
export default Modal;
