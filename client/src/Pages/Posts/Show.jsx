import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { LoadingScreen } from "../Components/LoadingScreen";

export default function Show() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const { user, token } = useContext(AppContext);
    const navigate = useNavigate();

    const getPost = async () => {
        setIsLoading(true);
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if(res.ok){
            setPost(data.post);
            console.log(data);
        }
        setIsLoading(false);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoadingDelete(true);
        if(user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: "delete",
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
    
            const data = await res.json();
            
            if(res.ok){
                navigate("/");
            }
            console.log(data);
            setIsLoadingDelete(false);
        }
    }
    
    useEffect(() =>{
        getPost();
    },[]);
    

    return(
        <div>
            { !isLoading ? 
            ( <div>
                {post ? (
                    <div key={post.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
                        <div className="mb-2 flex items-start justify-between">
                            <div>
                                <h2 className="font-bold text-2xl">{post.title}</h2>
                                <small className="text-xs text-slate-600">Created by {post.user.name} on {" "} {new Date(post.created_at).toLocaleDateString()}</small>
                            </div>
                        </div>
                        <p>{post.body}</p>

                    { user && user.id === post.user_id &&
                        <div className="flex items-center justify-end gap-4">
                            <Link to={`/posts/update/${post.id}`} className="bg-green-500 text-white text-sm rounded-md px-3 py-1">Update</Link>    
                            <form onSubmit={handleDelete}>
                                <button disabled={isLoadingDelete}   className={`${isLoadingDelete ? 'bg-gray-400' : 'bg-red-500'} text-white text-sm rounded-md px-3 py-1`}>{isLoadingDelete ? 'Deleting...' : 'Delete'}</button>
                            </form>
                        </div>
                    }
                    </div>)
                    : <p className="title">Post doesn't exist</p>}
                    </div>
                ) : <LoadingScreen />
                }
        </div>
    );
 }