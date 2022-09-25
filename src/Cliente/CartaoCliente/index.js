import {Container,Table} from 'reactstrap';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react"
import axios from "axios"
import {api} from "../../config"

export const CartaoCliente =() =>{

const params = useParams();

const[data, setData] = useState([])
//setId
const[id] = useState(params.id)

useEffect(()=>{
        const getPedidos = async()=>{
            await axios.get(api+"/cliente/"+id+"/cartaos")
            .then((response)=>{
                console.log(response.data.cartaos)
                setData(response.data.cartaos)

            })
            .catch(()=>{
                console.log("Erro sem conexão com a API")
            })
        }
        getPedidos()

},[id])

    return(
        <div>
           <Container>
               <div className="d-flex">
                        <div className="m-auto p-2">
                        <h1>Cartões do Cliente</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-clientes" className="m-auto btn
                         btn-outline-info btn-sm">Clientes</Link> 
                         </div>
               </div>
               <Table striped>
                    <thead>
                        <tr>
                            <th>CartãoId</th>
                            <th>ClienteId</th>
                            <th>Data do Cartão</th>
                            <th>Validade do Cartão</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cartaos =>(
                                <tr key={cartaos.id}> 
                                <th scope="row">{cartaos.id}   </th>
                                <td>  {cartaos.ClienteId} </td>
                                <td>{cartaos.dataCartao} </td>
                                <td>{cartaos.validade}</td>
                                <td><Link to={"/cartao-compras/"+cartaos.id}
                                 className="btn btn-outline-warning btn-sm">Consultar Compras</Link>
                                <Link to={"/cliente/:id/cartaos"} className="btn btn-outline-warning btn-sm">Editar Cartão</Link>
                               </td>
                                </tr>
                               ))}                              
                    </tbody>
                </Table>
           </Container>
        </div>
    )
}