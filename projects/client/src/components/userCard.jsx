import { Col, Button } from "react-bootstrap"
import { useState } from "react";
import { axiosInstance } from '../config/config.js';



export default function UserCard(props) {

    const [users, setUsers] = useState({ ...props.data });

    async function delUsers() {

        const res = await axiosInstance
        .delete('/auth/' + users.id)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {});
    }

    return ( 

        <Col>
         <div>
            {users.name} 
            <br />
            {users.email}
         </div>      
         <Button onClick={() =>{delUsers()} }>
            Delete
         </Button>
        </Col>
    )
}