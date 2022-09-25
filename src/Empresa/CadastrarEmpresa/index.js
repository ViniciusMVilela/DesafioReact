import {Container, Form, FormGroup,Input,Label,Button} from 'reactstrap';
import {Link} from "react-router-dom";
import axios from "axios"
import {api} from "../../config"
import {  useState } from "react"


export const CadastrarEmpresa =() =>{

    const [empresa, setEmpresa] = useState({
        nome: '',
        nascimento: ''
    })

    const valorInput = e =>
    setEmpresa({...empresa, [e.target.name] : e.target.value})

    const cadEmpresa = async e =>{
        e.preventDefault();

        const headers = {
            'Content-type ': 'applicantion/json'
        }

        await axios.post(api+"/novaempresa", empresa, {headers})
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
                        <h1>Nova Empresa</h1>
                         </div>
                         <div className="p-2">
                         <Link to ="/listar-empresas" className="m-auto btn
                         btn-outline-info btn-sm">Empresas</Link>
                         </div>
               </div>
               <Form className="p-2" onSubmit={cadEmpresa}>
  <FormGroup>
    <Label > Nome </Label>
    <Input
      name="nome"
      placeholder="Digite o nome da empresa"
      type="text"
      onChange={valorInput}
    />
  </FormGroup>
  <FormGroup>
    <Label >
      Data de Adesao </Label>
    <Input
     
      name="dataAdesao"
      placeholder="Digite a data de adesão"
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