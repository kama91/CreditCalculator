const baseUrl = "http://localhost:5000/api/credit";

export class CreditApiService {
    getCreditDetails = async (creditTerms) => {
        const options = {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
        };

        try {
            // test commit
            const requestParameters = 'sumOfCredit=' + creditTerms.sumOfCredit +
                '&creditTerm=' + creditTerms.creditTerm + '&interestRateOfYear=' + creditTerms.interestRateOfYear;
            const request = baseUrl + '/detail?' + requestParameters;
            console.log("Start request to " + request);
            const response = await fetch(request, options);
            return this.processingResponse(response);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    processingResponse = async (response) => {
        switch (response.status) {
            case 200:
                const result = await response.json();
                if (!result.data) {
                    console.log(result.error.errorCode, result.error.message);
                }
                return result;
            default:
                console.log(response.statusText);
                return response.statusText;
        }
    }
}

export default CreditApiService;
