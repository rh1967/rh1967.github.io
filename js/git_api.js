const TOKEN = window.git_token ;
const REPO = 'dev-ferdinand-I-data' ;
const BRANCH = 'main' ;
//const BRANCH = 'rh-map' ;
const PATH = 'data/json/map.json' ;

import { Octokit } from "https://esm.sh/octokit@2.0.19" ;
//import { Octokit } from "https://cdn.skypack.dev/octokit" ;

export const octokit = new Octokit({
  auth: TOKEN,
});

//console.log("TOKEN =", TOKEN) ;
if (TOKEN != null) {
  //reset browser storage for git token
  sessionStorage.removeItem("git_token") ;
  sessionStorage.setItem("git_token", "null") ;
  console.log("git token removed from session storage") ;  
}

//test login
window.git_login = async function() {
  try {
    const response = await octokit.request("GET /user");      
    console.log("Response =", response) ;
    console.log("Status =", response.status) ;    
    
  } catch (error) {  
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)      
    }
    alert('Login error!') ;    
  }
}

//pull latest commit
window.git_pull_sha = async function() {
  try {    
    const commits =  await octokit.request('GET /repos/{OWNER}/{REPO}/commits', {        
      OWNER,
      REPO,
      sha: BRANCH,
    });
    
    console.log("Commits =", commits) ;
    console.log("Status =", commits.status) ;
    console.log("SHA =", commits.data[0].sha) ;
      
    return commits.data[0].sha ;
    
  } catch (error) {  
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)      
    }
    alert('Pull SHA error!') ;    
  }
}

//get sha of file content to update
window.git_get = async function() {  
  try {
    const response = await octokit.request("GET /repos/{OWNER}/{REPO}/contents/{PATH}", {
      OWNER,
      REPO,
      PATH,
      ref: BRANCH,
    }) ;
    console.log(response) ;
    console.log(response.status) ;
    console.log(response.data.content) ;
    console.log(response.data.sha) ;

    return response.data.sha ;

  } catch (error) {
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
      if (error.response.status != 404) {
        alert('Get error!') ;  
      }      
    }
  }
}

//push
window.git_push = async function(marker_editor_base64, contentSHA) {  
  try {    
    const response = await octokit.request("PUT /repos/{OWNER}/{REPO}/contents/{PATH}", {
      OWNER,
      REPO,
      PATH,
      message: "test api",      
      content: marker_editor_base64,      
      //content: "SGVsbG8gV29ybGQh",      
      sha: contentSHA,
      branch: BRANCH,
    }) ;
    console.log(response) ;
    console.log(response.status) ;
    alert("Upload successfull!") ;    

    return response.data.commit.sha ;
    
  } catch (error) {
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
    }
    alert('Push error!') ;
  }     
}

window.github_api = async function( marker_editor_base64 ) {
  var contentSHA = null ;
  
  await git_login() ;

  await git_pull_sha().then(value => {
    const latestCommitSHA = value ;
    console.log("Latest commit =", latestCommitSHA) ;    
  }) ;
  
  await git_get().then(value => {
    contentSHA = value ;
    console.log("File content SHA =", contentSHA) ;
  }) ;

  await git_push(marker_editor_base64, contentSHA).then(value => {
    const pushSHA = value ;
    console.log("Push SHA =", pushSHA) ;
  }) ;
} ;