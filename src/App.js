
import '../src/styles/style.css'
import Brain from "./pages/Brain";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="main">
      <Routes>
        <Route path='/Valantis' element={<Brain />} />

      </Routes>
    </div>
  );
}

export default App;
