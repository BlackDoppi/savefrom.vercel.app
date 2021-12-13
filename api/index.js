const express = require('express')
const cors = require('cors')
const youtube = require('ytdl-core')


const app = express()


app.use(cors())


app.get('/api', async (req, res) => {
    const { link } = req.query

    if (!link) return res.status(400).json({ error: "Bad Request" })

    try {
        let { videoDetails, formats } = await youtube.getBasicInfo(link)
        formats = formats.filter(file => file.qualityLabel && file.audioChannels)

        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
        return res.json({ videoDetails, formats })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
    }
})


app.get('/api/download', (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.redirect(req.query.link)
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.info(`Server started at: http://localhost:${PORT}`)
})
