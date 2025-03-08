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
let currentWordIndex = 0; // Индекс текущего слова

// Функция для выбора случайного слова
function getRandomWord() {
    let availableWords = allParonyms.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
        alert("Все слова на выбранные буквы угаданы!");
        window.location.href = "index.html"; // Возвращаемся на главную страницу
        return;
    }
    let randomIndex = Math.floor(Math.random() * availableWords.length);
    let word = availableWords[randomIndex];
    usedWords.push(word); // Добавляем слово в список использованных
    return word;
}

// Отображаем текущее слово
let currentWord = getRandomWord();
document.getElementById("currentWord").textContent = currentWord.split(" -- ")[0];

// Функция для проверки введенного слова
function checkWord() {
    let userInput = document.getElementById("userInput").value.trim();
    let correctWords = currentWord.split(" -- ");

    if (correctWords.includes(userInput)) {
        document.getElementById("result").textContent = "Правильно!";
        document.getElementById("result").style.color = "green";
        currentWord = getRandomWord(); // Переходим к следующему слову
        document.getElementById("currentWord").textContent = currentWord.split(" -- ")[0];
    } else {
        document.getElementById("result").textContent = "Неправильно. Попробуйте еще раз.";
        document.getElementById("result").style.color = "red";
    }

    document.getElementById("userInput").value = ""; // Очищаем поле ввода
}