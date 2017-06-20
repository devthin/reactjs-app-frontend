var beerResult = []; // Global variable, which will be used for easy sorting calls from header clicks

function getData() {
    $.ajax({
        headers: {
            authorization: "VerySecretToken"
        },
        url: "/beer",
        success: function (data) {
            handleData(data);
        }
    })
}

function handleData(beers) {
    beerResult = beers.items;
    beerResult = sortData(beerResult, "id");
    drawData(beerResult);
}

function sortData(data, field) {
    // The JavaScript 'sort' function causes side effects, which may cause undesirable effects.
    // Best create a copy of the array to sort. This will result in a bit slower, but much more safer workflow. 
    // Nobody will notice a few millisecond delay. 
    // Note: There are better ways to prevent side effects, but I went for a classic JS experience.
    let arrayToSort = JSON.parse(JSON.stringify(data));

    if (arrayToSort.length < 2) {
        return;
    }

    // If already sorted -> sort backwards. Note: technically on first click it may sort either way - but it gets the job done
    let boolMultiplier = arrayToSort[0][field] >= arrayToSort[arrayToSort.length - 1][field] ? 1 : -1;

    return arrayToSort.sort((a, b) => {
        if (a == null || a == undefined) {
            return -1;
        }

        if (b == null || b == undefined) {
            return 1;
        }

        if (a[field] > b[field]) {
            return 1 * boolMultiplier;
        } else {
            return -1 * boolMultiplier;
        }
    });

}

function redraw(field){
    beerResult = sortData(beerResult, field);
    drawData(beerResult);
}

function drawData(beers) {
    $("#beer-house").html("");

    let stringBuilder = "<table>";

    stringBuilder +=
        `<tr>
          <th onclick='redraw("id")'>id</th>
          <th onclick='redraw("name")'>name</th>
          <th onclick='redraw("bitterness")'>bitterness</th>
          <th onclick='redraw("color")'>color</th>
          <th onclick='redraw("alc")'>alc</th>
        </tr>`;

    beers.forEach(function (beer) {
        stringBuilder += "<tr>";

        stringBuilder += "<td>" + beer.id + "</td>";
        stringBuilder += "<td>" + beer.name + "</td>";
        stringBuilder += "<td>" + beer.bitterness + "</td>";
        stringBuilder += "<td>" + beer.color + "</td>";
        stringBuilder += "<td>" + beer.alc + "</td>";

        stringBuilder += "</tr>";
    });

    stringBuilder += "</table>"

    $("#beer-house").html(stringBuilder);
}

getData();