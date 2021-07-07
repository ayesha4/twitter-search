const URL = "http://localhost:3000/tweets";

/**
 * Retrive Twitter Data from API
 */
const onEnter=(e)=>{
if(e.key=="Enter"){
    getTwitterData();
}
}
const getTwitterData = () => {
const query = document.getElementById('user-search-input').value;
// const url ="http://localhost:3000/tweets?q=coding&count=10"
if(!query) return;
const encodedQuery=encodeURIComponent(query);
const fullURL =`${URL}?q=${encodedQuery}&count=10`;

fetch(fullURL).then((response)=>{
    return response.json();
}).then((data)=>{
    buildTweets(data.statuses);
}).catch((error)=>{
    console.log(error);
})
}

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Build Tweets HTML based on Data from API
 */let tweetContent="";
const buildTweets = (tweets, nextPage) => {
tweets.map((tweet)=>{
    
    tweetContent+=`<div class="tweet-container">
    <div class="tweet-user-info">
        <div class="tweet-user-profile">
            
        </div>
        <div class="tweet-user-name-container">

        
        <div class="tweet-user-fullname">
juiiii
        </div>
        <div class="tweet-user-username">
@hhhhhh
        </div></div>
    </div>
    <div class="tweet-images-container">
        <div class="tweet-image">

            </div>
    </div>
    <div class="tweet-text-container">
    ${tweet.full_text}
    </div>
    <div class="tweet-date-container">
        20 minutes ago

    </div>
</div>`
})
document.querySelector('.tweets-list').innerHTML=tweetContent;
}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {

}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {

}
