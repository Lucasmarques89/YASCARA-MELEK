// Carrossel Automático
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showNextSlide() {
  items[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % totalItems;
  items[currentIndex].classList.add('active');
}

setInterval(showNextSlide, 4000);
// Carrinho
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartSummary();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryDiv = document.getElementById("cart-summary");
  let message = "";

  cart.forEach(item => {
    message += `• ${item.name} - R$ ${item.price.toFixed(2)} x${item.quantity}\n`;
  });

  summaryDiv.innerText = message || "Seu carrinho está vazio.";
}

function sendToWhatsApp() {
  const name = document.getElementById("client-name").value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!name.trim()) {
    alert("Por favor, preencha seu nome.");
    return;
  }

  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let message = `Olá! Gostaria de comprar:\n\n`;

  cart.forEach(item => {
    message += `${item.name} - R$ ${item.price.toFixed(2)} x${item.quantity}\n`;
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  message += `\nTotal: R$ ${total}\n\nNome do cliente: ${name}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/5511999999999?text= ${encodedMessage}`;
  window.open(whatsappLink, "_blank");
}

window.onload = () => {
  updateCartCount();
  updateCartSummary();
}