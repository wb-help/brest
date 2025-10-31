        // Данные теста по сортировке
        const testData = [
            {
                question: "Что такое операция 'Сортировка'?",
                options: [
                    "Процесс приёмки товаров от поставщиков",
                    "Процесс распределения товаров для доставки через ПВЗ",
                    "Процесс переупаковки возвращенных товаров",
                    "Процесс инвентаризации товаров на складе"
                ],
                correct: 1,
                explanation: "Сортировка - это процесс распределения товаров для последующей доставки покупателям через пункты выдачи заказов (ПВЗ)."
            },
            {
                question: "Как располагаются коробки на квадрате сортировки?",
                options: [
                    "Все коробки стоят на земле в один ряд",
                    "Коробки размещены в три ряда с разной нумерацией",
                    "Коробки стоят хаотично без системы",
                    "Коробки размещены только на стеллажах"
                ],
                correct: 1,
                explanation: "Коробки размещены в три ряда: на земле - чётные номера, на первом уровне стеллажа - нечётные номера, выше - номера с '37'."
            },
            {
                question: "Как определить, какую тару нужно взять с предсортировки?",
                options: [
                    "Посмотреть на табличку рядом с квадратом сортировки",
                    "Взять первую попавшуюся тару",
                    "Спросить у любого сотрудника",
                    "Взять тару с самым большим номером"
                ],
                correct: 0,
                explanation: "Порядковый номер тары, которая сортируется на направлении, указан на табличке рядом с квадратом сортировки."
            },
            {
                question: "Что делать при обнаружении товара с двумя ВБ стикерами?",
                options: [
                    "Сканировать любой из стикеров и продолжить работу",
                    "Отнести товар старшему и следовать его инструкциям",
                    "Снять один стикер и обработать товар",
                    "Положить товар в коробку без сканирования"
                ],
                correct: 1,
                explanation: "При обнаружении товара с двумя ВБ стикерами КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО сканировать любой из стикеров. Товар нужно отнести старшему."
            },
            {
                question: "Как поступить с пустыми пакетами/коробками?",
                options: [
                    "Сканировать и положить в коробку",
                    "Не сканировать, сразу отнести старшему",
                    "Выбросить в мусорный пакет",
                    "Оставить на стеллаже для дальнейшей обработки"
                ],
                correct: 1,
                explanation: "Пустые пакеты/коробки не сканируем, а сразу относим старшему."
            },
            {
                question: "Что означает ошибка при сканировании ВБ стикера?",
                options: [
                    "Товар ошибочно отсортирован на предсортировке (Волна)",
                    "Товар нужно выбросить",
                    "Товар очень дорогой",
                    "Товар бракованный"
                ],
                correct: 0,
                explanation: "Ошибка свидетельствует, что товар был ошибочно отсортирован в тару вашего направления на предсортировке (товар 'Волна')."
            },
            {
                question: "Что делать, если при сканировании отображается 'Ъ' (твёрдый знак)?",
                options: [
                    "Продолжить обработку товара как обычно",
                    "Подойти к старшему и следовать его указаниям",
                    "Положить товар в любую коробку",
                    "Выбросить товар"
                ],
                correct: 1,
                explanation: "При появлении 'Ъ' необходимо подойти с товаром к старшему и следовать его дальнейшим указаниям."
            },
            {
                question: "Как правильно закрыть коробку программно?",
                options: [
                    "Нажать кнопку 'Уменьшение громкости' и отсканировать QR передачи",
                    "Просто заклеить коробку скотчем",
                    "Ничего не делать - коробка закроется автоматически",
                    "Перезагрузить приложение WMS"
                ],
                correct: 0,
                explanation: "Для программного закрытия коробки нужно нажать кнопку 'Уменьшение громкости' и отсканировать QR передачи."
            },
            {
                question: "Как распределяются коробки по поддонам после закрытия?",
                options: [
                    "Все коробки кладутся на один поддон",
                    "По номерам маршрутов, указанных на стикерах передач",
                    "В случайном порядке",
                    "Только коробки с чётными номерами"
                ],
                correct: 1,
                explanation: "Коробки распределяются по поддонам согласно номерам маршрутов, указанных на стикерах передач."
            },
            {
                question: "Что КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО делать на сортировке?",
                options: [
                    "Оставлять товары на стеллаже",
                    "Работать с системой WMS",
                    "Использовать сканер",
                    "Печатать стикеры передач"
                ],
                correct: 0,
                explanation: "Оставлять товары на стеллаже КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО. Все товары должны быть обработаны и размещены в соответствующих коробках."
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
                resultText = 'Отличный результат! Вы отлично знаете процесс сортировки.';
            } else if (percentage >= 70) {
                resultText = 'Хороший результат! Вы хорошо ориентируетесь в процессе сортировки.';
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
                    <li class="recommendation-item">Основные понятия и определение операции "Сортировка"</li>
                    <li class="recommendation-item">Организацию рабочего места и расположение коробок на квадрате</li>
                    <li class="recommendation-item">Процедуру доставки тар с предсортировки</li>
                    <li class="recommendation-item">Обработку проблемных товаров (два стикера, пустая тара, брак)</li>
                    <li class="recommendation-item">Процесс закрытия коробок (программно и физически)</li>
                `;
            }
            
            if (wrongAnswersCount >= 5) {
                recommendationsHTML += `
                    <li class="recommendation-item">Обратиться к старшему смены для дополнительного инструктажа</li>
                    <li class="recommendation-item">Практиковаться в работе с системой под руководством наставника</li>
                    <li class="recommendation-item">Изучить типичные ошибки при работе на сортировке</li>
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