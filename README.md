Dear User,

Here is a web application for browsing (test task) made with React and Redux. The main features are the following.

You may:

- filter the date and get the information about asteroids in Result section (provided by NASA) 
- leave the notice about an asteroid
- use the pagination to get more information
- use chart bar to see the details about asteroid velocity

Some notices:

1. About stack technology. As it was required in the task, I used react-query to implement the query for caching the results. For some client data, which not comes from server( and actually doesn't need to be cached) I used Redux state management.( e.g. for notices or for filters). For bar chart I used react-chartjs

2. Note: As per task Filters work for useRecordsByDates hook only (because it receives dates as parameters). And pagination is not supported by server in this request(/rest/v1/feed).

3. Pagination is supported for useBrowseObjects hook. But filters is not supported by server in this request (/rest/v1/neo/browse).

4. Ideally (if we would need to combine somehow these two cases #2, #3) I would suggest either to change server request a bit and make some common logic in frontend side or to implement some kind of switcher (between #2 and #3). But not within this assessment :)

5. I tried to make the project scalable, because in this case it will be easy to expand or to add new functionality in future (if needed). For example, it is easy to add new other filters (such as inputs, selects, autotests, checkboxes etc.) or even all the section with filters, results and charts (not for asteroid but for example for the stars or whatever). This approach with common logic (layouts) will allow us to it with minimal time spending. At the same time we are able to modify each section and add some individual properties(settings) in the top component.

WebbApp links:
As the task was split into two cases (#2, #3), there are two links accordingly:

1. With filters: https://6318d82a1b3524038f2c4fe4--tangerine-gingersnap-31e8a2.netlify.app/
2. With pagination: https://master--tangerine-gingersnap-31e8a2.netlify.app/

In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.