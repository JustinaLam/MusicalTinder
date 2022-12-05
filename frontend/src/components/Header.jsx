import React, {useState} from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'

const Header = () => {
    

    return (
        <HeaderContainer>
            Header
        </HeaderContainer>
    )
}




const HeaderContainer = styled.div`
    position: sticky; 
    top: 0px; 
    box-sizing: border-box;
    background-color: #1DB954;
    display: flex; 
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 10px 5px;
    z-index: 100, 
    top: 0; 
    height: 50px; 
`