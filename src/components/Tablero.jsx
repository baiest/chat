import React from 'react';
import socketIOClient from 'socket.io-client';
import '../assets/css/Tablero.css'
const ENDPOINT = 'http://localhost:4000';
class Tablero extends React.Component{
    constructor(props){
        super(props)
        this.state= {
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
        this.tablero = null;
        this.size_mensajes = this.state.mensajes.length;
        this.socket = socketIOClient(ENDPOINT)
        this.handleChange = this.handleChange.bind(this);
        this.enviarMensaje = this.enviarMensaje.bind(this);
        this.validarEnter = this.validarEnter.bind(this);

        this.socket.on('recibido', data => {
            this.setState({ mensajes: [...this.state.mensajes, {enviado: false, texto: data}]})
        })
    }

    componentDidMount(){
        this.tablero=document.querySelector('.tablero__mensajes');
        this.socket.on('bienvenido', data=> console.log('data', data))
        
    }

    componentDidUpdate(){
        if(this.size_mensajes < this.state.mensajes.length)
        {
            this.size_mensajes = this.state.mensajes.length
            this.tablero.scrollTop = this.tablero.scrollHeight;
        }

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
            this.socket.emit('mensaje', this.state.mi_mensaje)
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