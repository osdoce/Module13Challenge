import Candidate from '../interfaces/Candidate.interface';
import { useState, useEffect } from 'react';

const SavedCandidates = () => {

  const [arrCandidatosElegidos, setCandidatosElegidos] = useState<Candidate[]>([]);
  const [title, setTitle] = useState("Potential Candidates");

  useEffect(() => {
    const arrCandidatosElegidos = JSON.parse(localStorage.getItem('selectedCandidates') || '"');
    if (arrCandidatosElegidos) {
      setCandidatosElegidos(arrCandidatosElegidos);
      console.log(arrCandidatosElegidos[0]);
    } else {

    }
  }, []);

  
  const listItems = arrCandidatosElegidos.map(c =>
    <tr key={c.login}>
      <td>
        <img
          src={c.avatar}
          alt={c.login}
          style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "30%" }}
        />
      </td>
      <td>
        {c.login}
      </td>
      <td>
        {c.location ? c.location : "Not set"}
      </td>
      <td>
        {c.email ? c.email : "Not set"}
      </td>
      <td>
        {c.company ? c.company : "Not set"}
      </td>
      <td>
        {c.bio ? c.bio : "Not set"}
      </td>
      <td style={{ display: "flex", justifyContent: "center" }}>
        <button id={c.login} onClick={() => {
          setTitle("No more Candidates");
          setCandidatosElegidos(
            arrCandidatosElegidos.filter(a => a.login !== c.login)
          );
          const leftCandidates = arrCandidatosElegidos;
          console.log(leftCandidates.length);
          leftCandidates.length > 1 && setTitle("Potential Candidates")
        }} > - </button>
      </td>
    </tr>
  );


  return (
    <>
      
      <table style={{ width: "100%" }}>
        
        <caption><h1> {title} </h1></caption>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Image</th>
            <th >Name</th>
            <th >Location</th>
            <th >Email</th>
            <th >Company</th>
            <th >Bio</th>
            <th >Reject</th>
          </tr>
        </thead>
        <tbody>
            {listItems}
        </tbody>
      </table>
  
    </>
  );
};

export default SavedCandidates;
