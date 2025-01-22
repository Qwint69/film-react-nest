// import { Schema, Document } from 'mongoose';

// export interface Schedule {
//   id: string;
//   daytime: string;
//   hall: number;
//   rows: number;
//   seats: number;
//   price: number;
//   taken: string[];
// }

// export interface Film extends Document {
//   id: string;
//   title: string;
//   rating: number;
//   director: string;
//   tags: string[];
//   image: string;
//   cover: string;
//   about: string;
//   description: string;
//   schedule: Schedule[];
// }

// export const FilmSchema = new Schema<Film>({
//   id: { type: String, required: true, unique: true },
//   title: { type: String, required: true },
//   rating: { type: Number, required: true },
//   director: { type: String, required: true },
//   tags: { type: [String], required: true },
//   image: { type: String, required: true },
//   cover: { type: String, required: true },
//   about: { type: String, required: true },
//   description: { type: String, required: true },
//   schedule: [
//     {
//       id: { type: String, required: true },
//       daytime: { type: String, required: true },
//       hall: { type: Number, required: true },
//       rows: { type: Number, required: true },
//       seats: { type: Number, required: true },
//       price: { type: Number, required: true },
//       taken: { type: [String], required: true },
//     },
//   ],
// });
