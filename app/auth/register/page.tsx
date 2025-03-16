"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [organizationId, setOrganizationId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/api/auth/register", {
        organizationId,
        email,
        password,
        displayName,
      });

      if (res.status === 201) {
        setSuccess("Đăng ký thành công! Đang chuyển hướng...");
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Lỗi khi đăng ký!");
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Mã tổ chức" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Tên hiển thị" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
