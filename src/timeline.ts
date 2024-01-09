// ===============================
// #region Constant Declarations
// ===============================

const NAME: string = "timeline";
const VERSION: string = "3.0.0";
const DATA_KEY: string = "ts.timeline";
const EVENT_KEY: string = `.${DATA_KEY}`;
const PREFIX: string = "tstl-";
const IS_TOUCH: boolean = 'ontouchstart' in window;
const MIN_POINTER_SIZE: number = 12;

// ===============================
// #region Interface Declarations
// ===============================

/**
 * Interface for Headline
 */
interface Headline {
    /**
     * This property is a toggle to whether or not to display the entire headline. If set to false headline is not shown.
     */
    display: boolean;
    /**
     * Contents displayed as a heading.
     */
    title: string;
    /**
     * Whether to display timetable range of timeline object as meta information in headline.
     */
    range: boolean;
    /**
     * his value is enabled if range is true, then it is instead of the locales argument to Date.prototype.toLocaleString([locales[, options]]).
     */
    locale: string;
    /**
     * This value is enabled if range is true, then it is instead of the options argument to Date.prototype.toLocaleString([locales[, options]]).
     */
    format: { hour12: boolean };
}

/**
 * Interface for Sidebar
 */
interface Sidebar {
    /**
     * Whether does sticky the sidebar to left side by using "display: sticky" of CSS.
     */
    sticky: boolean;
    /**
     * This property is enabled when sticky is true. When set to true, the portion hidden beneath the sidebar is transparently displayed when scrolling the timetable.
     */
    overlay: boolean;
}

/**
 * Interface for Ruler
 */
interface Ruler {
    /**
     * There's able to ignore outputting lower ruler scale than global scale if true. 
     */
    truncateLowers: boolean;
    /**
     * The upper ruler configuration. The upper ruler is hidden if omitted.
     */
    top: RulerDetails;
    /**
     * The lower ruler configuration. The lower ruler is hidden if omitted.
     */
    bottom: RulerDetails;
}

/**
 * Interface for Ruler details
 */
interface RulerDetails {
    /**
     * Multiple tick marks can be set, and array elements are set in order from the top. Set same scale of Option.scale if omitted this. Refer to Scalable Settings for set possible scales.
     */
    lines: string[];
    /**
     * The height of one row on the rulers.
     */
    height: number;
    /**
     * 	The size (pixel) of font on the rulers.
     */
    fontSize: number;
    /**
     * The color of text on the rulers.
     */
    color: string;
    /**
     * The color of background on the rulers.
     */
    background: string;
    /**
     * This value is instead of the locales argument to Date.prototype.toLocaleString([locales[, options]])
     */
    locale: string;
    /**
     * This value is instead of the options argument to Date.prototype.toLocaleString([locales[, options]])
     */
    format: { hour12: boolean };
}

/**
 * Interface for Footer
 */
interface Footer {
    /**
     * This property is a toggle to whether or not to display the entire footer. If set to false footer is not shown.
     */
    display: boolean;
    /**
     * Contents displayed on the footer.
     */
    content: string;
    /**
     * Whether to display timetable range of timeline object as meta information in footer.
     */
    range: boolean;
    /**
     * This value is enabled if range is true, then it is instead of the locales argument to Date.prototype.toLocaleString([locales[, options]]).
     */
    locale: string;
    /**
     * This value is enabled if range is true, then it is instead of the options argument to Date.prototype.toLocaleString([locales[, options]]).
     */
    format: { hour12: boolean };
}

/**
 * Interface for EventMeta
 */
interface EventMeta {
    /**
     * Whether to show meta content into event nodes.
     */
    display: boolean;
    /**
     * Scale of meta datetime shown.
     */
    scale: Scale;
    /**
     * This value is instead of the locales argument to Date.prototype.toLocaleString([locales[, options]]).
     */
    locale: string;
    /**
     * This value is instead of the options argument to # Date.prototype.toLocaleString([locales[, options]]).
     */
    format: { hour12: boolean };
    /**
     * This is value for if you want to show custom content on the meta.
     */
    content: string;
}

/**
 * Interface for Effects
 */
interface Effects {
    /**
     * Whether show a line of present time if it includes present time into the timeline range shown.
     */
    presentTime: boolean;
    /**
     * Whether fires a behavior when mouseover on one event.
     */
    hoverEvent: boolean;
    /**
     * Whether renders rows with striped color on the timeline container.
     */
    stripedGridRow: boolean;
    /**
     * There's able to change the horizontal grid line style on the timeline container. Allowed values are "solid", "dotted" and "none".
     */
    horizontalGridStyle: GridStyle;
    /**
     * There's able to change the vertical grid line style on the timeline container. Allowed values are "solid", "dotted" and "none".
     */
    verticalGridStyle: GridStyle;
}

/**
 * Interface for ColorScheme
 */
interface ColorScheme {
    /**
     * Color scheme to overwrite defaults UI color of the timeline instance.
     */
    theme: Theme;
    /**
     * Color scheme to overwrite defaults UI color of the event node.
     */
    event: ColorSchemeEvent;
    /**
     * You can declare a function to set colors with referring the data each event node.
     */
    hookEventColors: () => null;
}

/**
 * Interface for Theme
 */
interface Theme {
    /**
     * Theme's name.
     */
    name: string;
    /**
     * Base text color.
     */
    text: string;
    /**
     * Sub-text color.
     */
    subtext: string;
    /**
     * Offtone text color.
     */
    offtext: string;
    /**
     * Modest text color more than offtone.
     */
    modesttext: string;
    /**
     * Base border color.
     */
    line: string;
    /**
     * Offtone border color.
     */
    offline: string;
    /**
     * Active line color.
     */
    activeline: string;
    /**
     * Background color of the timeline instance.
     */
    background: string;
    /**
     * Inverted color of background.
     */
    invertbg: string;
    /**
     * Used to striped color for ruler, sidebar, grids.
     */
    striped1: string;
    /**
     * Used to striped color for ruler, sidebar, grids.
     */
    striped2: string;
    /**
     * Activated event node color.
     */
    active: string;
    /**
     * Marker color for present time.
     */
    marker: string;
    /**
     * Base color for grid lines in the timeline container.
     */
    gridbase: string;
}

/**
 * Interface for Event color
 */
interface ColorSchemeEvent {
    /**
     * Text color on the event node. This uses as default color when the "color" of the event parameter undefined.
     */
    text: string;
    /**
     * Border color on the event node. This uses as default color when the "bdColor" of the event parameter undefined.
     */
    border: string;
    /**
     * Background color on the event node. This uses as default color when the "bgColor" of the event parameter undefined.
     */
    background: string;
}

/**
 * Interface for Coordinates
 */
interface Coordinates {
    x: number;
    y: number;
}

/**
 * Interface for Config
 */
interface Config {
    /**
     * View type of timeline event 
     */
    type: Type;
    /**
     * Timetable's minimum level scale
     */
    scale: Scale;
    /**
     * Beginning DateTime of timetable on the timeline object
     */
    startDatetime: StartDateTime | Date | string;
    /**
     * Ending DateTime of timetable on the timeline object
     */
    endDatetime: EndDateTime | Date | string;
    /**
     * Override the scale range of the timeline to be rendered when endDatetime is undefined or "auto" 
     */
    range: number | string;
    /**
     * Number of rows to be display in event area. Default: 'DisplayRows.AUTO'
     */
    numRows?: DisplayRows | number;
    /**
     * Height (pixel) of one row.
     */
    rowHeight: number;
    /**
     * Fixed width (pixel) of the timeline object
     */
    width: string;
    /**
     * Fixed height (pixel) of the timeline object. Defaults to rows * rowHeight.
     */
    height: string;
    /**
     * Override value of minimum size (pixel) of timeline grid 
     */
    minGridSize: number;
    /**
     * Margin (pixel) of top and bottom of events on the timeline
     */
    marginHeight: number;
    /**
     * Define the content display such as the heading of the top on the timeline object. For more detail, refer to the headline.
     */
    headline: Headline;
    /**
     * Define the content display as the sidebar of the left on the timeline object. For more detail, refer to the sidebar.
     */
    sidebar: Sidebar;
    /**
     * Define the content display the ruler of the timetable on the timeline object. For more detail, refer to the ruler.
     */
    ruler: Ruler;
    /**
     * Define the content display such as the footer of the bottom on the timeline object. For more detail, refer to the footer.
     */
    footer: Footer;
    /**
     * You can display meta on an event node block when the timeline type is "bar". For more detail, refer to the event meta.
     */
    eventMeta: EventMeta;
    /**
     * There's able to include any initial events into the default option. You should see the "Event Parameters" section about the definition of event objects in an array.
     */
    eventData: Partial<EventParams>[];
    /**
     * Define the rows to be displayed.
     */
    rows?: Row[];
    /**
     * You can control some behaviors and view of the timeline by this property. For more details, refer to the effects.
     */
    effects: Effects;
    /**
     * 	You can overwrite defaults UI color of the event nodes. Furthermore since version 2.1.0, you can set all color scheme of the timeline instance.
     */
    colorScheme: ColorScheme;
    /**
     * Adjust the position of the timetable in the first view of the timeline object. Possible setting values are "left" of "begin", "center", "right" or "end", "current", "latest" and number of specific event id.
     */
    rangeAlign: RangeAlignment;
    /**
     * Define the loader shown while loading timeline object, possible setting values are "default", false and selector of your custom loader element.
     */
    loader: string;
    /**
     * 	You can append to the specific content into the default preloading element. It will stop the default preloading animation if set this property.
     */
    loadingMessage: string;
    /**
     * Whether or not to display the scroll bar displayed when the width of the timeline overflows (even if it is set to non-display, it will not function depending on the browser).
     */
    hideScrollbar: boolean;
    /**
     * Specification of Web storage to cache event data, defaults to sessionStorage.
     */
    storage: StorageType;
    /**
     * Whether to load cached events during reloading, the cache is discarded if false.
     */
    reloadCacheKeep: boolean;
    /**
     * Whether to use the ability to zoom the scale of the timeline by double clicking on any scale on the ruler.
     */
    zoom: boolean;
    /**
     * Whether wrapping new scale in the timeline container when zoom.
     */
    wrapScale: boolean;
    /**
     * There's define a start day of one week for the week scale on the timeline. Defaults to 1 that equal Monday.
     */
    firstDayOfWeek: number;
    /**
     * Choose dependent module to the core as a rendering engine. It'll be "canvas" or "d3.js"; Maybe add in future version.
     */
    engine: string;
    /**
     * todo
     */
    disableLimitter: boolean;
    /**
     * Enable to debug mode if true then output logs for debugging to console. Defaults to false.
     */
    debug: boolean;
    /**
     * Defines style handling of parallel events. Default is overlay of overlapping events with latest event.
     */
    parallelEventsOption: ParallelEventsOption;
    /*
     * Set separateParallelEvents to true to display parallel events in distinct rows within a category. If false, minimize row usage by combining non-overlapping events.
     */
    separateParallelEvents: boolean;
    /**
     * Allows for additional properties
     */
    [key: string]: any;
}

/**
 * Interface for RelationOption
 */
interface RelationOption {
    before?: number;
    after?: number;
    linesize?: number;
    linecolor?: string;
    curve?: number | string | boolean;
    x?: number;
    y?: number;
}

/**
 * Interface for Row
 */
interface Row {
    /**
     * Id of the row. Must be unique. Is filter creteria for category matching of events.
     */
    id: string;
    /**
     * Position of the row. If position is unique defined, the row will be positioned. 
     */
    position?: number;
    /**
     * Defines the label in Sidebar. If it is not defined the id will be displayed.
     */
    label?: string;
    /**
     * Number of maximum parallel events by row. Calculated while inizialization.
     */
    maxParallelEvents?: number;
    /**
     * Events splitted to subrows per category, if parallelEventsOption is MULTIROW or SPLITROW
     */
    categoryEventsPerRows?: EventParams[][];
    /**
     * Allows for additional properties
     */
    [key: string]: any;
}

/**
 * Interface for Timeline instance
 */
interface Instance {
    begin?: Date;
    end?: Date;
    scaleSize?: number;
    rows?: number;
    rowSize?: number;
    width?: any;
    height?: any;
    /**
     * Is variable length of scale
     */
    isVLS?: boolean;
    variableScale?: any;
    scroll?: {
        absX?: number;
        moveX?: number;
        isTouched?: boolean;
    }
    drag?: {
        startPosition?: { x?: number, y?: number } | null;
        lastPosition?: { x?: number, y?: number } | null;
        isDragged?: boolean;
    }
    grids?: number;
    /**
     * Allows for additional properties
     */
    [key: string]: any;
}

/**
 * Interface for EventParams configuration
 */
interface EventParams {
    uid?: string;
    eventId?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    start?: number;
    end?: number;
    row?: number;
    bgColor?: string;
    color?: string;
    bdColor?: string;
    label?: string;
    content?: string;
    category?: string;
    image?: string;
    margin?: number;
    rangeMeta?: string;
    size?: number | string;
    remote?: boolean;
    relation?: RelationOption;
    callback?: any;
    type?: Type;
    prop?: any;
    /**
     * Allows for additional properties. Add JSON to extend object with custom properties
     */
    extend?: any;
    /**
     * Allows for additional properties
     */
    [key: string]: any;
}

/**
 * Interface for ScaleMap
 */
interface ScaleMap {
    [key: string]: {
        years?: number;
        lower: Scale | null;
        minGrids: number;
    };
}

/**
 * Interface for the element object
 */
interface Element {
    key?: any,
    tagName?: string,
    id?: string
}

/**
 * Interface for the map data object
 */
interface MapData {
    set: (element: Element, key: string, data: any) => void;
    get: (element: Element, key: string) => any;
    delete: (element: Element, key: string) => void;
}

/**
 * Interface for the data object
 */
interface Data {
    setData: (instance: Element, key: string, data: any) => void;
    getData: (instance: Element, key: string) => any;
    removeData: (instance: Element, key: string) => void;
}

/**
 * Enum definition for Types
 */
export enum Type {
    BAR = "bar",
    POINT = "point",
    MIXED = "mixed"
}

/**
 * Enum definition for Scale 
 */
export enum Scale {
    MILLENNIUM = 'millennium',
    CENTURY = 'century',
    DECADE = 'decade',
    LUSTRUM = 'lustrum',
    YEAR = 'year',
    MONTH = 'month',
    WEEK = 'week',
    WEEKDAY = 'weekday',
    DAY = 'day',
    HOUR = 'hour',
    QUARTER_HOUR = 'quarterHour',
    HALF_HOUR = 'halfHour',
    MINUTE = 'minute',
    SECOND = 'second',
    MILLISECOND = 'millisecond',
    CUSTOM = 'custom'
}

/**
 * Interface for ParallelEventsOption
 */
export enum ParallelEventsOption {
    OVERLAY = "overlay",
    SPLITROW = "splitrow",
    MULTIROW = "multirow"
}

/**
 * Enum for different round scales
 */
enum RoundScale {
    DAY = "DAY",
    HOUR = "HOUR",
    HALFHOUR = "HALFHOUR",
    QUARTERHOUR = "QUARTERHOUR",
    TWENTYMINUTES = "TWENTYMINUTES",
    TENMINUTES = "TENMINUTES",
    FIVEMINUTES = "FIVEMINUTES",
    MINUTE = "MINUTE"
}

/**
 * Enum definition for StartDateTime 
 */
enum StartDateTime {
    CURRENT = 'current'
}

/**
 * Enum definition for EndDateTime
 */
enum EndDateTime {
    AUTO = 'auto'
}

/**
 * Enum definition for Rows
 */
enum DisplayRows {
    AUTO = 'auto'
}

/**
 * Enum definition for Size
 */
enum Size {
    AUTO = 'auto'
}

/**
 * Enum definition for browser storage types
 */
enum StorageType {
    LOCAL_STORAGE = 'localStorage',
    SESSION_STORAGE = 'sessionStorage'
}

/**
 * Enum definition for GridStyle
 */
enum GridStyle {
    DOTTED = 'dotted',
    SOLID = 'solid',
    NONE = 'none'
}

/**
 * Enum definition for RangeAlignment
 */
enum RangeAlignment {
    LEFT = 'left',
    BEGIN = 'begin',
    CENTER = 'center',
    RIGHT = 'right',
    END = 'end',
    LATEST = 'latest',
    CURRENT = 'current',
    NOW = 'now'
}

/**
 * Defines the event types
 */
const TimelineEvent: { [key: string]: string } = {
    INITIALIZED: `initialized${EVENT_KEY}`,
    HIDE: `hide${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    CLICK_EVENT: `click`,//.open${EVENT_KEY}`,
    DBCLICK_EVENT: `dblclick`,
    FOCUSIN_EVENT: `focusin`,//.event${EVENT_KEY}`,
    FOCUSOUT_EVENT: `focusout`,//.event${EVENT_KEY}`,
    TOUCHSTART_TIMELINE: `mousedown`,//.timeline${EVENT_KEY}`,
    TOUCHMOVE_TIMELINE: `mousemove`,//.timeline${EVENT_KEY}`,
    TOUCHEND_TIMELINE: `mouseup`,//.timeline${EVENT_KEY}`,
    MOUSEENTER_POINTER: `mouseenter`,//.pointer${EVENT_KEY}`,
    MOUSELEAVE_POINTER: `mouseleave`,//.pointer${EVENT_KEY}`,
    ZOOMIN_SCALE: `dblclick`//.zoom${EVENT_KEY}`
}

/**
 * Defines the class names
 */
const ClassName: { [key: string]: string } = {
    TIMELINE_CONTAINER: `${PREFIX}container`,
    TIMELINE_MAIN: `${PREFIX}main`,
    TIMELINE_HEADLINE: `${PREFIX}headline`,
    TIMELINE_HEADLINE_WRAPPER: `${PREFIX}headline-wrapper`,
    HEADLINE_TITLE: `${PREFIX}timeline-title`,
    RANGE_META: `${PREFIX}range-meta`,
    RANGE_SPAN: `${PREFIX}range-span`,
    TIMELINE_EVENT_CONTAINER: `${PREFIX}event-container`,
    TIMELINE_BACKGROUND_GRID: `${PREFIX}bg-grid`,
    TIMELINE_RELATION_LINES: `${PREFIX}relation-lines`,
    TIMELINE_EVENTS: `${PREFIX}events`,
    TIMELINE_EVENT_NODE: `${PREFIX}event-node`,
    TIMELINE_EVENT_LABEL: `${PREFIX}event-label`,
    TIMELINE_EVENT_THUMBNAIL: `${PREFIX}event-thumbnail`,
    TIMELINE_RULER_LINES: `${PREFIX}ruler-line-rows`,
    TIMELINE_RULER_ITEM: `${PREFIX}ruler-line-item`,
    TIMELINE_SIDEBAR: `${PREFIX}side-index`,
    TIMELINE_SIDEBAR_MARGIN: `${PREFIX}side-index-margin`,
    TIMELINE_SIDEBAR_ITEM: `${PREFIX}side-index-item`,
    TIMELINE_FOOTER: `${PREFIX}footer`,
    TIMELINE_FOOTER_CONTENT: `${PREFIX}footer-content`,
    VIEWER_EVENT_TITLE: `${PREFIX}event-title`,
    VIEWER_EVENT_CONTENT: `${PREFIX}event-content`,
    VIEWER_EVENT_META: `${PREFIX}event-meta`,
    VIEWER_EVENT_IMAGE_WRAPPER: `${PREFIX}event-image-wrapper`,
    VIEWER_EVENT_IMAGE: `${PREFIX}event-image`,
    VIEWER_EVENT_TYPE_POINTER: `${PREFIX}event-type-pointer`,
    HIDE_SCROLLBAR: `${PREFIX}hide-scrollbar`,
    HIDE: `${PREFIX}hide`,
    RULER_ITEM_ALIGN_LEFT: `${PREFIX}rli-left`,
    STICKY_LEFT: `${PREFIX}sticky-left`,
    OVERLAY: `${PREFIX}overlay`,
    ALIGN_SELF_RIGHT: `${PREFIX}align-self-right`,
    PRESENT_TIME_MARKER: `${PREFIX}present-time`,
    LOADER_CONTAINER: `${PREFIX}loader`,
    LOADER_ITEM: `${PREFIX}loading`
}

/**
 * Defines the limit scale grids
 */
const LimitScaleGrids: { [key: string]: number } = {
    [Scale.MILLENNIUM]: 100,
    [Scale.CENTURY]: 100 * 5,
    [Scale.DECADE]: 10 * 50,
    [Scale.LUSTRUM]: 5 * 100,
    [Scale.YEAR]: 500,
    [Scale.MONTH]: 12 * 45,
    [Scale.WEEK]: 53 * 10,
    [Scale.DAY]: 366,
    [Scale.HOUR]: 24 * 30,
    [Scale.QUARTER_HOUR]: 24 * 4 * 7.5,
    [Scale.HALF_HOUR]: 24 * 2 * 15,
    [Scale.MINUTE]: 60 * 12,
    [Scale.SECOND]: 60 * 15
}

/**
 * Defines the scale units
 */
const ScaleUnits = {
    [Scale.MILLENNIUM]: 365.25 * 24 * 60 * 60 * 1000,
    [Scale.CENTURY]: 365.25 * 24 * 60 * 60 * 1000,
    [Scale.DECADE]: 24 * 60 * 60 * 1000,
    [Scale.LUSTRUM]: 24 * 60 * 60 * 1000,
    [Scale.YEAR]: 24 * 60 * 60 * 1000,
    [Scale.MONTH]: 24 * 60 * 60 * 1000,
    [Scale.WEEK]: 60 * 60 * 1000,
    [Scale.DAY]: 60 * 60 * 1000,
    [Scale.HOUR]: 60 * 1000,
    [Scale.MINUTE]: 1000,
    [Scale.SECOND]: 1,
}

/**
 * Defines the selectors
 */
const Selector: { [key: string]: string } = {
    EVENT_NODE: `.${PREFIX}event-node`,
    EVENT_VIEW: `.timeline-event-view, .${PREFIX}event-view`,
    RULER_TOP: `.${PREFIX}ruler-top`,
    RULER_BOTTOM: `.${PREFIX}ruler-bottom`,
    TIMELINE_CONTAINER: `.${ClassName.TIMELINE_CONTAINER}`,
    TIMELINE_MAIN: `.${ClassName.TIMELINE_MAIN}`,
    HEADLINE_TITLE: `.${ClassName.HEADLINE_TITLE}`,
    RANGE_META: `.${ClassName.RANGE_META}`,
    TIMELINE_RULER_TOP: `.${PREFIX}ruler-top`,
    TIMELINE_EVENT_CONTAINER: `.${ClassName.TIMELINE_EVENT_CONTAINER}`,
    TIMELINE_RULER_BOTTOM: `.${PREFIX}ruler-bottom`,
    TIMELINE_RULER_LINES: `.${ClassName.TIMELINE_RULER_LINES}`,
    TIMELINE_RULER_ITEM: `.${ClassName.TIMELINE_RULER_ITEM}`,
    TIMELINE_RELATION_LINES: `.${ClassName.TIMELINE_RELATION_LINES}`,
    TIMELINE_EVENTS: `.${ClassName.TIMELINE_EVENTS}`,
    TIMELINE_SIDEBAR: `.${ClassName.TIMELINE_SIDEBAR}`,
    TIMELINE_SIDEBAR_MARGIN: `.${ClassName.TIMELINE_SIDEBAR_MARGIN}`,
    TIMELINE_SIDEBAR_ITEM: `.${ClassName.TIMELINE_SIDEBAR_ITEM}`,
    TIMELINE_EVENT_NODE: `.${ClassName.TIMELINE_EVENT_NODE}`,
    VIEWER_EVENT_TITLE: `.${ClassName.VIEWER_EVENT_TITLE}`,
    VIEWER_EVENT_CONTENT: `.${ClassName.VIEWER_EVENT_CONTENT}`,
    VIEWER_EVENT_META: `.${ClassName.VIEWER_EVENT_META}`,
    VIEWER_EVENT_TYPE_POINTER: `.${ClassName.VIEWER_EVENT_TYPE_POINTER}`,
    OVERLAY: `.${ClassName.OVERLAY}`,
    PRESENT_TIME_MARKER: `.${ClassName.PRESENT_TIME_MARKER}`,
    LOADER: `.${ClassName.LOADER_CONTAINER}`,
    LOADER_ITEM: `.${ClassName.LOADER_ITEM}`,
    DEFAULT_EVENTS: `.timeline-events`
}

/**
 * Defines the default settings
 */
const Default: Config = {
    type: Type.BAR,
    scale: Scale.HOUR,
    startDatetime: StartDateTime.CURRENT,
    endDatetime: EndDateTime.AUTO,
    range: 3,
    numRows: DisplayRows.AUTO,
    rowHeight: 75,
    width: Size.AUTO,
    height: Size.AUTO,
    minGridSize: 75,
    marginHeight: 2,
    headline: {
        display: true,
        title: "Title",
        range: true,
        locale: "de-DE",
        format: { hour12: false }
    },
    sidebar: {
        sticky: true,
        overlay: false
    },
    ruler: {
        truncateLowers: false,
        top: {
            lines: [],
            height: 30,
            fontSize: 14,
            color: "inherit",
            background: "inherit",
            locale: "de-DE",
            format: { hour12: false }
        },
        bottom: {
            lines: [],
            height: 30,
            fontSize: 14,
            color: "inherit",
            background: "inherit",
            locale: "de-DE",
            format: { hour12: false }
        },
    },
    footer: {
        display: true,
        content: "",
        range: false,
        locale: "de-DE",
        format: { hour12: false }
    },
    eventMeta: {
        display: false,
        scale: Scale.HOUR,
        locale: "de-DE",
        format: { hour12: false },
        content: ""
    },
    eventData: [],
    effects: {
        presentTime: true,
        hoverEvent: true,
        stripedGridRow: true,
        horizontalGridStyle: GridStyle.DOTTED,
        verticalGridStyle: GridStyle.SOLID,
    },
    colorScheme: {
        theme: {
            name: "default",
            text: "#343A40",
            subtext: "#707070",
            offtext: "#BBBBBB",
            modesttext: "#969696",
            line: "#6C757D",
            offline: "#DDDDDD",
            activeline: "#DC3545",
            background: "#FFFFFF",
            invertbg: "#121212",
            striped1: "#F7F7F7",
            striped2: "#F0F0F0",
            active: "#F73333",
            marker: "#2C7CFF",
            gridbase: "#333333"
        },
        event: {
            text: "#343A40",
            border: "#6C757D",
            background: "#E7E7E7",
        },
        hookEventColors: () => null
    },
    rangeAlign: RangeAlignment.LATEST,
    loader: "default",
    loadingMessage: "",
    hideScrollbar: false,
    storage: StorageType.SESSION_STORAGE,
    reloadCacheKeep: true,
    zoom: false,
    wrapScale: true,
    firstDayOfWeek: 1, // 0: Sunday, 1: Monday, ... 6: Saturday
    engine: "canvas",
    disableLimitter: false,
    debug: false,
    parallelEventsOption: ParallelEventsOption.SPLITROW,
    separateParallelEvents: false
}

