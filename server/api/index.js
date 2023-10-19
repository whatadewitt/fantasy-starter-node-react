import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
import YahooFantasy from "yahoo-fantasy";

const yf = new YahooFantasy(
  process.env.Y_APPLICATION_KEY,
  process.env.Y_APPLICATION_SECRET
);

// super basic api call to get the user games
router.get("/", async (req, res) => {
  console.log("HIT API");
  console.log(req.session);
  // validate the user session is here
  if (!req.session?.accessToken) {
    return res.status(400).send({ err: "not authenticated" });
  }

  // ensure the token is set on the yahoo fantasy object
  yf.setUserToken(req.session.accessToken);

  // call the api
  try {
    const userGames = await yf.user.games();
    return res.send(userGames);
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
