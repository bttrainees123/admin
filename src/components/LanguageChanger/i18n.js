import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    resources: {
            en: {
              translation: {
                Hi: "Hi",
                Actions: "Actions"
              }
            },
            tm: {
              translation: {
                Hi: "வணக்கம்",
                Actions: "செயல்கள்"
              }
            },
            sp: {
              translation: {
                Hi: "Hola",
                Actions: "Comportamiento"
              }
            },
            tl: {
              translation: {
                Hi: "హాయ్",
                Actions: "చర్యలు"
              }
            }
    }   , 

    interpolation: {
      escapeValue: false 
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;




  
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     debug: true,
//     lng: 'fr',
    // resources: {
    //     en: {
    //         translation: {
    //             greeting: "Hello"
    //         }
    //     },
    //     fr: {
    //         translation: {
    //             greeting: "poiyyy"
    //         }
    //     }, 
    //     hi:{
    //         translation: {
    //             greeting: "xdhdvg"
    //         }
    //     }
    // }   , 

//     react: {
//       useSuspense: false
//     }
//   });

