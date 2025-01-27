import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingScreen } from "./Components/LoadingScreen";
export default function Home() {

    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPost = async () => {
        setIsLoading(true);
        const res = await fetch('/api/posts');
        const data = await res.json();

        if(res.ok){
            setPost(data);
        }
        setIsLoading(false);
    }

    useEffect(() =>{
        getPost();
    },[]);

    return(
        <div>
            <h1 className="title">Latest Post </h1>
            { !isLoading ? (
                <div>
                    {post.length > 0 ? post.map((post) => (
                    <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                        <div className="mb-2 flex items-start justify-between">
                            <div>
                                <h2 className="font-bold text-2xl">{post.title}</h2>
                                <small className="text-xs text-slate-600">Created by {post.user.name} on {" "} {new Date(post.created_at).toLocaleDateString()}</small>
                            </div>
                            <Link to={`/posts/${post.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">Read more</Link>
                        </div>
                        <p>{post.body}</p>
                    </div>
                    )) : 
                <p>There are no post.</p>}
                </div>
            ):<LoadingScreen />}
           
        </div>
    );
}