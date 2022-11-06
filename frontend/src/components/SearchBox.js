import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Form, Button,Row, Col } from 'react-bootstrap'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className="searchbox">
        <Row>
            <Col md={8}>
            <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
            </Col>
            <Col md={4}>
            <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
            </Col>
        </Row>
     
      
    </Form>
  )
}

export default SearchBox
