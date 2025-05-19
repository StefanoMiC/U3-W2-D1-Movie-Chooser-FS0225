import { Component } from "react";
import { Button, Card } from "react-bootstrap";

class MovieCard extends Component {
  state = {
    movie: null
  };

  fetchMovie = async () => {
    console.log("fetch()");

    try {
      // la prop movieTitle mi corrisponde al dato aggiornato dello stato movieTitle in App.jsx
      // quando il metodo fetchMovie verrà ri-chiamato sarà quello il momento in cui ri-leggeremo il valore di this.props.movieTitle aggiornato al momento attuale
      const resp = await fetch("http://www.omdbapi.com/?apikey=43a932c8&s=" + this.props.movieTitle);

      if (resp.ok) {
        const omdbData = await resp.json();

        this.setState({ movie: omdbData.Search[0] });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    // intercetta qualsiasi aggiornamento del componente (fase di UPDATE)
    // quindi verrà avviato ad ogni cambio di state o props

    // prevProps e prevState sono i due parametri propri di componentDidUpdate
    // sono ciò che lo differenzia da un comune render()

    // nel nostro caso vogliamo che this.fetchMovie() venga invocato quando viene scelto un nuovo titolo in App.jsx
    // quindi quando il nostro componente MovieCard riceve nuove props corrispondenti a this.state.movieTitle in App.jsx
    console.log("componentDidUpdate()");
    console.log("prevProps", prevProps);
    console.log("props", this.props);

    // quello che non vogliamo succeda è di invocare this.fetchMovie() più di una volta

    // creare una condizione di guardia è OBBLIGATORIO quando si usa componentDidUpdate
    // la condizione è necessaria ad evitare loop infiniti di aggiornamento causati dal setState che fa aggiornare il componente ugualmente.
    if (prevProps.movieTitle !== this.props.movieTitle) {
      console.log("props diverse: fetch");
      this.fetchMovie();
    } else {
      // saremo qui anche per via di un setState avviato dentro this.fetchMovies() che scatena un nuovo update,
      // ma rispetto a prima le props non saranno diverse, questa volta, e quindi abbiamo lo STOP.
      console.log("props identiche: STOP!");
    }
  }

  //   questo metodo ci permette di avviare la funzione fetchMovie la prima volta al caricamento iniziale del componente (fase di MOUNT)
  componentDidMount() {
    console.log("componentDidMount()");
    this.fetchMovie();
  }

  componentWillUnmount() {
    // come il canto del cigno questo metodo si attiva poco prima di un -eventuale- smontaggio del componente
    // tipicamente serve per spegnere connessioni particolari a server o timer che altrimenti rimarrebbero attivi all'infinito
    console.log("bye bye");
  }

  render() {
    console.log("render()");
    // this.fetchMovie() // non posso chiamare fetchMovie dentro render altrimenti ==> LOOP INFINITO
    return (
      <>
        {this.state.movie ? (
          <Card>
            <Card.Img variant="top" src={this.state.movie.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movie.Title}</Card.Title>
              <Card.Text>{this.state.movie.Year}</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }
}

export default MovieCard;
