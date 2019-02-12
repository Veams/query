interface AjaxOpts {
    contentType?: string;
    data?: object | string | string[];
    dataType?: string;
    type?: string;
    url: string;

}

interface Offset {
    left: number;
    top: number;
}

export { AjaxOpts, Offset };