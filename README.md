# CS50_webdev_project_5
The main purpose of the application is to allow users to find, read and post their own fanfics/works. In read-mode an authorized user can like a work or add it to their Bookmarks. Every authorized user also may create, edit or delete their own fanfic.

Project features
================
- LogIn and SignUp, Logout.
- The site allows users to find and read any work on the site.
- The user can perform search by title, work description, fandom or character name.
- All works are under categories that can be found on the main page and every category has its own fandoms.
- The main page also shows the last ten works.
- Users can find a list of all works on the All works page.
- Every work/fanfic has a lot of information like title, description, age rate, list of characters, relationships, warnings, etc.
- Any authorized user can create, edit or delete their own work.
- The same goes for creating, editing chapters for a work. For now user can't delete chapters.
- Authorized users also can like or bookmark any work. The amount of likes and bookmarks for every work is displayed under the work's description.
- On the profile page there is some information about the user, list of their works if they have ones.
- Bookmarks page shows all the works that the user decided to add to their bookmark list.
- Pagination.
- Mobile responsive.

Distinctiveness and Complexity
===============================
 Although the application doesn’t look too complex from previous projects it has a lot of going on under the hood. 

Backend
-------
- Using many-to-many relations in a database — in previous projects, there was no need to use more complicated relations between models. But in this application many-to-many relations were essential. For example, not only in any fandom can there be a lot of works but also any work can have two or more fandoms. The same applies to other models.

- Using the Django rest framework  — I chose to use the framework for two reasons. First of all, because it would make work with data more convenient and fast. For example, rest framework allows to configure a more complex search and filtering through the data without many struggles. Secondly, learning a new way to work with data. 
- API is covered by tests.



Frontend
--------
- React  — I chose React because it seems more suitable for bigger and more complex projects. 
- Redux  — this library is a great helper with handling the whole state and its changes of the application.
- Markdown  — since all this application is about writing moderately big pieces of text, using the markdown library was an obvious choice.
- React-select  — since I needed to use dropdowns in some parts of the application, for example, when a user creating a new work needs to choose a character from a given list of characters, I decided to use this library. It allows to perform asynchronous requests when needed. 
- React-popup  — this component makes creating popups much simpler.


Files & Directories
===================
Backend
--------
**Fanfiction**
- admin.py  — contains all needed settings to use DjangoAdmin site.
- apps.py  — contains registered in Django application, in this case Fanfiction app
- models.py  — contains model classes created for each table for this application. There are eleven of them.
- serializers.py  — stores all the serializers for each django model. Serializers classes are defined as children of DjangoREST framework’s ModelSerializers. Those classes allow work with querysets and model instances and convert Python datatypes to JSON and other types.
- urls.py  — contains all url paths that create mapping between URLs and views. 
- views.py  — contains functions that take web requests and return web responses.
- tests.py - contains tests for API.
- requirements.txt - contains all information of all libraries that needed to be installed in order for the project to work.


Frontend
--------
**Public**

Contains two png and svg icons for creating a site icon.

**src**

- constants.js  — contains all needed constants for Redux.
- history.js  — stores an instance of the History library for React Router.
- index.js  — mounts the application to the DOM element using ReactDom.
- index.scss  — contains all styles for the application. 

**Actions**

The folder has only one file index.js. There are all functions needed for Reducer to know what exactly happened in the application. They also help to make web requests to the server side. 

**Components**

- AddChapter.jsx  — page with a form that allows users to create and save a new chapter for their existing work.
- AddWork.jsx  — page with a form that allows to create and save a new work.
- AllWorks.jsx  — component-wrapper for list of works.
- App.js  — the main component. Contains navbar, search and Router.
- Bookmark.jsx  — component that shows a bookmark icon and allows users to make or delete a bookmark on whatever work they want.
- Chapter.jsx  — component that renders content of a chapter.
- CharactersOptions.jsx  — component that renders characters options dropdown in form for creating or editing work.
- EditChapter.jsx  — page with a form that allows users to edit and save their existing chapters.
- EditWork.jsx  — page with a form that allows users to edit and save their existing chapters.
- ErrorMessage.jsx  — component that renders an error message if something went wrong.
- FandomOptions.jsx  — component that renders fandom options dropdown in form for creating or editing work.
- FandomsByCategory.jsx  —component that  shows list of fandoms in chosen category.
- Home.jsx  — shows the homepage with categories and a list of recent works.
- Like.jsx  — component that shows a like icon and allows users to make or delete like on whatever work they want.
- ListOfWorks.jsx  — component that creates a list of works. Used in many parts.
- Loader.jsx  — shows loading animation on a page if the site still loads some data.
- Login.jsx  — page that contains login form.
- Pagination.jsx  — component that renders pagination. Used in different pages like Home page, User Bookmarks etc.
- PasswordShowHide.jsx  — small component for Login and Registration components. Shows password in a password field if needed.
- Profile.jsx  — page that shows user profile information and list of users’ works.
- Registration.jsx  — page that shows registration form.
- RelationshipOptions.jsx  — component that renders relationship options dropdown in form for creating or editing work.
- Search.jsx  — search component.
- UserBookmarks.jsx  — page with a list of users bookmarks.
- Work.jsx  — page that shows all needed work data like description and list of chapters.
- WorkDescription.jsx  — component that renders all information or work as title, description etc.
- WorksByFandom.jsx  — page that shows list of works in a certain fandom.


**Reducers**

All those files are similar to each other. All of them contain one function that determines changes in the application state. It depends on what type of action they will get.

Index.js combines all reducers together.

- chapter.js
- chapters.js
- createChapter.js
- createWork.js
- currentUser.js
- editChapter.js
- editWork.js
- errorMessage.js
- fandom_categories.js
- fandomsByCategory.js
- getUser.js
- getUsersBookmark.js
- getUsersLike.js
- index.js
- registration.js
- usersBookmarks.js
- work.js
- works.js
- worksByFandoms.js
- worksByUser.js




Installation:
===========================

Installing python libraries:
----------------------------

    cd backend
    pip install -r requirements.txt
    python manage.py migrate
    
    
Create superuser:
----------------------------

    python manage.py createsuperuser
    
    
Configuring system:
----------------------------

    
Login as an admin to AdminPanel http://127.0.0.1:8000/admin

Create several different categories and fandoms etc. 
    
    

Installing javascript libraries:
----------------------------

    cd frontend
    npm install
    

Launching:
==========

Starting backend devserver:
--------------------

    cd backend
    python manage.py runserver


Starting Frontend webserver:
-------------------

    cd frontend
    npm run start