/**
 * Defines the default event element
 */
const EventParams: EventParams = {
    uid: null,
    eventId: null,
    x: 0,
    y: Default.marginHeight,
    width: Default.minGridSize,
    height: Default.rowHeight - Default.marginHeight * 2,
    start: null,
    end: null,
    row: 1,
    bgColor: Default.colorScheme.event.background,
    color: Default.colorScheme.event.text,
    bdColor: Default.colorScheme.event.border,
    label: "",
    content: "",
    category: "",
    image: "",
    margin: Default.marginHeight,
    rangeMeta: "",
    size: "normal",
    extend: {},
    remote: false,
    relation: null,
    callback: () => { }
}

/**
 * Creates a map data object
 */
const mapData: MapData = (() => {
    const storeData: { [key: number]: any } = {};
    let id = 1;
    return {
        set(element: Element, key: string, data: any) {
            if (typeof element.key === 'undefined') {
                element.key = { key, id };
                id++;
            }

            storeData[element.key.id] = data;
        },
        get(element: Element, key: string) {
            if (!element || typeof element.key === 'undefined') {
                return null;
            }

            const keyProperties = element.key;
            if (keyProperties.key === key) {
                return storeData[keyProperties.id];
            }

            return null;
        },
        delete(element: Element, key: string) {
            if (typeof element.key === 'undefined') {
                return;
            }

            const keyProperties = element.key;
            if (keyProperties.key === key) {
                delete storeData[keyProperties.id];
                delete element.key;
            }
        }
    };
})();

/**
 * Creates a data object
 */
const Data: Data = {
    setData(instance: Element, key: string, data: any) {
        mapData.set(instance, key, data);
    },
    getData(instance: Element, key: string) {
        return mapData.get(instance, key);
    },
    removeData(instance: Element, key: string) {
        mapData.delete(instance, key);
    }
}

// ===============================
// #region Timeline
// Core Plugin Class
// ===============================

/**
 * Class representing a timeline
 */
export class Timeline {
    private config: Config;
    private element: HTMLElement;
    private selector: string | null;
    private isInitialized: boolean;
    private isCached: boolean;
    private isCompleted: boolean;
    private isShown: boolean;
    private instanceProps: Instance;
    private observer: any | null; // Specify the correct type if known
    private beforeOpenEvent: any | null; // Specify the correct type if known
    //private countEventinCell: { [key: string]: any }; // Uncomment if needed

    /**
     * Creates a new timeline
     * @param element - The HTML element for the timeline
     * @param config - The configuration object for the timeline
     */
    constructor(element: HTMLElement, config: Config | any) {
        this.config = this.getConfig(config);
        this.element = element;
        this.selector = null;
        this.isInitialized = false;
        this.isCached = false;
        this.isCompleted = false;
        this.isShown = false;
        this.instanceProps = null;
        this.observer = null;
        this.beforeOpenEvent = null;
        //this.countEventinCell = {};

        Data.setData(element, DATA_KEY, this);
        this.init();
    }

    /**
     * Get the data associated with the given element
     */
    private static getInstance(element: HTMLElement) {
        return Data.getData(element, DATA_KEY);
    }

    /**
     * Initialize the plugin
     */
    private init = async () => {
        this.debug('init');

        let element = this.element;
        let selector = `${element.tagName}${(element.id ? `#${element.id}` : '')}${(element.className ? `.${element.className.replace(/\s/g, '.')}` : '')}`;

        this.selector = selector;

        if (this.isInitialized || this.isCompleted) {
            return this;
        }

        this.calculateVariables();

        // this.showLoader();

        if (!this.verifyMaxRenderableRange()) {
            throw new RangeError('Timeline display period exceeds maximum renderable range.');
        }

        this.renderView();

        if (!this.isCached) {
            this.loadEvent();
        }

        if (this.isCached) {
            await this.placeEvent();
        }

        // Assign events for the timeline
        document.addEventListener(TimelineEvent.CLICK_EVENT, (event: Event) => {
            if ((event.target as HTMLElement).matches(`${this.selector} ${Selector.EVENT_NODE}`)) {
                const _event = this.getEventParamsFromEvent(event);
                console.log(_event);
            }
        });

        document.addEventListener(TimelineEvent.DBCLICK_EVENT, (event: Event) => {
            if ((event.target as HTMLElement).matches(`${this.selector} ${Selector.EVENT_NODE}`)) {
                var eventCopy = this.getEventParamsFromEvent(event);
                eventCopy.uid = Timeline.generateUniqueID();
                this.updateInCache(eventCopy.uid, eventCopy);
                var eventData: EventParams[] = this.loadToCache();
                this.config.eventData = eventData;
                var newConfig: any = {
                    eventData: eventData
                }

                //this.placeEvent();
                this.reload([newConfig]);
                //const _event = this.getEventParamsFromEvent(event);
                console.log("dbclick");
            }
        });

        // Add event listeners for focus in
        element.addEventListener(TimelineEvent.FOCUSIN_EVENT, (event: Event) => {
            if ((event.target as HTMLElement).matches(Selector.TIMELINE_EVENT_NODE)) {
                this.activeEvent(event);
            }
        });

        // Add event listeners for focus out
        element.addEventListener(TimelineEvent.FOCUSOUT_EVENT, (event: Event) => {
            if ((event.target as HTMLElement).matches(Selector.TIMELINE_EVENT_NODE)) {
                this.activeEvent(event);
            }
        });

        // Add event listeners for touch start
        element.addEventListener(TimelineEvent.TOUCHSTART_TIMELINE, (event: TouchEvent | MouseEvent) => {
            if ((event.target as HTMLElement)?.parentElement?.matches(Selector.TIMELINE_EVENT_CONTAINER)) {
                this.swipeStart(event);
            }
        });

        // Add event listeners for touch move
        element.addEventListener(TimelineEvent.TOUCHMOVE_TIMELINE, (event: TouchEvent | MouseEvent) => {
            if ((event.target as HTMLElement)?.parentElement?.matches(Selector.TIMELINE_EVENT_CONTAINER)) {
                this.swipeMove(event);
            }
        });

        // Add event listeners for touch end
        element.addEventListener(TimelineEvent.TOUCHEND_TIMELINE, (event: TouchEvent | MouseEvent) => {
            if ((event.target as HTMLElement)?.parentElement?.matches(Selector.TIMELINE_EVENT_CONTAINER)) {
                this.swipeEnd();
            }
        });

        // Add event listeners for mouse enter and mouse leave if the config type matches
        if (this.config.type === Type.POINT) {
            // Add event listeners for mouse enter
            element.addEventListener(TimelineEvent.MOUSEENTER_POINTER, (event: Event) => {
                if ((event.target as HTMLElement).matches(Selector.VIEWER_EVENT_TYPE_POINTER)) {
                    // this.hoverPointer(event);
                }
            });

            // Add event listeners for mouse leave
            element.addEventListener(TimelineEvent.MOUSELEAVE_POINTER, (event: Event) => {
                if ((event.target as HTMLElement).matches(Selector.VIEWER_EVENT_TYPE_POINTER)) {
                    // this.hoverPointer(event);
                }
            });
        }

        // Add event listener for zoom in scale if zoom is enabled
        if (this.config.zoom) {
            element.addEventListener(TimelineEvent.ZOOMIN_SCALE, (event: Event) => {
                if ((event.target as HTMLElement).matches(Selector.TIMELINE_RULER_ITEM)) {
                    this.zoomScale(event);
                }
            });
        }

        // Add event listener for dragging events if dragging is enabled
        element.addEventListener("dragstart", (event: DragEvent) => {
            if ((event.target as HTMLElement).matches(Selector.TIMELINE_EVENT_NODE)) {
                this.moveEventStart(event);
            }
        });

        // 
        element.addEventListener("dragover", (event: DragEvent) => {
            if ((event.target as HTMLElement).matches(Selector.TIMELINE_EVENT_NODE)) {
                event.preventDefault();
                this.moveEvent(event);
            }
        });

        // 
        element.addEventListener("dragend", (event: DragEvent) => {
            if ((event.target as HTMLElement).matches(Selector.TIMELINE_EVENT_NODE)) {
                event.preventDefault();
                this.moveEventEnd(event);
            }
        });

        this.isCompleted = true;

        // await this.hideLoader();

        this.alignment();

        if (!this.isInitialized) {
            // Create a new event with the name 'INITIALIZED'
            const afterInitEvent = new Event(TimelineEvent.INITIALIZED);

            // Dispatch the event on the element element
            element.dispatchEvent(afterInitEvent);

            // Remove the 'INITIALIZED' event listener from the element element
            element.removeEventListener(TimelineEvent.INITIALIZED, this.handleInitializedEvent);
        }
        return this;
    }

    /**
     * Reloads the timeline with optional override parameters.
     * @param args - The arguments passed to the function.
     */
    async reload(...args: any[]) {
        console.log('reload');

        let _args = args[0];
        let newConfig: Partial<Config> = Timeline.supplement(null, _args[0], Timeline.validateObject);
        let callback = _args.length > 1 && typeof _args[1] === 'function' ? _args[1] : null;
        let userdata = _args.length > 2 ? Timeline.getUserArg(_args.slice(2)) : undefined;
        let element = this.element;
        let scrollPosition = element.parentElement.querySelector(Selector.TIMELINE_CONTAINER).scrollLeft;
        let defaultEvents = element.querySelectorAll(Selector.DEFAULT_EVENTS);
        let config: Config = this.config;
        let scale: Scale;

        if (!Timeline.isEmpty(newConfig)) {
            this.config = Object.assign({}, config, newConfig);
        }

        this.isInitialized = false;
        this.isCached = false;
        this.isCompleted = false;
        this.instanceProps = {};
        //this.countEventinCell = {};

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        defaultEvents.forEach(event => element.appendChild(event));

        this.calculateVariables();
        //this.showLoader();

        if (this.config?.moveScale) {
            scale = this.config.moveScale;
            delete this.config.moveScale;
        } else {
            scale = this.config.scale;
        }

        if (!this.verifyMaxRenderableRange(scale)) {
            throw new RangeError(`Timeline display period exceeds maximum renderable range.`);
        }

        if (!this.isInitialized) {
            this.renderView();
            element.parentElement.querySelector(Selector.TIMELINE_CONTAINER).scrollLeft = scrollPosition;
            this.isInitialized = true;
        }

        if (this.config.reloadCacheKeep) {
            let cachedEvents = this.loadToCache(),
                newEvents = [];

            if (!Timeline.isEmpty(cachedEvents)) {
                cachedEvents.forEach((_event: any) => {
                    //delete _event.uid;
                    delete _event.x;
                    delete _event.y;
                    delete _event.width;
                    delete _event.height;
                    delete _event.relation?.x;
                    delete _event.relation?.y;
                    newEvents.push(this.registerEventData(document.createElement('div'), _event));
                });
            }
            this.isCached = this.saveToCache(newEvents);
        } else {
            this.loadEvent();
        }

        await this.placeEvent();
        this.isCompleted = true;
        //await this.hideLoader();

        if (callback) {
            console.log('Fired your callback function after reloading timeline.');
            callback(this.element, this.config, userdata);
        }

        // Assuming you have a popover function defined somewhere
        // let popovers = document.querySelectorAll('[data-toggle="popover"]');
        // popovers.forEach(popover => this.popover(popover));
    }

    /**
     * @private
     * Calculate each properties of the timeline instance
     */
    private calculateVariables(): void {
        const config: Config = this.config;
        let instance: Instance = {};

        const _callback = (_ac: Scale[], _cv: Scale) => {
            if (this.verifyScale(_cv)) {
                if (_ac.indexOf(_cv) === -1) {
                    _ac.push(_cv);
                }
            }
            return _ac;
        }

        // Define properties
        instance.begin = Timeline.supplement(null, this.getPluggableDatetime(config.startDatetime, 'first'));
        instance.end = Timeline.supplement(null, this.getPluggableDatetime(config.endDatetime, 'last'));
        instance.scaleSize = Timeline.supplement<number>(null, config.minGridSize, Timeline.validateNumeric);
        instance.rows = this.getPluggableRows();
        instance.rowSize = Timeline.supplement<number>(null, config.rowHeight, Timeline.validateNumeric);
        instance.width = Timeline.supplement(null, config.width, Timeline.validateNumeric);
        instance.height = Timeline.supplement(null, config.height, Timeline.validateNumeric);
        instance.isVLS = true;
        instance.scroll = {
            absX: 0,
            moveX: 0
        };

        // Sort rows: because position is an optional argument of row the sort process is splitted        
        // Separate rows with defined positions and those without
        let rowsWithPositions: Row[] = config.rows.filter(row => row.position !== undefined);
        let rowsWithoutPositions: Row[] = config.rows.filter(row => row.position === undefined);

        // Sort rows with defined positions
        rowsWithPositions.sort((a, b) => a.position - b.position);

        // Merge the arrays back together
        let sortedRows: Row[] = rowsWithoutPositions.slice(); // copy the array
        for (let row of rowsWithPositions) {
            sortedRows.splice(row.position - 1, 0, row); // insert at the correct position
        }
        config.rows = sortedRows;

        // Calculate max overlap per category
        const overlaps = this.getOverlap(config.eventData, instance.begin, instance.end);
        this.config.rows.forEach((row: Row) => {
            row.maxParallelEvents = overlaps.find(x => x.category == row.id)?.maxOverlap ?? 0;
            row.categoryEventsPerRows = overlaps.find(x => x.category == row.id)?.categoryEventsPerRows ?? [];
        });

        // Get all scales on ruler
        let _rulers = config.ruler.top.lines.reduce(_callback, []);

        if (config.ruler?.bottom?.lines) {
            _rulers = [..._rulers, ...config.ruler.bottom.lines].reduce(_callback, []);
        }
        if (Timeline.isEmpty(_rulers)) {
            config.ruler.top.lines.push(config.scale);
            _rulers.push(config.scale);
        }
        instance.rulers = _rulers;

        this.instanceProps = instance; // pre-cache

        if (instance.isVLS) {
            // For scales where the value of quantity per unit is variable length
            const _temp = this.verifyScale(config.scale, instance.begin, instance.end, instance.isVLS),
                _values = Object.values(_temp),
                _baseVar = config.scale === Scale.WEEK ? Math.max(..._values) : Math.min(..._values);
            let _totalWidth = 0;

            const unit = ScaleUnits[config.scale];
            if (unit) {
                instance.scale = _baseVar * unit;
            } else {
                instance.scale = _baseVar;
            }

            _values.forEach((val) => {
                _totalWidth += Timeline.numRound((val * instance.scaleSize) / _baseVar, 2);
            });

            instance.grids = _values.length;
            instance.variableScale = _temp;
            instance.fullwidth = _totalWidth;
        }

        let totalLines = 0;
        switch (config.parallelEventsOption) {
            case ParallelEventsOption.MULTIROW:
                totalLines = config.rows.reduce((sum, row) => sum + row.maxParallelEvents + 1, 0);
                break;
            case ParallelEventsOption.SPLITROW:
            case ParallelEventsOption.OVERLAY:
            default:
                totalLines = instance.rows;
                break;
        }
        const gridBorder: number = 1;
        instance.fullheight = totalLines * instance.rowSize + (totalLines - 1) * gridBorder;
        //instance.fullheight = instance.rows * instance.rowSize; // Provisional value as theoretical value

        // Define visible size according to full size of timeline
        instance.visibleWidth = instance.width > 0 ? `${(instance.width <= instance.fullwidth ? instance.width : instance.fullwidth)}px` : 'max-content';
        instance.visibleHeight = instance.height > 0 ? `${(instance.height <= instance.fullheight ? instance.height : instance.fullheight)}px` : 'max-content';

        for (const _prop in instance) {
            if (/^(width|height|variableScale|absX|moveX)$/.test(_prop)) {
                continue;
            }
            if (Timeline.isEmpty(instance[_prop])) {
                throw new TypeError(`Property "${_prop}" cannot set because undefined or invalid variable.`);
            }
        }

        if (instance.fullwidth < 2 || instance.fullheight < 2) {
            throw new TypeError(`The range of the timeline to be rendered is incorrect.`);
        }

        this.instanceProps = instance;
    }

    /**
     * Acquire the difference between two dates with the specified scale value
     *
     * @param date1 - a date object, null or integer as milliseconds
     * @param date2 - a date object, null or integer as milliseconds
     * @param scale - the scale of an interval value (defaults to 'millisecond')
     * @param absval - absolute value flag (defaults to false)
     *
     * @return number when given valid argument, or false if failed
     */
    diffDate(date1: Date | number | null, date2: Date | number | null, scale: Scale = Scale.MILLISECOND, absval: boolean = false): { [key: number]: number } | number {
        let diffMS: number = 0;

        // Function to get the last day of the month
        let lastDayOfMonth = (dateObj: Date): number => {
            let _tmp: Date = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);
            _tmp.setTime(_tmp.getTime() - 1);
            return _tmp.getDate();
        };

        // Function to check if a year is a leap year
        const isLeapYear = (dateObj: Date): boolean => {
            let _tmp: Date = new Date(dateObj.getFullYear(), 0, 1);
            let sum: number = 0;

            for (let i = 0; i < 12; i++) {
                _tmp.setMonth(i);
                sum += lastDayOfMonth(_tmp);
            }
            return sum == 365 ? false : true;
        };

        // Check if the dates are valid
        if (!date1 || !date2) {
            this.error('Cannot parse date to get difference because undefined.', 'warn');
            return;
        }

        diffMS = Number(date2) - Number(date1);

        if (isNaN(diffMS)) {
            this.error('Cannot parse date to get difference because invalid format.', 'warn');
            return;
        }
        if (absval) {
            diffMS = Math.abs(diffMS);
        }

        let _bd: Date = date1 instanceof Date ? date1 : new Date(date1),
            _ed: Date = date2 instanceof Date ? date2 : new Date(date2),
            _dy: number = _ed.getFullYear() - _bd.getFullYear(),
            _m: { [key: number]: number } = {},
            retval: { [key: number]: number } | number,
            _by: number = _bd.getFullYear(),
            _ey: number = _ed.getFullYear(),
            startYear: number = _bd.getFullYear(),
            endYear: number = _ed.getFullYear(),
            _bm: number,
            _em: number,
            _cm: number,
            _bc: number,
            _ec: number,
            _cc: number,
            _cd: Date,
            _cl: number,
            _cy: number,
            _days: number,
            _nd: Date,
            _pd: Date;

        switch (scale) {
            case Scale.MILLENNIUM:
                // return { "millennium-number": years,... }
                _bm = Math.ceil((_by === 0 ? 1 : _by) / 1000); // millennium of first ordinal
                _em = Math.ceil((_ey === 0 ? 1 : _ey) / 1000);
                _cm = _bm;

                // Calculate the years for each millennium, between dates, _bd and _ed.
                _m[_bm] = _em - _bm > 0 ? (_bm * 1000) - _by : _ey - _by;
                _cm++;
                while (_cm <= _em) {
                    _m[_cm] = _em - _cm > 0 ? 1000 : _ey - ((_cm - 1) * 1000);
                    _cm++;
                }

                // The final result
                retval = _m;
                break;
            case Scale.CENTURY:
                // return { "century-number": years,... }
                _bc = Math.ceil((_by === 0 ? 1 : _by) / 100); // century of first ordinal
                _ec = Math.ceil((_ey === 0 ? 1 : _ey) / 100);
                _cc = _bc;

                // Calculate the years for each century between dates, _bd and _ed.
                _m[_bc] = _ec - _bc > 0 ? (_bc * 100) - _by : _ey - _by;
                _cc++;
                while (_cc <= _ec) {
                    _m[_cc] = _ec - _cc > 0 ? 100 : _ey - ((_cc - 1) * 100);
                    _cc++;
                }

                // The final result
                retval = _m;
                break;
            case Scale.DECADE:
                // return { "decade-number": days,... }
                _cy = _by === 0 ? 1 : _by;

                // Calculate the total number of days for each decade between dates, _bd and _ed.
                while (_cy <= _ey) {
                    _days = isLeapYear(new Date(_cy, 0, 1)) ? 366 : 365;
                    let _cd: number = Math.ceil(_cy / 10); // decade of first ordinal
                    if (Object.prototype.hasOwnProperty.call(_m, _cd)) {
                        _m[_cd] += _days;
                    } else {
                        _m[_cd] = _days;
                    }
                    _cy++;
                }

                // The final result
                retval = _m;
                break;
            case Scale.LUSTRUM:
                // return { "lustrum-number": days,... }
                _cy = _by === 0 ? 1 : _by;

                // Calculate the total number of days for each lustrum (a period of five years) between two dates, _bd and _ed.
                while (_cy <= _ey) {
                    _days = isLeapYear(new Date(_cy, 0, 1)) ? 366 : 365;
                    _cl = Math.ceil(_cy / 5); // lustrum of first ordinal
                    if (Object.prototype.hasOwnProperty.call(_m, _cl)) {
                        _m[_cl] += _days;
                    } else {
                        _m[_cl] = _days;
                    }
                    _cy++;
                }
                // The final result
                retval = _m;
                break;
            case Scale.YEAR:
                // return { "year": days,... }

                if (_dy > 0) {
                    for (let i = 0; i <= _dy; i++) {
                        // Calculate the current year
                        let currentYear: number = startYear + i;
                        // Create a new Date object _cd for the first day of the year
                        let _cd: Date = new Date(currentYear, 0, 1);
                        // Check if _cd is a leap year and set the value of _m for that year accordingly to 366 or 365
                        _m[`${currentYear}`] = isLeapYear(_cd) ? 366 : 365;
                    }
                } else {
                    // If _dy is not greater than 0, simply check if _bd is a leap year and set the value of _m for the year of _bd accordingly
                    _m[`${startYear}`] = isLeapYear(_bd) ? 366 : 365;
                }
                // The final result
                retval = _m;
                break;
            case Scale.MONTH:
                // return { "year/month": days,... }

                // Function to loop through each month of a year and calculate the last day of the month
                const calculateLastDayOfMonth = (year: number, startMonth: number, endMonth: number) => {
                    for (let i = startMonth; i <= endMonth; i++) {
                        let _cd: Date = new Date(year, i, 1);
                        _m[`${year}/${i + 1}`] = lastDayOfMonth(_cd);
                    }
                }

                if (_dy > 0) {
                    calculateLastDayOfMonth(startYear, _bd.getMonth(), 11);
                    if (_dy > 1) {
                        for (let y = 1; y < _dy; y++) {
                            calculateLastDayOfMonth(startYear + y, 0, 11);
                        }
                    }
                    calculateLastDayOfMonth(endYear, 0, _ed.getMonth());
                } else {
                    calculateLastDayOfMonth(startYear, _bd.getMonth(), _ed.getMonth());
                }

                // The final result
                retval = _m;
                break;
            case Scale.WEEK:
                // return { "year,week": hour,... }

                // Create a new Date object _cd with the same year, month, and day as _bd
                _cd = new Date(_bd.getFullYear(), _bd.getMonth(), _bd.getDate());

                // Create new Date objects _nd and _pd with the same year, month, and day as _cd
                _nd = new Date(_cd);
                _pd = new Date(_cd);

                // Increment the day of _nd by 1 and decrement the day of _pd by 1
                _nd.setDate(_nd.getDate() + 1);
                _pd.setDate(_pd.getDate() - 1);

                // Function to calculate the hours of a day and update _m accordingly
                const calculateHours = (cd: Date, nd: Date) => {
                    let dayKey: string = `${cd.getFullYear()}/${(cd.getMonth() + 1)}/${cd.getDate()}`;
                    let hours: number = (nd.getTime() - cd.getTime()) / (60 * 60 * 1000);

                    _m[dayKey] = hours;
                }

                // Calculate the hours of the first day
                calculateHours(_cd, _nd);

                // Loop through each day from the day after _cd to _ed
                while (_nd.getTime() <= _ed.getTime()) {
                    // Increment the day of _nd and _cd by 1
                    _nd.setDate(_nd.getDate() + 1);
                    _cd.setDate(_cd.getDate() + 1);

                    // Calculate the hours of the day
                    calculateHours(_cd, _nd);
                }

                // The final result
                retval = _m;
                break;
            case Scale.WEEKDAY:
            case Scale.DAY:
                // return { "year/month/day": hours,... }
                // Create a new Date object _cd with the same year, month, and day as _bd
                _cd = new Date(_bd.getFullYear(), _bd.getMonth(), _bd.getDate());

                // Create new Date objects _nd and _pd with the same year, month, and day as _cd
                _nd = new Date(_cd);
                _pd = new Date(_cd);

                // Increment the day of _nd by 1 and decrement the day of _pd by 1
                _nd.setDate(_nd.getDate() + 1);
                _pd.setDate(_pd.getDate() - 1);

                // Function to calculate the hours of a day and update _m accordingly
                const dayCalculateHours = (cd: Date, nd: Date) => {
                    let dateKey: string = `${cd.getFullYear()}/${(cd.getMonth() + 1)}/${cd.getDate()}`;
                    let hours: number = (nd.getTime() - cd.getTime()) / (60 * 60 * 1000);

                    _m[dateKey] = hours;
                }

                // Calculate the hours of the first day
                dayCalculateHours(_cd, _nd);

                // Loop through each day from the day after _cd to _ed
                while (_nd.getTime() <= _ed.getTime()) {
                    // Increment the day of _nd and _cd by 1
                    _nd.setDate(_nd.getDate() + 1);
                    _cd.setDate(_cd.getDate() + 1);

                    // Calculate the hours of the day
                    dayCalculateHours(_cd, _nd);
                }
                // The final result
                retval = _m;
                break;
            case Scale.HOUR:
                // return { "year/month/day hour": minutes,... }                
                // Create a new Date object _cd with the same year, month, day, and hour as _bd
                _cd = new Date(_bd.getFullYear(), _bd.getMonth(), _bd.getDate(), _bd.getHours());

                // Create new Date objects _nd and _pd with the same year, month, day, and hour as _cd
                _nd = new Date(_cd);
                _pd = new Date(_cd);

                // Increment the hour of _nd by 1 and decrement the hour of _pd by 1
                _nd.setHours(_nd.getHours() + 1);
                _pd.setHours(_pd.getHours() - 1);

                // Function to calculate the minutes of an hour and update _m accordingly
                const calculateMinutes = (cd: Date, nd: Date) => {
                    let hourKey: string = `${cd.getFullYear()}/${(cd.getMonth() + 1)}/${cd.getDate()} ${cd.getHours()}`;
                    let minutes: number = (nd.getTime() - cd.getTime()) / (60 * 1000);

                    _m[hourKey] = minutes;
                }

                // Calculate the minutes of the first hour
                calculateMinutes(_cd, _nd);

                // Loop through each hour from the hour after _cd to _ed
                while (_nd.getTime() <= _ed.getTime()) {
                    // Increment the hour of _nd and _cd by 1
                    _nd.setHours(_nd.getHours() + 1);
                    _cd.setHours(_cd.getHours() + 1);

                    // Calculate the minutes of the hour
                    calculateMinutes(_cd, _nd);
                }

                // The final result
                retval = _m;
                break;
            case Scale.MINUTE:
                // return { "year/month/day hour:minute": seconds,... }
                // Create a new Date object _cd with the same year, month, day, hour, and minute as _bd
                _cd = new Date(_bd.getFullYear(), _bd.getMonth(), _bd.getDate(), _bd.getHours(), _bd.getMinutes());

                // Create new Date objects _nd and _pd with the same year, month, day, hour, and minute as _cd
                _nd = new Date(_cd);
                _pd = new Date(_cd);

                // Increment the minute of _nd by 1 and decrement the minute of _pd by 1
                _nd.setMinutes(_nd.getMinutes() + 1);
                _pd.setMinutes(_pd.getMinutes() - 1);

                // Function to calculate the seconds of a minute and update _m accordingly
                const calculateSeconds = (cd: Date, nd: Date) => {
                    let minuteKey: string = `${cd.getFullYear()}/${(cd.getMonth() + 1)}/${cd.getDate()} ${cd.getHours()}:${cd.getMinutes()}`;
                    let seconds: number = (nd.getTime() - cd.getTime()) / 1000;

                    _m[minuteKey] = seconds;
                }

                // Calculate the seconds of the first minute
                calculateSeconds(_cd, _nd);

                // Loop through each minute from the minute after _cd to _ed
                while (_nd.getTime() <= _ed.getTime()) {
                    // Increment the minute of _nd and _cd by 1
                    _nd.setMinutes(_nd.getMinutes() + 1);
                    _cd.setMinutes(_cd.getMinutes() + 1);

                    // Calculate the seconds of the minute
                    calculateSeconds(_cd, _nd);
                }

                // The final result
                retval = _m;
                break;
            case Scale.SECOND:
                // return { "year/month/day hour:minute:second": milliseconds,... }               
                // Create a new Date object _cd with the same year, month, day, hour, minute, and second as _bd
                _cd = new Date(_bd.getFullYear(), _bd.getMonth(), _bd.getDate(), _bd.getHours(), _bd.getMinutes(), _bd.getSeconds());

                // Create new Date objects _nd and _pd with the same year, month, day, hour, minute, and second as _cd
                _nd = new Date(_cd);
                _pd = new Date(_cd);

                // Increment the second of _nd by 1 and decrement the second of _pd by 1
                _nd.setSeconds(_nd.getSeconds() + 1);
                _pd.setSeconds(_pd.getSeconds() - 1);

                // Function to calculate the milliseconds of a second and update _m accordingly
                const calculateMilliseconds = (cd: Date, nd: Date) => {
                    let secondKey: string = `${cd.getFullYear()}/${(cd.getMonth() + 1)}/${cd.getDate()} ${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`;
                    let milliseconds: number = nd.getTime() - cd.getTime();

                    _m[secondKey] = milliseconds;
                }

                // Calculate the milliseconds of the first second
                calculateMilliseconds(_cd, _nd);

                // Loop through each second from the second after _cd to _ed
                while (_nd.getTime() <= _ed.getTime()) {
                    // Increment the second of _nd and _cd by 1
                    _nd.setSeconds(_nd.getSeconds() + 1);
                    _cd.setSeconds(_cd.getSeconds() + 1);

                    // Calculate the milliseconds of the second
                    calculateMilliseconds(_cd, _nd);
                }

                // The final result
                retval = _m;
                break;
            default:
                // return number of milliseconds
                retval = diffMS
                break;
        }

