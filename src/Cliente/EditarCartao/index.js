import {Container,Alert} from 'reactstrap';
import {Link,useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from 'axios';
import {api} from "../../config";
import{Form,FormGroup,Label,Input,Button} from 'reactstrap'

export const EditarCartao =() =>{

    const params = useParams();
    const[id,setId] = useState (params.id)
    const[dataCartao,setDataCartao] = useState();
    const[ClienteId, setClienteId] = useState();
    const[validade,setValidade] = useState();

    const[status, setStatus] = useState({
        type: '',
        message: ''
    })

    const edtPedido = async e =>{
        e.preventDefault();

        const headers = {
            'Content-type' : 'application/json'
        }
        await axios.put(api+"/editar-cartao/"+id,
        {id, dataCartao,validade, ClienteId}, {headers})
        .then((response)=>{
            setStatus({
                type: 'sucess',
                message: 'Alteração realizada com sucesso'
            })
            console.log(response.data.type)
            console.log(response.data.message)
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível alterar'
            })
        })
    }

    useEffect(()=>{
        const getPedido = async() =>{
            await axios.get(api+"/cartao/"+id)
            .then((response)=>{
                setId(response.data.cart.id)
                setDataCartao(response.data.cart.dataCartao)
                setClienteId(response.data.cart.ClienteId)
                 setValidade(response.data.cart.validade)
                console.log(response.data.cart.id)
                console.log(response.data.cart.dataCartao)
                console.log(response.data.cart.ClienteId)
            })
            .catch(()=>{
                console.log("Erro: sem conexão com a API")
            })
        }
        getPedido()
    },[id])

    return(
        <div>
           <Container>
               <div className="d-flex">
                        <div className="m-auto p-2">
                        <h1>Editar Cartão</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-clientes" className="m-auto btn
                         btn-outline-info btn-sm">Clientes</Link>
                         </div>
               </div>
               <div>
                   <hr className="m-1"/>
                   {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""} 
                   {status.type === 'sucess' ? <Alert color="sucess">{status.message} </Alert> : ""} 
               </div>
               <Form className="p-2" onSubmit={edtPedido}>
  <FormGroup className="p-2">
    <Label > Id do Cartão </Label>
    <Input 
      name="id"
      placeholder="Id do Cartão"
      type="text"
      defaultValue={id}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Data do Pedido </Label>
    <Input
     
      name="dataCartao"
      placeholder="Data do Cartão"
      type="text"
      value={dataCartao} onChange={e => setDataCartao(e.target.value)} />
      <FormGroup>
    <Label >
      Validade do Cartão</Label>
    <Input
     
      name="validade"
      placeholder="Validade do Cartão"
      type="text"
      value={validade} onChange={e => setValidade(e.target.value)} />
 </FormGroup> 
 </FormGroup> 
 <FormGroup className="p-2">
    <Label > Id do Cliente </Label>
    <Input 
      name="ClienteId"
      placeholder="Id do Cliente"
      type="text"
      defaultValue={ClienteId}
    />
  </FormGroup>
  <FormGroup className="d-flex">
  <Button type="submit" outline color="warning">Salvar</Button>
  <Button type="reset" outline color="info">Limpar</Button>
  </FormGroup>
</Form>
           </Container>
        </div>
    )
}