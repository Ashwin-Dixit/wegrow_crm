import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";
import supabase from "@/lib/supabase";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { password, confirmPassword } = form
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      setLoading(false)
      return
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw error
      }
      toast.success("Password updated successfully")
      navigate("/login");
    } catch (error) {
      toast.error("Unable to change password, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdf7ff] via-[#f8f2fa] to-[#e9ddff] flex items-center justify-center p-4">
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
          <p className="text-[14px] text-[#7a7582] mt-1">Reset your password</p>
        </div>

        {/* Card */}
        <div className="bg-[#ffffff] rounded-3xl p-8 elevation-2">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  onClick={(e) => {
                    setShowPass(!showPass);
                  }}
                  className="cursor-pointer"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              required
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Enter confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              icon={<Lock size={16} />}
              iconRight={
                <button
                  type="button"
                  onClick={(e) => {
                    setShowConfirmPass(!showConfirmPass);
                  }}
                  className="cursor-pointer"
                >
                  {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              required
            />

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
                  Updating Password
                </span>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#7a7582] mt-6">
          © 2026 WeGrow CRM · All rights reserved
        </p>
      </div>
    </main>
  );
}
