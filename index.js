const path = require('path')
const express = require('express')
const youtube = require('ytdl-core')


const app = express()

app.use(express.static('public'))


app.get('/', async (req, res) => {
    const { link } = req.query

    if (link) {
        try {
            let { videoDetails, formats } = await youtube.getBasicInfo(link)
            formats = formats.filter(file => file.qualityLabel && file.audioChannels)

            return res.json({ videoDetails, formats })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }

    res.sendFile(path.join(__dirname, 'html', 'index.html'))
})


const PORT = process.env.PORT || 8000
const HOSTNAME = process.env.HOSTNAME || "localhost"


app.listen(PORT, HOSTNAME, () => {
    console.info(`Server started at: http://localhost:${PORT}`)
})
