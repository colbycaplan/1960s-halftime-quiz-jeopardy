const gameData = [
    {
        category: "Postwar Boom & 'American Dream'",
        questions: [
            { points: 100, question: "Which factor most contributed to the suburban housing boom of the 1950s?", answer: "The GI Bill, FHA loans, and the desire for mass prosperity for the White middle class." },
            { points: 200, question: "What did the GI Bill primarily provide for returning World War II veterans?", answer: "Benefits for returning World War II veterans (known as G.I.s). It included provisions for education and training, loans for homes, farms, or businesses, and unemployment compensation." },
            { points: 300, question: "Levittown symbolized which feature of postwar American life?", answer: "Suburbanization and mass prosperity for the White middle class, but also racial exclusion." },
            { points: 400, question: "The Interstate Highway Act of 1956 most directly encouraged what change?", answer: "The growth of car culture, commuting, and changed American lifestyles." },
            { points: 500, question: "Which group was largely excluded from the benefits of 1950s homeownership programs?", answer: "African Americans and other minorities due to racial exclusion." }
        ]
    },
    {
        category: "Cold War Fear & Conformity",
        questions: [
            { points: 100, question: "What was Senator Joseph McCarthy best known for during the early 1950s?", answer: "Leading a campaign of accusations against suspected communists in the U.S. government and other institutions, a period that became known as McCarthyism." },
            { points: 200, question: "What did Eisenhower mean by warning against the “military-industrial complex”?", answer: "He was warning about the immense influence that the defense industry and the military could have on government policy." },
            { points: 300, question: "The policy of “massive retaliation” was based on what idea?", answer: "The idea of using nuclear deterrence to counter conventional military threats." },
            { points: 400, question: "What was the main U.S. response to the Soviet Union's launch of Sputnik in 1957?", answer: "Increased funding for science and math education and the creation of NASA, sparking the 'space race'." },
            { points: 500, question: "Which government committee investigated suspected Communist influence in Hollywood?", answer: "The House Un-American Activities Committee (HUAC)." }
        ]
    },
    {
        category: "Family Life & Culture",
        questions: [
            { points: 100, question: "The ideal “nuclear family” of the 1950s emphasized what social pattern?", answer: "A father as the provider and a mother as the homemaker." },
            { points: 200, question: "What role did television play in shaping American culture during the 1950s?", answer: "It reinforced conformity and broadcasted national shows to a rapidly growing audience." },
            { points: 300, question: "What did the term “organization man” describe?", answer: "The conformity and loyalty to the corporation that was expected of white-collar workers." },
            { points: 400, question: "What was one result of the baby boom that began after World War II?", answer: "A massive increase in the U.S. population and a surge in demand for housing, consumer goods, and schools." },
            { points: 500, question: "How did gender roles change for women from World War II to the 1950s?", answer: "Many women who had worked in factories during the war returned to more traditional domestic roles in the 1950s." }
        ]
    },
    {
        category: "Shifting the Dream",
        questions: [
            { points: 100, question: "What did the Supreme Court's Brown v. Board of Education decision declare unconstitutional?", answer: "Racial segregation in public schools." },
            { points: 200, question: "What event sparked the Montgomery Bus Boycott in 1955?", answer: "Rosa Parks' refusal to give up her seat to a white man on a segregated bus." },
            { points: 300, question: "What was President Kennedy’s “New Frontier” designed to encourage?", answer: "A sense of energy, youth, challenge, and service, and to inspire Americans to work for progress." },
            { points: 400, question: "How did Kennedy's assassination in 1963 affect the national mood?", answer: "It led to a national sense of loss, an end of innocence, and a transition to activism." },
            { points: 500, question: "The phrase “When the 1950s Died” refers primarily to which historical shift?", answer: "The transition from the conformity and prosperity of the 1950s to the social and political turmoil of the 1960s." }
        ]
    },
    {
        category: "LBJ & The Great Society",
        questions: [
            { points: 100, question: "What was the main goal of Lyndon B. Johnson’s “Great Society” programs?", answer: "To create a 'fairer, healthier, and more educated nation' by addressing issues of poverty, racial injustice, and education." },
            { points: 200, question: "Johnson's 'War on Poverty' aimed to address what problem?", answer: "Poverty and economic inequality in the United States." },
            { points: 300, question: "How did LBJ link his Great Society vision to the Civil Rights Movement?", answer: "He argued that the fight for civil rights was a moral imperative and a key part of achieving the Great Society." },
            { points: 400, question: "Which earlier president’s New Deal was most similar in spirit to the Great Society?", answer: "Franklin D. Roosevelt’s New Deal." },
            { points: 500, question: "What major event most undermined funding and public support for Johnson’s Great Society programs?", answer: "The Vietnam War." }
        ]
    },
    {
        category: "Great Society Programs",
        questions: [
            { points: 100, question: "Which Great Society law provided federal funding to improve K–12 education?", answer: "The Elementary & Secondary Education Act (1965)." },
            { points: 200, question: "What was the main purpose of Medicare and Medicaid?", answer: "To provide health insurance for the elderly (Medicare) and the poor (Medicaid)." },
            { points: 300, question: "What did the Civil Rights Act of 1964 accomplish?", answer: "It ended segregation in public places and banned employment discrimination on the basis of race, color, religion, sex or national origin." },
            { points: 400, question: "Which Great Society law provided food assistance to low-income families?", answer: "The Food Stamp Act (1964)." },
            { points: 500, question: "What agency was created to coordinate housing and urban development programs?", answer: "The Department of Housing and Urban Development (HUD)." }
        ]
    }
];

