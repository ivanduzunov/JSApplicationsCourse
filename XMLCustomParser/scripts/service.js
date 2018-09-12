let service = (() => {

    function uploadDirectory(directory) {

        console.log(directory);
        readFiles(directory)

    }

    function readFiles(directory) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(text, "text/xml");
    }

    return {
        uploadDirectory
    }
})();