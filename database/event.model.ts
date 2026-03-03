import { Schema, model, models, type Document, type Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: {
      type: String,
      required: true,
      enum: ["online", "offline", "hybrid"],
    },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true, validate: (v: string[]) => v.length > 0 },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true, validate: (v: string[]) => v.length > 0 },
  },
  { timestamps: true }
);

EventSchema.pre("save", async function () {
  // Generate a URL-friendly slug from the title only when title changes
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")   // strip non-word chars (except spaces & hyphens)
      .replace(/\s+/g, "-")       // collapse whitespace into hyphens
      .replace(/-+/g, "-");       // collapse consecutive hyphens
  }

  // Normalize date to ISO format (YYYY-MM-DD) if modified
  if (this.isModified("date")) {
    const parsed = new Date(this.date);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Invalid date: "${this.date}"`);
    }
    this.date = parsed.toISOString().split("T")[0];
  }

  // Normalize time to HH:MM 24-hour format if modified
  if (this.isModified("time")) {
    const timeMatch = this.time.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i
    );
    if (!timeMatch) {
      throw new Error(`Invalid time format: "${this.time}"`);
    }

    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2];
    const period = timeMatch[3]?.toUpperCase();

    // Convert 12-hour to 24-hour if AM/PM is present
    if (period) {
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    }

    this.time = `${String(hours).padStart(2, "0")}:${minutes}`;
  }
});

// Ensure fast lookups by slug
EventSchema.index({ slug: 1 }, { unique: true });

const Event: Model<IEvent> = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
