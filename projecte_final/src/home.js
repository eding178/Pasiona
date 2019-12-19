import React, { Component } from 'react';
import { homedir } from 'os';
import AddPlay from "./AddPlay.js";
import AddPlayer from "./AddPlayer.js";

import { BrowserRouter as Router, Link, Route, Switch,} from 'react-router-dom';


class Obj extends Component{
    delete=()=>{
    this.props.delete("https://localhost:44388/api/Players/"+this.props.idPlayer);
    }
    render(){
        return(
            <Router>
                <div>
                    <div className="container">
                        <p><strong>Id: </strong>{this.props.idPlayer}</p>
                        <p><strong>Name: </strong> {this.props.namePlayer}</p>
                        <p><strong>Alias: </strong>{this.props.aliasPlayer}</p>
                        <p><strong>Email: </strong>{this.props.emailPlayer}</p>
                        <button className="btn btn-danger" onClick={this.delete}>Eliminar</button>
                        <Link className="btn btn-info" to="/EditPlayer">Editar</Link>
                        <Link className="btn btn-info" to="/addPlay">Crear partida</Link>
                        <p>____________________________</p>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/addPlay" >
                        <AddPlay id={this.props.idPlayer}/>
                    </Route>
                    <Route exact path="/EditPlayer" >
                        <AddPlayer id={this.props.idPlayer} name={this.props.namePlayer} alias={this.props.aliasPlayer} email={this.props.emailPlayer}/>
                    </Route>
                </Switch>
            </Router>
        );
    } 
}
class Obj2 extends Component{
    delete=()=>{
      this.props.delete("https://localhost:44388/api/Plays/"+this.props.idPlay);
    }
    render(){
      return(
        <Router>
            <div>
                <div className="container">
                <p><strong>Id: </strong>{this.props.idPlay}</p>
                <p><strong>Name: </strong> {this.props.namePlay}</p>
                <p><strong>Dificulty: </strong>{this.props.dificultyPlay}</p>
                <p><strong>Game: </strong>{this.props.gamePlay}</p>
                <p><strong>Date: </strong>{this.props.datePlay}</p>
                <button className="btn btn-danger" onClick={this.delete}>Eliminar</button>
                <Link className="btn btn-info" to="/EditPlay">Editar</Link>
                <p>____________________________</p>
                </div>
            </div>
            <Switch>
                <Route exact path="/EditPlay" >
                    <AddPlay id={this.props.idPlay} name={this.props.namePlay} dificulty={this.props.dificultyPlay} game={this.props.gamePlay} date={this.props.datePlay}/>
                </Route>
            </Switch>
        </Router>
      );
    } 
}
class Respostes extends Component {
  constructor(props){
    super(props);
    this.state={
        respostesPlayers:[],
        respostesPlays:[]
    };
  }
  componentDidMount(){
    fetch("https://localhost:44388/api/Players/")
    .then(resposta=>resposta.json())
    .then(data=>{
      this.setState({respostesPlayers: data});
      console.log(data);
    });
    fetch("https://localhost:44388/api/Plays/")
    .then(resposta=>resposta.json())
    .then(data=>{
      this.setState({respostesPlays: data});
      console.log(data);
    });
  }
  render(){
    const plays = this.state.respostesPlays.map((fila2,index)=>(
        <Obj2 key={index} idPlay={fila2.id} namePlay={fila2.name} dificultyPlay={fila2.dificulty} gamePlay={fila2.game} datePlay={fila2.date} delete={this.delete}/>
    ));
    const players = this.state.respostesPlayers.map((fila,index)=>(
       <Obj key={index} idPlayer={fila.id} namePlayer={fila.name} emailPlayer={fila.email} aliasPlayer={fila.alias} delete={this.delete}/>
    ));
    return(
      <div className="flex-container">
            <div className="mesMargin">
            <h2>Plays</h2>
            <br/>
                {plays}
            </div>
            <div className="mesMargin">
            <h2>Players</h2>
            <br/>
                {players}
            </div>
      </div>
    )
  }
  delete=(url)=>{
    
      let params = {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      };
      fetch(url, params)
        .then(response => this.componentDidMount())
        .catch(error => console.log(error));
    }
}
function App() {
  return (
    <>
      <Respostes/>
    </>
  );
}
export default Respostes;