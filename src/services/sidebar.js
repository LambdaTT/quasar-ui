import $sys from 'src/lambdatt.js'

// MOCK DATA:
// var data = {
//   navigator: [
//     {
//       "type": "header",
//       "title": "ANALÍTICO",
//       "icon": null,
//       "href": null,
//       "tags": "análises,dados,informação,informações,relatórios,analíticos,bi,dashboards,gráficos,consultas",
//       "menuOpen": false,
//       "active": false,
//       "permissions": false,
//       "subItems": []
//     },
//     // {
//     //   "type": "item",
//     //   "title": "Dashboards",
//     //   "icon": 'fas fa-chart-line',
//     //   "href": '/',
//     //   "tags": "análises,dados,informação,informações,relatórios,analíticos,bi,dashboards,gráficos,consultas",
//     //   "menuOpen": false,
//     //   "active": true,
//     //   "permissions": false,
//     //   "subItems": []
//     // },
//     {
//       "type": "item",
//       "title": "Relatórios",
//       "icon": 'fas fa-newspaper',
//       "href": '/',
//       "tags": "análises,dados,informação,informações,relatórios,analíticos,bi,dashboards,gráficos,consultas",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {},
//         custom: [
//           'analitico-ver-relatorios-dh182bxx147'
//         ]
//       },
//       "subItems": []
//     },
//     // {
//     //   "type": "item",
//     //   "title": "Financeiro",
//     //   "icon": 'fas fa-hand-holding-dollar',
//     //   "href": '/finances',
//     //   "tags": "análises,dados,informação,informações,relatórios,analíticos,financeiro,finanças,conta,contas",
//     //   "menuOpen": false,
//     //   "active": true,
//     //   "permissions": true,
//     //   "subItems": [
//     //     {
//     //       "type": "item",
//     //       "title": "Transações",
//     //       "icon": 'fas fa-exchange',
//     //       "href": '/finances/transactions',
//     //       "tags": "análises,dados,informação,informações,relatórios,analíticos,financeiro,finanças,conta,contas",
//     //       "menuOpen": false,
//     //       "active": true,
//     //       "permissions": true,
//     //       "subItems": []
//     //     },
//     //     {
//     //       "type": "item",
//     //       "title": "Categorias",
//     //       "icon": 'fas fa-tags',
//     //       "href": '/finances/categories',
//     //       "tags": "análises,dados,informação,informações,relatórios,analíticos,financeiro,finanças,conta,contas",
//     //       "menuOpen": false,
//     //       "active": true,
//     //       "permissions": true,
//     //       "subItems": []
//     //     },
//     //   ]
//     // },
//     {
//       "type": "header",
//       "title": "OPERACIONAL",
//       "icon": null,
//       "href": null,
//       "tags": "operacional,operação,operações,operar,agendamentos,associados,associação,credenciado,serviços,eventos,atividades",
//       "menuOpen": false,
//       "active": false,
//       "permissions": true,
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Solicitações",
//       "icon": 'fas fa-user-plus',
//       "href": '/join-requests',
//       "tags": "operacional,operação,operações,operar,associados,associação,credenciado",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'SND_ASSOCIATE': 'R'
//         },
//         custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Atendimentos",
//       "icon": 'fas fa-calendar-check',
//       "href": '/services/schedule',
//       "tags": "operacional,operação,operações,operar,agendamentos,serviços,datas,horários",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'SND_ASSOCIATE': 'R',
//           'SND_SERVICE': 'R',
//           'SND_PROFESSIONAL': 'R',
//           'SND_SERVICE_SCHEDULING': 'R',
//         },
//         custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Reservas",
//       "icon": 'fas fa-calendar-alt',
//       "href": '/spaces/reservation',
//       "tags": "operacional,operação,operações,operar,reservas,agendas,espaço,lazer,datas,horários",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'SND_SPACE': 'R',
//           'SND_ASSOCIATE': 'R',
//           'SND_SPACE_RESERVATION': 'R'
//         }, custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Mensageria",
//       "icon": 'fas fa-paper-plane',
//       "href": '/messaging/messaging',
//       "tags": "operacional,operação,operações,operar,mensagem,mensageria,notificação,notificacao,notificações,notificacoes,comunicação,comunicacao",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {},
//         custom: [
//           'operacional-mensageria-dh182bz103'
//         ]
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "SIAPE",
//       "icon": 'fas fa-landmark',
//       "href": '/siape',
//       "tags": "",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {},
//         custom: [
//           'operacional-siape-dh182bzm1h5'
//         ]
//       },
//       "subItems": []
//     },
//     {
//       "type": "header",
//       "title": "CADASTROS",
//       "icon": null,
//       "href": null,
//       "tags": "cadastros,dados,informação,informações,profissional,profissionais,serviços,links,importantes",
//       "menuOpen": false,
//       "active": false,
//       "permissions": true,
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Profissionais",
//       "icon": 'fas fa-user-tie',
//       "href": '/professionals/professional',
//       "tags": "cadastros,dados,informação,informações,profissional,profissionais,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'SND_PROFESSIONAL': 'R'
//         }, custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Associados",
//       "icon": 'fas fa-users',
//       "href": '/associates',
//       "tags": "cadastros,dados,informação,informações,associados,associado",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: {}, custom: [] },
//       "subItems": [
//         {
//           "type": "item",
//           "title": "Gerenciar Associados",
//           "icon": null,
//           "href": '/associates/associate',
//           "tags": "cadastros,dados,informação,informações,associados,associado",
//           "menuOpen": false,
//           "active": false,
//           "permissions": {
//             regular: { 'SND_ASSOCIATE': 'R' },
//             custom: []
//           },
//           "subItems": []
//         },
//         {
//           "type": "item",
//           "title": "Tipos de Dependentes",
//           "icon": null,
//           "href": '/associates/dependents-type',
//           "tags": "cadastros,dados,informação,informações,associados,associado,dependentes,dependente",
//           "menuOpen": false,
//           "active": false,
//           "permissions": {
//             regular: { 'SND_ASSOCIATE': 'R' },
//             custom: []
//           },
//           "subItems": []
//         },
//       ]
//     },
//     {
//       "type": "item",
//       "title": "Serviços",
//       "icon": 'fas fa-briefcase',
//       "href": '/services/service',
//       "tags": "cadastros,dados,informação,informações,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'SND_SERVICE': 'R'
//         },
//         custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Organizações/Empresas",
//       "icon": 'fas fa-building',
//       "href": '/organizations/organization',
//       "tags": "cadastros,dados,informação,informações,empresas, empresa,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'SND_ORGANIZATION': 'R'
//         },
//         custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Espaços",
//       "icon": 'fas fa-tree',
//       "href": '/spaces/space',
//       "tags": "cadastros,dados,informação,informações,espaço, espaços,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_SPACE': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Eventos",
//       "icon": 'far fa-calendar-check',
//       "href": '/events/event',
//       "tags": "cadastros,dados,informação,informações,evento,eventos,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_EVENT': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Links Importantes",
//       "icon": 'fas fa-link',
//       "href": '/links/link',
//       "tags": "cadastros,dados,informação,informações,link,links,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_IMPORTANT_LINK': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Convênios",
//       "icon": 'fas fa-handshake',
//       "href": '/partnerships/partnership',
//       "tags": "cadastros,dados,informação,informações,parceiros,parceria,convênio,convênios,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_PARTNERSHIP': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Prestação de Contas",
//       "icon": 'fas fa-pen-nib',
//       "href": '/accountability/accountability',
//       "tags": "cadastros,dados,informação,informações,prestação,contas,prestações,transparências",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_ACCOUNTABILITY': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Situações Funcionais",
//       "icon": 'fas fa-user-pen',
//       "href": '/employmentstatus/status',
//       "tags": "cadastros,dados,informação,informações,estado,estados,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_EMPLOYMENT_STATUS': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Corpo Diretivo",
//       "icon": 'fas fa-people-group',
//       "href": '/directorship/director',
//       "tags": "cadastros,dados,informação,informações,diretor,diretoria,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_DIRECTOR': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Documentos",
//       "icon": 'fas fa-file',
//       "href": '/documents',
//       "tags": "cadastros,dados,informação,informações,estado,estados,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: {}, custom: ['cadastros-documentos-dh182b17n2m2'] },
//       "subItems": [
//         {
//           "type": "item",
//           "title": "Modelos de Documento",
//           "icon": null,
//           "href": '/documents/templates',
//           "tags": "cadastros,dados,informação,informações,documento,documentos,modelo,modelos,serviços",
//           "menuOpen": false,
//           "active": false,
//           "permissions": { regular: { 'SND_DOCUMENT_TEMPLATE': 'R' }, custom: [] },
//           "subItems": []
//         },
//         {
//           "type": "item",
//           "title": "Categorias de Documento",
//           "icon": null,
//           "href": '/documents/types',
//           "tags": "cadastros,dados,informação,informações,documento,documentos,tipo,tipos,categoria,categorias,serviços",
//           "menuOpen": false,
//           "active": false,
//           "permissions": { regular: { 'SND_DOCUMENT_TYPE': 'R' }, custom: [] },
//           "subItems": []
//         },
//       ]
//     },
//     {
//       "type": "header",
//       "title": "IMPRENSA",
//       "icon": null,
//       "href": null,
//       "tags": "imprensa,notícias,noticias,informação,informações,atualização,atualizações,novidades,eventos,reportagem,reportagens,histórias,historias,social,sociais,mídias,midias",
//       "menuOpen": false,
//       "active": true,
//       "permissions": true,
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Gerenciar Notícias",
//       "icon": 'fas fa-newspaper',
//       "href": '/press/news',
//       "tags": "imprensa,notícias,noticias,informação,informações,atualização,atualizações,novidades,eventos,reportagem,reportagens,histórias,historias,social,sociais,mídias,midias",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_NEWS': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Categorias de Notícias",
//       "icon": 'fas fa-tags',
//       "href": '/press/news-types',
//       "tags": "cadastros,dados,informação,informações,noticias,notícias,tipo,tipos,categoria,categorias,serviços",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'SND_NEWS_TYPE': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Campanhas",
//       "icon": 'fas fa-bullhorn',
//       "href": '/press/communication',
//       "tags": "imprensa,comunicado,comunicados,informação,informações,atualização,atualizações,novidades,eventos,reportagem,reportagens,histórias,historias,social,sociais,mídias,midias,campanha,campanhas,publicitárias,publicitária,publicitários,publicitário",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: {}, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "header",
//       "title": "CONFIGURAÇÕES",
//       "icon": null,
//       "href": null,
//       "tags": "usuario,user,perfil,acesso,configurações,configuração,permissão,permissões,conta,dados",
//       "menuOpen": false,
//       "active": false,
//       "permissions": true,
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Configurações",
//       "icon": 'fas fa-cog',
//       "href": '/settings',
//       "tags": "usuario,user,perfil,acesso,configurações,configuração,permissão,permissões,conta,dados",
//       "menuOpen": false,
//       "active": false,
//       "permissions": { regular: { 'STT_SETTINGS': 'R' }, custom: [] },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Usuários",
//       "icon": 'fas fa-user-cog',
//       "href": "/iam/users",
//       "tags": "usuario,user,perfil,acesso,configurações,configuração,permissão,permissões,conta,dados",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'IAM_USER': 'CRUD',
//           'IAM_ACCESSPROFILE_USER': 'CRUD',
//         },
//         custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Perfis de Acesso",
//       "icon": 'fas fa-id-card',
//       "href": "/iam/access-profiles",
//       "tags": "usuario,user,perfil,acesso,configurações,configuração,permissão,permissões,conta,dados",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'IAM_ACCESSPROFILE': 'CRUD',
//           'IAM_ACCESSPROFILE_MODULE': 'CRUD',
//         },
//         custom: []
//       },
//       "subItems": []
//     },
//     {
//       "type": "item",
//       "title": "Permissões",
//       "icon": 'fas fa-key',
//       "href": '/iam/permissions',
//       "tags": "usuario,user,perfil,acesso,configurações,configuração,permissão,permissões,conta,dados",
//       "menuOpen": false,
//       "active": false,
//       "permissions": {
//         regular: {
//           'IAM_ACCESSPROFILE': 'R',
//           'IAM_ACCESSPROFILE_MODULE': 'R',
//           'IAM_ACCESSPROFILE_PERMISSION': 'RU',
//           'IAM_CUSTOM_PERMISSION': 'CR',
//           'IAM_ACCESSPROFILE_CUSTOM_PERMISSION': 'CRUD',
//         },
//         custom: []
//       },
//       "subItems": []
//     },
//   ]
// }

export default {
  getData() {
    return { loggedUser: $sys.getService('iam/auth').loggedUser, navigator: [] };
    // const navigator = [...data.navigator]; // Clonando array de referência (evitar ponteiros antigos)
    // const result = [];

    // // Filter data.navigator
    // for (let i = 0; i < navigator.length; i++) {
    //   let item = { ...navigator[i] }; // Clonando elemento pai (evitar ponteiros antigos)

    //   if ((item.permissions === true) ||
    //     ((permissions.validatePermissions(item.permissions.regular)) &&
    //       (permissions.canExecute(item.permissions.custom)))) {
    //     if (item.subItems.length == 0) { result.push(item); }
    //     else {
    //       item.subItems = item.subItems.filter((subItem) =>
    //         permissions.validatePermissions(subItem.permissions.regular) &&
    //         permissions.canExecute(subItem.permissions.custom)
    //       );
    //       // Sobrou algum sub-item?
    //       if (item.subItems.length > 0) { result.push(item); }
    //     }
    //   }
    // }

    // return { loggedUser: auth.loggedUser, navigator: result };
  }
}
