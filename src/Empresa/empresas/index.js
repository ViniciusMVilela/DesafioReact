
import axios from "axios"
import { useEffect, useState } from "react"
import {api} from "../../config"
import { Alert, Container, Table } from "reactstrap" 
import { Link } from "react-router-dom"



export const Empresas = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

        const getEmpresas = async () => {
        await axios.get(api+"/empresas")
            .then((response) =>{
                console.log(response.data.empr)
                setData(response.data.empr)
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
        getEmpresas();
    },[])

    const delEmpresa = async (idEmpresa) => {
        console.log(idEmpresa)

        const headers ={
            'Content-type' : 'application/json'
        }

        await axios.delete(api+"/excluir-empresa/"+idEmpresa,{headers})
        .then((response)=>{
        console.log(response.data.type)
        console.log(response.data.message)
       getEmpresas();

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
                        <h1>Lista de Empresas</h1>
                    </div>
                    <div className="p-2 m-auto"> 
                    <Link to="/nova-empresa" className="btn btn-outline-info btn-sm">
                    Inserir</Link>

                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data de Adesão</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(empr =>(
                                <tr key={empr.id}> 
                                <th scope="row">{empr.id}   </th>
                                <td> {empr.nome} </td>
                                <td>{empr.dataAdesao} </td>
                                <td><Link to={"/empresa/promocao/"+empr.id}
                                 className="btn btn-outline-info btn-sm"> Promoções da Empresa </Link> 
                                 <span className="btn btn-outline-danger btn-sm"
                                 onClick={() => delEmpresa(empr.id)}>Excluir Empresa</span></td>
                                </tr>
                               ))}                              
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}