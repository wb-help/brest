        const testData = [
            {
                question: "Что такое операция 'Предсортировка'?",
                options: [
                    "Процесс упаковки товаров для отправки",
                    "Процесс первичной сортировки товаров, поступивших на СЦ",
                    "Процесс проверки качества товаров",
                    "Процесс инвентаризации товаров на складе"
                ],
                correct: 1,
                explanation: "Предсортировка - это именно первичная сортировка товаров, поступивших на сортировочный центр."
            },
            {
                question: "Какое оборудование НЕ требуется для работы на предсортировке?",
                options: [
                    "Сканер Urovo SR5600",
                    "Телефон на базе Android",
                    "Принтер для печати этикеток",
                    "Крепление (резинки)"
                ],
                correct: 2,
                explanation: "Принтер для печати этикеток не используется в процессе предсортировки."
            },
            {
                question: "Где можно получить сканер для работы?",
                options: [
                    "В отделе кадров",
                    "У старшего смены",
                    "В бухгалтерии",
                    "В отделе IT"
                ],
                correct: 1,
                explanation: "Сканер выдается старшим смены перед началом работы."
            },
            {
                question: "Что необходимо сделать перед началом работы с тарой?",
                options: [
                    "Покрасить тару в другой цвет",
                    "Убедиться, что тара физически пустая и программно чистая",
                    "Пронумеровать все тары",
                    "Заполнить тары товаром наполовину"
                ],
                correct: 1,
                explanation: "Перед работой обязательно проверяем, что тара пустая физически и очищена программно."
            },
            {
                question: "Что делать, если в таре программно числится более 5 вещей?",
                options: [
                    "Нажать кнопку 'Очистить' и продолжить работу",
                    "Обратиться к старшему",
                    "Игнорировать и продолжить работу",
                    "Перенести товар в другую тару"
                ],
                correct: 1,
                explanation: "При количестве вещей более 5 необходимо обратиться к старшему смены."
            },
            {
                question: "Какой модуль используется для парковки тары на рабочем месте?",
                options: [
                    "«Прочее» > «Служебное» > «Очистка сетки»",
                    "«Сортировка» > «Сорт в сетки (тест) 2»",
                    "«Приёмка» > «Приём товара»",
                    "«Инвентаризация» > «Пересчёт товара»"
                ],
                correct: 1,
                explanation: "Для парковки тары используется модуль «Сортировка» > «Сорт в сетки (тест) 2»."
            },
            {
                question: "Что нужно сделать при появлении вопроса «Найти сетку с вещами для сорта?» в начале работы?",
                options: [
                    "Нажать кнопку «НЕТ»",
                    "Нажать кнопку «ДА»",
                    "Перезагрузить приложение",
                    "Обратиться к старшему"
                ],
                correct: 1,
                explanation: "В начале рабочей смены нажимаем «ДА» для поиска сетки с вещами."
            },
            {
                question: "Что нужно делать с товаром, имеющим два ВБ стикера?",
                options: [
                    "Сканировать любой из стикеров",
                    "Отнести товар старшему",
                    "Положить товар в тару без сканирования",
                    "Снять один из стикеров"
                ],
                correct: 1,
                explanation: "Товар с двумя стикерами нельзя сканировать - его нужно отнести старшему."
            },
            {
                question: "Как поступать с пустыми пакетами/коробками?",
                options: [
                    "Сканировать и класть в тару",
                    "Не сканировать, а сразу относить старшему",
                    "Выбрасывать в мусор",
                    "Сканировать и откладывать в сторону"
                ],
                correct: 1,
                explanation: "Пустую тару не сканируем, а сразу относим старшему."
            },
            {
                question: "Что необходимо сделать после заполнения тары?",
                options: [
                    "Оставить её на месте и продолжить работу",
                    "Программно отвязать её, следуя установленной процедуре",
                    "Переместить в другой квадрат",
                    "Накрыть крышкой и отметить маркером"
                ],
                correct: 1,
                explanation: "Заполненную тару необходимо программно отвязать по установленной процедуре."
            }
        ];

        let currentQuestion = 0;
        let userAnswers = new Array(testData.length).fill(null);
        let testSubmitted = false;

        // Инициализация теста
        function initTest() {
            showQuestion(currentQuestion);
            updateProgress();
        }

        // Показать вопрос
        function showQuestion(index) {
            const container = document.getElementById('questionsContainer');
            const question = testData[index];
            
            container.innerHTML = `
                <div class="question">
                    <div class="question-text">${question.question}</div>
                    <div class="options" id="optionsContainer">
                        ${question.options.map((option, i) => `
                            <div class="option ${userAnswers[index] === i ? 'selected' : ''}"
                                onclick="selectOption(${i})">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            updateButtons();
        }

        // Выбор варианта ответа
        function selectOption(optionIndex) {
            if (testSubmitted) return;
            
            userAnswers[currentQuestion] = optionIndex;
            showQuestion(currentQuestion);
        }

        // Следующий вопрос
        function nextQuestion() {
            if (currentQuestion < testData.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateProgress();
            }
        }

        // Предыдущий вопрос
        function prevQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateProgress();
            }
        }

        // Обновление кнопок навигации
        function updateButtons() {
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            document.getElementById('nextBtn').style.display = currentQuestion === testData.length - 1 ? 'none' : 'block';
            document.getElementById('submitBtn').style.display = currentQuestion === testData.length - 1 ? 'block' : 'none';
        }

        // Обновление прогресса
        function updateProgress() {
            document.getElementById('progress').textContent = `Вопрос ${currentQuestion + 1} из ${testData.length}`;
        }

        // Завершение теста
        function submitTest() {
            testSubmitted = true;
            const score = calculateScore();
            showResults(score);
        }

        // Расчет результатов
        function calculateScore() {
            let correct = 0;
            testData.forEach((question, index) => {
                if (userAnswers[index] === question.correct) {
                    correct++;
                }
            });
            return correct;
        }

        // Показать результаты с анализом
        function showResults(score) {
            document.getElementById('questionsContainer').style.display = 'none';
            document.querySelector('.test-controls').style.display = 'none';
            document.querySelector('.progress').style.display = 'none';
            
            const results = document.getElementById('results');
            results.style.display = 'block';
            
            const percentage = Math.round((score / testData.length) * 100);
            document.getElementById('score').textContent = `Результат: ${score} из ${testData.length} (${percentage}%)`;
            
            let resultText = '';
            if (percentage >= 90) {
                resultText = 'Отличный результат! Вы отлично знаете процесс предсортировки.';
            } else if (percentage >= 70) {
                resultText = 'Хороший результат! Вы хорошо ориентируетесь в процессе предсортировки.';
            } else if (percentage >= 50) {
                resultText = 'Удовлетворительный результат. Рекомендуется повторить материал.';
            } else {
                resultText = 'Необходимо дополнительное обучение. Обратитесь к старшему смены.';
            }
            
            document.getElementById('resultText').textContent = resultText;
            
            // Показываем анализ только неправильных ответов
            showWrongAnswersAnalysis();
            
            // Показываем рекомендации по обучению
            showLearningRecommendations(score);
        }

        // Показать анализ только неправильных ответов
        function showWrongAnswersAnalysis() {
            const analysisContainer = document.getElementById('answersAnalysis');
            const wrongAnswers = [];
            
            testData.forEach((question, index) => {
                if (userAnswers[index] !== question.correct) {
                    wrongAnswers.push({
                        question: question.question,
                        userAnswer: userAnswers[index] !== null ? question.options[userAnswers[index]] : "Не отвечено",
                        correctAnswer: question.options[question.correct],
                        explanation: question.explanation,
                        questionNumber: index + 1
                    });
                }
            });
            
            if (wrongAnswers.length === 0) {
                analysisContainer.innerHTML = '<div class="analysis-title">Поздравляем! Все ответы верные!</div>';
                return;
            }
            
            analysisContainer.innerHTML = '<div class="analysis-title">Анализ неправильных ответов:</div>';
            
            wrongAnswers.forEach(item => {
                const analysisItem = document.createElement('div');
                analysisItem.className = 'analysis-item';
                analysisItem.innerHTML = `
                    <div class="analysis-question">Вопрос ${item.questionNumber}: ${item.question}</div>
                    <div class="analysis-answer"><span class="user-answer">Ваш ответ:</span> ${item.userAnswer}</div>
                    <div class="analysis-answer"><span class="correct-answer">Верный ответ:</span> ${item.correctAnswer}</div>
                    <div class="analysis-answer">Пояснение: ${item.explanation}</div>
                `;
                
                analysisContainer.appendChild(analysisItem);
            });
        }

        // Показать рекомендации по обучению
        function showLearningRecommendations(score) {
            const recommendationsContainer = document.getElementById('learningRecommendations');
            const wrongAnswersCount = testData.length - score;
            
            let recommendationsHTML = '<div class="recommendations-title">Что необходимо повторить:</div><ul class="recommendations-list">';
            
            if (wrongAnswersCount > 0) {
                recommendationsHTML += `
                    <li class="recommendation-item">Основные понятия и определение операции "Предсортировка"</li>
                    <li class="recommendation-item">Процедуры подготовки рабочего места и проверки тары</li>
                    <li class="recommendation-item">Правила работы с проблемными товарами (два стикера, пустая тара)</li>
                    <li class="recommendation-item">Навигацию по модулям WMS для различных операций</li>
                `;
            }
            
            if (wrongAnswersCount >= 5) {
                recommendationsHTML += `
                    <li class="recommendation-item">Обратиться к старшему смены для дополнительного инструктажа</li>
                    <li class="recommendation-item">Практиковаться в работе с системой под руководством наставника</li>
                `;
            }
            
            recommendationsHTML += '</ul>';
            recommendationsContainer.innerHTML = recommendationsHTML;
        }

        // Сброс теста
        function resetTest() {
            currentQuestion = 0;
            userAnswers = new Array(testData.length).fill(null);
            testSubmitted = false;
            
            document.getElementById('questionsContainer').style.display = 'block';
            document.querySelector('.test-controls').style.display = 'flex';
            document.querySelector('.progress').style.display = 'block';
            document.getElementById('results').style.display = 'none';
            
            initTest();
        }

        // Запуск теста при загрузке страницы
        window.onload = initTest;ы