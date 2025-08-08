const modules = {};
const appServices = {};
var routerInstance = null;

function registerComponents(components, app) {
  for (const componentName in components) {
    app.component(componentName, components[componentName]);
  }
}

function loadModules() {
  if (!Object.keys(modules).length) {
    const allModules = import.meta.globEager(
      './modules/*/index.js'    // literal, relativo a este arquivo
    )

    Object.entries(allModules).forEach(([path, mod]) => {
      const module = mod;

      if (!module || !module.NAME) {
        console.warn(`Module at ${path} does not have a NAME export. Ignoring.`);
        return;
      }

      modules[module.NAME] = module.default;
    })
  }

  return modules;
}

function wireModules(app) {
  const allModules = loadModules();

  Object.values(allModules).forEach((mod) => {
    registerComponents(mod.COMPONENTS, app);
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
    const serviceUri = [...parts.slice(3), serviceName].join('.');
    appServices[serviceUri] = mod.default;
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
    const configs = mod.__PAGE_CONFIG ?? {};
    const extras = configs.extras ?? {};
    const params = configs.params ?? [];

    const parts = path.split('/');
    const pageName = parts.pop().replace(/\.\w+$/, '');
    const pageUrl = [...parts.slice(3), pageName.toLowerCase()].join('/');
    const pageRoute = configs.route ?? `${pageUrl}${params.length > 0 ? `/:${params.join('/:')}` : ''}`

    pagesMap[pageUrl] = {
      path: pageRoute,
      component: mod.default,
      extras
    };
  }

  return pagesMap;
}

function listModules() {
  return Object.keys(modules);
}

function moduleExists(name) {
  return listModules().includes(name);
}

function getModule(modname) {
  loadModules();

  let mod = modules[modname];
  if (!mod) return null;

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
    getPage(url) {
      return mod.PAGES?.[`${modname}/${url}`].component ?? null;
    }
  }
}

function getService(uri) {
  const error = new Error(`No service could be found at URI '${uri}'`);

  // Try to find a service at the app level first:
  const appService = appServices[uri];
  if (!!appService) return appService;

  // If not an app level service, assume it's a module service
  const parts = uri.split('/');
  const moduleName = parts[0];
  const serviceUri = parts.slice(1).join('.');

  const mod = modules[moduleName];
  if (!!mod == false) throw error;

  const service = mod.SERVICES?.[serviceUri] ?? null;
  if (!service) throw error;

  return service;
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
  app.config.globalProperties['$listModules'] = listModules;
  app.config.globalProperties['$moduleExists'] = moduleExists;
  app.config.globalProperties['$getModule'] = getModule;
  app.config.globalProperties['$getService'] = getService;
  app.config.globalProperties['$getRouter'] = getRouter;
  app.config.globalProperties['$getCurrentRoute'] = getCurrentRoute;
}

export function mapRoutes() {
  loadModules();

  const result = [
    ...Object.values(mapAppPages())
      .filter(page => page.path !== false),
    ...Object.values(modules)
      .map(mod => mod.PAGES ?? null)
      .filter(pages => pages !== null && Object.keys(pages).length > 0)
      .reduce((acc, pages) => {
        return [
          ...acc,
          ...Object.values(pages)
            .filter(page => page.path !== false)
        ];
      }, [])
  ];

  return result;
}

export default {
  listModules() {
    return listModules();
  },

  moduleExists(name) {
    return moduleExists(name);
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