/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import user from "./model.js";
import server from "./config.js";

let response_error = {};
/**
 * English: functions that will be used in the endpoint
 * Indonesian: fungsi-fungsi yang akan digunakan di endpoint
 */

const index = (req, res) =>
  user
    .find()
    .then((result) => {
      if (result.length === 0) {
        server.responseServer404(res, "No data user in database");
      } else {
        server.responseServer200(
          res,
          "There is all data user from database",
          result
        );
      }
    })
    .catch((error) => {
      server.responseServer500(res, "error retrieve data user", error.message);
    });

const show = (req, res) =>
  server.isValidObjectId(req.params.id)
    ? user
        .find({ _id: req.params.id })
        .then((result) => {
          if (result.length === 0) {
            server.responseServer404(res, "No data user in database");
          } else {
            server.responseServer200(
              res,
              "There is all data user from database",
              result
            );
          }
        })
        .catch((error) =>
          server.responseServer500(
            res,
            "error retrieve data user",
            error.message
          )
        )
    : server.responseServer500(res, `invalid id entered: ${req.params.id}`);

const store = (req, res) => {
  response_error = {};
  server.checkValidation(res, response_error, server.validateReqUser(req.body));

  if (Object.keys(response_error).length === 0) {
    user
      .create(req.body)
      .then((result) =>
        server.responseServer200(
          res,
          "successfully added new data user",
          result
        )
      )
      .catch((error) =>
        server.responseServer500(
          res,
          "error added new data user",
          error.message
        )
      );
  }
};

const update = (req, res) => {
  response_error = {};
  if (server.isValidObjectId(req.params.id)) {
    server.checkValidation(
      res,
      response_error,
      server.validateReqUser(req.body)
    );

    if (Object.keys(response_error).length === 0) {
      user
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
          if (!result) {
            server.responseServer404(
              res,
              `ID ${req.params.id} not registered in database`
            );
          } else {
            user
              .find({ _id: req.params.id })
              .then((result) => {
                server.responseServer200(
                  res,
                  "successfully update data user",
                  result
                );
              })
              .catch((error) =>
                server.responseServer500(
                  res,
                  "error retrieve data user",
                  error.message
                )
              );
          }
        })
        .catch((error) =>
          server.responseServer500(res, "error update data user", error.message)
        );
    }
  } else {
    server.responseServer500(res, `invalid id entered: ${req.params.id}`);
  }
};

const destory = (req, res) =>
  server.isValidObjectId(req.params.id)
    ? user
        .findByIdAndRemove(req.params.id)
        .then((result) => {
          if (!result) {
            server.responseServer404(
              res,
              `ID ${req.params.id} not registered in database`
            );
          } else {
            server.responseServer200(res, "successfully destory data user");
          }
        })
        .catch((error) =>
          server.responseServer500(
            res,
            "error destroy specific promo app data",
            error.message
          )
        )
    : server.responseServer500(res, `invalid id entered: ${req.params.id}`);

/**
 * English: export function crud
 * Indonesian: export fungsi crud
 */
export default {
  index,
  show,
  store,
  update,
  destory,
};
