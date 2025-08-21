import './App.css';
import Home from './pages/Home';
import Daily from './pages/Daily';
import Add from './pages/Daily';

function App() {
  return (
    <DiaryDispatchContext.Provider>
    <DiaryStateContext.Provider> 
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/daily' element={<Daily />} />
        <Route path='/add' element={<Add />} />
      </Routes>
    </div>
    </DiaryStateContext.Provider> 
    </DiaryDispatchContext.Provider>
  );
}
export default App;
