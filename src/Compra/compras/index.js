import axios from "axios"
import { useEffect, useState } from "react"
import {api} from "../../config"
import { Alert, Container, Table } from "reactstrap" 
import { Link } from "react-router-dom"



export const Compras = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

        const getCompras = async () => {
        await axios.get(api+"/compras")
            .then((response) =>{
                console.log(response.data.compra)
                setData(response.data.compra)
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
        getCompras();
    },[])

    
    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger"> {status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Compras</h1>
                    </div>
                    <div className="p-2 m-auto"> 
                    <Link to="/nova-compra" className="btn btn-outline-info btn-sm">
                    Inserir</Link>

                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Cartão Id</th>
                            <th>data</th>
                            <th>Quantidade</th>
                            <th> Valor </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compra =>(
                                <tr key={compra.id}> 
                                <th scope="row">{compra.id}</th>
                                <td> {compra.CartaoId} </td>
                                <td> {compra.data} </td>
                                <td>{compra.quantidade} </td>
                                <td>{compra.valor}</td>
                                </tr>
                               ))}                              
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}