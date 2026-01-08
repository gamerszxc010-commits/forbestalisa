// Массив сообщений при неправильном ответе
const wrongMessages = [
    "Попробуй еще раз, у тебя обязательно получится!",
    "Не совсем, но ты близко к правильному ответу!",
    "Ой, кажется, это не тот вариант. Попробуй снова!",
    "К сожалению, ты не угадала. Но не сдавайся!",
    "Неверно, но ты можешь исправиться! Выбери другой ответ.",
    "Это не совсем то, что я загадал. Попробуй еще!",
    "Хорошая попытка, но ответ другой. Не останавливайся!",
    "Почти угадала! Попробуй выбрать другой вариант.",
    "Не расстраивайся, у тебя всё получится! Выбери другой ответ."
];

// Правильные ответы
const correctAnswers = {
    1: "3", // Вопрос 1
    2: "2", // Вопрос 2
    3: "5", // Вопрос 3
    4: "3"  // Вопрос 4
};

// Текущий вопрос
let currentQuestion = 1;

// Получаем элементы DOM
const question1 = document.getElementById('question1');
const question2 = document.getElementById('question2');
const question3 = document.getElementById('question3');
const question4 = document.getElementById('question4');
const result1 = document.getElementById('result1');
const result2 = document.getElementById('result2');
const result3 = document.getElementById('result3');
const result4 = document.getElementById('result4');
const wrongMessage1 = document.getElementById('wrong-message1');
const wrongMessage2 = document.getElementById('wrong-message2');
const wrongMessage3 = document.getElementById('wrong-message3');
const wrongMessage4 = document.getElementById('wrong-message4');
const nextBtn1 = document.getElementById('next-btn1');
const nextBtn2 = document.getElementById('next-btn2');
const nextBtn3 = document.getElementById('next-btn3');
const nextBtn4 = document.getElementById('next-btn4');
const finalMessage = document.getElementById('final-message');
const quizSection = document.getElementById('quiz-section');
const progressBar = document.getElementById('progress-bar');
const questionCounters = document.querySelectorAll('.question-counter');

// Функция для обновления прогресс-бара
function updateProgressBar(questionNum) {
    const progressPercentage = (questionNum / 4) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Обновляем счетчик вопросов
    questionCounters.forEach(counter => {
        if (counter.parentElement.style.display !== 'none') {
            counter.textContent = `Вопрос ${questionNum} из 4`;
        }
    });
}

// Функция для добавления обработчиков событий к вариантам ответа
function setupQuestionHandlers(questionElement, resultElement, wrongMessageElement, nextButton, questionNum) {
    const options = questionElement.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение у всех вариантов
            options.forEach(opt => opt.classList.remove('selected'));
            // Выделяем выбранный вариант
            this.classList.add('selected');
            
            const selectedValue = this.getAttribute('data-value');
            
            // Проверяем ответ
            if (selectedValue === correctAnswers[questionNum]) {
                // Правильный ответ
                resultElement.style.display = 'block';
                wrongMessageElement.style.display = 'none';
                nextButton.disabled = false;
                
                // Обновляем прогресс-бар при правильном ответе
                updateProgressBar(questionNum + 1);
            } else {
                // Неправильный ответ
                resultElement.style.display = 'none';
                wrongMessageElement.textContent = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
                wrongMessageElement.style.display = 'block';
                nextButton.disabled = true;
            }
        });
    });
}

// Настраиваем обработчики для всех вопросов
setupQuestionHandlers(question1, result1, wrongMessage1, nextBtn1, 1);
setupQuestionHandlers(question2, result2, wrongMessage2, nextBtn2, 2);
setupQuestionHandlers(question3, result3, wrongMessage3, nextBtn3, 3);
setupQuestionHandlers(question4, result4, wrongMessage4, nextBtn4, 4);

