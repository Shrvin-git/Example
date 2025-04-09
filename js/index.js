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
const processBar = document.querySelector('.process')
const modalScreen = document.querySelector('.modal-screen')
const modalCard = document.querySelector('.modal-card')
const modalContent = document.querySelector('.modal-content')

// modalScreen.classList.remove('hidden')

const submitBtn = document.querySelector('.continue')
const cancelBtn = document.querySelector('#cancel')
const tryAgainBtn = document.querySelector('#try-again')




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

}

const checkUserAnswer = () => {

  let allAnswerInputs = document.querySelectorAll('.input')

  allAnswerInputs.forEach(element => {
    sumCharAnswer += element.value
  });


  if (sumCharAnswer === null || sumCharAnswer === undefined || sumCharAnswer === '') {




    toastElement.classList.remove('hidden')
    document.querySelector('.toast-message').innerHTML = 'تمامی اینپوت هارا پر کنید'
    submitBtn.style.cursor = 'not-allowed'


    setTimeout(() => {
      toastElement.classList.add('hidden')
      //* Change Cursor Button
      submitBtn.style.cursor = 'pointer'

    }, 2000);

  }


  else {

    if (letterInput.toLocaleUpperCase() === currentQuestion.answer) {

      if (currentIndex > 10) {
        console.log('شما بردید :))');
      }
      else {

        restAnswerUnput()

        toastElement.classList.remove('hidden')
        document.querySelector('.toast-message').innerHTML = "جواب شما درست میباشد !"
        submitBtn.disabled = true
        submitBtn.style.cursor = 'not-allowed'



        setTimeout(() => {

          toastElement.classList.add('hidden')

          //* Change Cursor Button
          submitBtn.style.cursor = 'pointer'

          //* Sum Correct Answer
          userScoore += currentQuestion.score

          //* Next Question
          currentIndex++
          currentQuestion = questions[currentIndex]

          //* Cleare Letter Input
          writtedText.innerHTML = ''

          submitBtn.disabled = false

          sumScore()
          clearAnswerInputs()
          gameInit()


        }, 3000);
      }

    }

    else {

      if (chances <= 1) {

        modalScreen.classList.remove('hidden')
        modalContent.innerHTML = ' شما بیش از حد مجاز تلاش کردید ! '


      }
      else {



        submitBtn.style.cursor = 'not-allowed'
        toastElement.classList.remove('hidden')
        document.querySelector('.toast-message').innerHTML = "جواب اشتباهه !"


        setTimeout(() => {

          //* Change Cursor Button
          submitBtn.style.cursor = 'pointer'

          //* Cleare Inputs
          allAnswerInputs.forEach(element => {
            element.value = null
          });

          toastElement.classList.add('hidden')
          chances--
          guessCount.innerHTML = chances
        }, 2000);
      }

    }


  }

}

const inputValueHandler = (event) => {
  const currentInput = event.target
  const key = event.inputType
  const value = currentInput.value

  const inputs = document.querySelectorAll('.input')
  const currentIndex = Array.from(inputs).indexOf(currentInput)

  // فقط یک کاراکتر توی input نگه دار
  if (value.length > 1) {
    currentInput.value = value.charAt(value.length - 1)
  }

  // وقتی تایپ کردی بری بعدی
  if (key === 'insertText' && value.length === 1) {
    const nextInput = inputs[currentIndex + 1]
    if (nextInput) nextInput.focus()
  }

  // وقتی پاک کردی بری قبلی
  if (key === 'deleteContentBackward' && value.length === 0) {
    const prevInput = inputs[currentIndex - 1]
    if (prevInput) prevInput.focus()
  }

  // آپدیت رشته کامل
  let combined = ''
  inputs.forEach(input => combined += input.value)
  letterInput = combined
  somCharInputs()
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

const restAnswerUnput = () => {

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