export default interface IOrder {
    acceptAddress: string;
    bounty: number;
    buyerAddress: string;
    createTime: string;
    deadline: string;
    id: number;
    params: any;
    remark: string;
    sourceLang: string;
    targetLang: string;
    tcount: number;
    title: string;
    instruction: string;
    tmax: number;
    translationCharacter: string;
    translationIndex: number;
    translationState: number;
    translationStateArray: string[];
    translationType: string;
    updateTime: string;
    userAcceptFiles: any;
    vcount: number;
    vmax: number;
    workload: number;
    workloadType: number;
}
