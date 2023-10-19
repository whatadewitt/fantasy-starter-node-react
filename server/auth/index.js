import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
import YahooFantasy from "yahoo-fantasy";

const yf = new YahooFantasy(
  process.env.Y_APPLICATION_KEY,
  process.env.Y_APPLICATION_SECRET,
  null,
  process.env.Y_REDIRECT_URL
);

// define route for user login check
router.get("/check", async (req, res) => {
  const access_token = req.session?.accessToken;

  if (access_token) {
    return res.send({ logged_in: 1 });
  } else {
    return res.send(null);
  }
});

// define route for authentication
router.get("/", (_, res) => {
  return yf.auth(res);
});

// define route for auth callback
// you could "technically" have the redirect uri be to your client
// and then send all of this data to the backend to be stored, but
// this example is sending us back to the node backend and then that
// will send us back to the front with the session in hand
router.get("/callback", (req, res) => {
  yf.authCallback(req, (err, { access_token, refresh_token }) => {
    if (err) {
      return res.status(400).json({ err });
    }

    // here's some stuff you could do to get some user info... might need a scope for it
    // const options = {
    //   url: "https://api.login.yahoo.com/openid/v1/userinfo",
    //   method: "get",
    //   json: true,
    //   auth: {
    //     bearer: access_token,
    //   },
    // }

    // request(options, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     const user = {
    //       id: body.sub,
    //       name: body.nickname,
    //       avatar: body.profile_images.image64,
    //     }
    //   }
    // })

    // big thing, you need these tokens to query the api
    // and refresh that token -- that said, in a real app
    // you would want to persist this to something a little
    // more permanent
    if (req.session) {
      console.log("storing session data");
      req.session.accessToken = access_token;
      req.session.refreshToken = refresh_token;
    }
    console.log(req.session);

    // I wouldn't recommend returning the access token here,
    // but if you want to see it, there ya go... I guess you
    // could manually attach it to requests from the front end
    // but I would HIGHLY recommend against exposing it
    return res.redirect(process.env.CLIENT_REDIRECT_URL);
  });
});

// define route for user logout
router.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.accessToken = null;
    req.session.refreshToken = null;
  }

  return res.send({ ok: 1 });
});

export default router;
