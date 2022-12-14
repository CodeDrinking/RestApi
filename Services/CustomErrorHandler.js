class CustomErrorHandler extends Error{
    constructor(status ,msg  ){
        super();
        this.status = status,
        this.message = msg;

    }

    static alreadyExists(message){
        console.log(message);
        return  new CustomErrorHandler (409 , message)
        
    }

    static wrongCred(message="Invalid Username/Password"){
        console.log(message);
        return  new CustomErrorHandler (401 , message)
        
    }
    static unAuthorized(message="Unauthorized"){
        return  new CustomErrorHandler (401 , message)
        
    }
    static notFound(message="Not Found !!"){
        return  new CustomErrorHandler (404 , message)
    }

    static serverError(message="Internal Server error !!"){
        return  new CustomErrorHandler (500 , message)
    }



}

export default CustomErrorHandler;