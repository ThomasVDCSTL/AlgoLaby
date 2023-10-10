

function createCase(tile) {
    let elem=document.createElement("div");
    let walls=""
    if (tile.walls[0]){walls+=' topwall'}
    if (tile.walls[1]){walls+=' rightwall'}
    if (tile.walls[2]){walls+=' bottomwall'}
    if (tile.walls[3]){walls+=' leftwall'}
    if (tile.entrance){elem.setAttribute("style","background:aqua")}
    if (tile.exit){elem.setAttribute("style","background:red")}
    elem.setAttribute("class", walls)
    return elem
}

function createTable(size, diff){
    const art =document.createElement("article");
    for (tile of data[size][diff]){
        art.append(createCase(tile))
    }
    let taille=100*size
    art.setAttribute("style","width:"+taille+"px")
    document.body.append(art)
}

createTable("6", "ex-0")



