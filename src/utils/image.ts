import { Dialog } from "siyuan";
import FilerobotImageEditor from "filerobot-image-editor";
import { config } from "@/config/image_editor";
import { client } from "@/api/siyuan";
import { getPluginConfig } from "./config";

/**
 * 将 base64 编码的图片转成 Blob 文件对象
 * @param base64String - base64 字符串
 * @returns Blob 文件对象
 */
export function base64ToImage(base64String: string): Blob {
    const byteString = atob(base64String.split(',')[1]);
    const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];

    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
  
    for (var i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
  
    let blob = new Blob([arrayBuffer], { type: mimeString });
    return blob;
}

/**
 * 从 CustomEvent 中获取需要编辑图片的 URL
 * @param event - EventBus 提供
 * @returns 图片 URL - http://127.0.0.1:6806/assets/image.png
 */
export function getImageURL(event: CustomEvent): string {
    const element = event.detail.element as Element;
    const image = element.children[1].children[1].attributes[0].nodeValue;
    const baseURI = element.children[1].children[1].attributes[0].baseURI;
    return baseURI + image;
}

/**
 * 在 Dialog 中打开图片编辑器
 * @param image 待编辑的图片- string: 图片 URL
 */ 
export function openImageEditor(image: string) {
    new Dialog({
        title: "图片编辑", 
        content: `<div id="editor_container" data-href="${image}">`,
        width: "800px",
        height: "600px",
        destroyCallback(options) {
            console.log("distroy: ", options);
        },
    })

    config.source = image;
    const filerobotImageEditor = new FilerobotImageEditor(
        document.querySelector('#editor_container'),
        config,
    );
    filerobotImageEditor.render(config);
}

type saveType = "save_as_new" | "write_over"
type savedImageData = {
    name: string;
    extension: string;
    mimeType: string;
    fullName?: string;
    height?: number;
    width?: number;
    imageBase64?: string;
    imageCanvas?: HTMLCanvasElement; // doesn't support quality
    quality?: number;
    cloudimageUrl?: string;
};
/**
 * 将图片保存到思源指定路径
 * @param image 图片 base64 字符串
 * @param type 保存方式 - sava_as_new: 在指定位置村一张新的图片, write_over: 覆盖原文件
 * @param name 图片文件名
 */
export async function saveImage(image: savedImageData, type: saveType) {
    let base64 = image.imageBase64;
    let name = image.fullName;
    let path = getPluginConfig().save_path;
    switch (type) {
        case "save_as_new": 
            path = path;
            break;
        case "write_over": 
            const element = document.querySelector("#editor_container");
            const url = element.attributes.getNamedItem("data-href").value;
            name = url.substring(url.indexOf("assets/"));
            path = "/data"
            break;
        default: 
            path = path;
    }
    console.log(path + "/" + name);
    client.putFile({
        path: path + "/" + name, 
        isDir: false, 
        modTime: Date.now(), 
        file: base64ToImage(base64),
    })
}