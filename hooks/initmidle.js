import Cors from 'cors'

export default function initMiddleware(middleware) {

    const cors = Cors({
        methods: ['GET','POST','PUT','DELETE']
    })


    return function(req, res) {
      return new Promise((resolve, reject) => {
        middleware(req, res, result => {
          if (result instanceof Error) {
            return reject(result);
          }
          return resolve(result);
        });
      });
    };
}