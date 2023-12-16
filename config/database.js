// connect mongoose with database
const moongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await moongoose.connect(process.env.MONGODB_URL);
        console.log("Connected success!");
    } catch (err) {
        console.log("Error connecting!");
    }
}
