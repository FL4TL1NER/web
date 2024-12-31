from sqlmodel import SQLModel, Field, create_engine

class QuestionBase(SQLModel):
    question: str
    answer: str

class Question(QuestionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class QuestionGet(QuestionBase):
    id: int

class QuestionPost(QuestionBase):
    pass

database_url = 'postgresql+psycopg2://postgres:password@localhost:5432/mydb'

def create_my_engine():
    return create_engine(database_url)