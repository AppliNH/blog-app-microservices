import React, {useState} from 'react';
import axios from 'axios';


export default () => {

    // React hook => title is the property, setTitle is the setter
    const [title, setTitle] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.post(
            'http://minikube.com/posts/create',
            {title}

        );

        setTitle('')

        if (res.status > 201) {
            console.error(res)
        }

    };

    return(

        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="form-control" />
                </div>
                <button className="btn btn-primary mt-3">Submit</button>
            </form>

        </div>
    )
};