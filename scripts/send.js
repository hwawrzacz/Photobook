async function sendData(token) {
    const url = 'download/';
    // data to będzie cały generowany json
    const data = { username: 'dawid' };
    try {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        "X-CSRFToken": token ,
        'Content-Type': 'application/json',
        }
    });
    const resp = await response.blob()
    var resourceUrl = URL.createObjectURL(resp)
    // te dwie linijki poniżej otwierają nową karte z otwartym dokumentem
    window.open(resourceUrl, '_blank');
    URL.revokeObjectURL(resourceUrl);

    // TODO: zrobić tak żeby to działało bo póki co pobierany pdf jest uszkodzony
    // downloadURI(resourceUrl, 'yourPhotobook.pdf')
    
    } catch (error) {
    console.error('Error:', error);
    }
}

function downloadURI(uri, name) {
    // ta funkcja forsuje download pliku
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}