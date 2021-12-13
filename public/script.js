const videoTitle = document.querySelector('#title')
const thumbnail = document.querySelector('#thumbnail')
const linksWrapper = document.querySelector('#links-wrapper')
const result = document.querySelector('#result')
const submit = document.querySelector('#submit')


// Getting video link
const main = async event => {
    event.preventDefault()
    linksWrapper.innerHTML = ''
    thumbnail.src = ''
    videoTitle.innerText = "Please wait in a moment..."
    const link = document.querySelector('#link').value

    try {
        const response = await fetch('/api?' + new URLSearchParams({ link }))
        const video = await response.json()
        const { title } = video.videoDetails

        thumbnail.src = video.videoDetails.thumbnails[0].url
        videoTitle.innerText = title.slice(0, 70)

        for (let format of video.formats) {
            let url = format.url + "&" + new URLSearchParams({ title })
            let qty = format.qualityLabel
            let a = `<a class="download" download="${title}" href="${url}">Download ${qty}</a>`
            linksWrapper.innerHTML += a
        }
    } catch (error) {
        console.error(error);
    }
}


// Events for getting link
submit.addEventListener('keydown', ev => { if (ev.keyCode == 13) main(ev) })
submit.addEventListener('submit', main)
submit.addEventListener('click', main)
