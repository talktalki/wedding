// // // Toggle language menu
// // document.getElementById("language-toggle").addEventListener("click", function () {
// //     const languageOptions = document.getElementById("language-options");
// //     languageOptions.classList.toggle("hidden");
// // });

// // // Change language when an option is selected
// // document.querySelectorAll("#language-options a").forEach((option) => {
// //     option.addEventListener("click", (e) => {
// //         e.preventDefault();
// //         const selectedLang = e.target.getAttribute("data-lang");
// //         currentLanguage = selectedLang;
// //         changeLanguage(currentLanguage);
// //     });
// // });

// // Default language is English
// // let currentLanguage = 'en';

// // Optional: Close the menu if clicked outside
// // document.addEventListener("click", function (e) {
// //     const languageContainer = document.querySelector(".language-container");
// //     if (languageContainer && !languageContainer.contains(e.target)) {
// //         document.getElementById("language-options").classList.add("hidden");
// //     }
// // });

// function changeLanguage(lang) {
//     document.documentElement.setAttribute("lang", lang); // Change `lang` attribute

//     // Update all elements with multilingual content
//     document.querySelectorAll("[data-ko], [data-en]").forEach(element => {
//         const text = element.getAttribute(`data-${lang}`);
//         if (text) {
//             if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
//                 element.value = text; // Update value for input and textarea elements
//             } else {
//                 element.innerHTML = text; // Use innerHTML to preserve HTML tags like <br>
//             }
//         }
//     });
//     document.querySelectorAll('input[data-' + lang + '-placeholder], textarea[data-' + lang + '-placeholder]').forEach(element => {
//         element.placeholder = element.getAttribute('data-' + lang + '-placeholder');
//     });

//     // Optional: Close the language menu after selection
//     const languageOptions = document.getElementById("language-options");
//     if (languageOptions) {
//         languageOptions.classList.add("hidden");
//     }
// }


// document.addEventListener('DOMContentLoaded', function() {
//     // Check URL for language parameter
//     const urlParams = new URLSearchParams(window.location.search);
//     const fragmentLang = window.location.hash.replace('#', '');
//     const paramLang = urlParams.get('lang');
    
//     // Set initial language based on URL or default to English
//     let currentLanguage = paramLang || fragmentLang || 'en';
//     if (currentLanguage === 'ko' || currentLanguage === 'en') {
//         changeLanguage(currentLanguage);
//     }

//     // Add language fragment to all links on the page
//     document.querySelectorAll('a').forEach(link => {
//         if (!link.getAttribute('href').startsWith('#')) {  // Skip anchor links
//             link.addEventListener('click', (e) => {
//                 const href = link.getAttribute('href');
//                 if (href && !href.includes('lang=')) {
//                     e.preventDefault();
//                     window.location.href = href + '#' + currentLanguage;
//                 }
//             });
//         }
//     });

//     // Existing toggle event listener
//     document.getElementById("language-toggle").addEventListener("click", function () {
//         const languageOptions = document.getElementById("language-options");
//         languageOptions.classList.toggle("hidden");
//     });

//     // Update language selection and URL
//     document.querySelectorAll("#language-options a").forEach((option) => {
//         option.addEventListener("click", (e) => {
//             e.preventDefault();
//             const selectedLang = e.target.getAttribute("data-lang");
//             currentLanguage = selectedLang;
            
//             // Update URL with new language as fragment
//             window.location.hash = selectedLang;
            
//             changeLanguage(currentLanguage);
//         });
//     });
// });

function changeLanguage(lang) {
    document.documentElement.setAttribute("lang", lang); // Change `lang` attribute

    // Update all elements with multilingual content
    document.querySelectorAll("[data-ko], [data-en]").forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = text; // Update value for input and textarea elements
            } else {
                element.innerHTML = text; // Use innerHTML to preserve HTML tags like <br>
            }
        }
    });

    // Update placeholders
    document.querySelectorAll('input[data-' + lang + '-placeholder], textarea[data-' + lang + '-placeholder]').forEach(element => {
        element.placeholder = element.getAttribute('data-' + lang + '-placeholder');
    });

    // Show/hide elements based on language
    document.querySelectorAll('[data-show-lang], [data-hide-lang]').forEach(element => {
        const showLang = element.getAttribute('data-show-lang');
        const hideLang = element.getAttribute('data-hide-lang');

        if (showLang) {
            element.style.display = showLang === lang ? '' : 'none';
        }

        if (hideLang) {
            element.style.display = hideLang === lang ? 'none' : '';
        }
    });

    // Optional: Close the language menu after selection
    const languageOptions = document.getElementById("language-options");
    if (languageOptions) {
        languageOptions.classList.add("hidden");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Check URL for language parameter
    const urlParams = new URLSearchParams(window.location.search);
    const fragmentLang = window.location.hash.replace('#', '');
    const paramLang = urlParams.get('lang');
    
    // Set initial language based on URL or default to English
    let currentLanguage = paramLang || fragmentLang || 'en';
    if (currentLanguage === 'ko' || currentLanguage === 'en') {
        changeLanguage(currentLanguage);
    }

    // Add language fragment to all links on the page
    document.querySelectorAll('a').forEach(link => {
        if (!link.getAttribute('href').startsWith('#')) {  // Skip anchor links
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.includes('lang=')) {
                    e.preventDefault();
                    window.location.href = href + '#' + currentLanguage;
                }
            });
        }
    });

    // Existing toggle event listener
    document.getElementById("language-toggle").addEventListener("click", function () {
        const languageOptions = document.getElementById("language-options");
        languageOptions.classList.toggle("hidden");
    });

    // Update language selection and URL
    document.querySelectorAll("#language-options a").forEach((option) => {
        option.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedLang = e.target.getAttribute("data-lang");
            currentLanguage = selectedLang;
            
            // Update URL with new language
            const url = new URL(window.location);
            url.searchParams.set('lang', selectedLang);
            window.history.pushState({}, '', url);
            
            changeLanguage(currentLanguage);
        });
    });
});