import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../../Button';
import '../../../css/creator/CourseVideos.css';
export default function CourseVideos() {
    const [courseVideos, setCourseVideos] = useState([]);
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);

    let apiURL = window.apiurl + "list_course_videos.php/";
    const fetchData = async () => {
        var user = JSON.parse(localStorage.getItem('user-info'));
        var jwt = user.jwt;
        if (urlParams.has('id')) {
        apiURL = apiURL + "?id=" + urlParams.get('id');
        const response = await axios.get(apiURL);
        setCourseVideos(response.data.data);
        console.log(response.data);
        }
    }

    useEffect(async() => {
        await validateToken();
        if (urlParams.has('id')) {
            await fetchData();
        }

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
                if (is_instructor == 0) {
                    window.location.replace("/");
                }
            }
        }
        else {
            window.location.replace("/login");
        }
    }


    return (    
            <div className="course-videos-container">
                <div className="mycourse-header">
                <h1>Course Content</h1>
                <Link to={"/instructor/add_video?id=" + urlParams.get('id')}><Button>Add Video</Button></Link>
                </div>
                <div className="course-videos">
                    
                    {courseVideos.map((video, index) => (
                        <Link to={"/instructor/course_video?id=" + urlParams.get('id') + "&video_id=" + video.id} className="video-links"><h3>{index+1}. {video.title}</h3></Link>
                    ))}
                    
                    
                </div>
            </div>
    )
}

// const styles = StyleSheet.create({})
