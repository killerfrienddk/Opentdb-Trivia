# Opentdb-Trivia


### Login info
The Facebook and Google login options are dummy logins. They are designed to allow users to log in by clicking on the icons without requiring a password. Please note that these logins are currently not functional.
```
Website: https://killerfrienddk.github.io/opentdb-trivia
Email: admin@outlook.dk
Password: admin
```

I didn't have a lot of time to work on this project, as I have a very strict schedule at the moment. Please keep in mind that I am not skilled in design. Additionally, I haven't used Tailwind much, so you may notice some places in the code where it is applied better than others. This is because I gradually learned how to use it more effectively as I worked on this project.

### If I had more time, there are a few things I would like to improve:

1. Add error handling for when there are no more questions left.
2. Implement modals, such as one that appears when you log in, asking you to start a game or select a difficulty level.
3. Make the results page in to a modal instead of having it as a page.
4. Implement measures to prevent users from accessing the results page and seeing all of the results.
5. Add toasts for certain actions.
6. Enhance the styling of the nav bar. While it's not a major focus of the project, adding a user menu could make it look better. However, it's currently sufficient as it scales well.
7. Create a tooltip script using a directive.
8. Develop more custom components to reuse on the site.
9. Find a way to remove hash tags from the URL. Currently, if the hash mode is not used, the page will not work when reloaded and will return a 404 error on GitHub Pages.

## Other interesting things that I did while building this.
#### Randomizing the choices
I ran into some issues while attempting to randomize the choices. I wanted to avoid having the correct answer always be the first option, so I implemented a solution using a global unique identifier (GUID) and the token as a seed. This ensures that the choices will remain in the same random order when navigating through the questions, rather than being randomized again each time you go to a new question and then return to a previous one.

#### Encoding issues
I noticed that I was experiencing some encoding issues, so I used the tried and true method of using a textarea to decode it into regular text.


