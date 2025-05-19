import { Component } from "react";
import "./App.css";
import MovieSelect from "./components/MovieSelect";
import MovieCard from "./components/MovieCard";
import { Button, Col, Container, Row } from "react-bootstrap";

class App extends Component {
  // stato condiviso tra i due componenti MovieSelect e MovieCard
  state = {
    movieTitle: "Venom",
    hasMovieCard: true
  };

  // questo metodo è disponibile all'interno di MovieSelect passando il riferimento attraverso le sue prop
  changeMovieTitle = newTitle => {
    this.setState({ movieTitle: newTitle });
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center mb-4 mt-5">
          <Col xs={12} md={5}>
            {/* questo componente legge e scrive nello stato di App */}
            <MovieSelect movieTitle={this.state.movieTitle} changeMovieTitle={this.changeMovieTitle} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={5}>
            {/* il componente MovieCard legge dallo stato di App e reagisce ai suoi cambiamenti */}
            {this.state.hasMovieCard && <MovieCard movieTitle={this.state.movieTitle} />}
          </Col>
        </Row>
        {/* questo bottone serve a scatenare uno smontaggio del componente (per verificare il funzionamento di componentWillUnmount dentro a MovieCard) */}
        <Button className="d-block mx-auto" onClick={() => this.setState({ hasMovieCard: !this.state.hasMovieCard })}>
          Toggle card
        </Button>
      </Container>
    );
  }
}

export default App;
