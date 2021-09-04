import { app } from "./app"

const port = process.env.APP_PORT || 8080

app.listen(port, () => {
    console.log("server is listening at %s", port)
})

