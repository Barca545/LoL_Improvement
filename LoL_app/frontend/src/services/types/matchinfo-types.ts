export interface csResults{
    id: string,
    type:string,
    ///outcome:string,
    ///champion:string,
    duration:string,
    cspm:number,
    cs15:number,
    allcs:{ [key: string]: number },
    problem: { [key: string]: number },
}

export interface csResultsState{
    matchinfo:csResults,
    responseStatus:string|null,
}