export function readableError(code:string): string {
   //if the code is incorrect_Idpass, return "wrong user name or passwords" 
   //if(code == "INCORRECT_IDPASS") return "Wrong user name or password";
   //if(code == "UNHANDLED_ERROR") return "Unhandled error";

   switch (code) {
       case 'INCORRECT_IDPASS' : return "Wrong user name or password";




       
       case 'UNHANDLED_ERROR' :
       default : return "Unhandled error";
   }
}

