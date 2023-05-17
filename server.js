/**
 * English: imports the modules used
 * Indonesian: mengimpor modul yang digunakan
 */
import server from "./config.js";
import route from "./routes.js";

/**
 * English: configure express
 * Indonesian: konfigurasi express
 */
const app = server.express();
/**
 * English: configuration of modules used
 * Indonesian: konfigurasi modul yang dipakai
 */
app.use(server.cors(server.corsConfig));
app.use(server.bodyParser.json());
app.use(server.bodyParser.urlencoded({ extended: false }));
app.use(server.express.json());
app.use(route);

/**
 * English: start server
 * Indonesian: menjalankan server
 */
server.statusDatabase
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.log(`Connection error ${error.message}`);
    process.exit();
  });

app.listen(3000, () => {
  console.log(
    `(server runing on || server berjalan pada) http://localhost:3000`
  );
});
