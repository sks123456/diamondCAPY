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
  popupText.innerText = `This is the description for ${goalTitle}. Here, you can add more content about this goal.`;

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
