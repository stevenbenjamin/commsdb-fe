import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import HomePage from './home/HomePage'; 
import ProviderFlow from './graph/ReactFlowGraph'; 
function App() {
  return (
    <BrowserRouter>
      <header className="sticky">
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/graph" className="button rounded">
          Graph
        </NavLink>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/graph" element={<ProviderFlow /> } /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
