const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
// const eventRegistration = require("./models/eventRegistration");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req,res) => {
    res.send("<h1> Welcome to Main Route </h1>")
})

const userRouter = require("./routes/user");
app.use("/users", userRouter);

const clubAdminRouter = require("./routes/clubAdmin");
app.use("/clubadmins", clubAdminRouter);

const eventRouter = require("./routes/event");
app.use("/event", eventRouter);

const eventRegistrationRouter = require("./routes/eventRegistration");
app.use("/eventreg", eventRegistrationRouter);

const eventStatsRouter = require("./routes/eventState");
app.use("/eventstat", eventStatsRouter);

const clubRouter = require("./routes/club");
app.use("/club", clubRouter);

const announcementRouter = require("./routes/announcement");
app.use("/announcement", announcementRouter);

const feedbackRouter = require("./routes/feedback");
app.use("/feedback", feedbackRouter);

const notificationRouter = require("./routes/notification");
app.use("/notification", notificationRouter);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const teamRoutes = require("./routes/team");
app.use("/teams", teamRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})


