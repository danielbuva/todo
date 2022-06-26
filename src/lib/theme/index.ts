import type { GlobalStyleProps } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { EnteredItem } from "./components/EnteredItem";

export const theme = extendTheme({
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        fontFamily: "body",
        color: mode("#161616", "#EEE6E2")(props),
        bg: mode("#d5c0ae", "#050404")(props),
        lineHeight: "base",
      },
    }),
  },
  components: {
    EnteredItem,
  },
});
