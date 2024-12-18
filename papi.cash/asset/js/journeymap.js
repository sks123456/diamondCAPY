const dot = document.getElementById("dot");
const lineExtension = document.getElementById("line-extension");
const linePath = document.getElementById("line-path");
const branches = document.querySelectorAll(".branch");
const popup = document.getElementById("description-modal");
const popupText = document.getElementById("modal-description");
const popupTitle = document.getElementById("modal-title");
const popupClose = document.getElementById("modal-close");
const roadmapContainer = document.querySelector(".roadmap"); // Reference to the parent container

let isDragging = false;
let currentLeft = 0;

// For mobile and desktop, listen to both mouse and touch events
dot.addEventListener("mousedown", startDragging);
dot.addEventListener("touchstart", startDragging, { passive: false }); // Prevent default to enable dragging

function startDragging(e) {
  isDragging = true;

  // Remove transition while dragging (this will prevent smooth movement)
  dot.style.transition = ""; // Disable transition during drag

  // Prevent default behavior (for touch events)
  if (e.type === "touchstart") {
    e.preventDefault(); // Prevents scrolling while dragging
  }

  // Set up mouse/touch move and end events
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("touchmove", handleMouseMove, { passive: false }); // Prevents scrolling during drag
  document.addEventListener("touchend", stopDragging);
}

function stopDragging() {
  isDragging = false;

  // Remove move and end listeners when dragging stops
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", stopDragging);
  document.removeEventListener("touchmove", handleMouseMove);
  document.removeEventListener("touchend", stopDragging);
}

function handleMouseMove(e) {
  if (!isDragging) return;

  // Get position from either mouse or touch event
  let clientX = e.clientX; // For mouse
  if (e.type.startsWith("touch")) {
    clientX = e.touches[0].clientX; // For touch
  }

  const rect = linePath.getBoundingClientRect();
  let newLeft = clientX - rect.left;

  // Restrict the dot's movement within the boundaries
  currentLeft = Math.max(0, Math.min(linePath.offsetWidth, newLeft));

  // Use requestAnimationFrame to update the dot and line together
  requestAnimationFrame(updateUI);
}

function updateUI() {
  // Update the dot's position
  dot.style.left = `${currentLeft}px`;

  // Update the line to match the dot's position
  lineExtension.style.width = `${currentLeft}px`;

  // Trigger auto-scrolling if the dot is close to the left or right end
  autoScrollRoadmap(currentLeft);

  // Update the branches and check if the description should be shown
  updateBranches(currentLeft);
}

// Store the goals and their positions dynamically (from previous example)
const goals = [];

const container = document.querySelector(".roadmap-container");
const containerWidth = container.offsetWidth; // Get the width of the container

// Function to populate the goals array with pixel positions
function getGoalsPosition() {
  const goalElements = document.querySelectorAll(".branch"); // Select all goal elements
  goalElements.forEach((goal) => {
    const goalId = goal.id; // Get the id of the goal
    const leftPercentage = parseFloat(goal.style.left); // Get the left position (percentage)
    const leftPosition = containerWidth * ((leftPercentage - 10) / 100); // Convert percentage to pixels
    goals.push({ id: goalId, left: leftPosition }); // Store the goal id and its pixel position in the array
  });
}
console.log(goals);

// Call this function once when the page loads or when you want to initialize the goals array
getGoalsPosition();

// Function to update the branches based on the current position
function updateBranches(position) {
  // Loop through the goals array instead of directly querying the DOM for branches
  goals.forEach((goal) => {
    const branch = document.getElementById(goal.id); // Get the branch by its id
    const verticalLine = branch.querySelector(".vertical-line");
    const labelAbove = branch.querySelector(".branch-label-above");
    const labelBelow = branch.querySelector(".branch-label-below");

    // Check if the position is near the goal (activated)
    if (position >= goal.left) {
      verticalLine.style.backgroundColor = "#4CAF50"; // Light up the vertical line
      if (labelAbove) {
        labelAbove.style.color = "#4CAF50"; // Light up the label for above
      }
      if (labelBelow) {
        labelBelow.style.color = "#4CAF50"; // Light up the label for below
      }

      // Show the modal when a goal is activated
      showPopup(branch);
    } else {
      verticalLine.style.backgroundColor = "#ccc"; // Reset the vertical line
      if (labelAbove) {
        labelAbove.style.color = "#333"; // Reset the label color for above
      }
      if (labelBelow) {
        labelBelow.style.color = "#333"; // Reset the label color for below
      }

      // Hide the modal when the goal is deactivated
      hidePopup();
    }
  });
}

