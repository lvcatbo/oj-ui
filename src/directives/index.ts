import { App } from "vue";
import { hasRole } from "./hasRole";

export default (app: App) => {
  hasRole(app);
}
