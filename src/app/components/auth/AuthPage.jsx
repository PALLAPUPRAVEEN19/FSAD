import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { toast } from "sonner";

export const AuthPage = () => {
  const { login } = useAuth();

  const [authType, setAuthType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    if (authType === "login") {
      let role = "user";

      if (formData.email.includes("pro@")) role = "professional";
      else if (formData.email.includes("support@")) role = "support";
      else if (formData.email.includes("admin@")) role = "admin";

      const mockUser = {
        id: Date.now().toString(),
        fullName:
          formData.fullName ||
          formData.email.split("@")[0],
        role,
        email: formData.email,
        avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
        joinedDate: new Date().toISOString()
      };

      login(mockUser);

      toast.success("Welcome back!", {
        description: mockUser.fullName
      });
    } else {
      toast.success("Account created");
      setAuthType("login");
    }

    setLoading(false);
  };

  const quickLoginOptions = [
    { role: "user", email: "user@demo.com", label: "Client" },
    { role: "professional", email: "pro@demo.com", label: "Professional" },
    { role: "support", email: "support@demo.com", label: "Support" },
    { role: "admin", email: "admin@demo.com", label: "Admin" }
  ];

  const handleQuickLogin = (email) => {
    setFormData({ ...formData, email, password: "demo123" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-indigo-600">
            ServicePro
          </h1>

          <p className="text-gray-600">
            {authType === "login"
              ? "Welcome back"
              : "Create your account"}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">

          <AnimatePresence mode="wait">

            <motion.form
              key={authType}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: authType === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: authType === "login" ? 20 : -20 }}
              className="space-y-5"
            >

              {authType === "register" && (
                <div>
                  <label className="text-xs font-bold text-gray-500">
                    Full Name
                  </label>

                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />

                    <input
                      className="w-full pl-10 p-3 border rounded-xl"
                      placeholder="John Doe"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-500">
                  Email
                </label>

                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

                  <input
                    type="email"
                    className="w-full pl-10 p-3 border rounded-xl"
                    placeholder="name@email.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500">
                  Password
                </label>

                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 p-3 border rounded-xl"
                    placeholder="••••••"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button type="submit" fullWidth loading={loading}>
                {authType === "login" ? "Sign In" : "Create Account"}
              </Button>

            </motion.form>

          </AnimatePresence>

          {authType === "login" && (
            <div className="mt-6">

              <p className="text-center text-xs text-gray-400 mb-3">
                Quick Demo Login
              </p>

              <div className="grid grid-cols-2 gap-2">
                {quickLoginOptions.map((o) => (
                  <button
                    key={o.role}
                    onClick={() => handleQuickLogin(o.email)}
                    className="p-2 border rounded-lg text-xs"
                  >
                    {o.label}
                  </button>
                ))}
              </div>

            </div>
          )}

          <p className="text-center mt-6 text-sm">
            {authType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              className="ml-2 text-indigo-600 font-bold"
              onClick={() =>
                setAuthType(authType === "login" ? "register" : "login")
              }
            >
              {authType === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>

        </div>

      </motion.div>
    </div>
  );
};