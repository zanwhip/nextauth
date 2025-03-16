import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { organizationId, email, password, displayName } = await req.json();

    if (!organizationId || !email || !password || !displayName) {
      return NextResponse.json({ error: "Thiếu thông tin!" }, { status: 400 });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const { data: users } = await axios.get("https://67d709459d5e3a101529cdd3.mockapi.io/api/hihi/users");
    if (users.find((user: any) => user.email === email)) {
      return NextResponse.json({ error: "Email đã tồn tại!" }, { status: 400 });
    }

    // Gửi dữ liệu lên API Mock để lưu trữ người dùng
    const newUser = { organizationId, email, password, displayName };
    await axios.post("https://67d709459d5e3a101529cdd3.mockapi.io/api/hihi/users", newUser);

    return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server!" }, { status: 500 });
  }
}
