// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const themeToggleMobile = document.getElementById("theme-toggle-mobile")
const menuToggle = document.getElementById("menu-toggle")
const navLinks = document.getElementById("nav-links")
const currentYearElements = document.querySelectorAll("#current-year")
const contactForm = document.getElementById("contact-form")
const formMessage = document.getElementById("form-message")
const blogPostsContainer = document.getElementById("blog-posts-container")
const noPostsMessage = document.getElementById("no-posts-message")

// Initialize the app
function init() {
  console.log("Initializing script.js...")

  // Set current year in footer
  currentYearElements.forEach((el) => {
    el.textContent = new Date().getFullYear()
  })

  // Check for dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode")
    updateThemeIcons(true)
  }

  // Load blog posts on index page
  if (blogPostsContainer) {
    loadBlogPosts()
  }

  // Initialize contact form if it exists
  if (contactForm) {
    initContactForm()
  }

  console.log("Script initialization complete")
}

// Theme toggle functionality
function toggleDarkMode() {
  console.log("Toggling dark mode")
  const isDarkMode = document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", isDarkMode)
  updateThemeIcons(isDarkMode)
}

function updateThemeIcons(isDarkMode) {
  const moonIcon = '<i class="fas fa-moon"></i>'
  const sunIcon = '<i class="fas fa-sun"></i>'

  if (themeToggle) themeToggle.innerHTML = isDarkMode ? sunIcon : moonIcon
  if (themeToggleMobile) themeToggleMobile.innerHTML = isDarkMode ? sunIcon : moonIcon
}

// Mobile menu toggle
function toggleMobileMenu() {
  console.log("Toggling mobile menu")
  navLinks.classList.toggle("active")

  const isOpen = navLinks.classList.contains("active")
  menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>'
}

// Format date for display
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Load blog posts on index page
function loadBlogPosts() {
  console.log("Loading blog posts")
  const storedPosts = localStorage.getItem("blogPosts")
  let posts = []

  if (storedPosts) {
    posts = JSON.parse(storedPosts)
  } else {
    // Add sample blog posts if none exist
    posts = [
      {
        id: "1",
        title: "Getting Started with Web Development",
        content:
          "Web development is an exciting field that combines creativity and technical skills. In this post, I'll share some tips for beginners who are just starting their journey in web development. First, focus on learning the fundamentals of HTML, CSS, and JavaScript before diving into frameworks. Understanding the core concepts will make learning frameworks much easier...",
        date: "2023-05-15",
      },
      {
        id: "2",
        title: "The Importance of Responsive Design",
        content:
          "In today's mobile-first world, responsive design is more important than ever. Users access websites from a variety of devices with different screen sizes, from smartphones to large desktop monitors. A responsive website automatically adjusts its layout to provide an optimal viewing experience across all devices...",
        date: "2023-06-22",
      },
      {
        id: "3",
        title: "Introduction to JavaScript Frameworks",
        content:
          "JavaScript frameworks have revolutionized web development by providing structured approaches to building complex applications. Frameworks like React, Vue, and Angular offer different philosophies and tools for creating interactive user interfaces. In this post, we'll explore the basics of these frameworks and when you might choose one over another...",
        date: "2023-07-10",
      },
    ]
    localStorage.setItem("blogPosts", JSON.stringify(posts))
  }

  if (posts.length > 0) {
    if (noPostsMessage) noPostsMessage.classList.add("hidden")

    // Display up to 3 most recent posts
    const recentPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

    recentPosts.forEach((post) => {
      const postElement = createBlogPostElement(post)
      blogPostsContainer.appendChild(postElement)
    })
  } else {
    if (noPostsMessage) noPostsMessage.classList.remove("hidden")
  }
}

// Create blog post element
function createBlogPostElement(post) {
  const postElement = document.createElement("div")
  postElement.className = "blog-card"

  const truncatedContent = post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content

  postElement.innerHTML = `
        <div class="blog-content">
            <h3>${post.title}</h3>
            <p class="date">${formatDate(post.date)}</p>
            <p class="excerpt">${truncatedContent}</p>
            <a href="blog.html?id=${post.id}" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
    `

  return postElement
}

// Initialize contact form
function initContactForm() {
  console.log("Initializing contact form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Simple validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address.", "error")
      return
    }

    // Simulate form submission
    showFormMessage("Thank you for your message! I'll get back to you soon.", "success")
    contactForm.reset()

    // Reset success message after 5 seconds
    setTimeout(() => {
      formMessage.classList.add("hidden")
    }, 5000)
  })
}

// Validate email format
function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Show form message
function showFormMessage(message, type) {
  formMessage.textContent = message
  formMessage.classList.remove("hidden", "success", "error")
  formMessage.classList.add(type)
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded")
  init()

  // Add event listeners
  if (themeToggle) {
    console.log("Adding theme toggle listener")
    themeToggle.addEventListener("click", toggleDarkMode)
  }

  if (themeToggleMobile) {
    console.log("Adding mobile theme toggle listener")
    themeToggleMobile.addEventListener("click", toggleDarkMode)
  }

  if (menuToggle) {
    console.log("Adding menu toggle listener")
    menuToggle.addEventListener("click", toggleMobileMenu)
  }
})

// Debug info
console.log("script.js loaded")
