import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import HomePage from './home/HomePage'; 
import ProviderFlow from './graph/ReactFlowGraph'; 
import ProviderFlow1 from './graph/ReactFlowGraph1';
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
        <NavLink to="/graph1" className="button rounded">
          Graph1
        </NavLink>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/graph" element={<ProviderFlow />} />
          <Route path="/graph1" element={<ProviderFlow1 />} />
          <Route path="/graph/:id" element={<ProviderFlow /> } /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
