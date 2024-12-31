from sqlmodel import SQLModel, Field, create_engine, Session

class Question(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    question: str
    answer: str

questions = [Question(question='What is the color of spruce?',
                      answer='Green'),
             Question(question='What is the color of sky?',
                      answer='Blue'),
             Question(question='What is result of 12 * 25?',
                      answer='300'),
             Question(question='How many legs does a spider have?',
                      answer='8'),
             Question(question='What is the color of an emerald?',
                      answer='Green'),
             Question(question='If you freeze water, what do you get?',
                      answer='Ice'),
             Question(question='How many planets are in our solar system?',
                      answer='8'),
             Question(question='What is the name of molten rock after a volcanic eruption?',
                      answer='Lava'),
             Question(question='What is the closest star to Earth?',
                      answer='Sun'),
             Question(question='Chrome, Safari, Firefox and Explorer are different types of what?',
                      answer='Web browsers'),
             Question(question='Who is the king of the gods in Greek mythology?',
                      answer='Zeus'),
             Question(question='In what galaxy is our solar system located?',
                      answer='Milky Way'),
             Question(question='Which planet is known as the “Blue Planet”?',
                      answer='Earth'),
             Question(question='Which geometric shape has four equal sides and four right angles?',
                      answer='Square'),
             Question(question='In which year did World War II end?',
                      answer='1945'),
             Question(question='What is the smallest amount possible of Bitcoin?',
                      answer='Satoshi'),
             Question(question='Which bird can repeat words and phrases that it hears?',
                      answer='Parrot'),
             Question(question='What is often seen as the smallest unit of memory?',
                      answer='Bit'),
             Question(question='What does “HTTP” stand for?',
                      answer='HyperText Transfer Protocol')]

database_url = 'postgresql+psycopg2://postgres:password@localhost:5432/mydb'
engine = create_engine(database_url)

session = Session(engine)
session.add_all(questions)
session.commit()
