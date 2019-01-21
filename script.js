/**
 * @Author: Jack Woods
 * @Date:   2019-01-14T08:06:55-08:00
 * @Filename: script.js
 * @Last modified by:   Jack Woods
 * @Last modified time: 2019-01-21T10:53:26-08:00
 * @Copyright: 2018 Oregon State University
 */
// This script listens for a button press on the subscribe button, and then registers the user's email in FollowUpBoss.

// FollowUpBoss lead tags
// Change the lead tag here:
var leadTags = ['changeyourowndiaper']
// To change the tags, edit the text inside of the square brackets.
// New tags can be added by listing them. For example: To create three
// tags called 'GH', 'Calculator', and 'Lead', we would list them like this:
// var leadTags = ['GH', 'Calculator', 'Lead']

// Add button event listener
var clicked = 0
let button = document.getElementById('subscribe').addEventListener('click', function(event) {
  if (validateEmail(document.getElementById('et_pb_signup_email').value) && clicked === 0) {
    var data = JSON.stringify({
      'source': 'Change Your Own Diaper',
      'type': 'General Inquiry',
      'message': document.getElementById('et_pb_signup_email').value + ' subscribed to the ChangeYourOwnDiaper.com email list!\n',
      'description': 'Notification',
      'person': {
        'emails': [ { 'value': document.getElementById('et_pb_signup_email').value, 'type': 'home' } ],
        'tags': leadTags,
        'sourceUrl': 'https://changeyourowndiaper.com/freebies/',
        'assignedTo' : 'Nick Krautter'
      },
      'campaign': {
        'source': 'Change Your Own Diaper',
        'medium': 'referral'
      }
    })
    console.log(data)
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log('Lead added with status: ' + this.status + ' and message: ')
        console.log(JSON.parse(this.responseText))

        // Disable the button
        clicked = 1

        // Show success message
        document.getElementsByClassName('result')[0].textContent = 'Your request has been sent!'

        // Disable text input
        let input = document.getElementById('et_pb_signup_email')
        input.disabled = true
        input.classList.add('disabled')
      }
     })

    xhr.open('POST', 'https://api.followupboss.com/v1/events')
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('483fb0459ff828db2f8962ac6053ca28f79c07:'))
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)
  } else {
    console.log('Email Invalid')
  }
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}
