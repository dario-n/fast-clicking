window.onload = function() {
  var start = document.getElementById('start');
  var reset = document.getElementById('reset');
  var seconds;
  var game;
  start.onclick = set;

  reset.onclick = gameStart;

  function resetCount() {
    seconds = 5;
    i = 1;
    btn = document.getElementById(1);
    btn.removeAttribute('disabled');
  }

  function gameStart () {
    document.querySelectorAll('.game').forEach(function(elem) {
      elem.style.display = 'inline-block';
      elem.style.top = Math.floor((Math.random() * (window.innerHeight * (70/100)/1.3))) + 'px';
      elem.style.left = Math.floor((Math.random() * (window.innerWidth * (70/100)/1.3)))+ 'px';
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
    start.style.display = 'inline-block';
    reset.style.display = 'none';
    start.innerText = 'Start';
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
    if(btn.setAttribute('disabled', '')) {
      console.log("entro");
    }
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
