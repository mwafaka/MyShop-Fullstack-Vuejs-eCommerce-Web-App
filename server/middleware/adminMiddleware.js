module.exports = (req, res, next) => {
    if (!req.user.role.includes('admin')) {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  };
  