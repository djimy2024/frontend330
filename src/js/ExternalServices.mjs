const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  static async checkout(order) {
    const url = 'https://wdd330-backend.onrender.com:3000/checkout';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    return await response.json();
  }


  async getData(category) {
  const response = await fetch(`../json/${category}.json`);
  const data = await response.json();
  return data;
  }
  
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }

  async submitOrder(order) {
  try {
    const response = await fetch("https://wdd330-backend.onrender.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Failed to submit order.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}
async checkout(order) {
  const url = 'https://wdd330-backend.onrender.com:3000/checkout';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }
  return await response.json();
}

}


