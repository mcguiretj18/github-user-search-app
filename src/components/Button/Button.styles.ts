import styled from "@emotion/styled/macro";
import * as colors from '../../styles/colors'

export const StyledButton = styled.button(
  {
    background: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontFamily: 'Space Mono, monospace',
    fontWeight: 700,
    letterSpacing: '2.5px',
  },
  ({ mode, hovered }: { mode: string; hovered: boolean }) => {
    if (hovered) {
      return { color: mode === 'light' ? '#222731' : '#90A4D4' }
    }
    return { color: mode === "light" ? colors.textLight400 : colors.textDark400 };
  }
);
