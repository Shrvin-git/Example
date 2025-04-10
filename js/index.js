const questions = [
  {
    hint: "زبان نشانه‌گذاری که برای ساختاردهی صفحات وب استفاده می‌شود",
    answer: "HTML",
    score: 1,
  },
  {
    hint: "زبانی که برای استایل‌دهی به صفحات وب استفاده می‌شود",
    answer: "CSS",
    score: 0.75,
  },
  {
    hint: "زبانی که باعث زنده شدن صفحات وب می‌شود",
    answer: "JAVASCRIPT",
    score: 1.75,
  },
  {
    hint: "لایبرری محبوب جاوااسکریپت برای ساخت رابط کاربری",
    answer: "REACT",
    score: 1.5,
  },
  {
    hint: "ابزاری برای مدیریت و نسخه‌بندی کدها",
    answer: "GIT",
    score: 0.5,
  },
  {
    hint: "زبان برنامه‌نویسی تایپ‌محور که روی جاوااسکریپت ساخته شده است",
    answer: "TYPESCRIPT",
    score: 1.25,
  },
  {
    hint: "سیستمی که برای طراحی ریسپانسیو استفاده می‌شود",
    answer: "BOOTSTRAP",
    score: 1,
  },
  {
    hint: "فرمت محبوب برای تصاویر وکتوری در وب",
    answer: "SVG",
    score: 0.75,
  },
  {
    hint: "ابزاری برای بسته‌بندی ماژول‌های جاوااسکریپت",
    answer: "WEBPACK",
    score: 1,
  },
  {
    hint: "سرویسی برای میزبانی کد و همکاری تیمی",
    answer: "GITHUB",
    score: 0.5,
  },
];


const inputsContainer = document.querySelector('.inputs')
const hint = document.querySelector('.hint-word')
const writtedText = document.querySelector('.user-writted')
const guessCount = document.querySelector('.guess-count')
const scoore = document.querySelector('.score')
const inputs = document.querySelectorAll('.input')
const restetGameBtn = document.querySelector('.reset')


const toastElement = document.querySelector('.toast')
const toastMessage = document.querySelector('.toast-message')
const toastProgress = document.querySelector('.process')


const modalScreen = document.querySelector('.modal-screen')
const modalCard = document.querySelector('.modal-card')
const modalContent = document.querySelector('.modal-content')


const submitBtn = document.querySelector('.continue')
const cancelBtn = document.querySelector('#cancel')
const tryAgainBtn = document.querySelector('#try-again')

const title = document.querySelector('.game-card-title')



let sumCharAnswer = ''
let letterInput = ''
let currentIndex = 0
let currentQuestion = questions[currentIndex]
let chances = 3
let isButtonDisabled = false
let correctAnswer = 0
let userScoore = 0



const gameInit = () => {

  hint.innerHTML = currentQuestion.hint


  const answerArray = currentQuestion.answer.split('')
  answerArray.forEach((char) => {

    inputsContainer.insertAdjacentHTML('beforeend',
      `
      <input class="input" oninput="inputValueHandler(event)" type=text >
      `
    )
  })

  document.querySelectorAll('.input')[0].focus()
  title.innerHTML = `بازی حدس کلمه ${currentQuestion.answer} `
}

const checkUserAnswer = () => {

  // restAnswerInput()

  let allAnswerInputs = document.querySelectorAll('.input')

  allAnswerInputs.forEach(element => {
    sumCharAnswer += element.value
  });


  if (sumCharAnswer === null || sumCharAnswer === undefined || sumCharAnswer === '') {

    toastElement.classList.remove('hidden')
    submitBtn.style.cursor = 'not-allowed'

    showToastFailed('تمامی اینپوت هارا پر کنید')
  }

  else {

    if (letterInput.toLocaleUpperCase() === currentQuestion.answer) {


      toastElement.classList.remove('hidden')
      submitBtn.disabled = true
      submitBtn.style.cursor = 'not-allowed'

      showToast('success', "جواب شما درست میباشد !")
      restAnswerInput()

    }

    else {

      if (chances <= 1) {

        modalScreen.classList.remove('hidden')
        modalContent.innerHTML = ' شما بیش از حد مجاز تلاش کردید ! '


      }
      else {

        submitBtn.style.cursor = 'not-allowed'
        toastElement.classList.remove('hidden')

        showToastFailed("جواب اشتباهه !")
        document.querySelectorAll('.input')[0].focus()
        writtedText.innerHTML = ''
      }
    }
  }


}

