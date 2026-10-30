const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Hotel ka WhatsApp number yahan likho
        const hotelWhatsApp = "919193061633";

        // Guest ki details lena
        const name = document.querySelector("#guestName").value.trim();
        const phone = document.querySelector("#phone").value.trim();
        const checkin = document.querySelector("#checkin").value;
        const checkout = document.querySelector("#checkout").value;
        const guests = document.querySelector("#guests").value;

        // Date validation
        if (checkout <= checkin) {
            alert("Check-out date must be after check-in date.");
            return;
        }

        // WhatsApp message banana
        const message =
            "Hello Hotel Mahesh Gupta!\n\n" +
            "I want to request a room booking.\n\n" +
            "Guest Name: " + name + "\n" +
            "Mobile Number: " + phone + "\n" +
            "Check-in: " + checkin + "\n" +
            "Check-out: " + checkout + "\n" +
            "Number of Guests: " + guests + "\n\n" +
            "Please confirm room availability and price.";

        // WhatsApp link banana
        const whatsappURL = "https://wa.me/" + hotelWhatsApp + "?text=" + encodeURIComponent(message);

        // WhatsApp open karna
        window.open(whatsappURL, "_blank");
    });
}



let cart = [];

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const foodCard = button.closest(".food-card");

        if (!foodCard) return;

        const name = foodCard.querySelector("h4").textContent;
        const priceText = foodCard.querySelector(".food-price").textContent;
        const price = parseInt(priceText.match(/\d+/)[0]);

        const existingItem = cart.find(function(item) {
            return item.name === name;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(function(item) {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${subtotal}</span>
            <button class="remove-item">Remove</button>
        `;

        row.querySelector(".remove-item").addEventListener("click", function() {
            cart = cart.filter(function(cartItem) {
                return cartItem.name !== item.name;
            });

            updateCart();
        });

        cartItems.appendChild(row);
    });

    cartTotal.textContent = total;
}

const clearCartButton = document.getElementById("clear-cart");

if (clearCartButton) {
    clearCartButton.addEventListener("click", function() {
        cart = [];
        updateCart();
    });
}
// ===== Food Banner Slider =====

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDotsBox = document.querySelector(".hero-dots");
const heroNext = document.querySelector(".hero-next");
const heroPrev = document.querySelector(".hero-prev");

if (heroSlides.length && heroDotsBox && heroNext && heroPrev) {
    let heroIndex = 0;
    let heroTimer;

    heroSlides.forEach(function (slide, index) {
        const dot = document.createElement("button");
        dot.className = "hero-dot";
        dot.setAttribute("aria-label", "Go to slide " + (index + 1));

        dot.addEventListener("click", function () {
            showHeroSlide(index);
            startHeroTimer();
        });

        heroDotsBox.appendChild(dot);
    });

    const heroDots = heroDotsBox.querySelectorAll(".hero-dot");

    function showHeroSlide(index) {
        heroIndex = (index + heroSlides.length) % heroSlides.length;

        heroSlides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === heroIndex);
            heroDots[i].classList.toggle("active", i === heroIndex);
        });
    }

    function startHeroTimer() {
        clearInterval(heroTimer);
        heroTimer = setInterval(function () {
            showHeroSlide(heroIndex + 1);
        }, 4000);
    }

    heroNext.addEventListener("click", function () {
        showHeroSlide(heroIndex + 1);
        startHeroTimer();
    });

    heroPrev.addEventListener("click", function () {
        showHeroSlide(heroIndex - 1);
        startHeroTimer();
    });

    showHeroSlide(0);
    startHeroTimer();
}
const cartCount = document.getElementById("cart-count");

if (cartCount) {
    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );
}