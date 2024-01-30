import cors from "cors";
import express, { Request, Response } from "express";
const app = express();
const port = 3000;
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  return res.send("Please provide an ICAO code");
});

app.get("/:icao", async (req: Request, res: Response) => {
  const icao = req.params.icao;
  if (icao.length > 4) {
    return res.status(400).send("ICAO code must be 4 characters");
  }

  if (icao === "") {
    return res.status(400).send("Please provide an ICAO code");
  }

  const response = await fetch(
    `https://tgftp.nws.noaa.gov/data/observations/metar/stations/${icao}.TXT`
  );

  if (response.body === null) {
    return res.status(404).send("ICAO code not found");
  }

  const metar = (await response.text()).split("\n")[1];

  return res.send(metar);
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
