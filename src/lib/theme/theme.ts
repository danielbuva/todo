import { extendTheme } from "@chakra-ui/react";

export const initial = extendTheme({
  styles: {
    global: () => ({
      bg: "#d5c0ae",
    }),
  },
});
export const blue = extendTheme({
  styles: {
    global: () => ({
      bg: "blue",
    }),
  },
});
export const yellow = extendTheme({
  styles: {
    global: () => ({
      bg: "yellow",
    }),
  },
});
