const output = document.getElementById("output");
const loadingWindow = document.getElementById("loadingWindow");
const mhText = document.querySelector(".mh-text");
const mhBar = document.querySelector(".mh-bar");
const increaseBtn = document.getElementById("increaseMHBtn");

/* ===== Mental Health System ===== */
let mentalHealth = 0;

/* ===== Typing Effect ===== */
function typeText(text) {
    output.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        output.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, 25);
}

/* ===== Fun Buttons ===== */
function randomJoke() {
    const jokes = [
        "Why are you smiling? Nothing changed 😏",
        "This app is working harder than you.",
        "Congratulations. You clicked a button.",
        "Error 404: Motivation not found."
    ];
    typeText(jokes[Math.floor(Math.random() * jokes.length)]);
}

function chaos() {
    const chaos = [
        "System scanning brain... 12% 🧠",
        "Loading common sense... failed ❌",
        "Do not press buttons randomly.",
        "Chaos level increased by +1 🔥"
    ];
    typeText(chaos[Math.floor(Math.random() * chaos.length)]);
}

function fakeAI() {
    const ai = [
        "I am an AI. Trust me.",
        "The answer is yes. Or no.",
        "Have you tried rebooting yourself?",
        "Studying is good. Memes are better."
    ];
    typeText(ai[Math.floor(Math.random() * ai.length)]);
}

/* ===== Add Brain ===== */
function addBrain() {
    increaseBtn.disabled = true;
    loadingWindow.classList.remove("hidden");

    const loadingText = loadingWindow.querySelector(".loading-text");
    loadingText.innerText = "Finding Brain...";
    loadingText.classList.remove("success-text");

    setTimeout(() => {
        loadingText.innerText = "Brain Successfully Founded! ✅";
        loadingText.classList.add("success-text");

        setTimeout(() => {
            loadingWindow.classList.add("hidden");
            mhText.innerText = "Mental Health: 0%";
            mhBar.style.width = "0%";
            mhBar.style.transition = "width 0.6s ease";
            increaseBtn.disabled = false;
            showYuiDialogue(initialDialogues);
        }, 2000);

    }, 15000);
}

/* ===== SAO Health Bar Update ===== */
function updateMH(amount) {
    mentalHealth += amount;
    if (mentalHealth < 0) mentalHealth = 0;
    if (mentalHealth > 100) mentalHealth = 100;

    mhBar.style.width = mentalHealth + "%";
    mhText.innerText = `Mental Health: ${mentalHealth}%`;
    if(mentalHealth<=25) mhBar.style.background="linear-gradient(to right, #ff4c4c,#ff0000)";
    else if(mentalHealth<=50) mhBar.style.background="linear-gradient(to right, #ff8c00,#ffaa00)";
    else if(mentalHealth<=75) mhBar.style.background="linear-gradient(to right, #ffff00,#aaff00)";
    else mhBar.style.background="linear-gradient(to right, #00ff00,#00cc00)";
    mhText.textContent=`Mental Health: ${mentalHealth}%`;
}

/* ===== Yui Dialogue System ===== */
const yuiDialogue = document.getElementById("yui-dialogue");
const yuiText = document.getElementById("yui-text");
const yuiNext = document.getElementById("yui-next");

let dialogues = [];
let dialogueIndex = 0;

function showYuiDialogue(dialogArray) {
    dialogues = dialogArray;
    dialogueIndex = 0;
    yuiText.innerText = dialogues[0];
    yuiDialogue.classList.remove("hidden");
    yuiDialogue.style.bottom = "40px";
}

yuiNext.onclick = () => {
    dialogueIndex++;
    if (dialogueIndex < dialogues.length) {
        yuiText.innerText = dialogues[dialogueIndex];
    } else {
        yuiDialogue.style.bottom = "-320px";
        setTimeout(() => yuiDialogue.classList.add("hidden"), 500);
        if (dialogues === warningDialogues) startQuiz();
    }
};

