import i18next from "i18next";
import common_de from "./translations/es/common.json";
import common_en from "./translations/en/common.json";

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        es: {
            common: common_de
        },
    },
});


export default i18next;