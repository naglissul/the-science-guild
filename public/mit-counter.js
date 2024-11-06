const BASE_URL = "https://letscountapi.com";
const NAMESPACE = "the-science-guild-counter2";

async function getCounterValue(key) {
  try {
    const response = await fetch(`${BASE_URL}/${NAMESPACE}/${key}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    if (data.exists === "false") {
      initCounter(key);
      return;
    }
    if (key === "mit-1") {
      document.getElementById("mit-1-count").innerText = data.current_value;
    } else if (key === "mit-2") {
      document.getElementById("mit-2-count").innerText = data.current_value;
    } else if (key === "mit-3") {
      document.getElementById("mit-3-count").innerText = data.current_value;
    } else {
      console.error("invalid key");
    }
  } catch (error) {
    console.error("Failed to get counter value:", error);
  }
}

async function incrementCounter(key) {
  try {
    const response = await fetch(`${BASE_URL}/${NAMESPACE}/${key}/increment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    if (key === "mit-1") {
      document.getElementById("mit-1-count").innerText = data.current_value;
    } else if (key === "mit-2") {
      document.getElementById("mit-2-count").innerText = data.current_value;
    } else if (key === "mit-3") {
      document.getElementById("mit-3-count").innerText = data.current_value;
    } else {
      console.error("invalid key");
    }
  } catch (error) {
    console.error("Failed to increment counter:", error);
  }
}

async function initCounter(key) {
  try {
    const response = await fetch(`${BASE_URL}/${NAMESPACE}/${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    if (data.already_exists === "false") {
      getCounterValue(key);
    }
  } catch (error) {
    console.error("Failed to increment counter:", error);
  }
}

getCounterValue("mit-1");
getCounterValue("mit-2");
getCounterValue("mit-3");
