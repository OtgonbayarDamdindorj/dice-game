// Тоглоомын бүх газар ашиглах глобаль хувьсагчдыг энд зарлая
var activePlayer = 0;
var scores = [0, 0];
var roundScore = 0;
// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалав
var diceDom = document.querySelector(".dice");

//Тоглоомыг эхлүүлнэ
initGame();
// тоглоомыг шинээр эхлэхэд бэлтгэнэ
function initGame() {
    // Тоглогчийн ээлжийг хадгалах хувьсагч нэгдүгээр тоглогчийг 0 хоёрдугаар тоглогчийг 1 гэж тэмдэглэв
activePlayer = 0;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
roundScore = 0;

// Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй 1-6 гэсэ утгыг энд санамсаргүйгээр үүсгэж өгнө
var diceNumber = Math.floor(Math.random() * 6) + 1;

// <div class="player-score" id="score-0">43</div>
// window.document.querySelector("#score-0").textContent = dice;

// document.querySelector("#score-1").innerHTML = "<em>Yes!<em>";

// Програм эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";

document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

//Тоглогчдын нэрийг буцааж гаргах
document.getElementById("name-0").textContent = "Player 1";
document.getElementById("name-1").textContent = "Player 2";

document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");

document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-1-panel").classList.remove("active");

document.querySelector(".player-0-panel").classList.add("active");

diceDom.style.display = "none";     
}

// Шоог шидэх шидэх эвэнт листэнэр
document.querySelector(".btn-roll").addEventListener("click", function (){   
    // 1-6 доторхи санамсаргүй нэг тоо гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    // Шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.style.display = "block";
    diceDom.src = "dice-" + diceNumber + ".png";
    // Буусан тоо нь 1 - ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ 
  if (diceNumber !== 1) {
    // 1- ээс ялгаатай тоо буулаа буусан тоог тоглогчид нэмж өгнө
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
    // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //Шоог түр алга болгоно
    diceDom.style.display = "none";
  }
});
// hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener('click', function(){
    // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
    scores[activePlayer] = scores[activePlayer] + roundScore;
    // Дэлгэц дээр оноог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer] 
    // Уг тоглогч хожсон эсэхийг (оноо нь 100-аас их эсэх) шалгах
    if (scores[activePlayer] >= 10){
        // ялагч гэсэн текстийг нэрнийх нь оронд гаргая
        document.getElementById("name-" + activePlayer).textContent = "Ялагч!";
        document.querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel")
        .classList.add("active");
    } else{
    // Тоглогчийн ээлжийг солино
    switchToNextPlayer();
    }
    
});
// Энэ функц нь тоглох ээлжийг дараагийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer(){
    // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //Шоог түр алга болгоно
    diceDom.style.display = "none"; 
}
// Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
