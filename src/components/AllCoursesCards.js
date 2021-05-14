import '../css/Cards.css';
import CardItem from './CardItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


function AllCoursesCards() {
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const apiURL = "http://localhost/e-learning-platform/api/list_courses.php";

  const fetchData = async () => {
    const response = await axios.get(apiURL);
    //const response = await fetch(apiURL);
    //const responseJSON = await response.json();
    //console.log(responseJSON);
    //setCourseData(responseJSON);
    setCourseData(response.data.data);
    console.log(courseData);
    console.log(response.data);
  }

  return (
    <div className="cards">
      <h1>All Courses</h1>
      <br></br>
      <div className="carddeck">
        {courseData.map((course, index) => (

          <CardItem
            src={course.image}
            text={course.title}
            label={course.category_name}
            path={'/course_content/?' + 'id=' + course.id}
          />

        ))}
      </div>
    </div>
  );
}

export default AllCoursesCards;