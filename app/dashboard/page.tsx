"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/auth/login");
    return <p>Đang chuyển hướng...</p>;
  }

  return (
    <div>
      <h2>Chào mừng, {session.user?.email}!</h2>
      <button onClick={() => signOut()}>Đăng Xuất</button>
    </div>
  );
};

export default DashboardPage;
