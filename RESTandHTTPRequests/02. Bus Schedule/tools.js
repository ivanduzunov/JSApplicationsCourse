function solve() {
    let busStopId = 'depot'
    let busStopName = ''
    let url = 'https://judgetests.firebaseio.com/schedule/'


    function depart() {

        $.ajax({
            method: 'GET',
            url: url + busStopId + '.json'
        }).then(handleSuccess)
            .catch(handleError)

        function handleSuccess(res) {
            busStopName = res.name
            busStopId = res.next

            $('span.info').empty().append('Next stop ' + busStopName)
            $('#depart').attr('disabled', true)
            $('#arrive').attr('disabled', false)

        }

        function handleError(res) {
            $('#info').append('Error')
        }
    }

    function arrive() {
        $('span.info').empty().append('Arriving at ' + busStopName)
        $('#depart').attr('disabled', false)
        $('#arrive').attr('disabled', true)
    }

    return {
        depart,
        arrive
    }
}

let result = solve();