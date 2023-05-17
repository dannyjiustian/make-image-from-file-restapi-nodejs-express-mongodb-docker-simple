/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import server from "./config.js";
import user from "./controller.js";

/**
 * English: call the router function in express
 * Indonesian: panggil fungsi router yang ada di express
 */
const route = server.express.Router();

/**
 * English: defines the url endpoint that will be used
 * Indonesian: mendefinisikan endpoint url yang akan digunakan
 */
const basicURI = `${server.baseURL}`;

/**
 * English: endpoint url for promo app
 * Indonesian: endpoint url untuk promo app
 */
route.get(`${basicURI}/user`, user.index);
route.get(`${basicURI}/user/:id`, user.show);
route.post(`${basicURI}/user`, user.store);
route.put(`${basicURI}/user/:id`, user.update);
route.delete(`${basicURI}/user/:id`, user.destory);

/**
 * English: endpoint url for those not found
 * Indonesian: endpoint url untuk yang tidak ditemukan
 */
route.use("/", server.notFound);

/**
 * English: export route
 * Indonesian: export route
 */
export default route;