        return retval;
    }

    /**
     * Load all enabled events markupped on target element to the timeline object.
     * Firstly load default events bound to plugin config.
     * @private
     */
    private loadEvent(): void {
        this.debug('loadEvent');

        const element: HTMLElement = this.element;
        const config: Config = this.config;
        let _default_events = config.eventData;
        let _event_list = element.querySelectorAll(Selector.DEFAULT_EVENTS);
        let _cnt = _default_events.length;
        let events: EventParams[] = [];
        let lastEventId = 0;

        _event_list.forEach((child) => {
            let _attr = child.getAttribute('data-timeline-node');

            if (typeof _attr !== 'undefined') {
                _cnt++;
            }
        });

        if (_cnt === 0) {
            this.error('Enable event does not exist.', 'warn');
        }

        // Register Event Data
        if (_default_events.length > 0) {
            _default_events.forEach((_eventInputData: EventParams) => {
                let _event: EventParams = {};

                if (!Timeline.isEmpty(_eventInputData)) {
                    _event = this.registerEventData(document.createElement('div'), _eventInputData);
                    events.push(_event);
                    lastEventId = Math.max(lastEventId, parseInt(_event.eventId.toString(), 10));
                }
            });
        }

        Array.from(_event_list).forEach((element: HTMLElement) => {
            let _evt_params: Partial<EventParams> = this.getPluggableParams(element.getAttribute('data-timeline-node'));
            let _event: EventParams = {};

            if (!Timeline.isEmpty(_evt_params)) {
                _event = this.registerEventData(element, _evt_params);
                events.push(_event);
                lastEventId = Math.max(lastEventId, parseInt(_event.eventId.toString(), 10));
            }
        });

        // Set event id with auto increment
        let cacheIds: number[] = []; // for checking duplication of id
        events.forEach((_evt: EventParams, _i: number, _this: EventParams[]) => {
            let _chkId = parseInt(_this[_i].eventId.toString(), 10);

            if (_chkId === 0 || cacheIds.includes(_chkId)) {
                lastEventId++;
                _this[_i].eventId = lastEventId;
            } else {
                _this[_i].eventId = _chkId;
            }
            cacheIds.push(_this[_i].eventId);
        });

        // Hook to event colors
        events.forEach((_evt: EventParams, _i: number, _this: EventParams[]) => {
            if (typeof config.colorScheme?.event === 'object') {
                this.overwriteDefaultColors(config, _evt, _this, _i);
            }
            if (typeof config.colorScheme?.hookEventColors === 'function') {
                this.overwriteCurrentColors(config, _evt, _this, _i);
            }
        });

        this.isCached = this.saveToCache(events);
    }

    /**
     * Overwrite default colors.
     * @private
     */
    private overwriteDefaultColors(config: any, _evt: any, _this: any, _i: number): void {
        // Firstly overwrite default colors
        if (config.colorScheme.event?.text && Default.colorScheme.event.text !== config.colorScheme.event.text && _evt.color === Default.colorScheme.event.text) {
            _this[_i].color = config.colorScheme.event.text;
        }
        if (config.colorScheme.event?.background && Default.colorScheme.event.background !== config.colorScheme.event.background && _evt.bgColor === Default.colorScheme.event.background) {
            _this[_i].bgColor = config.colorScheme.event.background;
        }
        if (config.colorScheme.event?.border && Default.colorScheme.event.border !== config.colorScheme.event.border && _evt.bdColor === Default.colorScheme.event.border) {
            _this[_i].bdColor = config.colorScheme.event.border;
        }
    }

    /**
     * Overwrite current colors.
     * @private
     */
    private overwriteCurrentColors(config: any, _evt: any, _this: any, _i: number): void {
        // Lastly, overwrite current colors
        let _new_colors = config.colorScheme.hookEventColors(_evt, { text: _this[_i].color, border: _this[_i].bdColor, background: _this[_i].bgColor }) || undefined;

        if (typeof _new_colors === 'object') {
            if (_new_colors?.text && _evt.color !== _new_colors.text) {
                _this[_i].color = _new_colors.text;
            }
            if (_new_colors?.background && _evt.bgColor !== _new_colors.background) {
                _this[_i].bgColor = _new_colors.background;
            }
            if (_new_colors?.border && _evt.bdColor !== _new_colors.border) {
                _this[_i].bdColor = _new_colors.border;
            }
        }
    }

    /**
     * Register one event data as an object.
     * 
     * Function creates a new event object based on the provided event element and parameters. 
     * It first creates a base event object with some default properties and then modifies this object based on the provided parameters.
     * @param {HTMLElement}event_element - The event element.
     * @param {EventParams} params - The parameters for the event.
     * @returns {EventParams} The new event object.
     */
    private registerEventData(event_element: HTMLElement, params: EventParams): EventParams {
        let config: Config = this.config;
        let instance: Instance = this.instanceProps;
        let new_event = {
            ...EventParams,
            ...{
                uid: Timeline.generateUniqueID(),
                label: event_element.innerHTML
            }
        };
        let _coordinates: Coordinates = { x: 0, y: 0 };
        let _x: number = 0, _w: number = 0, _row: number = 0, _c: number = 0;

        if (params?.start && !Timeline.isEmpty(params.start)) {
            // Calculate x coordinate for given start datetime
            _x = this.getCoordinateX(params.start);
            new_event.x = Timeline.numRound(_x, 2);

            if (params?.end && !Timeline.isEmpty(params.end)) {
                // Calculate x coordinate and events width for given end datetime
                _x = this.getCoordinateX(params.end);
                _w = _x - new_event.x;
                new_event.width = Timeline.numRound(_w, 2);

                if (config.eventMeta.display) {
                    if (Timeline.isEmpty(config.eventMeta.content) && !params?.rangeMeta) {
                        new_event.rangeMeta += this.getLocaleString(params.start.toString(), config.eventMeta.scale, config.eventMeta.locale, config.eventMeta.format);
                        new_event.rangeMeta += ` - ${this.getLocaleString(params.end.toString(), config.eventMeta.scale, config.eventMeta.locale, config.eventMeta.format)}`;
                    } else {
                        new_event.rangeMeta = config.eventMeta.content;
                    }
                }
            } else {
                new_event.width = 0;
            }

            // Attach the event to the category row if it's defined. If not, attach it to the defined row. 
            // If neither is defined, attach it to the first row
            const row: Row = config.rows?.find(row => row.id == params?.category);
            if (params.category) {
                if (row) {
                    _row = row.position ?? config.rows?.findIndex(row => row.id == params.category) + 1;
                } else {
                    // todo: define a global default option (static row or flex variable) for uncategorized event items instead of static '1'.
                    _row = params.row ? parseInt(params.row.toString(), 10) : 1;
                }
            }

            _c = Math.floor(_row / 2);

            // Get all parallel events (incl. current event) ordered by start
            let parallelEvents: EventParams[] = [];
            if (params?.uid) {
                let cachedEvents: EventParams[] = this.loadToCache();
                parallelEvents = this.getAllParallelEvents(
                    cachedEvents,
                    params
                );
            } else {
                parallelEvents = this.getAllParallelEvents(
                    this.config.eventData,//cachedEvents,
                    params
                );
            }

            // Retrieve the position of the current event in parallelEvents, default to 0 if not found.
            let parallelEventsPosition: number = 0;
            if (params?.uid) {
                if (!this.config.separateParallelEvents) {
                    parallelEventsPosition = Math.max(0, row.categoryEventsPerRows.findIndex(sublist => sublist.some(event => event.uid === params.uid)));
                } else {
                    parallelEventsPosition = Math.max(0, parallelEvents.findIndex(x => x.uid === params.uid));
                }
            } else {
                if (!this.config.separateParallelEvents) {
                    parallelEventsPosition = Math.max(0, row.categoryEventsPerRows.findIndex(sublist => sublist.some(event => event === params)));
                } else {
                    parallelEventsPosition = Math.max(0, parallelEvents.indexOf(params));
                }
            }

            // Parallel event handling
            switch (config.parallelEventsOption) {
                case ParallelEventsOption.SPLITROW:
                    // Define the number of total rows
                    let numberOfTotalRows = 1;
                    if (!this.config.separateParallelEvents) {
                        numberOfTotalRows = row.categoryEventsPerRows.length;
                    } else {
                        numberOfTotalRows = parallelEvents.length;
                    }

                    // Split height of event
                    const parallelEventsHeight = config.rowHeight / numberOfTotalRows;

                    // Set vertical position and events height
                    new_event.y = (_row - 1) * config.rowHeight + parallelEventsHeight * parallelEventsPosition + new_event.margin + _c;
                    new_event.height = (config.rowHeight - (config.marginHeight * 2)) / numberOfTotalRows;

                    break;
                case ParallelEventsOption.MULTIROW:
                    // Calculate the height of previous rows
                    let totalPrevRowHeight: number = 0;
                    let multirows: number = 0;
                    for (let i = _row - 2; i >= 0; i--) {
                        multirows = config.rows[i].maxParallelEvents == 0 ? 1 : config.rows[i].maxParallelEvents + 1;
                        totalPrevRowHeight += multirows * (config.rowHeight);
                    }

                    // Set vertical position and events height
                    new_event.y = totalPrevRowHeight + parallelEventsPosition * config.rowHeight + new_event.margin + Math.floor(totalPrevRowHeight / config.rowHeight) + parallelEventsPosition;
                    new_event.height = config.rowHeight - (config.marginHeight * 2);
                    break;
                case ParallelEventsOption.OVERLAY:
                default:
                    // Set vertical position and events height
                    new_event.y = (_row - 1) * config.rowHeight + new_event.margin + _c;
                    new_event.height = config.rowHeight - (config.marginHeight * 2);
                    break;
            }

            Object.keys(new_event).forEach((_prop) => {
                switch (true) {
                    case /^eventId$/i.test(_prop):
                        if (Object.hasOwnProperty.call(params, 'id')) {
                            new_event.eventId = parseInt(params['id'].toString(), 10);
                        } else {
                            new_event.eventId = parseInt(params[_prop], 10) || 0;
                        }
                        break;
                    case /^(label|content)$/i.test(_prop):
                        if (Object.hasOwnProperty.call(params, _prop) && !Timeline.isEmpty(params[_prop])) {
                            new_event[_prop] = params[_prop];
                        }
                        // Override the children element to label or content setting
                        if (event_element.querySelector(`.event-${_prop}`)) {
                            new_event[_prop] = event_element.querySelector(`.event-${_prop}`).innerHTML;
                        }
                        break;
                    case /^relation$/i.test(_prop):
                        // For drawing the relation line
                        if (config.type === Type.MIXED || config.type === Type.POINT) {
                            _coordinates.x = Timeline.numRound(new_event.x, 2);
                            _coordinates.y = Timeline.numRound((instance.rowSize * ((params.row || 1) - 1)) + (instance.rowSize / 2), 2) + (((params.row || 1) - 1) * 0.5);

                            new_event[_prop] = {
                                ...params[_prop],
                                ..._coordinates
                            };
                        }
                        break;
                    default:
                        if (params?.[_prop] && !Timeline.isEmpty(params[_prop])) {
                            new_event[_prop] = params[_prop];
                        }
                        break;
                }
            });
        }

        return new_event;
    }

    // ===============================
    // Getters
    // ===============================

    /**
     * Gets the version
     */
    static get VERSION(): string {
        return VERSION;
    }

    /**
     * Gets the default configuration
     */
    static get DEFAULT(): Config {
        return Default;
    }

    /**
     * Gets the configuration
     * @private
     * @param config - The configuration object
     */
    private getConfig(config: Partial<Config | any>): Config {
        if (config.startDatetime instanceof Date) {
            config.startDatetime = config.startDatetime.toString();
        }
        if (config.endDatetime instanceof Date) {
            config.endDatetime = config.endDatetime.toString();
        }

        return Timeline.mergeDeep(Default, config);
    }

    // ===============================
    // Event functions
    // ===============================

    /**
     * @private: Event when initialized
     */
    private handleInitializedEvent(event: Event): void {

    }

    /**
     * This function handles the zooming of a timeline scale. It takes an event as an argument, 
     * which is expected to be a user interaction such as a click or a scroll. 
     * The function then determines the current scale of the timeline and calculates the new scale 
     * to zoom to, as well as the start and end dates for this new scale. 
     * It uses a predefined mapping of scales to their lower scales and minimum grid sizes.
     * 
     * @param event - The user interaction event that triggered the zoom.
     */
    public zoomScale(event: Event) {
        this.debug('zoomScale')

        const _elem = event.target as HTMLElement;
        const ruler_item = _elem.dataset.rulerItem;

        const scaleMap: ScaleMap = {
            millennium: { years: 1000, lower: Scale.CENTURY, minGrids: 10 },
            century: { years: 100, lower: Scale.DECADE, minGrids: 10 },
            decade: { years: 10, lower: Scale.DECADE, minGrids: 2 },
            lustrum: { years: 5, lower: Scale.YEAR, minGrids: 5 },
            year: { years: 1, lower: Scale.MONTH, minGrids: 12 },
            month: { lower: Scale.DAY, minGrids: 28 },
            week: { lower: Scale.DAY, minGrids: 7 },
            day: { lower: Scale.HOUR, minGrids: 24 },
            weekday: { lower: Scale.HOUR, minGrids: 24 },
            hour: { lower: Scale.MINUTE, minGrids: 60 },
            minute: { lower: Scale.SECOND, minGrids: 60 },
            second: { lower: null, minGrids: 60 },
            millisecond: { lower: null, minGrids: 1000 }
        };

        const getZoomScale = (ruler_item: string): [Scale, string, string, number] => {
            let splitItem: string[] = ruler_item?.split('-');
            let scale: Scale = splitItem[0] as Scale;
            let date_seed: any = splitItem[1];
            let min_grids: number = scaleMap[scale].minGrids,
                begin_date: string, end_date: string, base_year: string, week_num: string;

            switch (scale) {
                case Scale.MILLENNIUM:
                case Scale.CENTURY:
                case Scale.DECADE:
                case Scale.LUSTRUM:
                    begin_date = `${((date_seed - 1) * scaleMap[scale].years) + 1}/1/1 0:00:00`;
                    end_date = new Date(this.modifyDate(begin_date, scaleMap[scale].years, Scale.YEAR).getTime() - 1).toString();
                    break;
                case Scale.YEAR:
                    begin_date = `${date_seed}/1/1 0:00:00`;
                    end_date = new Date(this.modifyDate(begin_date, scaleMap[scale].years, Scale.YEAR).getTime() - 1).toString();
                    break;
                case Scale.MONTH:
                    begin_date = this.getCorrectDatetime(date_seed).toString();
                    end_date = new Date(this.modifyDate(begin_date, 1, Scale.MONTH).getTime() - 1).toString();
                    break;
                case Scale.WEEK:
                    let splitItem: string[] = date_seed.split(',');
                    let base_year: number = Number(splitItem[1]);
                    let week_num: number = Number(splitItem[1]);
                    begin_date = this.getFirstDayOfWeek(week_num, base_year).toString();
                    end_date = new Date(this.modifyDate(begin_date, 7, Scale.DAY).getTime() - 1).toString();
                    break;
                case Scale.DAY:
                case Scale.WEEKDAY:
                    date_seed = scale === Scale.WEEKDAY ? date_seed.substring(0, date_seed.indexOf(',')) : date_seed;
                    begin_date = this.getCorrectDatetime(date_seed).toString();
                    end_date = new Date(this.modifyDate(begin_date, 1, Scale.DAY).getTime() - 1).toString();
                    break;
                case Scale.HOUR:
                case Scale.MINUTE:
                case Scale.SECOND:
                case Scale.MILLISECOND:
                default:
                    begin_date = this.getCorrectDatetime(date_seed).toString();
                    end_date = new Date(this.modifyDate(begin_date, 1, scale).getTime() - 1).toString();
                    break;
            }

            scale = Object.hasOwnProperty.call(scaleMap, scale) ? scaleMap[scale].lower : scale;
            return [scale, begin_date, end_date, min_grids];
        };

        const [to_scale, begin_date, end_date, min_grids] = getZoomScale(ruler_item);
        const zoom_options: any = {
            startDatetime: begin_date,
            endDatetime: end_date,
            scale: to_scale,
        };

        if (Timeline.isEmpty(zoom_options.scale)) {
            return;
        }

        // Check if wrapScale is set in the configuration
        if (this.config.wrapScale) {
            // Get the width of the timeline container and sidebar
            let timelineContainer = <HTMLElement>document.querySelector(Selector.TIMELINE_CONTAINER);
            let timelineSidebar = <HTMLElement>document.querySelector(Selector.TIMELINE_SIDEBAR);

            // Calculate the wrap value
            let _wrap: number = Math.ceil((timelineContainer.offsetWidth - timelineSidebar.offsetWidth) / min_grids);
            let _originMinGridSize: number;

            // Check if originMinGridSize is not already set in the configuration
            if (!(this.config?.originMinGridSize)) {
                // Keep an original minGridSize as cache
                this.config.originMinGridSize = this.config.minGridSize;
            }

            _originMinGridSize = this.config.originMinGridSize;

            // Set the minGridSize of zoom_options to the maximum of _wrap and _originMinGridSize
            zoom_options.minGridSize = Math.max(_wrap, _originMinGridSize);
        }

        // Call the reload function with zoom_options as the argument
        this.reload([zoom_options]);
    }

    /**
     * 
     * @param event 
     */
    private moveEventStart(event: DragEvent) {
        console.log('drag@Event');

        // Get the relative position of the click point on the event object and the events object left border
        let relativePositionX = event.clientX - (event.target as HTMLElement).getBoundingClientRect().left;

        // Get the event
        const self: HTMLElement = event.target as HTMLElement;

        // Add dragging class to event
        self.classList.add("dragging");
        this.element.classList.add("event-dragging");

        // Get the events parent TIMELINE_CONTAINER
        const findAncestorMatchingSelector = (childElement, selector) => {
            const parent = childElement.parentElement;
            if (parent) {
                if (parent.matches(selector)) {
                    return parent;
                } else {
                    return findAncestorMatchingSelector(parent, selector);
                }
            }
            return null;
        }
        const timelineContainer: HTMLElement = findAncestorMatchingSelector(self, Selector.TIMELINE_CONTAINER);

        event.dataTransfer.effectAllowed = 'move';

        let instance = this.instanceProps;
        instance.drag = {
            startPosition: { x: self.offsetLeft - relativePositionX, y: self.offsetTop },
            lastPosition: { x: self.offsetLeft - relativePositionX, y: self.offsetTop },
            isDragged: true
        }
    }

    /**
     * 
     * @param event 
     */
    private moveEvent(event: DragEvent) {
        if (!this.instanceProps?.drag?.isDragged) {
            return;
        }
        console.log('dragging@Event');

        // Get the event
        const self: HTMLElement = event.target as HTMLElement;
        let instance: Instance = this.instanceProps;
        if (instance.drag.startPosition && instance.drag.lastPosition) {
            const dx = event.clientX - instance.drag.lastPosition.x;
            const dy = event.clientY - instance.drag.lastPosition.y;

            // Accumulate distance
            //console.log(`Moved: ${dx}px horizontally, ${dy}px vertically`);

            // Update last position
            instance.drag.lastPosition = { x: event.clientX, y: event.clientY };
        }
    }

    /**
     * 
     * @param event 
     */
    private moveEventEnd(event: DragEvent) {
        console.log('dropping@Event');
        let instance: Instance = this.instanceProps;

        if (instance.drag.startPosition && instance.drag.lastPosition) {
            // Calculate the final position of element
            let finalX = instance.drag.startPosition.x + (event.offsetX);
            let finalY = instance.drag.startPosition.y + (event.offsetY);

            // Get the event
            const self: HTMLElement = event.target as HTMLElement;

            // Remove dragging class from event
            self.classList.remove("dragging");
            this.element.classList.remove("event-dragging");

            // Get the date by new dropped x-coordinate and round to scale
            let date: Date = this.getDateFromCoordinateX(finalX);
            date = Timeline.roundDate(date, RoundScale.TENMINUTES);

            // Get the y-coordinate round to grid
            let gridPosY = Timeline.roundToGrid(finalY - (this.config.rowHeight / 2), this.config.rowHeight);
            gridPosY = gridPosY + Math.floor(gridPosY / this.config.rowHeight) + this.config.marginHeight;
            finalY = gridPosY;

            // Get scaled 
            finalX = this.getCoordinateX(date.getTime());

            // Set the element's final position
            self.style.left = `${finalX}px`;
            self.style.top = `${finalY}px`;

            // Update event object in cache
            const _event: EventParams = this.getEventParamsFromEvent(event)
            if (_event) {
                const duration: number = _event.end - _event.start;
                //_event.x = finalX;
                _event.start = date.getTime();
                _event.end = _event.start + duration;

                const category = this.config.rows[this.getRowFromCoordinateY(finalY)];
                _event.category = category.id;

                //_event.y = finalY;

                this.updateInCache(_event.uid, _event);
                this.config.reloadCacheKeep = true;

                var eventData: EventParams[] = this.loadToCache();
                this.config.eventData = eventData;
                var newConfig: any = {
                    eventData: eventData
                }

                //this.placeEvent();
                this.reload([newConfig]);
            }
        }

        // Reset positions after setting
        this.instanceProps.drag = {
            startPosition: null,
            lastPosition: null,
            isDragged: false
        }
    }

    /**
     * @private: Event when touchstart or mousedown on the timeline container
     */
    private swipeStart(event: TouchEvent | MouseEvent) {
        console.log('swipeStart@Event');
        event.preventDefault();
        let instance = this.instanceProps;

        instance.scroll = {
            absX: IS_TOUCH ? (event as TouchEvent).changedTouches[0].pageX : (event as MouseEvent).pageX,
            moveX: (event.currentTarget as HTMLElement).parentElement.querySelector(Selector.TIMELINE_CONTAINER).scrollLeft * -1
        }
        this.instanceProps.scroll.isTouched = true;
    }

    /**
     * @private: Event when touchmove or mousemove in the timeline container
     */
    private swipeMove(event: TouchEvent | MouseEvent) {
        if (!this.instanceProps?.scroll?.isTouched) {
            return;
        }
        console.log('swipeMove@Event');
        event.preventDefault();
        let instance = this.instanceProps;

        instance.scroll.moveX -= instance.scroll.absX - (IS_TOUCH ? (event as TouchEvent).changedTouches[0].pageX : (event as MouseEvent).pageX);
        (event.currentTarget as HTMLElement).parentElement.querySelector(Selector.TIMELINE_CONTAINER).scrollLeft = instance.scroll.moveX * -1;
        instance.scroll.absX = IS_TOUCH ? (event as TouchEvent).changedTouches[0].pageX : (event as MouseEvent).pageX;
    }

    /**
     * @private: Event when touchend or mouseup from the timeline container
     */
    private swipeEnd() {
        if (!this.instanceProps?.scroll?.isTouched) {
            return;
        }
        console.log('swipeEnd@Event');
        this.instanceProps.scroll.isTouched = false;
    }

    /**
    * @private: Event when focus or blur
    */
    private activeEvent(event: Event): void {
        this.debug('_activeEvent@Event');
        let element = event.target as HTMLElement;

        if ('focusin' === event.type) {
            const timelineEventNodes = document.querySelectorAll(Selector.TIMELINE_EVENT_NODE);
            timelineEventNodes.forEach(node => node.classList.remove('active'));
            element.classList.add('active');
        } else if ('focusout' === event.type) {
            element.classList.remove('active');
        }
    }

    /**
     * @private: Event triggered by clicking on event
     */
    private getEventParamsFromEvent(event: Event): EventParams | null {
        // Get the target of the event
        const self: HTMLElement = event.target as HTMLElement;

        // Get the uid from the data-uid attribute
        const uid: string = self.dataset.uid;

        // Load events from cache
        const cacheEvents: EventParams[] = this.loadToCache();

        // Find the event with the matching uid
        const eventData: EventParams | undefined = cacheEvents.find((event: any) => event.uid === uid);

        // If the event data is found, return it. Otherwise, return null.
        return eventData ? eventData : null;
    }

    // ===============================
    // Visualization
    // 
    // ===============================

    /**
     * @private: Render the view of timeline container
     */
    private renderView(): void {
        this.debug('renderView');

        let _elem: HTMLElement = this.element,
            config: Config = this.config,
            instance: any = this.instanceProps,
            _tl_container: HTMLElement = document.createElement('div'),
            _tl_main: HTMLElement = document.createElement('div'),
            _tl_parent: HTMLElement = _elem.parentElement;

        _tl_container.className = ClassName.TIMELINE_CONTAINER;
        _tl_main.className = ClassName.TIMELINE_MAIN;

        if (!_elem) {
            throw new TypeError('Does not exist the element to render a timeline container.');
        }

        this.debug(`Timeline:{ fullWidth: ${instance.fullwidth}px, fullHeight: ${instance.fullheight}px, viewWidth: ${instance.visibleWidth}, viewHeight: ${instance.visibleHeight} }`);

        _elem.style.position = 'relative'; // initialize; not .empty()
        if (config.hideScrollbar) {
            _tl_container.classList.add(ClassName.HIDE_SCROLLBAR); // .tstl-hide-scrollbar
        }

        // Create the timeline headline
        _elem.prepend(this.createHeadline());

        // Create the timeline event container
        _tl_main.append(this.createEventContainer());

        // Create the timeline ruler
        if (config.ruler?.top?.lines && !Timeline.isEmpty(config.ruler.top.lines)) {
            _tl_main.prepend(this.createRuler('top'));
        }
        if (config.ruler?.bottom?.lines && !Timeline.isEmpty(config.ruler.bottom.lines)) {
            _tl_main.append(this.createRuler('bottom'));
        }

        // Create the timeline side index
        let margin = {
            top: parseInt((<HTMLElement>_tl_main.querySelector(Selector.RULER_TOP))?.style?.height.toString(), 10),
            bottom: parseInt((<HTMLElement>_tl_main.querySelector(Selector.RULER_BOTTOM))?.style?.height.toString(), 10)
        };

        if (config.rows.length > 0) {
            _tl_container.prepend(this.createSideIndex(margin));
        }

        // Append the timeline container in the timeline element
        _tl_container.append(_tl_main);
        _elem.append(_tl_container);

        // Create the timeline footer
        _elem.append(this.createFooter());

        // Optimize the parent element of the timeline
        if (Timeline.isEmpty(_elem.getAttribute('data-resized'))) {
            if (_elem.scrollWidth > _tl_parent.clientWidth + 2) {
                _tl_container.style.width = `${_tl_parent.clientWidth - 2}px`;
                _tl_container.style.height = `${instance.visibleHeight}px`;
                _tl_parent.style.maxWidth = '100vw';
                _tl_parent.style.overflowX = 'hidden';
            } else {
                _tl_container.style.width = `${instance.visibleWidth}px`;
                _tl_container.style.height = `${instance.visibleHeight}px`;
            }
            _elem.setAttribute('data-resized', 'true');
        }

        // Apply the theme color scheme
        this.applyThemeStyle();

        this.isShown = true;
    }

    /**
     * @private: Create the headline of the timeline
     */
    private createHeadline(): HTMLElement {
        let config: Config = this.config,
            instance: Instance = this.instanceProps,
            _display = Timeline.supplement(Default.headline.display, config.headline.display, Timeline.validateBoolean),
            _title = Timeline.supplement(null, config.headline.title),
            _range = Timeline.supplement(Default.headline.range, config.headline.range, Timeline.validateBoolean),
            _locale = Timeline.supplement(Default.headline.locale, config.headline.locale),
            _format = Timeline.supplement(Default.headline.format, config.headline.format),
            _begin = Timeline.supplement(null, instance.begin),
            _end = Timeline.supplement(null, instance.end),
            _scale: Scale = config.scale,
            _tl_headline = document.createElement('div'),
            _wrapper = document.createElement('div');

        _tl_headline.className = ClassName.TIMELINE_HEADLINE; // .tstl-headline
        _wrapper.className = ClassName.TIMELINE_HEADLINE_WRAPPER; // .tstl-headline-wrapper

        // If title exists, append it to the wrapper
        if (_title) {
            let titleElement = document.createElement('h3');
            titleElement.className = ClassName.HEADLINE_TITLE; // .tstl-timeline-title
            titleElement.textContent = config.headline.title;
            _wrapper.append(titleElement);
        }

        // If range exists and begin and end are defined, append it to the wrapper
        if (_range && _begin && _end) {
            if (_format?.[Scale.CUSTOM]) {
                _scale = Scale.CUSTOM;
            }
            let meta = `${this.getLocaleString(_begin, _scale, _locale, _format)}<span class="${ClassName.RANGE_SPAN}"></span>${this.getLocaleString(_end, _scale, _locale, _format)}`;
            let metaElement = document.createElement('div');
            metaElement.className = ClassName.RANGE_META; // .tstl-range-meta
            metaElement.innerHTML = meta;
            _wrapper.append(metaElement);
        }

        // If display is false, add hide class to the headline
        if (!_display) {
            _tl_headline.classList.add(ClassName.HIDE); // .tstl-hide
        }

        _tl_headline.append(_wrapper);
        return _tl_headline;
    }

    /**
     * @private: Create the footer of the timeline
     */
    private createFooter(): HTMLElement {
        const opts: Config = this.config;
        const props: Instance = this.instanceProps;
        const display: boolean = Timeline.supplement(Default.footer.display, opts.footer.display);
        const content: string = Timeline.supplement(null, opts.footer.content);
        const range: boolean = Timeline.supplement(Default.footer.range, opts.footer.range);
        const locale: string = Timeline.supplement(Default.footer.locale, opts.footer.locale);
        const format = Timeline.supplement(Default.footer.format, opts.footer.format);
        const begin = Timeline.supplement(null, props.begin);
        const end = Timeline.supplement(null, props.end);
        let scale: Scale = opts.scale;

        const tlFooter = document.createElement('div');
        tlFooter.className = ClassName.TIMELINE_FOOTER;

        if (range) {
            if (begin && end) {
                if (format?.[Scale.CUSTOM]) {
                    scale = Scale.CUSTOM;
                }
                const meta = `${this.getLocaleString(begin, scale, locale, format)}<span class="${ClassName.RANGE_SPAN}"></span>${this.getLocaleString(end, scale, locale, format)}`;

                const rangeMetaDiv = document.createElement('div');
                rangeMetaDiv.className = `${ClassName.RANGE_META} ${ClassName.ALIGN_SELF_RIGHT}`;
                rangeMetaDiv.innerHTML = meta;
                tlFooter.appendChild(rangeMetaDiv);
            }
        }
        if (content) {
            const contentDiv = document.createElement('div');
            contentDiv.className = ClassName.TIMELINE_FOOTER_CONTENT;
            contentDiv.textContent = content;
            tlFooter.appendChild(contentDiv);
        }
        if (!display) {
            tlFooter.classList.add(ClassName.HIDE);
        }

        return tlFooter;
    }

    /**
     * @private: Create the ruler of the timeline
     */
    private createRuler(position: string): HTMLElement {
        let config: Config = this.config,
            instance: Instance = this.instanceProps,
            ruler_line = Timeline.supplement([config.scale], config.ruler[position].lines, (def, val) => {
                if (Array.isArray(val) && val.length > 0) {
                    if (config.ruler?.truncateLowers) {
                        let _ignore_scales = this.findScale(config.scale, 'lower all'),
                            _filter_scales = val.filter((scl: Scale) => !_ignore_scales.includes(scl));
                        val = _filter_scales;
                    }
                    return val;
                } else {
                    return def;
                }
            }),
            line_height = Timeline.supplement<number>(Default.ruler.top.height, config.ruler[position].height),
            font_size = Timeline.supplement<number>(Default.ruler.top.fontSize, config.ruler[position].fontSize),
            text_color = Timeline.supplement<string>(Default.ruler.top.color, config.ruler[position].color),
            background = Timeline.supplement<string>(Default.ruler.top.background, config.ruler[position].background),
            locale = Timeline.supplement<string>(Default.ruler.top.locale, config.ruler[position].locale),
            format = Timeline.supplement(Default.ruler.top.format, config.ruler[position].format),
            rulerconfig = { lines: ruler_line, height: line_height, fontSize: font_size, color: text_color, background, locale, format },
            _fullwidth = instance.fullwidth - 1,
            _fullheight = ruler_line.length * line_height,
            _ruler = document.createElement('div'),
            _ruler_bg = document.createElement('canvas'),
            _ruler_body = document.createElement('div'),
            _finalLines = 0;

        _ruler.className = `${PREFIX}ruler-${position}`;
        _ruler.style.height = `${_fullheight}px`;
        _ruler_bg.className = `${PREFIX}ruler-bg-${position}`;
        _ruler_bg.width = _fullwidth;
        _ruler_bg.height = _fullheight;
        _ruler_body.className = `${PREFIX}ruler-content-${position}`;

        let ctx_ruler = _ruler_bg.getContext('2d');

        // Override ruler options for applying theme; added since v2.1.0
        if ('inherit' === rulerconfig.color) {
            rulerconfig.color = config.colorScheme.theme.subtext;
        }
        if ('inherit' === rulerconfig.background) {
            rulerconfig.background = config.colorScheme.theme.background;
        }

        // Draw background of ruler
        ctx_ruler.fillStyle = rulerconfig.background;
        ctx_ruler.fillRect(0, 0, ctx_ruler.canvas.width, ctx_ruler.canvas.height);

        // Draw stroke of ruler
        ctx_ruler.strokeStyle = Timeline.hexToRgbA(config.colorScheme.theme.gridbase, 0.1); // 'rgba( 51, 51, 51, 0.1 )'
        ctx_ruler.lineWidth = 1;
        ctx_ruler.filter = 'url(#crisp)';

        ruler_line.some((line_scale: Scale, idx: number) => {
            if (line_scale === Scale.QUARTER_HOUR || line_scale === Scale.HALF_HOUR) {
                return true; // break
            }

            ctx_ruler.beginPath();

            // Draw rows
            let _line_y: number = position === 'top' ? line_height * (idx + 1) - 0.5 : line_height * idx + 0.5;

            ctx_ruler.moveTo(0, _line_y);
            ctx_ruler.lineTo(ctx_ruler.canvas.width, _line_y);

            // Draw cols
            let _line_grids = null,
                _grid_x = 0,
                _correction = -0.5;

            // For scales where the value of quantity per unit is variable length
            _line_grids = this.filterVariableScale(line_scale);

            for (let _key of Object.keys(_line_grids)) {
                _grid_x += Timeline.numRound(_line_grids[_key], 2);

                ctx_ruler.moveTo(_grid_x + _correction, position === 'top' ? _line_y - line_height : _line_y);
                ctx_ruler.lineTo(_grid_x + _correction, position === 'top' ? _line_y : _line_y + line_height);
            }
            ctx_ruler.closePath();
            ctx_ruler.stroke();
            _ruler_body.append(this.createRulerContent(_line_grids, line_scale, rulerconfig));
            _finalLines++;
        });

        if (ruler_line.length != _finalLines) {
            _ruler.style.height = `${_finalLines * line_height}px`;
        }

        _ruler.append(_ruler_bg);
        _ruler.append(_ruler_body);
        return _ruler;
    }

    /**
     * @private: Create the content of ruler of the timeline
     */
    private createRulerContent(_line_grids: any, line_scale: Scale, ruler: any): HTMLElement {
        let line_height: number = Timeline.supplement(Default.ruler.top.height, ruler.height),
            font_size: number = Timeline.supplement(Default.ruler.top.fontSize, ruler.fontSize),
            text_color: string = Timeline.supplement(Default.ruler.top.color, ruler.color),
            locale: string = Timeline.supplement<string>(Default.ruler.top.locale, ruler.locale, Timeline.validateString),
            format = Timeline.supplement(Default.ruler.top.format, ruler.format, Timeline.validateObject),
            _ruler_lines: HTMLDivElement = document.createElement('div');

        _ruler_lines.className = ClassName.TIMELINE_RULER_LINES;
        _ruler_lines.style.cssText = `width:100%; height:${line_height}px;`;

        for (let _key of Object.keys(_line_grids)) {
            let _item_width = _line_grids[_key],
                _line = document.createElement('div'),
                _ruler_string = this.getLocaleString(_key, line_scale, locale, format),
                _data_ruler_item = '';

            _data_ruler_item = `${line_scale}-${(_data_ruler_item === '' ? String(_key) : _data_ruler_item)}`;
            _line.setAttribute('data-ruler-item', _data_ruler_item);
            _line.innerHTML = `<span>${_ruler_string}</span>`;
            _line.className = ClassName.TIMELINE_RULER_ITEM;
            _line.style.cssText = `width:${_item_width}px; height:${line_height}px; line-height:${line_height}px; font-size:${font_size}px; color:${text_color};`;

            if (_item_width > this.strWidth(_ruler_string)) {
                // Adjust position of ruler item string
            }

            _ruler_lines.appendChild(_line);
            _ruler_lines.setAttribute('data-ruler-scope', line_scale);
        }

        return _ruler_lines;
    }

    /**
     * @private: Create the side indexes of the timeline
     */
    private createSideIndex(margin: Partial<{ top: number, right: number, bottom: number, left: number }>): HTMLDivElement {
        const config: Config = this.config;
        const instance: Instance = this.instanceProps;
        const sticky: boolean = Timeline.supplement(Default.sidebar.sticky, config.sidebar.sticky);
        const overlay: boolean = Timeline.supplement(Default.sidebar.overlay, config.sidebar.overlay);
        const sbList: Row[] = Timeline.supplement(Default.rows, config.rows);

        const wrapper: HTMLDivElement = document.createElement('div');
        wrapper.className = ClassName.TIMELINE_SIDEBAR;

        const marginDiv: HTMLDivElement = document.createElement('div');
        marginDiv.className = ClassName.TIMELINE_SIDEBAR_MARGIN;

        const listDiv: HTMLDivElement = document.createElement('div');
        listDiv.className = ClassName.TIMELINE_SIDEBAR_ITEM;

        let totalLines: number = 0;
        switch (config.parallelEventsOption) {
            case ParallelEventsOption.MULTIROW:
                totalLines = config.rows.reduce((sum, row) => sum + row.maxParallelEvents + 1, 0);
                break;
            case ParallelEventsOption.SPLITROW:
            case ParallelEventsOption.OVERLAY:
            default:
                totalLines = instance.rows;
                break;
        }
        const itemHeight: number = this.config.rowHeight;// Timeline.numRound(instance.fullheight / totalLines, 2);
        const c: number = -0.5;

        if (sticky) {
            wrapper.classList.add(ClassName.STICKY_LEFT);
        }

        if (overlay) {
            listDiv.classList.add(ClassName.OVERLAY);
        }

        if (margin.top > 0) {
            marginDiv.style.height = `${margin.top}px`;
            wrapper.prepend(marginDiv.cloneNode());
        }

        for (let i = 0; i < instance.rows; i++) {
            const item = listDiv.cloneNode() as HTMLElement;

            let row: Row = config.rows?.find(row => row?.position == i + 1);
            if (!row) {
                row = config.rows[i];
            }

            item.textContent = `${row.label ?? row.id}`;

            switch (config.parallelEventsOption) {
                case ParallelEventsOption.MULTIROW:
                    const multirows: number = config.rows[i].maxParallelEvents == 0 ? 1 : config.rows[i].maxParallelEvents + 1;
                    const gridBorder: number = 1;

                    // itemHeight * rows per category plus + border of multirows
                    if (i + 1 == instance.rows) {
                        // last row
                        item.style.height = `${(itemHeight * multirows + (multirows - 2) * gridBorder)}px`;
                        item.style.lineHeight = `${(itemHeight * multirows + (multirows - 2) * gridBorder)}px`;
                        item.style.borderBottom = "none";
                    } else {
                        item.style.height = `${(itemHeight * multirows + (multirows - 1) * gridBorder)}px`;
                        item.style.lineHeight = `${(itemHeight * multirows + (multirows - 1) * gridBorder)}px`;
                    }
                    break;
                case ParallelEventsOption.SPLITROW:
                case ParallelEventsOption.OVERLAY:
                default:
                    if (i + 1 == instance.rows) {
                        // last row
                        item.style.height = `${(itemHeight)}px`;
                        item.style.lineHeight = `${(itemHeight)}px`;
                        item.style.borderBottom = "none";
                    } else {
                        item.style.height = `${(itemHeight)}px`;
                        item.style.lineHeight = `${(itemHeight)}px`;
                    }
                    break;
            }

            wrapper.appendChild(item);
        }

        if (margin.bottom > 0) {
            marginDiv.style.height = `${(margin.bottom)}px`;
            wrapper.appendChild(marginDiv.cloneNode());
        }

        return wrapper;
    }

    /**
     * @private: Create the event container of the timeline
     */
    private createEventContainer(): HTMLElement {
        let config: Config = this.config,
            instance: Instance = this.instanceProps,
            _actualHeight: number = instance.fullheight,// + Math.ceil(instance.rows / 2) + 1,
            _container: HTMLDivElement = document.createElement('div'),
            _events_bg: HTMLCanvasElement = document.createElement('canvas'),
            _events_lines: HTMLCanvasElement = document.createElement('canvas'),
            _events_body: HTMLDivElement = document.createElement('div'),
            _cy: number = 0;

        _container.className = ClassName.TIMELINE_EVENT_CONTAINER;
        _container.style.height = `${_actualHeight}px`;
        _container.style.marginTop = '1px;';
        _events_bg.width = instance.fullwidth;// - 1;
        _events_bg.height = _actualHeight;
        _events_bg.className = ClassName.TIMELINE_BACKGROUND_GRID;
        _events_lines.width = instance.fullwidth;// - 1;
        _events_lines.height = _actualHeight;
        _events_lines.className = ClassName.TIMELINE_RELATION_LINES;
        _events_body.className = ClassName.TIMELINE_EVENTS;

        let ctx_grid: CanvasRenderingContext2D = _events_bg.getContext('2d'),
            _grid_style = { horizontal: GridStyle.DOTTED, vertical: GridStyle.SOLID };

        // Draw row rectangle
        const drawRowRect = (pos_y: number, color: string) => {
            color = Timeline.supplement(config.colorScheme.theme.background, color);
            ctx_grid.fillStyle = color;
            ctx_grid.fillRect(0, pos_y, instance.fullwidth, instance.rowSize);
            ctx_grid.stroke();
        };

        // Draw horizontal line
        const drawHorizontalLine = (pos_y: number, style: GridStyle) => {
            const gridBorder: number = 1;

            switch (style) {
                case GridStyle.SOLID:
                    style = GridStyle.SOLID;
                    break;
                case GridStyle.DOTTED:
                    style = GridStyle.DOTTED;
                    break;
                case GridStyle.NONE:
                default:
                    return;
            }
            ctx_grid.strokeStyle = Timeline.hexToRgbA(config.colorScheme.theme.gridbase, 0.1);
            ctx_grid.lineWidth = gridBorder;
            ctx_grid.filter = 'url(#crisp)';
            ctx_grid.beginPath();
            if (style === GridStyle.DOTTED) {
                ctx_grid.setLineDash([1, 2]);
            } else {
                ctx_grid.setLineDash([]);
            }
            ctx_grid.moveTo(0, pos_y);
            ctx_grid.lineTo(instance.fullwidth, pos_y);
            ctx_grid.closePath();
            ctx_grid.stroke();
        };

        // Draw vertical line
        let drawVerticalLine = (pos_x: number, style: GridStyle) => {
            let _correction = -0.5;

            switch (style) {
                case GridStyle.SOLID:
                    style = GridStyle.SOLID;
                    break;
                case GridStyle.DOTTED:
                    style = GridStyle.DOTTED;
                    break;
                case GridStyle.NONE:
                default:
                    return;
            }
            ctx_grid.strokeStyle = Timeline.hexToRgbA(config.colorScheme.theme.gridbase, 0.1);
            ctx_grid.lineWidth = 1;
            ctx_grid.filter = 'url(#crisp)';
            ctx_grid.beginPath();
            if (style === GridStyle.DOTTED) {
                ctx_grid.setLineDash([1, 2]);
            } else {
                ctx_grid.setLineDash([]);
            }
            ctx_grid.moveTo(pos_x + _correction, 0);
            ctx_grid.lineTo(pos_x + _correction, _actualHeight);
            ctx_grid.closePath();
            ctx_grid.stroke();
        };

        if (config.effects?.horizontalGridStyle) {
            _grid_style.horizontal = config.effects.horizontalGridStyle;
        }
        if (config.effects?.verticalGridStyle) {
            _grid_style.vertical = config.effects.verticalGridStyle;
        }

        let totalLines = 0;
        switch (config.parallelEventsOption) {
            case ParallelEventsOption.MULTIROW:
                totalLines = config.rows.reduce((sum, row) => sum + row.maxParallelEvents + 1, 0);
                break;
            case ParallelEventsOption.SPLITROW:
            case ParallelEventsOption.OVERLAY:
            default:
                totalLines = instance.rows;
                break;
        }

        const gridBorder: number = 1;

        // draw stripped rows
        _cy = 0;
        for (let i = 0; i < totalLines; i++) {
            //_cy += i % 2 == 0 ? 1 : 0;
            let _pos_y = (i * instance.rowSize) + i,
                _color = Timeline.hexToRgbA(config.colorScheme.theme.striped1, 0.1);

            if (config.effects?.stripedGridRow) {
                _color = i % 2 == 0 ? Timeline.hexToRgbA(config.colorScheme.theme.striped1, 0.1) : Timeline.hexToRgbA(config.colorScheme.theme.striped2, 0.25);
            }
            drawRowRect(_pos_y + 1, _color);
        }

        // draw horizontal lines
        _cy = 0;
        for (let i = 1; i < totalLines; i++) {
            //_cy += i % 2 == 0 ? 1 : 0;
            _cy = i == 1 ? 0 : i - 1;
            let _pos_y = (i * instance.rowSize) + i - 1;
            drawHorizontalLine(_pos_y + 1, _grid_style.horizontal);
        }


        // Check if the scale is variable length
        if (instance.isVLS) {
            // For scales where the value of quantity per unit is variable length
            let _sy = 0;
            let _baseVar: number;

            // Determine the base variable based on the scale
            switch (config.scale) {
                case Scale.MILLENNIUM:
                case Scale.CENTURY:
                    _baseVar = instance.scale / (365.25 * 24 * 60 * 60 * 1000);
                    break;
                case Scale.DECADE:
                case Scale.LUSTRUM:
                case Scale.YEAR:
                case Scale.MONTH:
                    _baseVar = instance.scale / (24 * 60 * 60 * 1000);
                    break;
                case Scale.DAY:
                case Scale.WEEK:
                case Scale.WEEKDAY:
                    _baseVar = instance.scale / (60 * 60 * 1000);
                    break;
                case Scale.HOUR:
                    _baseVar = instance.scale / (60 * 1000);
                    break;
                case Scale.MINUTE:
                    _baseVar = instance.scale / 1000;
                    break;
                case Scale.SECOND:
                default:
                    _baseVar = instance.scale;
                    break;
            }
            // Draw vertical lines for each key in the variable scale
            for (let _key of Object.keys(instance.variableScale)) {
                _sy += Timeline.numRound((instance.variableScale[_key] * instance.scaleSize) / _baseVar, 2);
                drawVerticalLine(_sy, _grid_style.vertical);
            }
        } else {
            // In case of fixed length scale; Deprecated
            for (let i = 1; i < instance.grids; i++) {
                drawVerticalLine((i * instance.scaleSize), null);
            }
        }

        _container.append(_events_bg);
        _container.append(_events_lines);
        _container.append(_events_body);
        return _container;
    }

    /**
     * @private
     * @param params
     * @returns 
     */
    private createEventNode(params: EventParams) {
        let config: Config = this.config;
        let instance: Instance = this.instanceProps;

        // Create a new event element
        let _evt_elem = document.createElement('div');
        _evt_elem.className = ClassName.TIMELINE_EVENT_NODE;
        _evt_elem.setAttribute('draggable', 'true');
        _evt_elem.id = `evt-${params.eventId}`;
        _evt_elem.style.left = `${params.x}px`;
        _evt_elem.style.top = `${params.y}px`;
        _evt_elem.style.width = `${params.width}px`;
        _evt_elem.style.height = `${params.height}px`;
        _evt_elem.style.color = Timeline.hexToRgbA(params.color);
        _evt_elem.style.backgroundColor = Timeline.hexToRgbA(params.bgColor);

        let appendixContainer = document.createElement('div');
        appendixContainer.className = "tstl-event-appendix-container";
        _evt_elem.appendChild(appendixContainer);


        const getLocalTime = (dateTime: string | number | Date, locale: string = "de-DE"): string => {
            if (!dateTime) {
                return "";
            }
            const _date = typeof dateTime === 'string' || typeof dateTime === 'number' ? new Date(dateTime) : new Date(dateTime.getTime());
            _date.setSeconds(0);
            _date.setMilliseconds(0);
            return _date.toLocaleTimeString(locale)?.substring(0, 5);
        }

        let appendixLeft = document.createElement('div');
        appendixLeft.className = "tstl-event-left-right-appendix";
        appendixLeft.innerHTML = getLocalTime(params.start) + " - " + getLocalTime(params.end);
        appendixContainer.appendChild(appendixLeft);

        let appendixRight = document.createElement('div');
        appendixRight.className = "tstl-event-left-right-appendix";
        appendixRight.innerHTML = params.category//"{{PARTICIPANTS}}";
        appendixContainer.appendChild(appendixRight);

        let label = document.createElement('div');
        label.className = ClassName.TIMELINE_EVENT_LABEL;
        label.innerHTML = params.label;
        _evt_elem.appendChild(label);

        let _is_bar = true;

        // Check the event type
        if (config.type === Type.POINT) {
            _is_bar = false; // point type
        } else if (config.type === Type.MIXED) {
            if (params.type === Type.POINT) {
                _is_bar = false; // point type
            } else if (params.width < 1) {
                _is_bar = params.type !== Type.BAR ? false : true;
            }
        }

        // Check if the event is within the display range of the timeline
        if (params.x >= 0) {
            if (params.x <= instance.fullwidth) {
                if (params.x + params.width <= instance.fullwidth) {
                    // The event is within the timeline
                } else {
                    // The event end datetime is after the timeline end datetime
                    params.width = instance.fullwidth - params.x;
                }
            } else {
                // The event start datetime is after the timeline end datetime
                params.width = -1;
            }
        } else {
            // The event start datetime is before the timeline start datetime
            if (!_is_bar) {
                // In the case of "point" type, that is an exclude event
                params.width = -1;
            } else {
                // The case of "bar" type
                if (params.x + params.width <= 0) {
                    // The event end datetime is less than before the timeline start datetime
                    params.width = -1;
                } else {
                    if (params.x + params.width <= instance.fullwidth) {
                        // The event end datetime is less than or equal the timeline end datetime
                        params.width = Math.abs(params.x + params.width);
                        params.x = 0;
                    } else {
                        // The event end datetime is after the timeline end datetime
                        params.width = instance.fullwidth;
                        params.x = 0;
                    }
                }
            }
        }

        if (!_is_bar) {
            // If this event is the point type
            if (params.width < 0) {
                return null;
            }
            let _pointSize = this.getPointerSize(params.size, params.margin),
                _shiftX = Timeline.numRound(params.x - (_pointSize / 2), 2) - params.margin,
                _shiftY = Timeline.numRound(params.y + ((params.height - _pointSize) / 2), 2) - params.margin;

            _evt_elem.classList.add(ClassName.VIEWER_EVENT_TYPE_POINTER);
            _evt_elem.style.borderColor = params.bdColor;
            _evt_elem.style.left = `${_shiftX}px`;
            _evt_elem.style.top = `${_shiftY}px`;
            _evt_elem.style.width = `${_pointSize}px`;
            _evt_elem.style.height = `${_pointSize}px`;

            _evt_elem.setAttribute('data-base-size', _pointSize.toString());
            _evt_elem.setAttribute('data-base-left', _shiftX.toString());
            _evt_elem.setAttribute('data-base-top', _shiftY.toString());
        } else {
            // If this event is the bar type
            if (params.width < 1) {
                return null;
            }
            _evt_elem.style.left = `${params.x}px`;
            _evt_elem.style.width = `${params.width}px`;

            _evt_elem.setAttribute('data-uid', params.uid);
        }

        if (!Timeline.isEmpty(params.image)) {
            if (!_is_bar) {
                _evt_elem.style.backgroundImage = `url(${params.image})`;
            } else {
                let _imgSize = params.height - (params.margin * 2);
                let imgElem = document.createElement('img');
                imgElem.src = params.image;
                imgElem.className = ClassName.TIMELINE_EVENT_THUMBNAIL;
                imgElem.width = _imgSize;
                imgElem.height = _imgSize;
                _evt_elem.prepend(imgElem);
            }
        }

        if (_is_bar && config.eventMeta.display) {
            params.extend.meta = params.rangeMeta;
        }

        if (!Timeline.isEmpty(params.extend)) {
            for (let _prop of Object.keys(params.extend)) {
                _evt_elem.setAttribute(`data-${_prop}`, params.extend[_prop].toString());
                if (_prop === 'toggle' && ['popover', 'tooltip'].includes(params.extend[_prop])) {
                    // for bootstrap's popover or tooltip
                    _evt_elem.setAttribute('title', params.label);
                    if (!Object.hasOwnProperty.call(params.extend, 'content')) {
                        _evt_elem.setAttribute('data-content', params.content);
                    }
                }
            }
        }

        if (!Timeline.isEmpty(params.callback)) {
            _evt_elem.setAttribute('data-callback', params.callback);
        }

        return _evt_elem;
    }

    /**
     * @private: Draw the relational lines
     */
    private drawRelationLine(events: EventParams[]): void { // Assuming EventType is the type of events
        const instance: Instance = this.instanceProps;
        const _canvas: HTMLCanvasElement = this.element.querySelector(Selector.TIMELINE_RELATION_LINES) as HTMLCanvasElement;
        const ctx_relations: CanvasRenderingContext2D = _canvas.getContext('2d') as CanvasRenderingContext2D;

        // Define an enum for the curve types
        const enum CurveType {
            LEFT_TOP = 'lt',
            LEFT_BOTTOM = 'lb',
            RIGHT_TOP = 'rt',
            RIGHT_BOTTOM = 'rb',
            LEFT_TOP_AND_BOTTOM = 'lt+lb',
            LEFT_BOTTOM_AND_TOP = 'lb+lt',
            RIGHT_TOP_AND_BOTTOM = 'rt+rb',
            RIGHT_BOTTOM_AND_TOP = 'rb+rt'
        }

        /**
         * In the drawLine function, _sx, _sy, _ex, and _ey represent the start and end coordinates of a line to be drawn on a 2D plane.
         * 
         * @param _sx start point of the x-coordinate line
         * @param _sy start point of the y-coordinate line
         * @param _ex end point of the x-coordinate line
         * @param _ey end point of the y-coordinate line
         * @param evt timeline event
         * @param _ba represents 'before' or 'after', indicating the direction of the curve from selfEvent to targetEvent
         */
        const drawLine = (_sx: number, _sy: number, _ex: number, _ey: number, evt: EventParams, _ba: any) => {
            let _curveType: any = {}, // Assuming any is the type of _curveType
                _strokeColor: string = EventParams.bdColor, // Assuming EventParams.bdColor is a string
                _radius: number = Timeline.numRound(Math.min(instance.scaleSize, instance.rowSize) / 2, 2);

            // Defaults
            if (_strokeColor === Default.colorScheme.event.border && Default.colorScheme.event.border !== this.config.colorScheme.event.border) {
                _strokeColor = this.config.colorScheme.event.border;
            }
            ctx_relations.strokeStyle = _strokeColor;
            ctx_relations.lineWidth = 2.5;
            ctx_relations.filter = 'url(#crisp)';

            for (let _key of Object.keys(evt.relation)) {
                switch (true) {
                    case /^(|line)color$/i.test(_key):
                        ctx_relations.strokeStyle = evt.relation[_key];
                        break;
                    case /^(|line)size$/i.test(_key):
                        ctx_relations.lineWidth = parseInt(evt.relation[_key], 10) || 2.5;
                        break;
                    case /^curve$/i.test(_key):
                        if (/^(r|l)(t|b),?(r|l)?(t|b)?$/i.test(evt.relation[_key])) {
                            let _tmp: string[] = evt.relation[_key].split(',');
                            if (_tmp.length === 2) {
                                _curveType.before = _tmp[0];
                                _curveType.after = _tmp[1];
                            } else {
                                _curveType[_ba] = _tmp[0];
                            }
                        } else if ((typeof evt.relation[_key] === 'boolean' && evt.relation[_key]) || (typeof evt.relation[_key] === 'number' && Boolean(evt.relation[_key]))) {
                            // Automatically set the necessary linearity type

                            // Determine the type of curve based on the relative positions of two points.
                            // The two points are the selfEvent and the targetEvent, represented by (_sx, _sy) and (_ex, _ey) respectively.
                            // _ba represents 'before' or 'after', indicating the direction of the curve from selfEvent to targetEvent.
                            // _curveType is an object that stores the type of curve for 'before' and 'after' scenarios.

                            if (_ba === 'before') {
                                // If the direction is 'before', i.e., targetEvent[ _ex, _ey ] <---- selfEvent[ _sx, _sy ]

                                if (_sy > _ey) {
                                    // If selfEvent is below the targetEvent on the y-axis

                                    if (_sx > _ex) {
                                        // If selfEvent is to the right of the targetEvent on the x-axis
                                        // The curve type is 'lb' (Left-Bottom)
                                        _curveType[_ba] = CurveType.LEFT_BOTTOM;
                                    } else if (_sx < _ex) {
                                        // If selfEvent is to the left of the targetEvent on the x-axis
                                        // The curve type is 'lb+lt' (Left-Bottom + Left-Top)
                                        _curveType[_ba] = CurveType.LEFT_BOTTOM_AND_TOP;
                                    } else {
                                        // If selfEvent is directly above the targetEvent
                                        // The curve type is null
                                        _curveType[_ba] = null;
                                    }
                                } else if (_sy < _ey) {
                                    // If selfEvent is above the targetEvent on the y-axis
                                    // Similar checks are performed and curve types are assigned
                                    if (_sx > _ex) {
                                        _curveType[_ba] = CurveType.LEFT_TOP;
                                    } else if (_sx < _ex) {
                                        _curveType[_ba] = CurveType.LEFT_TOP_AND_BOTTOM;
                                    } else {
                                        _curveType[_ba] = null;
                                    }
                                } else {
                                    // If selfEvent and targetEvent are at the same level on the y-axis
                                    // The curve type is null
                                    _curveType[_ba] = null;
                                }
                            } else if (_ba === 'after') {
                                // If the direction is 'after', i.e., selfEvent[ _sx, _sy ] ----> targetEvent[ _ex, _ey ]
                                // This means we're drawing the curve from the selfEvent to the targetEvent

                                if (_sy < _ey) {
                                    // If selfEvent is above the targetEvent on the y-axis

                                    if (_sx < _ex) {
                                        // If selfEvent is to the left of the targetEvent on the x-axis
                                        // The curve type is 'rt' (Right-Top)
                                        _curveType[_ba] = CurveType.RIGHT_TOP;
                                    } else if (_sx > _ex) {
                                        // If selfEvent is to the right of the targetEvent on the x-axis
                                        // The curve type is 'rt+rb' (Right-Top + Right-Bottom)
                                        _curveType[_ba] = CurveType.RIGHT_TOP_AND_BOTTOM;
                                    } else {
                                        // If selfEvent is directly above the targetEvent
                                        // The curve type is null
                                        _curveType[_ba] = null;
                                    }
                                } else if (_sy > _ey) {
                                    // If selfEvent is below the targetEvent on the y-axis

                                    if (_sx < _ex) {
                                        // If selfEvent is to the left of the targetEvent on the x-axis
                                        // The curve type is 'rb' (Right-Bottom)
                                        _curveType[_ba] = CurveType.RIGHT_BOTTOM;
                                    } else if (_sx > _ex) {
                                        // If selfEvent is to the right of the targetEvent on the x-axis
                                        // The curve type is 'rb+rt' (Right-Bottom + Right-Top)
                                        _curveType[_ba] = CurveType.RIGHT_BOTTOM_AND_TOP;
                                    } else {
                                        // If selfEvent is directly below the targetEvent
                                        // The curve type is null
                                        _curveType[_ba] = null;
                                    }
                                } else {
                                    // If selfEvent and targetEvent are at the same level on the y-axis
                                    // The curve type is null
                                    _curveType[_ba] = null;
                                }
                            }
                        }
                        break;
                }
            }

            // Check if the absolute difference between _ey and _sy is greater than instance.rowSize
            if (Math.abs(_ey - _sy) > instance.rowSize) {
                // If it is, add the floor value of the absolute difference divided by instance.rowSize to _ey
                _ey += Math.floor(Math.abs(_ey - _sy) / instance.rowSize);
            }

            // Begin a path on the canvas context for drawing relations
            ctx_relations.beginPath();

            if (!Timeline.isEmpty(_curveType)) {
                switch (_curveType) {
                    case CurveType.LEFT_TOP:
                        // Code for 'lt' curve type
                        // If the horizontal distance between the points is greater than the radius
                        if (Math.abs(_sx - _ex) > _radius) {
                            // Draw a horizontal line
                            ctx_relations.lineTo(_ex + _radius, _sy);
                        }
                        // If the vertical distance between the points is greater than the radius
                        if (Math.abs(_ey - _sy) > _radius) {
                            // Calculate a new point _hep
                            let _hep = _ey - _sy >= 0 ? _sy + _radius : _sy - _radius;

                            // Draw a curve
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _hep);

                            // Draw a vertical line
                            ctx_relations.lineTo(_ex, _ey);
                        } else {
                            // If the vertical distance is not greater than the radius, draw a curve directly to the point (_ex, _ey)
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _ey);
                        }
                        break;
                    case CurveType.LEFT_BOTTOM:
                        // Code for 'lb' curve type
                        // Start the path at (_sx, _sy)
                        ctx_relations.moveTo(_sx, _sy);

                        // If the horizontal distance between the points is greater than the radius
                        if (Math.abs(_sx - _ex) > _radius) {
                            // Draw a horizontal line
                            ctx_relations.lineTo(_ex + _radius, _sy);
                        }

                        // If the vertical distance between the points is greater than the radius
                        if (Math.abs(_sy - _ey) > _radius) {
                            // Draw a curve
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _sy - _radius);

                            // Draw a vertical line
                            ctx_relations.lineTo(_ex, _ey);
                        } else {
                            // If the vertical distance is not greater than the radius, draw a curve directly to the point (_ex, _ey)
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _ey);
                        }
                        break;
                    case CurveType.RIGHT_TOP:
                        // Code for 'rt' curve type
                        // Start the path at (_sx, _sy)
                        ctx_relations.moveTo(_sx, _sy);

                        // If the horizontal distance between the points is greater than the radius
                        if (Math.abs(_ex - _sx) > _radius) {
                            // Draw a horizontal line
                            ctx_relations.lineTo(_ex - _radius, _sy);
                        }

                        // If the vertical distance between the points is greater than the radius
                        if (Math.abs(_ey - _sy) > _radius) {
                            // Draw a curve
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _sy + _radius);

                            // Draw a vertical line
                            ctx_relations.lineTo(_ex, _ey);
                        } else {
                            // If the vertical distance is not greater than the radius, draw a curve directly to the point (_ex, _ey)
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _ey);
                        }
                        break;
                    case CurveType.RIGHT_BOTTOM:
                        // Code for 'rb' curve type
                        // Start the path at (_sx, _sy)
                        ctx_relations.moveTo(_sx, _sy);

                        // If the horizontal distance between the points is greater than the radius
                        if (Math.abs(_ex - _sx) > _radius) {
                            // Draw a horizontal line
                            ctx_relations.lineTo(_ex - _radius, _sy);
                        }

                        // If the vertical distance between the points is greater than the radius
                        if (Math.abs(_sy - _ey) > _radius) {
                            // Draw a curve
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _sy - _radius);

                            // Draw a vertical line
                            ctx_relations.lineTo(_ex, _ey);
                        } else {
                            // If the vertical distance is not greater than the radius, draw a curve directly to the point (_ex, _ey)
                            ctx_relations.quadraticCurveTo(_ex, _sy, _ex, _ey);
                        }
                        break;
                    case CurveType.LEFT_TOP_AND_BOTTOM:
                    case CurveType.LEFT_BOTTOM_AND_TOP:
                        // Start the path at (_sx, _sy)
                        ctx_relations.moveTo(_sx, _sy);

                        // Draw a horizontal line from the start point to the left by _radius
                        ctx_relations.lineTo(_sx - _radius, _sy);

                        // Draw a bezier curve from the current point to (_sx - _radius, _ey) with control points at (_sx - _radius * 2, _sy) and (_sx - _radius * 2, _ey)
                        ctx_relations.bezierCurveTo(_sx - _radius * 2, _sy, _sx - _radius * 2, _ey, _sx - _radius, _ey);

                        // Draw a horizontal line from the current point to (_ex, _ey)
                        ctx_relations.lineTo(_ex, _ey);
                        break;
                    case CurveType.RIGHT_TOP_AND_BOTTOM:
                    case CurveType.RIGHT_BOTTOM_AND_TOP:
                        // Start the path at (_sx, _sy)
                        ctx_relations.moveTo(_sx, _sy);

                        // Draw a horizontal line from the start point to the right by _radius
                        ctx_relations.lineTo(_sx + _radius, _sy);

                        // Draw a bezier curve from the current point to (_sx + _radius, _ey) with control points at (_sx + _radius * 2, _sy) and (_sx + _radius * 2, _ey)
                        ctx_relations.bezierCurveTo(_sx + _radius * 2, _sy, _sx + _radius * 2, _ey, _sx + _radius, _ey);

                        // Draw a horizontal line from the current point to (_ex, _ey)
                        ctx_relations.lineTo(_ex, _ey);
                        break;
                    default:
                        // Code for unknown curve type
                        ctx_relations.moveTo(_sx, _sy);
                        ctx_relations.lineTo(_ex, _ey);
                        break;
                }
            } else {
                ctx_relations.moveTo(_sx, _sy);
                ctx_relations.lineTo(_ex, _ey);
            }
            ctx_relations.stroke();
        };

        // Clear the entire canvas
        ctx_relations.clearRect(0, 0, _canvas[0].width, _canvas[0].height);

        // Iterate over each event
        events.forEach((evt) => {
            let _rel: RelationOption = evt.relation,
                _sx: number, _sy: number, _ex: number, _ey: number,
                _targetId: number, _targetEvent: any;

            // If the _rel object has a 'before' property
            if (_rel.before) {
                // Calculate start coordinates
                let _sx = _rel.x + Timeline.numRound(evt.margin / 2, 2);
                let _sy = _rel.y + Timeline.numRound(evt.margin / 2, 2);

                // Get the target event ID
                let _targetId = parseInt(_rel.before.toString(), 10);

                let _ex: number, _ey: number, _targetEvent: any;

                // If the target ID is less than 0, set end coordinates to (0, _sy)
                if (_targetId < 0) {
                    _ex = 0;
                    _ey = _sy + Timeline.numRound(evt.margin / 2, 2);
                } else {
                    // Otherwise, find the target event and calculate end coordinates
                    _targetEvent = events.find((_evt) => parseInt(_evt.eventId.toString(), 10) == _targetId);
                    if (!Timeline.isEmpty(_targetEvent) && _targetEvent.relation) {
                        _ex = _targetEvent.relation.x < 0 ? 0 : _targetEvent.relation.x + Timeline.numRound(evt.margin / 2, 2);
                        _ey = _targetEvent.relation.y + Timeline.numRound(evt.margin / 2, 2);
                    }
                }

                // If all coordinates are valid, draw the line
                if (_sx >= 0 && _sy >= 0 && _ex >= 0 && _ey >= 0) {
                    drawLine(_sx, _sy, _ex, _ey, evt, 'before');
                }
            }

            // If the _rel object has an 'after' property
            if (_rel.after) {
                // Calculate start coordinates
                let _sx = _rel.x + Timeline.numRound(evt.margin / 2, 2);
                let _sy = _rel.y + Timeline.numRound(evt.margin / 2, 2);

                // Get the target event ID
                let _targetId = parseInt(_rel.after.toString(), 10);

                let _ex: number, _ey: number, _targetEvent: any;

                // If the target ID is less than 0, set end coordinates to (instance.fullwidth, _sy)
                if (_targetId < 0) {
                    _ex = instance.fullwidth;
                    _ey = _sy + Timeline.numRound(evt.margin / 2, 2);
                } else {
                    // Otherwise, find the target event and calculate end coordinates
                    _targetEvent = events.find((_evt) => parseInt(_evt.eventId.toString(), 10) == _targetId);
                    if (!Timeline.isEmpty(_targetEvent) && _targetEvent.relation) {
                        _ex = _targetEvent.relation.x > instance.fullwidth ? instance.fullwidth : _targetEvent.relation.x + Timeline.numRound(evt.margin / 2, 2);
                        _ey = _targetEvent.relation.y + Timeline.numRound(evt.margin / 2, 2);
                    }
                }

                // If all coordinates are valid, draw the line
                if (_sx >= 0 && _sy >= 0 && _ex >= 0 && _ey >= 0) {
                    drawLine(_sx, _sy, _ex, _ey, evt, 'after');
                }
            }
        });
    }

    /**
     * @private: Controller method to place event data on timeline
     */
    private placeEvent(): Promise<string | boolean> {
        return new Promise((resolve, reject) => {
            if (!this.isCached) {
                reject('No Cached Event');
            }

            const _elem: HTMLElement = this.element,
                config: Config = this.config,
                _evt_container: HTMLElement = _elem.querySelector(Selector.TIMELINE_EVENTS),
                _relation_lines: HTMLElement = _elem.querySelector(Selector.TIMELINE_RELATION_LINES),
                events: EventParams[] = this.loadToCache(),
                placedEvents: HTMLElement[] = [];

            // c.f. https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    let _self: HTMLElement = mutation.target as HTMLElement;

                    switch (mutation.type.toLowerCase()) {
                        case 'childList':
                            if (mutation.addedNodes.length === placedEvents.length) {
                                _relation_lines.setAttribute('data-state', 'show');
                                _evt_container.setAttribute('data-state', 'show');
                            }
                            break;
                        case 'attributes':
                            if (mutation.attributeName === 'data-state') {
                                if (_self.getAttribute('data-state') === 'shown') {
                                    resolve('Completed Placing');
                                } else if (_self.getAttribute('data-state') === 'show') {
                                    setTimeout(() => {
                                        _relation_lines.setAttribute('data-state', 'shown');
                                        _evt_container.setAttribute('data-state', 'shown');
                                    }, 300);
                                }
                            }
                            break;
                    }
                });
            });
            this.observer.observe(_evt_container, { childList: true, attributes: true, subtree: true, attributeOldValue: true });

            if (events.length > 0) {
                _evt_container.innerHTML = '';
                events.forEach((_evt) => {
                    // Apply color scheme to the creation event
                    if (_evt.color === Default.colorScheme.event.text &&
                        Default.colorScheme.event.text !== config.colorScheme.event.text) {
                        _evt.color = config.colorScheme.event.text;
                    }
                    if (_evt.bgColor === Default.colorScheme.event.background &&
                        Default.colorScheme.event.background !== config.colorScheme.event.background) {
                        _evt.bgColor = config.colorScheme.event.background;
                    }
                    if (_evt.bdColor === Default.colorScheme.event.border &&
                        Default.colorScheme.event.border !== config.colorScheme.event.border) {
                        _evt.bdColor = config.colorScheme.event.border;
                    }

                    // Create HTMLDivElement of event 
                    let _evt_elem = this.createEventNode(_evt);

                    if (_evt_elem) {
                        placedEvents.push(_evt_elem);
                    }
                });
                if (placedEvents.length > 0) {
                    _evt_container.append(...placedEvents);
                }
            } else {
                _relation_lines.setAttribute('data-state', 'show');
                _evt_container.setAttribute('data-state', 'show');
            }

            if (config.type === Type.MIXED || config.type === Type.POINT) {
                this.drawRelationLine(events);
            }

            if (config.effects?.presentTime) {
                this.viewPresentTime();
            }

            resolve(true);
        });
    }

    /**
     * @public: Move the display position of the timeline container to the specified position
     */
    public alignment(...args: any[]): void {

        let config: Config = this.config,
            instance: any = this.instanceProps,
            _elem: HTMLElement = this.element,
            _tl_container: HTMLElement = document.querySelector(Selector.TIMELINE_CONTAINER) as HTMLElement,
            _movX: number = 0,
            _args = !Timeline.isEmpty(args) ? args[0] : [],
            position = _args.length > 0 && typeof _args[0] === 'string' ? _args[0] : config.rangeAlign,
            duration = _args.length > 1 && /^(\d{1,}|fast|normal|slow)$/i.test(_args[1]) ? _args[1] : 0;

        if (instance.fullwidth <= _elem.scrollWidth) {
            return;
        }

        let events: any;

        switch (true) {
            case position === RangeAlignment.LEFT:
            case position === RangeAlignment.BEGIN:
                _movX = 0;
                break;
            case position === RangeAlignment.CENTER:
                _movX = (_tl_container.scrollWidth - _elem.scrollWidth) / 2 + 1;
                break;
            case position === RangeAlignment.RIGHT:
            case position === RangeAlignment.END:
                _movX = _tl_container.scrollWidth - _elem.scrollWidth + 1;
                break;
            case position === RangeAlignment.LATEST:
                // Handle latest position
                events = this.mapPlacedEvents().sort(this.compareValues('x'));
                let lastEvent = events[events.length - 1];

                _movX = !Timeline.isEmpty(lastEvent) ? lastEvent.x : 0;

                // Centering
                if (_elem.scrollWidth / 2 < _movX) {
                    _movX -= Math.ceil(_elem.scrollWidth / 2);
                } else {
                    _movX = 0;
                }

                // Focus target event
                if (!Timeline.isEmpty(lastEvent)) {
                    // Assuming Selector and Event are defined somewhere in your code
                    let eventNode = document.querySelector(`${Selector.TIMELINE_EVENT_NODE}[data-uid="${lastEvent.uid}"]`);
                    if (eventNode) {
                        eventNode.dispatchEvent(new Event(TimelineEvent.FOCUSIN_EVENT));
                    }
                }
                break;
            case /^\d{1,}$/.test(position):
                // position contains only one or more digits (0-9)
                events = this.mapPlacedEvents();
                let targetEvent: EventParams;

                if (events.length > 0) {
                    targetEvent = events.find((evt) => evt.eventId == parseInt(position, 10));
                }
                _movX = !Timeline.isEmpty(targetEvent) ? targetEvent.x : 0;

                // Centering
                if (Math.ceil(_elem.scrollWidth / 2) < _movX) {
                    _movX -= Math.ceil(_elem.scrollWidth / 2);
                } else {
                    _movX = 0;
                }

                // Focus target event
                if (!Timeline.isEmpty(targetEvent)) {
                    // Assuming Selector and Event are defined somewhere in your code
                    let eventNode = document.querySelector(`${Selector.TIMELINE_EVENT_NODE}[data-uid="${targetEvent.uid}"]`);
                    if (eventNode) {
                        eventNode.dispatchEvent(new Event(TimelineEvent.FOCUSIN_EVENT));
                    }
                }
                break;
            case position === RangeAlignment.CURRENT:
            case position === RangeAlignment.NOW:
            default:
                // Handle current/now/default position
                let _now = new Date().getTime();
                let _nowX = Timeline.numRound(this.getCoordinateX(_now), 2);

                if (_nowX >= 0) {
                    if (_tl_container[0].scrollWidth - _elem.scrollWidth + 1 < _nowX) {
                        _movX = _tl_container[0].scrollWidth - _elem.scrollWidth + 1;
                    } else {
                        _movX = _nowX;
                    }
                } else {
                    _movX = 0;
                }
                break;
        }

        if (duration === '0') {
            _tl_container.scrollTo({ left: _movX });
        } else {
            _tl_container.animate({ scrollLeft: _movX }, duration)
        }
    }

    /**
     * @private: Output a marker of the present time
     */
    private viewPresentTime(): void {
        const _elem: HTMLElement = this.element,
            instance: Instance = this.instanceProps,
            _nowDt: Date = new Date();

        // todo: CHECK
        // if (this.diffDate(instance.begin, _nowDt) < 0 || this.diffDate(_nowDt, instance.end) < 0) {
        //     return;
        // }

        const _marker: HTMLElement = document.createElement('div');
        _marker.className = ClassName.PRESENT_TIME_MARKER;
        _marker.style.left = `${Timeline.numRound(this.getCoordinateX(_nowDt.getTime()), 2)}px`;
        _marker.style.top = `${_elem.querySelector(Selector.TIMELINE_RULER_TOP).clientHeight}px`;
        _marker.style.height = `${_elem.querySelector(Selector.TIMELINE_EVENT_CONTAINER).clientHeight}px`;

        _elem.querySelector(Selector.TIMELINE_MAIN).append(_marker);
    }

    /**
     * @private: Retrieve the diameter size (pixel) of pointer
     */
    private getPointerSize(key: string | number, margin: number): number {
        let instance: Instance = this.instanceProps;

        let _max = Math.min((instance.scaleSize - (margin * 2)), (instance.rowSize - (margin * 2))),
            _size: number | null = null;

        switch (true) {
            case /^([1-9]\d*|0)$/i.test(key?.toString()):
                _size = Math.max(parseInt(key.toString(), 10), MIN_POINTER_SIZE);
                break;
            case /^small$/i.test(key.toString()):
                _size = Math.max(Timeline.numRound(_max / 4, 2), MIN_POINTER_SIZE);
                break;
            case /^large$/i.test(key.toString()):
                _size = Math.max(Timeline.numRound(_max * 0.75, 2), MIN_POINTER_SIZE);
                break;
            case /^normal$/i.test(key.toString()):
            default:
                _size = Math.max(Timeline.numRound(_max / 2, 2), MIN_POINTER_SIZE);
                break;
        }

        return _size!;
    }

    /**
     * @private: Retrieve the mapping data that placed current events
     */
    private mapPlacedEvents(): any[] {
        let _tl_events = Array.from(this.element.querySelectorAll(Selector.TIMELINE_EVENTS))
            .map(e => Array.from(e.children))
            .reduce((acc, val) => acc.concat(val), []);
        let _cache = this.loadToCache();
        let _events: any[] = [];

        if (!this.isCached || Timeline.isEmpty(_cache)) {
            return _events;
        }

        _tl_events.forEach((eventElement) => {
            let _uid = eventElement.getAttribute('data-uid');
            let _data = null;

            if (_cache) {
                _data = _cache.find((_evt: any) => _evt.uid === _uid) || null;
            } else {
                _data = (eventElement as HTMLElement).dataset;
            }

            if (!Timeline.isEmpty(_data)) {
                _events.push(_data);
            }
        });

        return _events;
    }


    // ===============================
    // Utilities
    // Styling
    // ===============================

    /**
     * Convert hex color code to rgba
     *
     * @param hex - The hex color code (required)
     * @param alpha - The alpha value (optional; defaults to 1)
     *
     * @return string - The rgba color code
     */
    static hexToRgbA(hex: string, alpha: number = 1): string {
        let _c: any;

        // Check if the hex color code is valid
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            // Remove the '#' from the start of the hex color code
            _c = hex.substring(1).split('');

            // If the hex color code is shorthand (e.g., #abc), duplicate each character
            if (_c.length === 3) {
                _c = [_c[0], _c[0], _c[1], _c[1], _c[2], _c[2]];
            }

            // Convert the hex color code to a number
            _c = `0x${_c.join('')}`;

            // Convert the number to rgb and append the alpha value
            return `rgba(${[(_c >> 16) & 255, (_c >> 8) & 255, _c & 255].join(',')},${alpha})`;
        }

        // If the hex color code is not valid, return the original input
        return hex;
    }

    /**
     * Get the coordinate X on the timeline of any date
     * @private
     * @param date - The date to get the X coordinate for
     * @return number - The X coordinate of the date on the timeline
     */
    private getCoordinateX(date: number): number {
        let instance: Instance = this.instanceProps;
        let parsedDate: Date | null = Timeline.supplement<Date>(null, this.getPluggableDatetime(date));
        let coordinateX: number = 0;

        if (parsedDate) {
            // Check if the date is within the timeline range
            if (parsedDate.getTime() >= instance.begin.getTime() && instance.end.getTime() >= parsedDate.getTime()) {
                // When the given date is within the range of timeline begin and end
                coordinateX = (Math.abs(parsedDate.getTime() - instance.begin.getTime()) / instance.scale) * instance.scaleSize;
            } else {
                // When the given date is out of timeline range
                coordinateX = ((parsedDate.getTime() - instance.begin.getTime()) / instance.scale) * instance.scaleSize;
            }
        } else {
            // Log a warning if the date cannot be parsed
            this.error('Cannot parse date because invalid format or undefined.', 'warn');
        }

        return coordinateX;
    }

    /**
     * Get the date on the timeline from any X coordinate
     * @private
     * @param coordinateX - The X coordinate to get the date for
     * @return Date - The date on the timeline at the X coordinate
     */
    private getDateFromCoordinateX(coordinateX: number): Date | null {
        let instance: Instance = this.instanceProps;
        let date: Date | null = null;

        // Calculate the time from the X coordinate
        let time = (coordinateX / instance.scaleSize) * instance.scale + instance.begin.getTime();

        // Check if the time is within the timeline range
        if (time >= instance.begin.getTime() && time <= instance.end.getTime()) {
            // When the calculated time is within the range of timeline begin and end
            date = new Date(time);
        } else {
            // When the calculated time is out of timeline range
            this.error('The X coordinate is out of the timeline range.', 'warn');
        }

        return date;
    }

    /**
     * 
     */
    private getRowFromCoordinateY(coordinateY: number): number | null {
        let instance: Instance = this.instanceProps;
        const config: Config = this.config;

        let totalPrevRowHeight: number = 0;
        for (let i = 0; i < instance.rows; i++) {
            // Get the number of lines for current row
            const linesOfRow: number = config.rows[i].maxParallelEvents == 0 ? 1 : config.rows[i].maxParallelEvents + 1;
            totalPrevRowHeight += linesOfRow;

            // Calculate current row y-coordinates
            const rowStartYCoordinate: number = (totalPrevRowHeight - linesOfRow) * config.rowHeight;
            const rowEndYCoordinate: number = totalPrevRowHeight * config.rowHeight;

            // if coordinate is between a row start and end y-coordinate return row
            if (rowStartYCoordinate <= coordinateY && rowEndYCoordinate >= coordinateY) {
                return i;
            }
        }

        return null;
    }

    /**
     * Get the rendering width of the given string
     *
     * @param str - The string to measure
     *
     * @return number - The width of the string
     */
    strWidth(str: string): number {
        // Create a span element to measure the string
        let strRuler = document.getElementById('str-ruler') as HTMLSpanElement;

        // If the span element doesn't exist, create it
        if (!strRuler) {
            strRuler = document.createElement('span');
            strRuler.id = 'str-ruler';
            document.body.appendChild(strRuler);
        }

        // Set the text of the span element to the string
        strRuler.textContent = str;

        // Get the width of the span element
        const width = strRuler.offsetWidth;

        // Clear the text of the span element
        strRuler.textContent = '';

        return width;
    }

    /**
     * Apply custom theme styles
     *
     * @return void
     */
    applyThemeStyle(): void {
        // Get theme from configuration
        const theme: Theme = this.config.colorScheme.theme;
        // Get selector from instance
        const selector: string = this.selector;
        // Create styleId by replacing certain characters in selector
        const styleId: string = `${PREFIX}-theme-${selector.replace(/[.#_]/g, '-')}`;
        // Create a new style tag
        const styleTag: HTMLStyleElement = document.createElement('style');
        // Assign the created id to the style tag
        styleTag.id = styleId;

        // Define objects to hold inline styles and other styles
        let _is: { [key: string]: string } = {};
        let _os: { [key: string]: string } = {};
        // Initialize cssText to hold the final CSS styles
        let cssText: string = '';

        // Check if a style tag with the same id already exists
        const existingStyleTag = document.getElementById(styleId);
        // If it exists, remove it
        if (existingStyleTag) {
            existingStyleTag.remove();
        }
        // If the theme name is 'default', return without applying any styles
        if ('default' === theme.name) {
            return;
        }

        _is[Selector.TIMELINE_CONTAINER] = `border:solid 1px ${theme.offline}; background:${theme.background}`
        _is[Selector.HEADLINE_TITLE] = `color:${theme.text}`
        _is[Selector.RANGE_META] = `color:${theme.subtext}`
        _is[Selector.TIMELINE_RULER_TOP] = `outline:solid 1px ${theme.offline}`
        _is[Selector.TIMELINE_RULER_BOTTOM] = `outline:solid 1px ${theme.offline}`
        _is[`${Selector.TIMELINE_RULER_LINES}:nth-child(even)`] = `background-color:${Timeline.hexToRgbA(theme.striped1, 0.25)}`
        _is[Selector.TIMELINE_RULER_ITEM] = `color:${theme.subtext}`
        _is[`${Selector.TIMELINE_RULER_ITEM}:nth-child(even)`] = `background-color:${Timeline.hexToRgbA(theme.striped2, 0.25)}`
        _is[Selector.TIMELINE_EVENT_CONTAINER] = `outline:solid 1px ${theme.offline}`
        _is[`${Selector.TIMELINE_EVENT_NODE}:not(.tstl-event-type-pointer).active`] = `color:${theme.background}; background-color:${theme.active}`
        _is[`${Selector.TIMELINE_EVENT_NODE}:hover`] = `color:${theme.background}; background-color:${theme.active}`
        _is[`${Selector.TIMELINE_EVENT_NODE}:hover::after`] = `background-color:${Timeline.hexToRgbA(theme.invertbg, 0.1)}`
        _is[`${Selector.TIMELINE_EVENT_NODE}::before`] = `color:${theme.modesttext}`
        _is[`${Selector.TIMELINE_EVENT_NODE}${Selector.VIEWER_EVENT_TYPE_POINTER}`] = `border:solid 3px ${theme.line}`
        _is[`${Selector.TIMELINE_EVENT_NODE}${Selector.VIEWER_EVENT_TYPE_POINTER}.active`] = `border-color:${theme.activeline}`
        _is[`${Selector.TIMELINE_EVENT_NODE}${Selector.VIEWER_EVENT_TYPE_POINTER}:hover`] = `border-color:${theme.activeline}`
        _is[Selector.TIMELINE_SIDEBAR] = `outline:solid 1px ${theme.offline}`
        _is[`${Selector.TIMELINE_SIDEBAR}> [class^="tstl-side-index-"]`] = `border-bottom:dotted 1px ${theme.offline}; background-color:${theme.background}; color:${theme.text}`
        _is[`${Selector.TIMELINE_SIDEBAR} ${Selector.TIMELINE_SIDEBAR_ITEM}:nth-child(odd)`] = `background-color:${theme.striped1}`
        _is[`${Selector.TIMELINE_SIDEBAR} ${Selector.TIMELINE_SIDEBAR_ITEM}:first-child`] = `border-top:solid 1px ${theme.offline}`
        _is[Selector.TIMELINE_SIDEBAR_MARGIN] = `outline:solid 1px ${theme.offline}`
        _is[`${Selector.TIMELINE_SIDEBAR_MARGIN}:first-child`] = `border-bottom:solid 1px ${theme.offline}`
        _is[`${Selector.TIMELINE_SIDEBAR_MARGIN}:last-child`] = `border-top:solid 1px ${theme.offline}`
        _is[Selector.OVERLAY] = `background-color:${Timeline.hexToRgbA(theme.background, 0.65)} !important`
        _is[`${Selector.OVERLAY}:nth-child(odd)`] = `background-color:${Timeline.hexToRgbA(theme.striped1, 0.45)} !important`
        _os[`${Selector.VIEWER_EVENT_TITLE},${Selector.VIEWER_EVENT_CONTENT}`] = `color:${theme.text}`
        _os[`${Selector.VIEWER_EVENT_TITLE}> .event-content`] = `color:${theme.offtext}`
        _os[Selector.VIEWER_EVENT_META] = `color:${theme.offtext}`
        _is[Selector.PRESENT_TIME_MARKER] = `border-left:dotted 1px ${theme.marker}`
        _is[`${Selector.PRESENT_TIME_MARKER}::before,${Selector.PRESENT_TIME_MARKER}::after`] = `background-color:${theme.marker}`
        _is[`${Selector.LOADER_ITEM} span`] = `background:${Timeline.hexToRgbA(theme.text, 0.15)}`
        _os['@keyframes loader'] = `0%{background:${Timeline.hexToRgbA(theme.text, 0.15)}}25%{background:${Timeline.hexToRgbA(theme.text, 0.15)}}50%{background:${Timeline.hexToRgbA(theme.text, 0.15)}}100%{background:${Timeline.hexToRgbA(theme.text, 0.15)}}`

        // Loop through the inline styles object and generate the CSS text
        for (let _prop of Object.keys(_is)) {
            cssText += `${selector} ${_prop}{${_is[_prop]}}`;
        }
        // Loop through the other styles object and generate the CSS text
        for (let _prop of Object.keys(_os)) {
            cssText += `${_prop}{${_os[_prop]}}`;
        }

        // Assign the generated CSS text to the style tag
        styleTag.textContent = cssText;
        // Append the style tag to the head of the document
        document.head.appendChild(styleTag);
    }


    // ===============================
    // Utilities
    // Data Processing
    // ===============================

    /**
     * Data Processing:
     * Sort an array by value of specific property (Note: destructive method)
     * Usage: array.sort( this.compareValues( property, order ) )
     *
     * @param key - The property to sort by (required)
     * @param order - The order to sort in (optional; defaults to 'asc')
     *
     * @return A comparator function for use with Array.prototype.sort()
     */
    compareValues(key: string, order: 'asc' | 'desc' = 'asc'): (a: any, b: any) => number {
        return (a, b) => {
            // If either object does not have the key property, consider them equal for sorting purposes
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            // Get the values of the key property from a and b
            // If the values are strings, convert them to uppercase for case-insensitive sorting
            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

            // Compare varA and varB
            // If varA is greater than varB, comparison will be 1
            // If varA is less than varB, comparison will be -1
            // If varA and varB are equal, comparison will be 0
            let comparison = (varA > varB) ? 1 : (varA < varB) ? -1 : 0;

            // If order is 'desc', reverse the comparison result to sort in descending order
            return (order === 'desc') ? comparison * -1 : comparison;
        };
    }

    /**
     * Data Processing:
     * Verify whether is allowed scale in the plugin.
     * Then retrieves that values of intervals on the scale if the scale is available and given arguments of date range.
     * And return the base millisecond of scale if it is not the variable length scale (isVLS to false)
     *
     * @param scale - The scale
     * @param begin - Begin of range as unit millisecs that got by `Date.getTime()`
     * @param end - End of range as unit millisecs that got by `Date.getTime()`
     * @param isVLS - Whether is variable length scale, defaults to false
     *
     * @return mixed (boolean if no arguments are given after the first argument)
     */
    verifyScale(scale: Scale, begin: number | Date = null, end: number | Date = null, isVLS: boolean = false): number | { [key: number]: number } | boolean {
        let _ms: number = -1;
        let isBool: boolean = Timeline.isEmpty(begin) || Timeline.isEmpty(end);
        let retval: { [key: number]: number } | number = isVLS ? this.diffDate(begin, end, scale) : null;

        switch (scale) {
            case Scale.MILLISECOND:
                _ms = 1;
                break;
            case Scale.SECOND:
                _ms = 1000;
                break;
            case Scale.MINUTE:
                _ms = 60 * 1000;
                break;
            case Scale.QUARTER_HOUR:
                _ms = 15 * 60 * 1000;
                break;
            case Scale.HALF_HOUR:
                _ms = 30 * 60 * 1000;
                break;
            case Scale.HOUR:
                _ms = 60 * 60 * 1000;
                break;
            case Scale.WEEKDAY:
            case Scale.DAY:
                _ms = 24 * 60 * 60 * 1000;
                break;
            case Scale.WEEK:
                _ms = 7 * 24 * 60 * 60 * 1000;
                break;
            case Scale.MONTH:
                _ms = 30.44 * 24 * 60 * 60 * 1000;
                break;
            case Scale.YEAR:
                _ms = 365.25 * 24 * 60 * 60 * 1000;
                break;
            case Scale.LUSTRUM:
                _ms = 157788000 * 1000;
                break;
            case Scale.DECADE:
                _ms = 315576000 * 1000;
                break;
            case Scale.CENTURY:
                _ms = 3155760000 * 1000;
                break;
            case Scale.MILLENNIUM:
                _ms = 3155760000 * 10 * 1000;
                break;
            default:
                this.error(`Specified an invalid "${scale}" scale.`, 'warn');
                _ms = -1;
        }
        if (isBool) {
            return _ms > 0;
        } else {
            return isVLS ? retval : _ms;
        }
    }

    /**
     * Data Processing:
     * @private: Verify the display period of the timeline does not exceed the maximum renderable range
     * @param scale - The scale of the timeline (defaults to this._config.scale)
     * @return boolean - Returns true if the timeline does not exceed the maximum renderable range, false otherwise
     */
    private verifyMaxRenderableRange(scale: Scale = this.config.scale): boolean {
        if (this.config.disableLimitter) {
            this.debug(`The scale limiter has been OFF::${scale}: ${this.instanceProps.grids} / ${LimitScaleGrids[scale]}`);
            return true;
        } else {
            this.debug(`Verify max renderable range::${scale}: ${this.instanceProps.grids} / ${LimitScaleGrids[scale]}`);
            return this.instanceProps.grids <= LimitScaleGrids[scale];
        }
    }

    /**
     * Data Processing
     * @private: Filter to aggregate the grid width of the variable length scale
     *
     * @param targetScale - a scale of one line on the ruler
     * @return An object of actual grid widths for each individual scale on the set scale of the timeline container
     */
    private filterVariableScale(targetScale: Scale): object {
        const opts: Config = this.config;
        const props: Instance = this.instanceProps;
        const scales = props.variableScale;
        const retObj = {};
        let baseVar: any;

        const unit = ScaleUnits[opts.scale];
        if (unit) {
            baseVar = props.scale / unit;
        } else {
            baseVar = props.scale / 1; // default to milliseconds
        }

        for (let dt of Object.keys(scales)) {
            let gridSize = Timeline.numRound((scales[dt] * props.scaleSize) / baseVar, 2);
            let newKey = null;
            let arr = dt.split(',');
            let tmpDt = Scale.WEEK == opts.scale ? this.getFirstDayOfWeek(parseInt(arr[1], 10), parseInt(arr[0], 10)) : this.getCorrectDatetime(arr[0]);
            let temp;

            switch (targetScale) {
                case Scale.MILLENNIUM:
                    newKey = Math.ceil(tmpDt.getFullYear() / 1000);
                    break;
                case Scale.CENTURY:
                    newKey = Math.ceil(tmpDt.getFullYear() / 100);
                    break;
                case Scale.DECADE:
                    newKey = Math.ceil(tmpDt.getFullYear() / 10);
                    break;
                case Scale.LUSTRUM:
                    newKey = Math.ceil(tmpDt.getFullYear() / 5);
                    break;
                case Scale.YEAR:
                    newKey = `${tmpDt.getFullYear()}`;
                    break;
                case Scale.MONTH:
                    newKey = `${tmpDt.getFullYear()}/${tmpDt.getMonth() + 1}`;
                    break;
                case Scale.WEEK:
                    temp = this.getWeek(tmpDt);
                    newKey = `${tmpDt.getFullYear()},${temp}`;
                    break;
                case Scale.WEEKDAY:
                    temp = tmpDt.getDay();
                    newKey = `${tmpDt.getFullYear()}/${tmpDt.getMonth() + 1}/${tmpDt.getDate()},${temp}`;
                    break;
                case Scale.DAY:
                    newKey = `${tmpDt.getFullYear()}/${tmpDt.getMonth() + 1}/${tmpDt.getDate()}`;
                    break;
                case Scale.HOUR:
                    newKey = `${tmpDt.getFullYear()}/${tmpDt.getMonth() + 1}/${tmpDt.getDate()} ${tmpDt.getHours()}`;
                    break;
                case Scale.MINUTE:
                    newKey = `${tmpDt.getFullYear()}/${tmpDt.getMonth() + 1}/${tmpDt.getDate()} ${tmpDt.getHours()}:${tmpDt.getMinutes()}`;
                    break;
                case Scale.SECOND:
                    newKey = `${tmpDt.getFullYear()}/${tmpDt.getMonth() + 1}/${tmpDt.getDate()} ${tmpDt.getHours()}:${tmpDt.getMinutes()}:${tmpDt.getSeconds()}`;
                    break;
                default:
                    newKey = `${tmpDt.getFullYear()}/${tmpDt.getMonth() + 1}/${tmpDt.getDate()} ${tmpDt.getHours()}:${tmpDt.getMinutes()}:${tmpDt.getSeconds()}.${tmpDt.getMilliseconds()}`;
                    break;
            }

            if (Object.hasOwnProperty.call(retObj, newKey)) {
                retObj[newKey] += gridSize;
            } else {
                retObj[newKey] = gridSize;
            }
        }

        return retObj;
    }

    /**
     * Data Processing:
     * Retrieve one higher scale
     *
     * @param scale - The current scale
     *
     * @return Scale - The matched higher scale
     */
    getHigherScale(scale: Scale): Scale {
        return this.findScale(scale, 'higher') as Scale;
    }

    /**
     * Data Processing
     * Retrieve one lower scale
     *
     * @param scale - The current scale
     *
     * @return Scale - The matched lower scale
     */
    getLowerScale(scale: Scale): Scale {
        return this.findScale(scale, 'lower') as Scale;
    }

    /**
     * Data Processing:
     * Find scale(s) matched the specified condition
     * @private
     * @param base_scale - The base scale
     * @param condition - The condition to match
     *
     * @return Scale | Scale[] - The matched scale(s)
     */
    private findScale(base_scale: Scale, condition: string): Scale | Scale[] {
        let scalePatternMap: Scale[] = [
            Scale.MILLISECOND,
            Scale.SECOND,
            Scale.MINUTE,
            Scale.HOUR,
            Scale.DAY,
            Scale.WEEK,
            Scale.MONTH,
            Scale.YEAR,
            Scale.LUSTRUM,
            Scale.DECADE,
            Scale.CENTURY,
            Scale.MILLENNIUM,
            Scale.CUSTOM
        ];

        let index: number = scalePatternMap.indexOf(base_scale);
        let narrows: Scale[];

        switch (true) {
            case /^higher$/i.test(condition):
                index = scalePatternMap[(index + 1)] ? index + 1 : index;
                return scalePatternMap[index];
            case /^higher\s?all$/i.test(condition):
                narrows = scalePatternMap.slice(index + 1);
                if (narrows.includes(Scale.DAY)) {
                    narrows.push(Scale.WEEK);
                }
                return narrows;
            case /^lower$/i.test(condition):
                index = scalePatternMap[(index - 1)] ? index - 1 : index;
                return scalePatternMap[index];
            case /^lower\s?all$/i.test(condition):
                narrows = scalePatternMap.slice(0, index);
                if (narrows.includes(Scale.DAY)) {
                    narrows.push(Scale.WEEK);
                }
                return narrows;
            default:
                return scalePatternMap[index];
        }
    }

    /**
     * Data Processing:
     * Retrieve the pluggable datetime as milliseconds depend on specific preset keyword
     * @private
     * @param key - Preset keywords 'current', 'auto' or seed of datetime
     * @param roundType - Optional parameter, defaults to ''
     * @return number - Milliseconds as valid datetime
     */
    private getPluggableDatetime(key: number | string | Date, roundType: string = ''): Date {
        let opts: Config = this.config;
        let date: Date | null = null;

        /**
         * Get the first date of the given scale from the provided date
         * @param dateObj - The date to start from
         * @param scale - The scale to use
         * @return Date - The first date of the given scale
         */
        const getFirstDate = (dateObj: Date, scale: Scale): Date => {
            let fullYear = dateObj.getFullYear();
            let remapYear = fullYear >= 0 && Math.abs(fullYear) < 100;
            let tmpDate: Date;

            switch (scale) {
                case Scale.MILLENNIUM:
                case Scale.CENTURY:
                case Scale.DECADE:
                case Scale.LUSTRUM:
                case Scale.YEAR:
                    tmpDate = new Date(fullYear, 0, 1);
                    break;
                case Scale.MONTH:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), 1);
                    break;
                case Scale.WEEK:
                case Scale.DAY:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate());
                    break;
                case Scale.QUARTER_HOUR:
                case Scale.HALF_HOUR:
                case Scale.HOUR:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours());
                    break;
                case Scale.MINUTE:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes());
                    break;
                case Scale.SECOND:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds());
                    break;
                default:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds(), dateObj.getMilliseconds());
                    break;
            }
            if (remapYear) {
                tmpDate.setFullYear(fullYear);
            }
            return tmpDate;
        };

        /**
         * Get the last date of the given scale from the provided date
         * @param dateObj - The date to start from
         * @param scale - The scale to use
         * @return Date - The last date of the given scale
         */
        const getLastDate = (dateObj: Date, scale: Scale): Date => {
            let fullYear = dateObj.getFullYear();
            let remapYear = fullYear >= 0 && Math.abs(fullYear) < 100;
            let offset = fullYear >= 0 ? -1 : 1;
            let tmpDate: Date;

            switch (scale) {
                case Scale.MILLENNIUM:
                case Scale.CENTURY:
                case Scale.DECADE:
                case Scale.LUSTRUM:
                case Scale.YEAR:
                    tmpDate = new Date(fullYear + 1, 0, 1);
                    remapYear = (fullYear + 1) >= 0 && Math.abs(fullYear + 1) < 100;
                    offset = (fullYear + 1) >= 0 ? -1 : 1;
                    break;
                case Scale.MONTH:
                    tmpDate = new Date(fullYear, dateObj.getMonth() + 1, 1);
                    break;
                case Scale.WEEK:
                case Scale.DAY:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate() + 1);
                    break;
                case Scale.QUARTER_HOUR:
                case Scale.HALF_HOUR:
                case Scale.HOUR:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours() + 1);
                    break;
                case Scale.MINUTE:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes() + 1);
                    break;
                case Scale.SECOND:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds() + 1);
                    break;
                default:
                    tmpDate = new Date(fullYear, dateObj.getMonth(), dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds(), dateObj.getMilliseconds() + 1);
                    break;
            }
            if (remapYear) {
                tmpDate.setFullYear(fullYear);
            }
            return new Date(tmpDate.getTime() + offset);
        }

        switch (key) {
            case 'current':
                // now date
                date = new Date();
                break;
            case 'auto':
                let autoRange = opts.range && parseInt(opts.range.toString()) > 0 ? parseInt(opts.range.toString(), 10) : 3;
                let higherScale = opts.scale === Scale.DAY || opts.scale === Scale.WEEK ? Scale.MONTH : this.getHigherScale(opts.scale);

                if (opts.startDatetime.toString().toLowerCase() === 'current' || opts.startDatetime.toString().toLowerCase() === 'current') {
                    date = getFirstDate(new Date(), opts.scale);
                } else {
                    date = this.getCorrectDatetime(opts.startDatetime);
                }

                date = this.modifyDate(date, autoRange, higherScale);
                break;
            default:
                date = this.getCorrectDatetime(key);
                break;
        }

        if (!Timeline.isEmpty(roundType)) {
            if (roundType === 'first') {
                date = getFirstDate(date, opts.scale);
            } else if (roundType === 'last') {
                date = getLastDate(date, opts.scale);
            }
        }

        return date;
    }

    /**
     * Data Processing:
     * @private: Retrieve the pluggable parameter as an object
     * @param strLikeParams - The string to parse into an object
     * @return object - The parsed object
     */
    private getPluggableParams(strLikeParams: string): Partial<EventParams> {
        let params: object = {};

        if (typeof strLikeParams === 'string' && strLikeParams) {
            try {
                params = JSON.parse(strLikeParams);
                if ('extend' in params && typeof params['extend'] === 'string') {
                    params['extend'] = JSON.parse(params['extend']);
                }
            } catch (e) {
                this.error('Can not parse to object therefore invalid param.', 'warn');
            }
        }
        return params;
    }

    /**
     * Data Processing:
     * @private: Retrieve the pluggable rows of the timeline
     */
    private getPluggableRows(): number {
        const config: Config = this.config; // Assuming ConfigType is the type of _config
        let fixed_rows: string | number = Timeline.supplement<any>('auto', config.numRows, Timeline.validateNumeric);

        if (fixed_rows === 'auto') {
            fixed_rows = config.rows.length;
        }
        return parseInt(fixed_rows.toString()) > 0 ? parseInt(fixed_rows.toString()) : 1;
    }

    /**
     * Data Processing:
     * Merges two objects deeply as polyfill for instead "$.extend(true,target,source)"
     * @param target - The target object
     * @param source - The source object
     * @return The merged object
     */
    static mergeDeep(target: Partial<Config>, source: Partial<Config>): Config {
        let output: Partial<Config> = Object.assign({}, target);

        if (Timeline.isObject(target) && Timeline.isObject(source)) {
            for (const key of Object.keys(source)) {
                if (Timeline.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = Timeline.mergeDeep(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            }
        }
        return output as Config;
    }

    /**
     * Data Processing:
     * Generate a unique ID.
     * 
     * Generates a unique ID by concatenating the current timestamp in milliseconds (converted to a hexadecimal string) 
     * and a random number (multiplied by the provided digit and rounded down to the nearest whole number, then converted to a hexadecimal string).
     * @param digit - The number to multiply with random number for additional randomness.
     * @returns The unique ID.
     */
    static generateUniqueID(digit: number = 1000): string {
        return new Date().getTime().toString(16) + Math.floor(digit * Math.random()).toString(16);
    }

    /**
     * Data Processing:
     * Round a number with specific digit.
     *
     * @param number - The number to round.
     * @param digit - The number of digits to round to.
     * @param round_type - The type of rounding to perform.
     * @returns The rounded number.
     */
    static numRound(number: number, digit: number = 0, round_type: string = 'round'): number {
        digit = Timeline.supplement<number>(0, digit, Timeline.validateNumeric);
        let _pow = Math.pow(10, digit);

        switch (round_type.toLowerCase()) {
            case 'ceil':
                return Math.ceil(number * _pow) / _pow;
            case 'floor':
                return Math.floor(number * _pow) / _pow;
            case 'round':
            default:
                return Math.round(number * _pow) / _pow;
        }
    }

    /**
     * Rounds a given coordinate to the nearest grid point.
     * 
     * @param x - The coordinate to be rounded
     * @param n - The scale of the grid. Each grid cell is n pixels.
     * @return number - The rounded coordinate
     */
    static roundToGrid(x: number, n: number): number {
        return Math.round(x / n) * n;
    }

    /**
     * Rounds a given date to the nearest specified scale.
     * 
     * @param date - The date to be rounded
     * @param scale - The scale to which the date should be rounded. 
     *                Can be DAY, HOUR, HALFHOUR, QUARTERHOUR, TWENTYMINUTES, TENMINUTES, FIVEMINUTES, or MINUTE.
     * @return Date - The rounded date
     */
    static roundDate(date: Date, scale: RoundScale): Date {
        // Create a new Date object from the original date's timestamp
        let roundedDate = new Date(date.getTime());

        // Round the date to the nearest specified scale
        switch (scale) {
            case RoundScale.DAY:
                // Round to the nearest day
                roundedDate.setHours(0, 0, 0, 0);
                break;
            case RoundScale.HOUR:
                // Round to the nearest hour
                roundedDate.setMinutes(0, 0, 0);
                break;
            case RoundScale.HALFHOUR:
                // Round to the nearest half hour
                roundedDate.setMinutes(Math.round(date.getMinutes() / 30) * 30, 0, 0);
                break;
            case RoundScale.QUARTERHOUR:
                // Round to the nearest quarter hour
                roundedDate.setMinutes(Math.round(date.getMinutes() / 15) * 15, 0, 0);
                break;
            case RoundScale.TWENTYMINUTES:
                // Round to the nearest 20 minutes
                roundedDate.setMinutes(Math.round(date.getMinutes() / 20) * 20, 0, 0);
                break;
            case RoundScale.TENMINUTES:
                // Round to the nearest 10 minutes
                roundedDate.setMinutes(Math.round(date.getMinutes() / 10) * 10, 0, 0);
                break;
            case RoundScale.FIVEMINUTES:
                // Round to the nearest 5 minutes
                roundedDate.setMinutes(Math.round(date.getMinutes() / 5) * 5, 0, 0);
                break;
            case RoundScale.MINUTE:
                // Round to the nearest minute
                roundedDate.setSeconds(0, 0);
                break;
        }

        // Return the rounded date
        return roundedDate;
    }

    /**
     * Data Processing:
     * Get locale string based on the given date seed and scale.
     * @private
     * @param date_seed - The date seed to use.
     * @param scale - The scale to use (default is '').
     * @param locales - The locales to use (default is 'en-US').
     * @param options - The options to use (default is {}).
     * @returns The locale string.
     */
    private getLocaleString(
        date_seed: Date | string,
        scale: Scale,
        locales: string | string[] = 'en-US',
        options: Intl.DateTimeFormatOptions = {}): string {

        // Check if toLocaleString supports locales
        const toLocaleStringSupportsLocales = (): boolean => {
            try {
                new Date().toLocaleString('i');
            } catch (e) {
                return e.name === "RangeError";
            }
            return false;
        };

        let is_toLocalString: boolean = toLocaleStringSupportsLocales();
        let locale_string: string | number = '';
        let _options: Record<string, unknown> = {}; // options for built-in method only
        let _has_options: boolean = false;

        // Function to get ordinal of a number
        const getOrdinal = (n: number): string => {
            let s: string[] = ['th', 'st', 'nd', 'rd'],
                v: number = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };

        // Function to get zero-filled string
        const getZerofill = (num: number, digit: number = 4): string => {
            let strDuplicate = (n: number, str: string): string => Array(n + 1).join(str),
                zero: string = strDuplicate(digit - String(num).length, '0');
            return String(num).length == digit ? String(num) : (zero + num).substr(num * -1);
        };

        let _prop: string, _temp: any, _str: string, _num: number | string, _year: number, _month: number, _week: number;

        if (Timeline.isEmpty(date_seed)) {
            return;
        }

        locales = Timeline.supplement<string | string[]>('en-US', locales, Timeline.validateString);
        options = Timeline.supplement<any>({}, options, Timeline.validateObject);

        for (_prop in options) {
            if (/^(localeMatcher|timeZone|hour12|formatMatcher|era|timeZoneName)$/.test(_prop)) {
                _options[_prop] = options[_prop];
            }
        }

        if (Object.keys(_options).length > 0) {
            _has_options = true;
        }

        // Function to handle scale (multiple years)
        const handleScale = (scaleValue: number) => {
            _year = this.getCorrectDatetime(date_seed).getFullYear();
            _temp = scaleValue;
            _num = Timeline.numRound(_year / _temp, 0, 'ceil');

            // Check if the options object has a property equal to the scale and if it's value is 'ordinal'
            if (Object.hasOwnProperty.call(options, scale) && options[scale] === 'ordinal') {
                locale_string = getOrdinal(_num);
            } else {
                locale_string = _num;
            }
        };

        // Switch statement to handle different scales
        switch (scale) {
            case Scale.MILLENNIUM:
                handleScale(1000);
                break;
            case Scale.CENTURY:
                handleScale(100);
                break;
            case Scale.DECADE:
                handleScale(10);
                break;
            case Scale.LUSTRUM:
                handleScale(5);
                break;
            case Scale.YEAR:
                // Allowed value as format: 'numeric', '2-digit', 'zerofill'
                _temp = this.getCorrectDatetime(date_seed);
                _year = _temp.getFullYear();

                if (is_toLocalString) {
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    if (options.hasOwnProperty(scale)) {
                        if (/^(numeric|2-digit)$/i.test(options[scale])) {
                            _options.year = options[scale];
                            locale_string = _temp.toLocaleDateString(locales, _options);
                        }
                        else if (/^zerofill$/i.test(options[scale])) {
                            locale_string = _year.toString().length > 3 ? _year.toString() : getZerofill(_year, 4);
                            if (_has_options) {
                                locale_string = _temp.toLocaleDateString(locales, _options).replace(_year.toString(), locale_string);
                            }
                        }
                        else {
                            locale_string = _year.toString();
                        }
                    } else if (_has_options) {
                        locale_string = _temp.toLocaleDateString(locales, _options);
                    }
                }
                locale_string = Timeline.isEmpty(locale_string) ? _year.toString() : locale_string;
                break;
            case Scale.MONTH:
                // Allowed value as format: 'numeric', '2-digit', 'narrow', 'short', 'long'                
                _temp = this.getCorrectDatetime(date_seed, true);
                _month = _temp.getMonth() + 1;

                if (is_toLocalString) {
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    if (options.hasOwnProperty(scale)) {
                        if (/^(numeric|2-digit|narrow|short|long)$/i.test(options[scale])) {
                            _options.month = options[scale];
                            locale_string = _temp.toLocaleString(locales, _options);
                        } else {
                            locale_string = _month.toString();
                        }
                    } else if (_has_options) {
                        locale_string = _temp.toLocaleDateString(locales, _options);
                    }
                }
                locale_string = Timeline.isEmpty(locale_string) ? _month.toString() : locale_string;
                break;
            case Scale.WEEK:
                // Check if date_seed is a string and matches the given pattern
                if (typeof date_seed === 'string' && /^(.*)+,\d{1,2}$/.test(date_seed)) {
                    [_str, _num] = date_seed.split(',');
                    _week = parseInt(_num, 10);
                } else {
                    _week = this.getWeek(this.getCorrectDatetime(date_seed));
                }

                // Check if options has a property scale and if it's value is 'ordinal'
                if (options.hasOwnProperty(scale) && options[scale] === 'ordinal') {
                    locale_string = getOrdinal(_week);
                } else {
                    locale_string = _week;
                }
                break;
            case Scale.WEEKDAY:
                // Allowed value as format: 'narrow', 'short', 'long'
                // Check if date_seed is a string and matches the given pattern
                if (typeof date_seed === 'string' && /^(.*)+,\d{1}$/.test(date_seed)) {
                    [_str, _num] = date_seed.split(',');
                    _temp = this.getCorrectDatetime(_str, true);
                    _num = parseInt(_num, 10);
                } else {
                    _temp = this.getCorrectDatetime(date_seed, true);
                }

                if (is_toLocalString) {
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    if (options.hasOwnProperty(scale)) {
                        if (/^(narrow|short|long)$/i.test(options[scale])) {
                            _options.weekday = options[scale];
                            locale_string = _temp.toLocaleString(locales, _options);
                        }
                    } else if (_has_options) {
                        locale_string = _temp.toLocaleDateString(locales, _options);
                    }
                }

                if (Timeline.isEmpty(locale_string)) {
                    _str = _temp.toLocaleDateString(locales, { weekday: 'long' });
                    if (/^short$/i.test(options[scale])) {
                        locale_string = _str.substring(0, 3);
                    } else if (/^long$/i.test(options[scale])) {
                        locale_string = _str;
                    } else {
                        locale_string = _str.substring(0, 1);
                    }
                }
                break;
            case Scale.DAY:
                // Allowed value as format: 'numeric', '2-digit', 'ordinal'
                _temp = this.getCorrectDatetime(date_seed, true);

                if (is_toLocalString) {
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    if (options.hasOwnProperty(scale)) {
                        if (/^(numeric|2-digit)$/i.test(options[scale])) {
                            _options.day = options[scale];
                            locale_string = _temp.toLocaleString(locales, _options);
                        } else if (/^ordinal$/i.test(options[scale])) {
                            locale_string = getOrdinal(parseInt(_temp.getDate().toString(), 10));
                        }
                    } else if (_has_options) {
                        locale_string = _temp.toLocaleDateString(locales, _options);
                    }
                }
                locale_string = Timeline.isEmpty(locale_string) ? _temp.getDate() : locale_string;
                break;
            case Scale.HOUR:
            case Scale.HALF_HOUR:
            case Scale.QUARTER_HOUR:
                // Allowed value as format: 'numeric', '2-digit', 'fulltime'
                _temp = this.getCorrectDatetime(date_seed);

                if (is_toLocalString) {
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    if (Object.hasOwnProperty.call(options, scale)) {
                        // if (/^(numericOnly)$/i.test(options[scale])) {
                        //     _options.hour = options[scale];
                        // }
                        if (/^(numeric|2-digit)$/i.test(options[scale])) {
                            _options.hour = options[scale];
                        } else if (/^fulltime$/i.test(options[scale])) {
                            _options.hour = 'numeric';
                            _options.minute = 'numeric';
                        }
                        // Bug FIX: German localization adds ' Uhr'
                        locale_string = _temp.toLocaleTimeString(locales, _options).replace(' Uhr', '');
                    } else if (Object.keys(_options).length > 0) {
                        locale_string = _temp.toLocaleTimeString(locales, _options).replace(' Uhr', '');;
                    }
                }
                locale_string = Timeline.isEmpty(locale_string) ? _temp.getHours().toString() : locale_string;
                break;
            case Scale.MINUTE:
                // Allowed value as format: 'numeric', '2-digit', 'fulltime'
                _temp = this.getCorrectDatetime(date_seed);

                if (is_toLocalString) {
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    if (options.hasOwnProperty(scale)) {
                        if (/^(numeric|2-digit)$/i.test(options[scale])) {
                            _options.minute = options[scale];
                        } else if (/^fulltime$/i.test(options[scale])) {
                            _options.hour = 'numeric';
                            _options.minute = 'numeric';
                        }
                        locale_string = _temp.toLocaleString(locales, _options);
                    } else if (_has_options) {
                        locale_string = _temp.toLocaleString(locales, _options);
                    }
                }
                locale_string = Timeline.isEmpty(locale_string) ? _temp.getMinutes() : locale_string;
                break;
            case Scale.SECOND:
                // Allowed value as format: 'numeric', '2-digit', 'fulltime'
                _temp = this.getCorrectDatetime(date_seed);

                if (is_toLocalString) {
                    // Check if the timeZone option is set to UTC and adjust the date accordingly
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    // Check if the scale option is set and adjust the date format accordingly
                    if (options.hasOwnProperty(scale)) {
                        if (/^(numeric|2-digit)$/i.test(options[scale])) {
                            _options.second = options[scale];
                        } else if (/^fulltime$/i.test(options[scale])) {
                            _options.hour = 'numeric';
                            _options.minute = 'numeric';
                            _options.second = 'numeric';
                        }
                        locale_string = _temp.toLocaleString(locales, _options);
                    } else if (_has_options) {
                        locale_string = _temp.toLocaleString(locales, _options);
                    }
                }
                // Check if the locale_string is empty and set it to the seconds of the date if it is
                locale_string = Timeline.isEmpty(locale_string) ? _temp.getSeconds() : locale_string;
                break;
            case Scale.MILLISECOND:
                // Allowed value as format: 'narrow', 'numeric'
                _temp = this.getCorrectDatetime(date_seed);

                // Check if the scale option is set
                if (options.hasOwnProperty(scale)) {
                    // Check if the timeZone option is set to UTC and adjust the date accordingly
                    if (options.timeZone?.toLowerCase() === 'utc') {
                        _temp = this.modifyDate(_temp, -1 * _temp.getTimezoneOffset(), Scale.MINUTE);
                    }
                    // Check if the scale option is set to 'numeric' and adjust the locale_string accordingly
                    if (/^numeric$/i.test(options[scale])) {
                        locale_string = parseInt(_temp.getMilliseconds().toString(), 10);
                    } else {
                        locale_string = getZerofill(parseInt(_temp.getMilliseconds().toString(), 10), 3);
                    }
                }
                // Check if the locale_string is empty and set it to the milliseconds of the date if it is
                locale_string = Timeline.isEmpty(locale_string) ? _temp.getMilliseconds() : locale_string;
                break;
            default:
                // Allowed value as format: 'narrow'
                _temp = this.getCorrectDatetime(date_seed);

                // Check if options are provided
                if (_has_options) {
                    // Convert the date to a locale string using the provided options
                    locale_string = _temp.toLocaleString(locales, _options);
                } else {
                    // Convert the date to a string using the default toString method
                    locale_string = _temp.toString();
                }
                break;
        }
        return locale_string.toString();
    }

    /**
     * Data Processing:
     * Method to get week number as extension of Date object
     * @private
     * @param datetime - Date object filtered by getCorrectDatetime method
     *
     * @return number | boolean - Returns integer as week number when given valid argument, or false if failed
     */
    private getWeek(datetime: Date | null): number | null {
        // Check if datetime is empty
        if (!datetime) {
            return;
        }

        // Get the first day of the week from the configuration, default to 1 (Monday) if not set
        const firstDayIndex: number = this.config.firstDayOfWeek || 1;

        // Get the correct datetime for the target date and the first day of the year
        const targetDate: Date = this.getCorrectDatetime(datetime);
        const firstDayOfYear: Date = this.getCorrectDatetime(new Date(targetDate.getFullYear(), 0, 1));

        // Convert the target date to a string
        const targetDateStr: string = targetDate.toDateString();

        // Initialize the week number and the date to check
        let weekNumber: number = 1;
        let checkDate: Date = firstDayOfYear;

        // Loop through the days of the year
        for (let i = 0; i < 367; i++) {
            // Modify the check date after the first iteration
            if (i > 0) {
                checkDate = this.modifyDate(firstDayOfYear, i, Scale.DAY);
            }

            // Increment the week number if the check date is the first day of the week
            if (checkDate.getDay() === firstDayIndex) {
                weekNumber++;
            }

            // Break the loop if the check date is the target date
            if (checkDate.toDateString() === targetDateStr) {
                break;
            }
        }

        // Return the week number
        return weekNumber;
    }

    /**
     * Data Processing:
     * Retrieve a first day of the week from a week number.
     * Note: added support for daylight savings time but needs improvement as performance has dropped.
     * @private
     * @param week_number - Week number (required)
     * @param year - Year (optional; defaults to current year)
     *
     * @return Date object as the first day of week when given valid arguments, or false if failed
     */
    private getFirstDayOfWeek(week_number: number, year?: number): Date | null {
        // Return false if week_number is not provided
        if (Timeline.isEmpty(week_number)) {
            return;
        }

        // Default to current year if year is not provided
        year = Timeline.isEmpty(year) ? new Date().getFullYear() : parseInt(year.toString(), 10);

        const firstDayIndex = this.config.firstDayOfWeek;
        const firstDayOfYear = this.getCorrectDatetime(`${year}/1/1`);
        let _weekday = firstDayOfYear.getDay();
        let _keyDayOfWeek = firstDayOfYear;
        let _offset = _weekday > firstDayIndex ? _weekday - firstDayIndex : 0;
        let _weekNumber = _offset <= 0 ? 0 : 1;
        let hitDate: Date;

        if (_weekNumber === week_number && _weekday === firstDayIndex) {
            hitDate = firstDayOfYear;
        } else {
            for (let i = _offset; i < _offset + 7; i++) {
                if (i > _offset) {
                    _keyDayOfWeek = this.modifyDate(firstDayOfYear, i, Scale.DAY);
                }
                if (_keyDayOfWeek.getDay() === firstDayIndex) {
                    _weekNumber++;
                    break;
                }
            }
            if (_weekNumber === week_number) {
                hitDate = _keyDayOfWeek;
            } else {
                hitDate = this.modifyDate(_keyDayOfWeek, (week_number - _weekNumber) * 7, Scale.DAY);
            }
        }

        return hitDate;
    }

    /**
     * Data Processing:
     * This method is able to get the correct datetime instead of built in "new Date".
     * That is remapping to correct year if the year is 0 - 99, and supporting years BCE.
     * @private
     * @param datetime - allowed an integer as milliseconds, a string as like datetime or an object instance of Date
     * @param adjustTimeZoneDiff - optional; defaults to false
     *
     * @return Date Object, or null if failed
     */
    private getCorrectDatetime(datetime: number | string | Date, adjustTimeZoneDiff: boolean = false): Date | null {

        /**
         * Normalize the date string to a format that can be parsed by Date.parse
         *
         * @param dateString - a string representing a date and time
         *
         * @return String Object
         */
        const normalizeDate = (dateString: string): string => {
            let isMinus: boolean = /^-/.test(dateString);
            let _m: string = isMinus ? '-' : '';
            let _d: string;

            if (isMinus) {
                dateString = dateString.replace(/^-/, '');
            }
            // for Safari and Firefox
            _d = dateString.replace(/-/g, '/');
            switch (true) {
                case /^\d{1,4}\/\d{1,2}$/.test(_d):
                    return `${_m}${_d}/1`;
                case /^.+(\.\d{1,3})$/.test(_d):
                    if (isNaN(Date.parse(_d))) {
                        _d = _d.replace(RegExp.$1, '');
                    }
                    return `${_m}${_d}`;
                default:
                    return `${_m}${_d}`;
            }
        };

        /**
         * Convert a datetime string to a Date object
         *
         * @param datetime - The datetime string
         *
         * @return Date - The Date object
         */
        const getDateObject = (datetime: string): Date => {
            let _chk_str: string = normalizeDate(datetime),
                _raise: number = 0,
                _ymd: string, _his: string, _parts: string[], _date: Date;

            switch (true) {
                case /^-?\d{1,}\/\d{1,2}(|\/\d{1,2})(| \d{1,2}(|:\d{1,2}(|:\d{1,2})))$/i.test(_chk_str): {
                    [_ymd, _his] = _chk_str.split(' ');
                    _parts = _ymd.split('/');
                    if (_parts[1]) {
                        _raise = Math.floor(parseInt(_parts[1], 10) / 13);
                        _parts[1] = (parseInt(_parts[1], 10) - 1).toString(); // to month index
                    }
                    let _his_base: number[] = [0, 0, 0];
                    if (_his) {
                        _parts.push(...Object.assign(_his_base, _his.split(':')));
                    } else {
                        _parts.push(..._his_base.map(String));
                    }
                    const [year, month, day, hour, minute, second] = _parts.map(Number);
                    _date = new Date(year, month, day, hour, minute, second);
                    _date.setFullYear(year + _raise);
                    break;
                }
                case /^-?\d+$/.test(_chk_str):
                    _date = new Date(parseInt(_chk_str, 10), 0, 1, 0, 0, 0, 0);
                    break;
                default:
                    _date = new Date(_chk_str.toString());
                    break;
            }
            return _date;
        };

        let _checkDate: Date;

        // Check the type of the datetime parameter and assign the appropriate Date object to _checkDate
        switch (typeof datetime) {
            case 'number':
                // If datetime is a number, create a new Date object using the number as the time value
                _checkDate = new Date(datetime);
                break;
            case 'string':
                // If datetime is a string, use the getDateObject function to create a Date object
                _checkDate = getDateObject(datetime);
                break;
            case 'object':
                // If datetime is an object and an instance of Date, assign it to _checkDate
                if (datetime instanceof Date) {
                    _checkDate = datetime;
                }
                break;
        }

        // Check if _checkDate is not a valid Date object
        if (isNaN(_checkDate.getTime()) || !_checkDate) {
            // Log a warning message and return null
            this.error(`"${datetime}" Cannot parse date because invalid format.`, 'warn');
            return null;
        }

        // Ensure _checkDate is a Date object
        if (!(_checkDate instanceof Date)) {
            _checkDate = new Date(_checkDate);
        }

        // Adjust for timezone difference if necessary
        if (adjustTimeZoneDiff) {
            let _utcDate: Date = new Date(_checkDate.getUTCFullYear(), _checkDate.getUTCMonth(), _checkDate.getUTCDate(), _checkDate.getUTCHours(), _checkDate.getUTCMinutes(), _checkDate.getUTCSeconds(), _checkDate.getUTCMilliseconds());
            let _tzDiff: number | any = this.diffDate(_checkDate, _utcDate);

            // If there is a timezone difference, adjust _checkDate
            if (_tzDiff != 0) {
                _checkDate = this.modifyDate((_tzDiff > 0 ? _utcDate : _checkDate), -1 * _tzDiff, Scale.MILLISECOND);
            }
        }

        return _checkDate;
    }

    /**
     * Data Processing:
     * Get the datetime shifted from the specified datetime by any fluctuation value
     * @private
     * @param datetime - a date object filtered by getCorrectDatetime method
     * @param fluctuation - an interval value to shift from given base datetime
     * @param scale - the scale of an interval value
     *
     * @return Date object when given valid argument, or false if failed
     */
    private modifyDate(datetime: Date | number | string, fluctuation: number, scale: Scale): Date {
        if (Timeline.isEmpty(datetime) || Timeline.isEmpty(fluctuation) || Timeline.isEmpty(scale) || !this.verifyScale(scale)) {
            return;
        }

        let baseDate: Date | null = this.getCorrectDatetime(datetime);
        let flct: number = Timeline.validateNumeric(0, fluctuation);
        let dateElms: number[] = [
            baseDate.getFullYear(),    // 0: year
            baseDate.getMonth(),       // 1: month (index)
            baseDate.getDate(),        // 2: day
            baseDate.getHours(),       // 3: hour
            baseDate.getMinutes(),     // 4: minute
            baseDate.getSeconds(),     // 5: second
            baseDate.getMilliseconds() // 6: millisec
        ];

        const [year, month, day, hour, minute, second, millisecond] = dateElms;
        let tmpDate: Date = new Date(year, month, day, hour, minute, second, millisecond);
        tmpDate.setFullYear(year);

        let isAdjust: boolean = false;
        let newDate: Date;

        switch (scale) {
            case Scale.MILLENNIUM:
                newDate = new Date(tmpDate.setFullYear(tmpDate.getFullYear() + (flct * 1000)));
                break;
            case Scale.CENTURY:
                newDate = new Date(tmpDate.setFullYear(tmpDate.getFullYear() + (flct * 100)));
                break;
            case Scale.DECADE:
                newDate = new Date(tmpDate.setFullYear(tmpDate.getFullYear() + (flct * 10)));
                break;
            case Scale.LUSTRUM:
                newDate = new Date(tmpDate.setFullYear(tmpDate.getFullYear() + (flct * 5)));
                break;
            case Scale.YEAR:
                newDate = new Date(tmpDate.setFullYear(tmpDate.getFullYear() + flct));
                break;
            case Scale.MONTH:
                newDate = new Date(tmpDate.setMonth(tmpDate.getMonth() + flct));
                break;
            case Scale.WEEK:
                newDate = new Date(tmpDate.setDate(tmpDate.getDate() + (flct * 7)));
                newDate.setHours(dateElms[3]);
                newDate.setMinutes(dateElms[4]);
                newDate.setSeconds(dateElms[5]);
                newDate.setMilliseconds(dateElms[6]);
                break;
            case Scale.WEEKDAY:
            case Scale.DAY:
                newDate = new Date(tmpDate.setDate(tmpDate.getDate() + flct));
                newDate.setHours(dateElms[3]);
                newDate.setMinutes(dateElms[4]);
                newDate.setSeconds(dateElms[5]);
                newDate.setMilliseconds(dateElms[6]);
                break;
            case Scale.HOUR:
                newDate = new Date(tmpDate.setTime(tmpDate.getTime() + (flct * 60 * 60 * 1000)));
                newDate.setMinutes(dateElms[4]);
                newDate.setSeconds(dateElms[5]);
                newDate.setMilliseconds(dateElms[6]);
                break;
            case Scale.MINUTE:
                newDate = new Date(tmpDate.setTime(tmpDate.getTime() + (flct * 60 * 1000)));
                newDate.setSeconds(dateElms[5]);
                newDate.setMilliseconds(dateElms[6]);
                break;
            case Scale.SECOND:
                newDate = new Date(tmpDate.setTime(tmpDate.getTime() + (flct * 1000)));
                newDate.setMilliseconds(dateElms[6]);
                break;
            default:
                newDate = new Date(tmpDate.setTime(tmpDate.getTime() + flct));
                break;
        }

        // Check if the date needs to be adjusted
        if (isAdjust) {
            // Define a specific date/time for comparison
            let divide: Date = this.getCorrectDatetime('1847/12/1 0:01:15');

            // If the base date is before the divide date and the new date is after or equal to the divide date
            if (baseDate.getTime() < divide.getTime() && newDate.getTime() >= divide.getTime()) {
                // Adjust the new date by subtracting 1 minute (60,000 milliseconds)
                newDate = new Date(newDate.setTime(newDate.getTime() - (60 * 1000)));
            }
            // If the base date is after the divide date and the new date is before or equal to the divide date
            else if (baseDate.getTime() > divide.getTime() && newDate.getTime() <= divide.getTime()) {
                // Adjust the new date by subtracting 1 minute and 15 seconds (75,000 milliseconds)
                newDate = new Date(newDate.setTime(newDate.getTime() - (75 * 1000)));
            }
        }

        return newDate;
    }

    /**
     * Data Processing:
     * @private: Cache the event data to the web storage
     */
    private saveToCache(data: EventParams[]): boolean {
        const storageEngine: StorageType = StorageType.LOCAL_STORAGE === this.config.storage ? StorageType.LOCAL_STORAGE : StorageType.SESSION_STORAGE;
        const is_available: boolean = (storageEngine in window) && ((storageEngine === StorageType.LOCAL_STORAGE ? window.localStorage : window.sessionStorage) !== null);

        if (is_available) {
            if (storageEngine === StorageType.LOCAL_STORAGE) {
                localStorage.setItem(this.selector, JSON.stringify(data));
            } else {
                sessionStorage.setItem(this.selector, JSON.stringify(data));
            }
            return true;
        } else {
            throw new TypeError(`The storage named "${storageEngine}" can not be available.`);
        }
    }

    /**
     * Updates a single EventParams object in the cache.
     *
     * @param uid - The unique identifier of the EventParams object to be updated.
     * @param newData - The new data for the EventParams object.
     * @return boolean - Returns true if the operation was successful, false otherwise.
     */
    private updateInCache(uid: string, newData: EventParams): boolean {
        // Get the current data from the cache
        const storageEngine: StorageType = StorageType.LOCAL_STORAGE === this.config.storage ? StorageType.LOCAL_STORAGE : StorageType.SESSION_STORAGE;
        const is_available: boolean = (storageEngine in window) && ((storageEngine === StorageType.LOCAL_STORAGE ? window.localStorage : window.sessionStorage) !== null);
        let data: EventParams[];

        if (is_available) {
            if (storageEngine === StorageType.LOCAL_STORAGE) {
                data = JSON.parse(localStorage.getItem(this.selector) || '[]');
            } else {
                data = JSON.parse(sessionStorage.getItem(this.selector) || '[]');
            }

            // Find the index of the EventParams object to be updated
            const index = data.findIndex(eventParams => eventParams.uid === uid);

            // If the EventParams object was found, update it
            if (index !== -1) {
                data[index] = newData;

                // Save the updated data back to the cache
                if (storageEngine === StorageType.LOCAL_STORAGE) {
                    localStorage.setItem(this.selector, JSON.stringify(data));
                } else {
                    sessionStorage.setItem(this.selector, JSON.stringify(data));
                }

                return true;
            } else {
                data[data.length] = newData;

                // Add data back to the cache
                if (storageEngine === StorageType.LOCAL_STORAGE) {
                    localStorage.setItem(this.selector, JSON.stringify(data));
                } else {
                    sessionStorage.setItem(this.selector, JSON.stringify(data));
                }

                return true;
            }
        } else {
            throw new TypeError(`The storage named "${storageEngine}" can not be available.`);
        }

        // If the EventParams object was not found or the operation was not successful, return false
        return false;
    }

    /**
     * Data Processing:
     * @private: Load the cached event data from the web storage
     */
    private loadToCache(): EventParams[] {
        const storageEngine: StorageType = StorageType.LOCAL_STORAGE === this.config.storage ? StorageType.LOCAL_STORAGE : StorageType.SESSION_STORAGE,
            isAvailable: boolean = (storageEngine in window) && ((storageEngine === StorageType.LOCAL_STORAGE ? window.localStorage : window.sessionStorage) !== null);
        let data: any = null;

        if (isAvailable) {
            if (storageEngine === StorageType.LOCAL_STORAGE) {
                data = JSON.parse(localStorage.getItem(this.selector) || '{}');
            } else {
                data = JSON.parse(sessionStorage.getItem(this.selector) || '{}');
            }
        } else {
            throw new TypeError(`The storage named "${storageEngine}" can not be available.`);
        }
        return data;
    }

    /**
     * Data Processing
     * Retrieves user argument data.
     * 
     * @param {Array} userdata - The user data to process. 
     * @returns {any} - Processed user data.
     */
    static getUserArg(userdata: any): any {
        // Check the type of the first element in the userdata array
        const firstElement = userdata[0];
        const firstElementType = typeof firstElement;

        switch (firstElementType) {
            case 'string':
            case 'number':
                // If the first element is a string or number, return it as a single-element array
                return [firstElement];

            case 'object':
                if (Timeline.isObject(firstElement)) {
                    // If the first element is an object, return a deep merged copy or an empty object
                    return Timeline.isEmpty(firstElement) ? {} : Timeline.mergeDeep({}, firstElement);
                } else {
                    // If the first element is an array, return it directly or as an empty array
                    return Timeline.isEmpty(firstElement) ? [] : firstElement;
                }

            default:
                // In other cases, return the first element directly
                return firstElement;
        }
    }

    /**
     * Splits an array of EventParams with overlapping time ranges into sublists.
     * Each sublist contains non-overlapping events.
     * @private
     * @param events - The array of EventParams to split.
     * @return An array of sublists, where each sublist contains non-overlapping EventParams.
     */
    private splitIntoNonOverlappingEventSublists(events: EventParams[]): EventParams[][] {
        // Sort the events by their start time
        const sortedEvents = events.slice().sort((a, b) => a.start - b.start);

        // Initialize the array of sublists
        const sublists: EventParams[][] = [];

        // Helper function to find a sublist where the event can be placed
        const findSublistIndex = (event: EventParams): number => {
            for (let i = 0; i < sublists.length; i++) {
                // Check if the event overlaps with any event in the current sublist
                const overlaps = sublists[i].some(subEvent => subEvent.end > event.start);
                // If there is no overlap, return the sublist index
                if (!overlaps) {
                    return i;
                }
            }
            // If no suitable sublist is found, return -1
            return -1;
        };

        // Iterate over the sorted events
        for (const event of sortedEvents) {
            // Find a sublist where this event does not overlap with existing events
            const sublistIndex = findSublistIndex(event);

            if (sublistIndex !== -1) {
                // If a suitable sublist is found, add the event to it
                sublists[sublistIndex].push(event);
            } else {
                // If no suitable sublist is found, create a new sublist with this event
                sublists.push([event]);
            }
        }

        return sublists;
    }

    /**
     * This function calculates the overlap of events within each category, 
     * after filtering the events based on a specified time range.
     * @private
     * @param {EventParams[]} events - The list of events.
     * @param {Date} startDateTime - The start of the time range.
     * @param {Date} endDateTime - The end of the time range.
     * 
     * @returns {Object[]} An array of objects, each containing a category and its maximum overlap.
     */
    private getOverlap(events: EventParams[], startDateTime: Date | string, endDateTime: Date | string): { category: string, maxOverlap: number, categoryEventsPerRows: EventParams[][] }[] {

        if (startDateTime && endDateTime) {
            // Transform date string or Date object to Date object
            const _startDateTime = typeof startDateTime === 'string' ? new Date(startDateTime) : new Date(startDateTime.getTime());
            const _endDateTime = typeof endDateTime === 'string' ? new Date(endDateTime) : new Date(endDateTime.getTime());

            // Filter events based on the time range            
            events = events.filter(event =>
                this.getCorrectDatetime(event.start).getTime() <= _endDateTime.getTime() &&
                this.getCorrectDatetime(event.end).getTime() >= _startDateTime.getTime()
            );
        }

        // Group the events by category
        const eventsByCategory: { [key: string]: EventParams[] } = events.reduce((acc, event) => {
            // If the category does not exist in the accumulator, create it
            if (!acc[event.category]) {
                acc[event.category] = [];
            }
            // Add the event to its category
            acc[event.category].push(event);
            return acc;
        }, {});

        // Prepare an array to store the max overlap for each category
        const maxOverlapByCategory: { category: string, maxOverlap: number, categoryEventsPerRows: EventParams[][] }[] = [];

        // Calculate the max overlap for each category
        for (const category in eventsByCategory) {
            const categoryEvents = eventsByCategory[category];

            // Sort the events in ascending order by start time
            categoryEvents.sort((a, b) => a.start - b.start);

            let categoryEventsPerRows = this.splitIntoNonOverlappingEventSublists(categoryEvents) || [];
            //let maxOverlap = categoryEventsPerRows.length;

            let maxOverlap: number;
            if (!this.config.separateParallelEvents) {
                // Set the maximum of parallel events that can be shown in the same row without overlaps as maxOverlap
                maxOverlap = categoryEventsPerRows.length - 1;
            } else {
                // Set the maximum of parallel events as maxOverlap
                maxOverlap = 0;
                let currentOverlap: number = 0;
                let currentIndex: number = 0;
                let currentEvent: EventParams;

                // Iterate over the events
                while (currentIndex < categoryEvents.length) {
                    currentEvent = categoryEvents[currentIndex];

                    // Check if the current event overlaps with the next event
                    if (currentIndex + 1 < categoryEvents.length && currentEvent.end > categoryEvents[currentIndex + 1].start) {
                        // If it does, increment the current overlap count
                        currentOverlap++;
                        // If the current overlap count is greater than the max overlap, update the max overlap
                        if (currentOverlap > maxOverlap) {
                            maxOverlap = currentOverlap;
                        }
                    } else {
                        // If it does not, reset the current overlap count
                        currentOverlap = 0;
                    }

                    // Move on to the next event
                    currentIndex++;
                }
            }

            // Add the max overlap for the current category to the result array
            maxOverlapByCategory.push({ category, maxOverlap, categoryEventsPerRows });
        }

        // Return the result array
        return maxOverlapByCategory;
    }

    /**
     * This function returns all parallel running events to the provided event within the same category.
     * @private
     * @param {EventParams[]} events - The list of events.
     * @param {EventParams} event - The event to compare with.
     * 
     * @returns {EventParams[]} An array of parallel running events.
     */
    private getParallelEvents(events: EventParams[], event: EventParams): EventParams[] {
        // Get the start and end time of the event
        const eventStart = this.getCorrectDatetime(event.start).getTime();
        const eventEnd = this.getCorrectDatetime(event.end).getTime();

        // Filter events based on the event's time range and category
        let parallelEvents = events.filter(e => {
            const eStart = this.getCorrectDatetime(e.start).getTime();
            const eEnd = this.getCorrectDatetime(e.end).getTime();

            return e.category === event.category &&
                eStart <= eventEnd &&
                eEnd >= eventStart;
        });

        return parallelEvents;
    }

    /**
     * This function returns all parallel running events to the provided event within the same category, 
     * and recursively finds all parallel events to those events.
     * @private
     * @param {EventParams[]} events - The list of events.
     * @param {EventParams} event - The event to compare with.
     * @param {Set<string>} processedEvents - The set of events that have already been processed.
     * 
     * @returns {EventParams[]} An array of all parallel running events.
     */
    private getAllParallelEvents(events: EventParams[], event: EventParams, processedEvents: Set<string> = new Set()): EventParams[] {
        // Get the start and end time of the event
        const eventStart = this.getCorrectDatetime(event.start).getTime();
        const eventEnd = this.getCorrectDatetime(event.end).getTime();

        // Filter events based on the event's time range and category
        let parallelEvents = events.filter(e => {
            const eStart = this.getCorrectDatetime(e.start).getTime();
            const eEnd = this.getCorrectDatetime(e.end).getTime();

            return e.category === event.category &&
                eStart <= eventEnd &&
                eEnd >= eventStart &&
                !processedEvents.has(e.uid); // Exclude events that have already been processed
        });

        // Add the processed events to the set
        parallelEvents.forEach(e => processedEvents.add(e.uid));

        // Recursively find all parallel events to the found events
        parallelEvents.forEach(e => {
            const moreParallelEvents = this.getAllParallelEvents(events, e, processedEvents);
            parallelEvents = [...parallelEvents, ...moreParallelEvents];
        });

        // Order by start date
        parallelEvents.sort((a, b) => {
            const aStart = this.getCorrectDatetime(a.start).getTime();
            const bStart = this.getCorrectDatetime(b.start).getTime();

            return aStart - bStart;
        });

        return parallelEvents;
    }

    // ===============================
    // Utilities
    // Data Validation / Type Checking
    // ===============================

    /**
     * Validation:
     * Supplemental method for validating arguments in local scope.
     *  
     * This function validates an optional argument and returns the argument if it is not undefined, 
     * or the default value if the argument is undefined. If a callback function is provided, the function 
     * calls the callback with the default value and optional argument and returns the result.
     * @param defaultValue - The default value to return if the optional argument is undefined.
     * @param optArg - The optional argument to validate.
     * @param optCallback - The optional callback function to call with the default value and optional argument.
     * @returns The validated argument or default value.
     */
    static supplement<T>(defaultValue: T, optArg?: T, optCallback?: (defaultValue: T, optArg: T) => T): T {
        if (optArg === undefined) {
            return defaultValue;
        }
        if (optCallback === undefined) {
            return optArg;
        }
        return optCallback(defaultValue, optArg);
    }

    /**
     * Validation:
     * Validate if the value is a string.
     *
     * @param def - The default value to return if the value is not a string.
     * @param val - The value to validate.
     * @returns The value if it is a string, or the default value.
     */
    static validateString(def: string, val: unknown): string {
        return typeof val === 'string' && val !== '' ? val as string : def;
    }

    /**
     * Validation:
     * Validate if the value is a number.
     *
     * @param def - The default value to return if the value is not a number.
     * @param val - The value to validate.
     * @returns The value if it is a number, or the default value.
     */
    static validateNumeric(def: number, val: unknown): number {
        return typeof val === 'number' ? Number(val) : def;
    }

    /**
     * Validation:
     * Validate if the value is a boolean.
     *
     * @param def - The default value to return if the value is not a boolean.
     * @param val - The value to validate.
     * @returns The value if it is a boolean, or the default value.
     */
    static validateBoolean(def: boolean, val: unknown): boolean {
        return typeof val === 'boolean' || (typeof val === 'object' && val !== null && typeof val.valueOf() === 'boolean') ? val as boolean : def;
    }

    /**
     * Validation:
     * Validate if the value is an object.
     *
     * @param def - The default value to return if the value is not an object.
     * @param val - The value to validate.
     * @returns The value if it is an object, or the default value.
     */
    static validateObject(def: object, val: unknown): object {
        return typeof val === 'object' ? val as object : def;
    }

    /**
     * Validation:
     * Validate if the value is an array.
     *
     * @param def - The default value to return if the value is not an array.
     * @param val - The value to validate.
     * @returns The value if it is an array, or the default value.
     */
    static validateArray(def: any[], val: unknown): any[] {
        return Object.prototype.toString.call(val) === '[object Array]' ? val as any[] : def;
    }

    /**
     * Type Checking:
     * Determine if a value is "empty" similar to PHP's empty() function.
     * 
     * This function checks if a value is "empty". It considers the following values as "empty":
     * `null`, an empty array `[]`, an empty object `{}`, an empty string `""`, the number `0`, `false`,
     * `undefined`, `null` (as a string type).
     * @param value - The value to check.
     * @returns true if the value is considered "empty", false otherwise.
     */
    static isEmpty(value: any): boolean {
        if (value == null) {
            // typeof null -> object : for hack a bug of ECMAScript
            // Refer: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof
            return true;
        }

        switch (typeof value) {
            case 'object':
                if (Array.isArray(value)) {
                    // When object is array:
                    return value.length === 0;
                } else {
                    // When object is not array:
                    if (Object.keys(value).length > 0 || Object.getOwnPropertySymbols(value).length > 0) {
                        return false;
                    } else if (value.valueOf().length !== undefined) {
                        return value.valueOf().length === 0;
                    } else if (typeof value.valueOf() !== 'object') {
                        return Timeline.isEmpty(value.valueOf());
                    } else {
                        return true;
                    }
                }
            case 'string':
                return value === '';
            case 'number':
                return value == 0;
            case 'boolean':
                return !value;
            case 'undefined':
                return true;
            case 'symbol':
            case 'function':
            default:
                return false;
        }
    }

    /**
     * Type Checking:
     * Determine whether the object is iterable.
     * An object is iterable if it implements the Symbol.iterator method.
     * The Symbol.iterator method is a special method that should return an iterator for the object.
     *
     * @param obj - The object to check.
     * @returns true if the object is iterable, false otherwise.
     */
    static isIterable(obj: any): boolean {
        return obj != null && typeof obj[Symbol.iterator] === 'function';
    }

    /**
     * Type Checking:
     * Checks if a value is an object
     * @param item - The value to check
     * @return True if the value is an object, false otherwise
     */
    static isObject(item: unknown): item is Record<string, unknown> {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    // ===============================
    // Utilities
    // Communication
    // ===============================

    /**
     * @private: Echo the log of plugin for debugging
     */
    private debug(message: string | null, throwType: string = 'Notice'): void {
        // If debug mode is not enabled in the config, exit the function
        if (!this.config.debug) {
            return;
        }

        // Supplement the message
        message = Timeline.supplement(null, message);

        // If the message exists
        if (message) {
            // todo
        }
    }

    /**
     * @private: Logger of errors when the method execution
     */
    private error(message: string | null, type: string = 'error'): void {
        // If the message exists and console is available
        if (message && window.console) {
            // If the specified type of console method doesn't exist, default to 'error'
            type = window.console[type] ? type : 'error';
            console[type](message);
        }
    }
}