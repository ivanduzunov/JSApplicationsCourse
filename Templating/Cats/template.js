$(() => {
    const context = window.cats
    renderCatTemplate();

    function renderCatTemplate() {
        let cats = $('#cat-template').html();
        let catsTemplate = Handlebars.compile(cats)
        let obj = {
            cats: context
        }
        let allCats = catsTemplate(obj)
        $('#allCats').append(allCats)
        attachEvent()
    }

    function attachEvent() {
        $('#allCats').find('button').on('click', function () {
            let element = $(this);
            if (element.text() === 'Show status code') {
                element.text('Hide status code');
                element.next().show()
            } else {
                element.text('Show status code');
                element.next().hide()
            }
        });
    }

    function loadStatusCodeDetails(id) {
        $('#cardBlock').find($('div').css("style", "display: none"))
        $('#' + id).css("style", "")
    }
})
