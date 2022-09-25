
import './App.css';
import {Routes,Route} from 'react-router-dom';
import {Home} from './Home';
import {Clientes} from './Cliente/clientes'
import {Menu} from './Menu';
import {Cartaos} from './Cartao/cartaos';
import {Compras} from './Compra/compras';
import {Empresas} from './Empresa/empresas';
import {Promocaos} from './Promocao/promocaos';
import {CadastrarCliente} from './Cliente/CadastrarCliente';
import {CartaoCliente} from './Cliente/CartaoCliente';
import {EditarCartao} from './Cliente/EditarCartao';
import {CadastrarEmpresa} from './Empresa/CadastrarEmpresa';
import {PromocaosEmpresa} from './Empresa/PromocaosEmpresa';
import {CompraCliente} from './Cliente/CompraCliente';
import{CadastrarCartao} from './Cartao/CadastrarCartao';
import {CadastrarPromocao} from './Promocao/CadastrarPromocao';
import {CadastrarCompra} from './Compra/CadastrarCompra';


function App() {
  return (
    <div className="App">
    <Menu/>
    <Routes>
  <Route path = '/' element={<Home/>}/>
  <Route path ='/listar-clientes' element={<Clientes/>}/>
  <Route path='/novo-cliente' element={<CadastrarCliente/>}/>
  <Route path = '/cliente-pedidos/:id' element={<CartaoCliente/>}/>
  <Route path='/cliente/:id/cartaos' element={<EditarCartao/>}/> 
  <Route path='/cartao-compras/:id'element={<CompraCliente/>}/>
  <Route path ='/listar-cartaos' element={<Cartaos/>}/>
  <Route path ='novo-cartao' element={<CadastrarCartao/>}/>
  <Route path ='/listar-compras' element={<Compras/>}/>
  <Route path='nova-compra' element={<CadastrarCompra/>}/>
  <Route path ='/listar-empresas' element={<Empresas/>}/>
  <Route path='empresa/promocao/:id/' element={<PromocaosEmpresa/>}/>
  <Route path='nova-empresa' element={<CadastrarEmpresa/>}/>
  <Route path ='/listar-promocaos' element={<Promocaos/>}/>
  <Route path ='/nova-promocao' element={<CadastrarPromocao/>}/>
    </Routes>
    </div>
  );
}

export default App;
