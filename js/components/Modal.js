class Modal {
    constructor(gameTimer) {
        this.gameTimer = gameTimer;
        this.modal = document.querySelector('.modal');
        this.closeModalButton = document.querySelector('#closeModal');
        this.modalText = document.querySelector('#modalText');
        this.modalTextDefault = 'Вітаю! Ти відгадав слово';
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

    showModal(message, withConfetti = false) {
        if (withConfetti) {
            startConfetti();
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
    }
}

// Експортуємо клас Modal
export default Modal;
