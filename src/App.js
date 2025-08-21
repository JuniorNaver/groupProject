import './App.css';
import Home from './pages/Home';
import Daily from './pages/Daily';
import Add from './pages/Add';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/daily' element={<Daily />} />
        <Route path='/add' element={<Add />} />
      </Routes>
    </div>
  );
}
export default App;
