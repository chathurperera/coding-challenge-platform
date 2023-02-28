const jwt = require("jsonwebtoken");

const generateTokens = async (userId) => {
    try {
        const accessToken = jwt.sign(
            {
                id: userId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        return Promise.resolve({ accessToken });
    } catch (error) {
        Promise.reject(error);
    }
};

module.exports = generateTokens;
