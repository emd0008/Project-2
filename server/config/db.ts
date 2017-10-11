import * as mysql from 'mysql';

export let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'blogUser',
    password: 'blogPassword',
    database: 'BlogSchema'
});

function callProcedure(procedureName: string, args: Array<any> []): Promise<Array<Array<any>>>{
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if(err){
                reject(err);
            }else{
                var holder = '';
                if(args && args.length > 0) {
                    for(var i = 0; i < args.length; i++){
                        if(i === args.length - 1){
                            holder += '?';
                        }else{
                            holder += '?, ';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + holder + ');';
                connection.query(callString, args, function(err, resultsets){
                    connection.release();
                    if(err){
                        reject(err);
                    }else{
                        resolve(resultsets);
                    }
                });
            }        
        });
    }); 
}     

export function rows(procedureName: string, args: Array<any> = []){
    return callProcedure(procedureName, args)
        .then(function(resultsets){
            return resultsets[0];
        });
}

export function row(procedureName: string, args: Array<any> = []){
    return callProcedure(procedureName, args)
        .then(function(resultsets){
            return resultsets[0][0];
        });
}

export function empty(procedureName: string, args: Array<any> = []){
    return callProcedure(procedureName, args)
        .then(() => {
            return;
        });
}