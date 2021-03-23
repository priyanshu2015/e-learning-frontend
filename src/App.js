import Login from './components/Login'
import Signup from './components/Signup'
import './App.css';

const App = () => {
  return (
    <div>
    <div className="container">
      <Signup />  
    </div>
    <div className="container">
      <Login />  
    </div>
    </div>
  );
}

export default App;