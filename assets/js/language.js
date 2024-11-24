// Toggle language menu
document.getElementById("language-toggle").addEventListener("click", function () {
    const languageOptions = document.getElementById("language-options");
    languageOptions.classList.toggle("hidden");
});

// Change language when an option is selected
document.querySelectorAll("#language-options a").forEach((option) => {
    option.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedLang = e.target.getAttribute("data-lang");
        currentLanguage = selectedLang;
        changeLanguage(currentLanguage);
    });
});

function changeLanguage(lang){
    document.documentElement.setAttribute("lang", lang); // Change `lang` attribute

    // Update all elements with multilingual content
    document.querySelectorAll("[id]").forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) element.textContent = text;
    });

    // Optional: Close the language menu after selection
    document.getElementById("language-options").classList.add("hidden");
}

// Default language is English
// let currentLanguage = 'en';

// Optional: Close the menu if clicked outside
document.addEventListener("click", function (e) {
    const languageContainer = document.querySelector(".language-container");
    if (!languageContainer.contains(e.target)) {
        document.getElementById("language-options").classList.add("hidden");
    }
});
