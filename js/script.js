const lettersContainer = document.querySelector('.letters'),
    audioClick = new Audio("audio/click.mp3"),
    audioWin = new Audio("audio/win.mp3");
let originalWord,
    words,
    colors,
    word;

async function fetchData(path) {
    try {
        const response = await fetch(path);
        return response.json();
    } catch (error) {
        console.error('Помилка при завантаженні файлу');
        return null;
    }
}

async function startGame() {
    words = await fetchData('../storage/words.json');
    colors = await fetchData('../storage/colors.json');
    if (words !== null) {
        word = getRandomWord(words).toUpperCase()
        originalWord = word; // Зберігаємо початкове слово
        const letters = shuffleArray(word.split(''));
        drawLetters(letters, colors);
        addListeners();
        // console.log(letters);
    }
}

function getRandomWord(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function drawLetters(letters, colors) {
    letters.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.classList.add('letters__item');
        letterElement.textContent = letter;
        // Встановлюємо випадковий колір з масиву кольорів
        letterElement.style.color = colors[Math.floor(Math.random() * colors.length)];
        lettersContainer.appendChild(letterElement);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function addListeners() {
    lettersContainer.addEventListener('click', function (event) {
        audioClick.play()
        const target = event.target;

        // Перевіряємо, чи клікнули на елемент з класом 'letters__item'
        if (target.classList.contains('letters__item')) {
            const letters = lettersContainer.querySelectorAll('.letters__item');
            const index = Array.from(letters).indexOf(target);

            if (index > 0) {
                // Перевіряємо, чи елемент не перший
                const leftLetter = letters[index - 1];

                // Змінюємо букви місцями
                const temp = leftLetter.textContent;
                leftLetter.textContent = target.textContent;
                target.textContent = temp;
            }
            console.log(lettersContainer.textContent.trim(), originalWord)
            // Після кожної перестановки перевіряємо, чи слово збігається з початковим
            if (lettersContainer.textContent.trim() === originalWord) {
                // Слово збіглось, виконуємо відповідні дії
                audioWin.play()
                console.log('Слово збіглось з початковим словом:', originalWord);
                alert(`Вітаю! Ви відгадали слово: ${originalWord}`);
                resetGame();
            }
        }
    });
}

function resetGame() {
    // Очищаємо контейнер для букв
    lettersContainer.innerHTML = "";

    // Знову генеруємо та встановлюємо початкове слово
    let word = getRandomWord(words).toUpperCase();
    originalWord = word;

    // Перетасовуємо букви та відображаємо їх
    const letters = shuffleArray(word.split(''));
    drawLetters(letters, colors);
}

startGame();
