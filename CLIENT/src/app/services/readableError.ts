export function readableError(code:string, data:string = ''): string {
    //if the code is incorrect_Idpass, return "wrong user name or passwords" 
    //if(code == "INCORRECT_IDPASS") return "Wrong user name or password";
    //if(code == "UNHANDLED_ERROR") return "Unhandled error";

    switch (code) {
        // API-description error
        case 'API_ERROR' : return `Check API defines the url endpoint`;
        case 'METHOD_NOT_ALLOWED' : return `Check API defined request method for this endpoint.`;

        // common method errors
        case 'NOT_LOGGED_IN' : return `You need to login!`;
        case 'ALREADY_LOGGED_IN' : return `You are already logged in.`;
        case 'MISSING_PARAMETER' : return `Missing parameter: ${data}`;
        case 'NOT_FOUND' : return `Resource not found`;
        case 'NOT_ALLOWED' : return `You are not allowed to do this operation`;

        // Statistics

        // Session
        case 'INCORRECT_IDPASS' : return `Wrong username or password`;
        case 'NOT_ACTIVE' : return `You need to activate your account - check your email.`;

        // Reserves
        case 'ALREADY_STARTED' : return `This class has already started`;
        case 'FULL_CLASS' : return `This class is full`;
        case 'FNAME_REQUIRED' : return `Your full name is required`;
        case 'AGE_REQUIRED' : return `Your age is required`;
        case 'GENDER_REQUIRED' : return `Your gender is required`;
        case 'EMAIL_REQUIRED' : return `Your e-mail is required`;
        case 'EMAIL_WRONG_FORMAT' : return `Your e-mail doesn't seem to be valid`;
        case 'ALREADY_REGISTERED' : return `You appear to already have a reservation for this class`;
        case 'PHONE_REQUIRED' : return `Your phone number is required`;
        case 'PHONE_WRONG_FORMAT' : return `Your phone doesn't seem to be valid`;
        case 'TOO_LATE_TO_CANCEL' : return `You can't cancel a reservation for a class that has already started!`;
        case 'CANT_CHANGE_YOUR_MIND' : return `You had already submited a different idea, please contact the organizer!`;   // For reservation side
        case 'CLASS_NOT_CONFIRMED_YET' : return `This operation can only be performed once class has been confirmed!`;
        case 'CANT_DO_OPERATION_BEFORE_CLASS_STARTED' : return `This operation can only be done once class has already started`;

        // Courses
        case 'COURSENAME_CANT_BE_EMPTY' : return `The course must have a name`;
        case 'COURSENAME_ALREADY_USED' : return `There appears to be a course with the same name`;
        case 'REQINFO_WRONG_FORMAT' : return `There's something wrong with the information you require`;
        case 'WRONG_TYPE' : return `Please select a type`;
        case 'CANT_CHANGE_TYPE' : return `Course type can't be updated`;
        case 'CONTACT_CANT_BE_EMPTY' : return `Contact information can't be empty`;

        // Companies
        case 'EMAIL_IN_USE' : return `This e-mail is already registered on our platform.`;
        case 'INCORRECT_PASSWORD' : return `Incorrect password`;
        case 'INCORRECT_CHALLENGE' : return `Incorrect verification code`;

        // Classes
        case 'CANT_PLAN_BACK_IN_TIME' : return `You can't plan a class to be happened in the past`;
        case 'BLACKHOLE_DURATION' : return `Please increase the duration for the class`;
        case 'BUY_SOME_CHAIRS' : return `Please increase the number of spots available`;
        case 'CLASS_CANT_UPDATE_COURSE' : return `You can't change the course for this class`;
        
        // Tracking
        case 'INVALID_RESERVE' : return `This reserve doesn't belong to this class`;
        case 'MISSING_RESERVES' : return `Please assign a status to all the class reserves`;
        
        // Engagement
        case 'SUBJECT_CANT_BE_EMPTY' : return `The e-mail subject can't be empty.`;
        case 'MESSAGE_BODY_CANT_BE_EMPTY' : return `The e-mail message can't be empty.`;
        case 'CANT_ENGAGE_WITH_FUTURE_OF_COMPANY' : return `Option unavailable`;
        case 'CANT_ENGAGE_WITH_FUTURE_OF_COURSE' : return `Option unavailable`;
        case 'CANT_DO_OPERATION_AFTER_CLASS_STARTED' : return `This operation can only be done before class starts`;
        case 'CANT_CONFIRM_TWICE' : return `This operation can't be done twice`;

        case 'UNHANDLED_ERROR' :
        default : return `Unhandled error`;
    }
}

