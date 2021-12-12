const path = require('path')
const express = require('express')
const youtube = require('ytdl-core')


const app = express()


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

    // res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


// app.use(express.static('public'))


const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.info(`Server started at: http://localhost:${PORT}`)
})
