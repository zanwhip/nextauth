import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Database giả lập
const users: any[] = [];

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Kiểm tra dữ liệu
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Thiếu thông tin!" }, { status: 400 });
    }

    if (users.find((user) => user.email === email)) {
      return NextResponse.json({ error: "Email đã tồn tại!" }, { status: 400 });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json({ error: "Lỗi server!" }, { status: 500 });
  }
}
