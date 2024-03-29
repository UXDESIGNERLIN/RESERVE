export interface Class {
    id:string,
    courseId: string,
    tsIni: number,
    len: number,
    spots: number,
    confirmationSent?: boolean
}
// When we GET a class, the actual interface is something similar to the fusion of Class and Course interfaces
//export interface ClassCourse extends Class, Course {};