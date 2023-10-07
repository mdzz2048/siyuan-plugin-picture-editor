import { availableTabs, availableTools, Crop } from "@/types/config"

export type GlobalConfig = {
    save_path: string,
    config?: {
        previewPixelRatio?: number,
        tabsIds?: availableTabs,
        defaultTabId?: availableTabs,
        defaultToolId?: availableTools, 
        Crop?: Crop
    }
}

export const DEFAULT_CONFIG: GlobalConfig = {
    save_path: "/data/assets/ImageEditor", 
    config: {
        previewPixelRatio: 2
    }
}