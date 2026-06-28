# Backend Basics — Catalyst Notes

> A from-scratch reference for understanding the backend.
> Every concept has **two explanations**:
> - 🧑‍💻 **Technical** — the real syntax/definition.
> - 🧒 **Explain-like-I'm-10** — a plain-language picture.

---

## 0. The one mental model to keep

The whole backend is a loop:

```
request comes in  →  server figures out what's being asked  →  server sends a response back
```

Everything below is just detail hanging off that single cycle. If you ever feel lost,
come back to this line.

🧒 **ELI10:** The backend is a **waiter** in a restaurant. You (the frontend) ask for
food (a request). The waiter goes to the kitchen, gets it, and brings it back (a
response). That's the whole job — take orders, bring things back.

---

## 1. Terminology

### Server
🧑‍💻 A program that runs continuously, listening on a **port**, waiting for incoming
requests and sending back responses. In Node, you create one with Express:

```js
const express = require("express");
const app = express();
app.listen(3001, () => console.log("listening on port 3001"));
```

🧒 A waiter who never goes home. He stands at a numbered door (the port) and waits for
people to walk up and ask for something.

---

### Port
🧑‍💻 A numbered "door" on your computer where a server listens. `3001`, `5173`, `8080`
are all ports. Two programs can't use the same port at once.

🧒 An apartment building has one address, but many numbered doors. Knock on door **3001**
and the backend waiter answers. Knock on door **5173** and the frontend answers.

---

### Origin
🧑‍💻 The combination of **protocol + host + port**, e.g. `http://localhost:3001`.
Change any of the three and it's a *different* origin.

🧒 A full home address. "Same street, different door number" still counts as a
**different house** to the security guard (the browser).

---

### HTTP
🧑‍💻 The rules (protocol) for how requests and responses are formatted on the web. A
request has a **method**, a **URL**, **headers**, and (sometimes) a **body**.

🧒 The agreed-upon *language* the customer and waiter both speak so they understand each
other. Without it, the waiter wouldn't know what "I'd like the soup" means.

---

### Request (`req`) and Response (`res`)
🧑‍💻 Two objects Express hands you in every route. `req` holds what the client sent;
`res` is how you send something back.

```js
app.get("/api/jobs", (req, res) => {
  console.log(req.query);          // what the client asked for
  res.json({ jobs: [] });          // what you send back
});
```

🧒 `req` is the **order slip** the customer wrote. `res` is the **plate** you carry back
to their table.

---

## 2. HTTP Methods (verbs)

🧑‍💻 The "verb" of a request — what kind of action is wanted.

| Method | Meaning | Example |
|--------|---------|---------|
| GET | read / fetch data | get all jobs |
| POST | create new data | add a job |
| PUT/PATCH | update existing data | change a job's status |
| DELETE | remove data | delete a job |

```js
app.get("/api/jobs", handler);     // read
app.post("/api/jobs", handler);    // create
app.put("/api/jobs/:id", handler); // update
app.delete("/api/jobs/:id", handler); // delete
```

🧒 At the restaurant:
- **GET** = "show me the menu" (just looking)
- **POST** = "add a new dish to the menu"
- **PUT** = "change the recipe of a dish"
- **DELETE** = "take that dish off the menu"

---

## 3. Status Codes

🧑‍💻 A 3-digit number on every response telling the client how it went.

| Range | Meaning | Common ones |
|-------|---------|-------------|
| 2xx | Success | 200 OK, 201 Created |
| 4xx | Client made a mistake | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| 5xx | Server made a mistake | 500 Internal Server Error |

```js
res.status(201).json({ created: true });  // success, made something
res.status(404).json({ error: "not found" });
```

🧒 The waiter's face when he comes back:
- **200s** = smiling, here's your food 🙂
- **400s** = "*you* ordered something that doesn't exist" 🤨
- **500s** = "the *kitchen* caught fire, sorry" 🔥

---

## 4. Routing

🧑‍💻 Mapping a **method + URL path** to a function that handles it.

```js
app.get("/api/ping", (req, res) => {
  res.json({ ok: true });
});
```

This says: *when a GET request hits `/api/ping`, run this function.*

🧒 A signpost system. "If someone asks for the **bathroom**, send them left. If they ask
for the **exit**, send them right." Each path has its own direction.

---

## 5. Middleware

🧑‍💻 Functions that run **in between** the request arriving and your route sending a
response. They can read/modify `req`/`res`, then call `next()` to pass control along.

```js
app.use(express.json());   // built-in: parses JSON request bodies
app.use(cors());           // allows cross-origin requests

// custom logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();   // hand off to the next step
});
```

🧒 Security guards and helpers standing in the hallway *before* you reach the waiter. One
checks your ID, one writes your name in a logbook, one translates your order into the
kitchen's language. Each does its bit, then waves you through (`next()`).

