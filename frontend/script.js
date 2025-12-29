// Get references to HTML elements
const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const profileDiv = document.getElementById("profile");
const errorText = document.getElementById("error");
const loadingText = document.getElementById("loading");
searchBtn.addEventListener("click", fetchProfile);

async function fetchProfile() {
  const username = usernameInput.value.trim();

  if (!username) {
    errorText.textContent = "Please enter a GitHub username";
    profileDiv.innerHTML = "";
    return;
  }

  errorText.textContent = "";
  profileDiv.innerHTML = "";
  loadingText.style.display = "block";

  try {
    const response = await fetch(
      `http://localhost:5000/api/github/${username}`
    );
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();
    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" />
      <p><strong>Name:</strong> ${data.name || "Not available"}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
    `;

  } catch (error) {
    errorText.textContent = error.message;
  } finally {
    loadingText.style.display = "none";
  }
}
