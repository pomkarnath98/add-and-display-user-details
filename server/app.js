const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 9000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors())

mongoose.connect(
    process.env.ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
},
    (err) => {
        if (err) console.log(err)
        else console.log("The database is connected")
    }
)

const authRoute = require("./routes/auth");

app.use("/api", authRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});