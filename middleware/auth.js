const ADMIN_KEY = process.env.ADMIN_KEY;
const VIEWER_KEY = process.env.VIEWER_KEY;

const checkPermission = (req, res, next) => {
  const userKey = req.headers['x-access-key'];

  if (!userKey) {
    return res.status(401).json({ error: "No Access Key Provided" });
  }

  // 1. Admin Key: Can do ANYTHING
  if (userKey === ADMIN_KEY) {
    return next();
  }

  // 2. Viewer Key: Can ONLY do GET requests
  if (userKey === VIEWER_KEY) {
    if (req.method === 'GET') {
      return next();
    } else {
      return res.status(403).json({ error: "Viewer Mode: Read Only. Cannot Edit/Delete." });
    }
  }

  return res.status(403).json({ error: "Invalid Access Key" });
};

module.exports = checkPermission;