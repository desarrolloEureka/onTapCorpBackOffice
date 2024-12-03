import { messaging } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import initFirebase from "shared/firebase/admin";
import scheduleBirthdayNotifications from "./scheduledTasks";

initFirebase();
scheduleBirthdayNotifications();

interface BodyInterface {
  token: String;
  title: String;
  body: String;
  image: String;
  color: String;
}

export async function POST(req: NextRequest) {
  const { token, title, body, image }: BodyInterface = await req.json();
  const message = {
    token,
    notification: {
      title,
      body,
      image,
    },
  };
  try {
    await messaging().send(message as any);
    return NextResponse.json({ status: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: false, error }, { status: 400 });
  }
}
