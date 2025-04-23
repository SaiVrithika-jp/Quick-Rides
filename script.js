window.renderSeatSelection = function () {
    const container = document.getElementById("seatSelectionContainer");
    const numPassengers = parseInt(document.getElementById("passengers").value);
    container.innerHTML = "";
  
    for (let i = 0; i < numPassengers; i++) {
      const label = document.createElement("label");
      label.textContent = `SeatSelection:`;
      const select = document.createElement("select");
      select.className = "seat-select";
      select.innerHTML = `
        <option value="Middle">Middle - Rs.100</option>
        <option value="Aisle">Aisle - Rs.130</option>
        <option value="Window">Window - Rs.150</option>
      `;
      select.addEventListener("change", updateTotalPrice);
      container.appendChild(label);
      container.appendChild(select);
    }
  
    updateTotalPrice();
  };
  
  window.updateTotalPrice = function () {
    const selects = document.querySelectorAll(".seat-select");
    let total = 0;
  
    selects.forEach(select => {
      const seatType = select.value;
      if (seatType === "Window") total += 150;
      else if (seatType === "Middle") total += 130;
      else total += 100;
    });
  
    document.getElementById("totalPrice").textContent = `Rs.${total}`;
  };
  
  window.proceedToPayment = function () {
    const date = document.getElementById("travelDate").value;
    const passengers = document.getElementById("passengers").value;
    const seatSelections = [];
  
    document.querySelectorAll(".seat-select").forEach(select => {
      seatSelections.push(select.value);
    });
  
    const totalPrice = document.getElementById("totalPrice").textContent;
  
    const bookingDetails = {
      date,
      passengers,
      seats: seatSelections,
      totalPrice
    };
  
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    window.location.href = "payment.html";
  };
  
  // Run on load
  document.addEventListener("DOMContentLoaded", renderSeatSelection);
  