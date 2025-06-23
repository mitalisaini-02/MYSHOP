import jwt from 'jsonwebtoken';

 const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token)  return res.status(401).json({ success: false, message: 'No token. Login as admin.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }
    next(); // Access granted
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
export default adminAuth;