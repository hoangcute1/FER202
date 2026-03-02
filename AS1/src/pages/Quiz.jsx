import { useState, useEffect, useContext, createContext } from 'react'
import { Card, Form, Button, Badge, Row, Col } from 'react-bootstrap'
import { quizData } from '../data/quizData'

// Create Quiz Context
const QuizContext = createContext()

// Quiz Provider Component
function QuizProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [questions, setQuestions] = useState([])

  // Use useEffect Hook to display the questions and answer options from the state
  useEffect(() => {
    setQuestions(quizData)
  }, [])

  const contextValue = {
    currentQuestion,
    setCurrentQuestion,
    selectedAnswers,
    setSelectedAnswers,
    selectedAnswer,
    setSelectedAnswer,
    score,
    setScore,
    isCompleted,
    setIsCompleted,
    questions
  }

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  )
}

// Quiz Content Component
function QuizContent() {
  // Use the useContext Hook to access the selected answer from the state
  const { 
    currentQuestion, 
    setCurrentQuestion,
    selectedAnswers,
    setSelectedAnswers,
    selectedAnswer,
    setSelectedAnswer,
    score,
    setScore,
    isCompleted,
    setIsCompleted,
    questions
  } = useContext(QuizContext)

  const totalQuestions = questions.length

  // Use the useState Hook to manage the user's input for each question and answer option
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      // Update the state with the user's input using the useState Hook
      const newAnswers = { ...selectedAnswers, [currentQuestion]: selectedAnswer }
      setSelectedAnswers(newAnswers)
      
      // Compare the selected answer with the correct answer for each question
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1)
      }

      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer('')
      } else {
        setIsCompleted(true)
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setSelectedAnswer('')
    setScore(0)
    setIsCompleted(false)
  }

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="page">
      <div className="d-flex flex-column gap-2 mb-4">
        <h2 className="page-title">Quiz Application</h2>
        <p className="lead mb-0">Test your React knowledge with this interactive quiz.</p>
      </div>

      <Row>
        <Col md={8}>
          {!isCompleted ? (
            <Card className="shadow-sm">
              <Card.Body>
                <div className="mb-4">
                  <h4 className="text-primary mb-3">
                    Question {currentQuestion + 1}
                  </h4>
                  <h5 className="mb-4">{questions[currentQuestion].question}</h5>
                  
                  {/* Render the questions and answer options in the UI using JSX */}
                  <Form.Group className="mb-4">
                    {questions[currentQuestion].answers.map((answer, index) => (
                      <Form.Check
                        key={index}
                        type="radio"
                        name="quiz-answer"
                        id={`answer-${index}`}
                        label={answer}
                        checked={selectedAnswer === answer}
                        onChange={() => handleAnswerSelect(answer)}
                        className="mb-3 fs-6"
                      />
                    ))}
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="secondary" className="fs-6">
                      {currentQuestion + 1} of {totalQuestions}
                    </Badge>
                    <Button
                      variant="danger"
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className="px-4"
                    >
                      {currentQuestion + 1 === totalQuestions ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ) : null}
        </Col>

        <Col md={4}>
          {isCompleted && (
            <Card className="shadow-sm border-success">
              <Card.Body className="text-center">
                <h2 className="text-danger mb-4">Quiz Completed!</h2>
                <div className="mb-4">
                  <h4 className="text-muted">Your score: {score}</h4>
                  <Badge bg={score >= totalQuestions * 0.7 ? 'success' : 'warning'} className="fs-6">
                    {score}/{totalQuestions} ({Math.round((score/totalQuestions) * 100)}%)
                  </Badge>
                </div>

                {/* Display whether the selected answer is correct or incorrect in the UI */}
                <div className="mb-4 text-start">
                  <h6 className="mb-3">Review:</h6>
                  {questions.map((question, index) => (
                    <div key={index} className="mb-2 small">
                      <strong>Q{index + 1}:</strong>{' '}
                      <Badge 
                        bg={selectedAnswers[index] === question.correctAnswer ? 'success' : 'danger'}
                        className="ms-2"
                      >
                        {selectedAnswers[index] === question.correctAnswer ? 'Correct' : 'Wrong'}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button variant="outline-primary" onClick={handleRestart}>
                  Try Again
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  )
}

// Main Quiz Component with Context Provider
function Quiz() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  )
}

export default Quiz
