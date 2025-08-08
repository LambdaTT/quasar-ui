# Lambda TT - Quasar UI (quasar-ui)

A UI kit for Quasar Framework by Lambda TT

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn lint
# or
npm run lint
```

### Format the files
```bash
yarn format
# or
npm run format
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Add Lambda TT Modules System:

### 1. Add the Lambda TT module to the project:

Add the following to **"/src/lambdatt.js"**:

```javascript
// /src/lambdatt.js:

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
```

Then add the following to **"/src/boot/lambdatt-boot.js"**:

```javascript
// /src/boot/lambdatt.boot.js:

import { boot } from 'quasar/wrappers'
import { wireItUp } from 'src/lambdatt.js'

export default boot(({ app, router }) => {
  wireItUp(app, router)
})

```

### 2. Add the type extensions:

Add the following content to **"/public/resources/js/extensions.js"**:

```javascript
// /public/resources/js/extensions.js:

// STRING EXTENSIONS:
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

String.prototype.ucFirst = function () {
  var target = this;
  return target.charAt(0).toUpperCase() + target.substring(1);
};

String.prototype.toCamelCase = function (separator) {
  var tmpArray = this.split(separator);
  for (var i = 0; i < tmpArray.length; i++) {
    if (i == 0)
      continue;

    let word = tmpArray[i];

    tmpArray[i] = word.ucFirst();
  }

  return tmpArray.join("");
};

String.prototype.fromCamelCase = function (separator) {
  $input = this;
  $result = "";
  for (let i = 0; i < $input.length; i++) {
    if ($input.charAt(i) == $input.charAt(i).toUpperCase()) {
      $result += separator + $input.charAt(i).toLowerCase();
    } else $result += $input.charAt(i).toLowerCase();
  }

  return $result;
};

String.prototype.toSlug = function stringToSlug() {
  var str = this;
  /* info: https://gist.github.com/codeguy/6684588 */
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöõôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text
  return str;
}


// OBJECT EXTENSIONS:
Object.size = function objSize() {
  var obj = this;
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

// NUMBER EXTENSIONS:
Number.prototype.number_format = function (decimals, decPoint, thousandsSep) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/number_format/
  // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: davook
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Gabriel Valentoni (https://github.com/gabriel-guelfi)
  // bugfixed by: Michael White (https://getsprink.com)
  // bugfixed by: Benjamin Lupton
  // bugfixed by: Allan Jensen (https://www.winternet.no)
  // bugfixed by: Howard Yeend
  // bugfixed by: Diogo Resende
  // bugfixed by: Rival
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //  revised by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //  revised by: Luke Smith (https://lucassmith.name)
  //    input by: Kheang Hok Chin (https://www.distantia.ca/)
  //    input by: Jay Klehr
  //    input by: Amir Habibi (https://www.residence-mixte.com/)
  //    input by: Amirouche
  //   example 1: number_format(1234.56)
  //   returns 1: '1,235'
  //   example 2: number_format(1234.56, 2, ',', ' ')
  //   returns 2: '1 234,56'
  //   example 3: number_format(1234.5678, 2, '.', '')
  //   returns 3: '1234.57'
  //   example 4: number_format(67, 2, ',', '.')
  //   returns 4: '67,00'
  //   example 5: number_format(1000)
  //   returns 5: '1,000'
  //   example 6: number_format(67.311, 2)
  //   returns 6: '67.31'
  //   example 7: number_format(1000.55, 1)
  //   returns 7: '1,000.6'
  //   example 8: number_format(67000, 5, ',', '.')
  //   returns 8: '67.000,00000'
  //   example 9: number_format(0.9, 0)
  //   returns 9: '1'
  //  example 10: number_format('1.20', 2)
  //  returns 10: '1.20'
  //  example 11: number_format('1.20', 4)
  //  returns 11: '1.2000'
  //  example 12: number_format('1.2000', 3)
  //  returns 12: '1.200'
  //  example 13: number_format('1 000,50', 2, '.', ' ')
  //  returns 13: '100 050.00'
  //  example 14: number_format(1e-8, 8, '.', '')
  //  returns 14: '0.00000001'

  var number = this;

  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  var s = ''

  var toFixedFix = function (n, prec) {
    if (('' + n).indexOf('e') === -1) {
      return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
    } else {
      var arr = ('' + n).split('e')
      var sig = ''
      if (+arr[1] + prec > 0) {
        sig = '+'
      }
      return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
    }
  }

  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }

  return s.join(dec)
};

// ARRAY EXTENSIONS:
Array.prototype.removeDuplicates = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};

Array.prototype.sumValues = function () {
  return this.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

Array.prototype.intersection = function (array2) {
  return this.filter(itm => array2.includes(itm));
};

Array.prototype.diff = function (array2) {
  return this.filter(itm => !array2.includes(itm)).concat(array2.filter(itm => !this.includes(itm)));
};
```

Add the following tag to **"/index.html"**:

```html
<script type="text/javascript" src="/resources/js/extensions.js"></script>
```

### 3. Add custom css file:

Add the following content to **"/src/css/custom.css"**:

```css
.text-line-through {
  text-decoration: line-through;
}

.gap-xs {
  gap: 2px;
}

.gap-sm {
  gap: 4px;
}

.gap-md {
  gap: 8px;
}

.gap-lg {
  gap: 16px;
}

/* Para navegadores compatíveis com WebKit */
::-webkit-scrollbar {
  height: 12px;
  width: 14px;
  background: transparent;
  z-index: 12;
  overflow: visible;
}

::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: #009688;
  border-radius: 10px;
  z-index: 12;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-transition: background-color .28s ease-in-out;
  transition: background-color .28s ease-in-out;
  margin: 4px;
  min-height: 32px;
  min-width: 32px;
}
```

### 4. Settings on "quasar.config.js":

a) In "boot" section:

```javascript
boot: [
      'lambdatt-boot',
      // your other boot configurations...,
],
```

b) In "css" section:

```javascript
css: [
    // your other css configurations...,
      'custom.css',
],
```

c) Edit your "extras" section:

```javascript
extras: [
    'ionicons-v4',
    // 'mdi-v5',
    'fontawesome-v6',
    // 'eva-icons',
    // 'themify',
    // 'line-awesome',
    // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
    'roboto-font', // optional, you are not bound to it
    'material-icons', // optional, you are not bound to it
],
```

d) Add the following to the "build" section:

```javascript
env: {
    API: process.env.NODE_ENV == 'development' ? 'http://localhost:8001' : process.env.API_URL
},
```

e) Still in the "build" section, change the option as follows:

```javascript
vueRouterMode: 'history', // available values: 'hash', 'history'
```

f) Edit your "framework" section:

```javascript
framework: {
    cssAddon: true,
    config: {
        loading: {
            message: 'Carregando. Por favor aguarde.'
        }
    },

    // iconSet: 'material-icons', // Quasar icon set
    lang: 'pt-BR', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],

    // Quasar plugins
    plugins: [
        'Loading',
        'Notify'
    ]
},
```

### 5. Edit the "/src/router/routes.js" file:

```javascript
import { mapRoutes } from 'src/lambdatt.js'
import $sys from 'src/lambdatt.js'

const routes = [
  {
    path: '/',
    component: () => import('src/modules/ui-layout-admin1/src/layouts/AdminLayout.vue'),
    children: [
      ...mapRoutes()
    ]
  },

  {
    path: '/login',
    component: $sys.getModule('iam')?.getPage('auth/login')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

console.log('routes', routes);


export default routes
```