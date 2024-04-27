const Router = {
    init: () => {
        document.querySelectorAll('a.navlink').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const route = link.getAttribute('href');
                Router.go(route);
            });
        });
        // check the initial route
        window.addEventListener('popstate', (event) => {
            Router.go(event.state.route, false); // false to not add to history
        });
        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {
        console.log(`Navigating to ${route}`);
        if (addToHistory) {
            window.history.pushState({ route }, null, route); // can add more stuff like the scroll position
        }
        let pageElement = null;
        switch (route) {
            case '/':
                pageElement = document.createElement('menu-page');
                break;
            case '/order':
                pageElement = document.createElement('order-page');
                break;
            default:
                if (route.startsWith('/product-')) {
                    const productId = route.split('-')[1];
                    pageElement = document.createElement('details-page');
                    pageElement.dataset.id = productId;
                }
        }
        if (pageElement) {
            const cache = document.querySelector('main');
            cache.children[0]?.remove();
            cache.append(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        }
    },
};
export default Router;
