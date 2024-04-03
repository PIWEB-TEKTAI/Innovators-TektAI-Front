export type challenge = {
    title: string,
    description:string,
    price:string,
    startDate: Date,
    endDate: Date,
    createdBy:string,
    targetedSkills: Array<string>, 
    dataset: {
      name: string,
      description: string,
      fileUrl:string,
    }
}