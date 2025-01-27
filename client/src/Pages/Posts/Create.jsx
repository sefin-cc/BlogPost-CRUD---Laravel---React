import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";


export default function Create() {
    const navigate = useNavigate();
    const {token} = useContext(AppContext);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch('/api/posts',{
            method: "post",
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        if(data.errors){
            //set error messages if the response returns "errors"
            setErrors(data.errors);
            setIsLoading(false);
        }else{
            navigate('/');
        }
        setIsLoading(false);
    }

    return(
        <div>
            <h1 className="title">Create a New Post </h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Post Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value}) }/>
                    { errors.title && <p className="error">{errors.title[0]}</p> }
               </div>
                <div>
                    <textarea rows="6" placeholder="Post Content"  value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value}) }> </textarea>
                    { errors.body && <p className="error">{errors.body[0]}</p> }
                </div>

                <button disabled={isLoading} className="primary-btn">{isLoading ? 'Creating...' : 'Create'}</button>
            </form>
        </div>
    );
}