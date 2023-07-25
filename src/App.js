import './App.css';
import Login from './component/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './component/home/Home';
import ProjectList from './component/projectList/ProjectList';

function App() {

  return (
    <div className="App">
      <main>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path="/project/:id" element={<ProjectList/>}/>
      </Routes> 
      </main>
    </div>
  );
}

export default App;
