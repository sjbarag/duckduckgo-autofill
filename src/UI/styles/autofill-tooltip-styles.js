module.exports = `
.wrapper *, .wrapper *::before, .wrapper *::after {
    box-sizing: border-box;
}
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    font-family: 'DDG_ProximaNova', 'Proxima Nova', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    /* move it offscreen to avoid flashing */
    transform: translate(-1000px);
    z-index: 2147483647;
}
.wrapper--credentials {
    font-family: 'SF Pro Text', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
.tooltip {
    position: absolute;
    width: 300px;
    max-width: calc(100vw - 25px);
    z-index: 2147483647;
}
.tooltip--credentials {
    top: 100%;
    left: 100%;
    padding: 4px;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: rgba(242, 240, 240, 0.9);
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    font-size: 13px;
    line-height: 15px;
    color: #222222;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.32);
}
.tooltip--email {
    top: calc(100% + 6px);
    right: calc(100% - 46px);
    padding: 8px;
    border: 1px solid #D0D0D0;
    border-radius: 10px;
    background-color: #FFFFFF;
    font-size: 14px;
    line-height: 1.3;
    color: #333333;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
.tooltip--email::before,
.tooltip--email::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    display: block;
    border-bottom: 8px solid #D0D0D0;
    position: absolute;
    right: 20px;
}
.tooltip--email::before {
    border-bottom-color: #D0D0D0;
    top: -9px;
}
.tooltip--email::after {
    border-bottom-color: #FFFFFF;
    top: -8px;
}

/* Buttons */
.tooltip__button {
    display: flex;
    width: 100%;
    padding: 4px 8px 7px;
    font-family: inherit;
    background: transparent;
    border: none;
    border-radius: 6px;
}
.tooltip__button:hover {
    background-color: rgba(0, 121, 242, 0.8);
    color: #FFFFFF;
}

/* Credentials tooltip specific */
.tooltip__button--credentials {
    min-height: 48px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: inherit;
    font-weight: 500;
    text-align: left;
    letter-spacing: -0.25px;
}
.tooltip__button--credentials > * {
    opacity: 0.9;
}
.tooltip__button--credentials:first-child {
    margin-top: 0;
}
.tooltip__button--credentials:last-child {
    margin-bottom: 0;
}
.tooltip__button--credentials::before {
    content: '';
    display: block;
    width: 26px;
    height: 26px;
    margin: auto 8px auto 0;
    /* TODO: use dynamically from src/UI/img/ddgPasswordIcon.js */
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+ZGRnLXBhc3N3b3JkLWljb24tYmFzZTwvdGl0bGU+CiAgICA8ZyBpZD0iZGRnLXBhc3N3b3JkLWljb24tYmFzZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlVuaW9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjMzMzMsMi42NjY2NyBDMTAuMjI4OCwyLjY2NjY3IDkuMzMzMzMsMy41NjIxIDkuMzMzMzMsNC42NjY2NyBDOS4zMzMzMyw1Ljc3MTI0IDEwLjIyODgsNi42NjY2NyAxMS4zMzMzLDYuNjY2NjcgQzEyLjQzNzksNi42NjY2NyAxMy4zMzMzLDUuNzcxMjQgMTMuMzMzMyw0LjY2NjY3IEMxMy4zMzMzLDMuNTYyMSAxMi40Mzc5LDIuNjY2NjcgMTEuMzMzMywyLjY2NjY3IFogTTEwLjY2NjcsNC42NjY2NyBDMTAuNjY2Nyw0LjI5ODQ4IDEwLjk2NTEsNCAxMS4zMzMzLDQgQzExLjcwMTUsNCAxMiw0LjI5ODQ4IDEyLDQuNjY2NjcgQzEyLDUuMDM0ODYgMTEuNzAxNSw1LjMzMzMzIDExLjMzMzMsNS4zMzMzMyBDMTAuOTY1MSw1LjMzMzMzIDEwLjY2NjcsNS4wMzQ4NiAxMC42NjY3LDQuNjY2NjcgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC42NjY3LDAgQzcuNzIxMTUsMCA1LjMzMzMzLDIuMzg3ODEgNS4zMzMzMyw1LjMzMzMzIEM1LjMzMzMzLDUuNzYxMTkgNS4zODM4NSw2LjE3Nzk4IDUuNDc5NDUsNi41Nzc3NSBMMC4xOTUyNjIsMTEuODYxOSBDMC4wNzAyMzc5LDExLjk4NyAwLDEyLjE1NjUgMCwxMi4zMzMzIEwwLDE1LjMzMzMgQzAsMTUuNzAxNSAwLjI5ODQ3NywxNiAwLjY2NjY2NywxNiBMMy4zMzMzMywxNiBDNC4wNjk3MSwxNiA0LjY2NjY3LDE1LjQwMyA0LjY2NjY3LDE0LjY2NjcgTDQuNjY2NjcsMTQgTDUuMzMzMzMsMTQgQzYuMDY5NzEsMTQgNi42NjY2NywxMy40MDMgNi42NjY2NywxMi42NjY3IEw2LjY2NjY3LDExLjMzMzMgTDgsMTEuMzMzMyBDOC4xNzY4MSwxMS4zMzMzIDguMzQ2MzgsMTEuMjYzMSA4LjQ3MTQxLDExLjEzODEgTDkuMTU5MDYsMTAuNDUwNCBDOS42Mzc3MiwxMC41OTEyIDEwLjE0MzksMTAuNjY2NyAxMC42NjY3LDEwLjY2NjcgQzEzLjYxMjIsMTAuNjY2NyAxNiw4LjI3ODg1IDE2LDUuMzMzMzMgQzE2LDIuMzg3ODEgMTMuNjEyMiwwIDEwLjY2NjcsMCBaIE02LjY2NjY3LDUuMzMzMzMgQzYuNjY2NjcsMy4xMjQxOSA4LjQ1NzUzLDEuMzMzMzMgMTAuNjY2NywxLjMzMzMzIEMxMi44NzU4LDEuMzMzMzMgMTQuNjY2NywzLjEyNDE5IDE0LjY2NjcsNS4zMzMzMyBDMTQuNjY2Nyw3LjU0MjQ3IDEyLjg3NTgsOS4zMzMzMyAxMC42NjY3LDkuMzMzMzMgQzEwLjE1NTgsOS4zMzMzMyA5LjY2ODg2LDkuMjM3OSA5LjIyMTUyLDkuMDY0NSBDOC45NzUyOCw4Ljk2OTA1IDguNjk1OTEsOS4wMjc5NSA4LjUwOTE2LDkuMjE0NjkgTDcuNzIzODYsMTAgTDYsMTAgQzUuNjMxODEsMTAgNS4zMzMzMywxMC4yOTg1IDUuMzMzMzMsMTAuNjY2NyBMNS4zMzMzMywxMi42NjY3IEw0LDEyLjY2NjcgQzMuNjMxODEsMTIuNjY2NyAzLjMzMzMzLDEyLjk2NTEgMy4zMzMzMywxMy4zMzMzIEwzLjMzMzMzLDE0LjY2NjcgTDEuMzMzMzMsMTQuNjY2NyBMMS4zMzMzMywxMi42MDk1IEw2LjY5Nzg3LDcuMjQ0OTQgQzYuODc1MDIsNy4wNjc3OSA2LjkzNzksNi44MDYyOSA2Ljg2MDY1LDYuNTY3OTggQzYuNzM0ODksNi4xNzk5NyA2LjY2NjY3LDUuNzY1MjcgNi42NjY2Nyw1LjMzMzMzIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+');
    background-size: cover;
}
.tooltip__button--credentials:hover::before {
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+ZGRnLXBhc3N3b3JkLWljb24tYmFzZS13aGl0ZTwvdGl0bGU+CiAgICA8ZyBpZD0iZGRnLXBhc3N3b3JkLWljb24tYmFzZS13aGl0ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlVuaW9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjMzMzMsMi42NjY2NyBDMTAuMjI4OCwyLjY2NjY3IDkuMzMzMzMsMy41NjIxIDkuMzMzMzMsNC42NjY2NyBDOS4zMzMzMyw1Ljc3MTI0IDEwLjIyODgsNi42NjY2NyAxMS4zMzMzLDYuNjY2NjcgQzEyLjQzNzksNi42NjY2NyAxMy4zMzMzLDUuNzcxMjQgMTMuMzMzMyw0LjY2NjY3IEMxMy4zMzMzLDMuNTYyMSAxMi40Mzc5LDIuNjY2NjcgMTEuMzMzMywyLjY2NjY3IFogTTEwLjY2NjcsNC42NjY2NyBDMTAuNjY2Nyw0LjI5ODQ4IDEwLjk2NTEsNCAxMS4zMzMzLDQgQzExLjcwMTUsNCAxMiw0LjI5ODQ4IDEyLDQuNjY2NjcgQzEyLDUuMDM0ODYgMTEuNzAxNSw1LjMzMzMzIDExLjMzMzMsNS4zMzMzMyBDMTAuOTY1MSw1LjMzMzMzIDEwLjY2NjcsNS4wMzQ4NiAxMC42NjY3LDQuNjY2NjcgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC42NjY3LDAgQzcuNzIxMTUsMCA1LjMzMzMzLDIuMzg3ODEgNS4zMzMzMyw1LjMzMzMzIEM1LjMzMzMzLDUuNzYxMTkgNS4zODM4NSw2LjE3Nzk4IDUuNDc5NDUsNi41Nzc3NSBMMC4xOTUyNjIsMTEuODYxOSBDMC4wNzAyMzc5LDExLjk4NyAwLDEyLjE1NjUgMCwxMi4zMzMzIEwwLDE1LjMzMzMgQzAsMTUuNzAxNSAwLjI5ODQ3NywxNiAwLjY2NjY2NywxNiBMMy4zMzMzMywxNiBDNC4wNjk3MSwxNiA0LjY2NjY3LDE1LjQwMyA0LjY2NjY3LDE0LjY2NjcgTDQuNjY2NjcsMTQgTDUuMzMzMzMsMTQgQzYuMDY5NzEsMTQgNi42NjY2NywxMy40MDMgNi42NjY2NywxMi42NjY3IEw2LjY2NjY3LDExLjMzMzMgTDgsMTEuMzMzMyBDOC4xNzY4MSwxMS4zMzMzIDguMzQ2MzgsMTEuMjYzMSA4LjQ3MTQxLDExLjEzODEgTDkuMTU5MDYsMTAuNDUwNCBDOS42Mzc3MiwxMC41OTEyIDEwLjE0MzksMTAuNjY2NyAxMC42NjY3LDEwLjY2NjcgQzEzLjYxMjIsMTAuNjY2NyAxNiw4LjI3ODg1IDE2LDUuMzMzMzMgQzE2LDIuMzg3ODEgMTMuNjEyMiwwIDEwLjY2NjcsMCBaIE02LjY2NjY3LDUuMzMzMzMgQzYuNjY2NjcsMy4xMjQxOSA4LjQ1NzUzLDEuMzMzMzMgMTAuNjY2NywxLjMzMzMzIEMxMi44NzU4LDEuMzMzMzMgMTQuNjY2NywzLjEyNDE5IDE0LjY2NjcsNS4zMzMzMyBDMTQuNjY2Nyw3LjU0MjQ3IDEyLjg3NTgsOS4zMzMzMyAxMC42NjY3LDkuMzMzMzMgQzEwLjE1NTgsOS4zMzMzMyA5LjY2ODg2LDkuMjM3OSA5LjIyMTUyLDkuMDY0NSBDOC45NzUyOCw4Ljk2OTA1IDguNjk1OTEsOS4wMjc5NSA4LjUwOTE2LDkuMjE0NjkgTDcuNzIzODYsMTAgTDYsMTAgQzUuNjMxODEsMTAgNS4zMzMzMywxMC4yOTg1IDUuMzMzMzMsMTAuNjY2NyBMNS4zMzMzMywxMi42NjY3IEw0LDEyLjY2NjcgQzMuNjMxODEsMTIuNjY2NyAzLjMzMzMzLDEyLjk2NTEgMy4zMzMzMywxMy4zMzMzIEwzLjMzMzMzLDE0LjY2NjcgTDEuMzMzMzMsMTQuNjY2NyBMMS4zMzMzMywxMi42MDk1IEw2LjY5Nzg3LDcuMjQ0OTQgQzYuODc1MDIsNy4wNjc3OSA2LjkzNzksNi44MDYyOSA2Ljg2MDY1LDYuNTY3OTggQzYuNzM0ODksNi4xNzk5NyA2LjY2NjY3LDUuNzY1MjcgNi42NjY2Nyw1LjMzMzMzIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+');
}
.tooltip__button__secondary-text {
    font-size: 11px;
    color: rgba(0,0,0,0.6);
}
.tooltip__button:hover .tooltip__button__secondary-text {
    color: #FFFFFF;
}

/* Email tooltip specific */
.tooltip__button--email {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 14px;
}
.tooltip__button--email__primary-text {
    font-weight: bold;
}
.tooltip__button--email__secondary-text {
    font-size: 12px;
}
`
