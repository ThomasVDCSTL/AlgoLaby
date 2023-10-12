let monLaby = new Laby("13", "ex-2")
// displayButtons()
monLaby.display()
monLaby.initPlayer()

// monLaby.marcheSTP()
async function faisUnTruc() {
    let exit = monLaby.tiles.find((elem) => elem.details.exit)
    while (!(monLaby.posXplayer === exit.posX && monLaby.posYplayer === exit.posY)) {
        monLaby.joue()
        await sleep(100)
    }

}

async function faisUnAutreTruc() {
    let entrance = [[monLaby.tiles.find((elem) => elem.details.entrance)]]
    let exit = monLaby.tiles.find((elem) => elem.details.exit)
    // console.log(exit)
    let bool = monLaby.isShortest(entrance, exit)
    // console.log(monLaby.shortestway)
    for (let tile of monLaby.shortestway) {
        monLaby.erasePlayerMark()
        monLaby.goTo(tile)
        monLaby.displayPlayerMark()
        await sleep(100)
    }
    // console.log(monLaby.tiles)

}

function sleep(ms) {
    // console.log("je suis un programme raciste donc je n'attend pas juste pour faire chier :))))))))))")
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function solveDFS() {
    let container = document.getElementById('container');
    for (let i = 0; i < 5; i++) {
        let child = document.createElement('div')
        child.innerText = "I'm a child";
        child.style.backgroundColor = 'red'
        container.appendChild(child)
        await sleep(i * 1000);
    }
}


function displayButtons() {
    let DFSbutton = document.createElement("button")
    let BFSbutton = document.createElement("button")
    DFSbutton.setAttribute("style", "height:200px;width:" + monLaby.size * 100 + "px;font-size:" + monLaby.size * 4 + "px")
    BFSbutton.setAttribute("style", "height:200px;width:" + monLaby.size * 100 + "px;font-size:" + monLaby.size * 4 + "px")
    DFSbutton.setAttribute("onclick", faisuntruc())
    BFSbutton.setAttribute("onclick", faisunautretruc())
    DFSbutton.textContent = "Play"
    BFSbutton.textContent = "Play but faster"
    document.body.append(DFSbutton)
    document.body.append(BFSbutton)
}