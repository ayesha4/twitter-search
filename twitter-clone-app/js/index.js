const URL = "http://localhost:3000/tweets";
let nextPageURL= null;
/**
 * Retrive Twitter Data from API
 */
const onEnter=(e)=>{
if(e.key=="Enter"){
    getTwitterData();
}
}
const onNextPage=()=>{
if(nextPageURL){
getTwitterData(true);
}
}

const getTwitterData = (nextPage=false) => {
const query = document.getElementById('user-search-input').value;
// const url ="http://localhost:3000/tweets?q=coding&count=10"
if(!query) return;
const encodedQuery=encodeURIComponent(query);
let fullURL =`${URL}?q=${encodedQuery}&count=10`;
if(nextPage && nextPageURL){
    fullURL=nextPageURL;
}
fetch(fullURL).then((response)=>{
    return response.json();
}).then((data)=>{
    buildTweets(data.statuses,nextPage);
    saveNextPage(data.search_metadata);
    nextPageButtonVisibility(data.search_metadata);
}).catch((error)=>{
    console.log(error);
})
}

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
    if(metadata.next_results){
     nextPageURL=`${URL}${metadata.next_results}`
}else{
    nextPageURL=null;
}}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
    const text = e.innerText;
    document.getElementById('user-search-input').value=text;
    getTwitterData();
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
    if(metadata.next_results){
        document.querySelector('.next-page-container').style.visibility='visible';
    }else{
        document.querySelector('.next-page-container').style.visibility='hidden';

    }
}

/**
 * Build Tweets HTML based on Data from API
 */let tweetContent="";
const buildTweets = (tweets, nextPage) => {
tweets.map((tweet)=>{
    //to be fixed 
    const createdDate=moment(tweet.created_at,"ddd MMM DD HH:mm:ss ZZ yyyy").fromNow();
    tweetContent+=`<div class="tweet-container">
    <div class="tweet-user-info">
        <div class="tweet-user-profile" style="background-image:URL(${tweet.user.profile_image_url_https})">
        
        </div>
        <div class="tweet-user-name-container">

        
        <div class="tweet-user-fullname">
        ${tweet.user.name}
        </div>
        <div class="tweet-user-username">
${tweet.user.screen_name}
        </div></div>
    </div>`
   if (tweet.extended_entities &&
       tweet.extended_entities.media.length>0){
        tweetContent+= buildImages(tweet.extended_entities.media);
        tweetContent+= buildVideo(tweet.extended_entities.media);
   }
    
        
        
     tweetContent+=`
    <div class="tweet-text-container">
    ${tweet.full_text}
    </div>
    <div class="tweet-date-container">
        ${tweet.createdDate}

    </div>
</div>`
})
if(nextPage){
    document.querySelector('.tweets-list').insertAdjacentHTML('beforeend',tweetContent)
}else{
document.querySelector('.tweets-list').innerHTML=tweetContent;
}}


const buildImages = (mediaList) => {
    let imageExists=false;
let imagesContent=`<div class="tweet-images-container">`;
mediaList.map((media)=>{
    if(media.type=="photo"){
        imageExists=true;
        imagesContent+=`<div class="tweet-image" style="background-image:URL(${media.media_url_https})"></div>`
    }
})
imagesContent+=`</div>`;
return imageExists ? imagesContent : '' ;
}


const buildVideo = (mediaList) => {
    let videoExists=false;
    let videoContent=`<div class="tweet-video-container">`;
    mediaList.map((media)=>{
        if(media.type=="video"){
            videoExists=true;
            const videoVariant=media.video_info.variants.find((variant)=>variant.content_type=="video/mp4")
            videoContent+=`
                    <video controls>
                        <source src=" ${videoVariant.url}" type="video/mp4">    
                    </video>
                   
            `
        }else if(media.type=="animated_gif"){
            videoExists=true;
            const videoVariant=media.video_info.variants.find((variant)=>variant.content_type=="video/mp4")

            videoContent+=`
                    <video loop autoplay>
                        <source src=" ${videoVariant.url}" type="video/mp4">    
                    </video>
                   
            `
        }
    })
    videoContent+=`</div>`;
    return videoExists ? videoContent : '' ;
}
