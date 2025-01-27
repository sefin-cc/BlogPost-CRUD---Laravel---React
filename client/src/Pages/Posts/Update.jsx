import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";


export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {token, user} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if(res.ok){
            if(data.post.user_id === user.id){
                setFormData({
                    title: data.post.title,
                    body: data.post.body,
                });
            }else{
                navigate("/");
            }
        }
    }

    const handleUpdate = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const res = await fetch(`/api/posts/${id}`,{
            method: "put",
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        if(data.errors){
            //set error messages if the response returns "errors"
            setErrors(data.errors);
        }else{
            navigate('/');
        }
        setIsLoading(false);
    }

    useEffect(() =>{
        getPost();
    },[]);

    return(
        <div>
            <h1 className="title">Update your New Post </h1>

            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Post Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value}) }/>
                    { errors.title && <p className="error">{errors.title[0]}</p> }
               </div>
                <div>
                    <textarea rows="6" placeholder="Post Content"  value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value}) }> </textarea>
                    { errors.body && <p className="error">{errors.body[0]}</p> }
                </div>

                <button disabled={isLoading}  className="primary-btn">{isLoading ? 'Updating...' : 'Update'}</button>
            </form>
        </div>
    );
}