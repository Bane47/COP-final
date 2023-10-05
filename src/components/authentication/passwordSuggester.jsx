import { Button, Input } from '@mui/material';
import React, { useState } from 'react';

const generateRandomPassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
};

const PasswordSuggester = () => {
  const [password, setPassword] = useState("");

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(16);
    setPassword(newPassword);
  };

  return (
    <div>
     
      <div>
        <Button onClick={handleGeneratePassword}>Generate Password</Button>
      </div>
      {password && (
        <div>

          <Input
            type="text"
            value={password}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default PasswordSuggester;
