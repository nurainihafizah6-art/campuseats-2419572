import { useState } from "react";

function CheckoutForm({ onPlaceOrder }) {
  const [name, setName] = useState("");
  const [mahallah, setMahallah] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!mahallah) {
      newErrors.mahallah = "Please select a mahallah.";
    }

    if (!pickupTime || pickupTime < "07:00" || pickupTime > "22:00") {
      newErrors.pickupTime =
        "Pickup time must be between 7:00 AM and 10:00 PM.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onPlaceOrder({
      name: name.trim(),
      mahallah,
      pickupTime,
    });
  }

  return (
    <section className="checkout-page">
      <h2 className="section-title">Checkout</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="customer-name">Customer Name</label>

          <input
            id="customer-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="mahallah">Mahallah</label>

          <select
            id="mahallah"
            value={mahallah}
            onChange={(e) => setMahallah(e.target.value)}
          >
            <option value="">Select Mahallah</option>

            <option value="Hafsa">Hafsa</option>
            <option value="Aminah">Aminah</option>
            <option value="Asma">Asma</option>
            <option value="Asiah">Asiah</option>
            <option value="Halimah">Halimah</option>
            <option value="Maryam">Maryam</option>
            <option value="Ruqayyah">Ruqayyah</option>
            <option value="Nusaibah">Nusaibah</option>
            <option value="Safiyyah">Safiyyah</option>

            <option value="Salahuddin">Salahuddin</option>
            <option value="Faruq">Faruq</option>
            <option value="Uthman">Uthman</option>
            <option value="Ali">Ali</option>
            <option value="Bilal">Bilal</option>
            <option value="Siddiq">Siddiq</option>
            <option value="Zubair">Zubair</option>
          </select>

          {errors.mahallah && <p className="error-text">{errors.mahallah}</p>}
        </div>

        <div>
          <label htmlFor="pickup-time">Pickup Time</label>

          <input
            id="pickup-time"
            type="time"
            min="07:00"
            max="22:00"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
          {errors.pickupTime && (
            <p className="error-text">{errors.pickupTime}</p>
          )}
        </div>

        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
    </section>
  );
}

export default CheckoutForm;
