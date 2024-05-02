export type submission = {
    title: string,
    description:string,
    output:string,
    datasetFile:{
      name:string,
      url:string
    },
    presentationFile:{
      name:string,
      url:string
    },
    codeSourceFile:{
      name:string,
      url:string
    },
    reportFile:{
      name:string,
      url:string
    },
    demoFile:{
      name:string,
      url:string
    },
    readMeFile:{
      name:string,
      url:string
    },
    status: 'pending' | 'approved' | 'rejected';
    score: number;
}
