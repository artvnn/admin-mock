const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const users = require("./db/users");
const usersList = Object.keys(users).map(k => users[k]);
const fs = require("fs");

// Helpers
const deletePassword = user => {
  const {id, name, designation} = user;
  return {id, name, designation};
};

// Authentication using passport basic strategy
app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  done(null, users[userId]);
});
passport.use(
  new BasicStrategy((username, password, done) => {
    if (users[username]) {
      const user = users[username];
      if (user.password !== password) {
        done(null, false);
      } else {
        done(null, user);
      }
    } else done(null, false);
  }),
);
app.post("/api/sessions", (req, res, next) => {
  passport.authenticate("basic", {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Invalid username/password");
    }
    let result = deletePassword(user);
    // All other users will be added as contacts
    result.contacts = usersList
      .filter(u => u.id !== user.id)
      .map(u => deletePassword(u));
    res.json(result);
  })(req, res, next);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// API end points
function loadUserDB(userId) {
  const dbFile = path.resolve(`./db/${userId}.json`);
  if (!fs.existsSync(dbFile)) return {next: {in: 1, out: 1}, in: [], out: []};
  return JSON.parse(fs.readFileSync(dbFile));
}
function saveUserDB(userId, db) {
  const dbFile = path.resolve(`./db/${userId}.json`);
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}
function unique(arr) {
  return arr.filter(function(item, pos) {
    return arr.indexOf(item) == pos;
  });
}

app.post("/api/mailbox/send", (req, res, next) => {
  passport.authenticate("basic", {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Invalid username/password");
    }
    try {
      // Add time
      const mail = {
        ...req.body,
        from: {id: user.id, name: user.name},
        time: new Date(),
      };
      const mailWithFlag = {...mail, isViewed: false};
      // Send to everyone
      unique(mail.to.concat(mail.cc)).forEach(target => {
        let targetDB = loadUserDB(target.id);
        let nextId = targetDB.next.in;
        targetDB.next.in += 1;
        targetDB.in.push({
          ...mailWithFlag,
          id: nextId,
        });
        saveUserDB(target.id, targetDB);
      });
      // Save in my outbox
      let myDB = loadUserDB(user.id);
      let nextId = myDB.next.out;
      myDB.next.out += 1;
      myDB.out.push({
        ...mail,
        id: nextId,
      });
      saveUserDB(user.id, myDB);
      res.json({});
    } catch (err) {
      return res.status(500).send(err);
    }
  })(req, res, next);
});

app.post("/api/mailbox", (req, res, next) => {
  passport.authenticate("basic", {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Invalid username/password");
    }
    try {
      res.json(loadUserDB(user.id));
    } catch (err) {
      return res.status(500).send(err);
    }
  })(req, res, next);
});

app.post("/api/mailbox/view", (req, res, next) => {
  passport.authenticate("basic", {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Invalid username/password");
    }
    try {
      const mailId = req.body.mailId;
      let myDB = loadUserDB(user.id);
      myDB.in.forEach(mail => {
        if (mail.id === mailId) mail.isViewed = true;
      });
      saveUserDB(user.id, myDB);
      res.json({});
    } catch (err) {
      return res.status(500).send(err);
    }
  })(req, res, next);
});

app.post("/api/mailbox/delete", (req, res, next) => {
  passport.authenticate("basic", {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Invalid username/password");
    }
    try {
      let myDB = loadUserDB(user.id);
      if (req.body.isInbox) {
        myDB.in = myDB.in.filter(
          mail => req.body.selectedIds.indexOf(mail.id) < 0,
        );
      } else {
        myDB.out = myDB.out.filter(
          mail => req.body.selectedIds.indexOf(mail.id) < 0,
        );
      }
      saveUserDB(user.id, myDB);
      res.json({});
    } catch (err) {
      return res.status(500).send(err);
    }
  })(req, res, next);
});

// Client is served from here
app.use("/", express.static("public"));
app.use((req, res, next) => {
  res.status(404);
  // This is required for client side routing
  res.sendFile(path.resolve("./public/", "index.html"));
});

// Start
app.listen(PORT, () => {
  console.log(`Admin Server Mock running on port ${PORT}`);
});
