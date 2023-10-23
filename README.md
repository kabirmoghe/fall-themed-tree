# DALI Theme Challenge - Kabir Moghe
Hi, I'm Kabir Moghe! This is my DALI developer challenge site. It's a relatively simple fall-themed site that changes colors over time and provides a quick background on my interests.

## Structure & Functionality
The site isn't dynamic per se, but with JS + jQuery, the app changes the tree's colors in a natural way. Other than that, there are a few graphics and an HTML file for the homepage. 

### Fall Theme
* I tried to do something different than what I would normally do for this site and make an aesthetic tree that changed colors alongside the background to mimic fall foliage. While I really enjoy data and functionality, front-end development and design are hobbies of mine (and have been integral parts of my projects in the past). Here, I specificially designed the tree and each leaf. 
* I implemented the code for changing the tree's colors with a mix of JavaScript and jQuery in **script.js**. It essentially generates a multitude of leaves using the **leaf.svg** vector within a random elliptical distribution around the top of the tree and then randomly colors each leaf a certain shade of green or yellow. Then, as a randomly-small amount of time passes (or a user clicks leaves), a small random subset of leaves will change colors to a fall-foliage color. At the same time, the background will change colors as defined in **theme.css**.
* This all comes together in **home.html** (**index.html** on this branch for GH pages purposes), where users can read a little about me, go to my GitHub homepage, or go to my LinkedIn.

**Note:** I initially had trouble with setting up GitHub pages and couldn't get the site to be hosted publicly due to email-related issues. That beind said, I was able to get the site [kabirmoghe.me](https://kabirmoghe.me/) up and running, but if you download this repository and simply open up the home file, the site will work perfectly. Thanks for understanding!
