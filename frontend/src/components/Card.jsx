import React, {useState} from 'react'
import styled from 'styled-components'

const Card = (trackName, artistName) => {
    return (
        <Container>
            <Header>{trackName} by {artistName}</Header>
            <Image src="https://user-images.githubusercontent.com/88551260/205755117-efe9b83b-33a4-445e-988c-b074076cc993.png"/>
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;
    height: 50%;
    width: 30%;
    background: #fdfdfd;
    border-radius: 10px;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Header = styled.div`
    margin: 20px;
    height: 10%;
    width: 80%;
    border-bottom: 2px dashed black;
`

const Image = styled.img`
    width: 50%;
    height: 50%;
    margin: auto;
`