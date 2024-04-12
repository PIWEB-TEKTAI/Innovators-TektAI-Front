export type challenge = {
    title: string,
    description:string,
    price:string,
    startDate: Date,
    endDate: Date,
    createdBy:string,
    targetedSkills: Array<string>, 
    image:string,
    dataset: {
      name: string,
      description: string,
      fileUrl:string,
    },
    participations: {
      soloParticipants: Array<Number>
      soloParticipationRequests: Array<Number>
    } 
}