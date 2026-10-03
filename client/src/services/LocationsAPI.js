const getAllLocations = async () => {
    const response = await fetch('/api/locations')

    if (!response.ok) {
        throw new Error(`Unable to get locations: ${response.status}`)
    }

    return response.json()
}

export default {
    getAllLocations
}
