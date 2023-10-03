const https = require('https');


export const GET = async (request, { params }) => {
    const projectID = params.id;
    const projectsAPi = process.env.GITLAB_URL + '/api/v4/projects/' + projectID + '/merge_requests';
    const accessToken = process.env.GITLAB_ACCESS_TOKEN;

    //console.log("Access Token ", accessToken);

    var mergeRequests = [];

    try {
        const response = await fetch(projectsAPi, {
            headers: {
                'PRIVATE-TOKEN': accessToken,
            },
        });
        if (response.ok) {
            mergeRequests = await response.json();
        }
    } catch (error) {
        console.log(error);
    }
    //console.log("Getting ", mergeRequests.length, " merge requests for project ", projectID);
    return new Response(JSON.stringify(mergeRequests), { status: 200 })


}
