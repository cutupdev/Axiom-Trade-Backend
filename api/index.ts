export const getTokenList = async () => {
    try {

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json, text/plain, */*");

        const poolCreationBlockTimestamp = Math.floor(Date.now() / 1000);
        const raw = JSON.stringify({
            "name": "getNeoVisionV3",
            "data": {
                
            }
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://", requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ API Response:", result);
        return result;


    } catch (err) {
        console.log("get token list error ==>", err)
        return null
    }
}