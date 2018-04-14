//This allows for the page to run using the DOM and Javascript. //Question and answer array 
//remember to start counting at 0
$(document).ready(function () {
    var answers = [
        {
            question: "Who is Dee and Dennis' biological father?",
            choice: ["Frank", "Rickety Cricket", "The Lawyer"],
            answer: 0,
        },
        {
            question: "What is one of Charlie's favorite meals?",
            choice: ["Hot Dogs and Goldfish", "Peanut Butter Power Balls", "Milk Steak and Jelly Beans"],
            answer: 2,
        },
        {
            question: "What career did Rickety Cricket once have?",
            choice: ["Movie Star", "Priest", "Doctor"],
            answer: 1,
        },
        {
            question: "What is the name of Charlie's play?",
            choice: ["The Nightman Cometh", "Fighter In The Night Man", "Night Crawlers"],
            answer: 0,
        },
        {
            question: "What is the name of the coat that Mac and Dennis love to wear?",
            choice: ["Windbreaker", "Patagonia", "Duster"],
            answer: 2,

        },
        {
            question: "What is the McPoyle brothers' favorite drink?",
            choice: ["Kool Aid", "Milk", "Kombucha"],
            answer: 1,
        },
        {
            question: "What movie character does Frank often confuse his life with?",
            choice: ["Rambo", "Jason Bourne", "Braveheart"],
            answer: 0,
        },
        {
            question: "Kitten Mittens! You'll be...",
            choice: ["Shouting", "Sleepy", "Smitten"],
            answer: 2,
        },
        {
            question: "What game does Frank and Charlie like to play together?",
            choice: ["Night Crawlers", "Headbandz", "Clue Jr."],
            answer: 0,
        },
        {
            question: "Who is Charlie's love obsession?",
            choice: ["Dee", "Mac's Mom", "The Waitress"],
            answer: 2,
        },
        {
            question: "Which are the following are the correct ingredients for Fight Milk?",
            choice: ["Milk, Chicken, and Sugar", "Milk, Crow Eggs, and Vodka", "Milk, Crickets, and Jelly Beans"],
            answer: 1,
        },
        {
            question: "What was Dee's nickname in highschool?",
            choice: ["Metal Machine", "The Aluminum Monster", "Fatty Magoo"],
            answer: 1,
        }];

    //Variables given here to use 
    var pick;
    var index;
    var intervalId;
    var playerInput = "";
    var running = false;
    var questionCount = answers.length;
    var newArray = [];
    var holder = [];



    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < answers.length; i++) {
            holder.push(answers[i]);
        }
    })
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown starting at 8 seconds. Decrement operators in JavaScript will count down the one second at a time. 
    var timer = 8;
    function decrement() {
        $("#timeRemaining").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            noAnswerCount++;
            stop();
            $("#answers").html("<p>'Cmon! You Gotta Watch More Sunny! The answer is: " + pick.choice[pick.answer] + "</p>");
            hideinfo();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * answers.length);
        pick = answers[index];

        $("#questions").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //give array position to check answer
            userChoice.attr("data-guessvalue", i);
            $("#answers").append(userChoice);
        }

        //click function to select answer and outcomes/messages
        $(".answerchoice").on("click", function () {
            //grab array position from player Input
            playerInput = parseInt($(this).attr("data-guessvalue"));
            console.log(this);

            //correct guess or wrong guess messages
            if (playerInput === pick.answer) {
                stop();
                correctCount++;
                playerInput = "";
                $("#answers").html("<p>You are right!</p>");
                hideinfo();

            } else {
                stop();
                wrongCount++;
                playerInput = "";
                $("#answers").html("<p>Nope! Sorry, Jabroni! The answer is: " + pick.choice[pick.answer] + "</p>");
                hideinfo();
            }
        })
    }
    //variables for the right/wrong counter and keeds info hidden from player. 
    var correctCount = 0;
    var wrongCount = 0;
    var noAnswerCount = 0;

    function hideinfo() {

        newArray.push(pick);
        answers.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answers").empty();
            timer = 8;

            //this code allows for the player to see what they got right and wrong. 
            if ((wrongCount + correctCount + noAnswerCount) === questionCount) {
                $("#questions").empty();
                $("#questions").html("<h3>How well do you know It's Always Sunny In Philadelphia?</h3>");
                $("#answers").append("<h4> Right Answers: " + correctCount + "</h4>");
                $("#answers").append("<h4> Wrong Answers: " + wrongCount + "</h4>");
                $("#answers").append("<h4> C'mon! You didn't answer these: " + unanswerCount + "</h4>");
            
           //Shows correct score if player doesn't answer in time. 
            } else {
                runTimer();
                displayQuestion();
            }
        }, 2000);
    }


})