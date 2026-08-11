/* =========================================================
   SOUL SAKHI
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 700);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* =====================================================
       NAVBAR ACTIVE LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(item => {

            item.classList.remove("active");

            if (
                item.getAttribute("href") === `#${current}`
            ) {

                item.classList.add("active");

            }

        });

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchBtn = document.querySelector(".search-btn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");

    searchBtn.addEventListener("click", () => {

        searchOverlay.classList.add("open");

        document.body.classList.add("no-scroll");

        setTimeout(() => {

            searchInput.focus();

        }, 200);

    });

    closeSearch.addEventListener("click", closeSearchOverlay);

    searchOverlay.addEventListener("click", event => {

        if (event.target === searchOverlay) {

            closeSearchOverlay();

        }

    });

    function closeSearchOverlay() {

        searchOverlay.classList.remove("open");

        document.body.classList.remove("no-scroll");

        searchInput.value = "";

    }


    /* =====================================================
       PRODUCT SEARCH
    ===================================================== */

    const productCards =
        document.querySelectorAll(".product-card");

    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            if (name.includes(query)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });


    /* =====================================================
       PRODUCT FILTER
    ===================================================== */

    const filters =
        document.querySelectorAll(".filter");

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(button => {

                button.classList.remove("active");

            });

            filter.classList.add("active");

            const category =
                filter.dataset.filter;

            productCards.forEach(card => {

                if (
                    category === "all" ||
                    card.dataset.category === category
                ) {

                    card.classList.remove("hide");

                    setTimeout(() => {

                        card.classList.add("visible");

                    }, 50);

                } else {

                    card.classList.add("hide");

                }

            });

        });

    });


    /* =====================================================
       WISHLIST
    ===================================================== */

    const wishlistButtons =
        document.querySelectorAll(".wishlist");

    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("liked");

            const icon =
                button.querySelector("i");

            if (button.classList.contains("liked")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                showToast("Added to your wishlist ♡");

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

            }

        });

    });


    /* =====================================================
       CART
    ===================================================== */

    let cart = [];

    const cartBtn =
        document.querySelector(".cart-btn");

    const cartDrawer =
        document.getElementById("cartDrawer");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const closeCart =
        document.getElementById("closeCart");

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    /* Open cart */

    cartBtn.addEventListener("click", openCart);

    function openCart() {

        cartDrawer.classList.add("open");

        cartOverlay.classList.add("open");

        document.body.classList.add("no-scroll");

    }


    /* Close cart */

    closeCart.addEventListener("click", closeCartDrawer);

    cartOverlay.addEventListener(
        "click",
        closeCartDrawer
    );

    function closeCartDrawer() {

        cartDrawer.classList.remove("open");

        cartOverlay.classList.remove("open");

        document.body.classList.remove("no-scroll");

    }


    /* Add product */

    document.querySelectorAll(".add-btn").forEach(button => {

        button.addEventListener("click", () => {

            const productName =
                button.dataset.product;

            const card =
                button.closest(".product-card");

            const priceText =
                card.querySelector("strong").textContent;

            const price =
                parseInt(
                    priceText
                        .replace("₹", "")
                        .replace(",", "")
                );

            const existing =
                cart.find(
                    item => item.name === productName
                );

            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    name: productName,

                    price: price,

                    quantity: 1

                });

            }

            updateCart();

            showToast(
                `${productName} added to your bag`
            );

        });

    });


    /* Update cart */

    function updateCart() {

        cartCount.textContent =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );

        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );

        cartTotal.textContent =
            `₹${total.toLocaleString("en-IN")}`;


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <i class="fa-solid fa-bag-shopping"></i>

                    <h3>Your bag is empty</h3>

                    <p>
                        Add something beautiful
                        to your collection.
                    </p>

                </div>

            `;

            return;

        }


        cartItems.innerHTML = "";

        cart.forEach((item, index) => {

            const element =
                document.createElement("div");

            element.className = "cart-item";

            element.innerHTML = `

                <div class="cart-item-image">

                    <i class="fa-regular fa-gem"></i>

                </div>

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                        × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                    aria-label="Remove item"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;

            cartItems.appendChild(element);

        });


        /* Remove buttons */

        document
            .querySelectorAll(".remove-item")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );

                        cart.splice(index, 1);

                        updateCart();

                    }
                );

            });

    }


    /* =====================================================
       CHECKOUT
    ===================================================== */

    document
        .querySelector(".checkout-btn")
        .addEventListener("click", () => {

            if (cart.length === 0) {

                showToast(
                    "Your bag is empty"
                );

                return;

            }

            let message =
                "Hello Soul Sakhi! I would like to order:%0A%0A";

            cart.forEach(item => {

                message +=
                    `• ${item.name} × ${item.quantity} - ₹${item.price * item.quantity}%0A`;

            });

            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );

            message +=
                `%0ATotal: ₹${total.toLocaleString("en-IN")}`;

            /*
                CHANGE THIS NUMBER
                TO PRITI'S REAL WHATSAPP NUMBER
            */

            const phone =
                "919999999999";

            window.open(
                `https://wa.me/${phone}?text=${message}`,
                "_blank"
            );

        });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const formData =
                new FormData(contactForm);

            const name =
                formData.get("name");

            const phone =
                formData.get("phone");

            const message =
                formData.get("message");

            /*
                CHANGE THIS NUMBER
                TO PRITI'S REAL WHATSAPP NUMBER
            */

            const whatsappNumber =
                "919999999999";

            const whatsappMessage =
                `Hello Soul Sakhi!%0A%0A` +
                `Name: ${name}%0A` +
                `Phone: ${phone}%0A%0A` +
                `Message: ${message}`;

            window.open(
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
                "_blank"
            );

            showToast(
                "Opening WhatsApp..."
            );

            contactForm.reset();

        }
    );


    /* =====================================================
       QUICK VIEW
    ===================================================== */

    document
        .querySelectorAll(".quick-view")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(".product-card");

                    const product =
                        card.dataset.name;

                    showToast(
                        `${product} — coming soon`
                    );

                }
            );

        });


    /* =====================================================
       TOAST
    ===================================================== */

    const toast =
        document.getElementById("toast");

    let toastTimer;

    function showToast(message) {

        toast.querySelector("span")
            .textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2800);

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSearchOverlay();

            closeCartDrawer();

            navLinks.classList.remove("open");

        }

    });

});
