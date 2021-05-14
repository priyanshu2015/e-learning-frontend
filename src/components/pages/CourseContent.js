import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/CourseContent.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function CourseContent() {
    const [courseVideos, setCourseVideos] = useState([]);
    const [courseVideo, setCourseVideo] = useState([]);
    const [videoId, setVideoId] = useState(0);
    var urlParams = new URLSearchParams(window.location.search);

    let apiURL = window.apiurl + "list_course_videos.php/";
    let videoURL = window.apiurl + "retrieve_course_video.php/"
    const fetchData = async () => {
        if (urlParams.has('id')) {
        apiURL = apiURL + "?id=" + urlParams.get('id');
        const response = await axios.get(apiURL);
        setCourseVideos(response.data.data);
        console.log(courseVideos);
        console.log(response.data);
        }
    }

    const fetchVideo = async (vid_id) => {
        if(vid_id === 0){
            videoURL = videoURL +  "?id=" + urlParams.get('id');
        }
        else{
            videoURL = videoURL +  "?id=" + urlParams.get('id') + "&" + "video_id=" + vid_id;
        }
        const response2 = await axios.get(videoURL);
        setCourseVideo(response2.data);
        console.log(courseVideo);
        console.log(response2.data);

    }

    useEffect(() => {
        if (urlParams.has('id') && !urlParams.has('video_id')) {
            fetchData();
            fetchVideo(0);
        }
        else if(urlParams.has('id') && urlParams.has('video_id')){
            fetchData();
            fetchVideo(urlParams.get('video_id'));
        }

    }, []);


    return (
        <div className="main-container">
            <div className="main-content">
                <div className="video-section">
                    <div className="video-container">
                        {/* <iframe src="https://www.youtube.com/embed/d4u1WNRincc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="On"></iframe> */}
                        <iframe src={"https://www.youtube.com/embed/" + courseVideo.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="On"></iframe>
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
                        {courseVideo.description}
                    </div>

                </div>

            </div>
            <div className="content-parent">
                <div className="content-header">
                    <h2>Course Content</h2></div>
                <div className="content">
                    {courseVideos.map((video, index) => (
                        <a href="#" className={video.id === courseVideo.id ? 'video-title active' : 'video-title'} onClick={() => fetchVideo(video.id)}>
                            {index+1}. {video.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

// const styles = StyleSheet.create({})
