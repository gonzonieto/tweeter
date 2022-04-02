/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (td) => {
  const $tweet = $(`<article class="tweet">
  <header>
    <img src="${td.user.avatars}"></img>
    <span>${td.user.name}</span>
    <span id="handle">${td.user.handle}</span>
  </header>
  <p>
    ${td.content.text}
  </p>
  <footer>
    <span id="date">${td.created_at}</span>
    <i class="fa-solid fa-thumbs-up"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </footer>
  </article>`);

  return $tweet;
};

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const $tweet = createTweetElement(tweetData);

$(document).ready(() => {
  $('#tweets-container').append(createTweetElement(tweetData));
  $('#tweets-container').append(createTweetElement(tweetData));
});
