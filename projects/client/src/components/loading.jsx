import { Row, Image } from 'react-bootstrap'
// import Image  from 'react-bootstrap/Image'

import jstay from "../assets/jstay.png"
export default function Loading() {
    return (
        <Row width={"50vw"} height="50vh" >
            <Image src={jstay} w="80px" h={"80px"}></Image>
        </Row>
    )
}