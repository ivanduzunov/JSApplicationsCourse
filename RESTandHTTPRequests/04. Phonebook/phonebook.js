function attachEvents() {
    let phonebookUl = $('ul#phonebook')
    let url = 'https://phonebook-nakov.firebaseio.com/phonebook'

    $('#btnLoad').on('click', loadData)
    $('#btnCreate').on('click', postData)

    function loadData() {
        $.ajax({
            method: 'GET',
            url: url + '.json'
        }).then(handleSuccess)
            .catch(handleError)

        function handleSuccess(res) {
            for (let key in res) {
                let name = res[key].person
                let phone = res[key].phone
                let deleteBtn = $(`<button>[Delete]</button>`).on('click', deleteData(key))
                let li = $(`<li>${name}: ${phone} </li>`)
                li.append(deleteBtn)
                phonebookUl.append(li)
            }
        }

        function handleError(res) {
            throw Error('Invalid GET method :(')
        }
    }

    function postData() {
        let personInput = $('input#person')
        let phoneInput = $('input#phone')
        let name = personInput.val()
        let phone = phoneInput.val()
        let toUpload = {"person": name, "phone": phone}

        $.ajax({
            type: "POST",
            url: url + '.json',
            data: JSON.stringify(toUpload),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        }).then(function () {
            console.log('Successfull upload....')
        }).catch(function () {
            console.log('ERROR')
        })

        personInput.val('')
        phoneInput.val('')
    }

    function deleteData(key) {
        $.ajax({
            method: 'DELETE',
            url: url + `/${key}` + '.json'
        })
    }
}
