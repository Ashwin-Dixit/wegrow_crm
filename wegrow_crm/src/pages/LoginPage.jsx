import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf7ff] via-[#f8f2fa] to-[#e9ddff] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              alt="logo"
              src="/wegrowfooterlogo.png"
              className="w-30 h-30 object-contain"
            />
          </div>
          <h1 className="text-[32px] font-bold text-[#1d1b20] tracking-tight">
            WeGrow CRM
          </h1>
          <p className="text-[14px] text-[#7a7582] mt-1">
            Sign in to your workspace
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#ffffff] rounded-3xl p-8 elevation-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              icon={<Mail size={16} />}
              required
            />

            <Input
              id="password"
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              icon={<Lock size={16} />}
              iconRight={
                <button
                  type="button"
                  onClick={(e) => { setShowPass(!showPass)}}
                  className="cursor-pointer"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              required
            />

            {/* <div className="flex items-center justify-between text-[12px]">
              <label className="flex items-center gap-2 cursor-pointer text-[#49454f]">
                <input
                  type="checkbox"
                  className="accent-[#6750a4] w-4 h-4 rounded"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-[#6750a4] hover:text-[#4f378a] font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div> */}

            <Button
              type="submit"
              variant="filled"
              size="lg"
              className="w-full rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#e6e0e9] text-center">
            <p className="text-[12px] text-[#7a7582]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#6750a4] hover:text-[#4f378a] font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#7a7582] mt-6">
          © 2026 WeGrow CRM · All rights reserved
        </p>
      </div>
    </div>
  );
}
