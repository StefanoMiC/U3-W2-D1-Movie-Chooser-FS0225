import { FormSelect } from "react-bootstrap";

const MovieSelect = ({ movieTitle, changeMovieTitle }) => (
  // questo componente è in grado di modificare lo stato di App nel valore di movieTitle con uno dei valori derivanti da queste option selezionate
  <FormSelect value={movieTitle} onChange={e => changeMovieTitle(e.target.value)}>
    <option>Iron Man</option>
    <option>Dr. Strange</option>
    <option>Wonder Woman</option>
    <option>Black Panther</option>
    <option>Venom</option>
    <option>DeadPool</option>
    <option>Batman</option>
  </FormSelect>
);
export default MovieSelect;
