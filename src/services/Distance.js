//Função para carregar a distancia entre as lat e log do sua locailização e a localização do posto
export function getDistance(lat1, lon1, lat2, lon2) {

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
        return dist.toFixed(2);
    }
}

//Função para encontrar o posto pamis proximo
export function nearDistance(postos, location) {

    //Adicionando a chave distancia no objeto
    let newData = postos.map((data) => {

        return {...data, distance: getDistance(location.coords.latitude, location.coords.longitude, data.coords.latitude,  data.coords.longitude)};
    });
    newData = newData.sort(ascType)
    //Ordenação do menor para o maior
    function ascType(a, b) {
        const FilterA = a.distance.toUpperCase();
        const FilterB = b.distance.toUpperCase();

        let comparison = 0;
        if (FilterA > FilterB) {
            comparison = 1;
        } else if (FilterA < FilterB) {
            comparison = -1;
        }
        return comparison;
    }
    //Pegando as informações que possui o meno valor do mapa
    return newData[0]
}