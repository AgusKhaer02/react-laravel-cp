import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Jumbotron from "./Components/Jumbotron";
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

export default function Home(){
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        axios.get('https://saurav.tech/NewsAPI/everything/bbc-news.json')
            .then(res => {
                setNewsData(res.data.articles)
            })
            .catch((err) => console.error(err));

    }, []);

    return (
        <>
            {/* <CounterButton/> */}
            <Jumbotron companyName="Lauwba Academy" welcome="Selamat Datang di" paragraph="IT Training/Development" />

            <div className="container py-5">
                <h3 className="text-center">Berita Terkini</h3>

                <div className="row">
                    {
                        newsData.length == 0 ? (
                            <p>Sedang membuat, Harap Tunggu</p>
                        ) : newsData.map((value, index) => (
                            <div className="col-md-4">
                                <Card key={index} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={value.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{value.title}</Card.Title>
                                        <Card.Text>
                                            {value.description}
                                        </Card.Text>
                                        <Button href={"/news/" + index}  variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    );
}
