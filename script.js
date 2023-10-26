/* Organizes the process of creating leaves, editing their colors over time, etc. */

// Get the tree and container elements
const tree = document.getElementById("tree");

// Number of leaves
const numLeaves = 1500;

// Function to create and position leaves
function createLeaf() {
    const leaf = document.createElementNS("http://www.w3.org/2000/svg", "image");
    leaf.setAttribute("href", "leaf.svg");
    leaf.setAttribute("width", "10");
    leaf.setAttribute("height", "10");

    // Calculate random position within the tree's boundaries in an elliptical shape
    const treeBBox = tree.getBBox();
    const centerX = treeBBox.x + treeBBox.width / 2.2;  // Adjust elliptical width
    const centerY = treeBBox.y + treeBBox.height / 4.5; // Adjust elliptical height
    const rx = treeBBox.width / 2;
    const ry = (treeBBox.height * 2.4) / 5; // Adjust to be less than 2.4/5 (found after testing)

    // Randomly offset the position within the ellipse
    const angle = Math.random() * Math.PI * 2;
    const xOffset = Math.random() * rx;
    const yOffset = Math.random() * ry;
    const x = centerX + xOffset * Math.cos(angle);
    const y = centerY + yOffset * Math.sin(angle);

    // Ensure the leaves are within the tree's boundaries
    if (x >= treeBBox.x && x <= treeBBox.x + treeBBox.width && y >= treeBBox.y && y <= treeBBox.y + treeBBox.height) {
        leaf.setAttribute("x", x);
        leaf.setAttribute("y", y);
        leaf.setAttribute("class","leaf")

        // Append leaves behind the tree
        tree.appendChild(leaf);
    }
}

// Create and position the leaves
for (let i = 0; i < numLeaves; i++) { 
    createLeaf(); 
}

// Edit colors when a leaf element is clicked
$('.leaf').click(function() {
    const r1 = "invert(36%) sepia(44%) saturate(1479%) hue-rotate(322deg) brightness(76%) contrast(100%)"
    const r2 = "invert(55%) sepia(27%) saturate(4320%) hue-rotate(345deg) brightness(83%) contrast(78%)"
    const r3 = "invert(22%) sepia(34%) saturate(4246%) hue-rotate(348deg) brightness(91%) contrast(89%)";

    const distr = [1, 1, 1, 2, 2, 3];
    let colorChoice = distr[Math.floor(Math.random() * distr.length)];

    switch(colorChoice) {
        case 2:
            console.log("r2")
            $(this).css("filter", r2);
            break;
        case 3:
            console.log("r3")
            $(this).css("filter", r3);
            break;
        default:
            console.log("r1")
            $(this).css("filter", r1);
    }
});

// Function for initializing tree's leaf colors
$(document).ready(function() {

    const r1 = "invert(57%) sepia(48%) saturate(447%) hue-rotate(48deg) brightness(98%) contrast(94%)"
    const r2 = "invert(28%) sepia(97%) saturate(720%) hue-rotate(54deg) brightness(93%) contrast(80%)"
    const r3 = "invert(48%) sepia(51%) saturate(568%) hue-rotate(48deg) brightness(97%) contrast(85%)";

    const distr = [1, 1, 1, 2, 2, 3];

    $('.leaf').each(function() {
        let colorChoice = distr[Math.floor(Math.random() * distr.length)];

        switch(colorChoice) {
            case 2:
                $(this).css("filter", r2);
                break;
            case 3:
                $(this).css("filter", r3);
                break;
            default:
                $(this).css("filter", r1);
        }            
    });
})

// Changing tree leaf a couple one at a time
var delta = Math.floor(Math.random()*3) + 2;
var numChoices = $(".leaf").length;
var leafDelta = 2;

// Selecting leaves to change
var currLeaves = []
var numToChange = Math.floor(Math.random() * 5) + 2;
for (let i = 0; i < numToChange; i++) {
    currLeaves.push(Math.floor(Math.random() * numChoices) + 1)
  }

// Function for reselcting leaves to change
function findLeavesToChange() {
    currLeaves = []
    numToChange = Math.floor(Math.random() * 5) + 2 + leafDelta;
    for (let i = 0; i < numToChange; i++) {
        currLeaves.push(Math.floor(Math.random() * numChoices) + 1)
    }
    if (leafDelta < 60) {
        leafDelta += 1;
    }
    console.log(leafDelta)
}

// Define the function to be executed at the specified interval
function changeLeaf() {  
  
    const r1 = "invert(36%) sepia(44%) saturate(1479%) hue-rotate(322deg) brightness(76%) contrast(100%)"
    const r2 = "invert(55%) sepia(27%) saturate(4320%) hue-rotate(345deg) brightness(83%) contrast(78%)"
    const r3 = "invert(22%) sepia(34%) saturate(4246%) hue-rotate(348deg) brightness(91%) contrast(89%)";

    const distr = [1, 1, 1, 2, 2, 3];

    // Changing each leaf according to random selection
    for (let i = 0; i < numToChange; i++) {
        let colorChoice = distr[Math.floor(Math.random() * distr.length)];
        let randomChoice = Math.floor( Math.random() * numLeaves ) + 1;
    
        switch(colorChoice) {
            case 2:
                $(".leaf").eq(randomChoice).css("filter", r2);
                break;
            case 3:
                $(".leaf").eq(randomChoice).css("filter", r3);
                break;
            default:
                $(".leaf").eq(randomChoice).css("filter", r1);
        }
    }
    delta = Math.floor(Math.random()*3) + 2;
    findLeavesToChange()
}

// Set the interval to execute 'myFunction' every 'delta' seconds
var leafInterval = setInterval(changeLeaf, delta*1000);
const stopTimeout = setTimeout(() => {
    clearInterval(leafInterval); // This will stop the setInterval
  }, 300000)
