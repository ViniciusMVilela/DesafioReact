import {Container, Form, FormGroup,Input,Label,Button} from 'reactstrap';
import {Link} from "react-router-dom";
import axios from "axios"
import {api} from "../../config"
import {  useState } from "react"


export const CadastrarCartao =() =>{

    const [cartao, setCartao] = useState({
        nome: '',
        nascimento: ''
    })

    const valorInput = e =>
    setCartao({...cartao, [e.target.name] : e.target.value})

    const cadCartao = async e =>{
        e.preventDefault();

        const headers = {
            'Content-type ': 'applicantion/json'
        }

        await axios.post(api+"/cartao", cartao, {headers})
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
                        <h1>Novo Cartão</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-cartaos" className="m-auto btn
                         btn-outline-info btn-sm">Cartões</Link>
                         </div>
               </div>
               <Form className="p-2" onSubmit={cadCartao}>
  <FormGroup>
    <Label > Data </Label>
    <Input
      name="dataCartao"
      placeholder="Digite a data de criação"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Validade </Label>
    <Input
     
      name="validade"
      placeholder="Digite a data de validade"
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