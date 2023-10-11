class Laby {
    constructor(size, diff) {
        this.size = size;
        this.diff = diff;
        this.config = data[size][diff]
        this.tiles=[]
        this.posXplayer
        this.posYplayer
        this.stack=[]
        this.pas=0
    }


    display() {
        const art = document.createElement("article");
        for (let tile of this.config) {
            let newTile = new Tile(tile)
            this.tiles.push(newTile)
            art.append(newTile.createCase())
        }
        let taille = 100 * this.size
        art.setAttribute("style", "height:" + taille + "px;width:"+ taille + "px")
        document.body.append(art)
    }
    solve(){
        let exit=this.tiles.find((elem)=>elem.details.exit)
        while (!(this.posXplayer===exit.posX&&this.posYplayer===exit.posY)){
            this.erasePlayerMark()
            let temp = this.findWay()
            this.goTo(temp)
            this.displayPlayerMark()
        }

    }
    getBottomTile(X,Y){
        return this.tiles.find((elem)=>(elem.posY===Y&&elem.posX===X+1))
    }
    getLeftTile(X,Y){
        return this.tiles.find((elem)=>(elem.posY===Y-1&&elem.posX===X))
    }
    getRightTile(X,Y){
        return this.tiles.find((elem)=>(elem.posY===Y+1&&elem.posX===X))
    }
    getTopTile(X,Y){
        return this.tiles.find((elem)=>(elem.posY===Y&&elem.posX===X-1))
    }
    getTileInfo(X,Y){
        return this.tiles.find((elem)=>(elem.posY===Y&&elem.posX===X))
    }
    isIntersection(X,Y){
        let res=0;
        if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[1]&&!this.getRightTile(this.posXplayer,this.posYplayer).isVisited()){
            res += 1;
        }
        if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[2]&&!this.getBottomTile(this.posXplayer,this.posYplayer).isVisited()){
            res += 1;
        }
        if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[3]&&!this.getLeftTile(this.posXplayer,this.posYplayer).isVisited()){
            res += 1;
        }
        if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[0]&&!this.getTopTile(this.posXplayer,this.posYplayer).isVisited()) {
            res += 1;
        }
        if (this.stack.find(elem=>elem.posX===this.posXplayer&&elem.posY===this.posYplayer)===undefined){this.stack.push(this.getTileInfo(this.posXplayer,this.posYplayer))}
        console.log(this.stack,res)
        if (res<2){
            this.stack.pop();
        }
        return res
    }
    goTo(tile){
        let tempX=tile.posX
        let tempY=tile.posY
        this.getTileInfo(this.posXplayer,this.posYplayer).visiting()
        this.posXplayer=tempX
        this.posYplayer=tempY
        console.log("x="+this.posXplayer)
        console.log("y="+this.posYplayer)
        // this.posXplayer=exit.posX
        // this.posYplayer=exit.posY
        console.log("liste :",this.stack)
    }

    findWay(){
        if (this.isIntersection(this.posXplayer,this.posYplayer)>0){
            if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[1]&&!this.getRightTile(this.posXplayer,this.posYplayer).isVisited()){
                return this.getRightTile(this.posXplayer,this.posYplayer)
            } else if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[2]&&!this.getBottomTile(this.posXplayer,this.posYplayer).isVisited()){
                return this.getBottomTile(this.posXplayer,this.posYplayer)
            }else if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[3]&&!this.getLeftTile(this.posXplayer,this.posYplayer).isVisited()){
                return this.getLeftTile(this.posXplayer,this.posYplayer)
            }else if (!this.getTileInfo(this.posXplayer,this.posYplayer).walls[0]&&!this.getTopTile(this.posXplayer,this.posYplayer).isVisited()){
                return this.getTopTile(this.posXplayer,this.posYplayer)
            }
        } else {
            return this.stack[this.stack.length-1]
        }
    }
    initPlayer(){
        let entrance= this.tiles.find((elem)=>elem.details.entrance)
        this.posXplayer=entrance.posX
        this.posYplayer=entrance.posY
    }
    displayPlayerMark(){
        let pion=document.createElement("p")
        document.getElementById(this.posXplayer+"-"+this.posYplayer).append(pion)
    }
    erasePlayerMark(){
        document.getElementById(this.posXplayer+"-"+this.posYplayer).setHTML(this.pas++)
    }
}


class Tile {
    constructor(obj) {
        this.details = obj;
        this.posX = obj.posX;
        this.posY =obj.posY;
        this.walls = obj.walls;
        this.visited=false;
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
        elem.setAttribute("id",this.posX+"-"+this.posY)
        return elem
    }

    isVisited(){
        return this.visited
    }

    visiting(){
        this.visited=true
    }

}