const router = require('express').Router();
const { Resend } = require("resend");
const resend = new Resend("re_KsCiduGB_TayFHBXyYP15hda7anr6AFck");

router.get("/", async (req, res) => {
    try {
        const name = req.body.username;
        const email = req.body.email;
        const data = await resend.emails.send({
            from: "Nexus Social <delivered@resend.dev>",
            to: [email],
            subject: "Welcome to Nexus Social !!",
            html: `Hey ${name} <br />
                <h2>Welcome to <b style="color:#8B475D">Nexus social</b></h2>
                <p>Enjoy the new journey of joy, Keep posting 😃`,
        });
        res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.post("/admin", async (req, res) => {
    try {
        const user = req.body;
        const data = await resend.emails.send({
            from: "Nexus Social <delivered@resend.dev>",
            to: ["reshavdhiman67@gmail.com"],
            subject: "New member !!",
            html: `Hey Hemant <br />
                <h3>${ user.firstname } ${ user.lastname } joined <b style="color:#8B475D">Nexus social</b></h3>
                <a href="https://nexus-s0cial.netlify.app/profile/${ user.username }">Welcome them 😃</a>`,
        });
        res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  module.exports = router;