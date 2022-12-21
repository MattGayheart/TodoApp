import { useCallback } from "react";

const useHttp = () => {
  //Uses callback to stop re-evaluation of components for sendRequest
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      //If response fails throw error
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      //runs function passed into the hook to be used in components
      const data = await response.json();
      applyData(data);
    } catch (err) {
      console.log("Error: " + err.message);
    }
  }, []);
  
  return {
    sendRequest,
  };
};

export default useHttp;
