import React from 'react'
import { Placeholder } from 'react-bootstrap'

const Home = () => {
  return (
    <>
      <Placeholder xs={6} />
      <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
    </>
  )
}

export default Home