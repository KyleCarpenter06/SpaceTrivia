// --- JS Code for Space Trivia: The Game, © 2019
// --- Created by Kyle Carpenter
// --- Last Edited 12/1/19
// --- Any issues please contact kylecarpenter06@gmail.com

//          ___  ____      ______       __   
//     __  |_  ||_  _|   .' ___   |    / /   __
//    / /    | |_/ /    / .'    \_|   / /    \ \  
//   < <     | __ '.    | |          / /      > > 
//    \_\   _| |  \ \_  \ `.___.'\  / /      /_/  
//         |____||____|  `.____.'  /_/          

//INTELLISENSE PATHS (jQuery)
/// <reference path="../_scripts/jquery-3.4.1.js" />
/// <reference path="../_scripts/jquery-3.4.1.intellisense.js" />

// global params
var isAnimating = "false";
var currentQuestion = null;
var clickedID = null;
var qNumber = 1;
var lNumber = 1;
var lives = 0;
var effectVolume = 0.60;
var musicVolume = 0.60;
var questionSet = [];

// numbers to words
let numtoWords = ["one", "two", "three", "four", "five"];
let levelNames = ["EASY", "MEDIUM", "HARD", "VERY HARD", "EXTREMELY HARD"];

// question/answer arrays
const qa =
    [
        {
            level: 1,
            question: "WHAT PLANET IS CLOSEST TO THE SUN?",
            choice1: "MERCURY",
            choice2: "VENUS",
            choice3: "SATURN",
            choice4: "PLUTO",
            answer: 1
        },
        {
            level: 1,
            question: "WHAT WAS THE NAME OF THE FIRST MANNED MISSION TO THE MOON?",
            choice1: "MERCURY 3",
            choice2: "GEMINI 8",
            choice3: "APOLLO 11",
            choice4: "SKYLAB",
            answer: 3
        },
        {
            level: 1,
            question: "WHAT PLANET IS KNOWN FOR ITS VAST RING SYSTEM?",
            choice1: "EARTH",
            choice2: "JUPITER",
            choice3: "NEPTUNE",
            choice4: "SATURN",
            answer: 4
        },
        {
            level: 1,
            question: "WHAT GALAXY DO WE BELONG TO?",
            choice1: "TRIANGULUM",
            choice2: "MILKY WAY",
            choice3: "ANDROMEDA",
            choice4: "MESSIER 81",
            answer: 2
        },
        {
            level: 1,
            question: "WHAT IS THE NAME OF THE FORCE HOLDING US TO THE EARTH?",
            choice1: "CORIOLIS",
            choice2: "CENTRIPEDAL",
            choice3: "GRAVITY",
            choice4: "CENTRIFUGAL",
            answer: 3
        },
        {
            level: 1,
            question: "WHAT IS THE NAME OF A REGION OF SPACE WHERE LIGHT CANNOT ESCAPE?",
            choice1: "BOOTES VOID",
            choice2: "NEBULA",
            choice3: "WORMHOLE",
            choice4: "BLACK HOLE",
            answer: 4
        },
        {
            level: 1,
            question: "HOW OLD IS OUR SUN?",
            choice1: "4.5 BILLION YEARS",
            choice2: "10 MILLION YEARS",
            choice3: "1 BILLION YEARS",
            choice4: "500 MILLION YEARS",
            answer: 1
        },
        {
            level: 1,
            question: "WHAT DIRECTION WOULD YOU LOOK TO CATCH A SUNRISE?",
            choice1: "NORTH",
            choice2: "SOUTH",
            choice3: "EAST",
            choice4: "WEST",
            answer: 3
        },
        {
            level: 2,
            question: "WHAT IS THE NAME OF THE FIRST SATELLITE INTO SPACE?",
            choice1: "SPUTNIK",
            choice2: "VANGUARD",
            choice3: "BEACON",
            choice4: "PIONEER",
            answer: 1
        },
        {
            level: 2,
            question: "WHAT IS THE NAME OF SPACE OBJECT THAT HAS BEEN UNDER MUCH DEBATE IN RECENT YEARS REGARDING ITS STATUS AS A PLANET?",
            choice1: "CERES",
            choice2: "PLUTO",
            choice3: "IO",
            choice4: "TITAN",
            answer: 2
        },
        {
            level: 2,
            question: "WHAT IS ANOTHER NAME FOR 'THE NORTHERN LIGHTS'?",
            choice1: "SUPERNOVA",
            choice2: "MILKY WAY",
            choice3: "MAGNETIC INTERFERENCE",
            choice4: "AURORA BOREALIS",
            answer: 4
        },
        {
            level: 2,
            question: "WHAT IS THE PROPER TERM FOR THE STUDY OF SPACE?",
            choice1: "ASTROLOGY",
            choice2: "PHYSICS",
            choice3: "ASTRONOMY",
            choice4: "METEOROLOGY",
            answer: 3
        },
        {
            level: 2,
            question: "STARS ARE BORN FROM THESE TYPES OF CLOUDS...",
            choice1: "SUPERNOVAS",
            choice2: "ASTEROID BELTS",
            choice3: "CUMULONIMBUS",
            choice4: "NEBULAS",
            answer: 4
        },
        {
            level: 2,
            question: "WHAT PLANET HAS THE FAMOUS 'GREAT RED SPOT'?",
            choice1: "MARS",
            choice2: "JUPITER",
            choice3: "SATURN",
            choice4: "NEPTUNE",
            answer: 2
        },
        {
            level: 2,
            question: "WHAT YEAR DID HUMANS FIRST LAND ON THE MOON?",
            choice1: "1956",
            choice2: "1969",
            choice3: "1973",
            choice4: "1980",
            answer: 2
        },
        {
            level: 2,
            question: "WHAT PHASE WILL OUR STAR BE ONCE IT DESTROYS EARTH?",
            choice1: "WHITE DWARF",
            choice2: "BROWN DWARF",
            choice3: "RED GIANT",
            choice4: "BLACK HOLE",
            answer: 3
        },
        {
            level: 2,
            question: "WHO WAS THE FIRST HUMAN TO WALK ON THE MOON?",
            choice1: "CHRIS HADFIELD",
            choice2: "BUZZ ALDRIN",
            choice3: "DAVID SCOTT",
            choice4: "NEIL ARMSTRONG",
            answer: 4
        },
        {
            level: 3,
            question: "WHAT IS THE GRAVITATIONAL CURVED TRAJECTORY OF AN OBJECT?",
            choice1: "ORBIT",
            choice2: "ECCENTRICITY",
            choice3: "ORBITAL PERIOD",
            choice4: "INCLINATION",
            answer: 1
        },
        {
            level: 3,
            question: "WHAT PLANET IS NAMED AFTER THE ROMAN GOD OF THE SEA?",
            choice1: "MARS",
            choice2: "PLUTO",
            choice3: "NEPTUNE",
            choice4: "EARTH",
            answer: 3
        },
        {
            level: 3,
            question: "WHAT PLANET IS NAMED AFTER THE ROMAN GODDESS OF BEAUTY?",
            choice1: "URANUS",
            choice2: "MARS",
            choice3: "MERCURY",
            choice4: "VENUS",
            answer: 4
        },
        {
            level: 3,
            question: "WHICH OF THESE PLANETS HAVE RINGS?",
            choice1: "JUPITER",
            choice2: "URANUS",
            choice3: "NEPTUNE",
            choice4: "ALL OF THE ABOVE",
            answer: 4
        },
        {
            level: 3,
            question: "WHAT IS THE 'POINT OF NO RETURN' AROUND A BLACK HOLE CALLED?",
            choice1: "SUPERNOVA",
            choice2: "DEATH ZONE",
            choice3: "EVENT HORIZON",
            choice4: "POINT OF SINGULARITY",
            answer: 3
        },
        {
            level: 3,
            question: "IN A FEW BILLION YEARS, OUR GALAXY WILL MERGE WITH WHAT OTHER GALAXY?",
            choice1: "CENTAURUS A",
            choice2: "SAGITTARIUS A",
            choice3: "NGC 1300",
            choice4: "ANDROMEDA",
            answer: 4
        },
        {
            level: 3,
            question: "WHAT DO SATURNS RINGS MAINLY CONSIST OF?",
            choice1: "ICE",
            choice2: "SMALL ASTERIODS",
            choice3: "GAS",
            choice4: "METEORITES",
            answer: 1
        },
        {
            level: 3,
            question: "WHAT IS THE HOTTEST PLANET IN OUR SOLAR SYSTEM?",
            choice1: "MERCURY",
            choice2: "VENUS",
            choice3: "EARTH",
            choice4: "MARS",
            answer: 2
        },
        {
            level: 3,
            question: "WHAT IS ROUGHLY THE GRAVITY OF EARTH IN METERS PER SECOND?",
            choice1: "2 M/S",
            choice2: "20 M/S",
            choice3: "100 M/S",
            choice4: "10 M/S",
            answer: 4
        },
        {
            level: 3,
            question: "OUR GALAXY IS WHAT TYPE OF GALAXY?",
            choice1: "LENTICULAR",
            choice2: "IRREGULAR",
            choice3: "ELLIPTICAL",
            choice4: "SPIRAL",
            answer: 4
        },
        {
            level: 4,
            question: "THE ASTERIOD BELT IS A REGION OF SPACE BETWEEN THE ORBITS OF...",
            choice1: "JUPITER & SATURN",
            choice2: "SATURN & URANUS",
            choice3: "MARS & JUPITER",
            choice4: "EARTH & MARS",
            answer: 3
        },
        {
            level: 4,
            question: "WHICH PLANET HAS THE MOST CONFIRMED MOONS?",
            choice1: "MARS",
            choice2: "JUPITER",
            choice3: "SATURN",
            choice4: "URANUS",
            answer: 2
        },
        {
            level: 4,
            question: "WHICH PLANET HAS A MYSTERIOUS HEXAGON CLOUD PATTERN AT ITS POLE?",
            choice1: "VENUS",
            choice2: "MARS",
            choice3: "SATURN",
            choice4: "NEPTUNE",
            answer: 3
        },
        {
            level: 4,
            question: "WHAT IS THE BRIGHEST STAR IN THE NIGHT SKY?",
            choice1: "SIRIUS A",
            choice2: "POLARIS",
            choice3: "VEGA",
            choice4: "URSA MAJOR",
            answer: 1
        },
        {
            level: 4,
            question: "WHICH OF THESE IS THE LARGEST STAR?",
            choice1: "BETELGUESE",
            choice2: "RIGEL",
            choice3: "VY CANIS MAJORIS",
            choice4: "ARCTURUS",
            answer: 3
        },
        {
            level: 4,
            question: "WHAT IS THE LARGST MOON IN OUR SOLAR SYSTEM?",
            choice1: "EARTH'S MOON",
            choice2: "TITAN",
            choice3: "CALLISTO",
            choice4: "GANYMEDE",
            answer: 4
        },
        {
            level: 4,
            question: "WHAT IS THE NAME OF THE SPACECRAFT THAT LANDED ON SATURN'S MOON TITAN?",
            choice1: "PIONEER",
            choice2: "HUYGENS",
            choice3: "VOYAGER",
            choice4: "GALILEO",
            answer: 2
        },
        {
            level: 4,
            question: "WHAT SPACECRAFT IS THE FURTHEST FROM EARTH RIGHT NOW?",
            choice1: "VOYAGER",
            choice2: "NEW HORIZONS",
            choice3: "CURIOSITY",
            choice4: "SURVEYOR",
            answer: 1
        },
        {
            level: 4,
            question: "FOR A ROCKET TO LEAVE EARTHS GRAVITY, IT MUST REACH WHAT VELOCITY?",
            choice1: "TERMINAL",
            choice2: "UNIFORM",
            choice3: "ESCAPE",
            choice4: "STABLE",
            answer: 3
        },
        {
            level: 4,
            question: "WHAT CONSTELLATION IS NAMED AFTER THE HUNTER IN GREEK MYTHOLOGY?",
            choice1: "CYGNUS",
            choice2: "URSA MAJOR",
            choice3: "TAURUS",
            choice4: "ORION",
            answer: 4
        },
        {
            level: 4,
            question: "WHAT IS THE NAME OF THE REGION OF SPACE THAT CONSISTS OF VERY FEW GALAXIES?",
            choice1: "BLACK VOID",
            choice2: "BOOTES VOID",
            choice3: "COSMIC VOID",
            choice4: "DARK VOID",
            answer: 2
        },
        {
            level: 5,
            question: "HOW MANY DAYS ARE IN A JULIAN YEAR?",
            choice1: "365",
            choice2: "365.25",
            choice3: "365.5",
            choice4: "370",
            answer: 2
        },
        {
            level: 5,
            question: "HOW MANY STARS ARE IN THE CONSTELLATION ARIES?",
            choice1: "FOUR",
            choice2: "FIVE",
            choice3: "SIX",
            choice4: "SEVEN",
            answer: 1
        },
        {
            level: 5,
            question: "IF WE REPLACED OUR SUN WITH A LARGER STAR, UV SCUTI, WHAT ORBIT WOULD IT REACH?",
            choice1: "MARS",
            choice2: "JUPITER",
            choice3: "SATURN",
            choice4: "PLUTO",
            answer: 3
        },
        {
            level: 5,
            question: "VENUS'S ATMOSPHERE IS MAINLY MADE UP OF WHAT GAS?",
            choice1: "HYDROGEN",
            choice2: "CARBON DIOXIDE",
            choice3: "OXYGEN",
            choice4: "ARGON",
            answer: 2
        },
        {
            level: 5,
            question: "WHICH CONSTELLATION CANNOT BE SEEN IN THE NORTHERN HEMISPHERE?",
            choice1: "URSA MAJOR",
            choice2: "ORION",
            choice3: "CANCER",
            choice4: "CENTAURUS",
            answer: 4
        },
        {
            level: 5,
            question: "HOW MANY MOONS DOES VENUS HAVE?",
            choice1: "NONE",
            choice2: "3",
            choice3: "14",
            choice4: "22",
            answer: 3
        },
        {
            level: 5,
            question: "WHAT IS THE NAME OF THE FAMOUS SCIENTIST WHO DISCOVERED SATURN?",
            choice1: "KEPLER",
            choice2: "HUBBLE",
            choice3: "NEWTON",
            choice4: "GALILEO",
            answer: 4
        },
        {
            level: 5,
            question: "WHAT PLANET SPINS THE OPPOSITE DIRECTION TO ITS ORBITAL MOTION AT 177 DEGREES?",
            choice1: "VENUS",
            choice2: "MARS",
            choice3: "JUPITER",
            choice4: "URANUS",
            answer: 1
        },
        {
            level: 5,
            question: "EARTH IS MOVING THROUGH SPACE IN WHAT TYPE OF MOTION?",
            choice1: "CIRCULAR",
            choice2: "SPIRAL",
            choice3: "ELLIPTICAL",
            choice4: "PARABOLIC",
            answer: 2
        },
        {
            level: 5,
            question: "HOW MUCH OF THE SOLAR SYSTEM IS THE SUN'S MASS?",
            choice1: "LESS THAN 1%",
            choice2: "5%",
            choice3: "MORE THAN 99%",
            choice4: "8%",
            answer: 3
        }
    ];

