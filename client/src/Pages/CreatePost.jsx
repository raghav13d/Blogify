import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;  // Ensure to use 'VITE_' prefix for environment variables in Vite

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [uploading, setUploading] = useState(false);

    const uploadFileToFirebase = async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                snapshot => {
                    // Handle progress if needed
                },
                error => {
                    // Handle error
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const createNewPost = async (ev) => {
        ev.preventDefault();
        setUploading(true);

        let imageUrl = '';
        if (files && files[0]) {
            try {
                imageUrl = await uploadFileToFirebase(files[0]);
            } catch (error) {
                console.error("Error uploading file:", error);
                setUploading(false);
                return;
            }
        }

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('image', imageUrl);  // Add image URL to form data

        const response = await fetch(`${API_BASE_URL}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        setUploading(false);

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
            <button type="submit" style={{ marginTop: '5px' }} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Create post'}
            </button>
        </form>
    );
};

export default CreatePost;
