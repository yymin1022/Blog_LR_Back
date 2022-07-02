import cors, {CorsOptions, CorsRequest} from "cors";

export const setCors = () => {
    const corsList = [process.env.URL_DEV, process.env.URL_PUB];
    const corsOptions = {
        origin: (origin: string | undefined, callback: (err: Error | null, options?: boolean | undefined) => void) => {
            if(corsList.indexOf(origin) !== -1){
                callback(null, true);
            }else{
                callback(new Error("Not Allowed Origin!"));
            }
        },
    };

    return cors(corsOptions);
}