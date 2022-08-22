# About

## Notes v0.1.0

Notes app designed to speed up learning process by entering general info about given library, framework or any other tool in general as well as some code snippets.
Single click on item labels in the dashboard will open up selected item's details on the left, and double click will show details on the right so user can compare two libraries.

# Set up

- Run `npm install`
- Database is run using JSON Server and command `npm run server`
- Frontend is run using webpack dev server and command `npm run dev`

## Updates for v0.2.0

- [x] Double-click event on dashboard items should trigger production of another library-detail component on the right side of the screen so that user can compare two libraries;
- [x] Text inside 'Official docs' should be removed on focus;
- [x] When saving new note, alert user if name of library isn't defined;
- [x] Improve styling (Neumorphism).
- [x] User should define custom additional notes (append smaller wc)
- [x] Add search funtionality for selecting notes, think about tags
- [x] Improve search component (tag + library name, user-friendliness, sort by first letter)
- [x] Add tags to library detail component
- [x] Improve suggestions filter
- [x] Improve search filter
- [x] If there is only one search result, open it up automatically
- [x] Edit heading of each addition to the notes to be content editable
- [x] On save, library-detail should appear on the side of the screen where it was initially opened.
- [x] Think about a way to make library component code more concise
- [x] When adding multiple tags, they eventually overflow
- [x] Remove-tags functionality
- [x] Set max height for note
- [ ] Make note header, paragraph and code snippet (textarea) into 1 component
- [ ] When new note's installation or implementation headers are modified, don't save them as that property
- [ ] Add clean up method to elements 
- [ ] Improve on scroll logic
