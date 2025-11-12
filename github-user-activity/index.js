#!/usr/bin/env node

console.log("GITHUB USER ACTIVITY MODULE LOADED");

const fs = require("fs");
const args = process.argv;
console.log("args", args.slice(2));

const username = args[2];

if(!username){
    console.log("Please provide a GitHub username.");
    process.exit(1);
}

const fetchUserActivity = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public`);
        // console.log(response);
        if(!response.ok){
            if(response.status === 404){
                console.log(`User ${username} not found on Github.`);
            }else{
                console.log(`Error: Github API returned status ${response.status}`);
            }
            return;
        }

        if(response.ok){
            const events = await response.json();
            fs.writeFileSync(`${username}-activity.json`, JSON.stringify(events, null, 2));
            console.log(`Recent activity for ${username}:`);
            // console.log(events);

            fs.readFileSync(`${username}-activity.json`, 'utf-8');
            events.forEach(event => {
                const repo = event.repo.name;
                if(event.type === "PushEvent"){
                    // Pushed 3 commits to kamranahmedse/developer-roadmap
                    console.log(`Pushed to ${event.repo.name}`);
                }
                if(event.type === "CreateEvent"){
                    // Created repository backend-roadmap.sh
                    console.log(`Created ${event.payload.ref_type} ${event.payload.ref} in ${event.repo.name}`);
                }
                if(event.type === "IssueCommentEvent"){
                    console.log(`Commented on issue #${event.payload.issue.number} in ${event.repo.name}`);
                }
                if(event.type === "DeleteEvent"){
                    console.log(`Deleted ${event.payload.ref_type} ${event.payload.ref} in ${event.repo.name}`);
                }
                if(event.type === "PullRequestEvent"){
                    console.log(`Pull request #${event.payload.number} ${event.payload.action} in ${event.repo.name}`);
                }
            });
        }
    } catch (error) {
        console.log("Error fetching user activity:", error);
    }
}

fetchUserActivity(username);