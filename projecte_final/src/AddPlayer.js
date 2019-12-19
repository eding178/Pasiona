import React, { Component } from 'react';
class AddPlayer extends Component{
    constructor(props){
        super(props);
        this.state={
            name:this.props.name,
            email:this.props.email,
            alias:this.props.alias
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
        let url="https://localhost:44388/api/Players/"
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
                    email: "",
                    alias: ""
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
            console.log(this.state)
            console.log(params)
            console.log(url+this.props.id)
            fetch(url+this.props.id, params)
            .then(response => response.json)
            .then(json=>{
                this.setState({
                    name: "",
                    email: "",
                    alias: ""
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
                            <label className="form-check-label">Alias</label>
                            <input name="alias" className="form-control" value={this.state.alias} onChange={this.change}></input>
                        </div>
                        <div>
                            <label className="form-check-label">Email</label>
                            <input name="email" className="form-control" value={this.state.email}  onChange={this.change}></input>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.add}>Enviar</button>
                </div>
            </>
        )
    }
}
export default AddPlayer;