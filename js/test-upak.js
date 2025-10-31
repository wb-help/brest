        const testData = [
            {
                question: "Что такое операция 'Переупаковка возвратов'?",
                options: [
                    "Процесс приёмки новых товаров от поставщиков",
                    "Процесс упаковки товаров для отправки покупателям",
                    "Процесс переупаковки возвращенных товаров перед дальнейшей продажей или возвратом поставщику",
                    "Процесс инвентаризации товаров на складе"
                ],
                correct: 2,
                explanation: "Переупаковка возвратов - это процесс, когда товары, возвращенные покупателями, нуждаются в новой упаковке перед дальнейшей продажей или возвратом поставщику."
            },
            {
                question: "Какое оборудование НЕ понадобится для работы на переупаковке?",
                options: [
                    "Сканер Mindeo",
                    "Планшет",
                    "Нож безопасный",
                    "Принтер для печати этикеток"
                ],
                correct: 3,
                explanation: "Принтер для печати этикеток не используется на рабочем месте переупаковки. Оборудование включает сканер Mindeo, планшет и безопасный нож."
            },
            {
                question: "Что необходимо сделать перед началом работы с возвратной тарой?",
                options: [
                    "Проверить привязанные к столу тары 'Простые вещи' и 'Обувь'",
                    "Перекрасить тару в другой цвет",
                    "Заполнить тары товаром наполовину",
                    "Пронумеровать все тары заново"
                ],
                correct: 0,
                explanation: "Перед началом работы необходимо проверить номера привязанных тар - они должны совпадать с номерами тар, стоящих за спиной."
            },
            {
                question: "Как правильно сканировать присваиваемые стикеры?",
                options: [
                    "Сканировать стикер прямо на ленте",
                    "Сканировать только после отделения от ленты",
                    "Сканировать несколько стикеров сразу",
                    "Не сканировать стикеры вообще"
                ],
                correct: 1,
                explanation: "Стикер нужно сканировать ТОЛЬКО после отделения от ленты. Сканирование стикера с ленты ЗАПРЕЩЕНО."
            },
            {
                question: "Что делать при обнаружении товара с двумя ВБ стикерами?",
                options: [
                    "Сканировать оба стикера и продолжить работу",
                    "Отнести товар старшему и следовать его инструкциям",
                    "Снять один стикер и продолжить обработку",
                    "Игнорировать и положить товар в обычную тару"
                ],
                correct: 1,
                explanation: "При обнаружении товара с двумя ВБ стикерами необходимо отнести его старшему и следовать его инструкциям."
            },
            {
                question: "Как поступать с пустой упаковкой?",
                options: [
                    "Сканировать стикер и положить в тару НВ",
                    "Показать на камеру и отнести в коробку 'Пустая упаковка'",
                    "Выбросить в мусорный пакет",
                    "Сканировать стикер и положить в тару Брак"
                ],
                correct: 1,
                explanation: "Пустую упаковку нужно показать на камеру и отнести в коробку 'Пустая упаковка'. НЕ ОТПРАВЛЯТЬ в НВ или Брак."
            },
            {
                question: "Что делать при обнаружении товара, который отличается от заявленного в карточке?",
                options: [
                    "Нажать 'Проблема с товаром?' и выбрать 'НВ'",
                    "Продолжить обработку как обычный товар",
                    "Выбросить товар",
                    "Спрятать товар и продолжить работу"
                ],
                correct: 0,
                explanation: "При несоответствии товара нужно нажать 'Проблема с товаром?' и выбрать 'НВ', затем следовать установленной процедуре."
            },
            {
                question: "Как обрабатывать товары категории 'Сортировка'?",
                options: [
                    "Проверять на соответствие и присваивать новый стикер",
                    "Не проверять, сразу вкладывать в тару 'Сортировка'",
                    "Относить старшему",
                    "Класть в тару 'Простые вещи'"
                ],
                correct: 1,
                explanation: "Товары категории 'Сортировка' не проверяются на соответствие и не получают новый стикер - их сразу вкладывают в соответствующую тару."
            },
            {
                question: "Что необходимо сделать при заполнении тары?",
                options: [
                    "Оставить на месте и продолжить работу",
                    "Программно и физически заменить тару",
                    "Переместить в другой конец склада",
                    "Накрыть крышкой и продолжить работу"
                ],
                correct: 1,
                explanation: "При заполнении тары её необходимо программно и физически заменить, следуя установленной процедуре смены тар."
            },
            {
                question: "Как избежать ошибки вложения товаров в неверную тару?",
                options: [
                    "Обращать внимание на информационные таблички и обозначения на тарах",
                    "Класть все товары в одну тару",
                    "Не обращать внимание на категории товаров",
                    "Класть товары в первую попавшуюся тару"
                ],
                correct: 0,
                explanation: "Нужно обращать внимание на информационные таблички над тарами и обозначения непосредственно на самих тарах."
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
                resultText = 'Отличный результат! Вы отлично знаете процесс переупаковки возвратов.';
            } else if (percentage >= 70) {
                resultText = 'Хороший результат! Вы хорошо ориентируетесь в процессе переупаковки.';
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
                    <li class="recommendation-item">Основные понятия и определение операции "Переупаковка возвратов"</li>
                    <li class="recommendation-item">Процедуры подготовки рабочего места и проверки привязанных тар</li>
                    <li class="recommendation-item">Правила работы с проблемными товарами (НВ, Брак, два стикера)</li>
                    <li class="recommendation-item">Обработку пустых упаковок и товаров категории "Сортировка"</li>
                    <li class="recommendation-item">Процедуру смены заполненных тар</li>
                `;
            }
            
            if (wrongAnswersCount >= 5) {
                recommendationsHTML += `
                    <li class="recommendation-item">Обратиться к старшему смены для дополнительного инструктажа</li>
                    <li class="recommendation-item">Практиковаться в работе с системой под руководством наставника</li>
                    <li class="recommendation-item">Изучить типичные ошибки при переупаковке возвратов</li>
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
        window.onload = initTest;