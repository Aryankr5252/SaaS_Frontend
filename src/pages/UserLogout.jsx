import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserLogout = () => {

    const { setUser, setToken } = useContext(AuthContext);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    console.log(token)

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setUser(null);
                localStorage.removeItem('token');
                setToken(null);
                navigate('/');
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [token, navigate]);

    return (
        <div>
            hello
        </div>
    )
}

export default UserLogout