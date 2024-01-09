import styled from "styled-components";

export const Button = styled.button `
    width: 342px;
    height: 74px;
    margin-top: 130px;

    width: 342px;
    height: 74px;

    background: ${props => {
        return props.isBack ? ' transparent ' : 'rgba(0, 0, 0, 0.8)';
    }};

    border-radius: 14px;
    border: ${ props => { 
        return props.isBack ? '1px solid #ffffff' : 'none';
    }};

    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 28px;
    color: #ffffff;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    &:hover{
        opacity: 0.8;
    }

    &:active{
        opacity: 0.5;
    }
    

    img {
        transform: ${props => props.isBack && 'rotateY(180deg)' };
    }
/* ${(props) => props.isBack && `

    background: transparent;
    border: 1px solid #ffffff;

    img {
        transform: rotateY(180deg);
    }

`}; */

`;