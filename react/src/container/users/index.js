import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import Avatar from '../../assets/avatar.svg'
import Arrow from '../../assets/arrow.svg'
import Trash from '../../assets/trash.svg'

import H1 from '../../components/title';
import ContainerItens from '../../components/containersItens';
import Button from '../../components/button';
import {Container, Image, User} from "./styles";


function Users() {
  // const users = [];

  const [users, setUsers] = useState([]) // a primeira posição é o nome da const e a segunda é o nome da função que ajudará atualizar essa const, sempre tem que ser setNomeDaConst

  const navigate = useNavigate();

  
  
  useEffect(() => {
    async function fetchUsers() {
      const {data: newUsers } = await axios.get("http://localhost:3001/users")
      
      setUsers(newUsers)
    }
    fetchUsers()
  }, [])
  
  async function deleteUser(userId) { // para deletar usuarios, todos vão entrar no setUsers, menos p uerID
    await axios.delete(`http://localhost:3001/users/${userId}`)
    
    const newUsers = users.filter( user => user.id !== userId)
    setUsers(newUsers)
  }
  
  
  function goBackPage() {
    navigate('/');
  }
  
  return (
    <Container> 
  <Image alt='logo-imagem' src={Avatar} />
    <ContainerItens isBlur={true}>
        <H1>Usuários</H1>

        <ul>
          { users.map((user) => (
            <User key={user.id}>
              <p>{user.name}</p> - <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} alt="lata-de-lixo"/>
              </button>
            </User>
          ))
          }  
        </ul>

        <Button isBack={true} onClick={goBackPage}><img alt='seta' src={Arrow}></img>Voltar</Button>
  
    </ContainerItens>

</Container>
);
}

export default Users
