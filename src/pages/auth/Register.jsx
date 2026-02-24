import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';
import { userService } from '../../services/userService';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { toast } from 'sonner';
import './Auth.css';

const Register = ({ onToggle }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await userService.register(formData);
      toast.success('Registration successful! Please login.');
      onToggle();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
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

      <div className="auth-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card-wrapper"
        >
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
            <p className="auth-subtitle">Create your professional account</p>
          </div>

          <div className="auth-card">
            <form onSubmit={handleSubmit} className="auth-form">
              <InputField
                label="Full Name"
                type="text"
                icon={<UserIcon size={18} />}
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />

              <InputField
                label="Email Address"
                type="email"
                icon={<Mail size={18} />}
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <InputField
                label="Password"
                type="password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <InputField
                label="Confirm Password"
                type="password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                Create Account
              </Button>
            </form>

            <p className="auth-toggle">
              Already have an account?
              <button type="button" onClick={onToggle} className="auth-toggle-btn">
                Sign In
              </button>
            </p>
          </div>

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

export default Register;
