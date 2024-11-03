export const baseURL = 'http://127.0.0.1:8000'

export const getAllProductsAPI = async() => {
    const response = await fetch(`${baseURL}/products/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const res = await response.json()

    if(res.ok){
        return res.data
    }else {
        throw new Error(res.message)
    }
}

export const addProductAPI = async(postData) => {
    const response = await fetch(`${baseURL}/products/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    const res = await response.json()
    console.log(res)
    if(res.ok){
        return res.data
    }else {
        throw new Error(res.message)
    }
}
export const editProductAPI = async(postData) => {
    const response = await fetch(`${baseURL}/products/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    const res = await response.json()
    console.log(res)
    if(res.ok){
        return res.data
    }else {
        throw new Error(res.message)
    }
}

export const deleteProductAPI = async(postData) => {
    const response = await fetch(`${baseURL}/products/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    const res = await response.json()
    console.log(res)
    if(res.ok){
        return res.data
    }else {
        throw new Error(res.message)
    }
}