const dot = document.getElementById("dot");
const lineExtension = document.getElementById("line-extension");
const linePath = document.getElementById("line-path");
const branches = document.querySelectorAll(".branch");

// Get the total width of the line path
const maxLimit = linePath.offsetWidth;

// Use requestAnimationFrame to optimize performance
let isDragging = false;
let currentLeft = 0;

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
  currentLeft = Math.max(0, Math.min(maxLimit, newLeft));

  // Use requestAnimationFrame to update the dot and line together
  requestAnimationFrame(updateUI);
}

function updateUI() {
  // Update the dot's position
  dot.style.left = `${currentLeft}px`;

  // Update the line to match the dot's position
  lineExtension.style.width = `${currentLeft}px`;

  // Update the branches
  updateBranches(currentLeft);
}

function updateBranches(position) {
  branches.forEach((branch) => {
    const verticalLine = branch.querySelector(".vertical-line"); // Select the vertical line
    const labelAbove = branch.querySelector(".branch-label-above");
    const labelBelow = branch.querySelector(".branch-label-below");

    if (position >= branch.offsetLeft - dot.offsetLeft / 2) {
      verticalLine.style.backgroundColor = "#4CAF50"; // Light up the vertical line
      if (labelAbove) {
        labelAbove.style.color = "#4CAF50"; // Light up the label for above
      }
      if (labelBelow) {
        labelBelow.style.color = "#4CAF50"; // Light up the label for below
      }
    } else {
      verticalLine.style.backgroundColor = "#ccc"; // Reset the vertical line
      if (labelAbove) {
        labelAbove.style.color = "#333"; // Reset the label color for above
      }
      if (labelBelow) {
        labelBelow.style.color = "#333"; // Reset the label color for below
      }
    }
  });
}