// onload function
$(document).ready(function ()
{
    // set global sound variable to 60%
    $("audio").each(function ()
    {
        $(this)[0].volume = musicVolume;
    });
    
    // set hover/click audio for all selectable buttons
    $(".button").mouseenter(function ()
    {
        duplicateSounds($("#hover-sound")[0]);
    });
    $(".button").click(function ()
    {
        duplicateSounds($("#click-sound")[0]);
    });

    // click function
    $(".answer-box").click(function () { answerClicked(this); });

    // meteor fly by
    setInterval(function () { meteorFlyBy(); }, 15000);
});

// duplicate sound workaround function
function duplicateSounds(sound)
{
    if (sound.duration > 0 && !sound.paused)
    {
        sound.cloneNode(true).play();
    }
    else
    {
        sound.play();
    }
}

// show story function
function showStory()
{
    // play start music
    if ($("#start-music")[0].paused)
    $("#start-music")[0].play();

    // show/hide divs
    $("#welcome-div").hide();
    $("#story-div").show();

    // remove welcome animation
    $("#welcome-div").removeClass("welcome-fade").addClass("welcome-on");
}

function hideStory()
{
    // show/hide divs
    $("#welcome-div").show();
    $("#story-div").hide();
}

// show instructions function
function showInstructions()
{
    // play start music
    if ($("#start-music")[0].paused)
    $("#start-music")[0].play();

    // show/hide divs
    $("#welcome-div").hide();
    $("#instructions-div").show();

    // remove welcome animation
    $("#welcome-div").removeClass("welcome-fade").addClass("welcome-on");
}

