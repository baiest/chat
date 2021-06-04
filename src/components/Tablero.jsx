import React from 'react';
import '../assets/css/Tablero.css'
class Tablero extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            tablero: null,
            mi_mensaje: '',
            mensajes: [
                {
                    enviado: true,
                    texto: "Hola"
                },
                {
                    enviado: true,
                    texto: "Como estas?"
                },
                {
                    enviado: false,
                    texto: "kdwqna.nda"
                },
                {
                    enviado: true,
                    texto: "lorem\n insup dkaiiwqjo aksdnkl"
                },
                {
                    enviado: true,
                    texto: "Hola"
                },
                {
                    enviado: true,
                    texto: "Como estas?"
                },
                {
                    enviado: false,
                    texto: "kdwqna.nda"
                },
                {
                    enviado: true,
                    texto: "lorem\n insup dkaiiwqjo aksdnkl"
                },
                {
                    enviado: true,
                    texto: "Hola"
                },
                {
                    enviado: true,
                    texto: "Como estas?"
                },
                {
                    enviado: false,
                    texto: "kdwqna.nda"
                },
                {
                    enviado: true,
                    texto: "lorem\n insup dkaiiwqjo aksdnkl"
                },
                
            ]
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.enviarMensaje = this.enviarMensaje.bind(this);
        this.validarEnter = this.validarEnter.bind(this);
    }

    componentDidMount(){
        this.setState({tablero: document.querySelector('.tablero__mensajes')})
    }

    componentDidUpdate(){
        this.state.tablero.scrollTop = this.state.tablero.scrollHeight;
    }
    handleChange(e){
        this.setState({mi_mensaje: e.target.value})
    }
    
    validarEnter(e){
        if (e.shiftKey){
            if(e.key === 'Enter'){
                this.setState({mi_mensaje: `${this.state.mi_mensaje}\n`})
            }
        }else if(e.key === 'Enter'){
            e.preventDefault()
            this.enviarMensaje()
        }
    }
    enviarMensaje(){  
        if (this.state.mi_mensaje !== ''){
            console.log(this.state.tablero.scrollTop)
            this.setState({
                mensajes: [ 
                    ...this.state.mensajes, 
                    {
                        enviado: true,
                        texto: this.state.mi_mensaje
                    }
                ]})
        }
        this.setState({mi_mensaje: ''})
    }
    render(){
    return (
        <section className="tablero">
            <ul className="tablero__mensajes">
                { this.state.mensajes.map( (mensaje, key) => {
                return <li key={key} className={`mensaje ${mensaje.enviado? 'mensaje__enviado': 'mensaje__recibido'}`}><p>{mensaje.texto}</p></li>
                })}
            </ul>
            <form className="tablero__input">
                <textarea rows="1" onKeyDown={this.validarEnter} onChange={this.handleChange} value={this.state.mi_mensaje}/>
                <a href='/' className="btn btn-green" onClick={this.enviarMensaje}>Enviar</a>
            </form>
        </section>
        );
    }
}

export default Tablero