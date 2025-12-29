// Get references to HTML elements
const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const profileDiv = document.getElementById("profile");
const errorText = document.getElementById("error");
const loadingText = document.getElementById("loading");

// Add click event to button
searchBtn.addEventListener("click", fetchProfile);


// ✅ NEW FIXED LOGIC (Frontend → Backend → GitHub)
async function fetchProfile() {

  // Get username value
  const username = usernameInput.value.trim();

  // Input validation
  if (!username) {
    errorText.textContent = "Please enter a GitHub username";
    profileDiv.innerHTML = "";
    return;
  }

  // Reset UI states
  errorText.textContent = "";
  profileDiv.innerHTML = "";
  loadingText.style.display = "block";

  try {
    // Frontend calls backend API
    const response = await fetch(
      `http://localhost:5000/api/github/${username}`
    );

    // Handle error response
    if (!response.ok) {
      throw new Error("User not found");
    }

    // Convert response to JSON
    const data = await response.json();

    // Display user profile
    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" />
      <p><strong>Name:</strong> ${data.name || "Not available"}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
    `;

  } catch (error) {
    // Show error message
    errorText.textContent = error.message;
  } finally {
    // Hide loading text
    loadingText.style.display = "none";
  }
}
