
export default function get_types_string(types){
    let type_str = ""

    for (let type of types){
        
        type_str += type + ', '

    }

    return type_str;
}