import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { toast } from 'sonner';
import './Auth.css';

const Login = ({ onToggle }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await userService.login(formData.email, formData.password);
      login(userData);
      toast.success(`Welcome back, ${userData.fullName}!`);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email) => {
    setFormData({ email, password: 'demo123' });
  };

  const quickLogins = [
    { email: 'user@demo.com', label: 'Client', role: 'user' },
    { email: 'pro@demo.com', label: 'Professional', role: 'professional' },
    { email: 'support@demo.com', label: 'Support', role: 'support' },
    { email: 'admin@demo.com', label: 'Admin', role: 'admin' }
  ];

  return (
    <div className="auth-container">
      {/* Animated background */}
      <div className="auth-background">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="auth-bg-element auth-bg-1"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="auth-bg-element auth-bg-2"
        />
      </div>

      {/* Main content */}
      <div className="auth-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card-wrapper"
        >
          {/* Logo */}
          <div className="auth-header">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="auth-logo-icon"
            >
              <Sparkles size={24} />
            </motion.div>
            <h1 className="auth-title">ServicePro</h1>
            <p className="auth-subtitle">Welcome back to your professional hub</p>
          </div>

          {/* Form */}
          <div className="auth-card">
            <form onSubmit={handleSubmit} className="auth-form">
              <InputField
                label="Email Address"
                type="email"
                icon={<Mail size={18} />}
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <div className="auth-password-field">
                <InputField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  icon={<Lock size={18} />}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                Sign In
              </Button>
            </form>

            {/* Quick login */}
            <div className="auth-quick-login">
              <p className="auth-quick-login-title">Quick Demo Login</p>
              <div className="auth-quick-login-grid">
                {quickLogins.map((option) => (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => handleQuickLogin(option.email)}
                    className="auth-quick-login-btn"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle */}
            <p className="auth-toggle">
              Don't have an account?
              <button type="button" onClick={onToggle} className="auth-toggle-btn">
                Sign Up
              </button>
            </p>
          </div>

          {/* Features */}
          <div className="auth-features">
            {['Trusted by 50K+', 'Bank-level Security', '24/7 Support'].map((feature, index) => (
              <div key={index} className="auth-feature">
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
