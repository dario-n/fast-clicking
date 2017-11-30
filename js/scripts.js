window.onload = function() {
  var start = document.getElementById('start');
  var reset = document.getElementById('reset');
  var lvlup = document.getElementById('lvlup');
  var areaDisp = [
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1]
  ];
  var seconds;
  var game;

  start.onclick = set;

  reset.onclick = gameStart;

  function resetCount() {
    seconds = 5;
    i = 1;
    btn = document.getElementById(1);
    btn.removeAttribute('disabled');
    for (var row = 0; row < areaDisp.length; row++) {
      for (var col = 0; col < areaDisp[row].length; col++) {
        areaDisp[row][col] = 1;
      }
    }
  }

  function gameStart () {
    var randomRow = Math.floor(Math.random()*7);
    var randomCol = Math.floor(Math.random()*6);
    document.querySelectorAll('.game').forEach(function(elem) {
      elem.style.display = 'inline-block';
      while (areaDisp[randomRow][randomCol] != 1) {
        randomRow = Math.floor(Math.random()*7);
        randomCol = Math.floor(Math.random()*6);
      }
      elem.style.gridArea = (randomRow + 1) + "/" + (randomCol + 1);
      areaDisp[randomRow][randomCol] = 0;
    });
    start.style.display = 'none';
    reset.style.display = 'inline-block';
  }

  function set() {
    resetCount();
    game = setInterval(function() {gameCountdown()}, 1000);
  }
  function gameCountdown() {
    seconds--
    start.innerText = seconds;
    console.log(seconds);
    if (seconds == 0) {
      clearInterval(game);
      gameStart();
    }
  }

  function nextLvl() {
    document.querySelectorAll('.game').forEach(function(elem) {
      elem.style.display = 'none';
      elem.setAttribute('disabled', '');
    });
    lvlup.style.display = 'block';
    var elem = setInterval(function() {
      if (lvlup.style.fontSize == '3em') {
        lvlup.style.fontSize = '3.5em';
      }
      else {
        lvlup.style.fontSize = '3em';
      }
    }, 200);
    setTimeout(function(){
        clearInterval(elem);
        start.style.display = 'inline-block';
        reset.style.display = 'none';
        start.innerText = 'Start';
        lvlup.style.display = 'none';
      }, 2500);
  }

  var cantBtn;
  var newBtn;
  var i = 1;

  var btn = document.getElementById(i);
  btn.onclick = activarBtn;

  function contarBtn() {
    cantBtn = document.querySelectorAll('.game').length;
  }

  function activarBtn() {
    contarBtn();
    i++;
    btn = document.getElementById(i);
    if (i < cantBtn) {
      btn.removeAttribute('disabled');
      btn.onclick = activarBtn;
    }
    if (i == cantBtn && btn.hasAttribute('disabled')) {
      btn.removeAttribute('disabled');
      btn.onclick = nextLvl;
      btn.onclick = crearBtn;
    }
  }
  function crearBtn () {
    contarBtn();
    var next;
    next = cantBtn + 1;
    newBtn = document.createElement('button');
    if (next < 10) {
      newBtn.innerText ="0" + next;
    }
    else {
      newBtn.innerText = next;
    }
    newBtn.setAttribute('type', 'button');
    newBtn.setAttribute('class' , 'game');
    newBtn.setAttribute('id', next);
    newBtn.style.display = 'inline-block';
    newBtn.setAttribute('disabled', "");
    document.querySelector('.game-container').appendChild(newBtn);
    nextLvl();
  }

}
