import { HTMLTemplateResult, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators"
import { ClassInfo, classMap } from "lit/directives/class-map"

@customElement("lofi-base")
export class LofiBase extends LitElement {
  @property({
    type: Boolean
  })
  fg = false
  @property({
    type: Boolean,
    attribute: "light-fg"
  })
  lightFg = false
  @property({
    type: Boolean,
    attribute: "lighter-fg"
  })
  lighterFg = false
  @property({
    type: Boolean,
    attribute: "lightest-fg"
  })
  lightestFg = false
  @property({
    type: Boolean,
    attribute: "dark-fg"
  })
  darkFg = false
  @property({
    type: Boolean,
    attribute: "darker-fg"
  })
  darkerFg = false
  @property({
    type: Boolean,
    attribute: "darkest-fg"
  })
  darkestFg = false

  @property({
    type: Boolean
  })
  bg = false
  @property({
    type: Boolean,
    attribute: "light-bg"
  })
  lightBg = false
  @property({
    type: Boolean,
    attribute: "lighter-bg"
  })
  lighterBg = false
  @property({
    type: Boolean,
    attribute: "lightest-bg"
  })
  lightestBg = false
  @property({
    type: Boolean,
    attribute: "dark-bg"
  })
  darkBg = false
  @property({
    type: Boolean,
    attribute: "darker-bg"
  })
  darkerBg = false
  @property({
    type: Boolean,
    attribute: "darkest-bg"
  })
  darkestBg = false

  @property({
    type: Boolean
  })
  light = false
  @property({
    type: Boolean
  })
  lighter = false
  @property({
    type: Boolean
  })
  lightest = false
  @property({
    type: Boolean
  })
  dark = false
  @property({
    type: Boolean
  })
  darker = false
  @property({
    type: Boolean
  })
  darkest = false

  @property({
    type: Boolean
  })
  bordered = false

  @property({
    type: Boolean
  })
  rounded = false

  private getSetShadeAttribute<P extends "bg"|"fg">(prefix:P|null=null):string|null {
    const setShades:ShadePropertyMeta[] = Object.values(ShadeStrings)
      .map((keys)=> {
        return prefix !== null? keys[prefix] : keys
      })
      .map((keys, i) => {
        console.log(keys.property, this[keys.property], i)
        return keys
      })
      .filter(meta => this[meta.property])
    console.log(this.darkFg)
    if (setShades.length === 0) {
      return null
    }
    if (setShades.length > 1) {
      console.warn(`[lofi-lit] ${this.tagName} has multiple shade flags set. Only one shade flag can be set at a time. [${setShades.join(",")}]`)
    }
    return setShades[0].attribute
  }

  getClassMap():ClassInfo {
    const elementShade = this.getSetShadeAttribute()
    const bgShade = this.getSetShadeAttribute("bg")
    const fgShade = this.getSetShadeAttribute("fg")
    const classMap:Record<string,boolean> = {}

    if (elementShade !== null) {
      classMap.bg = true
      classMap.fg = true
      classMap[elementShade] = true
    }
    if (bgShade !== null) {
      classMap.bg = true
      classMap[bgShade] = true
    }
    if (fgShade !== null) {
      classMap.fg = true
      classMap[fgShade] = true
    }

    return classMap
  }

  render(): HTMLTemplateResult {
    return html`
      <div class=${classMap(this.getClassMap())}>
        <slot></slot>
      </div>
    `
  }
}

export type ShadeString = "light"|"lighter"|"lightest"|"dark"|"darker"|"darkest"
export interface ShadePropertyMeta {
  attribute: string
  property: string
}
export interface ShadeMeta extends ShadePropertyMeta {
  bg: ShadePropertyMeta
  fg: ShadePropertyMeta
}
export const ShadeStrings:{[shade in ShadeString]:ShadeMeta} = {
  light: {
    attribute: "light",
    property: "light",
    bg: {
      attribute: "light-bg",
      property: "lightBg",
    },
    fg: {
      attribute: "light-fg",
      property: "lightFg",
    }
  },
  lighter: {
    attribute: "lighter",
    property: "lighter",
    bg: {
      attribute: "lighter-bg",
      property: "lighterBg",
    },
    fg: {
      attribute: "lighter-fg",
      property: "lighterFg",
    }
  },
  lightest: {
    attribute: "lightest",
    property: "lightest",
    bg: {
      attribute: "lightest-bg",
      property: "lightestBg",
    },
    fg: {
      attribute: "lightest-fg",
      property: "lightestFg",
    }
  },
  dark: {
    attribute: "dark",
    property: "dark",
    bg: {
      attribute: "dark-bg",
      property: "darkBg",
    },
    fg: {
      attribute: "dark-fg",
      property: "darkFg",
    }
  },
  darker: {
    attribute: "darker",
    property: "darker",
    bg: {
      attribute: "darker-bg",
      property: "darkerBg",
    },
    fg: {
      attribute: "darker-fg",
      property: "darkerFg",
    }
  },
  darkest: {
    attribute: "darkest",
    property: "darkest",
    bg: {
      attribute: "darkest-bg",
      property: "darkestBg",
    },
    fg: {
      attribute: "darkest-fg",
      property: "darkestFg",
    }
  },
}

export interface LofiLitStyleOptions {
  bg: ShadeString|null
  fg: ShadeString|null
  bordered: boolean
  rounded: boolean
  light: boolean
}
