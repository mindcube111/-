import { onRequestPost as __api_storage_get_js_onRequestPost } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\storage\\get.js"
import { onRequestPost as __api_storage_set_js_onRequestPost } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\storage\\set.js"
import { onRequestPost as __api_user_data_js_onRequestPost } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\user\\data.js"
import { onRequestPost as __api_user_save_js_onRequestPost } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\user\\save.js"
import { onRequestPost as __api_add_invite_js_onRequestPost } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\add-invite.js"
import { onRequestPost as __api_admin_login_js_onRequestPost } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\admin-login.js"
import { onRequestGet as __api_health_js_onRequestGet } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\health.js"
import { onRequestGet as __api_list_invites_js_onRequestGet } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\list-invites.js"
import { onRequestPost as __api_verify_invite_js_onRequestPost } from "C:\\Users\\26872\\Desktop\\心理网站编写\\怪奇物语测试\\functions\\api\\verify-invite.js"

export const routes = [
    {
      routePath: "/api/storage/get",
      mountPath: "/api/storage",
      method: "POST",
      middlewares: [],
      modules: [__api_storage_get_js_onRequestPost],
    },
  {
      routePath: "/api/storage/set",
      mountPath: "/api/storage",
      method: "POST",
      middlewares: [],
      modules: [__api_storage_set_js_onRequestPost],
    },
  {
      routePath: "/api/user/data",
      mountPath: "/api/user",
      method: "POST",
      middlewares: [],
      modules: [__api_user_data_js_onRequestPost],
    },
  {
      routePath: "/api/user/save",
      mountPath: "/api/user",
      method: "POST",
      middlewares: [],
      modules: [__api_user_save_js_onRequestPost],
    },
  {
      routePath: "/api/add-invite",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_add_invite_js_onRequestPost],
    },
  {
      routePath: "/api/admin-login",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_login_js_onRequestPost],
    },
  {
      routePath: "/api/health",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_health_js_onRequestGet],
    },
  {
      routePath: "/api/list-invites",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_list_invites_js_onRequestGet],
    },
  {
      routePath: "/api/verify-invite",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_verify_invite_js_onRequestPost],
    },
  ]