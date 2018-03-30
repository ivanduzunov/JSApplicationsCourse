function attachEvents() {
    const url = 'https://judgetests.firebaseio.com/'
    const getWeatherBtn = $('input#submit')
    const inputLocation = $('input#location')
    const forecastDiv = $('div#forecast')
    const currentForecastDiv = $('div#forecast div#current')
    const upcomingForecastDiv = $('div#forecast div#upcoming')
    const symbols = {
        Sunny: '&#x2600',
        "Partly sunny": "&#x26C5",
        Overcast: "&#x2601",
        Rain: "&#x2614",
        Degrees: "&#176"
    }
    let locationCode = ''
    forecastDiv.css('display', 'none')
    let isNotFound = true

    getWeatherBtn.on('click', getWeather)

    function getWeather() {
        $.get(url + 'locations.json')
            .then(findLocation)
            .catch(handleError)

        function findLocation(res) {
            let locationName = inputLocation.val()

            for (let location of res) {
                if (location.name === locationName) {
                    isNotFound = false
                    locationCode = location.code


                    $.get(`${url}forecast/today/${locationCode}.json `)
                        .then(addTodaysForecast)
                        .catch(handleError);

                    function addTodaysForecast(res) {
                        let name = res.name
                        let low = res.forecast.low
                        let high = res.forecast.high
                        let condition = res.forecast.condition


                        forecastDiv.css('display', '')
                        let condSymbolSpan = $(`<span class="condition symbol">${symbols[condition]}</span>`)
                        currentForecastDiv.append(condSymbolSpan)
                        let conditionSpan = $('<span class="condition"></span>')
                        conditionSpan.append($(`<span class="forecast-data">${name}</span>`))
                        conditionSpan.append($(`<span class="forecast-data">${low + symbols.Degrees}/${high + symbols.Degrees}</span>`))
                        conditionSpan.append($(`<span class="forecast-data">${condition}</span>`))
                        currentForecastDiv.append(conditionSpan)
                    }

                    $.get(`${url}forecast/upcoming/${locationCode}.json `)
                        .then(addUpcomingForecast)
                        .catch(handleError);

                    function addUpcomingForecast(res) {
                        let name = res.name

                        for (let day of res.forecast) {
                            let low = day.low
                            let high = day.high
                            let condition = day.condition

                            let upcomingSpan = $('<span class="upcoming"></span>')
                            upcomingSpan.append($(`<span class="symbol">${symbols[condition]}</span>`))
                            upcomingSpan.append($(`<span class="forecast-data">${low + symbols.Degrees}/${high + symbols.Degrees}</span>`))
                            upcomingSpan.append($(`<span class="forecast-data">${condition}</span>`))
                            upcomingForecastDiv.append(upcomingSpan)
                        }
                    }

                    break
                }
            }
            if (isNotFound){
                forecastDiv.css('display', '').append('Error')
            }
        }

        function handleError() {

        }
    }
}