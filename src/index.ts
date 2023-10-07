import { Dialog, IMenuItemOption, Menu, Plugin } from "siyuan";
import { getImageURL, openImageEditor } from "./utils/image";
import { GlobalConfig, DEFAULT_CONFIG } from "./config/default";

const STORAGE_NAME = "config.json";

export default class ImageEditor extends Plugin {
    public config: GlobalConfig

    Listener = this.listener.bind(this);

    onload(): void {
        this.eventBus.on('open-menu-image', this.Listener);
        this.loadData(STORAGE_NAME)
            .then(config => this.config = config === "" ? DEFAULT_CONFIG : config)
            .catch(error => console.log("获取配置失败", error));
    }

    onunload(): void {
        console.log('good bye image-editor');
    }

    listener(event: CustomEvent) {
        const menu: Menu = event.detail.menu;
        const pluginMenuItem: IMenuItemOption = {
            icon: "iconImage", 
            label: "图片编辑", 
            click: () => {
                const image = getImageURL(event);
                openImageEditor(image);
            }
        }
        menu.addItem(pluginMenuItem);
    }

    openSetting() {
        const dialog = new Dialog({
            title: "设置", 
            content: `<div id="ImageEditorSetting">`, 
            width: "800px", 
            height: "600px", 
            destroyCallback(options) {
                console.log(options);
            },
        })
        console.log(dialog);
    }
}
