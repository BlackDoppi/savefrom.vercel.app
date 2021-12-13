const title = document.querySelector('#title')
const thumbnail = document.querySelector('#thumbnail')
const links = document.querySelector('#links')
const result = document.querySelector('#result')
const submit = document.querySelector('#submit')


const main = async (event) => {
    event.preventDefault()
    links.innerHTML = ''
    thumbnail.src = ''
    title.innerHTML = "Please wait in a moment..."
    const link = document.querySelector('#link').value

    try {
        const response = await fetch('/api?' + new URLSearchParams({ link }))
        const video = await response.json()

        thumbnail.src = video.videoDetails.thumbnails[0].url
        title.innerText = video.videoDetails.title.slice(0, 70)

        for (let format of video.formats) {
            let link = '/api/download/?' + new URLSearchParams({ link: format.url })
            let { title } = video.videoDetails
            let quality = format.qualityLabel
            let a = `<a class="download" download="${title}" href="${link}">Download ${quality}</a>`
            links.innerHTML += a
        }
    } catch (error) {
        console.error(error);
    }
}

submit.addEventListener('keydown', (event) => {
    if (event.keyCode == 13)
        main(event)
})


submit.addEventListener('submit', main)
submit.addEventListener('click', main)
