import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
}

export default App;