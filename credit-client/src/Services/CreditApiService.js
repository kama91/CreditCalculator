const baseUrl = "http://localhost:5000/api/credit";
const className = 'CreditApiService_';

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
            const requestParameters = 'sumOfCredit=' + creditTerms.sumOfCredit +
                '&creditTerm=' + creditTerms.creditTerm + '&interestRateOfYear=' + creditTerms.interestRateOfYear;
            const request = baseUrl + '/detail?' + requestParameters;
            console.log(className + 'getCreditDetails ' + 'start request to ' + request);
            const response = await fetch(request, options);
            return this.processingResponse(response);
        }
        catch (error) {
            console.log(className + 'getCreditDetails ' + error);
            return error;
        }
    }

    processingResponse = async (response) => {
        switch (response.status) {
            case 200:
                const result = await response.json();
                if (result.data) {
                    console.log(className + 'processingResponse ' + JSON.stringify(result.data));
                }
                else {
                    console.log(className + 'processingResponse ' + result.error.errorCode + ' ' + result.error.message);
                }
                return result;
            default:
                console.log(className + 'processingResponse ' + response.status + ' ' + response.statusText);
                return response.status + ' ' + response.statusText;
        }
    }
}

export default CreditApiService;
