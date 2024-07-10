import { useState } from 'react';

interface AdminLoginProps {
    onLogin: (username: string, password: string) => void;
}

function AdminLogin({onLogin }: AdminLoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        onLogin(username, password);
    };

    return (
        <div id="login-content">
            <form id="login-form" className="form" action="./" method="POST">
                <h1 
                className="form-title">Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username </label>
                    <input type="text" className="form-input" id="username" value={username}
                    onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input type="text" className="form-input" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type="button" onClick={handleLogin}>Login</button>
                <p>Sample Information: </p>
                <p>Username: admin </p>
                <p>Password: admin123 </p>
            </form>
        </div>
    )
}

export default AdminLogin;