const board = document.getElementById('jeopardy-board');
const modal = document.getElementById('question-modal');
const questionText = document.getElementById('question-text');
const answerText = document.getElementById('answer-text');
const revealAnswerBtn = document.getElementById('reveal-answer');
const closeBtn = document.querySelector('.close-button');
const teamsContainer = document.getElementById('teams-container');

let currentQuestion = null;
let teams = [];

function init() {
    setupTeams();
    initBoard();
}

function setupTeams() {
    const numTeams = 4;
    for (let i = 1; i <= numTeams; i++) {
        const teamName = `Team ${i}`;
        teams.push({ name: teamName, score: 0 });
    }
    renderTeams();
}

function renderTeams() {
    teamsContainer.innerHTML = '';
    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `<h3>${team.name}</h3><p>Score: ${team.score}</p>`;
        teamsContainer.appendChild(teamDiv);
    });
}

function initBoard() {
    gameData.forEach(category => {
        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = category.category;
        board.appendChild(categoryTitle);
    });

    for (let i = 0; i < 5; i++) {
        gameData.forEach(category => {
            const question = category.questions[i];
            const cell = document.createElement('div');
            cell.classList.add('question-cell');
            cell.textContent = `$${question.points}`;
            cell.dataset.category = category.category;
            cell.dataset.points = question.points;
            cell.addEventListener('click', showQuestion);
            board.appendChild(cell);
        });
    }
}

function showQuestion(event) {
    const cell = event.target;
    if (cell.classList.contains('answered')) {
        return;
    }

    const category = cell.dataset.category;
    const points = parseInt(cell.dataset.points);
    const categoryData = gameData.find(cat => cat.category === category);
    currentQuestion = categoryData.questions.find(q => q.points === points);

    questionText.textContent = currentQuestion.question;
    answerText.textContent = currentQuestion.answer;
    answerText.style.display = 'none';
    revealAnswerBtn.style.display = 'block';

    modal.style.display = 'block';

    cell.classList.add('answered');

    addTeamButtons();
}

function addTeamButtons() {
    const teamButtonsContainer = document.createElement('div');
    teams.forEach((team, index) => {
        const teamButton = document.createElement('button');
        teamButton.textContent = `Award to ${team.name}`;
        teamButton.addEventListener('click', () => awardPoints(index));
        teamButtonsContainer.appendChild(teamButton);
    });
    const questionContent = document.querySelector('.modal-content');
    // remove existing team buttons
    const existingButtons = document.querySelector('.team-buttons');
    if(existingButtons) {
        existingButtons.remove();
    }
    teamButtonsContainer.classList.add('team-buttons');
    questionContent.appendChild(teamButtonsContainer);
}

function awardPoints(teamIndex) {
    teams[teamIndex].score += currentQuestion.points;
    renderTeams();
    closeModal();
}

function revealAnswer() {
    answerText.style.display = 'block';
    revealAnswerBtn.style.display = 'none';
}

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
revealAnswerBtn.addEventListener('click', revealAnswer);
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
});

init();