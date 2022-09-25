import {Container, Form, FormGroup,Input,Label,Button} from 'reactstrap';
import {Link} from "react-router-dom";
import axios from "axios"
import {api} from "../../config"
import {  useState } from "react"


export const CadastrarCompra =() =>{

    const [compra, setCompra] = useState({
        nome: '',
        nascimento: ''
    })

    const valorInput = e =>
    setCompra({...compra, [e.target.name] : e.target.value})

    const cadCompra = async e =>{
        e.preventDefault();

        const headers = {
            'Content-type ': 'applicantion/json'
        }

        await axios.post(api+"/compra", compra, {headers})
        .then((response)=>{
            console.log(response.data.message)
        })
        .catch(()=>{
            console.log("Erro: Sem conexão com a API")
            console.log("Erro: sem conexão com a API!")
        })

        
    }

    return(
        <div>
           <Container>
               <div className="d-flex">
                        <div className="m-auto p-2">
                        <h1>Nova Compra</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-compras" className="m-auto btn
                         btn-outline-info btn-sm">Compras</Link>
                         </div>
               </div>
               <Form className="p-2" onSubmit={cadCompra}>
  <FormGroup>
    <Label > Data </Label>
    <Input
      name="data"
      placeholder="Digite a data"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Quantidade </Label>
    <Input
     
      name="quantidade"
      placeholder="Digite a quantidade"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Valor </Label>
    <Input
     
      name="valor"
      placeholder="Digite o valor da compra"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Cartão Id </Label>
    <Input
     
      name="CartaoId"
      placeholder="Digite o ID do cartão"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Promocão Id </Label>
    <Input
     
      name="PromocaoId"
      placeholder="Digite o ID da promocão"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup className="d-flex">
  <Button type="submit" outline color="info">Cadastrar</Button>
  <Button type="reset" outline color="info">Limpar</Button>
  </FormGroup>
</Form>
           </Container>
        </div>
    )
}