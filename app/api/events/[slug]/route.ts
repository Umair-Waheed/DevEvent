import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Event from "@/database/event.model";

// Only alphanumeric chars, hyphens, and underscores are valid in a slug
const SLUG_REGEX = /^[\w-]+$/;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || !SLUG_REGEX.test(slug)) {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const event = await Event.findOne({ slug });

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to fetch event", error: e instanceof Error ? e.message : "Unknown" },
      { status: 500 }
    );
  }
}
