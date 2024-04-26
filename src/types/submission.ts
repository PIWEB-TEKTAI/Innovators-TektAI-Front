export type submission = {
<<<<<<< HEAD
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
}
=======
  _id: string;
  challengeId:string;
  title: string,
  description: string,
  files: [{
    name: string,
    url: string
  }]
  status: 'pending' | 'approved' | 'rejected';
  score: number;
  submissionDate: Date;
}
>>>>>>> 571c05c09396e445f1f79e1bec3ea64a5b8d6a57
