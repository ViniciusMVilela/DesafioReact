import {Container, Form, FormGroup,Input,Label,Button} from 'reactstrap';
import {Link} from "react-router-dom";
import axios from "axios"
import {api} from "../../config"
import {  useState } from "react"


export const CadastrarPromocao =() =>{

    const [promocao, setPromocao] = useState({
        nome: '',
        nascimento: ''
    })

    const valorInput = e =>
    setPromocao({...promocao, [e.target.name] : e.target.value})

    const cadPromocao = async e =>{
        e.preventDefault();

        const headers = {
            'Content-type ': 'applicantion/json'
        }

        await axios.post(api+"/novapromocao", promocao, {headers})
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
                        <h1>Nova Promoção</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-promocaos" className="m-auto btn
                         btn-outline-info btn-sm">Promoções</Link>
                         </div>
               </div>
               <Form className="p-2" onSubmit={cadPromocao}>
  <FormGroup>
    <Label > Nome </Label>
    <Input
      name="nome"
      placeholder="Digite o nome da promoção"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
     Descrição</Label>
    <Input
     
      name="descricao"
      placeholder="Digite a descrição"
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