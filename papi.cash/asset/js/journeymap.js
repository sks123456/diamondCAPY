const dot = document.getElementById("dot");
const lineExtension = document.getElementById("line-extension");
const linePath = document.getElementById("line-path");
const branches = document.querySelectorAll(".branch");
const popup = document.getElementById("description-modal");
const popupText = document.getElementById("modal-description");
const popupTitle = document.getElementById("modal-title");
const popupImage = document.getElementById("modal-image"); // Assuming you updated modal HTML to include an image
const popupClose = document.getElementById("modal-close");
const roadmapContainer = document.querySelector(".roadmap"); // Reference to the parent container

let isDragging = false;
let currentLeft = 0;

// Define goals data
const goalsData = [
  {
    id: "goal1",
    title: "Goal 1: Meme Coin Community Growth",
    description:
      "As a Diamond Hand Cabybara meme coin, this goal focuses on building a vibrant community through engaging social campaigns, educational initiatives, and strategic influencer partnerships. Our objective is to cultivate a dedicated user base that resonates with the values of loyalty and long-term holding, ensuring our coin thrives within the larger cryptocurrency ecosystem.",
    image: "/papi.cash/asset/image/goals/goal1.png",
    timeline: [
      "January 2024: Initial Social Media Campaign",
      "February 2024: Community Engagement Activities",
      "March 2024: Influencer Partnerships and Brand Ambassadors",
    ],
    challenges: [
      "Challenge 1: Building a loyal community",
      "Challenge 2: Competing with other meme coins",
      "Challenge 3: Ensuring long-term engagement",
    ],
  },
  {
    id: "goal2",
    title: "Goal 2: NFT Collection Launch",
    description:
      "The NFT Collection will introduce unique Cabybara-themed digital assets, each embodying the spirit of our meme coin project. These collectibles will not only serve as fun and visually appealing items but will also play a role in fundraising and community building. By incorporating utility and desirability, we aim to attract investors and collectors who want to be part of the Cabybara ecosystem.",
    image: "/papi.cash/asset/image/goals/goal2.png",
    timeline: [
      "April 2024: Design and Conceptualization",
      "May 2024: NFT Minting Process",
      "June 2024: Launch of the NFT Collection",
    ],
    challenges: [
      "Challenge 1: Designing unique and desirable NFTs",
      "Challenge 2: Ensuring smooth minting and purchase process",
      "Challenge 3: Attracting collectors and investors",
    ],
  },
  {
    id: "goal3",
    title: "Goal 3: NFT Game Release",
    description:
      "This goal is centered around the launch of an engaging NFT-based game leveraging the charm of the Cabybara meme. Players will have the opportunity to earn unique NFTs, stake their assets, and fully immerse themselves in a playful environment that promotes interaction and utility within our meme coin universe. With this game, we aim to create a fun way for users to engage with our coin ecosystem while driving adoption and interaction.",
    image: "/papi.cash/asset/image/goals/goal3.png",
    timeline: [
      "July 2024: Game Design and Concept Creation",
      "August 2024: Development and Testing",
      "September 2024: Launch and Community Participation",
    ],
    challenges: [
      "Challenge 1: Balancing fun and utility in gameplay",
      "Challenge 2: Attracting players while maintaining interest",
      "Challenge 3: Integrating NFTs seamlessly into the game",
    ],
  },
  {
    id: "goal4",
    title: "Goal 4: Trading Bot and Staking Launch",
    description:
      "To empower our community, we are committed to launching automated trading bots and staking solutions. This initiative will enhance the user experience by providing tools that allow participants to maximize their returns while helping to stabilize and support the value of the Diamond Hand Cabybara coin. Our goal is to create an ecosystem where both novice and seasoned traders can thrive.",
    image: "/papi.cash/asset/image/goals/goal4.png",
    timeline: [
      "October 2024: Trading Bot Development and Testing",
      "November 2024: Staking Platform Setup",
      "December 2024: Official Launch of Bots and Staking",
    ],
    challenges: [
      "Challenge 1: Ensuring reliability and security of bots",
      "Challenge 2: Attracting users to participate in staking",
      "Challenge 3: Providing ongoing support for bot performance",
    ],
  },
  {
    id: "goal5",
    title: "Goal 5: DHC Integration with BY1",
    description:
      "Partnering with BY1.io represents a significant step in enhancing the utility of the Diamond Hand Cabybara coin. Our aim is to integrate DHC as an in-app currency on their platform, creating real-world applications for our coin. This partnership will not only drive adoption but also create value for holders, reinforcing the commitment to building connections beyond the cryptocurrency space.",
    image: "/papi.cash/asset/image/goals/goal5.png",
    timeline: [
      "January 2025: Initial Partnership Discussions",
      "February 2025: Integration Development",
      "March 2025: Live Integration with BY1 Platform",
    ],
    challenges: [
      "Challenge 1: Integrating DHC smoothly into BY1",
      "Challenge 2: Gaining user trust in the new currency",
      "Challenge 3: Ensuring the partnership benefits all parties",
    ],
  },
  {
    id: "goal6",
    title: "Goal 6: Trading Tools Development",
    description:
      "We envision a suite of advanced trading tools tailored specifically for the Cabybara community. These tools will include price alerts, market analysis charts, and automated trading systems, all designed to assist traders in making informed decisions. By providing powerful resources, we aim to empower our community and promote successful trading strategies that benefit everyone involved.",
    image: "/papi.cash/asset/image/goals/goal6.png",
    timeline: [
      "April 2025: Market Analysis Tool Development",
      "May 2025: Price Alert System Rollout",
      "June 2025: Automated Trading Tools Testing and Launch",
    ],
    challenges: [
      "Challenge 1: Developing accurate and reliable market data",
      "Challenge 2: Ensuring usability for all skill levels",
      "Challenge 3: Attracting users to the trading platform",
    ],
  },
  {
    id: "goal7",
    title: "Goal 7: DHC Token Utility Expansion",
    description:
      "Expand the use cases of the DHC token by integrating it into more platforms, services, and marketplaces.",
    image: "/papi.cash/asset/image/goals/goal7.png",
    timeline: [
      "July 2025: Research New Platform Integrations",
      "August 2025: Secure Partnerships with New Platforms",
      "September 2025: Launch DHC Token Integration",
    ],
    challenges: [
      "Challenge 1: Finding compatible platforms for DHC",
      "Challenge 2: Overcoming regulatory hurdles",
      "Challenge 3: Maintaining user adoption across platforms",
    ],
  },
  {
    id: "goal8",
    title: "Goal 8: Strategic Partnerships & Expansion",
    description:
      "Strategic partnerships will be key to our growth strategy. By collaborating with influencers, projects, and platforms, we strive to amplify the reach and impact of the Diamond Hand Cabybara coin. This initiative will not only expand our community but also solidify our presence in the crypto space, strengthening our brand and elevating our profile among potential investors.",
    image: "/papi.cash/asset/image/goals/goal8.png",
    timeline: [
      "October 2025: Identify Key Strategic Partners",
      "November 2025: Initiate Partnership Negotiations",
      "December 2025: Announce Strategic Partnerships",
    ],
    challenges: [
      "Challenge 1: Identifying high-value partnerships",
      "Challenge 2: Building strong, sustainable partnerships",
      "Challenge 3: Managing relationships with multiple partners",
    ],
  },
];

