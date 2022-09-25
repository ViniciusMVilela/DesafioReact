import {Container,Table} from 'reactstrap';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react"
import axios from "axios"
import {api} from "../../config"

export const PromocaosEmpresa =() =>{

const params = useParams();

const[data, setData] = useState([])
//setId
const[id] = useState(params.id)

useEffect(()=>{
        const getPromocaos = async()=>{
            await axios.get(api+"/empresa/"+id+"/promocaos")
            .then((response)=>{
                console.log(response.data.promocaos)
                setData(response.data.promocaos)

            })
            .catch(()=>{
                console.log("Erro sem conexão com a API")
            })
        }
        getPromocaos()

},[id])

    return(
        <div>
           <Container>
               <div className="d-flex">
                        <div className="m-auto p-2">
                        <h1>Promoções da Empresa</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-empresas" className="m-auto btn
                         btn-outline-info btn-sm">Empresas</Link> 
                         </div>
               </div>
               <Table striped>
                    <thead>
                        <tr>
                            <th>Promoção Id</th>
                            <th>Empresa Id</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Validade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(promocaos =>(
                                <tr key={promocaos.id}> 
                                <th scope="row">{promocaos.id}   </th>
                                <td> {promocaos.EmpresaId} </td>
                                <td>{promocaos.nome} </td>
                                <td>{promocaos.descricao}</td>
                                <td>{promocaos.validade}</td>
                                </tr>
                               ))}                              
                    </tbody>
                </Table>
           </Container>
        </div>
    )
}