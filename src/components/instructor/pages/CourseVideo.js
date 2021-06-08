import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Markup } from 'interweave';
//import ReactHtmlParser from "react-html-parser"
import '../../../css/creator/CourseVideo.css';
import axios from 'axios';

import CommentsBlock from 'simple-react-comments';



export default function CourseVideo() {
    const [courseVideo, setCourseVideo] = useState([]);
    const [videoId, setVideoId] = useState(0);
    const [headerState, setHeaderState] = useState(0);
    const [comments, setComments] = useState([
        {
            authorUrl: '#',
            avatarUrl:
                'https://cdnb.artstation.com/p/users/avatars/000/126/159/large/582fd86d44a71299b5cc51fe9f580471.jpg?1447075438',
            createdAt: new Date(1530297561680),
            fullName: 'Alexey Ryabov',
            text: '<h1>hello whats up</h1>',
        },
        {
            authorUrl: '/asdf',
            avatarUrl:
                'https://cdnb.artstation.com/p/users/avatars/000/126/159/large/582fd86d44a71299b5cc51fe9f580471.jpg?1447075438',
            createdAt: new Date(1530297561680),
            fullName: 'Alexey Ryabov',
            text: 'react-simple-comments is awesome!',
        },
    ]
    );

    var urlParams = new URLSearchParams(window.location.search);

    let videoURL = window.apiurl + "retrieve_course_video.php/"

    const fetchVideo = async (vid_id) => {
        // Add jwt also
        if (vid_id === 0) {
            videoURL = videoURL + "?id=" + urlParams.get('id');
        }
        else {
            videoURL = videoURL + "?id=" + urlParams.get('id') + "&" + "video_id=" + vid_id;
        }
        const response2 = await axios.get(videoURL);
        setCourseVideo(response2.data);
        console.log(courseVideo);
        console.log(response2.data);

    }

    useEffect(() => {
        validateToken();
        if (urlParams.has('id') && !urlParams.has('video_id')) {
            fetchVideo(0);
        }
        else if (urlParams.has('id') && urlParams.has('video_id')) {
            fetchVideo(urlParams.get('video_id'));
            getComments(urlParams.get('video_id'));
        }

    }, []);

    var user = JSON.parse(localStorage.getItem('user-info'));

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

    const changeHeaderState = async (e, state) => {
        e.preventDefault();
        setHeaderState(state);
    }

    const getComments = async (vid_id) => {
        if (urlParams.has('id')) {
            var apiURL = window.apiurl + "list_video_comments.php?id=" + vid_id;
            const response = await axios.get(apiURL);
            var data = response.data.data;
            console.log(response.data.data);
            for (var i = 0; i < data.length; i++) {
                data[i]["createdAt"] = new Date(data[i]["createdAt"] * 1000);
                console.log(data[i]["createdAt"])
            }
            setComments(data);
        }
    }

    async function createComment(text) {
        const data = { body: text, user_id: user.token.data.id, video_id: courseVideo.id };
        axios.post(window.apiurl + "create_video_comment.php", data)
            .then(response => alert("Done"))
            .catch((err) => alert(err));

    }


    return (
        <div className="main-video-container">
            <div className="main-video-content">
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
                                <a href="#" className={headerState === 0 ? 'details-nav-link active' : 'details-nav-link'} onClick={e => changeHeaderState(e, 0)}>Overview</a>
                            </li>
                            <li className="details-nav-tab">
                                <a href="#" className={headerState === 1 ? 'details-nav-link active' : 'details-nav-link'} onClick={e => changeHeaderState(e, 1)}>Q&A</a>
                            </li>
                            <li className="details-nav-tab">
                                <a href="#" className={headerState === 2 ? 'details-nav-link active' : 'details-nav-link'} onClick={e => changeHeaderState(e, 2)}>Files</a>
                            </li>
                            <li className="details-nav-tab">
                                <a href="#" className={headerState === 3 ? 'details-nav-link active' : 'details-nav-link'} onClick={e => changeHeaderState(e, 3)}>Announcements</a>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-tab-info">
                        {headerState == 0 && <Markup content={courseVideo.description} />}
                        {headerState == 1 && <CommentsBlock
                            comments={comments}
                            signinUrl={'/login'}
                            isLoggedIn
                            false // set to true if you are using react-router
                            onSubmit={text => {
                                if (text.length > 0) {
                                    setComments(
                                        [...comments,
                                        {
                                            authorUrl: '#',
                                            avatarUrl: 'https://cdnb.artstation.com/p/users/avatars/000/126/159/large/582fd86d44a71299b5cc51fe9f580471.jpg?1447075438',
                                            createdAt: new Date(),
                                            fullName: user.token.data.name,
                                            text,
                                        }]
                                    );

                                    createComment(text);
                                    console.log('submit:', text);
                                }
                            }}
                        />}
                        {headerState == 2 && <div>No Files Available</div>}
                        {headerState == 3 && <div>No Announcements till now.</div>}
                        {/* {ReactHtmlParser(courseVideo.description)} */}
                    </div>

                </div>

            </div>
        </div>
    )
}

// const styles = StyleSheet.create({})