function hideInstructions()
{
    // show/hide divs
    $("#welcome-div").show();
    $("#instructions-div").hide();
}

// next level function
function nextLevel()
{
    // hide other overlay text
    $("#good-job").hide();

    // insert level name
    $(".lvl-name").html(levelNames[lNumber - 1]);

    // insert level text
    $("#level-num").html(numtoWords[lNumber - 1].toUpperCase());

    // change level num for questions
    $("#lvl-num").html(lNumber);

    // set planet level image
    $("#lvl-planet").attr("src", "_img/planet" + lNumber + ".png");

    // generate question set based on current level
    shuffleQuestionSet();

    // hide body content & animations
    $("#content").hide();
    $("#animations").hide();
    $("#lvl-box").removeClass("lvl-fade-out").removeClass("lvl-fade-in");
    $("#question-answer").removeClass("lvl-fade-out").removeClass("lvl-fade-in");

    // show overlay & text
    $("#next-level").show();

    // stop all music
    $('audio').each(function ()
    {
        this.pause(); // Stop playing
        this.currentTime = 0; // Reset time
    });

    // play next level sound
    $("#next-level-sound")[0].play();
}

function levelBegin()
{
    // enable navigation prompt
    window.onbeforeunload = function ()
    {
        return "You're in the middle of the game!\nAre you sure you want to quit?";
    };

    // set isPlaying boolean to "true"
    isPlaying = "true";

    // remove welcome animation
    $("#welcome-div").removeClass("welcome-fade").addClass("welcome-on");

    // show body content & animations
    $("#content").show();
    $("#animations").show();

    // change header size
    $("header").css("height", "140px");
    $("#space").removeClass("space").addClass("space-small");
    $("#trivia").removeClass("trivia").addClass("trivia-small");
    $("#game-inner").removeClass("game-inner").addClass("game-inner-small");
    $("#big-planet").removeClass("big-planet").addClass("med-planet");

    // show level one
    $("#levels").show();
    planetMoveIn();
    setTimeout(function () { lvlFadeIn(); }, 2000);

    // hide welcome & start buttons
    $("#welcome-div").hide();

    // hide overlay & text
    $("#next-level").hide();

    // play level music
    $("#level" + lNumber)[0].play();

    // change level colors
    $("#levels")
        .removeClass("level1")
        .removeClass("level2")
        .removeClass("level3")
        .removeClass("level4")
        .removeClass("level5")
        .addClass("level" + lNumber);

    // set lives, if first level
    if(lNumber === 1) lives = 5;
    $("#lives-num").html(lives);

    // set question
    setQuestion();

    // after 3 seconds, enable choices
    setTimeout(function () { enableAnswers(); }, 3000);
}

