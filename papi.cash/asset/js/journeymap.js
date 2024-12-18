const dot = document.getElementById("dot");
const lineExtension = document.getElementById("line-extension");
const linePath = document.getElementById("line-path");
const branches = document.querySelectorAll(".branch");
const popup = document.getElementById("description-modal");
const popupText = document.getElementById("modal-description");
const popupTitle = document.getElementById("modal-title");
const popupClose = document.getElementById("modal-close");

let isDragging = false;
let currentLeft = 0;

// Event listener to drag the dot
dot.addEventListener("mousedown", () => {
  isDragging = true;
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", stopDragging);
});

function stopDragging() {
  isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
}

function handleMouseMove(e) {
  if (!isDragging) return;

  const rect = linePath.getBoundingClientRect();
  let newLeft = e.clientX - rect.left;

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

  // Update the branches and check if the description should be shown
  updateBranches(currentLeft);
}

function updateBranches(position) {
  branches.forEach((branch) => {
    const verticalLine = branch.querySelector(".vertical-line");
    const labelAbove = branch.querySelector(".branch-label-above");
    const labelBelow = branch.querySelector(".branch-label-below");

    // Check if the dot is near the branch (activated)
    if (position >= branch.offsetLeft - dot.offsetLeft / 2) {
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
  popup.classList.remove("show"); // Remove the show class to start the fade-out transition
}

popupClose.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);

// Define goal descriptions
function getGoalDescription(goalTitle) {
  const descriptions = {
    "Goal 1: Community Building":
      "Community Building is about fostering a sense of belonging among members, creating an environment where individuals feel connected and valued. Activities and initiatives may include social events, networking opportunities, and collaboration efforts that promote long-term relationships.",
    "Goal 2: Marketing and Adoption":
      "Marketing and Adoption focuses on creating awareness about the product or service, reaching a wider audience, and encouraging adoption. This goal often involves strategies such as digital marketing campaigns, influencer partnerships, and community outreach to increase user base and engagement.",
    "Goal 3: Sustainability":
      "Sustainability is the goal of creating practices and systems that promote environmental, economic, and social well-being over the long term. Initiatives may include reducing carbon footprint, utilizing renewable energy, and ensuring that products and processes are environmentally responsible and economically viable.",
    "Goal 4: Security and Compliance":
      "Security and Compliance aims to protect sensitive information and maintain adherence to relevant laws and regulations. It involves safeguarding data, ensuring privacy, implementing secure processes, and ensuring compliance with legal frameworks to prevent breaches and protect stakeholders.",
  };

  // Return the description for the current goal
  return descriptions[goalTitle] || "Description not available.";
}
