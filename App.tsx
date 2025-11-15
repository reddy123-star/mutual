
import React, { useState } from 'react';
import { User } from './types';
import { USERS } from './constants';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} users={USERS} />;
  }

  return (
    <div className="relative">
      <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      <AIAssistant />
    </div>
  );
};

export default App;
