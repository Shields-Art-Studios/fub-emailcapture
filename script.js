/**
 * @Author: Jack Woods
 * @Date:   2019-01-14T08:06:55-08:00
 * @Filename: script.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-14T08:17:58-08:00
 * @Copyright: 2018 Oregon State University
 */
// This script listens for a button press on the subscribe button, and then registers the user's email in FollowUpBoss.

// FollowUpBoss lead tags
// Change the lead tag here:
var leadTags = ['changeyourowndiaper']
// To change the tags, edit the text inside of the square brackets.
// New tags can be added by listing them. For example: To create three
// tags called "GH", "Calculator", and "Lead", we would list them like this:
// var leadTags = ['GH', 'Calculator', 'Lead']

// Add button event listener
let button = document.getElementById('subscribe').addEventListener('click', function(event) {
  var data = JSON.stringify({
    "source": "Change Your Own Diaper",
    "type": "General Inquiry",
    "message": document.getElementById("emailInput").value + " subscribed to the ChangeYourOwnDiaper.com email list!\n",
    "description": "Notification - Retiring Agent Calculator Results",
    "person": {
      "emails": [ { "value": document.getElementById("emailInput").value, "type": "home" } ],
      "tags": leadTags,
      "sourceUrl": "https://changeyourowndiaper.com/freebies/",
      "assignedTo" : "Nick Krautter"
    },
    "campaign": {
      "source": "Change Your Own Diaper",
      "medium": "referral"
    }
  })

  var xhr = new XMLHttpRequest()
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log("Lead added with status: " + this.status + " and message: ")
      console.log(JSON.parse(this.responseText))
    }
   })

  xhr.open("POST", "https://api.followupboss.com/v1/events")
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa('483fb0459ff828db2f8962ac6053ca28f79c07:'))
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(data)

})
