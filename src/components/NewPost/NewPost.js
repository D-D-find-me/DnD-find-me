import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [zipcode, setZipcode] = useState('');
    const history = useHistory();

    const addPost = async () => {
        try {
            await axios.post('/api/post', {title, content, zipcode});
            history.push('/home')
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <div>
            <form>
                <input 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Start writing here."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Type your zipcode here."
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
                />
            </form>
            <div>
                <button>
                    <Link to="/home">Cancel</Link>
                </button>
                <button onClick={addPost}>
                    Post
                </button>
            </div>
        </div>
    );
}

export default NewPost;