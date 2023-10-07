import { FilerobotImageEditorConfig, TABS, TOOLS } from "react-filerobot-image-editor";
import { saveImage } from "@/utils/image";

const translations = {
    name: '名称',
    save: '保存',
    saveAs: '另存为',
    back: '返回',
    loading: '正在加载...',
    resetOperations: '重置/删除所有操作',
    changesLoseConfirmation: '所有更改都将丢失',
    changesLoseConfirmationHint: '您确定要继续吗？',
    cancel: '取消',
    continue: '继续',
    undoTitle: '撤消上一个操作',
    redoTitle: '重做上次操作',
    showImageTitle: '显示原始图像',
    zoomInTitle: '放大',
    zoomOutTitle: '缩小',
    toggleZoomMenuTitle: '切换缩放菜单',
    adjustTab: '调整',
    finetuneTab: '微调',
    filtersTab: '过滤器',
    watermarkTab: '水印',
    annotateTab: '绘制',
    resize: '调整大小',
    resizeTab: '调整大小',
    invalidImageError: '提供的图像无效',
    uploadImageError: '上传图像时出错',
    areNotImages: '不存在图片',
    isNotImage: '不是图片',
    toBeUploaded: '待上传',
    cropTool: '裁剪',
    original: '原件',
    custom: '自定义',
    square: '正方形',
    landscape: '风景',
    portrait: '肖像',
    ellipse: '椭圆',
    classicTv: '经典电视',
    cinemascope: '电影镜',
    arrowTool: '箭头',
    blurTool: '模糊',
    brightnessTool: '亮度',
    contrastTool: '对比',
    ellipseTool: '椭圆',
    unFlipX: 'Un-Flip X',
    flipX: '对称 X',
    unFlipY: 'Un-Flip Y',
    flipY: '对称 Y',
    hsvTool: 'HSV',
    hue: '色相',
    saturation: '饱和度',
    value: '值',
    imageTool: '图像',
    importing: '正在导入..',
    addImage: '+ 添加图像',
    lineTool: 'Line',
    penTool: '笔',
    polygonTool: '多边形',
    sides: '侧面',
    rectangleTool: '矩形',
    cornerRadius: '角半径',
    resizeWidthTitle: '宽度（以像素为单位）',
    resizeHeightTitle: '高度（以像素为单位）',
    toggleRatioLockTitle: '切换比率锁定',
    reset: '重置',
    resetSize: '重置为原始图像大小',
    rotateTool: '旋转',
    textTool: '文本',
    textSpacings: '文本间距',
    textAlignment: '文本对齐方式',
    fontFamily: '字体系列',
    size: '尺寸',
    letterSpacing: '字母间距',
    lineHeight: '行高',
    warmthTool: '温暖',
    addWatermark: '+  添加水印',
    addWatermarkTitle: '选择水印类型',
    uploadWatermark: '上传水印',
    addWatermarkAsText: '添加为文本',
    padding: '填充',
    shadow: '影子',
    horizontal: '水平',
    vertical: '垂直',
    blur: '模糊',
    opacity: '不透明度',
    position: '位置',
    stroke: '中风',
    saveAsModalLabel: '将图像另存为',
    extension: '扩展',
    nameIsRequired: '名称为必填项',
    quality: '质量',
    imageDimensionsHoverTitle: '保存的图像大小（宽 x 高）',
    cropSizeLowerThanResizedWarning:
      '请注意，所选裁剪区域低于应用的调整大小，这可能会导致质量下降',
    actualSize: '实际大小 （100%）',
    fitSize: '适合尺寸',
}

export let config: FilerobotImageEditorConfig = {
    source: '',
    onSave(savedImageData, imageDesignState) {
        saveImage(savedImageData, "save_as_new");
        console.log("saved: ", savedImageData, imageDesignState);
    },
    annotationsCommon: {
        fill: '#ff0000',
    },
    Text: { text: 'Filerobot...' },
    Rotate: { angle: 90, componentType: 'slider' },
    translations: translations,
    Crop: {
        ratio: "custom",
    },
    tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE, TABS.WATERMARK], // or ['Adjust', 'Annotate', 'Watermark']
    defaultTabId: TABS.ADJUST, // or 'Annotate'
    defaultToolId: TOOLS.CROP, // or 'Text'
    closeAfterSave: true,
    savingPixelRatio: 4,
    previewPixelRatio: 2,
    moreSaveOptions: [
        {
            label: "覆盖原图", 
            icon: "",
            onClick: (triggerSaveModal, triggerSave) => {
                // 无需确认
                triggerSave((savedImageData) => {
                    console.log(savedImageData);
                    saveImage(savedImageData, "write_over");
                })
                // 重新加载界面，更新图片
                console.log("覆盖原图");
                location.reload();
            },
        }, 
        {
            label: "另存为", 
            icon: "",
            onClick: (triggerSaveModal, triggerSave) => {
                // 需要确认
                triggerSaveModal((savedImageData) => {
                    saveImage(savedImageData, "save_as_new");
                })
            },
        }
    ]
}