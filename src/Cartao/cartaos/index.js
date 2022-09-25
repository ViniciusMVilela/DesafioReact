import axios from "axios"
import { useEffect, useState } from "react"
import {api} from "../../config"
import { Alert, Container, Table } from "reactstrap" 
import { Link } from "react-router-dom"

export const Cartaos =() =>{
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

        const getCartaos = async () => {
        await axios.get(api+"/cartaos")
            .then((response) =>{
                console.log(response.data.cart)
                setData(response.data.cart)
            })
            .catch(() => {
                setStatus({
                    type:'error',
                    message: 'Erro: sem conexão com a API!'
                })
                console.log("Erro: sem conexão com a API!")
            })
    };

    useEffect (()=>{
        getCartaos();
    },[])

    const delCartao = async (idCartao) => {
        console.log(idCartao)

        const headers ={
            'Content-type' : 'application/json'
        }

        await axios.delete(api+"/excluir-cartao/"+idCartao,{headers})
        .then((response)=>{
        console.log(response.data.type)
        console.log(response.data.message)
       getCartaos();

    })
    .catch(()=>{
        setStatus({
            type: 'error',
            message: "Erro: sem conexão com a API"
        })
    })
    }

    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger"> {status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Cartões</h1>
                    </div>
                    <div className="p-2 m-auto"> 
                    <Link to="/novo-cartao" className="btn btn-outline-info btn-sm">
                    Inserir</Link>

                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Data Cartão</th>
                            <th>Validade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cart =>(
                                <tr key={cart.id}> 
                                <th scope="row">{cart.id}   </th>
                                <td> {cart.dataCartao} </td>
                                <td>{cart.validade} </td>
                               <td><span className="btn btn-outline-danger btn-sm"
                                 onClick={() => delCartao(cart.id)}>Excluir</span></td>
                                </tr>
                               ))}                              
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

