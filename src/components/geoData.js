const fetchStates = async () => {
  try {
    const response = await fetch(
      "http://api.geonames.org/childrenJSON?geonameId=1269750&username=darsh_0611"
    );
    const data = await response.json();
    return data.geonames;
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
};

const fetchCities = async (stateId) => {
  try {
    const response = await fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${stateId}&username=darsh_0611`
    );
    const data = await response.json();
    return data.geonames;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

export { fetchStates, fetchCities };
