let c = 2
let questions = ["پایتخت کانادا؟","پر جمعیت ترین کشور جهان؟","پایتخت استرالیا؟","بزرگترین کشور عربی؟","واحد پول آرژانتین؟","بزرگترین کشور عضو اتحادیه اروپا؟","کدام یک از کشورهای آمریکای جنوبی نیست؟","کدام یک از کشورهای خاورمیانه نمی‌باشد؟","واحد پول تونس؟","بزرگترین جزیره جهان؟"]
let answers = ["تورنتو","مونترال","اتاوا","z","چین","هند","مکزیک","x","ملبورن","کانبرا","سیدنی","y","الجزایر","مصر","عربستان","x","پزو","پوند","دلار","x","اسپانیا","سوئد","فرانسه","z","ونزوئلا","پاناما","سورینام","y","مصر","افغانستان","ترکیه","y","دلار","درهم","دینار","z","گینه نو","ماداگاسکار","گرینلند","z"]
let n = 4
let answer = ''
let k = 0
let myAnswers = []
let wrong = 0
function changeStyle(event) {
  answer = document.querySelector('input[name="q"]:checked').value
  myAnswers[k] = answer
  k++
  if (answer == answers[n-1]){
    document.getElementById(answer+"Div").style.backgroundColor = "rgb(144, 188, 132)"
  } else {
    document.getElementById(answer+"Div").style.backgroundColor = "rgb(197, 53, 48)"
  }
  for (let i = 0; i < 3; i++) {
    document.getElementsByName('q')[i].disabled = true
  }

  setTimeout(nextPage,1000)

  function nextPage() {
    if (c == 10) {
      resaultPage()
    } else {
      event.preventDefault()
      document.getElementById(answer+"Div").style.backgroundColor = "rgb(255, 237, 212)"
      for (let i = 0; i < 3; i++) {
        document.getElementsByName('q')[i].disabled = false
      }
      
      createQuestion('question',questions[c-1])
      createQuestion('x',answers[n])
      createQuestion('y',answers[n+1])
      createQuestion('z',answers[n+2])
      
      Array.from(document.querySelectorAll('input[name="q"]:checked'),input => input.checked = false)
      
      clear('num')
      let num = document.createTextNode('سوال ' + c)
      document.getElementById('num').appendChild(num)
      
      c++
      n += 4
    }
  }

  function createQuestion(id,text) {
    clear(id)
    let data = document.createTextNode(text)
    document.getElementById(id).appendChild(data)
  }
  
  function clear(id) {
    document.getElementById(id).innerHTML = ''
  }

  function createForm(question,ans1,ans2,ans3) {
    let myForm = document.createElement('form')
    let myQuestion = document.createElement('label')
    let myQuestionS = document.createElement('strong')
    let myQuestionSText = document.createTextNode(question)
    document.body.appendChild(myForm)
    myForm.appendChild(myQuestion)
    myQuestion.appendChild(myQuestionS)
    myQuestionS.appendChild(myQuestionSText)

    let BR = document.createElement('br')
    myForm.appendChild(BR)
    let BR2 = document.createElement('br')
    myForm.appendChild(BR2)

    createAnswer('x',ans1,myForm)
    createAnswer('y',ans2,myForm)
    wrong = createAnswer('z',ans3,myForm)
    k++
    return wrong
  }
  
  function createAnswer(value,text,theForm) {
    let myDiv = document.createElement('div')
    let myAnswer = document.createElement('input')
    myAnswer.setAttribute('type','radio')
    myAnswer.setAttribute('value',value)
    let myLable = document.createElement('label')
    let myLableText = document.createTextNode(text)
    theForm.appendChild(myDiv)
    myDiv.appendChild(myAnswer)
    myDiv.appendChild(myLable)
    myLable.appendChild(myLableText)

    myAnswer.style.visibility = 'hidden'

    let correctAnswer = answers[n+3]
    if (value == correctAnswer) {
      myDiv.style.backgroundColor = "rgb(144, 188, 132)"
    }
    let myAns = myAnswers[k]
    if (correctAnswer !== myAns && value == myAns) {
      wrong++
      myDiv.style.backgroundColor = "rgb(197, 53, 48)"
    }
    return wrong
  }
  
  function resaultPage() {
    clear('num')
    clear('header')
    document.getElementById('quiz').style.display = "none"
    clear('quiz')
    
    c = 1
    n = 0

    let restartButton = document.createElement('button')
    let restartButtonT = document.createTextNode('شروع دوباره')
    document.body.appendChild(restartButton)
    restartButton.appendChild(restartButtonT)
    restartButton.setAttribute("id","restart")
    restartButton.onclick = () => {window.location.href = "http://127.0.0.1:8080/index.htm"}
    
    k = 0
      
    questions.forEach(question => {
      wrong = createForm(question,answers[n],answers[n+1],answers[n+2])
      n += 4
    })
    
    let wrongPercent = (wrong / 10) * 100
    let correctPercent = 100 - wrongPercent
    let resaultText = `پاسخ صحیح: %${correctPercent}`
    createQuestion('header',':نتیجه')
    createQuestion('resaultText',resaultText)

  }
}
