# How to use custom attributes

## General Usage

#### Supported Attributes
```
[
  'background-color',
  'contributor-prefix',
  'contributor',
  'link',
  'link-hover-color'
]
```

To apply custom attributes, add them directly to the `<cv-strategies-footer>` tag in the format:

```html
<cv-strategies-footer custom-attribute="value">
```

For example, to change the background color and contributor prefix:

```html
<cv-strategies-footer background-color="#ffffff" contributor-prefix=" Maintained by " >
```

---

## Attribute Specifications

### `background-color`

- **Purpose:** Sets the background color of the footer container.
- **Value:** Must be a **hex code** (e.g., `#ffffff`) or a **WordPress custom color variable**.

#### Using WordPress Theme Colors

To use a WordPress theme color, write:

```html
<cv-strategies-footer background-color="--awb-custom_color1">
```

- Replace `color1` with the correct number for your desired theme color.
- To find it:
  - Click on any element in the WordPress editor.
  - Attempt to change its color.
  - Click on **Theme Colors**.
  - Note which number corresponds to your chosen color.

---

### `contributor-prefix`

- **Purpose:** Replaces the default prefix text in the copyright.
- **Default:** `" Designed by "`

### `contributor`

- **Purpose:** Sets the name of the designer or organization.
- **Default:** `"CV Strategies"`

### `link`

- **Purpose:** Sets the URL the contributor name should link to.

### `link-hover-color`

- **Purpose:** Sets the hover color for the contributor link.
- **Value:** Hex code or WordPress theme color variable.

---

## Default Footer Text

By default, the footer displays:

```
© Copyright 2025 | All Rights Reserved. Designed by CV Strategies.
```

You can override parts of this text using the `contributor-prefix`, `contributor`, and `link` attributes.

---

## Supported Attributes (Summary)

```js
[
  'background-color',
  'contributor-prefix',
  'contributor',
  'link',
  'link-hover-color'
]
```
