import { useMemo, useState } from 'react'
import { Card, Form, Button, Stack, Badge } from 'react-bootstrap'
import { quizQuestions } from '../data/quizData'

function Quiz() {
  const [selected, setSelected] = useState({})
  const [score, setScore] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (questionId, option) => {
    setSelected((prev) => ({ ...prev, [questionId]: option }))
  }

  const totalQuestions = quizQuestions.length

  const resultMessage = useMemo(() => {
    if (score === null) return ''
    if (score === totalQuestions) return 'Perfect score!'
    if (score >= Math.ceil(totalQuestions * 0.75)) return 'Great job, almost perfect.'
    if (score >= Math.ceil(totalQuestions * 0.5)) return 'Nice work, keep practicing.'
    return 'Give it another try and review the concepts.'
  }, [score, totalQuestions])

  const handleSubmit = (event) => {
    event.preventDefault()
    const correct = quizQuestions.reduce((acc, question) => {
      const isCorrect = selected[question.id] === question.answer
      return acc + (isCorrect ? 1 : 0)
    }, 0)
    setScore(correct)
    setSubmitted(true)
  }

  return (
    <div className="page">
      <div className="d-flex flex-column gap-2 mb-4">
        <h2 className="page-title">Quiz</h2>
        <p className="lead mb-0">Test yourself on React Router and UI basics.</p>
      </div>

      <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        {quizQuestions.map((question) => (
          <Card key={question.id} className="shadow-sm">
            <Card.Body>
              <Stack direction="horizontal" gap={2} className="mb-2">
                <Badge bg="secondary">Q{question.id}</Badge>
                <div className="fw-semibold">{question.question}</div>
              </Stack>
              <Form.Group className="d-flex flex-column gap-2">
                {question.options.map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    name={`question-${question.id}`}
                    id={`q${question.id}-${option}`}
                    label={option}
                    checked={selected[question.id] === option}
                    onChange={() => handleSelect(question.id, option)}
                  />
                ))}
              </Form.Group>
            </Card.Body>
          </Card>
        ))}

        <div className="d-flex align-items-center gap-3">
          <Button type="submit" variant="primary">Submit answers</Button>
          {submitted && (
            <div className="fw-semibold">
              Score: {score}/{totalQuestions}{' '}
              <span className="text-muted">{resultMessage}</span>
            </div>
          )}
        </div>
      </Form>
    </div>
  )
}

export default Quiz