/* ===== Initial Yui Dialogues ===== */
const initialDialogues = [
    "Yui: Hello, I am Yui.",
    "Yui: Alfa is likely my big brother. I am not clear about the true relationship between us two yet, but I know he is Papa's close friend.",
    "Yui: Bye!",
    "Yui: OH~ Wait! I have something important to tell you.",
    "Yui: I heard that you just added a Brain to yourself. That's great!",
    "Yui: Actually, Alfa requests me to help you improve your Mental Health.",
    "Yui: You can increase your Mental Health by clicking on 'Increase Mental Health'. Have a good day.",
    "Yui: Bye bye~"
];

/* ===== Warning Dialogues Before Quiz ===== */
const warningDialogues = [
    "Yui: Oh, I just remembered something I hadn't told you.",
    "Yui: If you choose the right answer, your Mental Health will increase by 10%.",
    "Yui: If you choose the wrong answer, it will decrease by 5%.",
    "Yui: If you choose the wrong answer on the LAST question...",
    "Yui: Your Mental Health will decrease by 100%.",
    "Yui: I hope you are intelligent enough to reach at least 40%.",
    "Yui: Good luck!",
    "Yui: Let's start the quiz now."
];

/* ===== Increase Mental Health Button ===== */
increaseBtn.addEventListener("click", () => {
    showYuiDialogue(warningDialogues);
});

/* Quiz System */
const quizContainer = document.getElementById("quiz-container");
const quizQuestion = document.getElementById("quiz-question");
const quizAnswers = document.getElementById("quiz-answers");

const quizData = [
    {
        question: "What is 2+2?",
        options: ["3","4","5","22"],
        answer: 1
    },
    {
        question: "SAO stands for?",
        options: ["Sword Art Online","Super Anime Online","Simple Adventure Online","Special Attack Order"],
        answer:0
    },
    {
        question:"Which color is the sky?",
        options:["Green","Blue","Red","Yellow"],
        answer:1
    },
    {question:"HTML is?",options:["Language","Browser","OS","Game"],answer:0},
    {question:"JS stands for?",options:["JavaScript","JustScript","JumpStart","JellyScript"],answer:0},
    {question:"Mental Health bar initially?",options:["0%","10%","50%","100%"],answer:0},
    {question:"Who is Alfa?",options:["Yui","You","Me","He"],answer:3},
    {question:"Fun button emoji?",options:["😂","🎲","🤖","💊"],answer:0},
    {question:"Wrong answer penalty?",options:["-5%","-10%","-20%","-50%"],answer:0},
    {question:"Last question wrong penalty?",options:["-10%","-50%","-100%","-25%"],answer:2}
];

let currentQ = 0;
let mhValue = 0;

function startQuiz() {
    currentQ=0; mhValue=0;
    quizContainer.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const q = quizData[currentQ];
    quizQuestion.textContent = `Q${currentQ+1}: ${q.question}`;
    quizAnswers.innerHTML="";
    console.log("QUESTION:", q.question);
    q.options.forEach((opt,i)=>{
        const btn = document.createElement("button");
        btn.className="quiz-answer-btn";
        btn.textContent=opt;
        btn.addEventListener("click", ()=> selectAnswer(i));
        quizAnswers.appendChild(btn);
    });
}

function selectAnswer(selected){
    const correct = quizData[currentQ].answer;
    if(currentQ===9 && selected!==correct){
        mhValue=0;
    }else{
        if(selected===correct) mhValue+=10;
        else mhValue-=5;
        if(mhValue<0) mhValue=0;
        if(mhValue>100) mhValue=100;
    }
    updateMHBar();
    currentQ++;
    if(currentQ<quizData.length) showQuestion();
    else finishQuiz();
}

function updateMHBar(){
    mhBar.style.width=`${mhValue}%`;
    if(mhValue<=25) mhBar.style.background="linear-gradient(to right, #ff4c4c,#ff0000)";
    else if(mhValue<=50) mhBar.style.background="linear-gradient(to right, #ff8c00,#ffaa00)";
    else if(mhValue<=75) mhBar.style.background="linear-gradient(to right, #ffff00,#aaff00)";
    else mhBar.style.background="linear-gradient(to right, #00ff00,#00cc00)";
    mhText.textContent=`Mental Health: ${mhValue}%`;
}

function finishQuiz(){
    typeText(`Quiz Completed! Final Mental Health: ${mhValue}%`);
    quizContainer.classList.add("hidden");
    increaseBtn.disabled=false;
}

