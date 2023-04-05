import './App.css';
import { Routes, Route } from "react-router-dom";
import CreditTerms from './Components/CreditTerms'
import CreditDetails from './Components/CreditDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreditTerms />} />
        <Route exact path="/creditDetails" element={<CreditDetails />} />
      </Routes>
    </div>
  );
}

export default App;
