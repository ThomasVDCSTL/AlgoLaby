class Laby {
    constructor(size, diff) {
        this.size = size;
        this.diff = diff;
        this.config = data[size][diff]
    }


    display() {
        const art = document.createElement("article");
        for (let tile of this.config) {
            let tonperelechien = new Tile(tile)
            art.append(tonperelechien.createCase())
        }
        let taille = 100 * this.size
        art.setAttribute("style", "width:" + taille + "px")
        document.body.append(art)
    }
    solve

}


class Tile {
    constructor(obj) {
        this.details = obj;
        this.pos = [obj.posX, obj.posY];
        this.walls = obj.walls
    }


    createCase() {
        let elem = document.createElement("div");
        let walls = ""
        if (this.walls[0]) {
            walls += ' topwall'
        }
        if (this.walls[1]) {
            walls += ' rightwall'
        }
        if (this.walls[2]) {
            walls += ' bottomwall'
        }
        if (this.walls[3]) {
            walls += ' leftwall'
        }
        if (this.details['entrance']) {
            elem.setAttribute("style", "background:aqua")
        }
        if (this.details['exit']) {
            elem.setAttribute("style", "background:red")
        }
        elem.setAttribute("class", walls)
        return elem
    }
}