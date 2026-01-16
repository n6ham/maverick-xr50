import { css } from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

export const maverickXR50Styles = css`
  @font-face {
    font-family: segment7;
    src: url("/local/7segment.woff") format("woff");
  }
  
  .maverick-xr50-container {
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
  }
  
  .maverick-xr50-card {
    position: relative;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1 / 1.285;
    max-width: 568px;
    min-width: 212px; 
    --font-digits: segment7, monospace;
    --font-labels: 'Arial Narrow', sans-serif; /* Condensed look for labels */
  }
  
  .maverick-xr50-image img {
    display: block;
  }
  
  .maverick-xr50-display {
    box-sizing: border-box;
    position: absolute;
    top: 37.2%;
    left: 50%;
    width: 54%;
    height: 44%;
    transform: translate(-50%, -50%);
    color: rgba(0, 0, 0, 0.5);
  }
  
  .lcd-screen {
    /* 1. Make the container fill its parent */
    width: 100%; 
    height: 100%;
    
    /* 2. Maintain the rectangular shape of the physical device */
    aspect-ratio: 1.1 / 1; 
    
    /* 3. Container Query setup so children can scale font based on width */
    container-type: inline-size;
  
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
  }
  
  .quadrant {
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    text-shadow: 0.6cqw 0.6cqw 0cqw rgba(0, 0, 0, 0.1);
  }
  
  .quadrant:nth-child(1) {
    border-width: 0 1px 1px 0;
    padding: 0 2cqw 2cqw 0;
  }
  
  .quadrant:nth-child(2) {
    border-width: 0 0 1px 1px;
    padding: 0 0 2cqw 2cqw;
  }
  
  .quadrant:nth-child(3) {
    border-width: 1px 1px 0 0;
    padding: 2cqw 2cqw 0 0;
  }
  
  .quadrant:nth-child(4) {
    border-width: 1px 0 0 1px;
    padding: 2cqw 0 0 2cqw;
  }

  /* Header Labels */
  .header-row {
    display: flex;
    justify-content: space-around;
    font-family: var(--font-labels);
    font-weight: bold;
    font-size: 5cqw;
    transform: scaleY(1.2);
  }
  
  /* Limit Values */
  .limit-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-digits);
    font-size: 10cqw;
    line-height: 0.8;
    margin-top: 2.3cqw;
    transform: scaleY(1.2);
  }
  
  /* Main Temperature Area */
  .temp-display {
    display: grid;
    /* Column 1: Big Number | Column 2: Units */
    grid-template-columns: 1fr auto; 
    /* Use 'min-content' to ensure rows don't stretch unnecessarily */
    grid-template-rows: 1fr 1fr; 
    flex-grow: 1;
    width: 100%;
    position: relative;
    /* This ensures the grid spans the full height of the big number */
    align-items: stretch;
    transform: scaleY(1.3);
    margin-bottom: 4cqw;
  }
  
  .main-num {
    grid-column: 1;
    grid-row: 1 / span 2;
    font-family: var(--font-digits);
    font-size: 26cqw;
    /* Using a very tight line-height to crop empty font space */
    line-height: 0.8; 
    text-align: right;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-right: 1cqw;
    margin-left: -1cqw;
  }
  
  .unit-top {
    grid-column: 2;
    grid-row: 2;
    /* Force it to the top-most pixel of the first row */
    align-self: start; 
    font-family: var(--font-labels);
    font-weight: bold;
    font-size: 9cqw;
    line-height: 0.7;
    margin-left: 0.5cqw;
    margin-top: -8cqw;
  }

  .unit-decimal {
    grid-column: 2;
    grid-row: 2;
    /* Force it to the bottom-most pixel of the second row */
    align-self: end; 
    font-family: var(--font-digits);
    font-size: 17cqw;
    line-height: 0.8;
    display: flex;
    align-items: flex-end;
    margin-bottom: 1cqw;
  }
`;