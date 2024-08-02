import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors()); // Permette richieste CORS
app.use(express.json()); // Per gestire i dati JSON

// Configurazione della connessione al database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // Sostituisci con la tua password
  database: "library", // Sostituisci con il nome del tuo database
});

db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connesso al database MySQL");
});

// Endpoint per ottenere i libri dal database
app.get("/api/libri", (req, res) => {
  const sql = "SELECT * FROM book;"; // Assumendo che la tua tabella si chiami 'book'
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Errore durante il recupero dei dati");
      return;
    }
    res.json(result);
  });
});

// Endpoint per aggiungere un nuovo libro al database
app.post("/api/libri", (req, res) => {
  const { bookname, author_name, bookyear, link, bookdescription, image_url } =
    req.body;

  const sql = `
    INSERT INTO book (bookname, author_name, bookyear, link, bookdescription, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [bookname, author_name, bookyear, link, bookdescription, image_url],
    (err, result) => {
      if (err) {
        console.error("Errore durante l'inserimento dei dati:", err);
        res.status(500).send("Errore durante l'inserimento dei dati");
        return;
      }
      res.status(201).send("Libro aggiunto con successo");
    }
  );
});

// Avvio del server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
