import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    return session.user;
  } catch (error) {
    return null;
  }
}
