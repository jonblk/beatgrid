// theme

// TODO - improve code
const dark = (hue: number, s: number, l: number) => ({
  primary: {
    main: `hsl(${hue}, ${s}%, ${l}%)`,
  },
  secondary: {
    main: `hsl(${hue}, 60%, 64%)`,
  },
  text: {
    primary: `hsl(${hue}, ${s}%, ${l}%)`,
    light: `hsl(${hue}, ${s}%, ${l + 7}%)`,
  },
  background: {
    default: `hsl(${hue}, 11%,14%)`,
    paper: `hsl(${hue}, 66%,3%)`,
    dark: `hsl(${hue}, 16%,5%)`,
  },
  grid: {
    empty: `hsl(${hue}, 11%,18%)`,
    r0: `hsl(${hue}, 70%,50%)`,
    r1: `hsl(${hue}, 53%,62%)`,
    r2: `hsl(${hue}, 56%,72%)`,
    r3: `hsl(${hue}, 46%,70%)`,
    r4: `hsl(${hue}, 26%,75%)`,
    r5: `hsl(${hue}, 46%,62%)`,
    r6: `hsl(${hue}, 46%,52%)`,
    r7: `hsl(${hue}, 46%,52%)`,
    r8: `hsl(${hue}, 56%,42%)`,
    r9: `hsl(${hue}, 56%,52%)`,
  },
});

const light = {}

export { dark, light }