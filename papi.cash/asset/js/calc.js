document.getElementById("crypto").addEventListener("change", function (event) {
  // Get selected option
  const selectedOption = event.target.options[event.target.selectedIndex];
  const logo = selectedOption.dataset.logo || "./assets/placeholder-logo.png";

  // Update preview image
  document.getElementById("logo-preview-img").src = logo;
});

document
  .getElementById("fetch-and-calculate-button")
  .addEventListener("click", async function () {
    const dhcPrice = parseFloat(document.getElementById("dhc-price").value);
    const dhcAmount = parseFloat(document.getElementById("dhc-amount").value);
    const crypto = document.getElementById("crypto").value;

    if (isNaN(dhcPrice) || dhcPrice <= 0) {
      alert("Please enter a valid DHC price.");
      return;
    }

    if (isNaN(dhcAmount) || dhcAmount <= 0) {
      alert("Please enter a valid DHC amount.");
      return;
    }

    try {
      // Fetch data from CoinGecko API
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
      );

      if (response.status === 429) {
        alert("Rate limit exceeded. Please wait a few seconds and try again.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      const otherCryptoPrice = data[crypto].usd;

      // Calculate growth factor
      const growthFactor = otherCryptoPrice / dhcPrice;

      // Calculate DHC value at growth
      const dhcValue = dhcAmount * otherCryptoPrice;

      // Update results
      const cryptoSelect = document.getElementById("crypto");
      const selectedOption = cryptoSelect.options[cryptoSelect.selectedIndex];
      const logo =
        selectedOption.dataset.logo || "./assets/placeholder-logo.png";

      document.getElementById("crypto-logo").src = logo;
      document.getElementById("crypto-name").textContent =
        selectedOption.textContent;
      document.getElementById("other-price").textContent =
        otherCryptoPrice.toFixed(8);
      document.getElementById("growth-factor").textContent =
        growthFactor.toFixed(2);
      document.getElementById("dhc-value").textContent = dhcValue.toFixed(2);

      // Show results section
      document.getElementById("results").style.display = "block";
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }
  });
