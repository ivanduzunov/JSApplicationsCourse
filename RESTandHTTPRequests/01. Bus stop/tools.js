function getInfo() {
    const url = 'https://judgetests.firebaseio.com/businfo/'
    let stopId = $('input#stopId').val()
    let bussesUl = $('ul#buses')
    let stopNameDiv = $('#stopName')

    bussesUl.empty()
    stopNameDiv.empty()


    $.ajax({
        method: 'GET',
        url: url + stopId + '.json'
    }).then(handleSuccess)
        .catch(handleError)

    function handleSuccess(res) {
        let busses = res.buses
        let stopName = res.name
        stopNameDiv.append(stopName)

        for (let key in busses) {
            appendLi(key, busses[key])
        }
    }

    function handleError(res) {
        stopNameDiv.append('Error')
    }

    function appendLi(busNumber, minutesToCome) {
        bussesUl.append($(`<li>Bus ${busNumber} arrives in ${minutesToCome} minutes</li>`))
    }
}