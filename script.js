document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Quiz Logic
    const questions = [
        {
            question: "ພຣະພຸດທະເຈົ້າ ມີພຣະນາມເດີມວ່າແນວໃດ?",
            options: ["ສິດທັດຖະ ໂຄຕະມະ", "ຣາຫຸນ", "ສຸໂທທະນະ", "ອາລາກາລາມະ"],
            answer: "ສິດທັດຖະ ໂຄຕະມະ",
            explanation: "ພຣະນາມເດີມຂອງພຣະພຸດທະເຈົ້າຄື ສິດທັດຖະ ໂຄຕະມະ."
        },
        {
            question: "ພຣະພຸດທະເຈົ້າປະສູດຢູ່ທີ່ໃດ?",
            options: ["ພຸດທະຄະຍາ", "ສວນລຸມພິນີວັນ", "ເມືອງພະຣານະສີ", "ເມືອງກຸສິນນາຣາ"],
            answer: "ສວນລຸມພິນີວັນ",
            explanation: "ພຣະອົງປະສູດທີ່ສວນລຸມພິນີວັນ."
        },
        {
            question: "ພຣະພຸດທະເຈົ້າໄດ້ເຫັນ 'ເທວະທູດສີ່' ຢ່າງໃດແດ່ກ່ອນອອກບວດ?",
            options: [
                "ຄົນແກ່, ຄົນເຈັບ, ຄົນຕາຍ, ນັກບວດ",
                "ຄົນຮັ່ງມີ, ຄົນທຸກຍາກ, ຄົນເຈັບ, ນັກບວດ",
                "ກະສັດ, ພາມ, ແພດ, ນັກບວດ",
                "ຊ້າງ, ມ້າ, ເສືອ, ລິງ"
            ],
            answer: "ຄົນແກ່, ຄົນເຈັບ, ຄົນຕາຍ, ນັກບວດ",
            explanation: "ເທວະທູດສີ່ຄື ຄົນແກ່, ຄົນເຈັບ, ຄົນຕາຍ, ແລະ ນັກບວດ."
        },
        {
            question: "ພຣະພຸດທະເຈົ້າຕັດສະຮູ້ເມື່ອພຣະຊົນມາຍຸໄດ້ຈັກພັນສາ?",
            options: ["29 ພັນສາ", "35 ພັນສາ", "45 ພັນສາ", "80 ພັນສາ"],
            answer: "35 ພັນສາ",
            explanation: "ພຣະອົງຕັດສະຮູ້ເມື່ອພຣະຊົນມາຍຸໄດ້ 35 ພັນສາ."
        },
        {
            question: "ພຣະທຳເທດສະໜາທຳອິດທີ່ພຣະພຸດທະເຈົ້າຊົງສະແດງຄືຫຍັງ?",
            options: ["ທຳມະຈັກກັບປັສວັດຕະນະສູດ", "ອະລິຍະສັດສີ່", "ມັກມີອົງ 8", "ປັສຈະວັກຄີ"],
            answer: "ທຳມະຈັກກັບປັສວັດຕະນະສູດ",
            explanation: "ພຣະທຳເທດສະໜາທຳອິດຄື ທຳມະຈັກກັບປັສວັດຕະນະສູດ."
        },
        {
            question: "ພຣະພຸດທະເຈົ້າປຣິນິພພານເມື່ອພຣະຊົນມາຍຸໄດ້ຈັກພັນສາ?",
            options: ["29 ພັນສາ", "35 ພັນສາ", "45 ພັນສາ", "80 ພັນສາ"],
            answer: "80 ພັນສາ",
            explanation: "ພຣະອົງປຣິນິພພານເມື່ອພຣະຊົນມາຍຸໄດ້ 80 ພັນສາ."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');

    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizResults.style.display = 'none';
        quizContainer.style.display = 'block';
        totalQuestionsSpan.textContent = questions.length; // Set total questions display
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    <ul class="quiz-options">
                        ${q.options.map(option => `<button>${option}</button>`).join('')}
                    </ul>
                    <div class="feedback"></div>
                    <button id="next-question-btn" style="display:none;">ຄຳຖາມຕໍ່ໄປ</button>
                </div>
            `;
            const optionButtons = quizContainer.querySelectorAll('.quiz-options button');
            optionButtons.forEach(button => {
                button.addEventListener('click', selectAnswer);
            });
        } else {
            showResults();
        }
    }

    function selectAnswer(event) {
        const selectedButton = event.target;
        const userAnswer = selectedButton.textContent;
        const currentQuestion = questions[currentQuestionIndex];
        const feedbackDiv = quizContainer.querySelector('.feedback');
        const nextBtn = document.getElementById('next-question-btn');
        const optionButtons = quizContainer.querySelectorAll('.quiz-options button');

        // Disable all option buttons after an answer is selected
        optionButtons.forEach(button => {
            button.disabled = true;
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct'); // Highlight correct answer
            } else {
                button.classList.add('wrong'); // Highlight wrong answers
            }
        });

        if (userAnswer === currentQuestion.answer) {
            score++;
            feedbackDiv.textContent = "ຖືກຕ້ອງ! 👍";
            feedbackDiv.classList.remove('wrong');
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = `ຜິດ! ຄຳຕອບທີ່ຖືກຕ້ອງແມ່ນ: "${currentQuestion.answer}". ${currentQuestion.explanation}`;
            feedbackDiv.classList.remove('correct');
            feedbackDiv.classList.add('wrong');
        }
        nextBtn.style.display = 'block'; // Show next question button
        nextBtn.addEventListener('click', nextQuestion);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    function showResults() {
        quizContainer.style.display = 'none';
        quizResults.style.display = 'block';
        scoreSpan.textContent = score;
    }

    // Initial load: show start button
    quizContainer.innerHTML = `
        <p>ກົດປຸ່ມ "ເລີ່ມທົດສອບ" ເພື່ອເລີ່ມຕົ້ນ!</p>
        <button id="start-quiz-btn">ເລີ່ມທົດສອບ</button>
    `;
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
});
