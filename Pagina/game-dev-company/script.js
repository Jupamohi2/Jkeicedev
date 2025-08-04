// Datos iniciales de juegos
const initialGames = [
  {
    id: 1,
    title: "Space Adventure",
    description: "Un emocionante juego de aventuras espaciales con gráficos impresionantes y jugabilidad adictiva.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Aventura",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Puzzle Master",
    description: "Desafía tu mente con cientos de puzzles únicos y niveles progresivamente más difíciles.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Puzzle",
    downloadLink: "#",
  },
  {
    id: 3,
    title: "Racing Thunder",
    description: "Carreras de alta velocidad con coches personalizables y pistas espectaculares.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Acción",
    downloadLink: "#",
  },
  {
    id: 4,
    title: "Task Manager Pro",
    description: "Aplicación de productividad para organizar tus tareas y proyectos de manera eficiente.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Aplicación",
    downloadLink: "#",
  },
  {
    id: 5,
    title: "Medieval Kingdom",
    description: "Construye y gestiona tu reino medieval en este juego de estrategia en tiempo real.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Estrategia",
    downloadLink: "#",
  },
  {
    id: 6,
    title: "Photo Editor Plus",
    description: "Editor de fotos profesional con filtros avanzados y herramientas de retoque.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Aplicación",
    downloadLink: "#",
  },
]

// Variables globales
let games = []
let isAdminLoggedIn = false

// Credenciales de administrador (en un proyecto real, esto estaría en el servidor)
const adminCredentials = {
  username: "admin",
  password: "gamedev2024",
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  loadGames()
  displayGames()
  setupEventListeners()
})

// Cargar juegos desde localStorage o usar datos iniciales
function loadGames() {
  const savedGames = localStorage.getItem("gamedevGames")
  if (savedGames) {
    games = JSON.parse(savedGames)
  } else {
    games = [...initialGames]
    saveGames()
  }
}

// Guardar juegos en localStorage
function saveGames() {
  localStorage.setItem("gamedevGames", JSON.stringify(games))
}

// Mostrar juegos en la página
function displayGames() {
  const gamesGrid = document.getElementById("gamesGrid")
  gamesGrid.innerHTML = ""

  games.forEach((game) => {
    const gameCard = createGameCard(game)
    gamesGrid.appendChild(gameCard)
  })
}

// Crear tarjeta de juego
function createGameCard(game) {
  const card = document.createElement("div")
  card.className = "game-card"
  card.innerHTML = `
        <div class="game-image" style="background-image: url('${game.image}')">
            <span class="game-category">${game.category}</span>
        </div>
        <div class="game-content">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <a href="${game.downloadLink}" class="game-download" target="_blank">
                <i class="fas fa-download"></i> Descargar
            </a>
        </div>
    `
  return card
}

// Configurar event listeners
function setupEventListeners() {
  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Formulario de contacto
  document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault()
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
    this.reset()
  })

  // Login de administrador
  document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
    e.preventDefault()
    handleAdminLogin()
  })

  // Formulario para agregar juegos
  document.getElementById("addGameForm").addEventListener("submit", (e) => {
    e.preventDefault()
    handleAddGame()
  })

  // Botones del hero
  document.querySelector(".hero-buttons .btn-primary").addEventListener("click", () => {
    document.getElementById("games").scrollIntoView({
      behavior: "smooth",
    })
  })

  document.querySelector(".hero-buttons .btn-secondary").addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({
      behavior: "smooth",
    })
  })
}

// Mostrar modal de login de administrador
function showAdminLogin() {
  document.getElementById("adminModal").style.display = "block"
}

// Cerrar modal de login de administrador
function closeAdminModal() {
  document.getElementById("adminModal").style.display = "none"
  document.getElementById("adminLoginForm").reset()
}

// Manejar login de administrador
function handleAdminLogin() {
  const username = document.getElementById("adminUsername").value
  const password = document.getElementById("adminPassword").value

  if (username === adminCredentials.username && password === adminCredentials.password) {
    isAdminLoggedIn = true
    closeAdminModal()
    showAdminPanel()
  } else {
    alert("Credenciales incorrectas. Intenta de nuevo.")
  }
}

// Mostrar panel de administración
function showAdminPanel() {
  document.getElementById("adminPanel").style.display = "block"
  document.body.style.overflow = "hidden"
}

// Cerrar sesión de administrador
function logout() {
  isAdminLoggedIn = false
  document.getElementById("adminPanel").style.display = "none"
  document.body.style.overflow = "auto"
  document.getElementById("addGameForm").reset()
}

// Manejar agregar nuevo juego
function handleAddGame() {
  if (!isAdminLoggedIn) {
    alert("No tienes permisos para realizar esta acción.")
    return
  }

  const title = document.getElementById("gameTitle").value
  const description = document.getElementById("gameDescription").value
  const image = document.getElementById("gameImage").value
  const category = document.getElementById("gameCategory").value
  const downloadLink = document.getElementById("gameDownloadLink").value

  // Validar que todos los campos estén llenos
  if (!title || !description || !image || !category || !downloadLink) {
    alert("Por favor, completa todos los campos.")
    return
  }

  // Crear nuevo juego
  const newGame = {
    id: Date.now(), // ID único basado en timestamp
    title: title,
    description: description,
    image: image,
    category: category,
    downloadLink: downloadLink,
  }

  // Agregar a la lista de juegos
  games.unshift(newGame) // Agregar al inicio
  saveGames()
  displayGames()

  // Limpiar formulario
  document.getElementById("addGameForm").reset()

  // Mostrar mensaje de éxito
  alert("¡Juego agregado exitosamente!")

  // Scroll hacia la sección de juegos para ver el nuevo juego
  setTimeout(() => {
    document.getElementById("games").scrollIntoView({
      behavior: "smooth",
    })
  }, 500)
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener("click", (event) => {
  const modal = document.getElementById("adminModal")
  if (event.target === modal) {
    closeAdminModal()
  }
})

// Navegación responsive (hamburger menu)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }
})

// Animaciones al hacer scroll
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".game-card")
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top
    const cardVisible = 150

    if (cardTop < window.innerHeight - cardVisible) {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }
  })
})

// Inicializar animaciones
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".game-card")
  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })
})
