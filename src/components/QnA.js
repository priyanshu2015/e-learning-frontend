import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from './Button';
import {
    faAngleDown,
    faAngleUp,
    faPlusCircle,
    faPlusSquare,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
const Item = ({ post }) => {
    const [addComment, setaddComment] = useState(false);
    const [item, setitem] = useState(post);
    const [comment, setcomment] = useState("");
    const [reviewToggle, setReviewToggle] = useState(false);
    // const days = parseInt(
    //     (new Date() - new Date(item.createdAt)) / (1000 * 60 * 60 * 24),
    //     10,
    // );
    const handleChange = (e) => setcomment(e.target.value);
    const postComment = () => {
        // if (!context.token) {
        //     alert("<a>Login First</a>");
        //     return;
        // }
        console.log(comment);

        const query = {
            comment,
            id: item._id,
        };
        // setloading(true);

    //     axios
    //         .post("/api/post/comment", query, {
    //             headers: {
    //                 Authorization: `Bearer ${context.token}`,
    //             },
    //         })
    //         .then(({ data }) => {
    //             console.log(data);

    //             setitem({
    //                 ...item,
    //                 comments: [...item.comments, data.comment],
    //             });
    //             setaddComment(false);
    //             setReviewToggle(true);
    //             setloading(false);
    //         })
    //         .catch((err) => {
    //             console.log(err, err.response);
    //             setloading(false);
    //             alert(err?.response?.data?.error);
    //         });
    };
    const like = () => {
        // if (!context.token) {
        //     alert("Login First");
        //     return;
        // }
        // axios
        //     .post(
        //         "/api/post/like",
        //         { id: item._id },
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${context.token}`,
        //             },
        //         },
        //     )
        //     .then(({ data }) => {
        //         console.log(data);
        //         setliked(true);
        //         setitem({ ...item, likes: data.post.likes });
        //     })
        //     .catch((err) => console.log(err, err.response));
    };
    return (
        <><div>
            {/* {item.comments.length !== 0 && (
                <span
                    style={{ cursor: "pointer" }}
                    className='text-primary'
                    onClick={() =>
                        setReviewToggle(!reviewToggle)
                    }>
                    View {item.comments.length} Comments{" "}
                    <span>
                        <FontAwesomeIcon
                            icon={
                                !reviewToggle
                                    ? faAngleDown
                                    : faAngleUp
                            }
                        />
                    </span>
                </span>
            )} */}
            <span onClick={() => setaddComment(!addComment)}>
                <FontAwesomeIcon
                    className='mr-1'
                    icon={faPlusSquare}
                />
                                Comment
                            </span>
        </div>
            <div>
                {reviewToggle &&
                    // item.comments.map((comment, ind) => (
                    //     <div className='review'>
                    //         <strong>
                    //             {comment?.author?.username} :{" "}
                    //         </strong>
                    //         {comment.text}
                    //     </div>))
                    <div>Hello</div>
                    }
            </div>
            {addComment && (
                <div className='d-flex flex-row new-comment'>
                    <label className='d-flex flex-column justify-content-center m-0'>
                        <strong>
                            {/* {context?.user?.username} :{" "} */}
                        </strong>
                    </label>
                    <div className='flex-grow-1 ml-1 d-flex flex-row justify-content-between'>
                        <input
                            type='textarea'
                            name='comment'
                            id='comment'
                            placeholder='add a comment ...'
                            onChange={handleChange}
                            className='flex-grow-1 mr-1'
                            value={comment}
                            rows={1}
                        />
                        <Button>Post</Button>
                    </div>
                </div>
            )}

        
        </>
    );
};
export default Item;