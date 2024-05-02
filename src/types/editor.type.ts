export interface EditorOptions {
  /** RTL */
  rtl?: boolean;
  /** 历史记录间隔 */
  undoDelay?: number;
  /** 内部调试时使用 */
  _lutePath?: string;
  /** 编辑器初始化值。默认值: '' */
  value?: string;
  /** 是否显示日志。默认值: false */
  debugger?: boolean;
  /** 是否启用打字机模式。默认值: false */
  typewriterMode?: boolean;
  /** 编辑器总高度。默认值: 'auto' */
  height?: number | string;
  /** 编辑器最小高度 */
  minHeight?: number;
  /** 编辑器总宽度，支持 %。默认值: 'auto' */
  width?: number | string;
  /** 输入区域为空时的提示。默认值: '' */
  placeholder?: string;
  /** 多语言。默认值: 'zh_CN' */
  lang?: (keyof II18n);
  /** 国际化, 自定义语言。优先级低于lang */
  i18n?: ITips;
  /** @link https://ld246.com/article/1549638745630#options-fullscreen */
  fullscreen?: {
      /** 全屏层级。默认值: 90 */
      index: number;
  };
  /** @link https://ld246.com/article/1549638745630#options-toolbar */
  toolbar?: Array<string | IMenuItem>;
  /** @link https://ld246.com/article/1549638745630#options-resize */
  resize?: IResize;
  /** @link https://ld246.com/article/1549638745630#options-counter */
  counter?: {
      /** 是否启用计数器。默认值: false */
      enable: boolean;
      /** 允许输入的最大值 */
      max?: number;
      /** 统计类型。默认值: 'markdown' */
      type?: "markdown" | "text";
      /** 字数统计回调。 */
      after?(length: number, counter: {
          /** 是否启用计数器。默认值: false */
          enable: boolean;
          /** 允许输入的最大值 */
          max?: number;
          /** 统计类型。默认值: 'markdown' */
          type?: "markdown" | "text"
      }): void
  };
  /** @link https://ld246.com/article/1549638745630#options-cache */
  cache?: {
      /** 缓存 key，第一个参数为元素且启用缓存时必填 */
      id?: string;
      /** 是否使用 localStorage 进行缓存。默认值: true */
      enable?: boolean;
      /** 缓存后的回调 */
      after?(markdown: string): void;
  };
  /** 编辑模式。默认值: 'wysiwyg'
   *
   * wysiwyg: 所见即所得
   *
   * ir: 即时渲染
   *
   * sv: 分屏预览
   */
  mode?: "wysiwyg" | "sv" | "ir";
  /** @link https://ld246.com/article/1549638745630#options-preview */
  preview?: IPreview;
  /** @link https://ld246.com/article/1549638745630#options-link */
  link?: {
      /** 是否打开链接地址。默认值: true */
      isOpen?: boolean;
      /** 点击链接事件 */
      click?: (bom: Element) => void;
  },
  /** @link https://ld246.com/article/1549638745630#options-image */
  image?: {
      /** 是否预览图片。默认值: true */
      isPreview?: boolean;
      /** 图片预览处理 */
      preview?: (bom: Element) => void;
  },
  /** @link https://ld246.com/article/1549638745630#options-hint */
  hint?: IHint;
  /** @link https://ld246.com/article/1549638745630#options-toolbarConfig */
  toolbarConfig?: IToolbarConfig;
  /** 评论
   * @link https://ld246.com/article/1549638745630#options-comment
   */
  comment?: IComment;
  /** 主题。默认值: 'classic' */
  theme?: "classic" | "dark";
  /** 图标。默认值: 'ant' */
  icon?: "ant" | "material";
  /** @link https://ld246.com/article/1549638745630#options-upload */
  upload?: IUpload;
  /** @link https://ld246.com/article/1549638745630#options-classes */
  classes?: IClasses;
  /** 配置自建 CDN 地址。默认值: 'https://unpkg.com/vditor@${VDITOR_VERSION}' */
  cdn?: string;
  /** tab 键操作字符串，支持 \t 及任意字符串 */
  tab?: string;
  /** @link https://ld246.com/article/1549638745630#options-outline */
  outline?: IOutline;
  customRenders?: {
      language: string,
      render: (element: HTMLElement, vditor: IVditor) => void
  }[],

  /** 编辑器异步渲染完成后的回调方法 */
  after?(): void;

  /** 输入后触发 */
  input?(value: string): void;

  /** 聚焦后触发  */
  focus?(value: string): void;

  /** 失焦后触发 */
  blur?(value: string): void;

  /** 按下键盘触发 */
  keydown?(event: KeyboardEvent): void;

  /** `esc` 按下后触发 */
  esc?(value: string): void;

  /** `⌘/ctrl+enter` 按下后触发 */
  ctrlEnter?(value: string): void;

  /** 编辑器中选中文字后触发 */
  select?(value: string): void;
}


export interface IPreview {
  /** 预览 debounce 毫秒间隔。默认值: 1000 */
  delay?: number;
  /** 预览区域最大宽度。默认值: 768 */
  maxWidth?: number;
  /** 显示模式。默认值: 'both' */
  mode?: "both" | "editor";
  /** md 解析请求 */
  url?: string;
  /** @link https://ld246.com/article/1549638745630#options-preview-hljs */
  hljs?: IHljs;
  /** @link https://ld246.com/article/1549638745630#options-preview-math */
  math?: IMath;
  /** @link https://ld246.com/article/1549638745630#options-preview-markdown */
  markdown?: IMarkdownConfig;
  /** @link https://ld246.com/article/1549638745630#options-preview-theme */
  theme?: IPreviewTheme;
  /** @link https://ld246.com/article/1549638745630#options-preview-actions  */
  actions?: Array<IPreviewAction | IPreviewActionCustom>;
  render?: IPreviewRender
  /** 预览回调 */
  parse?(element: HTMLElement): void;

  /** 渲染之前回调 */
  transform?(html: string): string;
}

export interface IPreviewRender {
  media?: {
      enable?: boolean;
  }
}

interface IPreviewActionCustom {
  /** 键名 */
  key: string;
  /** 按钮文本 */
  text: string;
  /** 按钮 className 值 */
  className?: string;
  /** 按钮提示信息 */
  tooltip?: string;
  /** 点击回调 */
  click: (key: string) => void;
}

type IPreviewAction = "desktop" | "tablet" | "mobile" | "mp-wechat" | "zhihu";
