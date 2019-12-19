import React, { Component } from 'react';
class AddPlays extends Component{
    constructor(props){
        super(props);
        this.state={
            name: this.props.name,
            dificulty: this.props.dificulty,
            game:this.props.game,
            date: this.props.date,
            PlayerId:this.props.id
        }
      }
    change=(event)=> {
        const {name,value} = event.target;
        this.setState({
            [name]:value,
            id:this.props.id
        });
    }
    add=()=>{
        let url="https://localhost:44388/api/Plays/"
        if(this.props.id===undefined){
            const params={
                method:'POST',
                body:JSON.stringify(this.state),
                headers:{ "Content-type": "application/json; charset=UTF-8"}
            }
            console.log(this.state);
            fetch(url, params)
            .then(response => response.json())
            .then(json=>{
                console.log(json);
                this.setState({
                    name: "",
                    dificulty: "",
                    game:"",
                    date: "",
                    PlayerId:""
                })
                this.componentDidMount()
            })
            .catch(error => console.log(error));
        }else{
            const params={
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:{ "Content-type": "application/json; charset=UTF-8"}
            }
            fetch(url+this.props.id, params)
            .then(response => response.json)
            .then(json=>{
                this.setState({
                    name: "",
                    dificulty: "",
                    game:"",
                    date: "",
                    PlayerId:""
                }) 
            })
            .catch(error => console.log(error));
        }
    }
    render(){
        return(
            <>
                <div className="container">
                    <div  className="form-col">
                        <div>
                            <label className="form-check-label">Name</label>
                            <input name="name" className="form-control" value={this.state.name} onChange={this.change}></input>
                        </div>
                        
                        <div>
                            <label className="form-check-label">Dificulty</label>
                            <input name="dificulty" className="form-control" value={this.state.dificulty} onChange={this.change}></input>
                        </div>
                        
                        <div>
                            <label className="form-check-label">Game</label>
                            <input name="game" className="form-control" value={this.state.game} onChange={this.change}></input>
                        </div>
                        
                        <div>
                            <label className="form-check-label">Date</label>
                            <input name="date" className="form-control" value={this.state.date} onChange={this.change}></input>
                        </div>
                        
                    </div>
                    <button className="btn btn-primary" onClick={this.add}>Enviar</button>
                </div>
                <p>____________________________</p>

            </>
        )
    }
}
export default AddPlays;