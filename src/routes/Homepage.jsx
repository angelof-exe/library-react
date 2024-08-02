import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaWikipediaW } from "react-icons/fa";

function MediaCard({ title, description, imageUrl, wikiUrl }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={imageUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" target="_blank" size="small" href={wikiUrl}>
          <FaWikipediaW size={14 * 2} />
          Wikipedia
        </Button>
      </CardActions>
    </Card>
  );
}

export default function Homepage() {
  const [libri, setLibri] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/api/libri")
      .then((response) => response.json())
      .then((data) => setLibri(data))
      .catch((error) => console.error("Errore nel recupero dei libri:", error));
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {libri.map((libro) => (
          <MediaCard
            key={libro.id}
            title={libro.bookname}
            description={libro.bookdescription}
            imageUrl={libro.image_url || "/static/images/default-book.jpg"}
            wikiUrl={libro.link}
          />
        ))}
      </div>
    </div>
  );
}
