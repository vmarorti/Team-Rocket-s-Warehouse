console.log("main.js script is running"); // Debugging log

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");

    //Makes new posts names be capitalized
    const names = document.querySelectorAll('.nameAdj');
    names.forEach(function(nameElement) {
      let name = nameElement.textContent; // Get the text content of the element
      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Capitalize the first letter and make the rest lowercase
        nameElement.textContent = name; // Set the modified name back to the element
      }
    });


    //Changes color of condition
    const conditions = document.querySelectorAll('.cond');
    conditions.forEach(function(condition) {
      //console.log(condition.innerHTML);
 
      switch(condition.innerHTML.trim()) {
        case 'Perfect':
          condition.style.color = 'Gold';
          break;
        case 'Great':
          condition.style.color = 'purple';
          break;
        case 'Good':
          condition.style.color = 'Blue';
          break;
        case 'Poor':
          condition.style.color = 'Red';
          break;
        default:
          console.log("Condition not recognized");
      }
    });


    //Increase in money = brighter green
    const allMoneyEl = document.querySelectorAll('.money');
    allMoneyEl.forEach(function(money) {
      const moneyValue = parseInt(money.textContent.replace('$', ''));
      switch (true) {
        case (moneyValue > 500):
          money.style.color = '#0d260f';
          break;
        case (moneyValue > 400):
          money.style.color = '#164219';
          break;
        case (moneyValue > 300):
          money.style.color = '#1a521e';
          break;
        case (moneyValue > 200):
          money.style.color = '#226e27';
          break;
        case (moneyValue > 100):
          money.style.color = '#277a2d';
          break;
        case (moneyValue > 0):
          money.style.color = '#2c8a32';
          break;
        default:
          // You can add a default case if you want to handle other values
          money.style.color = 'black';
          break;
      }
    });

    // Adds emoji to posts with a lot of likes
    const totalLikes = document.querySelectorAll('.likes');
    totalLikes.forEach(function(likeElement) {
      let likes = parseInt(likeElement.innerHTML);
      if (likes >= 50) {
        likeElement.innerHTML = `${likes} 🐦‍🔥`;
      }else if (likes > 20) {
        likeElement.innerHTML = `${likes} 🔥`;
      }
    });

    // Adding a like
    document.querySelectorAll('.like-button').forEach(button => {
      button.addEventListener('click', async function() {
        const postId = this.getAttribute('data-post-id');
        try {
          const response = await fetch(`api/post/like/${postId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (data.success) {
            const likesSpan = this.closest('.pokemon-card-details').querySelector('.likes');
            likesSpan.textContent = data.likes;
          } else {
            console.error('Failed to like the post.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });

});