// Show the popup with goal information
function showPopup(branch) {
  const goalTitle = branch.querySelector("span").innerText; // Goal name
  popupTitle.innerText = goalTitle;

  // Get the description for the specific goal
  const goalDescription = getGoalDescription(goalTitle);

  popupText.innerText = goalDescription;

  // Show the modal with transition
  popup.style.display = "flex"; // Initially set to flex
  setTimeout(() => {
    popup.classList.add("show"); // Add show class after display is set
  }, 10); // A small timeout to ensure the display change is recognized by the browser
}

// Hide the popup with smooth transition
function hidePopup() {
  if (popup) {
    // Check if popup is available
    popup.classList.remove("show"); // Remove the show class to start the fade-out transition
  }
}

popupClose.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);

// Define goal descriptions
function getGoalDescription(goalTitle) {
  const descriptions = {
    "Goal 1: Meme Coin Community Growth":
      "This goal focuses on building a strong community for the meme coin project through social engagement, campaigns, and influencer collaborations. The aim is to create a fun and loyal user base that drives the coin's value and adoption.",
    "Goal 2: NFT Collection Launch":
      "The NFT Collection will feature unique digital assets, designed to represent the meme coin ecosystem. These NFTs can be used in various applications, and the sale will raise funds and attract more investors into the community.",
    "Goal 3: NFT Game Release":
      "This goal is about launching an engaging NFT-based game where users can play to earn, stake NFTs, and engage with the meme coin ecosystem. The game will drive user interaction and coin utility.",
    "Goal 4: Trading Bot and Staking Launch":
      "Launch automated trading bots and staking solutions to enhance user experience and provide additional revenue streams. These tools will help users maximize profits while supporting the meme coin's value.",
    "Goal 5: DHC Integration with BY1":
      "Partner with BY1.io to allow DHC (our meme coin) to be used as in-app currency on their platform. This partnership will increase the utility of the coin and enhance its adoption.",
    "Goal 6: Trading Tools Development":
      "Develop and launch a set of advanced trading tools designed to help traders maximize their profits using the meme coin. This includes price alerts, charts, and automated trading systems.",
    "Goal 7: DHC Token Utility Expansion":
      "Expand the use cases of the DHC token by integrating it into more platforms, services, and marketplaces. This goal aims to increase the demand and real-world utility of the token.",
    "Goal 8: Strategic Partnerships & Expansion":
      "Focus on securing key strategic partnerships with influencers, projects, and platforms to help expand the meme coin ecosystem and increase its global reach.",
  };
  return descriptions[goalTitle] || "No description available for this goal.";
}

// Auto-scroll the roadmap container when the dot is near the right or left edge
function autoScrollRoadmap(dotPosition) {
  const containerWidth = roadmapContainer.offsetWidth;
  const containerScrollWidth = roadmapContainer.scrollWidth;

  // If the dot is near the right edge, scroll the container to the right
  if (dotPosition >= containerWidth - 200) {
    // 100px buffer before triggering scroll
    const maxScroll = containerScrollWidth - containerWidth;
    roadmapContainer.scrollLeft = Math.min(
      maxScroll,
      roadmapContainer.scrollLeft + 10 // Scroll to the right gradually
    );
  }

  // If the dot is near the left edge, scroll the container to the left
  else if (dotPosition - containerWidth <= containerWidth + 100) {
    // 100px buffer for scrolling left
    roadmapContainer.scrollLeft = Math.max(
      0,
      roadmapContainer.scrollLeft - 10 // Scroll to the left gradually
    );
  }
}

const backToStartBtn = document.getElementById("back-to-start-btn");

// Event listener for "Back to Start" button
backToStartBtn.addEventListener("click", () => {
  moveDotToStart();
});

// Function to move the dot to the start node with transition
function moveDotToStart() {
  // Temporarily enable the transition for the start movement
  dot.style.transition = "left 0.3s ease"; // Smooth transition for left movement

  // Set currentLeft to 0 (start position)
  currentLeft = 0;

  // Reset the branches' styles (goal 1 to goal 4, etc.)
  branches.forEach((branch) => {
    const verticalLine = branch.querySelector(".vertical-line");
    const labelAbove = branch.querySelector(".branch-label-above");
    const labelBelow = branch.querySelector(".branch-label-below");
    console.log(branch);

    // Reset the vertical line and label colors for all branches
    verticalLine.style.backgroundColor = "#ccc";
    if (labelAbove) {
      labelAbove.style.color = "#333"; // Reset the label color for above
    }
    if (labelBelow) {
      labelBelow.style.color = "#333"; // Reset the label color for below
    }
  });
  updateUI();
  // After the transition ends, remove the transition so dragging won't be affected
  setTimeout(() => {
    dot.style.transition = ""; // Remove the transition after the movement
  }, 300); // Match the duration of the transition (0.3s)
}
