
const core = {
  getRandomNumber: function (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  },

  getTwoNumbers: function (minValue, maxValue) {
    let number1 = core.getRandomNumber(minValue, maxValue);
    let number2 = core.getRandomNumber(minValue, maxValue);
    return {
      min: Math.min(number1),
      max: Math.max(number2)
    };
  },

};

const app = {

  listenKeyboardEvents: () => {
    document.addEventListener("keyup", (event) => {
      if (event.key === 'v') {
        app.turndown()

      }
      if (event.key === 't') {
        app.turnUp()

      }
      if (event.key === 'h') {
        app.turnRight()

      }
      if (event.key === 'j') {
        app.moveForward()

      }
      if (event.key === 'f') {
        app.turnBack()

      }
      if (event.key === 'd') {
        app.moveBack()

      }
    })

  },

  score: {
    move: 0
  },

  turndown: () => {
    app.player.direction = "down"
    app.redrawBoard()
    app.score.move++
    document.querySelector(".compteur").innerHTML = `${app.score.move}`;

  },
  turnUp: () => {

    app.player.direction = "up"
    app.redrawBoard()
    app.score.move++
    document.querySelector(".compteur").innerHTML = `${app.score.move}`;
  },
  turnLeft: () => {

    app.player.direction = "left"
    app.redrawBoard()
    app.score.move++
    document.querySelector(".compteur").innerHTML = `${app.score.move}`;
  },
  turnBack: () => {

    app.player.direction = "back"
    app.redrawBoard()
    app.score.move++
    document.querySelector(".compteur").innerHTML = `${app.score.move}`;
  },

  turnRight: () => {

    app.player.direction = "right"
    app.redrawBoard()
    app.score.move++
    document.querySelector(".compteur").innerHTML = `${app.score.move}`;
  },

  moveBack: () => {

    if (app.player.direction === "back" && app.player.x < app.gridSize.culum && app.player.x > 0) {
      app.player.x += -1
      app.player.y += 0
    }
    if (app.player.direction === "up" && app.player.y < app.gridSize.row && app.player.y > 0) {
      app.player.y += -1
      app.player.x += 0
    }
    app.redrawBoard()
    app.score.move++
    document.querySelector(".compteur").innerHTML = `${app.score.move}`;
  },
  moveForward: () => {

    if (app.player.direction === "right" && app.player.x < app.gridSize.culum) {
      app.player.x += 1
      app.player.y += 0
    }
    if (app.player.direction === "down" && app.player.y < app.gridSize.row) {
      app.player.y += 1
      app.player.x += 0
    }
    app.redrawBoard()
    app.score.move++
    document.querySelector(".compteur").innerHTML = `${app.score.move}`;
  },




  clearBoard: () => {
    let clear = document.querySelector("#board")
    clear.innerHTML = "";
  },

  redrawBoard: () => {
    app.clearBoard();
    app.drawBoard();
  },

  gridSize: {
    row: 5,
    culum: 7
  },

  player: {
    x: 0,
    y: 0,
    direction: "right"

  },

  targetCell: {
    x: core.getTwoNumbers(2, 7),
    y: core.getTwoNumbers(2, 5)
  },

  drawBoard: () => {

    for (y = 0; y < app.gridSize.row + 1; y++) {
      let row = document.createElement('div');
      row.classList.add('row');

      for (x = 0; x < app.gridSize.culum + 1; x++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
        if (x === app.targetCell.x.max && y === app.targetCell.y.min) {
          cell.classList.add('targetCell')
        }

        if (x === app.player.x && y === app.player.y) {

          let cellPlayer = document.createElement("div")
          cellPlayer.classList.add('player')
          cell.appendChild(cellPlayer)
          if (app.player.direction === "right") {
            cellPlayer.classList.add("player--right")

          } else if (app.player.direction === "down") {
            cellPlayer.classList.add("player--down")
          } else if (app.player.direction === "up") {
            cellPlayer.classList.add("player--up")
          } else if (app.player.direction === "left") {
            cellPlayer.classList.add("player--left")
          } else if (app.player.direction === "back") {
            cellPlayer.classList.add("player--back")
          }
        }
      }

      board.appendChild(row);
    }
    app.isGameOver()
  },

  isGameOver: () => {
    if (app.player.x === app.targetCell.x.max && app.player.y === app.targetCell.y.min) {
      document.removeEventListener("keyup", (event) => {
        app.turndown()
        app.turnRight()
        app.moveForward()
      });
      setTimeout(() => {
        document.querySelector(".replay").classList.add("replay--hidden");
      }, 250);

    }
  },

  restart: (event) => {
    event.target
    document.querySelector('#board').innerHTML = '';
    document.querySelector(".compteur").innerHTML = "0";
    app.score.move = 0
    app.player.x = 0
    app.player.y = 0
    app.targetCell.x = core.getTwoNumbers(0, 7),
    app.targetCell.y = core.getTwoNumbers(0, 5)
    document.querySelector(".replay").classList.remove("replay--hidden");
    app.player.direction = 'right'
    app.drawBoard();
  },

  init: () => {
    app.listenKeyboardEvents();
    let replay = document.querySelector(".replay")
    replay.addEventListener("click", app.restart)
    app.drawBoard();
  }
};

document.addEventListener('DOMContentLoaded', app.init);