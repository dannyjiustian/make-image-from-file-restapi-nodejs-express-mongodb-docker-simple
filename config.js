/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose, { isValidObjectId } from "mongoose";
import bodyParser from "body-parser";
import joi from "joi";

/**
 * English: configure read env
 * Indonesian: konfigurasi baca env
 */
dotenv.config();

/**
 * English: read file enviroment for url
 * Indonesian: baca file enviroment untuk url
 */
const baseURL = `${process.env.BASE_URL}${process.env.BASE_URL_VERSION}`;

/**
 * English: add-on configuration
 * Indonesian: konfigurasi tambahan
 */
const hostConfig = `${process.env.HOST_DATABASE || "localhost:80/"}${
  process.env.DATABASE_NAME || "/test"
}`;

const corsConfig = {
  origin: "*",
};

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * English: functions that will be used in the server
 * Indonesian: fungsi-fungsi yang akan digunakan di server
 */
const statusDatabase = mongoose.connect(hostConfig, mongooseConfig);

const notFound = (req, res) => {
  res.status("404");
  res.send("not found");
};

const sendResponse = (status, message, response = []) => {
  const payload = {
    status: status,
    message: message,
  };
  if (
    Object.keys(response).length > 0 ||
    (typeof response !== "undefined" && response.length > 0)
  )
    payload.data = response;

  return payload;
};

const responseServer400 = (res, msg) =>
  res.status(400).json(sendResponse(false, msg));

const responseServer404 = (res, msg) =>
  res.status(404).json(sendResponse(false, msg));

const responseServer200 = (res, msg, data = "") =>
  res.status(200).json(sendResponse(true, msg, data));

const responseServer500 = (res, msg, data = "") =>
  res.status(500).json(sendResponse(false, msg, data));

const validateReqUser = (requestData) => {
  const userSchema = joi
    .object({
      fullname: joi.string().required(),
      username: joi.string().required(),
      email: joi.string().required(),
      number_phone: joi.number().required().integer(),
    })
    .options({ abortEarly: false });
  return userSchema.validate(requestData);
};

const checkValidation = (res, response_error, validationFunction) => {
  const { error } = validationFunction;
  if (error)
    error.details.forEach((err_msg) => {
      response_error[err_msg.path[0]] = err_msg.message;
    });
  if (Object.keys(response_error).length > 0) {
    return responseServer500(
      res,
      "failed to process endpoint",
      JSON.parse(JSON.stringify(response_error).replace(/\\"/g, ""))
    );
  }
};

/**
 * English: export configuration
 * Indonesian: export konfigurasi
 */
export default {
  express,
  cors,
  bodyParser,
  baseURL,
  corsConfig,
  statusDatabase,
  notFound,
  responseServer200,
  responseServer400,
  responseServer404,
  responseServer500,
  validateReqUser,
  isValidObjectId,
  checkValidation,
};
