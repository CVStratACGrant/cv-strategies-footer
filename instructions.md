# How to use custom attributes

## General Usage

#### Supported Attributes
```
[
    'background-color',
    'contributor-prefix',
    'contributor',
    'link',
    'link-hover-color',
    'text-align',
    'font-size'
]
```

To apply custom attributes, add them directly to the `<cv-strategies-footer>` tag in the format:

```html
<cv-strategies-footer custom-attribute="value">
```

For example, to change the background color and contributor prefix:

```html
<cv-strategies-footer background-color="#008000" contributor-prefix=" Maintained by ">
```

---

## Attribute Specifications

#### Default Footer Text
By default, the footer text is 

© Copyright 2025 | All Rights Reserved. Designed by CV Strategies.

in which:

|Attribute |Default value |
| :------- | :------- |
| `contributor`  | `"CV Strategies"` |
| `contributor-prefix` | `" Designed by "` |
| `link`    | `"https://cvstrat.com/"` |
| `link-hover-color`    | The default color is calculated in the `setLinkHoverColor()` function according to brightness/contrast rules defined by WCAG 2.0, but can still be set manually according to the site's color themes. |
| `background-color`    | `"#FFFFFF"` |
| `text-align`    | `"center"` |
| `font-size`    | `"16px"` |



#### Rules/Constraints for each attribute

<details>
<summary><strong>contributor</strong></summary>

- **Purpose:** Sets the name of the designer or organization.  
- **Value:** Must be a string.

    ```html
    <cv-strategies-footer contributor = "New Contributor">
    ```

</details>

<details>
<summary><strong>contributor-prefix</strong></summary>

- **Purpose:** Change the verbage before the contributor name.  
- **Value:** Must include a blank space **before and after** the text*.

    ```html
    <cv-strategies-footer contributor-prefix = " New Prefix ">
    ```

</details>

<details>
<summary><strong>link</strong></summary>

- **Purpose:** Sets link embed on the contributor text.  
- **Value:** Must be a string, typically links to contributor's website or contact.

    ```html
    <cv-strategies-footer link = "https://contributor-link.com">
    ```

</details>

<details>
<summary><strong>link-hover-color</strong></summary>

- **Purpose:** Set color on hover for the link text.  
- **Value:** Must be a **hex code** (e.g., `#ffffff`) or a **WordPress custom color variable**.

    ```html
    <cv-strategies-footer link-hover-color = "#00c000">
    ```

To use a WordPress theme color:

```html
<cv-strategies-footer link-hover-color = "--awb-custom_color1">
```

- Replace `--awb-custom_color1` with the correct variable name for your custom color. Note that **you must drop `var( )`** and only include what is inside of the parentheses.
- To find the variable names:
    1. **Method 1**: Go into the back-end and find the list of theme colors by going into the Avada Menu > Options > Colors. The shortcodes can be found there.
    2. **Method 2**: Using the inspect tool on your browser, select an element with the desired color, and look through the style menu to find the variable name. 

</details>

<details>
<summary><strong>background-color</strong></summary>

- **Purpose:** Sets the background color of the footer container.  
- **Value:** Must be a **hex code** (e.g., `#ffffff`) or a **WordPress custom color variable**.
    ```html
    <cv-strategies-footer background-color = "#cc0000">
    ```

</details>

<details>
<summary><strong>text-align</strong></summary>

- **Purpose:** Change the text alignment of the container.  
- **Value:** Adheres to CSS text-align properties.

    ```html
    <cv-strategies-footer text-align = "left">
    ```

</details>

<details>
<summary><strong>font-size</strong></summary>

- **Purpose:** Change the size of the text.  
- **Value:** Adheres to CSS font-size properties.

    ```html
    <cv-strategies-footer font-size = "2rem">
    ```

</details>