let goals = [];

// Function to populate the goals array with pixel positions
function getGoalsPosition() {
  const container = document.querySelector(".roadmap-container");
  const containerWidth = container.offsetWidth; // Get the width of the container

  const goalElements = document.querySelectorAll(".branch"); // Select all goal elements
  goalElements.forEach((goal) => {
    const goalId = goal.id; // Get the id of the goal
    const leftPercentage = parseFloat(goal.style.left); // Get the left position (percentage)
    const leftPosition = containerWidth * ((leftPercentage - 10) / 100); // Convert percentage to pixels
    goals.push({ id: goalId, left: leftPosition }); // Store the goal id and its pixel position in the array
  });
}

// Call this function once when the page loads or when you want to initialize the goals array
getGoalsPosition();

// Handle dragging logic
dot.addEventListener("mousedown", startDragging);
dot.addEventListener("touchstart", startDragging, { passive: false });

function startDragging(e) {
  isDragging = true;
  dot.style.transition = ""; // Disable transition during drag

  if (e.type === "touchstart") {
    e.preventDefault(); // Prevents scrolling while dragging
  }
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("touchmove", handleMouseMove, { passive: false });
  document.addEventListener("touchend", stopDragging);
}

function stopDragging() {
  isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", stopDragging);
  document.removeEventListener("touchmove", handleMouseMove);
  document.removeEventListener("touchend", stopDragging);
}