// Обработчик для кнопки "Далее" после вопроса 1
nextBtn1.addEventListener('click', function() {
    question1.style.display = 'none';
    result1.style.display = 'none';
    question2.style.display = 'block';
    wrongMessage1.style.display = 'none';
    currentQuestion = 2;
});

// Обработчик для кнопки "Далее" после вопроса 2
nextBtn2.addEventListener('click', function() {
    question2.style.display = 'none';
    result2.style.display = 'none';
    question3.style.display = 'block';
    wrongMessage2.style.display = 'none';
    currentQuestion = 3;
});

// Обработчик для кнопки "Далее" после вопроса 3
nextBtn3.addEventListener('click', function() {
    question3.style.display = 'none';
    result3.style.display = 'none';
    question4.style.display = 'block';
    wrongMessage3.style.display = 'none';
    currentQuestion = 4;
});

// Обработчик для кнопки "Завершить квиз" после вопроса 4
nextBtn4.addEventListener('click', function() {
    question4.style.display = 'none';
    result4.style.display = 'none';
    quizSection.style.display = 'none';
    finalMessage.style.display = 'block';
    
    // Добавляем конфетти в конце
    createConfetti();
    createBackgroundDecorations();
});

// Функция для создания эффекта конфетти
function createConfetti() {
    const colors = ['#ff006e', '#8338ec', '#3a86ff', '#ffbe0b', '#06d6a0'];
    
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 12 + 8 + 'px';
        confetti.style.height = Math.random() * 12 + 8 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-30px';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        
        // Анимация падения конфетти
        const animation = confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 4000 + 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Удаляем элемент после завершения анимации
        animation.onfinish = () => confetti.remove();
    }
}

// Функция для создания дополнительных фоновых украшений
function createBackgroundDecorations() {
    const decorationsContainer = document.createElement('div');
    decorationsContainer.style.position = 'fixed';
    decorationsContainer.style.top = '0';
    decorationsContainer.style.left = '0';
    decorationsContainer.style.width = '100%';
    decorationsContainer.style.height = '100%';
    decorationsContainer.style.pointerEvents = 'none';
    decorationsContainer.style.zIndex = '0';
    document.body.appendChild(decorationsContainer);
    
    // Добавляем больше фоновых элементов
    for (let i = 0; i < 15; i++) {
        const types = ['heart', 'star', 'gift'];
        const type = types[Math.floor(Math.random() * types.length)];
        const decoration = document.createElement('div');
        
        if (type === 'heart') {
            decoration.innerHTML = '❤️';
            decoration.style.color = `rgba(255, 0, 110, ${Math.random() * 0.1 + 0.05})`;
        } else if (type === 'star') {
            decoration.innerHTML = '⭐';
            decoration.style.color = `rgba(255, 190, 11, ${Math.random() * 0.1 + 0.05})`;
        } else {
            decoration.innerHTML = '🎁';
            decoration.style.color = `rgba(131, 56, 236, ${Math.random() * 0.1 + 0.05})`;
        }
        
        decoration.style.position = 'absolute';
        decoration.style.fontSize = (Math.random() * 3 + 1.5) + 'rem';
        decoration.style.left = Math.random() * 100 + 'vw';
        decoration.style.top = Math.random() * 100 + 'vh';
        decoration.style.animation = `float ${Math.random() * 10 + 8}s infinite ease-in-out`;
        decoration.style.animationDelay = Math.random() * 5 + 's';
        
        decorationsContainer.appendChild(decoration);
    }
}

// Показываем первый вопрос при загрузке
window.addEventListener('load', function() {
    // Небольшая задержка для плавного появления
    setTimeout(() => {
        document.querySelector('.container').style.opacity = 1;
        document.querySelector('.container').style.transform = 'translateY(0)';
    }, 100);
    
    // Инициализируем прогресс-бар
    updateProgressBar(1);
    
    // Создаем начальные фоновые украшения
    createBackgroundDecorations();
});

