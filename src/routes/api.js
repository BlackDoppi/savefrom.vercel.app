const youtube = require('ytdl-core')
const route = require('express').Router()


route.get('/', async (req, res) => {
    const { link } = req.query

    if (!link) return res.status(400).json({ error: "Bad Request" })

    try {
        let { videoDetails, formats } = await youtube.getBasicInfo(link)
        formats = formats.filter(file => file.qualityLabel && file.audioChannels)

        return res.json({ videoDetails, formats })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
    }
})


module.exports = route
