// Получаем выбранные буквы
const selectedLetters = JSON.parse(localStorage.getItem("selectedLetters"));

// Объединяем паронимы для выбранных букв
let allParonyms = [];
selectedLetters.forEach(letter => {
    if (paronyms[letter]) {
        allParonyms = allParonyms.concat(paronyms[letter]);
    }
});

let usedWords = []; // Слова, которые уже были показаны
let currentRow = []; // Текущий ряд слов
let remainingWords = []; // Слова, которые нужно угадать
let currentWordIndex = 0; // Индекс текущего слова

// Функция для выбора случайного ряда слов
function getRandomRow() {
    let availableRows = allParonyms.filter(row => !usedWords.includes(row));
    if (availableRows.length === 0) {
        alert("Все ряды слов угаданы!");
        window.location.href = "index.html"; // Возвращаемся на главную страницу
        return;
    }
    let randomIndex = Math.floor(Math.random() * availableRows.length);
    let row = availableRows[randomIndex];
    usedWords.push(row); // Добавляем ряд в список использованных
    return row;
}

// Функция для инициализации нового ряда слов
function initializeRow() {
    currentRow = getRandomRow().split(" -- ");
    remainingWords = [...currentRow]; // Копируем все слова из ряда
    let displayedWordIndex = Math.floor(Math.random() * remainingWords.length);
    let displayedWord = remainingWords.splice(displayedWordIndex, 1)[0]; // Убираем отображаемое слово из списка для угадывания
    document.getElementById("currentWord").textContent = displayedWord;
    updateCounter();
}

// Функция для обновления счетчика оставшихся слов
function updateCounter() {
    document.getElementById("remainingWords").textContent = remainingWords.length;
}

// Функция для проверки введенного слова
function checkWord() {
    let userInput = document.getElementById("userInput").value.trim();

    if (remainingWords.includes(userInput)) {
        document.getElementById("result").textContent = "Правильно!";
        document.getElementById("result").style.color = "green";
        remainingWords = remainingWords.filter(word => word !== userInput); // Убираем угаданное слово из списка
        updateCounter();

        if (remainingWords.length === 0) {
            document.getElementById("result").textContent = "Вы угадали все слова из ряда!";
            setTimeout(() => {
                initializeRow(); // Переходим к следующему ряду
            }, 2000);
        }
    } else {
        document.getElementById("result").textContent = "Неправильно. Попробуйте еще раз.";
        document.getElementById("result").style.color = "red";
    }

    document.getElementById("userInput").value = ""; // Очищаем поле ввода
}

// Инициализация игры
initializeRow();
