function attachEvents() {
    $('#btnLoadTowns').on('click', loadTowns)
}

function loadTowns() {
    let towns = []
    let inputArr = $('#towns').val().split(',')
    for (let town of inputArr) {
        towns.push({
            town: town.trim()
        })
    }
    let obj = {towns: towns}

    let townsTemplate = Handlebars.compile($('#towns-template').html())
    let list = townsTemplate(obj)
    $('#root').append(list)
}