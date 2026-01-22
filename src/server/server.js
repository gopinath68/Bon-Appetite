// server.mjs
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// custom filter middleware for /receipes
server.get("/receipes", (req, res) => {
  const db = router.db; // lowdb instance
  let data = db.get("receipes").value();

  // full-text search ?q=...
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    data = data.filter((r) =>
      Object.values(r).some((v) => {
        if (typeof v === "string") return v.toLowerCase().includes(q);
        if (Array.isArray(v))
          return v.some((i) => String(i).toLowerCase().includes(q));
        return false;
      }),
    );
  }

  // exact name ?name=...
  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    data = data.filter((r) => String(r.name || "").toLowerCase() === name);
  }

  // substring name ?name_like=...
  if (req.query.name_like) {
    const needle = req.query.name_like.toLowerCase();
    data = data.filter((r) =>
      String(r.name || "")
        .toLowerCase()
        .includes(needle),
    );
  }

  // category exact(s) ?category=Dessert  OR ?category=Dessert&category=Chicken
  if (req.query.category) {
    const qs = Array.isArray(req.query.category)
      ? req.query.category
      : [req.query.category];
    const lowerQs = qs.map((s) => String(s).toLowerCase());
    data = data.filter((r) => {
      if (!Array.isArray(r.category)) return false;
      const lowerCats = r.category.map((c) => String(c).toLowerCase());
      // use .every → AND; replace with .some for OR
      return lowerQs.every((q) => lowerCats.includes(q));
    });
  }

  // category_like ?category_like=Des
  if (req.query.category_like) {
    const qs = Array.isArray(req.query.category_like)
      ? req.query.category_like
      : [req.query.category_like];
    const lowerQs = qs.map((s) => String(s).toLowerCase());
    data = data.filter((r) => {
      if (!Array.isArray(r.category)) return false;
      const lowerCats = r.category.map((c) => String(c).toLowerCase());
      return lowerQs.some((q) => lowerCats.some((c) => c.includes(q)));
    });
  }

  res.jsonp(data);
});

// fall back to default router
server.use(router);

server.listen(1234, () => {
  console.log("JSON Server (custom) is running at http://localhost:1234");
});
