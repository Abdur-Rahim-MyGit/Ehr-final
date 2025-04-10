import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.atoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized, please login again"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if (!decoded || !decoded.isAdmin) {
                return res.status(401).json({
                    success: false,
                    message: "Not Authorized as admin"
                });
            }

            req.admin = decoded;
            next();
        } catch (tokenError) {
            console.error('Token verification error:', tokenError);
            return res.status(401).json({
                success: false,
                message: "Invalid token, please login again"
            });
        }

    } catch (error) {
        console.error('Auth error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error during authentication"
        });
    }
}

export default authAdmin;