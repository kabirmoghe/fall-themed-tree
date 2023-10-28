/* Organizes the process of creating leaves, editing their colors over time, etc. */

/* ------- Setting up tree & leaves ------- */

// Get the tree and container elements
const tree = document.getElementById("tree");

// Number of leaves
const numLeaves = 1500;

// Filters for changing leaf colors
const g1 = "invert(57%) sepia(48%) saturate(447%) hue-rotate(48deg) brightness(98%) contrast(94%)"
const g2 = "invert(28%) sepia(97%) saturate(720%) hue-rotate(54deg) brightness(93%) contrast(80%)"
const g3 = "invert(48%) sepia(51%) saturate(568%) hue-rotate(48deg) brightness(97%) contrast(85%)";
const r1 = "invert(36%) sepia(44%) saturate(1479%) hue-rotate(322deg) brightness(76%) contrast(100%)";
const r2 = "invert(55%) sepia(27%) saturate(4320%) hue-rotate(345deg) brightness(83%) contrast(78%)";
const r3 = "invert(66%) sepia(16%) saturate(1393%) hue-rotate(1deg) brightness(88%) contrast(88%)";

// Distribution for r1, r2, r3 colors for foliage
const distr = [1, 1, 1, 1, 2, 2, 2, 3];

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
        leaf.setAttribute("class","leaf");

        // Append leaves behind the tree
        tree.appendChild(leaf);
    }
}

// Create and position the leaves
for (let i = 0; i < numLeaves; i++) { 
    createLeaf(); 
}

// Shows prompt for user to click a leaf
$("#prompt").delay(2000).fadeIn("fast").delay(10000).fadeOut("fast");

/* ------- Leaves changing ------- */

// Edit colors when a leaf element is clicked
$('.leaf').click(function() {

    const distr = [1, 1, 1, 2, 2, 3];
    let colorChoice = distr[Math.floor(Math.random()*distr.length)];

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

// Function for initializing tree's leaf colors
$(document).ready(function() {

    $('.leaf').each(function() {
        let colorChoice = distr[Math.floor(Math.random()*distr.length)];

        switch(colorChoice) {
            case 2:
                $(this).css("filter", g1);
                break;
            case 3:
                $(this).css("filter", g3);
                break;
            default:
                $(this).css("filter", g2);
        }            
    });
})

// Variables for changing tree leaves
let delta = Math.floor(Math.random()*3) + 2;
let numChoices = $(".leaf").length;
let leafDelta = 2;
let currLeaves = [];
let allChangingLeaves = [];

/* Selecting leaves to change */

// Function for selecting specific leaf
function pickLeaf() {
    let leaf = Math.floor(Math.random()*numChoices) + 1;
    if (allChangingLeaves.includes(leaf)) {
        return pickLeaf();
    } else {
        return leaf;
    }
}

// Function for reselcting leaves to change
function findLeavesToChange() {
    let numToChange = Math.floor(Math.random()*5) + 2 + leafDelta;
    let i = 0;
    while ((allChangingLeaves.length < numChoices) && (i < numToChange)) {
        let chosenLeaf = pickLeaf();
        currLeaves.push(chosenLeaf);
        allChangingLeaves.push(chosenLeaf);
        i++;
    }
    if (leafDelta < 15) { leafDelta = Math.ceil(leafDelta*1.2);}    
}

// Function for change leaves over time
function changeLeaves() {

    if (allChangingLeaves.length < numChoices) {
        // Iterates through each leaf to change and changes its color randomly
        currLeaves.forEach(function(currLeaf) {
            let colorChoice = distr[Math.floor(Math.random()*distr.length)];

            switch(colorChoice) {
                case 2:
                    $(".leaf").eq(currLeaf).css("filter", r2);
                    break;
                case 3:
                    $(".leaf").eq(currLeaf).css("filter", r3);
                    break;
                default:
                    $(".leaf").eq(currLeaf).css("filter", r1);
            }
        });
    } else {
    }

    delta = Math.floor(Math.random()*3) + 2; // creates a new random delta for time between leaves' changes
    currLeaves = []; // resets current list to empty
    findLeavesToChange() // finds new leaves to change
}

// Set the interval to change leaves via changeLeaves every delta seconds
let leafInterval = setInterval(changeLeaves, delta*1000);
const stopTimeout = setTimeout(() => {
    clearInterval(leafInterval); // Stop setInterval after 220s
  }, 220000)
