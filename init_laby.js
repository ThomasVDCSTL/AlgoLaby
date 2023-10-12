class Laby {
    constructor(size, diff) {
        this.size = size;
        this.diff = diff;
        this.config = data[size][diff]
        this.tiles = []
        this.posXplayer
        this.posYplayer
        this.stack = []
        this.queue = []
        this.pas = 0
        this.shortestway = []
    }


    display() {
        const art = document.createElement("article");
        for (let tile of this.config) {
            let newTile = new Tile(tile)
            this.tiles.push(newTile)
            art.append(newTile.createCase())
        }
        let taille = 100 * this.size
        art.setAttribute("style", "height:" + taille + "px;width:" + taille + "px")
        document.body.append(art)
    }

    async solve() {
        let exit = this.tiles.find((elem) => elem.details.exit)
        while (!(this.posXplayer === exit.posX && this.posYplayer === exit.posY)) {
            this.joue()
        }

    }

    joue() {
        this.erasePlayerMark();
        // let temp = this.findWay();
        this.fillQueue();
        let temp = this.queue.pop();
        this.goTo(temp);
        this.displayPlayerMark();
    }

    async sleep(ms) {
        console.log("j'ai attendu")
        return new Promise(resolve => setTimeout(resolve, ms));

    }

    getBottomTile(X, Y) {
        return this.tiles.find((elem) => (elem.posY === Y && elem.posX === X + 1))
    }

    getLeftTile(X, Y) {
        return this.tiles.find((elem) => (elem.posY === Y - 1 && elem.posX === X))
    }

    getRightTile(X, Y) {
        return this.tiles.find((elem) => (elem.posY === Y + 1 && elem.posX === X))
    }

    getTopTile(X, Y) {
        return this.tiles.find((elem) => (elem.posY === Y && elem.posX === X - 1))
    }

    getTileInfo(X, Y) {
        return this.tiles.find((elem) => (elem.posY === Y && elem.posX === X))
    }

    isIntersection(X, Y) {
        let res = 0;
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[1] && !this.getRightTile(this.posXplayer, this.posYplayer).isVisited()) {
            res += 1;
        }
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[2] && !this.getBottomTile(this.posXplayer, this.posYplayer).isVisited()) {
            res += 1;
        }
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[3] && !this.getLeftTile(this.posXplayer, this.posYplayer).isVisited()) {
            res += 1;
        }
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[0] && !this.getTopTile(this.posXplayer, this.posYplayer).isVisited()) {
            res += 1;
        }
        if (this.stack.find(elem => elem.posX === this.posXplayer && elem.posY === this.posYplayer) === undefined) {
            this.stack.push(this.getTileInfo(this.posXplayer, this.posYplayer))
        }
        console.log(this.stack, res)
        if (res < 2) {
            this.stack.pop();
        }
        return res
    }

    goTo(tile) {
        this.getTileInfo(this.posXplayer, this.posYplayer).visiting()
        this.posXplayer = tile.posX
        this.posYplayer = tile.posY
        // console.log("x="+this.posXplayer)
        // console.log("y="+this.posYplayer)
        // console.log("liste :",this.stack)
    }

    findWay() {
        if (this.isIntersection(this.posXplayer, this.posYplayer) > 0) {
            if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[1] && !this.getRightTile(this.posXplayer, this.posYplayer).isVisited()) {
                return this.getRightTile(this.posXplayer, this.posYplayer)
            } else if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[2] && !this.getBottomTile(this.posXplayer, this.posYplayer).isVisited()) {
                return this.getBottomTile(this.posXplayer, this.posYplayer)
            } else if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[3] && !this.getLeftTile(this.posXplayer, this.posYplayer).isVisited()) {
                return this.getLeftTile(this.posXplayer, this.posYplayer)
            } else if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[0] && !this.getTopTile(this.posXplayer, this.posYplayer).isVisited()) {
                return this.getTopTile(this.posXplayer, this.posYplayer)
            }
        } else {
            return this.stack[this.stack.length - 1]
        }
    }

    initPlayer() {
        let entrance = this.tiles.find((elem) => elem.details.entrance)
        this.posXplayer = entrance.posX
        this.posYplayer = entrance.posY
    }

    displayPlayerMark() {
        let pion = document.createElement("p")
        document.getElementById(this.posXplayer + "-" + this.posYplayer).append(pion)
    }

    erasePlayerMark() {
        document.getElementById(this.posXplayer + "-" + this.posYplayer).setHTML(this.pas++)
    }

    fillQueue() {
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[1] && !this.getRightTile(this.posXplayer, this.posYplayer).isVisited()) {
            this.queue.push(this.getRightTile(this.posXplayer, this.posYplayer))
        }
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[2] && !this.getBottomTile(this.posXplayer, this.posYplayer).isVisited()) {
            this.queue.push(this.getBottomTile(this.posXplayer, this.posYplayer))
        }
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[3] && !this.getLeftTile(this.posXplayer, this.posYplayer).isVisited()) {
            this.queue.push(this.getLeftTile(this.posXplayer, this.posYplayer))
        }
        if (!this.getTileInfo(this.posXplayer, this.posYplayer).walls[0] && !this.getTopTile(this.posXplayer, this.posYplayer).isVisited()) {
            this.queue.push(this.getTopTile(this.posXplayer, this.posYplayer))
        }
    }

    fillList(tile) {
        let list = []
        if (!this.getTileInfo(tile.posX, tile.posY).walls[1] && !this.getRightTile(tile.posX, tile.posY).isVisited()) {
            list.push(this.getRightTile(tile.posX, tile.posY))
        }
        if (!this.getTileInfo(tile.posX, tile.posY).walls[2] && !this.getBottomTile(tile.posX, tile.posY).isVisited()) {
            list.push(this.getBottomTile(tile.posX, tile.posY))
        }
        if (!this.getTileInfo(tile.posX, tile.posY).walls[3] && !this.getLeftTile(tile.posX, tile.posY).isVisited()) {
            list.push(this.getLeftTile(tile.posX, tile.posY))
        }
        if (!this.getTileInfo(tile.posX, tile.posY).walls[0] && !this.getTopTile(tile.posX, tile.posY).isVisited()) {
            list.push(this.getTopTile(tile.posX, tile.posY))
        }
        return list
    }

    isShortest(liste, exit) {
        if (liste.length > 0) {
            for (let path of liste) {
                let currentTile = path[path.length - 1];
                currentTile.visiting();
                let newTiles = this.fillList(currentTile);
                for (let newTile of newTiles) {
                    if (newTile.posX === exit.posX && newTile.posY === exit.posY) {
                        path.push(newTile);
                        this.shortestway = path;
                        return true;
                    } else {
                        let newPath = path.slice();
                        newPath.push(newTile);
                        liste.push(newPath);
                    }
                }
            }
        }
        return false;
    }

    marcheSTP() {
        let entrance = [this.fillList(this.tiles.find((elem) => elem.details.entrance))]
        let exit = this.tiles.find((elem) => elem.details.exit)
        // console.log(exit)
        let bool = this.isShortest(entrance, exit)
        // console.log(this.shortestway)
        for (let tile of this.shortestway) {
            this.erasePlayerMark()
            this.goTo(tile)
            this.displayPlayerMark()
        }
        console.log(this.tiles)
    }
}


class Tile {
    constructor(obj) {
        this.details = obj;
        this.posX = obj.posX;
        this.posY = obj.posY;
        this.walls = obj.walls;
        this.visited = false;
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
        elem.setAttribute("id", this.posX + "-" + this.posY)
        return elem
    }

    isVisited() {
        return this.visited
    }

    visiting() {
        this.visited = true
    }

}