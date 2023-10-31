class GameTimer {
    constructor() {
        this.gameDuration = 0;
        this.isPaused = false;
        this.timerInterval = null;
        this.gameTimerElement = document.getElementById('game-timer');
    }

    start() {
        if (!this.timerInterval) {
            this.timerInterval = setInterval(() => {
                this.updateGameTimer();
            }, 1000);
        }
    }

    reset() {
        this.stop()
        this.start()
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.gameDuration = 0;
    }

    updateGameTimer() {
        if (!this.isPaused) {
            const minutes = Math.floor(this.gameDuration / 60);
            const seconds = this.gameDuration % 60;
            this.gameTimerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            this.gameDuration++;
        }
    }
}

export default GameTimer;
