export type challenge = {
  title: string;
  description: string;
  problematic: string;
  amount: string;
  visibility: String;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  targetedSkills: Array<string>;
  image: string;
  fileUrl: string;
  rankingMode: {
    automated:boolean,
    expert:boolean,
  };
  numberParticipants:{
    nbrTeam:string,
    nbrSolo:string
  },
  bareme: {
    output: boolean;
    presentation: boolean;
    codeSource: boolean;
    dataSet: boolean;
    readmeFile: boolean;
    rapport: boolean;
    Demo: boolean;
  };
  prizes: {
    prizeName: string;
    prizeDescription: string;
  };

  recruitement: {
    positionTitle: string;
    jobDescription: string;
  };

  freelance: {
    projectTitle: string;
    projectDescription: string;
  };

  internship: {
    internshipTitle: string;
    internshipDescription: string;
    duration:string;
  };
  participations: {
    soloParticipants: Array<Number>;
    soloParticipationRequests: Array<Number>;
    TeamParticipants: Array<Number>;
    TeamParticipationRequests: Array<Number>;
  };
};
