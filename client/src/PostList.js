import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {

    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {

        const res = await axios.get("http://minikube.com/posts");


        setPosts(res.data);
    };

    // Run at component creation, only one time (because of [] down there)
    useEffect(() => {
        fetchPosts();
    }, []);

    // Gives an array of all the values inside the object "posts"
    const renderedPosts = Object.values(posts).map(post => {
        return(
            <div
                className="card"
                style={{width: '30%', margin:'20px'}}
                key={post.id}>

                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                </div>
                <div className="card-footer">
                    <CommentCreate postId={post.id} />
                </div>

            </div>

        );
    });



    return(

        <div>
            <h1>Post list</h1>
            <div className="d-flex flex-row flex-wrap">
            {renderedPosts}
            </div>
        </div>

    );
}