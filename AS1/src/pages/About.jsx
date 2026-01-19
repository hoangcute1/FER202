import { Card } from 'react-bootstrap'

function About() {
  return (
    <div className="page">
      <div className="d-flex flex-column gap-2 mb-4">
        <h2 className="page-title">About</h2>
        <p className="lead mb-0">Learn why this mini site exists and how it is structured.</p>
      </div>

      <Card className="shadow-sm">
        <Card.Body className="d-flex flex-column gap-3">
          <p className="mb-0">
            This lab uses React Router to link together a home page, news list, quiz, and contact form. It also
            demonstrates how React Bootstrap components can speed up layout and validation.
          </p>
          <p className="mb-0">
            Browse the navigation to see each route in action, try the quiz to test yourself, and inspect the code to
            understand how routes map to components.
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default About
