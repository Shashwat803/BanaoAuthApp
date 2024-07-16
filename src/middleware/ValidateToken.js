const jwt = require("jsonwebtoken")
const validateUser = async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWTSCERET, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error(err)
            }
            req.user = decoded.user
            next()
        })
        if (!token) {
            res.status(401)
            throw new Error("User is not authorized or token is missing")
        }
    }
}

module.exports = validateUser