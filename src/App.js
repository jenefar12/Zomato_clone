import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import {Routes,Route} from 'react-router-dom';
import PageNotFound from './components/pageNotFound';
import Restaurant from './components/Restaurant';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search/:meal_id/:meal_type_name' element={<Search />}/>
        <Route path='/restaurant/:id' element={<Restaurant />}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
