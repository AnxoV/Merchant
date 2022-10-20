function readTextFile(file) {
    let request = new XMLHttpRequest(withCredentials=true);
    request.open("GET", file, true);
    //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status == 0) {
                let text = request.responseText;
                console.log(text);
            }
        }
    }
    request.send();
}

fetch('file:///D:/DAW/DIW/Merchant/css/_colors.css')
  .then(response => response.text())
  .then(text => console.log(text));

//readTextFile("file:///D:/DAW/DIW/Merchant/css/_colors.css");