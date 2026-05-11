# Design System Documentation: High-End Editorial AI

## 1. Overview & Creative North Star
**Creative North Star: "The Curated Intelligence"**

This design system moves away from the sterile, cold aesthetics often associated with technology. Instead, it embraces an "Editorial AI" persona—combining the warmth of premium physical media with the vibrant energy of synaptic processing. 

To achieve a bespoke, high-end agency look, we move beyond the standard grid. We use intentional asymmetry, expansive white space (breathing room), and a "paper-on-glass" layering logic. By rejecting generic borders and standard shadows, we create a digital environment that feels curated, authoritative, and sophisticated.

## 2. Color Philosophy & Surface Logic
The palette is anchored by a warm, creamy foundation (`background: #fbf9f4`) which reduces eye strain and provides a premium "gallery" feel. The Emerald accent (`primary_container: #37ea9e`) serves as a high-energy focal point representing intelligence and action.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are prohibited for sectioning or containment. 
Structure must be defined through:
*   **Tonal Shifts:** Moving from `surface` to `surface_container_low`.
*   **Negative Space:** Using generous margins to imply boundaries.
*   **Type Hierarchy:** Let the weight of the typography define the start of a new context.

### Surface Hierarchy & Nesting
We treat the UI as a series of physical layers. Depth is created by "stacking" tones:
*   **Base:** `surface` (#fbf9f4) for the main canvas.
*   **Secondary Sections:** `surface_container_low` (#f5f3ee) for large lateral sections.
*   **Floating Elements/Cards:** `surface_container_lowest` (#ffffff) to create a subtle "lift" against the cream background.
*   **Interactive Overlays:** Use `surface_container_highest` (#e4e2dd) for elements that need to feel physically closer to the user.

### Glass & Gradient Rule
To provide "visual soul," use Glassmorphism for persistent elements (e.g., sticky navigation or floating action panels). 
*   **Implementation:** Use a semi-transparent `surface` color with a `backdrop-blur` of 12px–20px.
*   **Signature Gradients:** Apply a subtle linear gradient from `primary` (#006c45) to `primary_container` (#37ea9e) on main CTAs to avoid a "flat" or "default" look.

## 3. Typography: Editorial Authority
We utilize **Manrope** across all scales. Its geometric yet approachable form factor bridges the gap between technical precision and human readability.

*   **Display Scales (lg, md):** These are your "statements." Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero headlines.
*   **High Contrast:** Use `on_surface` (#1b1c19) for all primary text. The dark slate against the cream background ensures an authoritative, high-contrast reading experience.
*   **Labeling:** `label-md` and `label-sm` should be used for metadata and overlines, often in all-caps with increased letter-spacing (0.05em) to differentiate from body prose.

## 4. Elevation & Depth
Depth in this system is organic and ambient, not artificial.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. The subtle shift from #ffffff to #f5f3ee creates a sophisticated lift that is felt rather than seen.
*   **Ambient Shadows:** For floating modals or menus, use a "Cloud Shadow."
    *   *Shadow Color:* Use a 6% opacity version of `on_surface` (#1b1c19).
    *   *Blur:* Large values (30px to 60px) with 0 offset to mimic natural, non-directional light.
*   **The Ghost Border Fallback:** If a boundary is required for accessibility (e.g., in forms), use a "Ghost Border."
    *   *Spec:* `outline_variant` (#bacbbe) at 20% opacity. Never use 100% opaque outlines.

## 5. Components

### Buttons (The Energy Points)
*   **Primary:** Background `primary_container` (#37ea9e) with `on_primary_container` (#006540) text. Use `md` (0.375rem) roundedness for a modern, architectural feel.
*   **Secondary:** Ghost style. No background. `outline` (#6b7b70) text with a 10% opacity `outline` border that appears only on hover.
*   **States:** On press, scale the button slightly (98%) rather than just changing the color. This adds a tactile, high-end feel.

### Input Fields
*   **Styling:** Forgo the "box" look. Use a `surface_container_low` fill with a bottom-only "Ghost Border." 
*   **Focus State:** Transition the background to `surface_container_lowest` (#ffffff) and increase the bottom border opacity to 100% using the `primary` color.

### Cards & Lists
*   **The Divider Ban:** Never use horizontal lines to separate list items. Use 16px–24px of vertical white space or alternating tonal backgrounds (`surface` to `surface_container_low`).
*   **Content Cards:** Use `xl` (0.75rem) roundedness for a softer, more premium feel. Content should be padded generously—minimum 32px padding for desktop containers.

### Innovative Component: The "Synaptic Pulse" Chip
*   **Usage:** For AI-generated status or live data.
*   **Style:** `surface_container_lowest` background, `primary` text, with a small 4px dot that has a soft `primary_fixed` (#54ffb0) outer glow.

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place a headline on the left and the body copy slightly offset to the right to create an editorial, magazine-style layout.
*   **Embrace the Cream:** Let the `#fbf9f4` background breathe. Don't feel the need to fill every corner with components.
*   **Tone-on-Tone:** Use `on_surface_variant` (#3c4a40) for secondary information to create a natural visual hierarchy.

### Don’t:
*   **Don't use Pure Black:** Avoid `#000000`. It is too harsh for the creamy palette. Stick to the slate tones provided.
*   **Don't use Standard Shadows:** Avoid the "drop shadow" look that feels like a 2010s web template.
*   **Don't use Full-Opacity Borders:** Hard lines break the "paper-on-glass" illusion. If you think you need a border, try a 4px padding increase or a subtle background color shift first.