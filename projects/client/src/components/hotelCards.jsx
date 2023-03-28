import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ItemCard(props) {
   
    return (

        <Card>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <Button variant="primary">{props.buttonText}</Button>
            </Card.Body>
        </Card>
    );
}

function App() {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1015/300/200"
                            title={"Hotel Sariwangi"}
                            description="Bandung, Jawa Barat"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1016/300/200"
                            title="Hotel Kartika"
                            description="Klaten, Jawa Tengah"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1018/300/200"
                            title="Hotel Asri"
                            description="Denpasar, Bali"
                            buttonText="See Room Detail"
                        />
                    </div>
                </div>

            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1015/300/200"
                            title={"Hotel Sariwangi"}
                            description="Bandung, Jawa Barat"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1016/300/200"
                            title="Hotel Kartika"
                            description="Klaten, Jawa Tengah"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1018/300/200"
                            title="Hotel Asri"
                            description="Denpasar, Bali"
                            buttonText="See Room Detail"
                        />
                    </div>
                </div>

            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1015/300/200"
                            title={"Hotel Sariwangi"}
                            description="Bandung, Jawa Barat"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1016/300/200"
                            title="Hotel Kartika"
                            description="Klaten, Jawa Tengah"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1018/300/200"
                            title="Hotel Asri"
                            description="Denpasar, Bali"
                            buttonText="See Room Detail"
                        />
                    </div>
                </div>

            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1015/300/200"
                            title={"Hotel Sariwangi"}
                            description="Bandung, Jawa Barat"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1016/300/200"
                            title="Hotel Kartika"
                            description="Klaten, Jawa Tengah"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1018/300/200"
                            title="Hotel Asri"
                            description="Denpasar, Bali"
                            buttonText="See Room Detail"
                        />
                    </div>
                </div>

            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1015/300/200"
                            title={"Hotel Sariwangi"}
                            description="Bandung, Jawa Barat"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1016/300/200"
                            title="Hotel Kartika"
                            description="Klaten, Jawa Tengah"
                            buttonText="See Room Detail"
                        />
                    </div>
                    <div className="col-md-4">
                        <ItemCard
                            image="https://picsum.photos/id/1018/300/200"
                            title="Hotel Asri"
                            description="Denpasar, Bali"
                            buttonText="See Room Detail"
                        />
                    </div>
                </div>

            </div>
        </>
    );
}


export default App;
