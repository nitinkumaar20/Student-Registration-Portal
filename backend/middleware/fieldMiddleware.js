
export const isRequired = (data, arr) => { 
    let user_data = {}
    arr.forEach((e) => {
        if (data[e] != undefined && data[e] == false) {
            user_data[e] = data[e];
        }
        else if (data[e] == undefined || data[e] == '') {
            throw Error(`${e} field is required`)
        }else{
            user_data[e] = data[e];
        }
    });
    return user_data;
}