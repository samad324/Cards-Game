// +================ json dummy data ============= 
var isCardSelected = false;
const cards = [
    [
        {
            cardNumber: 1,
            cardName: 'card1'
        },
        {
            cardNumber: 2,
            cardName: 'card2'
        },
        {
            cardNumber: 2,
            cardName: 'card2'
        },
        {
            cardNumber: 4,
            cardName: 'card4'
        },
        {
            cardNumber: 1,
            cardName: 'card1'
        },
        {
            cardNumber: 3,
            cardName: 'card2'
        },
        {
            cardNumber: 4,
            cardName: 'card2'
        },
        {
            cardNumber: 3,
            cardName: 'card4'
        },
    ],
    [{
        cardNumber: 5,
        cardName: 'card5'
    },
    {
        cardNumber: 6,
        cardName: 'card6'
    },
    {
        cardNumber: 5,
        cardName: 'card5'
    },
    {
        cardNumber: 7,
        cardName: 'card6'
    }, {
        cardNumber: 6,
        cardName: 'card5'
    },
    {
        cardNumber: 8,
        cardName: 'card6'
    },
    {
        cardNumber: 8,
        cardName: 'card5'
    },
    {
        cardNumber: 7,
        cardName: 'card6'
    }],
    [{
        cardNumber: 10,
        cardName: 'card5'
    },
    {
        cardNumber: 11,
        cardName: 'card6'
    },
    {
        cardNumber: 10,
        cardName: 'card5'
    },
    {
        cardNumber: 12,
        cardName: 'card6'
    }]
];


// =========== event handlers ============

const isOdd = number => number % 2;
const startButton = document.getElementById('startButton');
const getRandomeNumber = () => Math.floor((Math.random() * 3));
const arrayOfElemenatedCards = [];
let player1 = document.querySelector('#player1Score');
let player2 = document.querySelector('#player2Score');
let currentPlayer = document.querySelector('#player');
let player1Score = 0;
let player2Score = 0;
let turn = 1;

changeTurn()

player1.innerHTML = player1Score;
player2.innerHTML = player2Score;

startButton.addEventListener('click', startNewGame);

function startNewGame() {
    console.log("========STARTING NEW GAME========")
    const number = getRandomeNumber();
    localStorage.setItem('arrayOfCards', JSON.stringify(cards[number]));
    printCardsToDom()
}

function changeTurn(){
    currentPlayer.innerHTML = turn;
}


function shuffleAgain() {
    const arr = JSON.parse(localStorage.getItem('arrayOfCards'));
    const shuffledArray = [];
    
    for (let i = 0; arr.length > 0; i++) {
        const randomNumber = Math.floor(Math.random() * arr.length);
        shuffledArray.push(arr[randomNumber]);
        arr.splice(randomNumber, 1)
    }

    localStorage.setItem('arrayOfCards', JSON.stringify(shuffledArray));
    printCardsToDom();
}

function printCardsToDom() {
    let cardContainer = document.getElementById('cardshowcase');
    let cardsArray = JSON.parse(localStorage.getItem('arrayOfCards'));
    cardContainer.innerHTML = '';
    cardsArray.map((item, index) => {
        cardContainer.innerHTML += `
        <div class="col-md-3 col-lg-3 col-sm-12 my-2">
            <div class='cardContiner' id='card${index}' onClick="selectCardAndCheckMatch(${item.cardNumber}, 'card${index}')">
                <div class='front display-2 d-flex align-items-center justify-content-center'>S</div>
                <div class='back align-items-center justify-content-center d-flex flex-column'>
                    <h1>${item.cardNumber}</h1>
                    <h1>${item.cardName}</h1>
                </div>
            </div>
        </div>
        `
    });
};


function flipCard(id) {
    let div = document.querySelector(`#${id}`);
    let front = div.querySelector(`.front`);
    let back = div.querySelector(`.back`);

    front.style.transform = 'rotateY(180deg)';
    back.style.transform = 'rotatex(-360deg)';
    back.style.transform = 'rotatex(-360deg)';
    front.style.visibility = 'hidden';
    back.style.visibility = 'visible';
}

function printCardsToDomOfEliminated() {
    let cardContainer = document.getElementById('eliminatedCardShowcase');
    cardContainer.innerHTML = '';
    arrayOfElemenatedCards.map(item => {
        cardContainer.innerHTML += `
        <div class="col-md-3 col-lg-3 col-sm-12 my-2">
        <div class="card" onClick="selectCardAndCheckMatch(${item.cardNumber})">
            <div class="card-body">
                    <h1>${item.cardNumber}</h1>
                    <h1>${item.cardName}</h1>
            </div>
        </div>
        </div>
        `
    });
};

function selectCardAndCheckMatch(cardNumber, id) {
    console.log('selectCardAndCheckMath')
    let arrayOfCards = JSON.parse(localStorage.getItem('arrayOfCards'));

    flipCard(id)
    setTimeout(() => {

        if (isCardSelected) {
            let previouseCardNumber = localStorage.getItem('cardNumber');
            isCardSelected = false;
            localStorage.removeItem("cardNumber");
            if (Number(previouseCardNumber) === cardNumber) {
                swal(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                );
                const eliminatedCardarary = arrayOfCards.filter(item => !(item.cardNumber !== cardNumber));
                const remainingCards = arrayOfCards.filter(item => item.cardNumber !== cardNumber);
                arrayOfCards = remainingCards;
                localStorage.setItem('arrayOfCards', JSON.stringify(arrayOfCards));
                printCardsToDom();
                arrayOfElemenatedCards.push(eliminatedCardarary[0]);
                printCardsToDomOfEliminated();
                if (turn == 1) {
                    player1Score++;
                    turn = 2;
                    player1.innerHTML = player1Score;
                } else if (turn == 2) {
                    player2Score++;
                    turn = 1;
                    player2.innerHTML = player2Score;
                }
                changeTurn()

            } else {
                console.log('inside second last else')
                // localStorage.removeItem('cardNumber')
                shuffleAgain();
                if (turn == 1) {
                    turn = 2;
                    player1.innerHTML = player1Score;
                } else if (turn == 2) {
                    turn = 1;
                    player2.innerHTML = player2Score;
                }
                changeTurn()
            }
        } else {
            console.log('inside last else')
            localStorage.setItem('cardNumber', cardNumber);
            isCardSelected = true;
        }

    }, 800)
};