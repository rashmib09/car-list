
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CarList from './Components/CarList'
import AddCar from './Components/AddCar'
import Header from './Components/Header'
function App() {
  return (
    <div className="App">
   <Header/>
        <Routes>
      <Route  path="/" element=<CarList /> />
      <Route  path="/addCar" element=<AddCar /> />
      <Route   path="/edit/:id" element=<AddCar /> />
   </Routes>
    </div>
  );
}

export default App;
