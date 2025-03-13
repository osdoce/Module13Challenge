import img_avatar from './img_avatar.png';
import Candidate from '../interfaces/Candidate.interface'
import { useState, useEffect } from 'react';
//import { searchGithub } from '../api/API';
import { searchGithubUser, searchGithub } from '../api/API';
//const usuario: Candidate[] = await searchGithub();


const CandidateSearch = () => {
  const [arrCandidate, setArrCandidate] = useState<string[]>([]);
  const [candidato, setCandidato] = useState({} as Candidate);
  const [arrCandidatosElegidos, setCandidatosElegidos] = useState<Candidate[]>([]);
  
  useEffect(() => {
    localStorage.setItem('selectedCandidates', JSON.stringify(arrCandidatosElegidos));
  }, [arrCandidatosElegidos]);

  useEffect((): void => {
    const getCandidates = async () => {
      console.log("Entre a obtenerCandidatos");
      let ticketResponseJSON = await searchGithub();
      //console.log(ticketResponseJSON);
      //let arreglo: string [] = [];
      ticketResponseJSON.forEach((salida: any) => (
        setArrCandidate((arrCandidate) => [...arrCandidate, salida.login])
      ));
    
      const datosCandidato = await searchGithubUser(ticketResponseJSON[0].login);
      //console.log(datosCandidato);
      const newCandidate: Candidate = {
        login: ticketResponseJSON[0].login,
        avatar: datosCandidato.avatar_url,
        username: datosCandidato.node_id,
        location: datosCandidato.location,
        email: datosCandidato.email,
        company: datosCandidato.company,
        bio: datosCandidato.bio
      }
      setCandidato(newCandidate);
    }
    getCandidates();
  }, []);

  async function nextUser() {
    //console.log(arregloCandidatos);
    let filteredCandidates = arrCandidate.filter(candidate => candidate != candidato.login)
    if (filteredCandidates.length > 0) {
      setArrCandidate(filteredCandidates);
      try {
        const candidateData = await searchGithubUser(filteredCandidates[0]);
        if (candidateData) {
          setCandidato({
            login: candidateData.login,
            avatar: candidateData.avatar_url,
            username: candidateData.node_id,
            location: candidateData.location,
            email: candidateData.email,
            company: candidateData.company,
            bio: candidateData.bio
          });
        }
        
      } catch (err) {
        console.log("entre al error");
        console.log(err);
        nextUser();
      }
    } else {
      setCandidato({
        login: "No more candidates",
        avatar: img_avatar,
        username: "",
        location: "",
        email: "",
        company: "",
        bio: ""
      })
    };
  }

  async function nextUserandSave() {
    try{
    const candidateData = await searchGithubUser(candidato.login);
    let newCandidate = { login: candidateData.login, avatar: candidateData.avatar_url, username: candidateData.node_id, location: candidateData.location, email: candidateData.email, company: candidateData.company, bio: candidateData.bio };
    setCandidatosElegidos([...arrCandidatosElegidos, newCandidate]);
    let salida = arrCandidatosElegidos;
      console.log(salida);
      nextUser();
    } catch (err) {
      nextUser();
    }
  }

  return (
    <>
      <h1>Candidate Search</h1>
      <div className="card" style={{
        width: "320px", padding: "20px", borderRadius: "25px", border: "2px solid #ffffff"
      }} >
        <img src={candidato.avatar ? candidato.avatar : img_avatar} alt="Avatar" style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "50%" }} />
        <div className="container">
          <h4><b>{candidato.login} {candidato.username ?  `id: ${candidato.username}` : "" }</b></h4>
          <p>Location: {candidato.location ? candidato.location : " not set by the github user"} </p>
          <p>Email:{candidato.email ? candidato.email : " not set by the github user"}</p>
          <p>Company:{candidato.company ? candidato.company: " not set by the github user"}</p>
          <p>Bio:{candidato.bio ? candidato.bio : " not set by the github user"}</p>

        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" style={{ backgroundColor: "red", color: "white", padding: "10px 50px" }} onClick={nextUser}>- </button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button type="button" style={{ backgroundColor: "green", color: "white", padding: "10px 50px" }} onClick={nextUserandSave}>+ </button>
        </div>
      </div>
    </>
  )
}

export default CandidateSearch;
