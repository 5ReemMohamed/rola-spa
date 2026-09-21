const backTop = document.getElementById("backTop");

const navbarToggle = document.getElementById("navbarToggle");
const mainNavbar = document.getElementById("mainNavbar");
const navLinks = document.querySelectorAll(".nav-link");


if (navbarToggle && mainNavbar) {

    navbarToggle.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        mainNavbar.classList.toggle("show");

        const isOpen = mainNavbar.classList.contains("show");

        navbarToggle.setAttribute("aria-expanded", isOpen);

        const icon = navbarToggle.querySelector("i");

        if (icon) {

            if (isOpen) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

}


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        if (mainNavbar) {
            mainNavbar.classList.remove("show");
        }

        if (navbarToggle) {

            navbarToggle.setAttribute("aria-expanded", "false");

            const icon = navbarToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

});


document.addEventListener("click", function (e) {

    if (!mainNavbar || !navbarToggle) return;

    if (
        mainNavbar.classList.contains("show") &&
        !mainNavbar.contains(e.target) &&
        !navbarToggle.contains(e.target)
    ) {

        mainNavbar.classList.remove("show");

        navbarToggle.setAttribute("aria-expanded", "false");

        const icon = navbarToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

});


window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        if (backTop) {
            backTop.classList.add("show");
        }

    } else {

        if (backTop) {
            backTop.classList.remove("show");
        }

    }

});


if (backTop) {

    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


window.addEventListener("scroll", function () {

    const header = document.querySelector(".main-header");

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


const aboutSection = document.querySelector(".about-section");

if (aboutSection) {

    const aboutObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    aboutSection.classList.add("animate");

                    aboutObserver.unobserve(aboutSection);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    aboutObserver.observe(aboutSection);

}


const aboutButton = document.querySelector(".about-btn");

if (aboutButton) {

    aboutButton.addEventListener("click", function () {

        window.location.href = "tel:0547305763";

    });

}


const servicesSection = document.querySelector(".services-section");

if (servicesSection) {

    const servicesObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    servicesSection.classList.add("show-services");

                    servicesObserver.unobserve(servicesSection);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    servicesObserver.observe(servicesSection);

}


const servicesPhone = document.querySelector(".services-phone");

if (servicesPhone) {

    servicesPhone.addEventListener("click", function () {

        window.location.href = "tel:0547305763";

    });

}


const audienceSection = document.querySelector(".audience-section");

if (audienceSection) {

    const audienceObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    audienceSection.classList.add("show-audience");

                    audienceObserver.unobserve(audienceSection);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    audienceObserver.observe(audienceSection);

}


const whySection = document.querySelector(".why-section");

if (whySection) {

    const whyObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    whySection.classList.add("show-why");

                    whyObserver.unobserve(whySection);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    whyObserver.observe(whySection);

}


const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", function () {

        const isActive = item.classList.contains("active");

        faqItems.forEach(function (faq) {

            faq.classList.remove("active");

            const answer = faq.querySelector(".faq-answer");

            if (answer) {
                answer.style.maxHeight = null;
            }

        });

        if (!isActive) {

            item.classList.add("active");

            const answer = item.querySelector(".faq-answer");

            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

        }

    });

});


const faqSection = document.querySelector(".faq-section");

if (faqSection) {

    const faqObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    faqSection.classList.add("show-faq");

                    faqObserver.unobserve(faqSection);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    faqObserver.observe(faqSection);

}


const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const service = document.getElementById("contactService").value;
        const date = document.getElementById("contactDate").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !phone || !service || !date) {
            return;
        }

        const selectedService = document.querySelector(
            "#contactService option:checked"
        );

        const serviceName = selectedService
            ? selectedService.textContent
            : service;

        const whatsappMessage =
            `مرحباً رولا سبا%0A%0A` +
            `أرغب في حجز جلسة مساج.%0A%0A` +
            `الاسم: ${encodeURIComponent(name)}%0A` +
            `رقم الجوال: ${encodeURIComponent(phone)}%0A` +
            `الخدمة: ${encodeURIComponent(serviceName)}%0A` +
            `التاريخ: ${encodeURIComponent(date)}%0A` +
            `التفاصيل: ${encodeURIComponent(message || "لا توجد تفاصيل إضافية")}`;

        window.open(
            `https://wa.me/966547305763?text=${whatsappMessage}`,
            "_blank"
        );

    });

}
    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        delay: 0
    });