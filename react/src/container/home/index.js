import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import People from '../../assets/people.svg'
import Arrow from '../../assets/arrow.svg'

import H1  from '../../components/title';
import ContainerItens from '../../components/containersItens';
import Button from '../../components/button';
import {Container, Image, InputLabel, Input} from "./styles";


function App() {
  // const users = [];

  const [users, setUsers] = useState([]) // a primeira posição é o nome da const e a segunda é o nome da função que ajudará atualizar essa const, sempre tem que ser setNomeDaConst
  const navigate = useNavigate();
  const inputName = useRef() // para pegar os dados adicionados
  const inputAge = useRef()

async function addNewUser() {
  
  const {data: newUsers} = await axios.post("http://localhost:3001/users", {name: inputName.current.value, 
  age:inputAge.current.value});

  setUsers([...users, newUsers]);
  
  navigate('/usuarios');
};

return (
<Container> 
  <Image alt='logo-imagem' src={People} />
    <ContainerItens>
        <H1>Olá!</H1>

        <InputLabel>Nome</InputLabel>
        <Input ref={inputName} placeholder='Nome'></Input>

        <InputLabel>Idade</InputLabel>
        <Input ref={inputAge} placeholder='Idade'></Input>

        <Button onClick={addNewUser}>Cadastrar <img alt='seta' src={Arrow}></img></Button>
        
    </ContainerItens>

</Container>
);
}

export default App
