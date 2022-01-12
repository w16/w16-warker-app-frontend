import  {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
