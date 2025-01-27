import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
    const navigate = useNavigate();
    const {setToken} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

     const handleLogin = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const res = await fetch('/api/login',{
            method: "post",
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        if(data.errors){
            //set error messages if the response returns "errors"
            setErrors(data.errors);
        }else{
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate('/');
        }
        setIsLoading(false);
    }

    return(
        <div>
            <h1 className="title">Login to your Account</h1>
        
            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value}) }/>
                    { errors.email && <p className="error">{errors.email[0]}</p> }
                </div>
                <div>
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value}) } />
                    { errors.password && <p className="error">{errors.password[0]}</p> }
                </div>
                <button disabled={isLoading} className="primary-btn">{isLoading ? 'Signing In...' : 'Sign In'}</button>
            </form>
        </div>
    );
}