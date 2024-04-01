import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { loginSchema } from "@/schemas/userSchemas";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validationResult = loginSchema.safeParse(body);

  if (!validationResult.success)
    return NextResponse.json(validationResult.error.errors, { status: 400 });

  let user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  user = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
      name: body.name,
    },
  });

  return NextResponse.json(user);
}
