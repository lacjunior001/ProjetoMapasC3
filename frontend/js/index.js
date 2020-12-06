
var mymap = L.map('mapid').setView([-20.3443, -40.2890], 13);

function enviarForm() {
    if (verificarForm()) {
        var req = new XMLHttpRequest()
        req.open("post", "http://localhost:3000/")
        req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        var pessoa = {
            "nome": document.forms["cadastro"]["nome"].value,
            "email": document.forms["cadastro"]["email"].value,
            "position": {
                "latitude": document.forms["cadastro"]["lati"].value,
                "longitude": document.forms["cadastro"]["longi"].value
            }
        }
        req.send(JSON.stringify(pessoa))
    }
    window.location.reload();
}

function verificarForm() {
    var nome = document.forms["cadastro"]["nome"].value
    var email = document.forms["cadastro"]["email"].value
    var longi = document.forms["cadastro"]["longi"].value
    var lati = document.forms["cadastro"]["lati"].value
    
    if (nome == "" || email == "" || longi == "" || lati == "") {
        alert("preencha todos os campos");
        return false
    } else {
        return true
    }
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

fetch('http://localhost:3000')
    /**
     * usado para capturar fazer requisições em uma api
     * consulta pelo java script
     * retorna o que está guardado em uma estrutura de dados chamada JSON
     * Java Script Object Notation -> forma de representar um objeto do JS em texto
     * é mais simples que o XML, usadas para fazer APIs chamadas de REST ou Restful API (DevWeb 2)
      */
    .then(data => data.json())
    .then(res => {
        for (pessoa of res) {
            /**
             * for each?
             */
            L.marker([pessoa.position.latitude, pessoa.position.longitude]).addTo(mymap).bindPopup(pessoa.nome)
            /**
             * até addTo(mymap) adiciona os pontos
             * .bindPopup coloca popup com nome
             */
        }
    })


var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Navegador não suporta esta função";
    }
}

function showPosition(position) {
    document.forms["cadastro"]["lati"].value = position.coords.latitude
    document.forms["cadastro"]["longi"].value = position.coords.longitude
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "Usuário negou a localização"
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Localização Indisponível"
            break;
        case error.TIMEOUT:
            x.innerHTML = "Tempo de requisição expirou"
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "Erro Desconhecido"
            break;
    }
}