function enableAnswers()
{
    $(".answer-box").removeClass("disable-click");
}

function answerClicked(elem)
{
    // find answer from selected div
    clickedID = $(elem).attr("id");

    // highlight selected answer
    $(elem).addClass("selected");

    // disable other answers
    $(".answer-box").not($(elem)).addClass("disabled");

    // compare answer to correct answer
    if (parseInt(clickedID[clickedID.length - 1]) === currentQuestion.answer)
    {
        // delay function until animation completes
        setTimeout(function () { answerReveal(elem, true); }, 3000);

        // play rocket animation & sound
        $("#rocket-game").addClass("rocket-land");
        $("#spaceship-landing")[0].playbackRate = 0.7;
        $("#spaceship-landing")[0].play();
    }
    else
    {
        // delay function until animation completes
        setTimeout(function () { answerReveal(elem, false); }, 2000);

        // play rocket animation & sound
        $("#rocket-game").addClass("rocket-explode");
        $("#spaceship-landing")[0].play();
    }
}

function answerReveal(elem, correct)
{
    if (correct === true)
    {
        // show correct answer
        $(elem).removeClass("selected").addClass("correct");

        // play success sound
        $("#success-sound")[0].play();

        if (qNumber === 5)
        {
            if (lNumber === 5)
            {
                // after 2 seconds, show you win
                setTimeout(function () { youWin(); }, 2000);
            }
            else
            {
                // increment level number
                lNumber++;

                // reset question number
                qNumber = 1;

                // after 2 seconds, show good job
                setTimeout(function () { goodJob(); }, 2000);

                // after 6 seconds, show go to next level
                setTimeout(function () { nextLevel(); }, 6000);
            }
        }
        else
        {
            // increment question number
            qNumber++;

            // pause for 2 seconds, then next question
            setTimeout(function () { nextQuestion(); }, 2000);
        }
    }
    else
    {
        // reset rocket animation
        $("#rocket-game").removeClass("rocket-explode");

        // play explosion animation & sound
        $("#explosion").show();
        duplicateSounds($("#explosion-sound")[0]);

        // deduct one life
        lives--;
        $("#lives-num").html(lives);

        // show incorrect answer
        $(elem).removeClass("selected").addClass("incorrect").addClass("chosen");

        // check for lives left
        if (lives > 0)
        {
            // pause for 2 seconds, then disable answer
            setTimeout(function () { answerDisable(elem); }, 2000);
        }
        else
        {
            // pause for 2 seconds
            setTimeout(function () { gameOver(); }, 2000);
        }
    }
}

