from model import create_my_engine
from model import Question, QuestionGet, QuestionPost

from sqlmodel import Session, select

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi_responses import custom_openapi

from random import sample

engine = create_my_engine()

app = FastAPI()
app.openapi = custom_openapi(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/randomQuestions', response_model=list[QuestionGet])
def randomQuestions():
    with Session(engine) as session:
        indexes = session.exec(select(Question.id)).all()
        if len(indexes) < 3:
            raise HTTPException(500,detail='Not enough questions') 
        rand = sample(indexes,3)
        return [session.get(Question,rand[0]),
                session.get(Question,rand[1]),
                session.get(Question,rand[2])]

@app.get('/getAllQuestions', response_model=list[QuestionGet])
def getAllQuestions():
    with Session(engine) as session:
        return session.exec(select(Question)).all()

@app.get('/question/{id}', response_model=QuestionGet)
def getQuestion(id: int):
    with Session(engine) as session:
        db_question = session.get(Question,id)
        if db_question is None:
            raise HTTPException(404,detail='No such question')
        return db_question
        
@app.put('/question/{id}')
def updateQuestion(id: int,question: QuestionPost):
    with Session(engine) as session:
        db_question = session.get(Question,id)
        if not db_question:
            raise HTTPException(404,detail='No such question')
        db_question.sqlmodel_update(question.model_dump(exclude_unset=True))
        session.add(db_question)
        session.commit()
        return {"ok": True}

@app.post('/question')
def addQuestion(question: QuestionPost):
    with Session(engine) as session:
        new_question = Question.model_validate(question)
        session.add(new_question)
        session.commit()
        return {"ok": True}

@app.delete('/question/{id}')
def deleteQuestion(id: int):
    with Session(engine) as session:
        db_question = session.get(Question,id)
        if not db_question:
            raise HTTPException(404,detail='No such question')
        session.delete(db_question)
        session.commit()
        return {"ok": True}