//Variable con la API a consumir
const API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";


//Consumir API
const getData = (api) =>{
    console.log(api);
    fetch(api)
    .then(
        (response) => response.json())
    .then(
        (json) => {
            pokeData(json),
            paginacion(json);
        }
    )
    .catch((error) =>{
        console.log("error: ", error);
    });
};

//Consumir API que trae API
const pokeData = (data) =>{
    data.results.forEach((pj) => {
        const pokeUrl = pj.url;
        return fetch(pokeUrl)
        .then(
            (response) => response.json())
        .then(
            (json)=>{
                dibujarData(json)
            })
        .catch((error)=>{console.log("Error: ", error);
    });
    });
};

//Dibujar cards de personajes
const dibujarData = (data) =>{
    let html = ""
        html += '<div class="col-md-4" >'
        html += '<div class="card mb-3" style="max-width: 540px;">'
        html += '<div class="row g-0">'
        html += '<div class="col-md-3">'
        html += `<img src="${data.sprites.front_default}" class="card-img-yop" alt="pokemon"> `
        html += '</div>'
        html += '<div class="col-md-8">'
        html += '<div class="card-body">';
        html += `<h5 class="card-title">${data.name}</h5>`
        html += `<p class="card-text">Experiencia: ${data.base_experience}
        <br> Peso: ${data.weight} Kg
        <br> Altura: ${data.height/10} m</p>`
        html += '</div>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
    document.getElementById("datosPj").innerHTML += html;
};

//Paginación
const paginacion = (data) =>{
    let html = ""
    html += `<li class="page-item ${data.previous ? "" : "disabled"}"><a class="page-link" onclick="getData('${data.previous}')">Prev</<a></li>`
    html += `<li class="page-item ${data.next ? "" : "disabled"}"><a class="page-link" onclick="getData('${data.next}')">Next</<a></li>`;

    document.getElementById("paginacion").innerHTML = html;
};


//Ejecutar getData
getData(API);