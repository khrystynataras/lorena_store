import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Авторизуйтесь у системі", { status: 401 })
    }

    await connectToDB()

    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      return new NextResponse("Користувача не знайдено", { status: 404 })
    }

    const { productId } = await req.json()

    if (!productId) {
      return new NextResponse("Потрібно вказати ID товару", { status: 400 })
    }

    const isLiked = user.wishlist.includes(productId)

    if (isLiked) {
      // Dislike
      user.wishlist = user.wishlist.filter((id: string) => id !== productId)
    } else {
      // Like
      user.wishlist.push(productId)
    }

    await user.save()
    
    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[wishlist_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
