const title = document.querySelector('#title')
const thumbnail = document.querySelector('#thumbnail')
const linksWrapper = document.querySelector('#links-wrapper')
const result = document.querySelector('#result')
const submit = document.querySelector('#submit')


// Getting video link
const main = async (ev) => {
    ev.preventDefault()
    linksWrapper.innerHTML = ''
    thumbnail.src = ''
    title.innerHTML = "Please wait in a moment..."
    const link = document.querySelector('#link').value

    try {
        const response = await fetch('/api?' + new URLSearchParams({ link }))
        const video = await response.json()

        thumbnail.src = video.videoDetails.thumbnails[0].url
        title.innerText = video.videoDetails.title.slice(0, 70)

        for (let format of video.formats) {
            let url = format.url
            let { title } = video.videoDetails
            let qty = format.qualityLabel
            let a = `<a class="download" download="${title}" href="${url}">Download ${qty}</a>`
            linksWrapper.innerHTML += a
        }

        const links = document.querySelectorAll('.download')

        links.forEach(link => link.addEventListener('click', download))
    } catch (error) {
        console.error(error);
    }
}


// Events for getting link
submit.addEventListener('keydown', ev => { if (ev.keyCode == 13) main(ev) })
submit.addEventListener('submit', main)
submit.addEventListener('click', main)


// Downlad video
function onStartedDownload(id) {
    console.log(`Started downloading: ${id}`);
}


function onFailed(error) {
    console.log(`Download failed: ${error}`);
}


function download(ev) {
    ev.preventDefault()
    const downloadUrl = ev.target.href

    const downloading = browser.downloads.download({
        url: downloadUrl,
        filename: 'videoplayback.mp4',
        conflictAction: 'uniquify'
    });

    downloading.then(onStartedDownload, onFailed);
}
