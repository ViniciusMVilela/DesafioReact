import {Container, Form, FormGroup,Input,Label,Button} from 'reactstrap';
import {Link} from "react-router-dom";
import axios from "axios"
import {api} from "../../config"
import {  useState } from "react"


export const CadastrarCliente =() =>{

    const [cliente, setCliente] = useState({
        nome: '',
        nascimento: ''
    })

    const valorInput = e =>
    setCliente({...cliente, [e.target.name] : e.target.value})

    const cadCliente = async e =>{
        e.preventDefault();

        const headers = {
            'Content-type ': 'applicantion/json'
        }

        await axios.post(api+"/cliente", cliente, {headers})
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
                        <h1>Novo Cliente</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-clientes" className="m-auto btn
                         btn-outline-info btn-sm">Clientes</Link>
                         </div>
               </div>
               <Form className="p-2" onSubmit={cadCliente}>
  <FormGroup>
    <Label > Nome </Label>
    <Input
      name="nome"
      placeholder="Digite o nome do cliente"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Data de Nascimento </Label>
    <Input
     
      name="nascimento"
      placeholder="Digite a data de nascimento"
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