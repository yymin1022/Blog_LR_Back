import cors from "cors";

const setCors = () => {
    const corsList = [process.env.URL_DEV, process.env.URL_PUB];
    const corsOptions = {
        origin: (origin : any, callback : any) => {
            if(corsList.indexOf(origin) !== -1){
                callback(null, true);
            }else{
                callback(new Error("Not Allowed Origin!"));
            }
        },
    };
}