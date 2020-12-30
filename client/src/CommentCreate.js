import axios from "axios";
import React, {useState} from "react";

export default ({postId}) => {

    const [content, setContent] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        
        await axios.post(
            `http://minikube.com/posts/${postId}/comments`,
            {content});

        setContent('');

    };

    return(

        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New comment</label>
                    <input 
                        value={content} 
                        onChange={e => setContent(e.target.value)} 
                        className="form-control"/>
                </div>
                <button className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>

    );

};