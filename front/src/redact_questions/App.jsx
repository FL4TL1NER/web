import { useState } from 'react'
import './App.css'

const actionList = ["View all questions","Put new question"]
function App() {
    const [al, setAl] = useState(actionList[0])
    return (
        <div className='App'>
            <div>Redact Questions</div>
            <div>
                <DropdownList list={actionList} onChange={(e) => setAl(e)}/>
            </div>
            <div>
                {!(al.localeCompare(actionList[0])) && (<AllQuestions/>)}
                {!(al.localeCompare(actionList[1])) && (<PostNewQuestion/>)}
            </div>
        </div>
  )
}

const maxElementsList = [3,5,10,25]
function AllQuestions() {
    const [nElements, setNElements] = useState(maxElementsList[0])
    const [reset,setReset] = useState(0)
    const [qa, setqa] = useState([{question: "",answer: ""}]);

    function update(){
        let res = fetch("http://localhost:8000/getAllQuestions",{method: "GET",mode: "cors"})
        res.then((response) => response.ok ? response.json().then((res) => {setqa(res);setReset((reset+1)%2)})
                                           : alert(response.status))
    }

    return (
        <>
            <div><DropdownList list={maxElementsList} onChange={(e) => {setNElements(e);setReset((reset+1)%2)}}/> <ButtonOnClick text={"Update Questions"} onClick={update}/></div>
            <div><QuestionAnswer key={reset} pageLen={nElements} array={qa} onUpdate={update}/></div>
        </>
    )
}

function DropdownList({list,onChange}) {
    const optionList = list.map((el,i) => <option key={i} value={el}>{el}</option>)
    return (
        <>
            <select onChange={e => onChange(e.target.value)}>
                {optionList}
            </select>
        </>
    )
}

function ButtonOnClick({onClick,text}) {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

function QuestionAnswer({pageLen, array, onUpdate}) {
    const [page,setPage] = useState(0)
    
    function back() {
        if (page>0) {
            setPage(page-1)
        }
    }
    function forward() {
        if (page<Math.floor(array.length/pageLen)) {
            setPage(page+1)
        }
    }

    return (
        <>
            <div><ButtonOnClick text={"<-"} onClick={back}/>{page}<ButtonOnClick text={"->"} onClick={forward}/></div>
            <div><Page key={page} data={Array.from(array.entries().filter((el)=> el[0]>=page*pageLen && el[0]<(page+1)*pageLen))} onUpdate={onUpdate}/></div>
        </>
    )
}

function Page({data, onUpdate}) {
    const optionList = data.map((el,i)=><tr key={i} scope='row'><PageRecord data={el} onUpdate={onUpdate}/></tr>)
    return (
        <table>
            <thead>
                <tr>
                    <th scope='col'>n</th>
                    <th scope='col'>id</th>
                    <th scope='col'>question</th>
                    <th scope='col'>answer</th>
                    <th scope='col'></th>
                </tr>
            </thead>
            <tbody>
                {optionList}
            </tbody>
        </table>
    )
}

function PageRecord({data, onUpdate}) {
    const [editing,setEditing] = useState(false)
    function flip() {
        //alert("flipped")
        setEditing(editing ? false : true)
    }
    return (
        <>{editing ? (<PageRecordEdit data={data} flip={flip} onUpdate={onUpdate}/>) : (<PageRecordView data={data} flip={flip}/>)}</>
    )
}

function PageRecordView({data, flip}) {
    return (
        <>
            <th className='tableNumber' scope='row'>{data[0]}</th>
            <td className='tableNumber'>{data[1].id}</td>
            <td className='tableText'>{data[1].question}</td>
            <td className='tableText'>{data[1].answer}</td>
            <td className='tableButton'><ButtonOnClick text={"Edit"} onClick={flip}/></td>
        </>
    )
}

function PageRecordEdit({data, flip, onUpdate}) {
    const [q,setQ] = useState(data[1].question)
    const [a,setA] = useState(data[1].answer)

    function update() {
        alert("updated id: " + data[1].id.toString() +
              "\nq: " + q +
              "\na: " + a)
        let res = fetch("http://localhost:8000/question/"+data[1].id.toString(),
              {method: "PUT", mode: "cors", headers: {"Content-Type": "application/json"}, body: JSON.stringify({question: q,answer: a})})
        res.then((res) => {if (res.ok) {onUpdate()}})
    }
    function deleteRecord() {
        if (confirm("Do you realy want to delete question?")){
            fetch("http://localhost:8000/question/"+data[1].id.toString(),
                  {method: "DELETE", mode: "cors"})
            onUpdate()
        }
    }
    return (
        <>
            <th className='tableNumber' scope='row'>{data[0]}</th>
            <td className='tableNumber'>{data[1].id}</td>
            <td className='tableText'><input value={q} onChange={e => setQ(e.target.value)}></input></td>
            <td className='tableText'><input value={a} onChange={e => setA(e.target.value)}></input></td>
            <td className='tableButton'><ButtonOnClick onClick={() => {update();flip()}} text={"U"}/><ButtonOnClick onClick={deleteRecord} text={"D"}/><ButtonOnClick onClick={flip} text={"C"}/></td>
        </>
    )
}

function PostNewQuestion() {
    const [q,setQ] = useState("")
    const [a,setA] = useState("")

    function post() {
        if (q.localeCompare("") && a.localeCompare("")){
            fetch("http://localhost:8000/question",
                  {method: "POST", mode: "cors", headers: {"Content-Type": "application/json"}, body: JSON.stringify({question: q,answer: a})})
            alert("Posted new question")
            setQ("")
            setA("")
        } else {
            alert("Question and/or answer empty")
        }
    }
    return (
        <><input value={q} onChange={e => setQ(e.target.value)}></input> <input value={a} onChange={e => setA(e.target.value)}></input> <ButtonOnClick onClick={post} text={"Post"}/></>
    )
}

export default App