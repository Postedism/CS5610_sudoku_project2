// src/pages/RegisterPage.jsx

import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  // 模拟提交
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== verifyPassword) {
      alert('密码和验证密码不匹配！');
      return;
    }
    console.log('Mock Register Attempt:', { username, password });
    alert('注册功能正在开发中。');
  };

  return (
    <div className="page-container auth-page">
      <h2>注册</h2>
      <p>这是一个模拟页面。注册功能尚未实现。</p>
      
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
            type="password"
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="verifyPassword">验证密码</label>
          <input 
            type="password"
            id="verifyPassword" 
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="button-primary">
          注册
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;