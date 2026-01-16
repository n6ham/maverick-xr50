import "https://unpkg.com/wired-card@0.8.1/wired-card.js?module";
import "https://unpkg.com/wired-toggle@0.8.0/wired-toggle.js?module";
import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

import { maverickXR50Styles }from '/local/maverick-xr50/maverick-xr50-styles.js';

class MaverickXR50 extends LitElement {
  static styles = maverickXR50Styles;
  
  static get properties() {
    return {
      hass: {},
      config: {},
      source_unit: "C",
      display_unit: "",
    };
  }

  render() {
    return html`
      <div class="maverick-xr50-container">
        <div class="maverick-xr50-card">
          <div class="maverick-xr50-image">
            <img style="width: 100%" src="/local/maverick-xr50/maverick-xr50.png"/>
          </div>
          <div class="maverick-xr50-display">
            ${this.renderDisplay(this.hass.states[this.config.entity])}
          </div>
        </div>
      </div>
    `;
  }
  
  renderDisplay(stateObj) {
    if (!(stateObj && "attributes" in stateObj && stateObj.attributes)) {
      console.error("Entity state must provide attributes.\n" + stateObj);
      return html``;
    }
    if (!this.display_unit) {
      this.display_unit = this.hass.config.unit_system.temperature.toUpperCase().at(-1);
    }

    const attributesArr = stateObj.attributes;
    return html`
      <div class="lcd-screen">
        ${this.renderPort(attributesArr, 1)}
        ${this.renderPort(attributesArr, 2)}
        ${this.renderPort(attributesArr, 3)}
        ${this.renderPort(attributesArr, 4)}
      </div>`;
  }
  
  renderPort(attributesArr, port) {
    const high = this.convertTemperature(attributesArr[`setpoint_high_${port}_${this.source_unit}`]);
    const low = this.convertTemperature(attributesArr[`setpoint_low_${port}_${this.source_unit}`]);
    const temperature = this.convertTemperature(attributesArr[`temperature_${port}_${this.source_unit}`]);
    return html`
      <div class="quadrant">
        <div class="header-row">
          <span class="label">HIGH</span>
          <span class="probe-id">P${port}</span>
          <span class="label">LOW</span>
        </div>
        <div class="limit-row">
          <span class="limit-val">
            ${isNaN(high) ? "---" : Math.round(high)}
          </span>
          <span class="limit-val">
            ${isNaN(low) ? "---" : Math.round(low)}
          </span>
        </div>
        <div class="temp-display">
          <span class="main-num">
            ${isNaN(temperature) ? "---" : Math.floor(temperature)}
          </span>
          <span class="unit-top">º${this.display_unit}</span>
          <span class="unit-decimal">
            .${isNaN(temperature) ? "-" : Math.round(temperature * 10) % 10}
          </span>
        </div>
      </div>    
    `;
  }
  
  convertTemperature(temperature) {
    if (isNaN(temperature)) {
      return temperature;
    }
    if (temperature < -99 || temperature > 537) {
      console.error(`Invalid temperature value: ${temperature}`);
      return null;
    }
    switch (this.source_unit + this.display_unit) {
      case "CF":
        return temperature * 9 / 5 + 32;
      case "FC":
        return (temperature - 32) * 5 / 9;
      default:
        // fall through
    }
    return temperature;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity corresponding to the thermometer's attributes pulled from an MQTT topic.");
    }
    if (config.source_unit) {
      if (typeof config.source_unit !== 'string' 
          || !["C", "F"].includes(config.source_unit.toUpperCase())) {
        throw new Error("Unsupported source temperature unit. Supported units are C (default) & F.");
      }
      this.source_unit = config.source_unit.toUpperCase();
    } else {
      this.source_unit = "C";
    }
    if (config.display_unit) {
      if (typeof config.display_unit !== 'string'
          || !["C", "F"].includes(config.display_unit.toUpperCase())) {
        throw new Error("Unsupported temperature display unit. Supported units are C (default) & F.");    
      }
      this.display_unit = config.display_unit.toUpperCase();
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns in masonry view
  getCardSize() {
    return 12;
  }

  // The rules for sizing your card in the grid in sections view
  getGridOptions() {
    return {
      rows: 4,
      min_rows: 4,
    };
  }
}

customElements.define("maverick-xr50", MaverickXR50);