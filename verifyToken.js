const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verify(req, res, next) {
    console.log("Verifying token...");
    const authHeader = req.headers.token;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
            console.log("SECRET_CODE", process.env.SECRET_CODE);
            if (err) {
                console.log("Error verifying token:", err);
                res.status(403).json({ message: "Token is not valid!" });
            } else {
                console.log("Decoded User:", user);
                req.user = user;
                next(); 
            }
        });
    } else {
        console.log("Something else went wrong");
        res.status(401).json({ message: "You are not authenticated!" });
    }
}

module.exports = verify;
