import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in .env file!");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    console.log("Generated Token:", token); // Debugging

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: false, // Localhost testing
    });
};


export default generateTokenAndSetCookie;

