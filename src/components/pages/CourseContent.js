import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/CourseContent.css';
export default function CourseContent() {
    // const [courseData, setCourseData] = useState([]);
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const apiURL = "http://localhost/e-learning-platform/api/list_course_vi.php";
    return (
        <div className="main-container">
            <div className="main-content">
                <div className="video-section">
                    <div className="video-container">
                        <iframe src="https://www.youtube.com/embed/d4u1WNRincc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="On"></iframe>
                    </div>
                </div>
                <div className="video-details">
                    <div className="details-nav">
                        <ul className="details-nav-tabs">
                            <li className="details-nav-tab">
                                <a href="#" className="details-nav-link active">Overview</a>
                            </li>
                            <li className="details-nav-tab">
                                <a href="#" className="details-nav-link">Q&A</a>
                            </li>
                            <li className="details-nav-tab">
                                <a href="#" className="details-nav-link">Files</a>
                            </li>
                            <li className="details-nav-tab">
                                <a href="#" className="details-nav-link">Announcements</a>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-tab-info">
                        Most importantly, I will be giving some quizzes and exercises to test your skills regularly. I will be providing questions, and then you have to try solving them. This Python tutorial will enhance your programming skills, and it will also help you become a pro programmer.

                        Technology is enhancing, and human beings always try to reduce their manual efforts. After learning Programming, one can reduce his/her manual efforts to accomplish his/her work on the machine.

                        Programming allows us to minimize manual work. With the help of programming, we can make scripts that can help us do our work at a much faster rate.

                        Programming can change our lives entirely as it can help us create many programs & scripts which can run automatically and can easily accomplish our task in almost no time.

                        So from the next video, we will be starting our first lecture in this complete course of Python.
                    </div>

                </div>

            </div>
            <div className="content-parent">
                <div className="content-header">
                    <h2>Course Content</h2></div>
                <div className="content">
                    <Link to='#' className='video-title active'>
                        1. Course Overview
                </Link>
                    <Link to='#' className='video-title'>
                        1. Course Overview
                </Link>
                    <Link to='#' className='video-title'>
                        1. Course Overview
                </Link>
                    <Link to='#' className='video-title'>
                        1. Course Overview
                </Link>
                </div>
            </div>
        </div>
    )
}

// const styles = StyleSheet.create({})
