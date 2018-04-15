$(() => {
    let details
    let data

    async function loadFiles() {
        let contacts = await $.get('templates/contacts.html')
        details = await $.get('templates/details.html')
        data = await $.get('data.json')
        let obj = {
            contacts: data
        }

        let contactsTemplate = Handlebars.compile(contacts)
        let table = contactsTemplate(obj)
        $('#list').append(table)
        attachEvents()
    }

    loadFiles()

    function attachEvents() {
        $('.contact').on('click', function () {
            loadDetails($(this).attr('data-id'))
        })
    }

    function loadDetails(index) {
        let detailsTemplate = Handlebars.compile(details)
        let contact = detailsTemplate(data[index])
        $('#details').empty()
        $('#details').append(contact)
    }
});