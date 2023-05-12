import { axiosInstance } from '../config/config.js';
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import UserCard from './userCard.jsx';


export default function ListUser () {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        await axiosInstance.get('/auth').then((res) => {
          const datas = res.data.result;
    
          setUsers([...datas]);
          console.log(datas);
        });
      };
    
      useEffect(() => {
        fetchUsers();
      }, []);
    
      useEffect(() => {
        console.log(users);
      }, [users]);

      return (
        <>
        
        <Container>

            <Row>

            {users.map((val,idx) => {
                return <UserCard key={idx} data={{...val}}/>
                
            })}
            </Row>

        

        
        </Container>
        
        
        
        </>
      )
}