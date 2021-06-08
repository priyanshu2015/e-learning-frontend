import React from 'react';
import '../../../css/creator/CreateCourse.css';
import { Button } from '../../Button';
import { useEffect, useState } from 'react';
import axios from "axios";



function CreateCourse(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instructor_id, setInstructorId] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [language_medium_id, setLanguageMediumId] = useState("");
    const [image, setImage] = useState("");

    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(async() => {
        await validateToken();
        await fetchCategories();
        await fetchLanguages();

    }, []);

    let apiURL = window.apiurl;

    const fetchCategories = async () => {
        var apiurl = apiURL + "/list_course_categories.php/";
        const response = await axios.get(apiurl);
        setCategories(response.data.data);
        console.log(response);
    }

    const fetchLanguages = async () => {
        var apiurl = apiURL + "/list_language_mediums.php/";
        const response = await axios.get(apiurl);
        setLanguages(response.data.data);
        console.log(response);
    }

    const handleInputChange = async (event) => {
        event.preventDefault();
        await setImage(event.target.files[0]);
    };

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
                else {
                    setInstructorId(user.token.data.id);
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

        data.append("image", image ); // add your file to form data
        data.append("jwt", jwt);
        data.append("title", title);
        data.append("description", description);
        data.append("category_id", category_id );
        data.append("instructor_id", instructor_id );
        data.append("language_medium_id", language_medium_id);

        axios({
            method: "POST",
            url: window.apiurl + "create_course.php",
            data
        })
            .then((res) => {
                alert("Course Created Successfully");
                window.location.replace("/instructor/mycourses");
        
            })
            .catch((err) => alert("File Upload Error"));
    };

    return (
        <>
            <div class='course-container'>
                <h1>Create Your Course</h1>
                <form className="form-control">

                    <div>
                        <label htmlFor="title">Title*</label>
                        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title" />
                    </div>

                    <div>
                        <label htmlFor="description">Description*</label>
                        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Description" />
                    </div>

                    <label htmlFor="category">Category*</label>
                    <select name="category" id="category" onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map((category, index) => (
                            <option value={category.id}>{category.category_name}</option>
                        ))}
                    </select>

                    <label htmlFor="language">Language*</label>
                    <select name="language" id="language" onChange={(e) => setLanguageMediumId(e.target.value)}>
                        {languages.map((language, index) => (
                            <option value={language.id}>{language.language_name}</option>
                        ))}
                    </select>


                    <label htmlFor="image">Image*</label>
                    <input
                        type="file"
                        multiple={false}
                        ref={(image) => { image = image; }}
                        accept=".jpg,.jpeg,.png"
                        onChange={handleInputChange}
                    />
                    <Button onClick={handleFormSubmit}>submit</Button>
                </form>
            </div>
        </>
    );
}

export default CreateCourse;