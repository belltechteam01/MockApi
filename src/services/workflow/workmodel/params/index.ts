import { CParam, ParamSrcType, ParamType } from "./param";
import {CRequest} from "./request";
import {CResponse} from "./response";

export class CParams
{
    private _params: Map<string, CParam>

    constructor() {
        this._params = new Map();
    }

    public getList(nodeId: string | undefined, paramType: ParamType | undefined, paramSrcType: ParamSrcType | undefined)
    {
        let ret: Array<CParam> = [];
        
        let lstParams: Array<CParam> = [];
        
        for(let param of this._params.values()) {
            lstParams.push(param);
        }

        let filtered = lstParams;
        if(nodeId) {
            filtered = filtered.filter((value) => value.nodeId == nodeId);
        }

        if(paramType) {
            filtered = filtered.filter((value: any) => value.type ? (value.type == paramType) : false);
        }

        if(paramSrcType) {
            console.log("[LOG] param src type", ParamSrcType[paramSrcType]);
            filtered = filtered.filter((value) => value.fieldSourceType == ParamSrcType[paramSrcType]);
        }

        ret = filtered.sort((a, b) => {
            return (parseInt(a.displaySeq) - parseInt(b.displaySeq));
        })
        
        return ret;
    }

    public getParamById(fieldId: string): CParam | undefined {
        let params: Array<CParam> = [];
        
        for(let param of this._params.values()) {
            params.push(param);
        }

        let ret = params.find((value) => {
            return value.fieldId === fieldId;
        })

        return ret;
    }

    public getParamByName(fieldName: string): CParam | undefined {
        let params: Array<CParam> = [];
        
        for(let param of this._params.values()) {
            params.push(param);
        }

        let ret = params.find((value) => {
            return value.fieldName === fieldName;
        })

        return ret;
    }

    public getParam(id: string): CParam | undefined {
        return this._params.get(id);
    }

    public setParam(id: string, param: CParam): boolean {
        let isNew: boolean = false;

        const pre_size = this._params.size;

        this._params.set(id, param);

        return this._params.size > pre_size;
    }

    public setParamByFieldName(apiId: string, fieldName: string, param: CParam): boolean {
        return this.setParam( apiId + "." + fieldName, param );
    }

    public getFieldValueType
}

export {
    CParam,
    CRequest,
    CResponse
};