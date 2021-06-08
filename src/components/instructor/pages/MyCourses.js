import CardItem from '../../CardItem';
import 'react-multi-carousel/lib/styles.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '../../Button';
import { Link } from 'react-router-dom'
import '../../../css/creator/MyCourses.css';

function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const [instructor_id, setInstructorId] = useState("");
  
  useEffect(async() => {
    await validateToken();
  }, []);

  async function validateToken() {
    var user = JSON.parse(localStorage.getItem('user-info'));
    if (user != null) {
        var current = Math.round(Date.now() / 1000);
        if (user.token.exp < current) {
            localStorage.removeItem('user-info');
            window.location.replace("/login");
        }
        else {
            var is_instructor = user.token.data.is_instructor;
            console.log(is_instructor);
            if (is_instructor == 0) {
                window.location.replace("/");
            }
            else {
                await setInstructorId(user.token.data.id); // not required
                console.log(instructor_id);  
                fetchData(user.token.data.id);
            }
        }
    }
    else {
        window.location.replace("/login");
    }
}


  const apiURL = "http://localhost/e-learning-platform/api/list_my_courses.php";

  const fetchData = async (id) => {
    var apiurl = apiURL + "?instructor_id=" + id;
    const response = await axios.get(apiurl);
    //const response = await fetch(apiURL);
    //const responseJSON = await response.json();
    //console.log(responseJSON);
    //setCourseData(responseJSON);
    setCourseData(response.data.data);
  }

  return (
    
    <div className="cards">
      <div className="mycourse-header">
      
      <h1>My Courses</h1>
      <Link to="/instructor/create_course"><Button>Add Course</Button></Link>
      </div>
      <br></br>
      <div className="carddeck">
        {courseData.map((course, index) => (

          <CardItem
            src={course.image}
            text={course.title}
            label={course.category_name}
            path={'/instructor/course_videos?' + 'id=' + course.id}
          />

        ))}
      </div>
    </div>
  );
}

export default MyCourses;