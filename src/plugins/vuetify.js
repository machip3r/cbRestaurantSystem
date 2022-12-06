import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/lib/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        /* primary: "#2790BA",
        secondary: "#EDE8CA",
        third: "#FBFAF1",
        accent: "#FECD48", */

        primary: "#FFAF50",
        secondary: "#FBC63D",
        third: "#FCF5DE",
        accent: "#F4690B",

        greyCustom: "#E7E7E7",

        error: "#FF5252",
        info: "#6FB5D1",
        /* info: "#FBC63D", */
        success: "#4CAF50",
        success: "#F4690B",
        /* warning: "#FFC107", */
        warning: "#FBC63D",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
  icons: {
    iconfont: "fa",
  },
});
