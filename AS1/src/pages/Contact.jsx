import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

function Contact() {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (!form.checkValidity()) {
      event.stopPropagation()
    } else {
      alert('Form submitted! We will get back to you soon.')
    }
    setValidated(true)
  }

  return (
    <div className="page">
      <div className="d-flex flex-column gap-2 mb-4">
        <h2 className="page-title">Contact</h2>
        <p className="lead mb-0">Send us your feedback using the form below.</p>
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="shadow-sm p-4 bg-white rounded-4">
        <Row className="mb-3" xs={1} md={3}>
          <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="validationFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control required type="text" placeholder="Mark" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="validationLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control required type="text" placeholder="Otto" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text" placeholder="@username" />
            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3" xs={1} md={3}>
          <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="validationCity">
            <Form.Label>City</Form.Label>
            <Form.Control required type="text" placeholder="City" />
            <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" className="mb-3 mb-md-0" controlId="validationState">
            <Form.Label>State</Form.Label>
            <Form.Control required type="text" placeholder="State" />
            <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control required type="text" placeholder="Zip" />
            <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="validationTerms">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  )
}

export default Contact
