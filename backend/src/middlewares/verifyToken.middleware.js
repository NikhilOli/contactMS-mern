import jwt from 'jsonwebtoken'


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming the token is in the form "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }
        req.user = decoded;
        next()
    })
}

export default verifyToken