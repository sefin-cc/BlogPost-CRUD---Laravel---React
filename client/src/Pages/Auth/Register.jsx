import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
    const navigate = useNavigate();
    const {setToken} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

     const handleRegister = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const res = await fetch('/api/register',{
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
            <h1 className="title">Register a New Account</h1>
        
            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value}) }/>
                    { errors.name && <p className="error">{errors.name[0]}</p> }
                </div>
                <div>
                    <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value}) }/>
                    { errors.email && <p className="error">{errors.email[0]}</p> }
                </div>
                <div>
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value}) } />
                    { errors.password && <p className="error">{errors.password[0]}</p> }
                </div>
                <div>
                    <input type="password" placeholder="Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value}) }/>
                </div>
                <button disabled={isLoading} className="primary-btn">{isLoading ? 'Registering...' : 'Register'}</button>
            </form>
        </div>
    );
}