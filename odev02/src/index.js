//tüm resimlerin destesi
var scenes= document.querySelectorAll('.scene')
var cards= document.querySelectorAll('.card')
var winReload = document.getElementById('tryAgainWin')
var loseReload = document.getElementById('tryAgainLose')
//Tüm hamleler
let moves=0;

function winGame(){
    var alan = document.getElementById("alanId");
    var kazandi = document.getElementById('kazandiId');
    alan.style.display = 'none';
    kazandi.style.display = 'initial';
    console.log("you win")
}

function lostGame(){
    var alan = document.getElementById("alanId");
    var yenildi = document.getElementById('yenildiId');
    alan.style.display = 'none';
    yenildi.style.display = 'initial';
    console.log("you lost")
}

function flipCard() {
    moves++;
    if(moves<=2)
        this.classList.toggle('is-flipped');
    if(moves <= 2 && this.id === "1"){
        moves=3;
        winGame();
    }else if(moves === 2){
        lostGame();
    }
}

function shuffle(){
    scenes.forEach(scene => {
        let randomPos = Math.floor(Math.random() * 10);
        scene.style.order = randomPos
        console.log(scene.style.order)
    });
}
const startGame = () => {
    console.log(cards)
    shuffle();
    moves = 0;
}

startGame();

winReload.addEventListener('click', () => location.reload())
loseReload.addEventListener('click', () => location.reload())
cards.forEach(card => card.addEventListener('click', flipCard));

