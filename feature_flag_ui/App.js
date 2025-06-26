 
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Feature from './Feature.js';
import CreateFeature from './CreateFeature.js';
import UpdateFeature from './UpdateFeature.js';


function App() {
  return (
   <div className='App'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Feature/>}></Route>
      <Route path='/create' element={<CreateFeature/>}></Route>
      <Route path='/update/:id' element={<UpdateFeature/>}></Route>
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
