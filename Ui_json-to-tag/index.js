import { buildSpecElement } from "@keshavsoft/json-to-tag";

try {
    // 1. Fetch & parse spec
    const spec = await fetch("./full-page-spec.json").then(res => res.json());

    // 2. Build DOM & mount into root
    const dom = buildSpecElement({ inSpec: spec });
    const content = dom.querySelector("body") || dom;
    content.querySelector('script[src*="bootstrap"]')?.remove();
    document.getElementById("root").replaceChildren(...content.childNodes);

    // 3. Navbar toggle fallback
    document.querySelector(".navbar-toggler")?.addEventListener("click", (e) => {
        e.preventDefault();
        const nav = document.querySelector("#mainNavigation");
        window.bootstrap?.Collapse?.getOrCreateInstance(nav, { toggle: false })?.toggle()
            ?? nav?.classList.toggle("show");
    });
} catch (err) {
    console.error(err);
    document.getElementById("root").innerHTML = `
        <div class="alert alert-danger m-4">
            <h4>Build Error</h4>
            <p>${err.message}</p>
        </div>`;
}
