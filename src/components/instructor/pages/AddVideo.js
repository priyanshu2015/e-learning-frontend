import React from 'react';
import '../../../css/creator/AddVideos.css';
import { Button } from '../../Button';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom'

//import Prism from "prismjs"

function AddVideos(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [course_id, setCourseId] = useState("");
    const [url, setUrl] = useState("");
    // const [image, setImage] = useState("");

    var urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has('id')){
        window.location.replace("/");
    }

    // function componentDidMount() {
    //     // You can call the Prism.js API here
    //     // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    //     setTimeout(() => Prism.highlightAll(), 0)
    //   }


    useEffect(async () => {
        await validateToken();
    }, []);

    let apiURL = window.apiurl;

    const handleEditorChange = (e) => {
        //componentDidMount();
        console.log(
            'Content was updated:',
            e.target.getContent()
        );
        setDescription(e.target.getContent());
    }


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

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let data = new FormData(); // creates a new FormData object

        var user = JSON.parse(localStorage.getItem('user-info'));
        var jwt = user.jwt;

        // data.append("image", image ); // add your file to form data
        data.append("jwt", jwt);
        data.append("title", title);
        data.append("description", description);
        if (urlParams.has('id')){
            data.append("course_id", urlParams.get('id'));
        }
        
        data.append("url", url);

        axios({
            method: "POST",
            url: window.apiurl + "add_course_video.php",
            data
        })
            .then((res) => {
                alert("Video Added Successfully");
                window.location.replace("/instructor/course_videos" + "?id=" + urlParams.get('id'));
            })
            .catch((err) => alert("Error"));
    };

    return (
        <>
            <div class='course-container'>
                <h1>Add Video</h1>
                <form className="form-control">

                    <div>
                        <label htmlFor="title">Title*</label>
                        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title" />
                    </div>

                    <div>
                        <label htmlFor="description">Overview*</label>
                        <Editor
                            apiKey="2ug2k0ribbay6szey6bq8tfuo58qh45rrn8wqt45aphvu48r"
                            initialValue="<p>Initial content</p>"
                            init={{
                                height: 500,
                                // a11y_advanced_options: true,
                                // plugins: 'image',
                                // menubar: 'insert',
                                // toolbar: 'image',
                                // image_caption: true,
                                selector: 'textarea',
                                plugins: [
                                    'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                                    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                                    'table emoticons template paste help', 'codesample code'
                                  ],
                                  toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | link image | print preview media fullpage | ' +
                                    'forecolor backcolor emoticons | help | codesample code',
                                  menu: {
                                    favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
                                  },
                                  codesample_languages: [
                                    {text: 'HTML/XML', value: 'markup'},
                                    {text: 'JavaScript', value: 'javascript'},
                                    {text: 'CSS', value: 'css'},
                                    {text: 'PHP', value: 'php'},
                                    {text: 'Ruby', value: 'ruby'},
                                    {text: 'Python', value: 'python'},
                                    {text: 'Java', value: 'java'},
                                    {text: 'C', value: 'c'},
                                    {text: 'C#', value: 'csharp'},
                                    {text: 'C++', value: 'cpp'}
                                ],
                                  menubar: 'favs file edit view insert format tools table help',
                                  codesample_global_prismjs: true,
                                //   codesample_content_css: "http://ourcodeworld.com/material/css/prism.css",
                                // content_css: 'css/content.css'
                            }}
                            onChange={handleEditorChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="url">Url*</label>
                        <input type="text" name="url" onChange={(e) => setUrl(e.target.value)} id="url" placeholder="Url" />
                    </div>



                    <Button onClick={handleFormSubmit}>submit</Button>
                </form>
            </div>
        </>
    );
}

export default AddVideos;