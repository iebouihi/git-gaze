const https = require('https');


export const GET = async (request) => {
    const projectsAPi = process.env.GITLAB_URL + '/api/v4/projects';
    const accessToken = process.env.GITLAB_ACCESS_TOKEN;

    var projects = [];

    try {
        const response = await fetch(projectsAPi, {
            headers: {
                'PRIVATE-TOKEN': accessToken,

            },
        });
        if (response.ok) {
            projects = await response.json();
        }
    } catch (error) {
        console.log(error);
    }
    console.log("Getting {} projects from gitlab", projects.length);
    return new Response(JSON.stringify(projects), { status: 201 })


}
