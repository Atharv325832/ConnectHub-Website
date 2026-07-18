const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "connecthub", 
                    resource_type: "auto", 
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        // Send upload details back to frontend
        return res.status(200).json({
            message: "File uploaded successfully",
            url: result.secure_url,
            public_id: result.public_id,
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
        });

    } catch (error) {
        console.error("Upload Error:", error);

        return res.status(500).json({
            message: "File upload failed",
            error: error.message,
        });
    }
};

module.exports = { uploadFile };