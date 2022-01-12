import  {BrowserRouter, Route} from "react-router-dom"
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
