import { Col } from "react-bootstrap"
import { useState } from "react";

export default function UserCard(props) {

    const [users, setUsers] = useState({ ...props.data });

    return ( 

        <Col>
         <div>
            {users.name} 
            <br />
            {users.email}
         </div>      
        </Col>
    )
}