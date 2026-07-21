//Guards admin-only routes. Client must send the shared secret in the x-admin-secret header.
function requireAdmin(req, res, next) {
  if (req.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

module.exports = requireAdmin;
