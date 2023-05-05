import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 5%;
  right: 5%;
  z-index: 99;
`

const Loader = () => {
  return (
    <Container>
      <img src="ripple.svg" alt="" />
    </Container>
  )
}

export default Loader