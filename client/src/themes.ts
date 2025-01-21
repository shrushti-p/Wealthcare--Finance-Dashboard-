export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    100: "#dafff4",
    200: "#b5ffea",
    300: "#8fffdf",
    400: "#6affd5",
    500: "#45ffca",
    600: "#37cca2",
    700: "#299979",
    800: "#1c6651",
    900: "#0e3328",
    /* 100: "#eaf8e5",
        200: "#d6f1cb",
        300: "#c1e9b1",
        400: "#ade297",
        500: "#98db7d",
        600: "#7aaf64",
        700: "#5b834b",
        800: "#3d5832",
        900: "#1e2c19"*/
  },

  red: {
    100: "#ffdbdd",
    200: "#ffb6ba",
    300: "#ff9298",
    400: "#ff6d75",
    500: "#ff4953",
    600: "#cc3a42",
    700: "#992c32",
    800: "#661d21",
    900: "#330f11",
  },

  white: {
    100: "#fdfdfe",
    200: "#fbfbfd",
    300: "#f9fafc",
    400: "#f7f8fb",
    500: "#f5f6fa",
    600: "#c4c5c8",
    700: "#939496",
    800: "#626264",
    900: "#313132",
  },
  yellow: {
    100: "#fff9e5",
    200: "#fff3ca",
    300: "#ffeeb0",
    400: "#ffe895",
    500: "#ffe27b",
    600: "#ccb562",
    700: "#99884a",
    800: "#665a31",
    900: "#332d19",
  },
  secondary: {
    100: "#fff1de",
    200: "#ffe3bc",
    300: "#ffd69b",
    400: "#ffc879",
    500: "#ffba58",
    600: "#cc9546",
    700: "#997035",
    800: "#664a23",
    900: "#332512",
  },
  tertiary: {
    // purple
    500: "#8884d8",
  },
  blue: {
      100: "#e8f4ff",
      200: "#d1eaff",
      300: "#b9dfff",
      400: "#a2d5ff",
      500: "#8bcaff",
      600: "#6fa2cc",
      700: "#537999",
      800: "#385166",
      900: "#1c2833"
},
  background: {
    light: "#2d2d34",
    main: "#1f2026",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    white: {
      ...tokens.white,
    },
    red: {
      ...tokens.red,
    },
    blue : {
      ...tokens.blue,
    },
    yellow: {
      ...tokens.yellow,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Montserrat Alternates", "sans-serif"].join(","), // Join method joins elements of array with specified combinator and return new string
    fontSize: 12,
    h1: {
      fontFamily: ["Montserrat Alternates", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Montserrat Alternates", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Montserrat Alternates", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Montserrat Alternates", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Montserrat Alternates", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Montserrat Alternates", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
};
