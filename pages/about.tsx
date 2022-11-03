import Form from 'modules/UI/forms/Form'
import { useState } from 'react'
const About = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Form>
        <p>123</p>
      </Form>
    </>
  )
}

export default About
