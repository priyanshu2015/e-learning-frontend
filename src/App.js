import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path='/courses' component={Courses} />
          <Route path='/course_detail' component={Courses} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>

        <Footer />
      </Router>
      

    </div>
  );
}

export default App;