import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";
import { resetPasswordService } from "@/services/authService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: ""});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email } = form
    try {
      const data = await resetPasswordService({email})
      setEmailSent(data.success)
      toast.success("Reset email sent")
    } catch (error) {
        console.log(error)
      toast.error("Unable to reset password, try again");
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
              id="email"
              label="Enter Email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              icon={<Mail size={16} />}
              required
            />

            {emailSent ? (
              <div className="p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl flex items-start gap-3 animate-in fade-in zoom-in duration-300">
                <div className="p-2 bg-[#dcfce7] rounded-full shrink-0">
                  <Mail className="w-4 h-4 text-[#166534]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#166534]">Reset email sent</p>
                  <p className="text-[13px] text-[#15803d] mt-1">
                    A password reset link has been sent to <span className="font-semibold">{form.email}</span>.
                  </p>
                </div>
              </div>
            ) : (
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
            )}
          </form>
        </div>

        <p className="text-center text-[11px] text-[#7a7582] mt-6">
          © 2026 WeGrow CRM · All rights reserved
        </p>
      </div>
    </main>
  );
}
