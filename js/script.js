const questions = [
	{
		question: 'Który demon z Mrocznej Trójcy jest najstarszy ?',
		answers: [
			{ text: 'Diablo', correct: false },
			{ text: 'Baal', correct: false },
			{ text: 'Duriel', correct: false },
			{ text: 'Mefisto', correct: true },
		],
	},
	{
		question: 'W jakiej lokacji możemy znaleźć Dziennik Horazona ?',
		answers: [
			{ text: 'Tajemne Sanktuarium', correct: true },
			{ text: 'Travincal', correct: false },
			{ text: 'Lodowy Trakt', correct: false },
			{ text: 'Czarne Moczary', correct: false },
		],
	},
	{
		question: 'Dokończ imię bosa - Prastary Kaa ... ',
		answers: [
			{ text: 'Ognia', correct: false },
			{ text: 'Bezduszny', correct: true },
			{ text: 'Wyzwolenia', correct: false },
			{ text: 'Spaczony', correct: false },
		],
	},
	{
		question: 'Unikatowy przedmiot o imieniu KOŚCIOGRYZ, to: ',
		answers: [
			{ text: 'Wielki Kafar', correct: false },
			{ text: 'Kafar', correct: true },
			{ text: 'Berdysz', correct: false },
			{ text: 'Tabar', correct: false },
		],
	},
	{
		question: 'Z ilu części składa się zestaw Nieśmiertelnego Króla ?',
		answers: [
			{ text: '3', correct: false },
			{ text: '4', correct: false },
			{ text: '5', correct: false },
			{ text: '6', correct: true },
		],
	},
	{
		question: 'Słowo runiczne o nazwie Przysięga Starożytnych zawiera odpowiednio runy w kolejności: ',
		answers: [
			{ text: 'Tal, Ort, Ral', correct: false },
			{ text: 'Ral, Mal, Ort', correct: false },
			{ text: 'Ral, Ort, Tal', correct: true },
			{ text: 'Tal, Ral, El', correct: false },
		],
	},
	{
		question: 'Dla jakiej postaci przeznaczony jest zestaw Łachmany Tal Rasha ?',
		answers: [
			{ text: 'Czarodziejki', correct: true },
			{ text: 'Amazonki', correct: false },
			{ text: 'Nekromanty', correct: false },
			{ text: 'Druida', correct: false },
		],
	},
	{
		question: 'W którym akcie wykonujemy zadanie, gdzie musimy zabić Shenka Nadzorcę? ',
		answers: [
			{ text: 'Akt II', correct: false },
			{ text: 'Akt III', correct: false },
			{ text: 'Akt IV', correct: false },
			{ text: 'Akt V', correct: true },
		],
	},
	{
		question: 'Który z Pradawnych Starożytnych używa umiejętności "Atak z wyskoku" ?',
		answers: [
			{ text: 'Madawc', correct: false },
			{ text: 'Qual-Kehk', correct: false },
			{ text: 'Talic', correct: false },
			{ text: 'Korlic', correct: true },
		],
	},
	{
		question: 'Który z kamieni szlachetnych ma żółtą barwę ?',
		answers: [
			{ text: 'Ametyst', correct: false },
			{ text: 'Topaz', correct: true },
			{ text: 'Szafir', correct: false },
			{ text: 'Brylant', correct: false },
		],
	},
]

const startingPage = document.querySelector('.app-start')
const questionPage = document.querySelector('.app-body')
const endingPage = document.querySelector('.app-end')

const startBtn = document.querySelector('.start-btn')
const nextBtn = document.querySelector('.next-btn')
const againBtn = document.querySelector('.again-btn')

const inputName = document.querySelector('.user-name')
const questionElement = document.querySelector('.question')
const answersBox = document.querySelector('.answers')
const background = document.querySelector('.background')

let currentQuestionIndex = 0
let userResult = 0
let userName;

const checkInput = () => {
	if (inputName.value !== '') {
		startQuiz()
	} else {
		alert('Przedstaw się , wypełniając pole z imieniem !')
	}
}

const startQuiz = () => {
	startingPage.style.display = 'none'
	userResult = 0
	currentQuestionIndex = 0
	userName = inputName.value

	showQuestion()
}

const showQuestion = () => {
	let currentQuestion = questions[currentQuestionIndex]
	
	questionElement.textContent = currentQuestion.question
	
	const resetState = () => {
		while(answersBox.firstChild) {
			answersBox.removeChild(answersBox.firstChild)
		}
		nextBtn.disabled = true;
	}
	resetState()

	currentQuestion.answers.forEach(answer => {
		const answerBtn = document.createElement('button')
		answerBtn.textContent = answer.text
		answerBtn.classList.add('answer')

		answersBox.appendChild(answerBtn)

		if (answer.correct) {
			answerBtn.dataset.correct = answer.correct
		}

		answerBtn.addEventListener('click', selectAnswer)
	})

	questionPage.style.display = 'block'

}

const selectAnswer = e => {
	const selectedBtn = e.target
	const isCorrect = selectedBtn.dataset.correct === 'true'
	if (isCorrect) {
		selectedBtn.classList.add('correct')
		userResult++;
	} else {
		selectedBtn.classList.add('incorrect')
	}

	Array.from(answersBox.children).forEach(btn => {
		if (btn.dataset.correct === 'true') {
			btn.classList.add('correct')
		}
		btn.disabled = true;
	})
	nextBtn.disabled = false;
}

const handleNextBtn = () => {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion()
	} else {
		showResult();
	}
}

const showResult = () => {
	const endResult = document.querySelector('.ending-result')
	const endText = document.querySelector('.ending-text')
	const endImG = document.querySelector('.ending-img')
	

	questionPage.style.display = 'none'
	endingPage.style.display = 'block'
	background.style.backgroundImage = "url('/img/diablo-2-end.jpg')"

	endResult.textContent = `Zdobyłeś ${userResult} / ${questions.length} punktów !`;
	endText.textContent = `${userName}, Twój poziom to:`
	
	if (userResult <= 2 * questions.length / questions.length) {
		endImG.setAttribute('src','https://www.hiveworkshop.com/media/fallen-diablo-ii.44860/full')
	} else if (userResult <= 4 * questions.length / questions.length) {
		endImG.setAttribute('src','https://www.hiveworkshop.com/media/fallen-shaman-diablo-ii.44861/full')
	} else if (userResult <= 6 * questions.length / questions.length) {
		endImG.setAttribute('src','https://www.hiveworkshop.com/media/balrog-diablo-ii.44858/full')
	} else if (userResult <= 8 * questions.length / questions.length) {
		endImG.setAttribute('src','https://www.hiveworkshop.com/media/tyrael-diablo-ii.44859/full')
	} else if (userResult <= 10 * questions.length / questions.length) {
		endImG.setAttribute('src','https://www.hiveworkshop.com/media/diablo-diablo-ii.44857/full')
	} 
}

const playAgain = () => {
	endingPage.style.display = 'none'
	startingPage.style.display = 'block'
	background.style.backgroundImage = "url('../img/bg-diabloII.jpg')"
}

startBtn.addEventListener('click', checkInput)
nextBtn.addEventListener('click', handleNextBtn)
againBtn.addEventListener('click', playAgain)
