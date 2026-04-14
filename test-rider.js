const axios = require("axios");

async function createRider() {
  try {
    const response = await axios.post("http://localhost:3000/riders", {
      name: "Abel Rider",
      phone: "0911111111",
    });

    console.log("✅ Rider Created:", response.data);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

createRider();