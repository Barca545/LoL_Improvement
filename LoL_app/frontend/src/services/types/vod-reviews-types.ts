export interface VODReviewComment{
    id:string,
    timestamp:[
        number, ///seconds value 
        string  ///display value
    ],
    text:string
}

export interface Video {
    url:string,
    title:string,
}

export interface VODReviewState{
    comments: VODReviewComment[],
    video: Video,
    currentTimestamp: number,
    responseStatus: string|null,
}
