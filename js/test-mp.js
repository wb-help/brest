        const questions = [
            {
                question: "Какое оборудование НЕ используется для работы на сортировке МП?",
                options: [
                    "Сканер Urovo SR5600",
                    "Телефон на базе Android", 
                    "Крепление (резинки)",
                    "Принтер для печати документов"
                ],
                correctAnswer: 3
            },
            {
                question: "Что необходимо сделать перед началом работы на квадрате сортировки МП?",
                options: [
                    "Выставить тары на квадрате сортировки МП",
                    "Проверить наличие интернета",
                    "Сделать перекличку сотрудников",
                    "Проверить температуру в помещении"
                ],
                correctAnswer: 0
            },
            {
                question: "Какой модуль используется для очистки сетки перед работой?",
                options: [
                    "«Прочее» > «Служебное» > «Очистка сетки»",
                    "«Сортировка» > «Очистка»",
                    "«Настройки» > «Системные» > «Очистка»",
                    "«Инвентаризация» > «Очистка тар»"
                ],
                correctAnswer: 0
            },
            {
                question: "Что делать, если в таре программно числится более 5 вещей?",
                options: [
                    "Очистить тару самостоятельно",
                    "Обратиться к старшему смены",
                    "Продолжить работу, игнорируя предупреждение",
                    "Перенести товар в другую тару"
                ],
                correctAnswer: 1
            },
            {
                question: "Какой ответ нужно выбрать на вопрос «Найти сетку с вещами для сорта?» при подготовке к работе?",
                options: [
                    "ДА",
                    "НЕТ",
                    "ОТМЕНА",
                    "ПОВТОРИТЬ"
                ],
                correctAnswer: 1
            },
            {
                question: "Какую кнопку нужно нажать для парковки сетки?",
                options: [
                    "Увеличение громкости",
                    "Уменьшение громкости", 
                    "Кнопку питания",
                    "Кнопку домой"
                ],
                correctAnswer: 1
            },
            {
                question: "Что делать с товаром, у которого два ВБ стикера?",
                options: [
                    "Сканировать любой из стикеров",
                    "Отнести старшему смены",
                    "Выбросить товар",
                    "Сканировать оба стикера"
                ],
                correctAnswer: 1
            },
            {
                question: "Как поступать с пустыми пакетами/коробками?",
                options: [
                    "Сканировать как обычный товар",
                    "Отнести старшему, не сканируя",
                    "Выбросить в мусор",
                    "Оставить в таре для дальнейшей обработки"
                ],
                correctAnswer: 1
            },
            {
                question: "Что делать при обнаружении бракованного товара?",
                options: [
                    "Продолжить сортировку",
                    "Сканировать и положить в тару",
                    "Обратиться к старшему",
                    "Исправить брак самостоятельно"
                ],
                correctAnswer: 2
            },
            {
                question: "Какую частую ошибку совершают сотрудники при завершении сортировки?",
                options: [
                    "Слишком быстро сканируют товар",
                    "Не проверяют тару на наличие мелкого товара",
                    "Слишком медленно работают",
                    "Неправильно паркуют тары"
                ],
                correctAnswer: 1
            }
        ];

        let currentQuestion = 0;
        let userAnswers = new Array(questions.length).fill(null);
        let testSubmitted = false;

        function initTest() {
            displayQuestion();
            updateProgress();
            updateNavigationButtons();
        }

        function displayQuestion() {
            const container = document.getElementById('questionsContainer');
            const question = questions[currentQuestion];
            
            container.innerHTML = `
                <div class="question">
                    <div class="question-text">${question.question}</div>
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <div class="option ${userAnswers[currentQuestion] === index ? 'selected' : ''}" 
                                 onclick="selectAnswer(${index})">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        function selectAnswer(answerIndex) {
            if (testSubmitted) return;
            
            userAnswers[currentQuestion] = answerIndex;
            displayQuestion();
            updateNavigationButtons();
        }

        function nextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                displayQuestion();
                updateProgress();
                updateNavigationButtons();
            }
        }

        function prevQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion();
                updateProgress();
                updateNavigationButtons();
            }
        }

        function updateProgress() {
            document.getElementById('progress').textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
        }

        function updateNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');
            
            prevBtn.disabled = currentQuestion === 0;
            
            if (currentQuestion === questions.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
            
            // Проверяем, отвечен ли текущий вопрос
            const hasAnswer = userAnswers[currentQuestion] !== null;
            nextBtn.disabled = !hasAnswer && currentQuestion < questions.length - 1;
            submitBtn.disabled = !hasAnswer;
        }

        function submitTest() {
            testSubmitted = true;
            calculateResults();
            showResults();
        }

        function calculateResults() {
            let correctCount = 0;
            questions.forEach((question, index) => {
                if (userAnswers[index] === question.correctAnswer) {
                    correctCount++;
                }
            });
            
            const score = Math.round((correctCount / questions.length) * 100);
            return { correctCount, score };
        }

        function showResults() {
            const results = calculateResults();
            const resultsDiv = document.getElementById('results');
            const scoreDiv = document.getElementById('score');
            const resultTextDiv = document.getElementById('resultText');
            const analysisDiv = document.getElementById('answersAnalysis');
            const recommendationsDiv = document.getElementById('learningRecommendations');
            
            scoreDiv.textContent = `Результат: ${results.score}%`;
            resultTextDiv.textContent = `Правильных ответов: ${results.correctCount} из ${questions.length}`;
            
            // Анализ ответов
            analysisDiv.innerHTML = `
                <div class="analysis-title">Анализ ваших ответов:</div>
                ${questions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    return `
                        <div class="analysis-item ${isCorrect ? 'correct' : ''}">
                            <div class="analysis-question">${index + 1}. ${question.question}</div>
                            <div class="analysis-answer">
                                Ваш ответ: <span class="user-answer ${isCorrect ? 'correct' : ''}">
                                ${userAnswer !== null ? question.options[userAnswer] : 'Нет ответа'}</span>
                            </div>
                            ${!isCorrect ? `
                                <div class="analysis-answer">
                                    Правильный ответ: <span class="correct-answer">${question.options[question.correctAnswer]}</span>
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            `;
            
            // Рекомендации по обучению
            let recommendations = [];
            
            if (results.score < 70) {
                recommendations = [
                    "Повторите раздел 'Подготовка квадрата сортировки МП для работы'",
                    "Изучите внимательно раздел 'Основные ошибки при работе'",
                    "Обратите внимание на правильную последовательность действий при парковке тар",
                    "Потренируйтесь в определении бракованного товара"
                ];
            } else if (results.score < 90) {
                recommendations = [
                    "Повторите раздел с оборудованием для работы",
                    "Обратите внимание на действия при обнаружении товара с двумя стикерами",
                    "Закрепите знания по очистке сетки перед работой"
                ];
            } else {
                recommendations = [
                    "Отличный результат! Продолжайте в том же духе",
                    "Можете приступать к практической работе на сортировке МП",
                    "Помогайте новым сотрудникам в освоении материала"
                ];
            }
            
            recommendationsDiv.innerHTML = `
                <div class="recommendations-title">Рекомендации по обучению:</div>
                <ul class="recommendations-list">
                    ${recommendations.map(rec => `<li class="recommendation-item">${rec}</li>`).join('')}
                </ul>
            `;
            
            resultsDiv.style.display = 'block';
            document.getElementById('questionsContainer').style.display = 'none';
            document.getElementById('prevBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('progress').style.display = 'none';
        }

        function resetTest() {
            currentQuestion = 0;
            userAnswers = new Array(questions.length).fill(null);
            testSubmitted = false;
            
            document.getElementById('results').style.display = 'none';
            document.getElementById('questionsContainer').style.display = 'block';
            document.getElementById('progress').style.display = 'block';
            
            initTest();
        }

        // Инициализация теста при загрузке страницы
        window.onload = initTest;