import { TABS, TOOLS } from "react-filerobot-image-editor"

type cropPresetItem = {
    titleKey: string;
    width?: number;
    height?: number;
    ratio?: string | number;
    descriptionKey?: string;
    icon?: string | HTMLElement;
    disableManualResize?: boolean;
};

type cropPresetGroup = {
    titleKey: string;
    items: cropPresetItem[];
};

type cropPresetFolder = {
    titleKey: string;
    groups: cropPresetGroup[];
    icon?: string | HTMLElement;
};

// TABS_IDS
export type availableTabs = typeof TABS[keyof typeof TABS];

// TOOLS_IDS
export type availableTools = typeof TOOLS[keyof typeof TOOLS];

// [TOOLS_IDS.CROP]
export type Crop =  {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: null;
    maxHeight?: null;
    ratio?: 'original' | 'custom' | 'ellipse' | number;
    noPresets?: boolean;
    ratioTitleKey?: string;
    presetsItems?: cropPresetItem[];
    presetsFolders?: cropPresetFolder[];
    autoResize?: boolean;
};