---

## 6. REST API + JSON

🧑‍💻 **REST** is a popular convention for designing API routes around "resources"
(things, like jobs). **JSON** is the text format used to send data.

```js
// REST-style routes for the "jobs" resource:
GET    /api/jobs        // list all
GET    /api/jobs/:id    // get one
POST   /api/jobs        // create
PUT    /api/jobs/:id    // update
DELETE /api/jobs/:id    // delete

// JSON looks like:
{ "id": "1", "company": "Acme", "status": "applied" }
```

🧒 REST is an agreed-upon *menu layout* every restaurant uses, so customers always know
where to look. JSON is the *language on the menu* — neat labels everyone can read.

---

## 7. CRUD + Database

🧑‍💻 **CRUD** = Create, Read, Update, Delete — the four basic things you do to stored
data. A database stores it permanently (unlike memory, which is wiped on restart).
Catalyst uses `better-sqlite3`.

```js
const db = require("better-sqlite3")("catalyst.db");

// Create
db.prepare("INSERT INTO jobs (company) VALUES (?)").run("Acme");
// Read
const jobs = db.prepare("SELECT * FROM jobs").all();
// Update
db.prepare("UPDATE jobs SET status = ? WHERE id = ?").run("offer", 1);
// Delete
db.prepare("DELETE FROM jobs WHERE id = ?").run(1);
```

🧒 A filing cabinet. **Create** = put a new folder in. **Read** = take one out and look.
**Update** = cross something out and rewrite it. **Delete** = shred it. Unlike a sticky
note on your hand (memory), the cabinet still has your files tomorrow.

---

## 8. Environment Variables & Secrets

🧑‍💻 Values (especially secret keys) kept **outside** your code, in a `.env` file that is
**never committed to git**. Loaded with `dotenv`.

```js
require("dotenv").config();
const apiKey = process.env.ANTHROPIC_API_KEY;
```

```
# .env  (add this file to .gitignore!)
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

🧒 Your house key doesn't get drawn on the outside of the house for everyone to copy. You
keep it in your pocket (`.env`) and only *you* can grab it when needed.

---

## 9. Async / await

🧑‍💻 Most backend work (database queries, API calls, file reads) takes *time* and happens
**asynchronously**. `async/await` lets you write it as if it were sequential.

```js
app.get("/api/cover-letter", async (req, res) => {
  try {
    const result = await callAnthropicAPI();  // waits without freezing the server
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "generation failed" });
  }
});
```

🧒 You put bread in the toaster and **don't stand frozen staring at it** — you can do
other things, and `await` is you coming back exactly when it pops. `try/catch` is having
oven mitts ready in case it burns.

---

## 10. CORS / Proxy (frontend ↔ backend)

🧑‍💻 Because frontend (`:5173`) and backend (`:3001`) are **different origins**, the
browser blocks calls by default (Same-Origin Policy). Fix with either:

```js
// Option A — CORS on the backend (works in prod too)
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));
```

```js
// Option B — Vite dev proxy (dev only), in vite.config.ts
server: {
  proxy: { "/api": "http://localhost:3001" }
}
```

🧒 The browser is a strict **security guard** who won't let a stranger from House A walk
into House B. **CORS** = House B hangs a sign saying "guests from House A welcome." **Proxy**
= House A digs a secret tunnel so it *looks* like everyone's in the same house.

---

## 11. The request/response cycle — full picture

```
[ Browser :5173 ]
      |  fetch("/api/jobs")
      v
[ Vite proxy ]  ── forwards ──>  [ Express :3001 ]
                                       |
                            middleware runs (cors, json, logging)
                                       |
                            router matches GET /api/jobs
                                       |
                            handler queries the database
                                       |
                            res.json(jobs)  ── 200 ──>  back to browser
```

🧒 You shout your order across the street → it goes through the tunnel → guards check it →
the waiter finds your dish → cooks grab it from the cabinet → the plate travels all the
way back to your table. One full trip = one request/response cycle.

---

## 12. A confidence-building order to learn things

1. ✅ Spin up a server and hit one route (`/api/ping`) — *done*.
2. Add `express.json()` and a `POST` route that echoes `req.body` back.
3. Connect `better-sqlite3`; do one **Create** and one **Read**.
4. Build full CRUD for **jobs**.
5. Wire the frontend to it (fetch) — hit the CORS wall, fix it.
6. Move secrets into `.env`.
7. Add an async route that calls the Anthropic API (cover letter generation).
8. Add error handling + proper status codes everywhere.

Learn each concept **when you reach it**, not all at once. You already did step 1 — that's
the hardest psychological hurdle. The rest is repetition.
