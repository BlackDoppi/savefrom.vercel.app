const link = document.querySelector('#link').value
const title = document.querySelector('#title')
const thumbnail = document.querySelector('#thumbnail')
const links = document.querySelector('#links')
const result = document.querySelector('#result')


document.querySelector('#submit')
    .addEventListener('click', async (ev) => {
        ev.preventDefault()
        links.innerHTML = ''
        thumbnail.src = ''
        title.innerHTML = "Please wait in a moment..."

        try {
            const response = await fetch("/?" + new URLSearchParams({ link }))
            
            const video = await response.json()

            thumbnail.src = video.videoDetails.thumbnails[0].url
            title.innerText = video.videoDetails.title.slice(0, 70)

            for (let format of video.formats) {
                links.innerHTML += `<a href="${format.url}">Download ${format.qualityLabel}</a> `
            }
        } catch (error) {
            console.error(error);
        }
    })
