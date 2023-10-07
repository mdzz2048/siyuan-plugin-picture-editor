import { Plugin } from "siyuan";
import { GlobalConfig } from "@/config/default";

export function getPluginConfig(): GlobalConfig | null {
    const plugin_name = "siyuan-plugin-image-editor";
    const plugins: Plugin[] = window["siyuan"]["ws"]["app"]["plugins"];
    for(let index = 0; index < plugins.length; index++) {
        const plugin = plugins[index];
        if (plugin.name === plugin_name) {
            return plugin["config"] as GlobalConfig;
        }
    }
    return null;
}