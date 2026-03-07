import { Schema, model, models, type Document, type Model, type Types } from "mongoose";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  slug: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    slug: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => EMAIL_REGEX.test(v),
        message: (props: { value: string }) => `"${props.value}" is not a valid email`,
      },
    },
  },
  { timestamps: true }
);

// Verify that the referenced event exists before saving
BookingSchema.pre("save", async function () {
  if (this.isModified("eventId")) {
    // Dynamically import to avoid circular dependency issues
    const Event = (await import("./event.model")).default;
    const eventExists = await Event.exists({ _id: this.eventId });

    if (!eventExists) {
      throw new Error(`Event with id "${this.eventId}" does not exist`);
    }
  }
});

// Index on eventId for faster booking lookups per event
BookingSchema.index({ eventId: 1 });

const Booking: Model<IBooking> =
  models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
