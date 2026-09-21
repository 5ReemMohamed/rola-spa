(function () {

  
    const supportedLanguages = [
        "ar",
        "en"
    ];


 
    function getTranslation(object, path) {

        return path
            .split(".")
            .reduce(function (result, key) {

                return result && result[key];

            }, object);

    }


 
    function getInitialLanguage() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const urlLanguage =
            params.get("lang");

 
        if (
            supportedLanguages.includes(
                urlLanguage
            )
        ) {

            localStorage.setItem(
                "siteLanguage",
                urlLanguage
            );

            return urlLanguage;

        }


   
        const savedLanguage =
            localStorage.getItem(
                "siteLanguage"
            );


        if (
            supportedLanguages.includes(
                savedLanguage
            )
        ) {

            return savedLanguage;

        }


   
        return "ar";

    }


 
    let currentLanguage =
        getInitialLanguage();


 
    function applyLanguage(
        language,
        updateUrl = true
    ) {

   
        if (
            !supportedLanguages.includes(
                language
            )
        ) {

            language = "ar";

        }


        currentLanguage =
            language;


     
        localStorage.setItem(
            "siteLanguage",
            currentLanguage
        );


   
        const html =
            document.documentElement;


        html.lang =
            currentLanguage;


        html.dir =
            currentLanguage === "ar"
                ? "rtl"
                : "ltr";


       
        document.body.classList.remove(
            "lang-ar",
            "lang-en"
        );


        document.body.classList.add(
            "lang-" + currentLanguage
        );


        
        const languageData =
            translations[currentLanguage];


        if (!languageData) {

            console.error(
                "Translation not found for:",
                currentLanguage
            );

            return;

        }

 
        if (
            languageData.page &&
            languageData.page.title
        ) {

            document.title =
                languageData.page.title;

        }

 
        document
            .querySelectorAll(
                "[data-i18n]"
            )
            .forEach(function (element) {

                const key =
                    element.getAttribute(
                        "data-i18n"
                    );


                const value =
                    getTranslation(
                        languageData,
                        key
                    );


                if (
                    value !== undefined &&
                    value !== null
                ) {

                    element.textContent =
                        value;

                }

            });

 
        document
            .querySelectorAll(
                "[data-i18n-html]"
            )
            .forEach(function (element) {

                const key =
                    element.getAttribute(
                        "data-i18n-html"
                    );


                const value =
                    getTranslation(
                        languageData,
                        key
                    );


                if (
                    value !== undefined &&
                    value !== null
                ) {

                    element.innerHTML =
                        value;

                }

            });


    
        document
            .querySelectorAll(
                "[data-i18n-placeholder]"
            )
            .forEach(function (element) {

                const key =
                    element.getAttribute(
                        "data-i18n-placeholder"
                    );


                const value =
                    getTranslation(
                        languageData,
                        key
                    );


                if (
                    value !== undefined &&
                    value !== null
                ) {

                    element.placeholder =
                        value;

                }

            });


    
        document
            .querySelectorAll(
                "[data-i18n-alt]"
            )
            .forEach(function (element) {

                const key =
                    element.getAttribute(
                        "data-i18n-alt"
                    );


                const value =
                    getTranslation(
                        languageData,
                        key
                    );


                if (
                    value !== undefined &&
                    value !== null
                ) {

                    element.alt =
                        value;

                }

            });


     
        const languageTexts =
            document.querySelectorAll(
                ".languageText"
            );


        if (
            languageData.nav &&
            languageData.nav.language
        ) {

            languageTexts.forEach(
                function (element) {

                    element.textContent =
                        languageData.nav.language;

                }
            );

        }

 
        if (updateUrl) {

            const url =
                new URL(
                    window.location.href
                );


            url.searchParams.set(
                "lang",
                currentLanguage
            );


            window.history.replaceState(
                null,
                "",
                url.toString()
            );

        }

 
     
        window.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language:
                            currentLanguage
                    }
                }
            )
        );

    }

 
    function setupLanguageButtons() {

        const languageButtons =
            document.querySelectorAll(
                ".language-btn"
            );


        if (
            !languageButtons.length
        ) {

            console.warn(
                "No language buttons found."
            );

            return;

        }


        languageButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();

 

                        const newLanguage =
                            currentLanguage === "ar"
                                ? "en"
                                : "ar";

 

                        applyLanguage(
                            newLanguage,
                            true
                        );

                    }
                );

            }
        );

    }

 

    function initLanguage() {
 
        applyLanguage(
            currentLanguage,
            false
        );

 

        setupLanguageButtons();

    }
 

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initLanguage
        );

    } else {

        initLanguage();

    }

})();
