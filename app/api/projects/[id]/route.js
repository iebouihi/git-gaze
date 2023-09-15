const https = require('https');


export const GET = async (request, { params }) => {
    const projectID = params.id;
    const projectsAPi = process.env.GITLAB_URL + '/api/v4/projects/' + projectID;
    const accessToken = process.env.GITLAB_ACCESS_TOKEN;

    //console.log("Getting details for project ", projectID);
    var data = {};
    try {
        const response = await fetch(projectsAPi, {
            headers: {
                'PRIVATE-TOKEN': accessToken,
            },
        });
        if (response.ok) {
             data = await response.json();
        }
    } catch (error) {
        console.log(error);
    }

    return new Response(JSON.stringify(data), { status: 200 })


}
