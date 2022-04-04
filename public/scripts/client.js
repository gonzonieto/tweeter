/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // Makes a GET request to /tweets/ and returns the array of tweets
  const loadTweets = () => {
    $.ajax('/tweets/', { method: 'GET' })
      .then((tweets) => {
        // Sort so the newest tweet is displayed first
        tweets.sort((a,b) => b.created_at - a.created_at);
        renderTweets(tweets);
      });
  };

  // Render existing tweets as soon as possible in the page load sequence.
  loadTweets();
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const createTweetElement = (td) => {
    const avatar = escape(td.user.avatars);
    const name = escape(td.user.name);
    const handle = escape(td.user.handle);
    const text = escape(td.content.text);
    const timestamp = escape(td.created_at);

    const $tweet = $(`<article class="tweet">
    <header>
      <img src="${avatar}"></img>
      <span>${name}</span>
      <span id="handle">${handle}</span>
    </header>
    <p>
      ${text}
    </p>
    <footer>
      <span id="date">${timeago.format(timestamp)}</span>
      <i class="fa-solid fa-thumbs-up"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer>
    </article>`);
    return $tweet;
  };
  const renderTweets = (tweets) => {
    tweets
      .map(tweetData => createTweetElement(tweetData))
      .forEach(tweetElement => $('#tweets-container').append(tweetElement));
  };

  const newTweetBox = $('.new-tweet');
  const tweetForm = $('.new-tweet > form');

  // textarea of new tweet form
  const tweet = $("#tweet-text");

  tweet.focus((e) => {
    if ($('.error').length) {
      $('.error').slideToggle({
        duration: 'slow',
        start: () => {
          $('#tweet-text').css({ 'box-shadow': '0 0 0 0', 'transition': '0.6s' });
        },
        done: () => {
          $('.error').remove();
        }
      });
    }
  });

  // $('#tweet-text').css({ 'box-shadow': '0 0 0 0', 'transition': '0.3s' });

  tweetForm.submit((e) => {
    const tc = $('#tweets-container')[0];
    e.preventDefault();
    
    // Creating template warning element
    const warning = $(`<div class="error" style="display:none;">
    <strong>Error!</strong>
    <p></p>
  </div>`);

    // Validation -- Reject empty input and input over 140 characters
    if (tweet.val().trim().length > 140) {
      if (!$('.error').length) {
        warning[0].lastElementChild.innerText = 'Tweets cannot exceed 140 characters! Anything longer is technically considered a "squawk" and is not permitted by our Terms of Service.';
        newTweetBox[0].insertBefore(warning[0], newTweetBox[0].firstElementChild);
        
        $('.error').slideToggle({
          duration: 'slow',
          start: () => {
            $('#tweet-text').css({ 'box-shadow': 'rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px', 'transition': '0.4s' });
            $('.error').css('display', 'flex');
          }
        });
      }
      return;
    }
    if (!tweet.val().trim().length) {
      if (!$('.error').length) {
        warning[0].lastElementChild.innerText = 'You must have something to say before you can say something.';
        newTweetBox[0].insertBefore(warning[0], newTweetBox[0].firstElementChild);
        
        $('.error').slideToggle({
          duration: 'slow',
          start: () => {
            $('#tweet-text').css({ 'box-shadow': 'rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px', 'transition': '0.4s' });
            $('.error').css({ 'display': 'flex' });
          }
        });
      }
      return;
    }


    
    $.post("/tweets", tweetForm.serialize());
    
    // Clear text field and set counter back to 140
    $('#tweet-text').val('');
    $('.counter').val(140);

    // Remove all child nodes from #tweets-container
    while (tc.childElementCount) {
      tc.removeChild(tc.firstElementChild);
    }
    // Reload tweets from database
    loadTweets();

    $("html, body").animate({ scrollTop: $("#tweets-container").offset().top - $('nav')[0].scrollHeight - 10 }, 1500);
  });
});





//
// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

// $(document).ready(() => {
//   // Makes a GET request to /tweets/ and returns the array of tweets
//   const loadTweets = (options = { last: false }) => {
//     $.ajax('/tweets/', { method: 'GET' })
//       .then((tweets) => {
//         options.last
//           // Render only the last tweet to be added to the database
//           ? renderTweets(tweets[tweets.length - 1])
//           // Sort from newest to oldest and render all tweets in the database
//           : renderTweets(tweets.sort((a, b) => b.created_at - a.created_at));
//       });
//   };

//   // Render existing tweets as soon as possible in the page load sequence.
//   loadTweets();

//   const createTweetElement = (td) => {
//     const $tweet = $(`<article class="tweet">
//     <header>
//       <img src="${td.user.avatars}"></img>
//       <span>${td.user.name}</span>
//       <span id="handle">${td.user.handle}</span>
//     </header>
//     <p>
//       ${td.content.text}
//     </p>
//     <footer>
//       <span id="date">${timeago.format(td.created_at)}</span>
//       <i class="fa-solid fa-thumbs-up"></i>
//       <i class="fa-solid fa-retweet"></i>
//       <i class="fa-solid fa-heart"></i>
//     </footer>
//     </article>`);
//     return $tweet;
//   };

//   const renderTweets = (tweets) => {
//     tweets
//       .map(tweetData => createTweetElement(tweetData))
//       .forEach(tweetElement => $('#tweets-container').append(tweetElement));
//   };

//   const tweetForm = $('.new-tweet > form');

//   tweetForm.submit((e) => {
//     const tl = $("#tweet-text").val().trim().length;
//     const tc = $('#tweets-container')[0];
//     e.preventDefault();
    
//     // Validation -- Reject empty input and input over 140 characters
//     if (tl > 140) return alert('Tweets must contain 140 characters or less! Anything longer is technically considered a "squawk" and is not permitted by our Terms of Service.');
//     if (!tl)      return alert('You must have something to say before you can say something.');
    
//     $.post("/tweets", tweetForm.serialize());
//     $('#tweet-text').val('');

//     // Remove all child nodes from #tweets-container
//     // while (tc.childElementCount) {
//     //   tc.removeChild(tc.firstElementChild);
//     // }
//     // Reload tweets from database
//     loadTweets({ last: true });

//     $("html, body").animate({ scrollTop: $("#tweets-container").offset().top - $('nav')[0].scrollHeight - 10 }, 1500);
//   });
// });