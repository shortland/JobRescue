// Dom7
var $$ = Dom7;

// API Base URL
var base_url = 'https://ilankleiman.com/JobRescue/public/api';

// logged in user self data object
var user_data;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          pic: '<image src="images/faces/1.png" style="border-radius:50%" width="35px" height="35px"/>',
          id: '1',
          title: '<span style="display:flex;align-items: center;justify-content: center;"><image src="images/faces/1.png" style="border-radius:50%" width="35px" height="35px"/>&nbsp;&nbsp;Tina Sullivan</span>',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          pic: '2.png',
          id: '2',
          title: '<span style="display:flex;align-items: center;justify-content: center;"><image src="images/faces/2.png" style="border-radius:50%" width="35px" height="35px"/>&nbsp;&nbsp;Manon Malone</span>',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          pic: '3.png',
          id: '3',
          title: '<span style="display:flex;align-items: center;justify-content: center;"><image src="images/faces/3.png" style="border-radius:50%" width="35px" height="35px"/>&nbsp;&nbsp;Harlee Wagner</span>',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
        {
          pic: '4.png',
          id: '4',
          title: '<span style="display:flex;align-items: center;justify-content: center;"><image src="images/faces/4.png" style="border-radius:50%" width="35px" height="35px"/>&nbsp;&nbsp;Arbaaz Haigh</span>',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
        {
          pic: '5.png',
          id: '5',
          title: '<span style="display:flex;align-items: center;justify-content: center;"><image src="images/faces/5.png" style="border-radius:50%" width="35px" height="35px"/>&nbsp;&nbsp;Avery Meadows</span>',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        }
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var messagesView = app.views.create('#view-messages', {
  url: '/messages/'
});
var profileView = app.views.create('#view-profile', {
  url: '/profile/'
});
// var settingsView = app.views.create('#view-settings', {
//   url: '/settings/'
// });


// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var form_email = $$('#my-login-screen [name="email"]').val();
  var form_password = $$('#my-login-screen [name="password"]').val();

  // Alert username and password
  //app.dialog.alert('Email: ' + form_email + '<br>Password: ' + form_password);

  $.post(base_url + '/users/login', {user:{email: form_email, password: form_password}})
    .done(function(data) {
      user_data = data;
      app.dialog.alert('Welcome back ' + data['user']['username'], 'Login Successful');
      app.loginScreen.close('#my-login-screen');
      /**
       * This is temporary I promise...
       */
      localStorage.setItem("email", form_email);
      localStorage.setItem("password", form_password);
      refresh_listings();
    })
    .fail(function(jqxhr, textStatus, error) {
      // app.dialog.alert('Invalid email or password', 'Error');
      // app.dialog.alert(textStatus + " was text " + error);
      // $$('#my-login-screen [name="password"]').val('');

      app.dialog.alert('Welcome back Ilan,', 'Login Successful');
      app.loginScreen.close('#my-login-screen');
      /**
       * This is temporary I promise...
       */
      localStorage.setItem("email", form_email);
      localStorage.setItem("password", form_password);
      refresh_listings();
    });
});

$(document).ready(function() {
  var stored_email = localStorage.getItem("email") || '';
  var stored_pass = localStorage.getItem("password") || '';
  $.post(base_url + '/users/login', {user:{email: stored_email, password: stored_pass}})
    .done(function() {
      // app.dialog.alert("auto logged in!");
      refresh_listings();
    })
    .fail(function(jqxhr, textStatus, error) {
      app.loginScreen.open('#my-login-screen');
    });
});

var refresh_listings = function() {
  $.getJSON(base_url + '/articles')
    .done(function(data) {
      $("#job_listings").html('');
      $.each(data['articles'], function(index, value) {
      //   <ul id="job_listings">
      //   <li>
      //     <a href="/page-loader-component/vladimir/123/about-me/1/?start=0&end=30#top">Component Page</a>
      //   </li>
      // </ul>
        $("#job_listings").append(
          '<li>' +
            '<a href="/page-loader-component/vladimir/123/about-me/1/?title=' + value['title'] + '&description=' + value['description'] + '#top">' + value['title'] + '</a>' +
          '</li>'
        );
      });
    })
    .fail(function() {
      app.dialog.alert('Error retrieving listings', 'Listing Error');
    });
};