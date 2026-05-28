import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  const navigate = useNavigate();

  // State management to preserve details across pages
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    college: ''
  });

  const [profileData, setProfileData] = useState({
    username: '',
    displayName: '',
    selectedAvatar: null,
    customAvatarUrl: null
  });

  // Google OAuth simulation state
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const handleConfirmFinish = () => {
    // Show a browser alert/toast upon completion
    alert(`Success! Profile created for @${profileData.username}`);
    // Reset state & Redirect to home
    setIsGoogleUser(false);
    setRegistrationData({ email: '', password: '', college: '' });
    setProfileData({ username: '', displayName: '', selectedAvatar: null, customAvatarUrl: null });
    navigate('/');
  };

  const handleGoogleSignUpClick = () => {
    setIsGoogleUser(true);

    setRegistrationData({
      email: 'user.google@gmail.com',
      password: 'google-oauth-simulated-token',
      college: ''
    });

    setProfileData({
      username: 'username',
      displayName: 'Google User',
      selectedAvatar: { id: 1, grad: "from-[#8A2387] via-[#E94057] to-[#F27121]", symbol: "💻", name: "Coder" },
      customAvatarUrl: null
    });

    navigate('/profile-setup');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <LandingPage 
            onGoogleSignUp={handleGoogleSignUpClick} 
            onAboutClick={() => navigate('/about')}
            onTermsClick={() => navigate('/terms')}
            onPrivacyClick={() => navigate('/privacy')}
          />
        } 
      />
      <Route 
        path="/profile-setup" 
        element={
          <ProfileSetupPage 
            onBack={() => navigate('/')} 
            profileData={profileData}
            setProfileData={setProfileData}
            onNext={() => navigate('/confirmation')}
            isGoogleUser={isGoogleUser}
          />
        } 
      />
      
      {/* Redirect /register to /profile-setup */}
      <Route path="/register" element={<Navigate to="/profile-setup" replace />} />
      
      <Route 
        path="/confirmation" 
        element={
          <ConfirmationPage 
            onBackToProfile={() => navigate('/profile-setup')} 
            registrationData={registrationData}
            profileData={profileData}
            onConfirm={handleConfirmFinish}
            isGoogleUser={isGoogleUser}
          />
        } 
      />
      
      <Route path="/about" element={<AboutUsPage onBack={() => navigate('/')} />} />
      <Route path="/terms" element={<TermsPage onBack={() => navigate('/')} />} />
      <Route path="/privacy" element={<PrivacyPage onBack={() => navigate('/')} />} />
      
      {/* Fallback to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
