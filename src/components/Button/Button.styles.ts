import styled from "@emotion/styled";

export const StyledButton = styled.button(
  {
    background: "transparent",
    border: "none",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  ({ mode }: { mode: string }) => ({ color: mode === 'light' ? '#222731' : '#90A4D4' })
)
