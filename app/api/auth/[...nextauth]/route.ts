import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Gọi API để lấy danh sách người dùng
          const { data: users } = await axios.get("https://67d709459d5e3a101529cdd3.mockapi.io/api/hihi/users");

          // Tìm người dùng trong danh sách
          const user = users.find((u: any) => u.email === credentials?.email);

          if (!user) throw new Error("Email không tồn tại!");
          if (user.password !== credentials?.password) throw new Error("Mật khẩu không đúng!");

          // Trả về thông tin user nếu hợp lệ
          return { id: user.id, name: user.displayName, email: user.email, organizationId: user.organizationId };
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Lỗi đăng nhập!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.organizationId = user.organizationId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.organizationId = token.organizationId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
