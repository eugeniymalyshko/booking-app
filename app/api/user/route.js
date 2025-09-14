import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з таким логіном вже існує!" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    const { password: newUswrPassword, ...res } = newUser;

    return NextResponse.json(
      {
        user: res,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Щось пішло не так!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello from user route" });
}
