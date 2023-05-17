/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import mongoose from "mongoose";

/**
 * English: function to create schema collection
 * Indonesian: fungsi untuk membuat schema collection
 */
const user = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    number_phone: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

/**
 * English: create a model with the collection that has been created
 * Indonesian: membuat model dengan collection yang telah dibuat
 */
const collectionName = "user";
const colUser = mongoose.model(collectionName, user);

/**
 * English: export model promo app
 * Indonesian: export model promo app
 */
export default colUser;
