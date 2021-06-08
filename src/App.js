import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import CourseContent from './components/pages/CourseContent'
import MyAccount from './components/pages/MyAccount'
import CreateCourse from './components/instructor/pages/CreateCourse'
import AddVideo from './components/instructor/pages/AddVideo'
import MyCourses from './components/instructor/pages/MyCourses'
import CourseVideos from './components/instructor/pages/CourseVideos'
import CourseVideo from './components/instructor/pages/CourseVideo'

import QnA from './components/QnA';
import './App.css';



const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path='/courses' component={Courses} />
          <Route path='/course_content' component={CourseContent} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/logout' component={Logout} />
          <Route path='/myaccount' component={MyAccount} />

          
          {/* Instructor Routes */}
          <Route path='/instructor/mycourses' component={MyCourses} />
          <Route path='/instructor/create_course' component={CreateCourse} />
          <Route path='/instructor/course_videos' component={CourseVideos} />
          <Route path='/instructor/course_video' component={CourseVideo} />
          <Route path='/instructor/add_video' component={AddVideo} />

          <Route path='/qna' component={QnA} />
        </Switch>

        <Footer />
      </Router>
      

    </div>
  );
}

export default App;