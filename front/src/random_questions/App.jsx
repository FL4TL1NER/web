import { useState } from 'react'
import './App.css'

function App() {
    return (
        <div className='App'>
            <div className='app_name'>
                Random answers
            </div>
            <div>
                <RandomAnswers/>
            </div>
        </div>
  )
}

function RandomAnswers() {
    const [qa, setqa] = useState([{question: "",answer: ""},
                                  {question: "",answer: ""},
                                  {question: "",answer: ""}]);
    const [reset, setReset] = useState(0)
    
    function updateData(){
        let res = fetch("http://localhost:8000/randomQuestions",{method: "GET",mode: "cors"})
        res.then((response) => response.ok ? response.json().then((res) => {setqa(res);setReset((reset+1)%2)})
                                           : alert(response.status))
    }

    return (
        <>
            <div className='RandomAnswersElement'>
                <SomeButton onClick={updateData} legend={"Update Questions"}/>
            </div>
            <div className='RandomAnswersElement'>
                <QuestionAnswer key={reset} qa={qa[0]}/>
                <QuestionAnswer key={reset+2} qa={qa[1]}/>
                <QuestionAnswer key={reset+4} qa={qa[2]}/>
            </div>
        </>
    )
}

function SomeButton({onClick, legend}) {
    return (
        <button onClick={onClick}>{legend}</button>
    )
}

function QuestionAnswer({qa}) {
    const [res, setRes] = useState("");
    const [ans, setAns] = useState("");
    function checkResult() {
        if (ans.toString().toLowerCase().localeCompare(qa.answer.toString().toLowerCase()) == 0) {
            setRes("True")
        } else {
            setRes("False")
        }
    }
    return (
        <div className='QuestionAnswer'>
            <div className='question'>{qa.question}</div>
            <div className='checkAnswer'><input type="text" onChange={e => setAns(e.target.value)}></input> <button onClick={checkResult}>check</button> <strong>{res}</strong></div>
        </div>
    )
}

export default App
