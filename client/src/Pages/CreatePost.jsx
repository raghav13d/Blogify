import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { UserContext } from "../userContext";
 // Ensure to use 'VITE_' prefix for environment variables in Vite

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const {url} =useContext(UserContext);

    const createNewPost = async (ev) => {
        
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);  // Add image URL to form data
        ev.preventDefault();
        const response = await fetch(url+'/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <form onSubmit={createNewPost}>
            <input 
                type="text" 
                placeholder="Title" 
                value={title}
                onChange={ev => setTitle(ev.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Summary"
                value={summary}
                onChange={ev => setSummary(ev.target.value)} 
            />
            <input 
                type="file" 
                onChange={ev => setFiles(ev.target.files)} 
            />
            <Editor value={content} onChange={setContent} />
            <button  style={{ marginTop: '5px' }} >
                Create post
            </button>
        </form>
    );
};

export default CreatePost;
