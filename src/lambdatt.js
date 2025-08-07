const modules = {};
const appServices = {};
const routerInstance = null;

function registerComponents(components, app) {
  for (const componentName in components) {
    app.component(componentName, components[componentName]);
  }
}

function wireModules(app) {
  const allModules = import.meta.globEager(
    '../modules/*/index.js'    // literal, relativo a este arquivo
  )

  Object.entries(allModules).forEach(async ([path, mod]) => {
    const module = mod;

    if (!module || !module.NAME) {
      console.warn(`Module at ${path} does not have a NAME export. Ignoring.`);
      return;
    }

    modules[module.NAME] = module.default;

    registerComponents(module.default.COMPONENTS, app);
  })
}

function registerAppServices() {
  const allServices = import.meta.globEager(
    './services/**/*.js' // literal, relativo a este arquivo
  )

  Object.entries(allServices).forEach(([path, mod]) => {
    // Extract the service name from the file path
    const parts = path.split('/');
    const serviceName = parts.pop().replace(/\.\w+$/, '');
    appServices[`${parts.join('.')}.${serviceName}`] = mod.default;
  })
}

function mapAppComponents() {
  const components = import.meta.globEager('./components/**/*.vue');

  const componentsMap = {};
  for (const path in components) {
    const mod = components[path];
    // Extract the component name from the file path
    const componentName = path.split('/').pop().replace(/\.\w+$/, '');
    componentsMap[componentName] = mod.default;
  }
  return componentsMap;
}

function mapAppPages() {
  const pages = import.meta.globEager('./pages/**/*.vue');

  const pagesMap = {};
  for (const path in pages) {
    const mod = pages[path];
    // Extract the page name from the file path
    const parts = path.split('/');
    const pageName = parts.pop().replace(/\.\w+$/, '');
    pagesMap[pageName] = {
      path: `${parts.join('/')}/${pageName.toLowerCase()}`,
      component: mod.default
    };
  }
  return pagesMap;
}

function listModules() {
  return Object.keys(modules);
}

function getModule(name) {
  const mod = modules[name];
  if (!!mod == false) return null;

  return {
    endpoints() {
      return mod.ENDPOINTS ?? {};
    },
    pages() {
      return mod.PAGES ?? {};
    },
    layouts() {
      return mod.LAYOUTS ?? {};
    },
    getPage(name) {
      return mod.PAGES?.[name].component ?? null;
    }
  }
}

function getService(uri) {
  // Try to find a service at the app level first:
  const appService = appServices[uri];
  if (!!appService) return appService;

  // If not an app level service, assume it's a module service
  const parts = uri.split('.');
  const moduleName = parts[0];
  const serviceUri = parts.slice(1).join('.');

  const mod = modules[moduleName];
  if (!!mod == false) return null;

  return mod.SERVICES?.[serviceUri] ?? null;
}

function getRouter() {
  return routerInstance;
}

function getCurrentRoute() {
  return routerInstance?.currentRoute?.value;
}

export function wireItUp(app, router) {
  routerInstance = router;
  wireModules(app);
  registerAppServices();
  registerComponents(mapAppComponents(), app);
  app.config.globalProperties.listModules = listModules;
  app.config.globalProperties.getModule = getModule;
  app.config.globalProperties.getService = getService;
  app.config.globalProperties.getRouter = getRouter;
  app.config.globalProperties.getCurrentRoute = getCurrentRoute;
}

export function mapRoutes() {
  return [
    ...mapAppPages(),
    ...Object.entries(modules)
      .map(mod => mod.PAGES ?? null)
      .filter(pages => pages !== null)
  ];
}

export default {
  listModules() {
    return listModules();
  },

  getModule(name) {
    return getModule(name);
  },

  getService(uri) {
    return getService(uri);
  },

  getRouter() {
    return getRouter();
  },

  getCurrentRoute() {
    return getCurrentRoute();
  },
}