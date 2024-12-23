import { LitElement, css, HTMLTemplateResult, html } from "lit";
import { customElement } from "lit/decorators";

@customElement("tmp-")
export class TmpEle extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    :host(.bg) {
      background-color: var(--theme-color-bg);
    }

    :host(.fg) {
      color: var(--theme-color-fg);
    }
  `

  render():HTMLTemplateResult {
    return html`
      <slot></slot>
    `
  }
}
