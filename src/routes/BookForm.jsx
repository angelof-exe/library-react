import { Form, useNavigate } from "react-router-dom";

export default function BookForm() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const bookData = {
      bookname: formData.get("nome"),
      author_name: formData.get("autore"),
      bookyear: formData.get("anno"),
      link: formData.get("wikipedia"),
      bookdescription: formData.get("descrizione"),
      image_url: formData.get("immagine"),
    };

    try {
      const response = await fetch("http://localhost:3001/api/libri", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        alert("Libro aggiunto con successo!");
        navigate("/"); // Torna alla homepage o dove preferisci
      } else {
        alert("Errore durante l'aggiunta del libro");
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
      alert("Errore durante la richiesta");
    }
  };

  return (
    <Form method="post" id="book-form" onSubmit={handleSubmit}>
      <p>
        <label>
          <span>Nome del Libro</span>
          <input
            type="text"
            name="nome"
            placeholder="Inserisci il nome del libro"
            aria-label="Nome del libro"
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Autore</span>
          <input
            type="text"
            name="autore"
            placeholder="Inserisci il nome dell'autore"
            aria-label="Nome dell'autore"
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Anno di Uscita</span>
          <input
            type="number"
            name="anno"
            placeholder="Inserisci l'anno di uscita"
            aria-label="Anno di uscita"
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Descrizione</span>
          <textarea
            name="descrizione"
            rows={4}
            placeholder="Inserisci una descrizione del libro"
            aria-label="Descrizione"
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Link Wikipedia</span>
          <input
            type="url"
            name="wikipedia"
            placeholder="https://it.wikipedia.org/wiki/Nome_del_libro"
            aria-label="Link Wikipedia"
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span>Link dell'Immagine</span>
          <input
            type="url"
            name="immagine"
            placeholder="https://esempio.com/immagine.jpg"
            aria-label="Link dell'immagine"
            required
          />
        </label>
      </p>
      <p>
        <button type="submit">Salva</button>
        <button type="button" onClick={() => navigate(-1)}>
          Annulla
        </button>
      </p>
    </Form>
  );
}