function answerDisable(elem)
{
    // hide explosion animation
    $("#explosion").hide();

    // disable chosen answer
    $(elem).removeClass("incorrect").addClass("disabled");

    // re-enable other answers
    $(".answer-box").not("#" + clickedID + ", .chosen").removeClass("disabled");
}

function gameOver()
{
    // hide explosion animation
    $("#explosion").hide();

    lvlFadeOut();
    setTimeout(function () { $("#game-over").show(); }, 2000);
}

function goodJob()
{
    lvlFadeOut();
    setTimeout(function () { $("#good-job").show(); }, 2000);
}

function youWin()
{
    lvlFadeOut();
    setTimeout(function () { $("#you-win").show(); }, 2000);
}

function returnToMainMenu()
{
    // Remove navigation prompt
    window.onbeforeunload = null;

    // reset question number
    qNumber = 1;

    // reset level number
    lNumber = 1;

    // stop all music
    $('audio').each(function ()
    {
        this.pause(); // Stop playing
        this.currentTime = 0; // Reset time
    });

    // play start music
    $("#start-music")[0].play();

    // re-enable all answers
    $(".answer-box").removeClass("incorrect").removeClass("disabled").removeClass("chosen").removeClass("correct");

    // change header size
    $("header").css("height", "250px");
    $("#space").removeClass("space-small").addClass("space");
    $("#trivia").removeClass("trivia-small").addClass("trivia");
    $("#game-inner").removeClass("game-inner-small");
    $("#game-inner").width();
    $("#game-inner").addClass("game-inner");
    $("#big-planet").removeClass("med-planet").addClass("big-planet");

    // show main menu
    $("#levels").hide();
    $("#game-over").hide();
    $("#you-win").hide();
    $("#instructions-div").hide();
    $("#welcome-div").show();
}

