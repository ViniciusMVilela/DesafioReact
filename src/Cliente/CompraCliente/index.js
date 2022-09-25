import {Container,Table} from 'reactstrap';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react"
import axios from "axios"
import {api} from "../../config"

export const CompraCliente =() =>{

const params = useParams();

const[data, setData] = useState([])
//setId
const[id] = useState(params.id)

useEffect(()=>{
        const getCompras = async()=>{
            await axios.get(api+"/cartao/"+id+"/compras")
            .then((response)=>{
                console.log(response.data.compras)
                setData(response.data.compras)

            })
            .catch(()=>{
                console.log("Erro sem conexão com a API")
            })
        }
        getCompras()

},[id])

    return(
        <div>
           <Container>
               <div className="d-flex">
                        <div className="m-auto p-2">
                        <h1>Compras do Cliente</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-clientes" className="m-auto btn
                         btn-outline-info btn-sm">Clientes</Link> 
                         </div>
               </div>
               <Table striped>
                    <thead>
                        <tr>
                            <th>Compra Id</th>
                            <th>Cartão Id</th>
                            <th>Data do Compra</th>
                            <th>quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compras =>(
                                <tr key={compras.id}> 
                                <th scope="row">{compras.id}   </th>
                                <td>  {compras.CartaoId} </td>
                                <td>{compras.data} </td>
                                <td>{compras.quantidade}</td>
                                <td>{compras.valor}</td>
                               
                                </tr>
                               ))}                              
                    </tbody>
                </Table>
           </Container>
        </div>
    )
}