function handleMouseMove(e) {
  if (!isDragging) return;

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

  // Auto-scroll if the dot is close to the edge
  autoScrollRoadmap(currentLeft);

  // Update the branches based on the current position
  updateBranches(currentLeft);
}

// Function to update the branches based on the current position
function updateBranches(position) {
  goals.forEach((goal) => {
    const branch = document.getElementById(goal.id);
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

      // Show the modal with information
      showPopup(branch);
    } else {
      verticalLine.style.backgroundColor = "#ccc"; // Reset the vertical line
      if (labelAbove) {
        labelAbove.style.color = "#333"; // Reset the label color for above
      }
      if (labelBelow) {
        labelBelow.style.color = "#333"; // Reset the label color for below
      }

      // Hide the modal if not activated
      hidePopup();
    }
  });
}

// Show the popup with goal information
function showPopup(branch) {
  const goalId = branch.id; // Get the ID of the branch
  const goal = goalsData.find((g) => g.id === goalId); // Find goal data by ID

  console.log(goal); // Check if goal is found

  if (goal) {
    // Set the title, description, and image
    popupTitle.innerText = goal.title;
    popupText.innerHTML = goal.description; // Check if description exists
    popupImage.src = goal.image;

    // Set Timeline content dynamically
    const timelineContainer = document.getElementById("modal-timeline");
    timelineContainer.innerHTML =
      "<h3>Timeline</h3><ul>" +
      goal.timeline
        .map(
          (item) =>
            `<li><strong>${item.split(":")[0]}:</strong> ${
              item.split(":")[1]
            }</li>`
        )
        .join("") +
      "</ul>";

    // Set Challenges content dynamically
    const challengesContainer = document.getElementById("modal-challenges");
    challengesContainer.innerHTML =
      "<h3>Challenges</h3><ul>" +
      goal.challenges.map((challenge) => `<li>${challenge}</li>`).join("") +
      "</ul>";

    // Show the modal with transition
    popup.style.display = "flex"; // Show the modal
    setTimeout(() => {
      popup.classList.add("show"); // Add the show class for animation
    }, 10);
  }
}

// Hide the popup
function hidePopup() {
  if (popup) {
    popup.classList.remove("show"); // Remove show class
    // Optionally hide the modal after transition
    setTimeout(() => {
      popup.style.display = "none"; // Hide modal completely after transition
    }, 300); // Match the duration of the show transition
  }
}
popupClose.addEventListener("touchstart", hidePopup);

popupClose.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);

// Auto-scroll functionality
function autoScrollRoadmap(dotPosition) {
  const containerWidth = roadmapContainer.offsetWidth;
  const containerScrollWidth = roadmapContainer.scrollWidth;

  // If the dot is near the right edge, scroll the container to the right
  if (dotPosition >= containerWidth - 200) {
    const maxScroll = containerScrollWidth - containerWidth;
    roadmapContainer.scrollLeft = Math.min(
      maxScroll,
      roadmapContainer.scrollLeft + 10
    );
  }

  // If the dot is near the left edge, scroll the container to the left
  else if (dotPosition - containerWidth <= containerWidth + 100) {
    roadmapContainer.scrollLeft = Math.max(
      0,
      roadmapContainer.scrollLeft - 10 // Scroll to the left gradually
    );
  }
}

const backToStartBtn = document.getElementById("back-to-start-btn");

// Event listener for "Back to Start" button
backToStartBtn.addEventListener("click", moveDotToStart);

// Function to move the dot to the start node with transition
function moveDotToStart() {
  dot.style.transition = "left 0.3s ease"; // Smooth transition for left movement
  currentLeft = 0; // Set currentLeft to 0 (start position)

  // Reset the styles for all branches
  branches.forEach((branch) => {
    const verticalLine = branch.querySelector(".vertical-line");
    const labelAbove = branch.querySelector(".branch-label-above");
    const labelBelow = branch.querySelector(".branch-label-below");

    // Reset styles for vertical lines and labels
    verticalLine.style.backgroundColor = "#ccc";
    if (labelAbove) {
      labelAbove.style.color = "#333"; // Reset the label color for above
    }
    if (labelBelow) {
      labelBelow.style.color = "#333"; // Reset the label color for below
    }
  });

  updateUI(); // Update the UI to reflect new position

  // After the transition ends, remove the transition so dragging won't be affected
  setTimeout(() => {
    dot.style.transition = ""; // Remove the transition after the movement
  }, 300); // Match the duration of the transition (0.3s)
}

// Call getGoalsPosition at the beginning to set up the goals array
getGoalsPosition();
