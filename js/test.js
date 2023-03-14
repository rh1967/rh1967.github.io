import { Octokit } from "https://cdn.skypack.dev/octokit";


export const octokit = new Octokit({
  auth: 'ghp_D8uNvhXeGu0U7wkwmDcqT7Jfp4CQYW270RP',
});

window.github_api = async function() {
  try {
    await octokit.request("GET /orgs/{org}/repos", {
      org: "octokit",
      type: "private",
    }) ;
    
  } catch (error) {  
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
    }
    //console.error(error) ;  
  }
} ;
  



/*
const response = await octokit.request("GET /orgs/{org}/repos", {
  org: "octokit",
  type: "private",
}) ;
console.log(response) ;
console.log(response.status) ;
*/

/*
const { Octokit } = require("@octokit/core");
//import { Octokit } from "@octokit/core";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({
  auth: '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',
});

const owner = 'rh1967';
const repo = 'dev-ferdinand-I-data';
author = {
    name: 'rh1967',
    email: 'richard.hoermann@inode.at',
};
const url =  '/repos/{owner}/{repo}/{path}'; // leave this as is
const ref =  'heads/master'; // 'master' represents the name of my primary branch

const testApi = async () => {
  const { data } = await octokit.request({
      owner,
      repo,
      url,
      method: 'GET',
      path: 'contents', // gets the whole repo
  });
  console.log(data)
}

testApi() ;


/*
async function testApi() {
  const response = await octokit.request("GET /orgs/{org}/repos", {
    org: "octokit",
    type: "private",
  }) ;
  console.log(response) ;
}*/