const inputValueHandler = (event) => {


  const allInputs = document.querySelectorAll('.input')

  allInputs.forEach((input, index) => {
    input.addEventListener('keyup', (event) => {


      let { target } = event

      if (target.value.length === 1 && index + 1 < allInputs.length) {
        allInputs[index + 1].focus()
      } else if (target.value.length > 1) {
        target.value = target.value.slice(0, 1)
        allInputs[index + 1]?.focus()
      } else if (event.key === 'Backspace') {
        allInputs[index - 1]?.focus()
      }
      letterInput = Array.from(document.querySelectorAll('.input')).map(inp => inp.value).join('');
      somCharInputs()
    })
  });



}

const somCharInputs = () => {
  writtedText.innerHTML = letterInput
}

const clearAnswerInputs = () => {
  inputsContainer.innerHTML = ''
}

const sumScore = () => {
  scoore.innerHTML = userScoore
}

const restetGame = () => {
  history.go(0)
}

const restAnswerInput = () => {
  if (currentIndex > questions.length) {
    currentIndex = 0
    modalScreen.classList.remove('hidden')
    modalContent.innerHTML = ` شما برنده شدید:)) امتیاز شما ${userScoore} میباشد `
  }
}

const showToast = (status, message) => {

  if (status === 'success') {
    toastElement.className = "toast success";
  } else {
    toastElement.className = "toast failed";
  }

  //* Sum Correct Answer
  userScoore += currentQuestion.score


  //* Next Question
  currentIndex++
  currentQuestion = questions[currentIndex]


  toastElement.classList.remove("hidden");
  toastMessage.innerHTML = message;


  let toastProgressCounter = 0;

  const toastProgressInterval = setInterval(() => {
    toastProgressCounter++;

    if (toastProgressCounter > 100) {
      toastProgress.style.width = "0%";
      toastElement.classList.add('hidden')


      //* Cleare Letter Input
      writtedText.innerHTML = ''

      //* Change Cursor Button
      submitBtn.style.cursor = 'pointer'
      submitBtn.disabled = false

      sumScore()
      clearAnswerInputs()
      gameInit()


      clearInterval(toastProgressInterval);
    }

    toastProgress.style.width = `${toastProgressCounter}%`;

  }, 40);
};

const showToastFailed = (message) => {

  toastElement.className = 'toast error'
  toastMessage.innerHTML = message


  let toastProgressCounter = 0

  const toastProgressInterval = setInterval(() => {

    toastProgressCounter++

    let allAnswerInputs = document.querySelectorAll('.input')

    if (toastProgressCounter > 100) {

      allAnswerInputs.forEach(element => {
        element.value = null
      });

      toastElement.classList.add('hidden')
      submitBtn.style.cursor = 'pointer'
      chances--
      guessCount.innerHTML = chances
      clearInterval(toastProgressInterval)
    }


    toastProgress.style.width = toastProgressCounter + '%'

  }, 40);


}



window.addEventListener('load', gameInit)
submitBtn.addEventListener('click', checkUserAnswer)
restetGameBtn.addEventListener('click', restetGame)
tryAgainBtn.addEventListener('click', restetGame)
cancelBtn.addEventListener('click', restetGame)
window.addEventListener('keyup', (event) => {
  let { key } = event
  if (key === 'Enter') {
    checkUserAnswer()
  }
})
