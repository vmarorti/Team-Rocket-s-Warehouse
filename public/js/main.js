console.log("main.js script is running"); // Debugging log

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");
    const conditions = document.querySelectorAll('.cond');
  
    conditions.forEach(function(condition) {
      console.log(condition.innerHTML);
  
      switch(condition.innerHTML.trim()) { 
        case 'Perfect':
          condition.style.color = 'Gold';
          break;
        case 'Great':
          condition.style.color = 'Purple';
          break;
        case 'Good':
          condition.style.color = 'Red';
          break;
        case 'Poor':
          condition.style.color = 'Orange';
          break;
        default:
          console.log("Condition not recognized");
      }
    });

});
