document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown-timer");

  // Set your event date here
  const eventDate = new Date("2024-12-31T23:59:59").getTime();

  // Update the countdown every second
  const updateCountdown = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft < 0) {
      clearInterval(updateCountdown);
      countdownElement.innerHTML = `
          <div class="countdown-expired">
            <h2>The event has started!</h2>
          </div>`;
      return;
    }

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the countdown
    countdownElement.innerHTML = `
        <div class="countdown-container">
          <div class="time-box">
            <span class="time">${days}</span>
            <span class="label">Days</span>
          </div>
          <div class="time-box">
            <span class="time">${hours}</span>
            <span class="label">Hours</span>
          </div>
          <div class="time-box">
            <span class="time">${minutes}</span>
            <span class="label">Minutes</span>
          </div>
          <div class="time-box">
            <span class="time">${seconds}</span>
            <span class="label">Seconds</span>
          </div>
        </div>`;
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number-counter");

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-value");
      const current = +counter.innerText.replace(/,/g, ""); // Remove commas for parsing
      const increment = Math.ceil(target / 100); // Adjust speed by changing 100

      if (current < target) {
        counter.innerText = (current + increment).toLocaleString();
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
});

function copyToClipboard() {
  // Get the contract address text
  var copyText = document.getElementById("contract-address").innerText;

  // Create a temporary textarea element to copy text to clipboard
  var textArea = document.createElement("textarea");
  textArea.value = copyText;
  document.body.appendChild(textArea);

  // Select the text and copy it
  textArea.select();
  document.execCommand("copy");

  // Remove the textarea element after copying
  document.body.removeChild(textArea);

  // Alert the user that the address has been copied
  alert("Contract Address copied to clipboard!");
}