function lvlFadeIn()
{
    $("#lvl-box").removeClass("lvl-fade-out").addClass("lvl-fade-in");
    $("#question-answer").removeClass("lvl-fade-out").addClass("lvl-fade-in");
}

function lvlFadeOut()
{
    $("#lvl-box").removeClass("lvl-fade-in").addClass("lvl-fade-out");
    $("#question-answer").removeClass("lvl-fade-in").addClass("lvl-fade-out");
}

function planetMoveIn()
{
    $("#planet").removeClass("lvl-planet-out").addClass("lvl-planet-in");
    setTimeout(function ()
    {
        $("#lvl-planet").removeClass("level" + lNumber + "-glow-out");
        $("#lvl-planet").width();
        $("#lvl-planet").addClass("level" + lNumber + "-glow-in");
    }, 1000);
}

function planetMoveOut()
{
    $("#planet").removeClass("lvl-planet-in").addClass("lvl-planet-out");
    setTimeout(function ()
    {
        $("#lvl-planet").removeClass("level" + lNumber + "-glow-in");
        $("#lvl-planet").width();
        $("#lvl-planet").addClass("level" + lNumber + "-glow-out");
    }, 1000);
}

function meteorFlyBy()
{
    $("#meteor").removeClass("meteor-fly-by");
    $("#meteor").width();
    $("#meteor").addClass("meteor-fly-by");
}

