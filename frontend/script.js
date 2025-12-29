// Get DOM elements
const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");
const profileDiv = document.getElementById("profile");

// Button click event
searchBtn.addEventListener("click", fetchProfile);

// Function to fetch GitHub profile
async function fetchProfile() {

  // Get and clean username
  const username = usernameInput.value.trim();

  // Input validation
  if (!username) {
    errorText.textContent = "Please enter a GitHub username";
    profileDiv.innerHTML = "";
    return;
  }

  // Reset UI
  errorText.textContent = "";
  profileDiv.innerHTML = "";
  loadingText.style.display = "block";

  try {
    // FRONTEND directly calls GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    // Handle invalid username
    if (!response.ok) {
      throw new Error("GitHub user not found");
    }

    const data = await response.json();

    // Display profile
    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" width="100" />
      <p><strong>Name:</strong> ${data.name || "Not available"}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
    `;

  } catch (error) {
    errorText.textContent = error.message;
  } finally {
    loadingText.style.display = "none";
  }
}
