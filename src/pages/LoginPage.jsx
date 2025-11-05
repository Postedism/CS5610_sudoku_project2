// src/pages/LoginPage.jsx

import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 模拟提交
  const handleSubmit = (event) => {
    event.preventDefault(); // 阻止表单的默认刷新行为
    console.log('Mock Login Attempt:', { username, password });
    alert('登录功能正在开发中。\n你输入了: ' + username);
  };

  return (
    <div className="page-container auth-page">
      <h2>登录</h2>
      <p>这是一个模拟页面。登录功能尚未实现。</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">用户名</label>
          <input 
            type="text" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input 
            type="password" // 符合项目要求，隐藏密码
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="button-primary">
          登录
        </button>
      </form>
    </div>
  );
}

export default LoginPage;