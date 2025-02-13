$(document).ready(() => {
  // Makes a GET request to /tweets/, returns the array of tweets
  const loadTweets = ((last = false) => {
    $.ajax('/tweets/', { method: 'GET' })
      .then((tweets) => {
        if (last) {
          renderTweets([tweets[tweets.length - 1]]);
          return;
        }
        // Sort so the newest tweet is displayed first
        tweets.sort((a,b) => a.created_at - b.created_at);
        renderTweets(tweets);
      });
  });

  // Render existing tweets as soon as possible in the page load sequence.
  loadTweets();
  
  // Escaping strings to be used for generating each tweet, to prevent cross-site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    // Document.createTextNode() escapes text without needing an external library
    // See https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (td) => {
    // Creating variables for readability and escaping each string to be inserted into the tweet element
    const avatar = escape(td.user.avatars);
    const name = escape(td.user.name);
    const handle = escape(td.user.handle);
    const text = escape(td.content.text);
    const timestamp = escape(td.created_at);

    // Populating HTML template tweet
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
      // From the array of tweet data, make an array of HTML tweet elements and prepend each one to the tweets container
      .map(tweetData => createTweetElement(tweetData))
      .forEach(tweetElement => $('#tweets-container').prepend(tweetElement));
  };

  const newTweetBox = $('.new-tweet');
  const tweetForm = $('.new-tweet > form');
  // textarea of form for new tweets
  const tweet = $("#tweet-text");

  // On click effects for right-hand navbar button
  $('nav div').click(e => {
    $('.new-tweet').slideToggle('slow', () => {
      // This ensures the bounce effect doesn't invert on click and remain active when mouse is not hovering
      $('nav i').removeClass('bounce');

      // Set text on right side of navbar based on the visibility state of the new tweet box
      if ($('.new-tweet').is(':visible')) {
        $('nav div span').html('<strong>Read</strong> some tweets.');
        $("html, body").animate({ scrollTop: $(".new-tweet").offset().top - $('nav').height() - 15 }, 950);
      } else {
        $('nav div span').html('<strong>Write</strong> a new tweet.');
      }
    });
  });

  // Bounce the icon in the navbar on hover
  $('nav div').hover(e => {
    $('nav i').toggleClass('bounce');
  });

  // If user focuses on the textarea, then if there are any elements of class 'error', hide and remove them
  tweet.focus(e => {
    if ($('.error').length) {
      $('.error').slideToggle({
        duration: 'slow',
        start: () => $('#tweet-text').css({
          'box-shadow': '0 0 0 0',
          'transition': '0.6s',
          'margin': '0px 0px'
        }),
        done: () => {
          $('.new-tweet h2').slideToggle('slow');
          $('.error').remove();
        }
      });
    }
  });

  // On submission of tweet form
  tweetForm.submit(e => {
    const tc = $('#tweets-container')[0];
    e.preventDefault();
    
    // Template for warning element
    const warning = $(
      `<div class="error" style="display:none;">
        <strong>Error!</strong>
        <p></p>
      </div>`
    );

    // Validation -- Reject empty input and input over 140 characters
    if (tweet.val().trim().length > 140) {
      if (!$('.error').length) {
        // Set appropriate warning text
        warning[0].lastElementChild.innerText = 'Tweets cannot exceed 140 characters! Anything longer is technically considered a "squawk" and is not permitted by our Terms of Service.';
        // Insert the warning element before the new tweet box
        newTweetBox[0].insertBefore(warning[0], newTweetBox[0].firstElementChild);
        
        // Animation for displaying the error
        $('.error').slideToggle({
          duration: 'slow',
          start: () => {
            $('#tweet-text').css({
              'box-shadow': 'rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px',
              'transition': '0.4s',
              'margin': '15px 0px'
            });
            $('.error').css('display', 'flex');
            $('.new-tweet h2').slideToggle('slow');
          }
        });
      }
      return;
    }

    if (!tweet.val().trim().length) {
      if (!$('.error').length) {
        // Set appropriate warning text
        warning[0].lastElementChild.innerText = 'You must have something to say before you can say something.';
        // Insert the warning element before the new tweet box
        newTweetBox[0].insertBefore(warning[0], newTweetBox[0].firstElementChild);
        
        // Animation for displaying the error
        $('.error').slideToggle({
          duration: 'slow',
          start: () => {
            $('#tweet-text').css({
              'box-shadow': 'rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px',
              'transition': '0.4s',
              'margin': '15px 0px'
            });
            $('.error').css({ 'display': 'flex' });
            $('.new-tweet h2').slideToggle('slow');
          }
        });
      }
      return;
    }
    // $.post(url, data, successFunc)
    $.post("/tweets", tweetForm.serialize(), () => loadTweets(true));
    
    // Clear text field and set counter back to 140
    $('#tweet-text').val('');
    $('.counter').val(140);

    // When a tweet is submitted, scroll page so the new tweet is the first thing shown below the navbar
    $("html, body").animate({ scrollTop: $("#tweets-container").offset().top - $('nav')[0].scrollHeight }, 1500);
  });
});