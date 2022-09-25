import axios from "axios"
import { useEffect, useState } from "react"
import {api} from "../../config"
import { Alert, Container, Table } from "reactstrap" 
import { Link } from "react-router-dom"



export const Promocaos = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

        const getPromocaos = async () => {
        await axios.get(api+"/promocoes")
            .then((response) =>{
                console.log(response.data.promo)
                setData(response.data.promo)
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
        getPromocaos();
    },[])

    const delPromocao = async (idPromocao) => {
        console.log(idPromocao)

        const headers ={
            'Content-type' : 'application/json'
        }

        await axios.delete(api+"/excluir-promocao/"+idPromocao,{headers})
        .then((response)=>{
        console.log(response.data.type)
        console.log(response.data.message)
       getPromocaos();

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
                        <h1>Lista de Promoções</h1>
                    </div>
                    <div className="p-2 m-auto"> 
                    <Link to="/nova-promocao" className="btn btn-outline-info btn-sm">
                    Inserir</Link>

                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>EmpresaId</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(promo =>(
                                <tr key={promo.id}> 
                                <th scope="row">{promo.id}   </th>
                                <td> {promo.EmpresaId} </td>
                                <td> {promo.nome} </td>
                                <td>{promo.descricao} </td>
                                    <td>
                                 <span className="btn btn-outline-danger btn-sm"
                                 onClick={() => delPromocao(promo.id)}>Excluir</span>
                                 </td>
                                </tr>
                               ))}                              
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}