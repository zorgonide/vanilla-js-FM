export class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        const styles = document.createElement('style');
        this.root.appendChild(styles);
        async function loadCss() {
            const request = await fetch('/components/MenuPage.css');
            const css = await request.text();
            styles.textContent = css;
        }
        loadCss();
    }
    // when component is added to the DOM
    connectedCallback() {
        console.log('MenuPage added to the DOM');
        const template = document.getElementById('menu-page-template');
        const content = template.content.cloneNode(true);
        this.root.append(content);
    }
}
customElements.define('menu-page', MenuPage);