/* randomizes question set */
function shuffleQuestionSet()
{
    // filter array to find question/answer set within level
    var filtered = qa.filter(function (element)
    {
        return firstQ = element.level === lNumber;
    });

    // use random function algorithm to place question out of order
    var shuffled = shuffle(filtered);

    // set global question set variable
    questionSet = shuffled;
}

function setQuestion()
{
    // remove rocket from planet
    $("#rocket-game").removeClass("rocket-land");

    // re-enable all answers
    $(".answer-box").removeClass("disabled").removeClass("chosen").removeClass("correct");

    // set question number
    $("#question-num").html("QUESTION " + numtoWords[qNumber - 1].toUpperCase());

    // set global qa variable
    currentQuestion = questionSet[qNumber];

    // show questions & answers
    $("#question").html(questionSet[qNumber].question);
    $("#answer1").html(questionSet[qNumber].choice1);
    $("#answer2").html(questionSet[qNumber].choice2);
    $("#answer3").html(questionSet[qNumber].choice3);
    $("#answer4").html(questionSet[qNumber].choice4);
}

function nextQuestion()
{
    // fade out qa
    lvlFadeOut();

    // after 1 second, change question, move out planet
    setTimeout(function () { planetMoveOut(); }, 1000);

    // after 2 seconds, move in next planet
    setTimeout(function () { planetMoveIn(); }, 2000);

    // after 3 seconds, change question & remove rocket
    setTimeout(function () { setQuestion(); }, 2000);

    // after 4 seconds, fade in qa
    setTimeout(function () { lvlFadeIn(); }, 4000);
}

/* shuffle algorithm */
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex)
    {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

