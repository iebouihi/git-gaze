const https = require('https');

const TERMS_TO_FILTER = "jenkinsSeb";
export const GET = async (request, { params }) => {
    const projectID = params.id;
    const mergerRequestIID = params.iid;
    const projectsAPi = process.env.GITLAB_URL + '/api/v4/projects/' + projectID + '/merge_requests/' + mergerRequestIID + '/notes';
    const accessToken = process.env.GITLAB_ACCESS_TOKEN;

    var data = [];

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
   
   // console.log("Notes : ", data);
    const filteredData = data.filter((item) => item.author.username != TERMS_TO_FILTER && item.type);

    return new Response(JSON.stringify(filteredData), { status: 200 })


}
