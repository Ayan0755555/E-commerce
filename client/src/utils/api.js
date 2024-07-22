import axios from "axios";


export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(process.env.NEXT_PUBLIC_APP_API_URL + url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}




export const postData = async (url, formData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
            body: JSON.stringify(formData)
        });


        if (response.ok) {
            const data = await response.json();
            //console.log(data)
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }

    } catch (error) {
        console.error('Error:', error);
    }

}


export const editData = async (url, updatedData ) => {
    const { res } = await axios.put(`${process.env.NEXT_PUBLIC_APP_API_URL}${url}`,updatedData)
    return res;
}

export const deleteData = async (url ) => {
    const { res } = await axios.delete(`${process.env.NEXT_PUBLIC_APP_API_URL}${url}`)
    return res;
}


export const uploadImage = async (url, formData) => {

    const { res } = await axios.post(process.env.NEXT_PUBLIC_APP_API_URL + url , formData)
    return res;
}


export const deleteImages = async (url,image ) => {
    const { res } = await axios.delete(`${process.env.NEXT_PUBLIC_APP_API_URL}${url}`,image);
    return res;
}