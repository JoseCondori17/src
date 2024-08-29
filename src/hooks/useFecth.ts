import { useState, useEffect } from "react";

export function useFetch(url: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  //const [controller, setController] = useState<any>(null);

  useEffect(() => {
    const abortController = new AbortController();
    //setController(abortController);

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        /* if (error.name === "AbortError") {
          console.log("Cancelled request");
        } else {
          setError(error);
        } */
       console.log(error);
      })
      .finally(() => setLoading(false));

    //return () => abortController.abort();
  }, [url]);

  const handleCancelRequest = () => {
    /* if (controller) {
      controller.abort();
      setError("Cancelled Request");
    } */
  };

  return { data, loading, error, handleCancelRequest };
}