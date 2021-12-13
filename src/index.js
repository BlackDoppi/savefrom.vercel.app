const express = require('express')
const cors = require('cors')


const app = express()


app.use(cors())


app.use('/api', require('./routes/api'))


app.use(express.static('public'))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.info(`Server started at: http://localhost:${PORT}`)
})
